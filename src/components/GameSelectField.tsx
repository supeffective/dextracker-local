import { gamesFilteredDataset } from '@/lib/dataset/games'
import SelectField, { OPTIONS_NO_DATA, SelectFieldPropsWithoutOptions } from './primitives/SelectField'

type GameSelectFieldProps = SelectFieldPropsWithoutOptions & {
  nullable?: boolean
}

export default function GameSelectField({ nullable, ...rest }: GameSelectFieldProps) {
  const options = gamesFilteredDataset.map((game) => ({ value: game.id, label: game.name }))

  if (options.length === 0) {
    return <SelectField {...rest} options={OPTIONS_NO_DATA} disabled />
  }
  const revOptions = [...options].reverse()
  if (nullable) {
    revOptions.unshift({ value: '', label: '---' })
  }

  return <SelectField {...rest} options={[...revOptions]} />
}
