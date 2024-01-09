export type PokeGender = 'm' | 'f' | 'n'
export type PokeTradingStatus = 'wanted' | 'offered' | 'traded'

export type TrainerInfoState = {
  avatar?: string
  nickname: string
}

export type DexId = {
  id: string
  region: string | null
}

export type PokedexEntryState = {
  nid: string
  seen: boolean
  caught: boolean
  shiny: boolean
  genders: Array<PokeGender>
}

export type PokedexState = {
  id: string
  pokemon: Record<string, PokedexEntryState>
}

export type PokeboxEntryState = {
  nid: string
  origin: string
  status: PokeTradingStatus
  quantity: number
  shiny: boolean
  gender: PokeGender
}

export type PokeboxState = {
  title?: string
  gameIds: Array<string>
  pokemon: Array<PokeboxEntryState>
}

export type DexTrackerFilter = {
  shinyMode?: boolean
  searchQuery?: string
  onlyMissing?: boolean
  // withVariants?: boolean
}

export type DexTrackerState = {
  title?: string
  trainer?: TrainerInfoState
  filter?: DexTrackerFilter
  gameIds: Array<string>
  currentGameId?: string
  dexes: Record<string, PokedexState>
  currentDexId?: string
  sharedBox?: PokeboxState
  lastModified?: number
}
