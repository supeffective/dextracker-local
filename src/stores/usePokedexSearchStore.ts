import createPersistentStore from '../lib/storage/createPersistentStore'
import filterActions from './actions/filterActions'
import { createDefaultState } from './actions/generalActions'

import { PokedexSearchStore } from './types'
import { PokedexSearchState } from './types/state'

const STORE_ID = 'pokedex-search-store-v2'

const defaultDexTrackerState = createDefaultState()
const defaultState: PokedexSearchState = {
  dexId: defaultDexTrackerState.currentDexId,
  filters: undefined,
  lastModified: undefined,
}

const usePokedexSearchStore = createPersistentStore<PokedexSearchStore>(STORE_ID, (rawSet, get) => {
  const updateState = (state: Partial<PokedexSearchStore>) => {
    rawSet({ lastModified: Date.now(), ...state })
  }

  return {
    ...defaultState,
    ...filterActions(updateState, get),
  }
})

export default usePokedexSearchStore
