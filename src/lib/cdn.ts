import config from '@/config'

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
