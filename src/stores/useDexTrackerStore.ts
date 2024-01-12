import { TrGame, TrPokedexBasicInfo } from '@/lib/dataset/types'
import createPersistentStore from '../lib/storage/createPersistentStore'
import dexActions from './actions/dexActions'
import gameActions from './actions/gameActions'
import generalActions, { DEFAULT_GAME_ID, createDefaultState } from './actions/generalActions'
import sharedBoxActions from './actions/sharedBoxActions'
import trainerActions from './actions/trainerActions'

import { gamesDatasetMap } from '@/lib/dataset/games'
import { DexTrackerStore } from './types'
import { DexTrackerState } from './types/state'

const STORE_ID = 'pokedex-tracker-store-v2'

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
  currentGame: TrGame
  currentDex: TrPokedexBasicInfo
} {
  const [currentGameId, currentDexId] = useDexTrackerStore((state) => [state.currentGameId, state.currentDexId])
  const currentGame = gamesDatasetMap.get(currentGameId ?? DEFAULT_GAME_ID)
  if (!currentGame) {
    throw new Error(`Game ${currentGameId} not found in the index!`)
  }

  if (currentGame.pokedexes.length === 0) {
    throw new Error(`Game ${currentGameId} has no pokedexes!`)
  }

  let currentDex: TrPokedexBasicInfo = currentGame.pokedexes[0]
  if (currentDexId) {
    const found = currentGame.pokedexes.find((dex) => dex.id === currentDexId)
    if (!found) {
      throw new Error(`Dex ${currentDexId} not found in game ${currentGameId}!`)
    }
    currentDex = found
  } else {
    console.warn(`No dex selected for game ${currentGameId}, using ${currentDex.id} instead.`)
  }

  return {
    currentGame,
    currentDex,
  }
}
