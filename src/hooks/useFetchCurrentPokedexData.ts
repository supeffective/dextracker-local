import { localUrl } from '@/kernel/urls'
import { TrPokedex } from '@/lib/dataset/types'
import { useQuery } from '@tanstack/react-query'
import useDexTrackerStore from '../stores/useDexTrackerStore'

// function useCdnDatasetQuery<T>(filePath: string, enabled = true) {
//   const fullUrl = `${config.cdn_dataset_url}/${filePath}.min.json`

//   return useQuery<T>({
//     queryKey: [`cdn-${filePath}`],
//     queryFn: () => fetch(fullUrl).then((res) => res.json()),
//     enabled,
//   })
// }

function useLocalDatasetQuery<T>(filePath: string, enabled = true) {
  const fullUrl = localUrl(`/data/${filePath}.min.json`)

  return useQuery<T>({
    queryKey: [`local-cdn-${filePath}`],
    queryFn: () => fetch(fullUrl).then((res) => res.json()),
    enabled,
  })
}

export default function useFetchCurrentPokedexData() {
  const currentDexId = useDexTrackerStore((state) => state.currentDexId)
  const data = useLocalDatasetQuery<TrPokedex>(`pokedexes/${currentDexId}`, !!currentDexId)
  return data
}
