import fs from 'node:fs'
import path from 'node:path'
import { getDataCDNResourceUrl } from '@/kernel/urls'
import type { TrGame, TrPokedex, TrPokedexBasicInfo, TrPokedexEntry, TrSourcePokemon } from '@/lib/dataset/types'
import type { Game, Pokedex, Pokemon } from '@supeffective/dataset'

const PUBLIC_DEST_DIR = `${process.cwd()}/public`
const SRC_DEST_DIR = `${process.cwd()}/src/lib/dataset/data`

if (!fs.existsSync(SRC_DEST_DIR)) {
  fs.mkdirSync(SRC_DEST_DIR, { recursive: true })
}

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

const pokemonSrcMap: Record<string, Pokemon> = pokemonSrc.reduce(
  (acc, pkm) => {
    acc[pkm.id] = pkm
    return acc
  },
  {} as Record<string, Pokemon>,
)

const pokedexesSrcMap: Record<string, Pokedex> = pokedexesSrc.reduce(
  (acc, dex) => {
    acc[dex.id] = dex
    return acc
  },
  {} as Record<string, Pokedex>,
)

const gamesSrcMap: Record<string, Game> = gamesSrc.reduce(
  (acc, game) => {
    acc[game.id] = game
    return acc
  },
  {} as Record<string, Game>,
)

const games: TrGame[] = gamesSrc.map((g) => {
  let parentName: string | undefined = undefined
  let fullName: string = g.fullName ?? g.name

  if (g.gameSet && g.gameSet !== g.id) {
    const gset = gamesSrcMap[g.gameSet]
    parentName = gset.name
  }

  if (g.type === 'dlc' && g.gameSet && g.gameSet !== g.id) {
    const gset = gamesSrcMap[g.gameSet]
    fullName = `${gset.name} - ${g.name} DLC`
  }

  return {
    id: g.id,
    name: g.name,
    fullName,
    parentName,
    type: g.type,
    pokedexes: g.pokedexes.map((dexId) => {
      const dex = pokedexesSrcMap[dexId]
      if (!dex) {
        throw new Error(`Pokedex ${dexId} not found in the pokedexesSrcMap object`)
      }
      const dexPkms: Pokemon[] = dex.entries.map((p) => ({
        ...pokemonSrcMap[p.id],
        isForm: p.isForm,
      }))

      return {
        id: dex.id,
        region: dex.region,
        name: dex.name,
        counters: {
          species: dexPkms.filter((p) => !p.isForm).length,
          forms: dexPkms.filter((p) => p.isForm).length,
          cosmeticForms: dexPkms.filter((p) => p.isCosmeticForm).length,
          shinySpecies: dexPkms.filter((p) => !p.isForm && p.shinyReleased).length,
          shinyForms: dexPkms.filter((p) => p.isForm && p.shinyReleased).length,
          shinyCosmeticForms: dexPkms.filter((p) => p.isCosmeticForm && p.shinyReleased).length,
        },
      } satisfies TrPokedexBasicInfo
    }),
  } satisfies TrGame
})

const gamesDataFile = path.join(SRC_DEST_DIR, 'games.min.json')
fs.writeFileSync(gamesDataFile, JSON.stringify(games, null, 2))
console.log(`  Wrote ${gamesDataFile}`)

const pokemon = pokemonSrc.map((pkm) => {
  const speciesName = pokemonSrcMap[pkm.baseSpecies ?? pkm.id]?.name ?? pkm.name

  return {
    id: pkm.nid,
    natNum: pkm.dexNum,
    slug: pkm.id,
    name: pkm.name,
    speciesName,
    region: pkm.region,
    types: [pkm.type1, pkm.type2],
    color: pkm.color,
    stats: [
      pkm.baseStats.hp,
      pkm.baseStats.atk,
      pkm.baseStats.def,
      pkm.baseStats.spa,
      pkm.baseStats.spd,
      pkm.baseStats.spe,
    ],
    flags: [
      pkm.isForm,
      pkm.shinyReleased,
      pkm.maleRate > 0,
      pkm.femaleRate > 0,
      pkm.isFemaleForm,
      pkm.isCosmeticForm,
      pkm.isRegional,
      pkm.isUltraBeast,
      pkm.paradoxSpecies ? pkm.paradoxSpecies?.length > 0 : false,
      pkm.convergentSpecies ? pkm.convergentSpecies?.length > 0 : false,
      pkm.isLegendary,
      pkm.isMythical,
      pkm.hasGenderDifferences,
    ],
    forms: pkm.forms ?? [],
  } satisfies TrSourcePokemon
})

const pkmDataFile = path.join(SRC_DEST_DIR, 'pokemon.min.json')
fs.writeFileSync(pkmDataFile, JSON.stringify(pokemon))
console.log(`  Wrote ${pkmDataFile}`)

const pokemonSlugMap: Record<string, TrSourcePokemon> = pokemon.reduce(
  (acc, pkm) => {
    acc[pkm.slug] = pkm
    return acc
  },
  {} as Record<string, TrSourcePokemon>,
)

const pokedexes = pokedexesSrc.map((dex) => {
  const dexEntries = dex.entries.map((p) => {
    const fullPkm = pokemonSlugMap[p.id]
    if (!fullPkm) {
      throw new Error(`Pokemon ${p.id} not found in the pokemonIdMap object`)
    }

    if (typeof p.dexNum !== 'number') {
      throw new Error(`No dexNum found for pokemon ${fullPkm.id} and dex ${dex.id}`)
    }

    return {
      id: fullPkm.id,
      num: p.dexNum ?? 0,
      isBase: p.isForm,
    } satisfies TrPokedexEntry
  })

  const maxDexNum = dexEntries.reduce((max, p) => Math.max(max, p.num), 0)
  const gameIds = games.filter((g) => g.pokedexes.map((p) => p.id).includes(dex.id)).map((g) => g.id)

  const speciesCount = dex.entries.filter((p) => !p.isForm).length
  const formsCount = dex.entries.filter((p) => p.isForm).length

  return {
    id: dex.id,
    name: dex.name,
    region: dex.region,
    gameIds: gameIds,
    maxDexNum: maxDexNum,
    pokemon: dexEntries,
    speciesCount,
    formsCount,
  } satisfies TrPokedex
})

for (const dex of pokedexes) {
  const baseDir = path.join(PUBLIC_DEST_DIR, 'data/pokedexes')
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true })
  }
  const dexDataFile = path.join(PUBLIC_DEST_DIR, `data/pokedexes/${dex.id}.min.json`)
  fs.writeFileSync(dexDataFile, JSON.stringify(dex))
  console.log(`  Wrote ${dexDataFile}`)
}

console.log({
  games: gamesSrc.length,
  pokedexes: pokedexesSrc.length,
  pokemon: pokemonSrc.length,
})

console.log('> Done!')
