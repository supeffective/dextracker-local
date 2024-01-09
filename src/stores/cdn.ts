import data from '@/data'
import { Game, Pokedex, PokedexIndexItem, Pokemon, PokemonIndexItem } from '@supeffective/dataset'
import { useQuery } from '@tanstack/react-query'

export function useDatasetCdn<T>(filePath: string) {
  const fullUrl = `${data.cdn_dataset_url}/${filePath}.min.json`

  return useQuery<T>({
    queryKey: [`cdn-${filePath}`],
    queryFn: () => fetch(fullUrl).then((res) => res.json()),
  })
}

export function useGamesData() {
  return useDatasetCdn<Game[]>('games')
}

export function usePokedexesIndexData() {
  return useDatasetCdn<PokedexIndexItem[]>('pokedexes-index')
}

export function usePokedexData(id: string, region: string | null) {
  const resourcePath = region ? `${region}/${id}` : id

  return useDatasetCdn<Pokedex>(`pokedexes/${resourcePath}`)
}

export function usePokemonIndexData() {
  return useDatasetCdn<PokemonIndexItem[]>('pokemon-index')
}

export function usePokemonData(id: string, region: string | null) {
  const resourcePath = region ? `${region}/${id}` : id

  return useDatasetCdn<Pokemon>(`pokemon/${resourcePath}`)
}
