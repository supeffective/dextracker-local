import { DexTrackerActions, PokedexSearchActions } from './actions'
import { DexTrackerState, PokedexSearchState } from './state'

export type DexTrackerStore = DexTrackerState & DexTrackerActions

// SEARCH STORE:
export type PokedexSearchStore = PokedexSearchState & PokedexSearchActions
