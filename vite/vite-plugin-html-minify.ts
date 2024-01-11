import { Options as HTMLMinifierTerserOptions, minify } from 'html-minifier-terser'
import { Plugin } from 'vite'

function htmlMinify(options?: HTMLMinifierTerserOptions): Plugin {
  return {
    name: 'vite:html-minify',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml: (html) => {
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

export default htmlMinify
