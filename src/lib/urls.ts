import config from '@/config'

export const APP_BASE_URL = import.meta.env.BASE_URL

export function localUrl(path?: string): string {
  if (!path) {
    return APP_BASE_URL
  }
  const normalizedPath = path.replace(/^\//, '')
  return `${APP_BASE_URL}${normalizedPath}`
}

export function getDataCDNResourceUrl(filePath: string) {
  return `${config.cdn_dataset_url}/${filePath}`
}

export function getAssetsCDNResourceUrl(filePath: string) {
  return `${config.cdn_assets_url}/${filePath}`
}

export function getDexSourceCodeUrl(dexRegion: string | undefined | null, dexId: string) {
  if (!dexRegion) {
    return `https://github.com/supeffective/dataset/blob/main/data/pokedexes/${dexId}.json`
  }
  return `https://github.com/supeffective/dataset/blob/main/data/pokedexes/${dexRegion}/${dexId}.json`
}
