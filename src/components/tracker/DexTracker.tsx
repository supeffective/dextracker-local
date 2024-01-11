import { countSpeciesAndForms } from '@/lib/dex-utils'
import { cn } from '@/lib/utils'
import { createFilteredSearchIndex } from '@/stores/actions/filterActions'
import { getDexSourceCodeUrl, useCurrentPokedexData } from '@/stores/cdn'
import { PokedexState } from '@/stores/state/types'
import useDexTrackerStore, { useCurrentGameAndDex } from '@/stores/useDexTrackerStore'
import usePokedexSearchStore from '@/stores/usePokedexSearchStore'
import { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import styles from './DexTracker.module.scss'
import { DexTrackerEntry } from './DexTrackerEntry'

type DexTrackerProps = {} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export default function DexTracker({ className, ...props }: DexTrackerProps) {
  const allDexesState = useDexTrackerStore((store) => store.dexes)
  const searchStore = usePokedexSearchStore((store) => store)
  const { currentGame, currentDex } = useCurrentGameAndDex()
  const fullDexFetch = useCurrentPokedexData()
  const [currentDexState, setCurrentDexState] = useState<PokedexState | null>(null)

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

  if (!fullDexFetch.data) {
    return (
      <div className={cn(classes, styles.empty)} {...props}>
        <div className={styles.resultPanel}>No Pokédex is loaded...</div>
      </div>
    )
  }

  const dexRegion = fullDexFetch.data.region
  const dexId = fullDexFetch.data.id
  const fullDexEntries = fullDexFetch.data.entries

  const dexResults = createFilteredSearchIndex(fullDexFetch.data, currentDexState, searchStore.filters)

  if (dexResults.length === 0) {
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
  const [speciesCount, formCount] = countSpeciesAndForms(dexResults)

  if (dexResults.length === 0) {
    return (
      <div className={cn(classes, styles.empty)} {...props}>
        <div className={styles.resultPanel}>No results found</div>
      </div>
    )
  }

  const isFiltered = dexResults.length !== fullDexEntries.length

  return (
    <div className={classes} {...props}>
      <div className={styles.dexTitle}>
        <h2>Pokémon {currentGame.name}</h2>
        <h3>{currentDex.name}</h3>
      </div>
      <div className={styles.resultPanel}>
        Listing {!isFiltered && ' all '} {dexResults.length} Pokémon ({speciesCount} species
        {formCount > 0 && `, ${formCount} forms`})
        {isFiltered && <>, filtered out of {fullDexEntries.length} Pokémon & forms.</>}
      </div>
      <div className={styles.entries}>
        {dexResults.map((entry) => (
          <DexTrackerEntry key={entry.id} dexId={dexId} data={entry} />
        ))}
      </div>
    </div>
  )
}
