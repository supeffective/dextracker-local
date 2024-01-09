import { pokemonGamesMap } from '@supeffective/dataset'
import { DexTrackerActionFactory, DexTrackerGameActions } from './types'

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
          currentGameId: undefined,
          currentDexId: undefined,
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
