import { getDataCDNResourceUrl } from '@/lib/cdn'
import { TrGame, TrPokedex, TrPokemon } from '@/lib/dataset/types'
import { Game, Pokedex, Pokemon } from '@supeffective/dataset'
import fs from 'node:fs'
import path from 'node:path'

const DEST_DIR = `${process.cwd()}/public`

// Generates public/data/*.min.json files

// Download all the data from the API (dexes, pokemon), and optimize it to include only the data we need and:
// - avoid having to fetch secondary api calls
// - avoid data hydration loops (e.g. when we need to combine the data we have missing from many sources)

const gamesDataUrl = getDataCDNResourceUrl('games.min.json') // ~32KB
const pokedexesDataUrl = getDataCDNResourceUrl('pokedexes.min.json') // HEAVY ~1MB
const pokemonDataUrl = getDataCDNResourceUrl('pokemon.min.json') // HEAVY ~2MB

console.log('> Downloading and optimize data from the CDN...')

const gamesSrc = (await (await fetch(gamesDataUrl)).json()) as Game[]
const pokedexesSrc = (await (await fetch(pokedexesDataUrl)).json()) as Pokedex[]
const pokemonSrc = (await (await fetch(pokemonDataUrl)).json()) as Pokemon[]

console.log({
  games: gamesSrc.length,
  pokedexes: pokedexesSrc.length,
  pokemon: pokemonSrc.length,
})

type DataBundle = {
  games: TrGame[]
  // pokedexes: TrPokedex[]
  pokedexProps: Array<keyof TrPokedex>
  pokedexValues: TrPokedex[keyof TrPokedex][][]
  pokemonIds: Record<string, number>
  pokemonProps: Array<keyof TrPokemon>
  pokemonValues: TrPokemon[keyof TrPokemon][][]
}

const games: TrGame[] = gamesSrc.map((g) => {
  return {
    id: g.id,
    name: g.name,
    type: g.type,
    pokedexIds: g.pokedexes,
  } satisfies TrGame
})

const pokemon = pokemonSrc.map((pkm) => {
  return {
    id: pkm.nid,
    name: pkm.name,
    readableId: pkm.id,
    natDexNum: pkm.dexNum,
    region: pkm.region,
    type1: pkm.type1,
    type2: pkm.type2,
    color: pkm.color,
    canBeShiny: pkm.shinyReleased,
    isForm: pkm.isForm,
    isFemaleForm: pkm.isFemaleForm,
    isCosmeticForm: pkm.isCosmeticForm,
    canBeMale: pkm.maleRate > 0,
    canBeFemale: pkm.femaleRate > 0,
  } satisfies TrPokemon
})

const pokemonIds: Record<string, number> = pokemon.reduce(
  (acc, pkm, i) => {
    acc[pkm.readableId] = i + 1
    return acc
  },
  {} as Record<string, number>,
)

const pokedexes = pokedexesSrc.map((dex) => {
  const dexEntries: [number, number][] = dex.entries.map((p) => {
    const numericId = pokemonIds[p.id]
    if (!numericId) {
      throw new Error(`Pokemon ${p.id} not found in pokemonIds record`)
    }
    return [p.dexNum ?? 0, numericId]
  })
  const maxDexNum = dexEntries.reduce((max, p) => Math.max(max, p[0]), 0)
  const gameIds = games.filter((g) => g.pokedexIds.includes(dex.id)).map((g) => g.id)

  return {
    id: dex.id,
    name: dex.name,
    region: dex.region,
    gameIds: gameIds,
    maxDexNum: maxDexNum,
    pokemon: dexEntries,
  } satisfies TrPokedex
})

const dataBundle: DataBundle = {
  games,
  pokedexProps: ['id', 'name', 'region', 'gameIds', 'maxDexNum', 'pokemon'],
  pokedexValues: pokedexes.map((dex) => [dex.id, dex.name, dex.region, dex.gameIds, dex.maxDexNum, dex.pokemon]),
  pokemonIds,
  pokemonProps: [
    'id',
    'name',
    'readableId',
    'natDexNum',
    'region',
    'type1',
    'type2',
    'color',
    'canBeShiny',
    'isForm',
    'isFemaleForm',
    'isCosmeticForm',
    'canBeMale',
    'canBeFemale',
  ],
  pokemonValues: pokemon.map((pkm) => [
    pkm.id,
    pkm.name,
    pkm.readableId,
    pkm.natDexNum,
    pkm.region,
    pkm.type1,
    pkm.type2,
    pkm.color,
    pkm.canBeShiny,
    pkm.isForm,
    pkm.isFemaleForm,
    pkm.isCosmeticForm,
    pkm.canBeMale,
    pkm.canBeFemale,
  ]),
}

// Save all to file
fs.writeFileSync(path.join(DEST_DIR, 'data-bundle.min.json'), JSON.stringify(dataBundle))

console.log('> Done!')
