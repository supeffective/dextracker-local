import { DexTrackerActionFactory, DexTrackerFilterActions } from './types'

const filterActions: DexTrackerActionFactory<DexTrackerFilterActions> = (setState, getState) => {
  return {
    setShinyMode(value) {
      const currentState = getState()
      setState({
        filter: {
          ...currentState.filter,
          shinyMode: value,
        },
      })
    },
    setSearchQuery(query) {
      const currentState = getState()
      setState({
        filter: {
          ...currentState.filter,
          searchQuery: query ?? undefined,
        },
      })
    },
    clearSearchQuery() {
      const currentState = getState()
      setState({
        filter: {
          ...currentState.filter,
          searchQuery: undefined,
        },
      })
    },
    setOnlyMissing(value) {
      const currentState = getState()
      setState({
        filter: {
          ...currentState.filter,
          onlyMissing: value,
        },
      })
    },
  }
}

export default filterActions
