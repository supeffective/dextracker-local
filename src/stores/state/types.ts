import { z } from 'zod'
import { PokedexSearchIndex } from '../dataset'

export type PokeGender = 'm' | 'f' | 'n'
export type PokeTradingStatus = 'wanted' | 'offered' | 'traded'

export type TrainerInfoState = {
  avatar?: string
  nickname: string
}

export type DexId = {
  id: string
  region: string | null
}

export type PokedexEntryState = {
  nid: string
  seen?: boolean
  caught?: boolean
  shiny?: boolean
  genders?: Array<PokeGender>
}

export type PokedexState = {
  id: string
  pokemon: Record<string, PokedexEntryState>
}

export type PokeboxEntryState = {
  nid: string
  origin: string
  status: PokeTradingStatus
  quantity: number
  shiny: boolean
  gender: PokeGender
}

export type PokeboxState = {
  title?: string
  gameIds: Array<string>
  pokemon: Array<PokeboxEntryState>
}

export type DexTrackerState = {
  title?: string
  trainer?: TrainerInfoState
  gameIds: Array<string>
  dexes: Record<string, PokedexState>
  currentGameId: string
  currentDexId: string
  sharedBox?: PokeboxState
  lastModified?: number
}

const trainerInfoStateSchema = z.object({
  avatar: z.string().optional(),
  nickname: z.string(),
})

const stringArrSchema = z.array(z.string())
const genderSchema = z.union([z.literal('m'), z.literal('f'), z.literal('n')])
const tradingStatusSchema = z.union([z.literal('wanted'), z.literal('offered'), z.literal('traded')])
const dexEntrySchema = z.object({
  nid: z.string(),
  seen: z.boolean().optional(),
  caught: z.boolean().optional(),
  shiny: z.boolean().optional(),
  genders: z.array(genderSchema).optional(),
})
const boxEntrySchema = z.object({
  nid: z.string(),
  origin: z.string(),
  status: tradingStatusSchema,
  quantity: z.number(),
  shiny: z.boolean(),
  gender: genderSchema.optional(),
})

export const dexTrackerStateSchema = z.object({
  title: z.string().optional(),
  trainer: trainerInfoStateSchema.optional(),
  gameIds: stringArrSchema,
  dexes: z.record(
    z.object({
      id: z.string(),
      pokemon: z.record(dexEntrySchema),
    }),
  ),
  currentGameId: z.string(),
  currentDexId: z.string(),
  sharedBox: z
    .object({
      title: z.string().optional(),
      gameIds: z.array(z.string()),
      pokemon: z.array(boxEntrySchema),
    })
    .optional(),
  lastModified: z.number().optional(),
})

// -----------------------------------------------
// SEARCH STORE:

export type PokedexSearchStateFilter = {
  shinyMode?: boolean
  searchQuery?: string
  hideForms?: boolean
  hideCosmeticForms?: boolean
  hideCaught?: boolean
  // withVariants?: boolean
}

export type PokedexSearchState = {
  dexId: string
  filters?: PokedexSearchStateFilter
  results: PokedexSearchIndex
  lastModified?: number
}
