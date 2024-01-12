import * as fs from 'fs'
import * as path from 'path'
import sharp from 'sharp'

// TODO: clone the images repo or download them from the CDN,
// and run image mods using sharp (js) or ImageMagick (shell command)

const TMP_BASE_DIR = `${process.cwd()}/build/images`
const DEST_BASE_DIR = `${process.cwd()}/public/images`

const GAMES_IMG_DIRNAME = '/games'
const PKM_IMG_DIRNAME = '/pokemon/regular'
const SHINY_PKM_IMG_DIRNAME = '/pokemon/shiny'

const dirsThatShouldExist = [
  DEST_BASE_DIR,
  `${DEST_BASE_DIR}/webp`,
  `${DEST_BASE_DIR}/avif`,
  `${DEST_BASE_DIR}/avif${GAMES_IMG_DIRNAME}`,
  `${DEST_BASE_DIR}/webp${GAMES_IMG_DIRNAME}`,
  `${DEST_BASE_DIR}/avif${PKM_IMG_DIRNAME}`,
  `${DEST_BASE_DIR}/webp${PKM_IMG_DIRNAME}`,
  `${DEST_BASE_DIR}/avif${SHINY_PKM_IMG_DIRNAME}`,
  `${DEST_BASE_DIR}/webp${SHINY_PKM_IMG_DIRNAME}`,
]

for (const tmpDir of dirsThatShouldExist) {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true })
  }
}

async function optimizeImages(
  inputDir: string,
  outputDir: string,
  format: 'webp' | 'avif' | 'png' | 'jpeg',
  width: number,
  height?: number,
) {
  console.log(`Converting ${inputDir} to ${outputDir} in ${format} format...`)

  const convertImage = async (inputPath: string, outputPath: string) => {
    if (fs.existsSync(outputPath)) {
      console.log(` -> Skipping ${outputPath}: already exists`)
      return
    }

    await sharp(inputPath)
      [format]()
      .resize({ width, height, fit: 'contain', withoutEnlargement: true }) // Example resize, change as needed
      .toFile(outputPath)
  }

  const processDirectory = async (inputDir: string, outputDir: string) => {
    const inputDirFiles = fs.readdirSync(inputDir, { withFileTypes: true })
    for (const dirent of inputDirFiles) {
      const inputPath = path.join(inputDir, dirent.name)
      const outputPath = path.join(outputDir, dirent.name)

      if (dirent.isDirectory()) {
        if (!fs.existsSync(outputPath)) {
          fs.mkdirSync(outputPath, { recursive: true })
        }
        await processDirectory(inputPath, outputPath)
      } else {
        const extName = path.extname(inputPath)
        if (['.jpg', '.jpeg', '.png'].indexOf(extName) === -1) {
          continue
        }
        const formatExt = format === 'jpeg' ? 'jpg' : format
        await convertImage(inputPath, outputPath.replace(extName, `.${formatExt}`))
      }
    }
  }

  await processDirectory(inputDir, outputDir)
}

const formats = ['webp', 'avif'] as const

for (const format of formats) {
  await optimizeImages(`${TMP_BASE_DIR}${PKM_IMG_DIRNAME}`, `${DEST_BASE_DIR}/${format}${PKM_IMG_DIRNAME}`, format, 180)
  await optimizeImages(
    `${TMP_BASE_DIR}${SHINY_PKM_IMG_DIRNAME}`,
    `${DEST_BASE_DIR}/${format}${SHINY_PKM_IMG_DIRNAME}`,
    format,
    180,
  )
  await optimizeImages(
    `${TMP_BASE_DIR}${GAMES_IMG_DIRNAME}`,
    `${DEST_BASE_DIR}/${format}${GAMES_IMG_DIRNAME}`,
    format,
    180,
  )
}

console.log('DONE!')
