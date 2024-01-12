import { TrStatefulPokedexEntry } from './types'

export function splitSpeciesAndForms<State>(
  pokemon: TrStatefulPokedexEntry<State>[],
): [species: TrStatefulPokedexEntry<State>[], forms: TrStatefulPokedexEntry<State>[]] {
  const species: TrStatefulPokedexEntry<State>[] = []
  const forms: TrStatefulPokedexEntry<State>[] = []

  for (const entry of pokemon) {
    if (entry.flags.isForm) {
      forms.push(entry)
      continue
    }
    species.push(entry)
  }

  return [species, forms]
}

export function countSpeciesAndForms<State>(
  pokemon: TrStatefulPokedexEntry<State>[],
): [speciesCount: number, formsCount: number] {
  const splitted = splitSpeciesAndForms<State>(pokemon)

  return [splitted[0].length, splitted[1].length]
}
