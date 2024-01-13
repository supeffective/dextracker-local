import { gamesDatasetMap, gamesFilteredDataset } from './games'
import { TrGame, TrPokedexBasicInfoWithGameIds } from './types'

export const pokedexBasicInfoMap = createPokedexBasicInfoMap()

function createPokedexBasicInfoMap(): Map<string, TrPokedexBasicInfoWithGameIds> {
  const pokedexBasicInfoMap = new Map<string, TrPokedexBasicInfoWithGameIds>([])

  for (const game of gamesFilteredDataset) {
    for (const gameDex of game.pokedexes) {
      const currentDex = pokedexBasicInfoMap.get(gameDex.id)
      if (currentDex) {
        const currentDexGameIds = new Set(currentDex.gameIds)
        currentDexGameIds.add(game.id)
        currentDex.gameIds.push(...currentDexGameIds)
        continue
      }

      const newDex: TrPokedexBasicInfoWithGameIds = {
        ...gameDex,
        gameIds: [game.id],
      }

      pokedexBasicInfoMap.set(newDex.id, newDex)
    }
  }

  return pokedexBasicInfoMap
}

export function getFirstGameForDex(dexId: string): TrGame | undefined {
  const dex = pokedexBasicInfoMap.get(dexId)
  if (!dex || !dex.gameIds.length) {
    return undefined
  }

  const gameId = dex.gameIds[0]

  return gamesDatasetMap.get(gameId)
}

export function getFirstDexForGame(gameId: string): TrPokedexBasicInfoWithGameIds | undefined {
  const game = gamesDatasetMap.get(gameId)
  if (!game || !game.pokedexes.length) {
    return undefined
  }

  const dexId = game.pokedexes[0].id

  return pokedexBasicInfoMap.get(dexId)
}
