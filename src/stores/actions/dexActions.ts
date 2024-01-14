import { z } from 'zod'
import { DexTrackerActionFactory, DexTrackerDexActions } from '../types/actions'
import { DexTrackerState, pokedexStateSchema } from '../types/state'
import { splitFullDexId } from '../utils'

const dexActions: DexTrackerActionFactory<DexTrackerDexActions> = (setState, getState): DexTrackerDexActions => {
  return {
    unsetCurrentDex() {
      setState({
        currentFullDexId: undefined,
      })
    },
    setCurrentDex(fullDexId) {
      setState({
        currentFullDexId: fullDexId === '' ? undefined : fullDexId,
      })
    },
    removeDex(fullDexId) {
      const newDexes: DexTrackerState['dexes'] = {
        ...getState().dexes,
      }
      delete newDexes[fullDexId]
      setState({
        dexes: newDexes,
      })
    },
    updateDexPokemon(fullDexId, pokemonId, data) {
      const splitId = splitFullDexId(fullDexId)
      const currentDexes = getState().dexes
      const currentDex = currentDexes[fullDexId] ?? {
        id: fullDexId,
        gameId: splitId.gameId,
        dexId: splitId.dexId,
        createdAt: Date.now(),
        lastModified: Date.now(),
      }
      const currentPokemonTable = currentDex.pokemon ?? {}
      const newDexes: DexTrackerState['dexes'] = {
        ...currentDexes,
        [fullDexId]: {
          ...currentDex,
          id: fullDexId,
          createdAt: currentDex.createdAt ?? Date.now(),
          lastModified: Date.now(),
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

      try {
        z.record(pokedexStateSchema).parse(newDexes)
      } catch (error) {
        const errMsg = 'updateDexPokemon action: Invalid dexes format'
        console.error(errMsg, error)
        //throw new Error(errMsg)
      }

      // console.log('updateDexPokemon action', newDexes[fullDexId])

      setState({
        dexes: newDexes,
      })
    },
  }
}

export default dexActions
