import config from '@/config'
import { MultiFormatImage } from '../lib/utils/types'

export const APP_BASE_URL = import.meta.env.BASE_URL
export const LOCAL_IMAGES_CDN_URL = `${APP_BASE_URL}images`

export function getGameCoverImageUrls(gameId: string): MultiFormatImage {
  const avifSrc = `${LOCAL_IMAGES_CDN_URL}/avif/games/${gameId}.avif`
  const webpSrc = `${LOCAL_IMAGES_CDN_URL}/webp/games/${gameId}.webp`
  const fallbackSrc = `${config.cdn_assets_url}/images/games/tiles/${gameId}.jpg`
  return { webpSrc, avifSrc, fallbackSrc }
}

export function getPokemonImageUrls(pokemonId: string, shiny: boolean): MultiFormatImage {
  const shinyPath = shiny ? 'shiny' : 'regular'
  const avifSrc = `${LOCAL_IMAGES_CDN_URL}/avif/pokemon/${shinyPath}/${pokemonId}.avif`
  const webpSrc = `${LOCAL_IMAGES_CDN_URL}/webp/pokemon/${shinyPath}/${pokemonId}.webp`
  const fallbackSrc = `${config.cdn_assets_url}/images/pokemon/home3d-icon/${shinyPath}/${pokemonId}.png`
  return { webpSrc, avifSrc, fallbackSrc }
}

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

export function getDevDataCDNResourceUrl(filePath: string) {
  return `http://localhost:4455/dist/data/${filePath}`
}

export function getAssetsCDNResourceUrl(filePath: string) {
  return `${config.cdn_assets_url}/${filePath}`
}

export function getDevAssetsCDNResourceUrl(filePath: string) {
  return `http://localhost:3999/assets/${filePath}`
}

export function getDexSourceCodeUrl(dexRegion: string | undefined | null, dexId: string) {
  if (!dexRegion) {
    return `https://github.com/supeffective/dataset/blob/main/data/pokedexes/${dexId}.json`
  }
  return `https://github.com/supeffective/dataset/blob/main/data/pokedexes/${dexRegion}/${dexId}.json`
}
