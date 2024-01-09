import { DexTrackerActionFactory, DexTrackerSharedBoxActions } from './types'

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
    updateSharedBoxPokemon(index, data) {
      const currentState = getState()
      const currentPokemonList = currentState.sharedBox?.pokemon ?? []
      const currentPokemon = currentPokemonList[index] ?? {}

      const newPokemonList = [...currentPokemonList]
      newPokemonList[index] = {
        ...currentPokemon,
        ...data,
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
