import { ExpandedPokedexEntry, PokedexSearchIndex, searchPokemonWith } from '@/stores/dataset'
import { PokedexSearchStateFilter } from '@/stores/state/types'

export function splitSpeciesAndForms(
  pokemon: ExpandedPokedexEntry[],
): [species: ExpandedPokedexEntry[], forms: ExpandedPokedexEntry[]] {
  const species: ExpandedPokedexEntry[] = []
  const forms: ExpandedPokedexEntry[] = []

  for (const entry of pokemon) {
    if (entry.isForm) {
      forms.push(entry)
      continue
    }
    species.push(entry)
  }

  return [species, forms]
}

export function countSpeciesAndForms(pokemon: ExpandedPokedexEntry[]): [speciesCount: number, formsCount: number] {
  const splitted = splitSpeciesAndForms(pokemon)

  return [splitted[0].length, splitted[1].length]
}

export function applyDexFilters(pokemon: PokedexSearchIndex, filter?: PokedexSearchStateFilter): PokedexSearchIndex {
  let results = pokemon

  if (!filter) {
    return results
  }

  if (filter.searchQuery) {
    results = searchPokemonWith(results, filter.searchQuery)
  }

  if (filter.hideCaught) {
    // const prev = results.length
    results = results.filter((pokemon) => {
      const state = pokemon.state
      if (!state) {
        return true
      }
      return !state.caught
    })
    // console.log('filter.hideCaught', filter.hideCaught, prev, results.length) //, results)
  }

  // if (filter.shinyMode) {
  //   results = results.filter((pokemon) => pokemon.state?.shiny)
  // }

  if (filter.hideForms) {
    results = results.filter((pokemon) => !pokemon.isForm)
  }

  // TODO: add support once we generate our own, more efficient JSON data
  // if (filter.hideCosmeticForms) {
  //   results = results.filter((pokemon) => !pokemon.isCosmeticForm)
  // }

  return results
}
