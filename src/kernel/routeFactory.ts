import { getFirstDexForGame, getFirstGameForDex } from '@/lib/dataset/pokedexes'

export const routeFactory = {
  home: '/',
  pokedex: (dexId: string | null | undefined, gameId: string | null | undefined) => {
    if (!gameId && !dexId) {
      throw new Error('routeFactory.pokedex: gameId and dexId are both undefined')
    }

    if (gameId && !dexId) {
      const dex = getFirstDexForGame(gameId)
      return `/#/pokedex/${dex?.id}/${gameId}`
    }

    if (!gameId && dexId) {
      const game = getFirstGameForDex(dexId)
      return `/#/pokedex/${dexId}/${game?.id}`
    }

    return `/#/pokedex/${dexId}/${gameId}`
  },
}
