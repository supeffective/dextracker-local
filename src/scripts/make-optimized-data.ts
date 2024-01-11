import { getDataCDNResourceUrl } from '@/lib/cdn'
import { Game, Pokedex, Pokemon } from '@supeffective/dataset'

// Generates public/data/*.min.json files

// Download all the data from the API (dexes, pokemon), and optimize it to include only the data we need and:
// - avoid having to fetch secondary api calls
// - avoid data hydration loops (e.g. when we need to combine the data we have missing from many sources)

const gamesDataUrl = getDataCDNResourceUrl('games.min.json') // ~32KB
const pokedexesDataUrl = getDataCDNResourceUrl('pokedexes.min.json') // HEAVY ~1MB
const pokemonDataUrl = getDataCDNResourceUrl('pokemon.min.json') // HEAVY ~2MB

console.log('Downloading games data...')

/**
 *
 * Rules:
 *
 * - Pokemon nid always as pokemon identifier (not id): this saves some bytes (name ids can be longer)
 * - Prefer CSV-like data structures (arrays, with the first entry as column names) over objects: this saves lots of bytes (keys are not repeated)
 * - If combined data is less than 200KB, include it in the final HTML bundle as JS object. Otherwise, save and fetch it as a separate JSON file.
 */

const games = (await (await fetch(gamesDataUrl)).json()) as Game[]
const pokedexes = (await (await fetch(pokedexesDataUrl)).json()) as Pokedex[]
const pokemon = (await (await fetch(pokemonDataUrl)).json()) as Pokemon[]

console.log({
  games: games.length,
  pokedexes: pokedexes.length,
  pokemon: pokemon.length,
})
