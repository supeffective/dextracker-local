import gamesJsonexport from './data/games.min.json'
import { TrGame } from './types'

export const gamesDataset: TrGame[] = gamesJsonexport
export const gamesFilteredDataset = gamesDataset
  .filter((game) => game.type === 'game')
  .filter((game) => game.pokedexes.length > 0)
