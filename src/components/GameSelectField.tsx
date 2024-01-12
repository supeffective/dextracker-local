import { gamesFilteredDataset } from '@/lib/dataset/games'
import SelectField, { OPTIONS_NO_DATA, SelectFieldPropsWithoutOptions } from './primitives/SelectField'

export default function GameSelectField(props: SelectFieldPropsWithoutOptions) {
  const options = gamesFilteredDataset.map((game) => ({ value: game.id, label: game.name }))

  if (options.length === 0) {
    return <SelectField {...props} options={OPTIONS_NO_DATA} disabled />
  }

  return <SelectField {...props} options={[{ value: '', label: '---' }, ...options]} />
}
