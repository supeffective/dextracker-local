import { DexTrackerActions, PokedexSearchActions } from './actions/types'
import { DexTrackerState, PokedexSearchState } from './state/types'

export type DexTrackerStore = DexTrackerState & DexTrackerActions

// SEARCH STORE:
export type PokedexSearchStore = PokedexSearchState & PokedexSearchActions
