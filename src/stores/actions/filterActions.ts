import { applyDexFilters } from '@/lib/dex-utils'
import { Pokedex } from '@supeffective/dataset'
import { ExpandedPokedexEntry, PokedexSearchIndex, createPokemonSearchIndex, expandPokedexEntries } from '../dataset'
import { PokedexSearchState, PokedexSearchStateFilter, PokedexState } from '../state/types'
import { PokedexSearchActions } from './types'

// const dexSearchIndexMap = new Map<string, PokedexSearchIndex>()

export function createFilteredSearchIndex(
  dex: Pokedex | undefined,
  dexState: PokedexState | undefined,
  filters?: PokedexSearchStateFilter,
): PokedexSearchIndex {
  if (!dex || !dexState) {
    return []
  }

  const entries = expandPokedexEntries(dex.entries, dexState)

  // WARNING! THIS approach caused the entries not to be rerendered:
  // if (!dexSearchIndexMap.has(dex.id)) {
  //   dexSearchIndexMap.set(dex.id, createPokemonSearchIndex<ExpandedPokedexEntry>(entries, ['dexNum']))
  // }

  const searchIndex = createPokemonSearchIndex<ExpandedPokedexEntry>(entries, ['dexNum']) // dexSearchIndexMap.get(dex.id) as PokedexSearchIndex

  return applyDexFilters(searchIndex, filters)
}

const filterActions = (
  setState: (newState: Partial<PokedexSearchState>) => void,
  getState: () => PokedexSearchState,
): PokedexSearchActions => {
  return {
    // applyFilters(dex, dexState, filter) {
    //   const currentFilters = getState().filters
    //   const results = deepClone(createFilteredSearchIndex(dex, dexState, filter))

    //   setState({
    //     dexId: dex.id,
    //     filters: deepClone({
    //       ...currentFilters,
    //       ...filter,
    //     }),
    //     results,
    //   })

    //   return results
    // },
    setShinyMode(value) {
      const currentState = getState()
      setState({
        filters: {
          ...currentState.filters,
          shinyMode: value,
        },
      })
    },
    setHideForms(value) {
      const currentState = getState()
      setState({
        filters: {
          ...currentState.filters,
          hideForms: value,
        },
      })
    },
    setHideCaught(value) {
      const currentState = getState()
      setState({
        filters: {
          ...currentState.filters,
          hideCaught: value,
        },
      })
    },
    setHideCosmeticForms(value) {
      const currentState = getState()
      setState({
        filters: {
          ...currentState.filters,
          hideCosmeticForms: value,
        },
      })
    },
    setSearchQuery(query) {
      const currentState = getState()
      setState({
        filters: {
          ...currentState.filters,
          searchQuery: query ?? undefined,
        },
      })
    },
    clearSearchQuery() {
      const currentState = getState()
      setState({
        filters: {
          ...currentState.filters,
          searchQuery: undefined,
        },
      })
    },
  }
}

export default filterActions
