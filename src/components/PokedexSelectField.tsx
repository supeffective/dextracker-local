import { gamesFilteredDataset } from '@/lib/dataset/games'
import SelectField, {
  OPTIONS_NO_DATA,
  SelectFieldOption,
  SelectFieldPropsWithoutOptions,
} from './primitives/SelectField'

type PokedexSelectFieldProps = SelectFieldPropsWithoutOptions & {
  gameId?: string
  nullable?: boolean
}

export default function PokedexSelectField({ gameId, nullable, ...props }: PokedexSelectFieldProps) {
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

  if (nullable) {
    options.unshift({ value: '', label: '---' })
  }

  return <SelectField {...props} options={[...options]} />
}
