import { SimplifyType as Simply } from '@/lib/utils/types'
import { z } from 'zod'

const trainerInfoStateSchema = z.object({
  avatar: z.string().optional(),
  nickname: z.string(),
})
const stringArrSchema = z.array(z.string())
const genderSchema = z.union([z.literal('m'), z.literal('f'), z.literal('n')])
const tradingStatusSchema = z.union([z.literal('wanted'), z.literal('offered'), z.literal('traded')])
const dexEntrySchema = z.object({
  id: z.string(),
  seen: z.boolean().optional(),
  caught: z.boolean().optional(),
  shiny: z.boolean().optional(),
  // genders: z.array(genderSchema).optional(),
})
const boxEntryStateSchema = z.object({
  id: z.string(),
  origin: z.string(),
  status: tradingStatusSchema,
  quantity: z.number(),
  shiny: z.boolean(),
  gender: genderSchema.optional(),
})
const boxStateSchema = z.object({
  title: z.string().optional(),
  gameIds: z.array(z.string()),
  pokemon: z.array(boxEntryStateSchema),
})
const pokedexStateSchema = z.object({
  id: z.string(),
  pokemon: z.record(dexEntrySchema),
})

export const dexTrackerStateSchema = z.object({
  title: z.string().optional(),
  trainer: trainerInfoStateSchema.optional(),
  gameIds: stringArrSchema,
  dexes: z.record(pokedexStateSchema),
  currentGameId: z.string(),
  currentDexId: z.string(),
  sharedBox: boxStateSchema.optional(),
  lastModified: z.number().optional(),
})

export type DexTrackerState = Simply<z.infer<typeof dexTrackerStateSchema>>
export type PokeboxState = Simply<z.infer<typeof boxStateSchema>>
export type PokeboxEntryState = Simply<z.infer<typeof boxEntryStateSchema>>
export type PokedexEntryState = Simply<z.infer<typeof dexEntrySchema>>
export type PokedexState = Simply<z.infer<typeof pokedexStateSchema>>
export type TrainerInfoState = Simply<z.infer<typeof trainerInfoStateSchema>>
export type PokeGender = Simply<z.infer<typeof genderSchema>>
export type PokeTradingStatus = Simply<z.infer<typeof tradingStatusSchema>>

// -----------------------------------------------
// SEARCH STORE:

const pokedexSearchStateFilterSchema = z.object({
  shinyMode: z.boolean().optional(),
  searchQuery: z.string().optional(),
  hideForms: z.boolean().optional(),
  hideCosmeticForms: z.boolean().optional(),
  hideCaught: z.boolean().optional(),
})

export const pokedexSearchStateSchema = z.object({
  dexId: z.string(),
  filters: pokedexSearchStateFilterSchema.optional(),
  lastModified: z.number().optional(),
})

export type PokedexSearchState = Simply<z.infer<typeof pokedexSearchStateSchema>>
export type PokedexSearchStateFilter = Simply<z.infer<typeof pokedexSearchStateFilterSchema>>
