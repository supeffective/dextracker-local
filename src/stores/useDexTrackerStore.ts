import createPersistentStore from '../lib/createPersistentStore'
import dexActions from './actions/dexActions'
import gameActions from './actions/gameActions'
import generalActions, { createDefaultState } from './actions/generalActions'
import sharedBoxActions from './actions/sharedBoxActions'
import trainerActions from './actions/trainerActions'
import { DexTrackerState } from './state/types'
import { DexTrackerStore } from './types'

const defaultState = createDefaultState()

const useDexTrackerStore = createPersistentStore<DexTrackerStore>((rawSet, get) => {
  const updateState = (state: Partial<DexTrackerState>) => {
    rawSet({ lastModified: Date.now(), ...state })
  }

  return {
    ...defaultState,
    ...generalActions(updateState, get),
    ...trainerActions(updateState, get),
    ...gameActions(updateState, get),
    ...dexActions(updateState, get),
    ...sharedBoxActions(updateState, get),
  }
})

export default useDexTrackerStore
