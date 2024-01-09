import { DexTrackerState } from '../state/types'
import { DexTrackerActionFactory, DexTrackerGeneralActions } from './types'

export const DEFAULT_GAME_ID = 'sv-s'
export const DEFAULT_DEX_ID = 'paldea'
export function createDefaultState(): DexTrackerState {
  const defaultState: DexTrackerState = {
    title: 'Dex Tracker',
    trainer: undefined,
    filter: undefined,
    gameIds: [],
    dexes: {},
    currentGameId: DEFAULT_GAME_ID,
    currentDexId: DEFAULT_DEX_ID,
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
