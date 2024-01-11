// Tr. stands for "Tracker" and "Transformed"

export type TrGame = {
  id: string
  name: string
  type: 'game' | 'dlc' | 'set' | 'superset'
  pokedexIds: string[]
}

export type TrPokedex = {
  id: string
  name: string
  region: string | null
  gameIds: string[]
  maxDexNum: number
  pokemon: TrPokedexEntry[]
}

export type TrPokedexEntry = [regionalDexNum: number, pokemonNumericId: number]

export type TrPokemon = {
  id: string // aka. NID, e.g. "0026-alola"
  name: string
  readableId: string // e.g. "raichu-alola"
  natDexNum: number // National dex number
  type1: string
  type2: string | null
  region: string
  color: string
  // canBeCaught: booleanl // not needed for now
  canBeShiny: boolean
  canBeMale: boolean
  canBeFemale: boolean
  isForm: boolean
  isFemaleForm: boolean
  isCosmeticForm: boolean
  // baseSpeciesId: string | null // not needed for now
}

export type TrPokemonSearchEntry = TrPokemon & {
  fullSearchText: string
}

// --------------------------------------------------------------------------------------
// Stateful types:

export type TrPokedexState = {
  id: string
  pokemon: Record<string, TrPokedexEntryState>
}

export type TrPokedexEntryState = {
  id: string // NID
  caught?: boolean
  shiny?: boolean
}

export type TrPokedexSearchEntry = TrPokemonSearchEntry & {
  dexNum: number
  state?: TrPokedexEntryState
}
