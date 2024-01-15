// import fs from 'node:fs'
// import path from 'node:path'
// import pkg from '../../package.json'
import * as glob from 'glob'

const PUBLIC_DIR = `${process.cwd()}/public`

export default function generateOfflineAssetsList() {
  const dataFiles = glob.sync(`${PUBLIC_DIR}/**/*.json`, {
    cwd: PUBLIC_DIR,
    ignore: 'webp/**/*.webp',
    absolute: false,
  })
  const imageFiles = glob.sync(`${PUBLIC_DIR}/**/*.{jpg,png,avif}`, {
    cwd: PUBLIC_DIR,
    ignore: 'webp/**/*.webp',
    absolute: false,
  })

  return [...dataFiles, ...imageFiles]
}

generateOfflineAssetsList()
