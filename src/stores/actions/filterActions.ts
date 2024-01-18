import { DexTrackerActionFactory, DexTrackerFilterActions } from '../types/actions'

const filterActions: DexTrackerActionFactory<DexTrackerFilterActions> = (setState, getState) => {
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
    setCompactMode(value) {
      const currentState = getState()
      setState({
        filters: {
          ...currentState.filters,
          compactMode: value,
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
