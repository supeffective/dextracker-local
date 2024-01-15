import { generateDexFilteredEntries } from '@/kernel/search'
import { getDexSourceCodeUrl } from '@/kernel/urls'
import { countSpeciesAndForms } from '@/lib/dataset/utils'
import useInfiniteScrollList from '@/lib/hooks/useInfiniteScrollList'
import { cn } from '@/lib/utils'
import { useCurrentDexData } from '@/stores/useCurrentDexData'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import { ComponentPropsWithoutRef, useRef } from 'react'
import styles from './DexTracker.module.scss'
import DexTrackerEntry from './DexTrackerEntry'

type DexTrackerProps = {
  infiniteScrollSize?: number
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export default function DexTracker({ className, infiniteScrollSize = 25, ...props }: DexTrackerProps) {
  const lastElementRef = useRef<HTMLDivElement | null>(null)

  const currentDex = useCurrentDexData()
  const currentFilters = useDexTrackerStore((store) => store.filters)

  const fetchedDexInfo = currentDex.fullInfoQuery
  const filteredDexResults = generateDexFilteredEntries(fetchedDexInfo?.data, currentDex.state, currentFilters)
  const visibleDexResults = useInfiniteScrollList(filteredDexResults, { chunkSize: infiniteScrollSize, lastElementRef })

  if (!fetchedDexInfo) {
    return (
      <div
        className={cn(
          styles.tracker,
          {
            [styles.error]: true,
          },
          className,
        )}
        {...props}
      >
        <div className={styles.resultPanel}>This Pokédex cannot be loaded or the ID given in the URL is invalid.</div>
      </div>
    )
  }

  const classes = cn(
    styles.tracker,
    {
      [styles.loading]: fetchedDexInfo.isLoading,
      [styles.error]: fetchedDexInfo.isError,
      [styles.loaded]: fetchedDexInfo.isSuccess,
    },
    className,
  )

  if (fetchedDexInfo.isLoading) {
    return (
      <div className={classes} {...props}>
        <div className={styles.resultPanel}>Loading...</div>
      </div>
    )
  }

  if (fetchedDexInfo.isError) {
    return (
      <div className={classes} {...props}>
        <div className={styles.resultPanel}>Error loading data from the dataset API...</div>
      </div>
    )
  }

  const dexId = fetchedDexInfo.data?.id
  const dexRegion = fetchedDexInfo.data?.region
  const fullDexEntries = fetchedDexInfo.data?.pokemon

  if (
    fetchedDexInfo.data === undefined ||
    fullDexEntries === undefined ||
    dexId === undefined ||
    dexRegion === undefined
  ) {
    return (
      <div className={cn(classes, styles.empty)} {...props}>
        <div className={styles.resultPanel}>No Pokédex is loaded...</div>
      </div>
    )
  }

  if (!currentDex.game || !currentDex.info || !currentDex.state) {
    return (
      <div className={cn(classes, styles.empty)} {...props}>
        <div className={styles.resultPanel}>No game or dex selected</div>
      </div>
    )
  }

  if (visibleDexResults.length === 0) {
    return (
      <div className={cn(classes, styles.empty)} {...props}>
        <div className={styles.resultPanel}>
          <p>
            <b>No dex entries found for this dex.</b>
            <br />
            <br />
            You can support this project by contributing to{' '}
            <a href={getDexSourceCodeUrl(dexRegion, dexId)} target="_blank" rel="noreferrer">
              the dataset repository
            </a>
            {''}, adding the missing data.
          </p>
        </div>
      </div>
    )
  }

  const [speciesCount, formCount] = countSpeciesAndForms(filteredDexResults)

  if (filteredDexResults.length === 0) {
    return (
      <div className={cn(classes, styles.empty)} {...props}>
        <div className={styles.resultPanel}>No results found</div>
      </div>
    )
  }

  const isFiltered = filteredDexResults.length !== fullDexEntries.length
  const fullDexId = currentDex.state.id

  return (
    <div className={classes} {...props}>
      <div className={styles.dexTitle}>
        <h2>Pokémon {currentDex.game.name}</h2>
        <h3>{currentDex.info.name}</h3>
      </div>
      <div className={styles.resultPanel}>
        Listing {!isFiltered && ' all '} {filteredDexResults.length} Pokémon ({speciesCount} species
        {formCount > 0 && `, ${formCount} forms`})
        {isFiltered && <>, filtered out of {fullDexEntries.length} Pokémon & forms.</>}
      </div>
      <div className={styles.entries}>
        {visibleDexResults.map((entry, index) => {
          const isLast = index === visibleDexResults.length - 1
          const ref = isLast ? lastElementRef : null
          return (
            <DexTrackerEntry
              ref={ref}
              index={index}
              total={visibleDexResults.length}
              key={entry.id}
              fullDexId={fullDexId}
              data={entry}
            />
          )
        })}
      </div>
    </div>
  )
}
