import fs from 'node:fs'
import config from '@/config'
import { gamesDataset } from '@/lib/dataset/games'
import { pokemonDataset } from '@/lib/dataset/pokemon'

// Dont use this script unless you dont have access to the original images.
// Abusing this script will get you banned from the CDN.

const TMP_BASE_DIR = `${process.cwd()}/build/images`
const DEST_BASE_DIR = `${process.cwd()}/public/images`

const GAMES_IMG_DIRNAME = '/games'
const PKM_IMG_DIRNAME = '/pokemon/regular'
const SHINY_PKM_IMG_DIRNAME = '/pokemon/shiny'

const dirsThatShouldExist = [
  DEST_BASE_DIR,
  `${TMP_BASE_DIR}${GAMES_IMG_DIRNAME}`,
  `${TMP_BASE_DIR}${PKM_IMG_DIRNAME}`,
  `${TMP_BASE_DIR}${SHINY_PKM_IMG_DIRNAME}`,
]

for (const tmpDir of dirsThatShouldExist) {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true })
  }
}

async function downloadImage(url: string, destFile: string) {
  const response = await fetch(url)
  const blob = await response.blob()
  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  await fs.promises.writeFile(destFile, buffer)
}

async function sleepMs(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// biome-ignore lint/correctness/noUnusedVariables: disabled on purpose
async function downloadGameCoverImages() {
  for (const game of gamesDataset) {
    const url = `${config.cdn_assets_url}/images/games/tiles/${game.id}.jpg`
    const destFile = `${TMP_BASE_DIR}${GAMES_IMG_DIRNAME}/${game.id}.jpg`
    await downloadImage(url, destFile)
    sleepMs(1000)
    if (fs.existsSync(destFile)) {
      console.log(`Downloaded ${url} to ${GAMES_IMG_DIRNAME}/${game.id}.jpg`)
    } else {
      console.log(`Error downloading ${url} to disk`)
    }
  }
}

const extraPkmIds = ['0000', '0000-unknown']

// biome-ignore lint/correctness/noUnusedVariables: disabled on purpose
async function downloadPokemonSpriteImages() {
  for (const pkm of pokemonDataset) {
    const url = `${config.cdn_assets_url}/images/pokemon/home3d-icon/regular/${pkm.id}.png`
    const destFile = `${TMP_BASE_DIR}${PKM_IMG_DIRNAME}/${pkm.id}.png`
    await downloadImage(url, destFile)
    sleepMs(1000)
    if (fs.existsSync(destFile)) {
      console.log(`Downloaded ${url} to ${PKM_IMG_DIRNAME}/${pkm.id}.png`)
    } else {
      console.log(`Error downloading ${url} to disk`)
    }
  }

  for (const pkmId of extraPkmIds) {
    const url = `${config.cdn_assets_url}/images/pokemon/home3d-icon/regular/${pkmId}.png`
    const destFile = `${TMP_BASE_DIR}${PKM_IMG_DIRNAME}/${pkmId}.png`
    await downloadImage(url, destFile)
  }
}

// biome-ignore lint/correctness/noUnusedVariables: disabled on purpose
async function downloadPokemonShinySpriteImages() {
  for (const pkm of pokemonDataset) {
    const url = `${config.cdn_assets_url}/images/pokemon/home3d-icon/shiny/${pkm.id}.png`
    const destFile = `${TMP_BASE_DIR}${SHINY_PKM_IMG_DIRNAME}/${pkm.id}.png`
    await downloadImage(url, destFile)
    sleepMs(1000)
    if (fs.existsSync(destFile)) {
      console.log(`Downloaded ${url} to ${SHINY_PKM_IMG_DIRNAME}/${pkm.id}.png`)
    } else {
      console.log(`Error downloading ${url} to disk`)
    }
  }

  for (const pkmId of extraPkmIds) {
    const url = `${config.cdn_assets_url}/images/pokemon/home3d-icon/shiny/${pkmId}.png`
    const destFile = `${TMP_BASE_DIR}${SHINY_PKM_IMG_DIRNAME}/${pkmId}.png`
    await downloadImage(url, destFile)
  }
}

// await downloadGameCoverImages()
// await downloadPokemonSpriteImages()
// await downloadPokemonShinySpriteImages()
