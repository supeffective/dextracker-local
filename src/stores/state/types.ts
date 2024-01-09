export type PokeGender = 'm' | 'f' | 'n'
export type PokeTradingState = 'wanted' | 'offered' | 'traded'

export type TrainerInfo = {
  avatar?: string
  nickname: string
}

export type PokedexEntry = {
  nid: string
  seen: boolean
  caught: boolean
  shiny: boolean
  genders: Array<PokeGender>
}

export type Pokedex = {
  id: string
  pokemon: Record<string, PokedexEntry>
}

export type PokeboxEntry = {
  nid: string
  origin: string
  state: PokeTradingState
  quantity: number
  shiny: boolean
  gender: PokeGender
}

export type Pokebox = {
  title?: string
  gameIds: Array<string>
  pokemon: Array<PokeboxEntry>
}

export type DexTrackerState = {
  title?: string
  trainer?: TrainerInfo
  shinyMode?: boolean
  gameIds: Array<string>
  currentGameId?: string
  dexes: Record<string, Pokedex>
  currentDexId?: string
  sharedBox?: Pokebox
  lastModified?: number
}
