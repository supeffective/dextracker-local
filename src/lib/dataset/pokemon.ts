import pokemonListJson from './data/pokemon.min.json'
import { TrPokemon, TrPokemonFlags, TrPokemonStats, TrSourcePokemon } from './types'

export const pokemonDataset: TrPokemon[] = pokemonListJson.map((pkm: TrSourcePokemon): TrPokemon => {
  if (!pkm.types[0]) {
    throw new Error(`Pokemon first type for ${pkm.id} has a nullish value`)
  }

  const expandedPkmData = {
    ...pkm,
    speciesName: pkm.speciesName,
    types: [pkm.types[0], pkm.types[1] ?? null],
    flags: _getPokemonFlagsAsObject(pkm),
    stats: _getPokemonStatsAsObject(pkm),
    searchText: '',
  } satisfies TrPokemon

  expandedPkmData.searchText = _generatePokemonSearchableText(expandedPkmData)

  return expandedPkmData
})

export const pokemonDatasetMap: Map<string, TrPokemon> = new Map(
  pokemonDataset.map((pkm) => {
    return [pkm.id, pkm]
  }),
)

function _getPokemonStatsAsObject(pkm: TrSourcePokemon): TrPokemonStats {
  const stats = pkm.stats

  if (stats.length !== 6) {
    throw new Error(`Pokemon ${pkm.id} has ${stats.length} stat values instead of 6`)
  }

  return {
    hp: stats[0],
    atk: stats[1],
    def: stats[2],
    spAtk: stats[3],
    spDef: stats[4],
    speed: stats[5],
    total: stats.reduce((acc, val) => acc + val, 0),
  }
}

function _getPokemonFlagsAsObject(pkm: TrSourcePokemon): TrPokemonFlags {
  const flags = pkm.flags

  if (flags.length !== 12) {
    throw new Error(`Pokemon ${pkm.id} has ${flags.length} flags instead of 12`)
  }

  return {
    isForm: flags[0],
    canBeShiny: flags[1],
    canBeMale: flags[2],
    canBeFemale: flags[3],
    isFemaleForm: flags[4],
    isCosmeticForm: flags[5],
    isRegional: flags[6],
    isUltraBeast: flags[7],
    isParadox: flags[8],
    isConvergent: flags[9],
    isLegendary: flags[10],
    isMythical: flags[11],
  }
}

function _generatePokemonSearchableText(pkm: TrPokemon): string {
  const { name, slug, region, types, color } = pkm
  const {
    isForm,
    canBeShiny,
    canBeMale,
    canBeFemale,
    isFemaleForm,
    isCosmeticForm,
    isRegional,
    isUltraBeast,
    isParadox,
    isConvergent,
    isLegendary,
    isMythical,
  } = pkm.flags

  const normalTokens = [
    name,
    slug,
    `:region:${region}`,
    `:color:${color}`,
    types
      .filter(Boolean)
      .map((type) => `:type:${type}`)
      .join(' '),
  ].join(' ')

  const conditionalTokens = [
    isForm ? ':form' : '',
    !canBeShiny ? ':shinylocked :noshiny' : '',
    !canBeMale || isFemaleForm ? ':gender:femaleonly' : '',
    !canBeFemale ? ':gender:maleonly' : '',
    isCosmeticForm ? ':cosmeticform' : '',
    isRegional ? ':regional' : '',
    isUltraBeast ? ':ultrabeast' : '',
    isParadox ? ':paradox' : '',
    isConvergent ? ':convergent' : '',
    isLegendary ? ':legendary' : '',
    isMythical ? ':mythical' : '',
  ].join(' ')

  return `${normalTokens} ${conditionalTokens}`.toLowerCase()
}
