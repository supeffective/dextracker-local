import { DexTrackerOptionsState, PokedexState } from '@/stores/types/state'
import { pokemonDatasetMap } from './pokemon'
import { TrPokedexBasicInfo, TrStatefulPokedexEntry } from './types'

export function splitSpeciesAndForms<State>(
  pokemon: TrStatefulPokedexEntry<State>[],
): [
  species: TrStatefulPokedexEntry<State>[],
  forms: TrStatefulPokedexEntry<State>[],
  cosmeticForms: TrStatefulPokedexEntry<State>[],
] {
  const species: TrStatefulPokedexEntry<State>[] = []
  const forms: TrStatefulPokedexEntry<State>[] = []
  const cosmeticForms: TrStatefulPokedexEntry<State>[] = []

  for (const entry of pokemon) {
    if (entry.flags.isForm) {
      forms.push(entry)
      if (entry.flags.isCosmeticForm) {
        cosmeticForms.push(entry)
      }
      continue
    }
    species.push(entry)
  }

  return [species, forms, cosmeticForms]
}

export function countSpeciesAndForms<State>(
  pokemon: TrStatefulPokedexEntry<State>[],
): [speciesCount: number, formsCount: number, cosmeticFormsCount: number] {
  const splitted = splitSpeciesAndForms<State>(pokemon)

  return [splitted[0].length, splitted[1].length, splitted[2].length]
}

export function calculateDexProgress(
  dexInfo: TrPokedexBasicInfo,
  dexState: PokedexState,
  dexOptions: DexTrackerOptionsState,
): [caught: number, dexTotal: number, caughtShinies: number, dexShiniesTotal: number] {
  let total = dexInfo.counters.species + dexInfo.counters.forms
  let shinyTotal = dexInfo.counters.shinySpecies + dexInfo.counters.shinyForms

  if (dexOptions.hideForms) {
    total -= dexInfo.counters.forms
    shinyTotal -= dexInfo.counters.shinyForms
  }

  if (!dexOptions.hideForms && dexOptions.hideCosmeticForms) {
    total -= dexInfo.counters.cosmeticForms
    shinyTotal -= dexInfo.counters.shinyCosmeticForms
  }

  const statePokes = Object.entries(dexState.pokemon)
    .map(([pid]) => {
      return pokemonDatasetMap.get(pid)
    })
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .filter((p) => {
      if (dexOptions.hideForms && p.flags.isForm) {
        return false
      }
      if (dexOptions.hideCosmeticForms && p.flags.isCosmeticForm) {
        return false
      }
      return true
    })

  const caught = statePokes.filter((p) => dexState.pokemon[p.id].caught)
  const shinies = statePokes.filter((p) => dexState.pokemon[p.id].shiny)

  return [caught.length, total, shinies.length, shinyTotal]
}
