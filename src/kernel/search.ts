import { pokemonDatasetMap } from '@/lib/dataset/pokemon'
import { PokedexEntryState, PokedexSearchStateFilter, PokedexState } from '../stores/types/state'

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
    } satisfies PokedexSearchableEntry

    fullEntry.searchText = _generateAdditionalEntrySearchableText(fullEntry)

    return fullEntry
  })
}

function _generateAdditionalEntrySearchableText(entry: PokedexSearchableEntry): string {
  const bookmarkText = ' //PKM//.'

  if (entry.searchText.includes(bookmarkText.trim())) {
    throw new Error(`Entry ${entry.id} already has searchable text generated, we would add unnecessary text.`)
  }

  const { num, state } = entry
  const numPad3 = String(num).padStart(3, '0')
  const numPad4 = String(num).padStart(4, '0')

  const normalTokens = [`#${num}`, `#${numPad3}`, `#${numPad4}`].join(' ')

  const conditionalTokens = [state?.caught ? ':caught' : ':uncaught :notcaught'].join(' ')

  return `${entry.searchText} ${normalTokens} ${conditionalTokens}`.toLowerCase() + bookmarkText
}

function _searchDexEntries(searchIndex: PokedexSearchIndex, query: string): PokedexSearchIndex {
  const sanitizedQuery = query.trim().toLowerCase().replace(/\s+/g, ' ')
  if (!sanitizedQuery) {
    return searchIndex
  }

  const searchTokens = sanitizedQuery.split(' ')

  // return searchIndex.filter((pokemon) => pokemon.searchText?.includes(sanitizedQuery) === true)

  return searchIndex.filter((pokemon) => {
    const searchText = pokemon.searchText
    if (!searchText) {
      return false
    }

    return searchTokens.some((token) => searchText.includes(token))
  })
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
