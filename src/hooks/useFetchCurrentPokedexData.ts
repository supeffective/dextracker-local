import { TrPokedex } from '@/lib/dataset/types'
import { useCurrentDexData } from '@/stores/useCurrentDexData'
import { useLocalDatasetQuery } from './useLocalDatasetQuery'

export default function useFetchCurrentPokedexData() {
  const currentDexId = useCurrentDexData().state?.id
  const data = useLocalDatasetQuery<TrPokedex>(`pokedexes/${currentDexId}`, !!currentDexId)
  return data
}
