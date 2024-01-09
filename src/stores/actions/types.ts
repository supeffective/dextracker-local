import {
  DexTrackerState,
  PokeboxEntryState,
  PokeboxState,
  PokedexEntryState,
  PokedexState,
  TrainerInfoState,
} from '../state/types'

export type DexTrackerGeneralActions = {
  resetData: () => void
  loadFromJSON: (json: string) => void
  setTitle: (title: string) => void
}

export type DexTrackerFilterActions = {
  setShinyMode: (value: boolean) => void
  setSearchQuery: (query: string | null) => void
  clearSearchQuery: () => void
  setOnlyMissing: (value: boolean) => void
}

export type DexTrackerTrainerActions = {
  updateTrainer: (trainer: Partial<TrainerInfoState>) => void
}

export type DexTrackerGameActions = {
  registerGame: (gameId: string) => void
  unregisterGame: (gameId: string) => void
  setCurrentGame: (gameId: string) => void
}

export type DexTrackerDexActions = {
  updateDex: (dexId: string, data: Partial<PokedexState>) => void
  setCurrentDex: (dexId: string) => void
  removeDex: (dexId: string) => void
  updateDexPokemon: (dexId: string, nid: string, data: Partial<PokedexEntryState>) => void
}

export type DexTrackerSharedBoxActions = {
  updateSharedBox: (data: Partial<PokeboxState>) => void
  updateSharedBoxPokemon: (index: number, data: Partial<PokeboxEntryState>) => void
  loadSharedBoxFromJSON: (json: string) => void
}

export type DexTrackerActions = DexTrackerGeneralActions &
  DexTrackerTrainerActions &
  DexTrackerGameActions &
  DexTrackerDexActions &
  DexTrackerSharedBoxActions &
  DexTrackerFilterActions

export type DexTrackerStateGetter = () => DexTrackerState
export type DexTrackerStateSetter = (state: Partial<DexTrackerState>) => void
export type DexTrackerActionFactory<T> = (set: DexTrackerStateSetter, get: DexTrackerStateGetter) => T
