import { PokedexSearchActions } from '../types/actions'
import { PokedexSearchState } from '../types/state'

const filterActions = (
  setState: (newState: Partial<PokedexSearchState>) => void,
  getState: () => PokedexSearchState,
): PokedexSearchActions => {
  return {
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
