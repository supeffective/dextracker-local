// Tr. stands for "Tracker" and "Transformed"

export type TrAppChangelogEntry = {
  version: string
  content: string
  date: string
}

export type TrGameType = 'game' | 'dlc' | 'set' | 'superset'

export type TrPokedexBasicInfo = {
  id: string
  name: string
  region: string | null
  speciesCount: number
  formsCount: number
}

export type TrPokedexBasicInfoWithGameIds = TrPokedexBasicInfo & {
  gameIds: string[]
}

export type TrGame = {
  id: string
  name: string
  type: TrGameType | string
  pokedexes: Array<TrPokedexBasicInfo>
}

export type TrPokedexEntry = {
  /**
   * Pokemon ID (NID)
   */
  id: string
  /**
   * Regional dex number.
   */
  num: number
  /**
   * If true, this is the base form of the Pokemon for this Pokedex,
   * otherwise it is considered a form, even if it's considered the default form in the national dex.
   *
   * Examples: Alolan Raichu is a form of Raichu, but it is the base form of Raichu in the Alola dex, or
   * Hisuian Decidueye in the Hisui dex.
   */
  isBase: boolean
}

export type TrPokedex = {
  id: string
  name: string
  region: string | null
  gameIds: string[]
  maxDexNum: number
  pokemon: TrPokedexEntry[]
  speciesCount: number
  formsCount: number
}

export type TrPokeType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'
  | 'shadow' // non-canonical
  | 'stellar' // non-canonical
  | string

export type TrPokemonFlags = {
  isForm: boolean
  canBeShiny: boolean
  canBeMale: boolean
  canBeFemale: boolean
  isFemaleForm: boolean
  isCosmeticForm: boolean
  isRegional: boolean
  isUltraBeast: boolean
  isParadox: boolean
  isConvergent: boolean
  isLegendary: boolean
  isMythical: boolean
}

export type TrPokemonStats = {
  hp: number
  atk: number
  def: number
  spAtk: number
  spDef: number
  speed: number
  total: number
}

// Optimized and storable version of TrPokemon, that saves space by using arrays instead of objects.
export type TrSourcePokemon = {
  id: string // previously aka. NID, e.g. "0026-alola"
  slug: string // previously aka. ID, PID or SID, e.g. "raichu-alola"
  name: string
  natNum: number
  types: [type1: TrPokeType, type2: TrPokeType | null] | Array<TrPokeType | null>
  region: string
  color: string
  stats: [hp: number, atk: number, def: number, spAtk: number, spDef: number, speed: number] | Array<number>
  forms: string[]
  flags:
    | [
        isForm: boolean,
        canBeShiny: boolean,
        canBeMale: boolean,
        canBeFemale: boolean,
        isFemaleForm: boolean,
        isCosmeticForm: boolean,
        isRegional: boolean,
        isUltraBeast: boolean,
        isParadox: boolean,
        isConvergent: boolean,
        isLegendary: boolean,
        isMythical: boolean,
      ]
    | Array<boolean>
}

export type TrPokemon = {
  id: string // previously aka. NID, e.g. "0026-alola"
  slug: string // previously aka. ID, PID or SID, e.g. "raichu-alola"
  name: string
  natNum: number
  types: [TrPokeType, TrPokeType | null]
  region: string
  color: string
  stats: TrPokemonStats
  forms: string[]
  flags: TrPokemonFlags
  searchText: string
}

export type TrStatefulPokedexEntry<State = undefined> = TrPokedexEntry &
  TrPokemon & {
    state?: State
  }
