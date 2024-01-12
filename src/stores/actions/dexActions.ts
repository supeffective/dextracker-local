import { DexTrackerActionFactory, DexTrackerDexActions } from '../types/actions'
import { DexTrackerState } from '../types/state'

const dexActions: DexTrackerActionFactory<DexTrackerDexActions> = (setState, getState): DexTrackerDexActions => {
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
        currentDexId: dexId === '' ? undefined : dexId,
      })
    },
    updateDexPokemon(dexId, pokemonId, data) {
      const currentDexes = getState().dexes
      const currentDex = currentDexes[dexId] ?? {}
      const currentPokemonTable = currentDex.pokemon ?? {}
      const newDexes: DexTrackerState['dexes'] = {
        ...currentDexes,
        [dexId]: {
          ...currentDex,
          id: dexId,
          pokemon: {
            ...currentPokemonTable,
            [pokemonId]: {
              ...currentPokemonTable[pokemonId],
              ...data,
              id: pokemonId,
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
