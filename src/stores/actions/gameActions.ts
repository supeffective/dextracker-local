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
      setState({
        currentGameId: gameId,
      })
    },
  }
}

export default gameActions
