import useFetchCurrentPokedexData from '@/hooks/useFetchCurrentPokedexData'
import { generateDexFilteredEntries } from '@/kernel/search'
import { getDexSourceCodeUrl } from '@/kernel/urls'
import { countSpeciesAndForms } from '@/lib/dataset/utils'
import useInfiniteScrollList from '@/lib/hooks/useInfiniteScrollList'
import { cn } from '@/lib/utils'
import { PokedexState } from '@/stores/types/state'
import useDexTrackerStore, { useCurrentGameAndDex } from '@/stores/useDexTrackerStore'
import usePokedexSearchStore from '@/stores/usePokedexSearchStore'
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'
import styles from './DexTracker.module.scss'
import DexTrackerEntry from './DexTrackerEntry'

type DexTrackerProps = {
  infiniteScrollSize?: number
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export default function DexTracker({ className, infiniteScrollSize = 25, ...props }: DexTrackerProps) {
  const allDexesState = useDexTrackerStore((store) => store.dexes)
  const searchStore = usePokedexSearchStore((store) => store)
  const { currentGame, currentDex } = useCurrentGameAndDex()
  const fullDexFetch = useFetchCurrentPokedexData()
  const [currentDexState, setCurrentDexState] = useState<PokedexState | undefined>(undefined)
  const lastElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (fullDexFetch.isSuccess && fullDexFetch.data) {
      const fullDexData = fullDexFetch.data
      const dexState: PokedexState = allDexesState[fullDexData.id] ?? {
        id: fullDexData.id,
        pokemon: {},
      }
      setCurrentDexState(dexState)
    }
  }, [fullDexFetch.isSuccess, fullDexFetch.data, allDexesState])

  const isLoading = fullDexFetch.isLoading
  const isError = fullDexFetch.isError
  const isSuccess = fullDexFetch.isSuccess

  const dexId = fullDexFetch.data?.id
  const dexRegion = fullDexFetch.data?.region
  const fullDexEntries = fullDexFetch.data?.pokemon

  const filteredDexResults = generateDexFilteredEntries(fullDexFetch.data, currentDexState, searchStore.filters)
  const visibleDexResults = useInfiniteScrollList(filteredDexResults, { chunkSize: infiniteScrollSize, lastElementRef })

  const classes = cn(
    styles.tracker,
    {
      [styles.loading]: isLoading,
      [styles.error]: isError,
      [styles.loaded]: isSuccess,
    },
    className,
  )

  if (isLoading) {
    return (
      <div className={classes} {...props}>
        <div className={styles.resultPanel}>Loading...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={classes} {...props}>
        <div className={styles.resultPanel}>Error loading data from the dataset API...</div>
      </div>
    )
  }

  if (!currentDexState) {
    return (
      <div className={classes} {...props}>
        <div className={styles.resultPanel}>Loading state...</div>
      </div>
    )
  }

  if (
    fullDexFetch.data === undefined ||
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

  // const [speciesCountTotal, formCountTotal] = countSpeciesAndForms(entries)
  const [speciesCount, formCount] = countSpeciesAndForms(filteredDexResults)

  if (filteredDexResults.length === 0) {
    return (
      <div className={cn(classes, styles.empty)} {...props}>
        <div className={styles.resultPanel}>No results found</div>
      </div>
    )
  }

  const isFiltered = filteredDexResults.length !== fullDexEntries.length

  return (
    <div className={classes} {...props}>
      <div className={styles.dexTitle}>
        <h2>Pokémon {currentGame.name}</h2>
        <h3>{currentDex.name}</h3>
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
              dexId={dexId}
              data={entry}
            />
          )
        })}
      </div>
    </div>
  )
}
