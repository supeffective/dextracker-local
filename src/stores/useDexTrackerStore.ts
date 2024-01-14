import createPersistentStore from '../lib/storage/createPersistentStore'
import dexActions from './actions/dexActions'
import filterActions from './actions/filterActions'
import gameActions from './actions/gameActions'
import generalActions, { createDefaultState } from './actions/generalActions'
import sharedBoxActions from './actions/sharedBoxActions'
import trainerActions from './actions/trainerActions'

import { DexTrackerStore } from './types'
import { DexTrackerState } from './types/state'

const STORE_VERSION = 4

// We'll use one localStorage key per version, so data is not lost while the app is under active development
const STORE_ID = `superdextracker-store-v${STORE_VERSION}`

const defaultState = createDefaultState()

export const useDexTrackerStore = createPersistentStore<DexTrackerStore>(STORE_ID, STORE_VERSION, (rawSet, get) => {
  const updateState = (state: Partial<DexTrackerState>) => {
    rawSet({ lastModified: Date.now(), ...state })
  }

  return {
    ...defaultState,
    ...generalActions(updateState, get),
    ...trainerActions(updateState, get),
    ...gameActions(updateState, get),
    ...dexActions(updateState, get),
    ...filterActions(updateState, get),
    ...sharedBoxActions(updateState, get),
  }
})

export default useDexTrackerStore
