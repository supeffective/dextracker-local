import { PokedexEntry, PokemonIndexItem, pokemonGames, pokemonIndex, pokemonIndexMap } from '@supeffective/dataset'

export const gamesWithPokedexes = pokemonGames
  .filter((game) => game.type === 'game')
  .filter((game) => game.pokedexes.length > 0)

export type PokemonSearchResult<T extends PokemonIndexItem> = T & { search: string }
export type PokemonSearchIndex<T extends PokemonIndexItem> = Array<PokemonSearchResult<T>>

export type ExpandedPokedexEntry = PokedexEntry & PokemonIndexItem

export function expandPokedexEntries(pokedex: PokedexEntry[]): ExpandedPokedexEntry[] {
  return pokedex.map((entry, _) => {
    const pokemon = pokemonIndexMap.get(entry.id)
    if (!pokemon) {
      throw new Error(`No pokemon found for id ${entry.id}`)
    }
    // const dexNum = entry.dexNum ?? index + 1
    return {
      ...pokemon,
      ...entry,
      // dexNum,
    }
  })
}

export function createPokemonSearchIndex<T extends PokemonIndexItem>(
  pokemon: T[],
  extraFields?: Array<keyof T>,
): PokemonSearchIndex<T> {
  const _extraFields = extraFields ?? []
  return pokemon.map((pokemon) => {
    const extraSearch = _extraFields
      .map((field) => {
        const fieldName = String(field)
        const value = pokemon[field]

        if (typeof value === 'string') {
          return `${fieldName}:${value.toLowerCase()}`
        }
        if (typeof value === 'number') {
          if (fieldName === 'dexNum') {
            const padded4Zero = String(value).padStart(4, '0')

            return [`${fieldName}:#${value}`, `${fieldName}:#${padded4Zero}`].join(' ')
          }
          return `${fieldName}:${value}`
        }
        if (typeof value === 'boolean') {
          return `${fieldName}:${value ? 'yes' : 'no'}`
        }
        if (Array.isArray(value)) {
          return `${fieldName}:${value.join(' ').toLowerCase()}`
        }
        return ''
      })
      .join(' ')

    const dexNumSearch = _extraFields.includes('dexNum' as keyof T) ? '' : pokemon.nid

    return {
      ...pokemon,
      search: `${pokemon.name} ${pokemon.id} ${dexNumSearch} region:${pokemon.region} ${extraSearch}`.toLowerCase(),
    }
  })
}

export const pokemonSearchIndex = createPokemonSearchIndex<PokemonIndexItem>(pokemonIndex)

export function searchPokemonWith<T extends PokemonIndexItem>(
  searchIndex: PokemonSearchIndex<T>,
  query: string,
): PokemonSearchResult<T>[] {
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
