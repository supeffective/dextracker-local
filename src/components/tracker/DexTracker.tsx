import { PokeballOutlineIcon, ShinyIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useCurrentPokedexData } from '@/stores/cdn'
import {
  ExpandedPokedexEntry,
  PokemonSearchIndex,
  createPokemonSearchIndex,
  expandPokedexEntries,
  searchPokemonWith,
} from '@/stores/dataset'
import { PokedexEntryState, PokedexState } from '@/stores/state/types'
import useDexTrackerStore, { useCurrentGameAndDex } from '@/stores/useDexTrackerStore'
import { ComponentPropsWithoutRef } from 'react'
import PokemonImg from '../PokemonImg'
import styles from './DexTracker.module.scss'

type DexTrackerProps = {} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const dexSearchIndexMap = new Map<string, PokemonSearchIndex<ExpandedPokedexEntry>>()

export default function DexTracker({ className, ...props }: DexTrackerProps) {
  const store = useDexTrackerStore((store) => store)
  const { currentGame, currentDex } = useCurrentGameAndDex()
  const dexQuery = useCurrentPokedexData()

  const toggleCaught = (pkm: PokedexEntryState) => {
    store.updateDexPokemon(currentDex.id, pkm.nid, {
      caught: !pkm.caught,
    })
  }

  const toggleShiny = (pkm: PokedexEntryState) => {
    store.updateDexPokemon(currentDex.id, pkm.nid, {
      shiny: !pkm.shiny,
    })
  }

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

  if (!dexQuery.data) {
    return (
      <div className={cn(classes, styles.empty)} {...props}>
        <div className={styles.resultPanel}>No Pokédex is loaded...</div>
      </div>
    )
  }

  const dexData = dexQuery.data

  if (dexData.entries.length === 0) {
    return (
      <div className={cn(classes, styles.empty)} {...props}>
        <div className={styles.resultPanel}>
          <p>
            <b>No dex entries found for this dex.</b>
            <br />
            <br />
            You can support this project by contributing to{' '}
            <a
              href={`https://github.com/supeffective/dataset/blob/main/data/pokedexes/${dexData.region}/${dexData.id}.json`}
              target="_blank"
              rel="noreferrer"
            >
              the dataset repository
            </a>
            {''}, adding the missing data.
          </p>
        </div>
      </div>
    )
  }

  const userDexData: PokedexState = store.dexes[dexData.id] ?? {
    id: dexData.id,
    pokemon: {},
  }

  const entries = expandPokedexEntries(dexData.entries)
  if (!dexSearchIndexMap.has(dexData.id)) {
    dexSearchIndexMap.set(dexData.id, createPokemonSearchIndex<ExpandedPokedexEntry>(entries, ['dexNum']))
  }

  const searchIndex = dexSearchIndexMap.get(dexData.id) as PokemonSearchIndex<ExpandedPokedexEntry>
  const filteredEntries = store.filter?.searchQuery
    ? searchPokemonWith(searchIndex, store.filter.searchQuery)
    : searchIndex

  if (filteredEntries.length === 0) {
    return (
      <div className={cn(classes, styles.empty)} {...props}>
        <div className={styles.resultPanel}>No results found</div>
      </div>
    )
  }
  return (
    <div className={classes} {...props}>
      <div className={styles.dexTitle}>
        <h3>Pokémon {currentGame.name}</h3>
        <h4>{currentDex.name}</h4>
      </div>
      {store.filter?.searchQuery && (
        <div className={styles.resultPanel}>
          {filteredEntries.length} / {entries.length} Pokémon
        </div>
      )}
      {!store.filter?.searchQuery && <div className={styles.resultPanel}>{entries.length} Pokémon</div>}
      <div className={styles.entries}>
        {filteredEntries.map((entry) => {
          const zeroPadDexNum = entry.dexNum?.toString().padStart(4, '0')

          const pkmState = {
            ...userDexData.pokemon[entry.nid],
            nid: entry.nid,
          }

          if (pkmState.nid === undefined) {
            throw new Error(`Missing nid for ${entry.id}`)
          }

          return (
            <div key={entry.id} className={styles.entry} title={entry.search}>
              <div className={styles.entryInfo}>
                <div className={styles.entryHeader}>{`#${zeroPadDexNum ?? '--'}`}</div>
                <div className={styles.sprite}>
                  <PokemonImg pokeNid={entry.nid} shiny={store.filter?.shinyMode === true} />
                </div>
              </div>
              <div className={styles.entryName}>{entry.name ?? `"${entry.id}"`}</div>
              <div className={styles.entryActions}>
                <button
                  tabIndex={0}
                  type="button"
                  data-active={pkmState.caught ?? 0}
                  onClick={() => toggleCaught(pkmState)}
                >
                  <PokeballOutlineIcon />
                </button>
                <button
                  tabIndex={0}
                  type="button"
                  data-active={pkmState.shiny ?? 0}
                  onClick={() => toggleShiny(pkmState)}
                >
                  <ShinyIcon />
                </button>
                {/* <button tabIndex={0} type="button" data-active={pkmState.genders.includes('m')}>
                  <MaleIcon className={styles.small} />
                </button>
                <button tabIndex={0} type="button" data-active={pkmState.genders.includes('f')}>
                  <FemaleIcon className={styles.small} />
                </button> */}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
