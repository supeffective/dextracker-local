import { DexTrackerActionFactory, DexTrackerSharedBoxActions } from '../types/actions'

const DEFAULT_BOX_TITLE = 'Trade Box'

const sharedBoxActions: DexTrackerActionFactory<DexTrackerSharedBoxActions> = (setState, getState) => {
  return {
    loadSharedBoxFromJSON(json) {
      const currentState = getState()
      const data = JSON.parse(json)
      setState({
        sharedBox: {
          ...currentState.sharedBox,
          ...data,
        },
      })
    },
    updateSharedBox(data) {
      const currentState = getState()
      setState({
        sharedBox: {
          title: DEFAULT_BOX_TITLE,
          gameIds: [],
          pokemon: [],
          ...currentState.sharedBox,
          ...data,
        },
      })
    },
    updateSharedBoxPokemon(index, newPkmData) {
      const currentState = getState()
      const currentPokemonList = currentState.sharedBox?.pokemon ?? []
      const currentPokemon = currentPokemonList[index] ?? {}

      const newPokemonList = [...currentPokemonList]
      newPokemonList[index] = {
        ...currentPokemon,
        ...newPkmData,
      }

      setState({
        sharedBox: {
          title: DEFAULT_BOX_TITLE,
          gameIds: [],
          ...currentState.sharedBox,
          pokemon: newPokemonList,
        },
      })
    },
  }
}

export default sharedBoxActions
