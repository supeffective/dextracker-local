import data from '@/data'
import { Game, Pokedex, PokedexIndexItem, Pokemon, PokemonIndexItem } from '@supeffective/dataset'
import { useQuery } from '@tanstack/react-query'
import useDexTrackerStore from './useDexTrackerStore'

export function useDatasetCdn<T>(filePath: string, enabled = true) {
  const fullUrl = `${data.cdn_dataset_url}/${filePath}.min.json`

  return useQuery<T>({
    queryKey: [`cdn-${filePath}`],
    queryFn: () => fetch(fullUrl).then((res) => res.json()),
    enabled,
  })
}

export function useGamesData() {
  return useDatasetCdn<Game[]>('games')
}

export function usePokedexesIndexData() {
  return useDatasetCdn<PokedexIndexItem[]>('pokedexes-index')
}

export function usePokedexData(id: string | undefined, region?: string | null) {
  const resourcePath = region ? `${region}/${id}` : id

  return useDatasetCdn<Pokedex>(`pokedexes/${resourcePath}`, !!id)
}

export function usePokemonIndexData() {
  return useDatasetCdn<PokemonIndexItem[]>('pokemon-index')
}

export function usePokemonData(id: string | undefined, region?: string) {
  const resourcePath = region ? `${region}/${id}` : id

  return useDatasetCdn<Pokemon>(`pokemon/${resourcePath}`, !!id)
}

export function useCurrentPokedexData() {
  const store = useDexTrackerStore()
  const dexesIndexQuery = usePokedexesIndexData()
  const currentDex =
    dexesIndexQuery.isSuccess && store.currentDexId
      ? dexesIndexQuery.data?.find((dex) => dex.id === store.currentDexId)
      : undefined

  return usePokedexData(currentDex?.id, currentDex?.region)
}

export function getDexSourceCodeUrl(dexRegion: string | undefined | null, dexId: string) {
  if (!dexRegion) {
    return `https://github.com/supeffective/dataset/blob/main/data/pokedexes/${dexId}.json`
  }
  return `https://github.com/supeffective/dataset/blob/main/data/pokedexes/${dexRegion}/${dexId}.json`
}
