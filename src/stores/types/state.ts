import { TrGame, TrPokedex, TrPokedexBasicInfo } from '@/lib/dataset/types'
import { SimplifyType as Simply } from '@/lib/utils/types'
import { UseQueryResult } from '@tanstack/react-query'
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
  male: z.boolean().optional(),
  female: z.boolean().optional(),
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

export const pokedexStateSchema = z.object({
  id: z.string(),
  dexId: z.string(),
  gameId: z.string(),
  pokemon: z.record(dexEntrySchema),
  createdAt: z.number(),
  lastModified: z.number(),
})

const dexTrackerOptionsSchema = z.object({
  searchQuery: z.string().optional(),
  compactMode: z.boolean().optional(),
  trackShinies: z.boolean().optional(),
  hideForms: z.boolean().optional(),
  hideCosmeticForms: z.boolean().optional(),
  hideCaught: z.boolean().optional(),
})

export const dexTrackerStateSchema = z.object({
  title: z.string().optional(),
  trainer: trainerInfoStateSchema.optional(),
  gameIds: stringArrSchema,
  dexes: z.record(pokedexStateSchema),
  options: dexTrackerOptionsSchema.optional(),
  currentFullDexId: z.string().optional(),
  sharedBox: boxStateSchema.optional(),
  lastModified: z.number().optional(),
})

export type DexTrackerState = Simply<z.infer<typeof dexTrackerStateSchema>>
export type DexTrackerOptionsState = Simply<z.infer<typeof dexTrackerOptionsSchema>>
export type PokeboxState = Simply<z.infer<typeof boxStateSchema>>
export type PokeboxEntryState = Simply<z.infer<typeof boxEntryStateSchema>>
export type PokedexEntryState = Simply<z.infer<typeof dexEntrySchema>>
export type PokedexState = Simply<z.infer<typeof pokedexStateSchema>>
export type TrainerInfoState = Simply<z.infer<typeof trainerInfoStateSchema>>
export type PokeGender = Simply<z.infer<typeof genderSchema>>
export type PokeTradingStatus = Simply<z.infer<typeof tradingStatusSchema>>

// -----------------------------------------------
// CURRENT state:

export type CurrentDexState =
  | {
      game: TrGame
      state: PokedexState
      info: TrPokedexBasicInfo
      fullInfoQuery: UseQueryResult<TrPokedex, Error>
    }
  | {
      game?: TrGame
      state?: PokedexState
      info?: TrPokedexBasicInfo
      fullInfoQuery?: UseQueryResult<TrPokedex, Error>
    }
