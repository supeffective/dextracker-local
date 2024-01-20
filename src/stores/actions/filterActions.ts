import { DexTrackerActionFactory, DexTrackerFilterActions } from '../types/actions'

const filterActions: DexTrackerActionFactory<DexTrackerFilterActions> = (setState, getState) => {
  return {
    setTrackShinies(value) {
      const currentState = getState()
      setState({
        options: {
          ...currentState.options,
          trackShinies: value,
        },
      })
    },
    setHideForms(value) {
      const currentState = getState()
      setState({
        options: {
          ...currentState.options,
          hideForms: value,
        },
      })
    },
    setHideCaught(value) {
      const currentState = getState()
      setState({
        options: {
          ...currentState.options,
          hideCaught: value,
        },
      })
    },
    setCompactMode(value) {
      const currentState = getState()
      setState({
        options: {
          ...currentState.options,
          compactMode: value,
        },
      })
    },
    setHideCosmeticForms(value) {
      const currentState = getState()
      setState({
        options: {
          ...currentState.options,
          hideCosmeticForms: value,
        },
      })
    },
    setSearchQuery(query) {
      const currentState = getState()
      setState({
        options: {
          ...currentState.options,
          searchQuery: query ?? undefined,
        },
      })
    },
    clearSearchQuery() {
      const currentState = getState()
      setState({
        options: {
          ...currentState.options,
          searchQuery: undefined,
        },
      })
    },
  }
}

export default filterActions
