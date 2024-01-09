import { FemaleIcon, MaleIcon, PokeballOutlineIcon, ShinyIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useCurrentPokedexData } from '@/stores/cdn'
import {
  ExpandedPokedexEntry,
  PokemonSearchIndex,
  createPokemonSearchIndex,
  expandPokedexEntries,
  searchPokemonWith,
} from '@/stores/dataset'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import { ComponentPropsWithoutRef } from 'react'
import PokemonImg from '../PokemonImg'
import styles from './DexTracker.module.scss'

type DexTrackerProps = {} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const dexSearchIndexMap = new Map<string, PokemonSearchIndex<ExpandedPokedexEntry>>()

export default function DexTracker({ className, ...props }: DexTrackerProps) {
  const store = useDexTrackerStore((store) => store)
  const dexQuery = useCurrentPokedexData()

  const isLoading = dexQuery.isLoading
  const isError = dexQuery.isError
  const isSuccess = dexQuery.isSuccess

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
        Loading...
      </div>
    )
  }

  if (isError) {
    return (
      <div className={classes} {...props}>
        Error!
      </div>
    )
  }

  if (!dexQuery.data) {
    return (
      <div className={cn(classes, styles.empty)} {...props}>
        No Dex data is set!
      </div>
    )
  }

  const dexData = dexQuery.data

  if (dexData.entries.length === 0) {
    return (
      <div className={cn(classes, styles.empty)} {...props}>
        No dex entries found for this dex. Please{' '}
        <a
          href={`https://github.com/supeffective/dataset/blob/main/data/pokedexes/${dexData.region}/${dexData.id}.json`}
          target="_blank"
          rel="noreferrer"
        >
          edit it in the dataset repository
        </a>
        .
      </div>
    )
  }

  // const userDexData: PokedexState = store.dexes[dexData.id] ?? {
  //   id: dexData.id,
  //   pokemon: {},
  // }

  const entries = expandPokedexEntries(dexData.entries)
  if (!dexSearchIndexMap.has(dexData.id)) {
    dexSearchIndexMap.set(dexData.id, createPokemonSearchIndex(entries))
  }

  const searchIndex = dexSearchIndexMap.get(dexData.id) as PokemonSearchIndex<ExpandedPokedexEntry>
  const filteredEntries = store.filter?.searchQuery ? searchPokemonWith(searchIndex, store.filter.searchQuery) : entries

  const numEntriesDigits = entries.length.toString().length

  return (
    <div className={classes} {...props}>
      {filteredEntries.map((entry) => {
        const zeroPadDexNum = entry.dexNum?.toString().padStart(numEntriesDigits, '0')

        // const pkmState = userDexData.pokemon[entry.id] ?? {}

        return (
          <div key={entry.id} className={styles.entry}>
            <div className={styles.entryInfo}>
              <div className={styles.entryHeader}>{`#${zeroPadDexNum ?? '--'}`}</div>
              <PokemonImg className={styles.sprite} pokeNid={entry.nid} shiny={store.filter?.shinyMode === true} />
              <div className={styles.entryName}>{entry.name ?? `"${entry.id}"`}</div>
            </div>
            <div className={styles.entryActions}>
              <div>
                <PokeballOutlineIcon />
              </div>
              <div>
                <ShinyIcon />
              </div>
              <div>
                <MaleIcon className={styles.small} />
              </div>
              <div>
                <FemaleIcon className={styles.small} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
