import { OutputAsset, OutputOptions } from 'rollup'
import { Plugin, UserConfig } from 'vite'

// Code originally from richardtallent/vite-plugin-singlefile, simplified, safer, and adapted to our needs.

export type HtmlInlineAssetsOptions = {
  // Optionally, delete inlined assets preventing them from being in the final dist output.
  //
  // @default true
  cleanupInlineFiles?: boolean
  /**
   * The maximum size of an asset to inline, in bytes.
   */
  maxInlineAssetSize?: number
}

const defaultConfig: Required<HtmlInlineAssetsOptions> = {
  cleanupInlineFiles: true,
  maxInlineAssetSize: 2 * 1024 * 1024, // 2MB
}

export default function htmlInlineAssets({
  cleanupInlineFiles = defaultConfig.cleanupInlineFiles,
  maxInlineAssetSize = defaultConfig.maxInlineAssetSize, // 2MB
}: HtmlInlineAssetsOptions = defaultConfig): Plugin {
  return {
    name: 'vite:html-inline-assets',
    enforce: 'post',
    config: (config) => _prepareBuildConfig(config, maxInlineAssetSize),
    buildEnd() {
      console.log('[htmlInlineAssets] Build complete')
    },
    generateBundle: (_, outputBundle) => {
      const htmlFiles = Object.keys(outputBundle).filter((i) => i.endsWith('.html'))
      const cssFiles = Object.keys(outputBundle).filter((i) => i.endsWith('.css'))
      const jsFiles = Object.keys(outputBundle).filter((i) => i.endsWith('.js'))

      const filesToDelete: string[] = []

      console.info('\ninlining JS and CSS assets...')

      for (const htmlFilename of htmlFiles) {
        const htmlChunk = outputBundle[htmlFilename] as OutputAsset
        let replacedHtml = _getChunkString(htmlChunk.source)

        console.info('  html:', htmlFilename)

        for (const jsFilename of jsFiles) {
          console.info('  js:  ', jsFilename)
          const assetChunk = outputBundle[jsFilename]
          if (assetChunk.type !== 'chunk') {
            throw new Error(`Expected cssChunk.type to be 'chunk', but got ${assetChunk.type}`)
          }
          if (!assetChunk.code) {
            _warnNotInlined(jsFilename, 'no code')
            continue
          }
          filesToDelete.push(jsFilename)
          replacedHtml = _replaceScript(replacedHtml, assetChunk.fileName, assetChunk.code)
        }

        for (const cssFilename of cssFiles) {
          console.info('  css: ', cssFilename)
          const assetChunk = outputBundle[cssFilename]
          if (assetChunk.type !== 'asset') {
            throw new Error(`Expected cssChunk.type to be 'asset', but got ${assetChunk.type}`)
          }
          if (!assetChunk.source) {
            _warnNotInlined(cssFilename, 'no code')
            continue
          }
          filesToDelete.push(cssFilename)
          replacedHtml = _replaceCss(replacedHtml, assetChunk.fileName, _getChunkString(assetChunk.source))
        }

        htmlChunk.source = replacedHtml
      }

      if (cleanupInlineFiles) {
        for (const filename of filesToDelete) {
          // avoids storing the file in the output directory
          delete outputBundle[filename]
        }
      }

      const excludedBundleFiles = Object.keys(outputBundle).filter(
        (i) => !i.endsWith('.js') && !i.endsWith('.css') && !i.endsWith('.html'),
      )

      for (const name of excludedBundleFiles) {
        _warnNotInlined(name)
      }
    },
  }
}

function _getChunkString(chunkCode: string | Uint8Array): string {
  if (typeof chunkCode === 'string') {
    return chunkCode
  }
  return new TextDecoder().decode(chunkCode)
}

function _replaceScript(htmlCode: string, assetFilename: string, assetCode: string): string {
  const preloadMarker = /"__VITE_PRELOAD__"/g
  const newCode = assetCode.replace(preloadMarker, 'void 0')
  const scriptRegex = new RegExp(`<script([^>]*?) src=".*${assetFilename}"([^>]*)></script>`)
  if (!scriptRegex.test(htmlCode)) {
    console.error(`Could not find script tag for asset '${assetFilename}'`)
    return htmlCode
  }
  const inlinedCode = htmlCode.replace(
    scriptRegex,
    (_, beforeSrc, afterSrc) => `<script${beforeSrc}${afterSrc}>\n${newCode}\n</script>`,
  )
  return inlinedCode
}

function _replaceCss(htmlCode: string, assetFilename: string, assetCode: string): string {
  const styleRegex = new RegExp(`<link([^>]*?) href=".*${assetFilename}"([^>]*?)>`)
  if (!styleRegex.test(htmlCode)) {
    console.error(`Could not find link tag for asset '${assetFilename}'`)
    return htmlCode
  }
  const inlined = htmlCode.replace(
    styleRegex,
    (_, beforeSrc, afterSrc) => `<style${beforeSrc}${afterSrc}>\n${assetCode}\n</style>`,
  )
  return inlined
}

function _warnNotInlined(filename: string, reason?: string) {
  return console.warn(`WARNING: asset not inlined: ${filename}${reason ? ` (${reason})` : ''}`)
}

// Modifies the Vite build config to make this plugin work well.
function _prepareBuildConfig(config: UserConfig, maxInlineAssetSize: number) {
  if (!config.build) {
    config.build = {}
  }

  if (!config.build.terserOptions) {
    config.build.terserOptions = {}
  }

  if (!config.build.terserOptions.format) {
    config.build.terserOptions.format = {}
  }

  config.build.terserOptions.format.comments = false

  // Ensures that even very large assets are inlined in your JavaScript.
  config.build.assetsInlineLimit = maxInlineAssetSize

  // Avoid warnings about large chunks.
  config.build.chunkSizeWarningLimit = maxInlineAssetSize

  // Emit all CSS as a single file, which this plugin can then inline.
  config.build.cssCodeSplit = false

  // Subfolder bases are not supported, and shouldn't be needed because we're embedding everything.
  // WARNING: disabling because this fucks up vite's BASE_URL automatic resolution for assets (e.g. /logo.png)
  // config.base = undefined

  function updateOutputOptions(opts: OutputOptions) {
    // Ensure that as many resources as possible are inlined.
    opts.inlineDynamicImports = true
  }

  if (!config.build.rollupOptions) {
    config.build.rollupOptions = {}
  }

  if (!config.build.rollupOptions.output) {
    config.build.rollupOptions.output = {}
  }

  if (Array.isArray(config.build.rollupOptions.output)) {
    const optsArr = config.build.rollupOptions.output as OutputOptions[]
    for (const opts of optsArr) {
      updateOutputOptions(opts)
    }
  } else {
    updateOutputOptions(config.build.rollupOptions.output)
  }
}
