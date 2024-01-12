import { pokemonDatasetMap } from '@/lib/dataset/pokemon'
import { PokedexEntryState, PokedexSearchStateFilter, PokedexState } from './types/state'

import { TrPokedex, TrPokedexEntry, TrStatefulPokedexEntry } from '@/lib/dataset/types'

export type PokedexSearchableEntry = TrStatefulPokedexEntry<PokedexEntryState>
export type PokedexSearchIndex = PokedexSearchableEntry[]

export function generateDexFilteredEntries(
  dex: TrPokedex | undefined,
  dexState: PokedexState | undefined,
  filters?: PokedexSearchStateFilter,
): PokedexSearchIndex {
  if (!dex || !dexState) {
    return []
  }

  const searchIndex = _generateDexSearchableEntries(dex.pokemon, dexState)

  return _applyDexFilters(searchIndex, filters)
}

function _generateDexSearchableEntries(dexEntries: TrPokedexEntry[], dexState: PokedexState): PokedexSearchIndex {
  return dexEntries.map((entry, _) => {
    const pokemon = pokemonDatasetMap.get(entry.id)
    if (!pokemon) {
      throw new Error(`No pokemon found for id ${entry.id}`)
    }

    const fullEntry = {
      ...entry,
      ...pokemon,
      types: [pokemon.types[0], pokemon.types[1] ?? null],
      state: {
        ...dexState.pokemon[entry.id],
      },
      flags: {
        ...pokemon.flags,
      },
      searchText: '',
    } satisfies PokedexSearchableEntry

    fullEntry.searchText = _generateEntrySearchableText(fullEntry)

    return fullEntry
  })
}

function _generateEntrySearchableText(entry: PokedexSearchableEntry): string {
  const { num, name, slug, region, types, color, state } = entry
  const {
    isForm,
    canBeShiny,
    canBeMale,
    canBeFemale,
    isFemaleForm,
    isCosmeticForm,
    isRegional,
    isUltraBeast,
    isParadox,
    isConvergent,
    isLegendary,
    isMythical,
  } = entry.flags

  const numPad3 = String(num).padStart(3, '0')
  const numPad4 = String(num).padStart(4, '0')

  const normalTokens = [
    `#${num}`,
    `#${numPad3}`,
    `#${numPad4}`,
    name,
    slug,
    `:region:${region}`,
    `:color:${color}`,
    types.filter(Boolean).map((type) => `:type:${type}`),
  ].join(' ')

  const conditionalTokens = [
    isForm ? ':form' : '',
    !canBeShiny ? ':shinylocked :noshiny' : '',
    !canBeMale || isFemaleForm ? ':gender:femaleonly' : '',
    !canBeFemale ? ':gender:maleonly' : '',
    isCosmeticForm ? ':cosmeticform' : '',
    isRegional ? ':regional' : '',
    isUltraBeast ? ':ultrabeast' : '',
    isParadox ? ':paradox' : '',
    isConvergent ? ':convergent' : '',
    isLegendary ? ':legendary' : '',
    isMythical ? ':mythical' : '',
    state?.caught ? ':caught' : ':uncaught :notcaught',
  ].join(' ')

  return `${normalTokens} ${conditionalTokens}`.toLowerCase()
}

function _searchDexEntries(searchIndex: PokedexSearchIndex, query: string): PokedexSearchIndex {
  const sanitizedQuery = query.trim().toLowerCase()
  if (!sanitizedQuery) {
    return searchIndex
  }

  return searchIndex.filter((pokemon) => pokemon.searchText?.includes(sanitizedQuery) === true)
}

function _applyDexFilters(pokemon: PokedexSearchIndex, filter?: PokedexSearchStateFilter): PokedexSearchIndex {
  let results = pokemon

  if (!filter) {
    return results
  }

  if (filter.searchQuery) {
    results = _searchDexEntries(results, filter.searchQuery)
  }

  if (filter.hideCaught) {
    results = results.filter((pokemon) => {
      const state = pokemon.state
      if (!state) {
        return true
      }
      return !state.caught
    })
  }

  if (filter.hideForms) {
    results = results.filter((pokemon) => !pokemon.flags.isForm)
  }

  if (filter.hideCosmeticForms) {
    results = results.filter((pokemon) => !pokemon.flags.isCosmeticForm)
  }

  // if (filter.shinyMode) {
  //   results = results.filter((pokemon) => pokemon.state?.shiny)
  // }

  return results
}
