import { DexTrackerActionFactory, DexTrackerGeneralActions } from '../types/actions'
import { DexTrackerState, dexTrackerStateSchema } from '../types/state'

export const DEFAULT_GAME_ID = 'sv-s'
export const DEFAULT_DEX_ID = 'paldea'
export function createDefaultState(): DexTrackerState {
  const defaultState: DexTrackerState = {
    title: 'Dex Tracker',
    trainer: undefined,
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
      let data = {}

      try {
        const parsed = JSON.parse(json)
        data = dexTrackerStateSchema.parse(parsed)
      } catch (error) {
        console.error(error)
        throw new Error('Invalid JSON file provided')
      }

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
