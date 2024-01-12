import { Game, PokedexIndexItem, pokedexesIndexMap, pokemonGamesMap } from '@supeffective/dataset'
import createPersistentStore from '../lib/storage/createPersistentStore'
import dexActions from './actions/dexActions'
import gameActions from './actions/gameActions'
import generalActions, { createDefaultState } from './actions/generalActions'
import sharedBoxActions from './actions/sharedBoxActions'
import trainerActions from './actions/trainerActions'

import { DexTrackerStore } from './types'
import { DexTrackerState } from './types/state'

const STORE_ID = 'pokedex-tracker-store'

const defaultState = createDefaultState()

const useDexTrackerStore = createPersistentStore<DexTrackerStore>(STORE_ID, (rawSet, get) => {
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

export function useCurrentGameAndDex(): {
  currentGame: Game
  currentDex: PokedexIndexItem
} {
  const [currentGameId, currentDexId] = useDexTrackerStore((state) => [state.currentGameId, state.currentDexId])
  const currentGame = pokemonGamesMap.get(currentGameId)
  if (!currentGame) {
    throw new Error(`Game ${currentGameId} not found in the index!`)
  }

  const currentDex = pokedexesIndexMap.get(currentDexId)
  if (!currentDex) {
    throw new Error(`Dex ${currentDexId} not found in the index!`)
  }

  return {
    currentGame,
    currentDex,
  }
}
