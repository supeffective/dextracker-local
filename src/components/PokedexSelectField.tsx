import { useGamesData, usePokedexesIndexData } from '@/stores/cdn'
import SelectField, {
  OPTIONS_DATA_NOT_LOADED,
  OPTIONS_ERROR,
  OPTIONS_LOADING,
  OPTIONS_NO_DATA,
  SelectFieldPropsWithoutOptions,
} from './primitives/SelectField'

type PokedexSelectFieldProps = SelectFieldPropsWithoutOptions & {
  gameId?: string
}

export default function PokedexSelectField({ gameId, ...props }: PokedexSelectFieldProps) {
  const gamesQuery = useGamesData()
  const dexesQuery = usePokedexesIndexData()

  if (!gameId) {
    return null
  }

  if (gamesQuery.isLoading || dexesQuery.isLoading) {
    return <SelectField {...props} options={OPTIONS_LOADING} disabled />
  }

  if (gamesQuery.isError || dexesQuery.isError) {
    console.error(gamesQuery.error, dexesQuery.error)
    return <SelectField {...props} options={OPTIONS_ERROR} disabled />
  }

  if (!dexesQuery.data || !gamesQuery.data) {
    return <SelectField {...props} options={OPTIONS_DATA_NOT_LOADED} disabled />
  }

  const gameDexIds = gamesQuery.data.find((dex) => dex.id === gameId)?.pokedexes ?? []
  const options = dexesQuery.data
    .filter((dex) => gameDexIds.includes(dex.id))
    .map((dex) => ({
      value: dex.id,
      label: dex.name,
    }))

  if (options.length === 0) {
    return <SelectField {...props} options={OPTIONS_NO_DATA} disabled />
  }

  return <SelectField {...props} options={[{ value: '', label: '---' }, ...options]} />
}
