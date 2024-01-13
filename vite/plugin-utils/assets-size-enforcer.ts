import fs from 'node:fs'
import path from 'node:path'

export type BundleSizeEnforcerOptions = {
  /**
   * The output path of `vite build`. By default, it is "dist", relative to process.cwd().
   */
  distPath?: string
  /**
   * Files relative to distPath and their size limits in bytes.
   */
  assetLimits?: Record<string, number>
  /**
   * Whether to fail the build if any file exceeds its size limit.
   */
  failOnExceed?: boolean
}

const defaultOptions: BundleSizeEnforcerOptions = {
  distPath: 'dist',
  assetLimits: {
    'index.html': 1024 * 1024 * 2, // 2 MB
  },
  failOnExceed: true,
}

export async function enforceAssetsSize(options?: BundleSizeEnforcerOptions): Promise<void> {
  const opts: BundleSizeEnforcerOptions = {
    ...defaultOptions,
    ...options,
  }

  opts.distPath = path.resolve(process.cwd(), opts.distPath)

  const assetLimits = opts.assetLimits
  const failOnExceed = opts.failOnExceed
  const distPath = opts.distPath

  const files = Object.keys(assetLimits)
  const filesWithSizes = (await Promise.all(files.map((file) => getFileSize(file, distPath)))).map((size, i) => ({
    file: files[i],
    size,
    limit: assetLimits[files[i]],
  }))

  for (const file of filesWithSizes) {
    console.log(
      `[vite-plugin-bundle-size-enforcer]  ${file.file}: ${getSizeText(file.size)} (actual) / ${getSizeText(
        file.limit,
      )} (limit)`,
    )
    const exceeded = file.size > file.limit
    if (exceeded && failOnExceed) {
      throw new Error(`[vite-plugin-bundle-size-enforcer] ERROR: File size limit exceeded for ${file.file}`)
    }
    if (exceeded) {
      console.warn(`[vite-plugin-bundle-size-enforcer] WARNING: File size limit exceeded for ${file.file}`)
    }
  }
}

function getFileSize(file: string, distPath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    fs.stat(path.join(distPath, file), (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats.size)
      }
    })
  })
}

function getSizeText(size: number): string {
  return size > 1024 * 1024 ? `${(size / (1024 * 1024)).toFixed(2)} MB` : `${(size / 1024).toFixed(2)} KB`
}
