import { localUrl } from '@/kernel/urls'
import { useQuery } from '@tanstack/react-query'

// function useCdnDatasetQuery<T>(filePath: string, enabled = true) {
//   const fullUrl = `${config.cdn_dataset_url}/${filePath}.min.json`
//   return useQuery<T>({
//     queryKey: [`cdn-${filePath}`],
//     queryFn: () => fetch(fullUrl).then((res) => res.json()),
//     enabled,
//   })
// }

export function useLocalDatasetQuery<T>(filePath: string, enabled = true) {
  const fullUrl = localUrl(`/data/${filePath}.min.json`)

  return useQuery<T>({
    queryKey: [`local-cdn-${filePath}`],
    queryFn: () => fetch(fullUrl).then((res) => res.json()),
    enabled,
  })
}
