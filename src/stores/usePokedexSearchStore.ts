import createPersistentStore from '../lib/createPersistentStore'
import filterActions from './actions/filterActions'
import { createDefaultState } from './actions/generalActions'

import { PokedexSearchState } from './state/types'
import { PokedexSearchStore } from './types'

const STORE_ID = 'pokedex-search-store'

const defaultDexTrackerState = createDefaultState()
const defaultState: PokedexSearchState = {
  dexId: defaultDexTrackerState.currentDexId,
  filters: undefined,
  results: [],
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
