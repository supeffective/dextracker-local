import { DexTrackerState, Pokebox, PokeboxEntry, Pokedex, PokedexEntry, TrainerInfo } from '../state/types'

export type DexTrackerGeneralActions = {
  resetData: () => void
  loadFromJSON: (json: string) => void
  setTitle: (title: string) => void
}

export type DexTrackerTrainerActions = {
  updateTrainer: (trainer: Partial<TrainerInfo>) => void
}

export type DexTrackerGameActions = {
  registerGame: (gameId: string) => void
  unregisterGame: (gameId: string) => void
  setCurrentGame: (gameId: string) => void
}

export type DexTrackerDexActions = {
  updateDex: (dexId: string, data: Partial<Pokedex>) => void
  setCurrentDex: (dexId: string) => void
  removeDex: (dexId: string) => void
  updateDexPokemon: (dexId: string, nid: string, data: Partial<PokedexEntry>) => void
}

export type DexTrackerSharedBoxActions = {
  updateSharedBox: (data: Partial<Pokebox>) => void
  updateSharedBoxPokemon: (index: number, data: Partial<PokeboxEntry>) => void
  loadSharedBoxFromJSON: (json: string) => void
}

export type DexTrackerActions = DexTrackerGeneralActions &
  DexTrackerTrainerActions &
  DexTrackerGameActions &
  DexTrackerDexActions &
  DexTrackerSharedBoxActions

export type DexTrackerStateGetter = () => DexTrackerState
export type DexTrackerStateSetter = (state: Partial<DexTrackerState>) => void
export type DexTrackerActionFactory<T> = (set: DexTrackerStateSetter, get: DexTrackerStateGetter) => T
