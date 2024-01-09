import { useGamesData } from '@/stores/cdn'
import SelectField, {
  OPTIONS_DATA_NOT_LOADED,
  OPTIONS_ERROR,
  OPTIONS_LOADING,
  OPTIONS_NO_DATA,
  SelectFieldPropsWithoutOptions,
} from './primitives/SelectField'

export default function GameSelectField(props: SelectFieldPropsWithoutOptions) {
  const gamesQuery = useGamesData()

  if (gamesQuery.isLoading) {
    return <SelectField {...props} options={OPTIONS_LOADING} disabled />
  }

  if (gamesQuery.isError) {
    console.error(gamesQuery.error)
    return <SelectField {...props} options={OPTIONS_ERROR} disabled />
  }

  if (!gamesQuery.data) {
    return <SelectField {...props} options={OPTIONS_DATA_NOT_LOADED} disabled />
  }

  const options = gamesQuery.data
    .filter((game) => game.type === 'game')
    .filter((game) => game.pokedexes.length > 0)
    .map((game) => ({ value: game.id, label: game.name }))

  if (options.length === 0) {
    return <SelectField {...props} options={OPTIONS_NO_DATA} disabled />
  }

  return <SelectField {...props} options={[{ value: '', label: '---' }, ...options]} />
}
