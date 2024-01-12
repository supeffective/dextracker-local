import { gamesFilteredDataset } from '@/lib/dataset/games'
import SelectField, {
  OPTIONS_NO_DATA,
  SelectFieldOption,
  SelectFieldPropsWithoutOptions,
} from './primitives/SelectField'

type PokedexSelectFieldProps = SelectFieldPropsWithoutOptions & {
  gameId?: string
}

export default function PokedexSelectField({ gameId, ...props }: PokedexSelectFieldProps) {
  if (!gameId) {
    return <SelectField {...props} options={[{ value: '', label: '---' }]} disabled />
  }

  const gameDexes = gamesFilteredDataset.find((game) => game.id === gameId)?.pokedexes ?? []
  const options = gameDexes
    .map((dex) => {
      return { value: dex.id, label: dex.name }
    })
    .filter(Boolean) as SelectFieldOption[]

  if (options.length === 0) {
    return <SelectField {...props} options={OPTIONS_NO_DATA} disabled />
  }

  return <SelectField {...props} options={[{ value: '', label: '---' }, ...options]} />
}
