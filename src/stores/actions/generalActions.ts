import { DexTrackerState } from '../state/types'
import { DexTrackerActionFactory, DexTrackerGeneralActions } from './types'

export function createDefaultState(): DexTrackerState {
  const defaultState: DexTrackerState = {
    title: 'Dex Tracker',
    trainer: undefined,
    gameIds: [],
    dexes: {},
    currentDexId: undefined,
    currentGameId: undefined,
    sharedBox: undefined,
    lastModified: undefined,
  }

  return defaultState
}

const generalActions: DexTrackerActionFactory<DexTrackerGeneralActions> = (setState, getState) => {
  return {
    resetData() {
      setState(createDefaultState())
    },
    loadFromJSON(json) {
      const currentState = getState()
      const data = JSON.parse(json)
      setState({
        ...currentState,
        ...data,
      })
    },
    setTitle(title) {
      setState({
        title,
      })
    },
  }
}

export default generalActions
