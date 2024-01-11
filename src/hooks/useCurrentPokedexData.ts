import config from '@/config'
import { Pokedex, PokedexIndexItem } from '@supeffective/dataset'
import { useQuery } from '@tanstack/react-query'
import useDexTrackerStore from '../stores/useDexTrackerStore'

function useDatasetCdnQuery<T>(filePath: string, enabled = true) {
  const fullUrl = `${config.cdn_dataset_url}/${filePath}.min.json`

  return useQuery<T>({
    queryKey: [`cdn-${filePath}`],
    queryFn: () => fetch(fullUrl).then((res) => res.json()),
    enabled,
  })
}

// TODO: this needs 2 queries, one for the index and one for the data. Refactor when we have our optimized data.
export default function useFetchCurrentPokedexData() {
  const store = useDexTrackerStore()
  const dexesIndexQuery = useDatasetCdnQuery<PokedexIndexItem[]>('pokedexes-index')
  const currentDex =
    dexesIndexQuery.isSuccess && store.currentDexId
      ? dexesIndexQuery.data?.find((dex) => dex.id === store.currentDexId)
      : undefined

  const resourcePath = currentDex?.region ? `${currentDex?.region}/${currentDex?.id}` : currentDex?.id
  const data = useDatasetCdnQuery<Pokedex>(`pokedexes/${resourcePath}`, !!currentDex?.id)
  return data
}
