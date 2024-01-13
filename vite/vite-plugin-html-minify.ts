import { Options as HTMLMinifierTerserOptions, minify } from 'html-minifier-terser'
import { Plugin } from 'vite'

function htmlMinify(options?: HTMLMinifierTerserOptions): Plugin {
  return {
    name: 'vite-plugin-html-minify',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml: (html) => {
      console.log('[vite-plugin-html-minify] Minifying HTML...')
      return minify(html, {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: false,
        removeEmptyAttributes: false,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        ...options,
      })
    },
  }
}

export const defaultMinifyOptions: HTMLMinifierTerserOptions = {
  removeComments: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: false,
  removeEmptyAttributes: false,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
}

export default htmlMinify
