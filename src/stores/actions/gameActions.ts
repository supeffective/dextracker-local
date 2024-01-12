import { pokemonGamesMap } from '@supeffective/dataset'
import { DexTrackerActionFactory, DexTrackerGameActions } from '../types/actions'
import { DEFAULT_DEX_ID, DEFAULT_GAME_ID } from './generalActions'

const gameActions: DexTrackerActionFactory<DexTrackerGameActions> = (setState, getState) => {
  return {
    registerGame(gameId) {
      const currentGameIds = getState().gameIds
      const uniqueGameIds = new Set([...currentGameIds, gameId])
      setState({
        gameIds: [...uniqueGameIds],
      })
    },
    unregisterGame(gameId) {
      const currentGameIds = getState().gameIds
      const uniqueGameIds = new Set(currentGameIds)
      uniqueGameIds.delete(gameId)
      setState({
        gameIds: [...uniqueGameIds],
      })
    },
    setCurrentGame(gameId) {
      if (!gameId || gameId === '') {
        setState({
          currentGameId: DEFAULT_GAME_ID,
          currentDexId: DEFAULT_DEX_ID,
        })
        return
      }

      const game = pokemonGamesMap.get(gameId)
      if (!game) {
        throw new Error(`Game '${gameId}' does not exist`)
      }

      setState({
        currentGameId: gameId,
        currentDexId: game.pokedexes[0],
      })
    },
  }
}

export default gameActions
