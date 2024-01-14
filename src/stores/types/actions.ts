import { DexTrackerState, PokeboxEntryState, PokeboxState, PokedexEntryState, TrainerInfoState } from './state'

export type DexTrackerGeneralActions = {
  resetData: () => void
  loadFromJSON: (json: string) => void
  setTitle: (title: string) => void
}

export type DexTrackerTrainerActions = {
  updateTrainer: (trainer: Partial<TrainerInfoState>) => void
}

export type DexTrackerGameActions = {
  registerGame: (gameId: string) => void
  unregisterGame: (gameId: string) => void
}

export type DexTrackerDexActions = {
  setCurrentDex: (dexId: string, gameId?: string) => void
  unsetCurrentDex: () => void
  removeDex: (fullDexId: string) => void
  updateDexPokemon: (fullDexId: string, pokemonId: string, data: Partial<PokedexEntryState>) => void
}

export type DexTrackerSharedBoxActions = {
  updateSharedBox: (data: Partial<PokeboxState>) => void
  updateSharedBoxPokemon: (index: number, data: Partial<PokeboxEntryState>) => void
  loadSharedBoxFromJSON: (json: string) => void
}

export type DexTrackerFilterActions = {
  // applyFilters(dex: Pokedex, dexState: PokedexState, filter: DexTrackerFilter): PokedexSearchIndex
  setShinyMode: (value: boolean) => void
  setHideForms: (value: boolean) => void
  setHideCosmeticForms: (value: boolean) => void
  setHideCaught: (value: boolean) => void
  setSearchQuery: (query: string | null) => void
  clearSearchQuery: () => void
}

export type DexTrackerActions = DexTrackerGeneralActions &
  DexTrackerTrainerActions &
  DexTrackerGameActions &
  DexTrackerDexActions &
  DexTrackerFilterActions &
  DexTrackerSharedBoxActions

export type DexTrackerStateGetter = () => DexTrackerState
export type DexTrackerStateSetter = (state: Partial<DexTrackerState>) => void
export type DexTrackerActionFactory<T> = (set: DexTrackerStateSetter, get: DexTrackerStateGetter) => T
