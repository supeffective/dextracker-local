import { Game, PokedexIndexItem, pokedexesIndexMap, pokemonGamesMap } from '@supeffective/dataset'
import createPersistentStore from '../lib/createPersistentStore'
import dexActions from './actions/dexActions'
import filterActions from './actions/filterActions'
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
    ...filterActions(updateState, get),
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
