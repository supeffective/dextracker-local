import { DexTrackerState } from '../state/types'
import { DexTrackerActionFactory, DexTrackerDexActions } from './types'

const dexActions: DexTrackerActionFactory<DexTrackerDexActions> = (setState, getState) => {
  return {
    updateDex(dexId, dex) {
      const currentDexes = getState().dexes
      const currentDex = currentDexes[dexId] ?? {}
      const newDexes: DexTrackerState['dexes'] = {
        ...currentDexes,
        [dexId]: {
          id: dexId,
          pokemon: {
            ...currentDex.pokemon,
            ...dex.pokemon,
          },
        },
      }
      setState({
        dexes: newDexes,
      })
    },
    removeDex(dexId) {
      const newDexes: DexTrackerState['dexes'] = {
        ...getState().dexes,
      }
      delete newDexes[dexId]
      setState({
        dexes: newDexes,
      })
    },
    setCurrentDex(dexId) {
      setState({
        currentDexId: dexId,
      })
    },
    updateDexPokemon(dexId, nid, data) {
      const currentDexes = getState().dexes
      const currentDex = currentDexes[dexId] ?? {}
      const currentPokemonTable = currentDex.pokemon ?? {}
      const newDexes: DexTrackerState['dexes'] = {
        ...currentDexes,
        [dexId]: {
          ...currentDex,
          pokemon: {
            ...currentPokemonTable,
            [nid]: {
              ...currentPokemonTable[nid],
              ...data,
            },
          },
        },
      }
      setState({
        dexes: newDexes,
      })
    },
  }
}

export default dexActions
