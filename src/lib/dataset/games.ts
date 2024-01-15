import gamesJsonexport from './data/games.min.json'
import { TrGame } from './types'

export const gamesDataset: TrGame[] = gamesJsonexport
export const gamesFilteredDataset = gamesDataset
  .filter((game) => game.type === 'game' || game.type === 'dlc')
  .filter((game) => game.pokedexes.length > 0)

export const gamesDatasetMap: Map<string, TrGame> = new Map(gamesDataset.map((game) => [game.id, game]))
