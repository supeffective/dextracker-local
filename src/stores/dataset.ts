import { PokedexEntry, PokemonIndexItem, pokemonGames, pokemonIndex, pokemonIndexMap } from '@supeffective/dataset'

export const gamesWithPokedexes = pokemonGames
  .filter((game) => game.type === 'game')
  .filter((game) => game.pokedexes.length > 0)

export type PokemonSearchIndex<T extends PokemonIndexItem> = Array<T & { search: string }>

export type ExpandedPokedexEntry = PokedexEntry & PokemonIndexItem

export function expandPokedexEntries(pokedex: PokedexEntry[]): ExpandedPokedexEntry[] {
  return pokedex.map((entry, index) => {
    const pokemon = pokemonIndexMap.get(entry.id)
    if (!pokemon) {
      throw new Error(`No pokemon found for id ${entry.id}`)
    }
    const dexNum = entry.dexNum ?? index + 1
    return {
      ...pokemon,
      ...entry,
      dexNum,
    }
  })
}

export function createPokemonSearchIndex<T extends PokemonIndexItem>(pokemon: T[]): PokemonSearchIndex<T> {
  return pokemon.map((pokemon) => {
    return {
      ...pokemon,
      search: `${pokemon.name} ${pokemon.id} ${pokemon.nid} region:${pokemon.region}`.toLowerCase(),
    }
  })
}

export const pokemonSearchIndex = createPokemonSearchIndex<PokemonIndexItem>(pokemonIndex)

export function searchPokemonWith<T extends PokemonIndexItem>(searchIndex: PokemonSearchIndex<T>, query: string): T[] {
  const sanitizedQuery = query.trim().toLowerCase()
  if (!sanitizedQuery) {
    return searchIndex
  }

  return searchIndex.filter((pokemon) => {
    return pokemon.search.includes(sanitizedQuery)
  })
}

export function searchPokemon(query: string): PokemonIndexItem[] {
  const sanitizedQuery = query.trim().toLowerCase()
  if (!sanitizedQuery) {
    return pokemonSearchIndex
  }

  return pokemonSearchIndex.filter((pokemon) => {
    return pokemon.search.includes(sanitizedQuery)
  })
}
