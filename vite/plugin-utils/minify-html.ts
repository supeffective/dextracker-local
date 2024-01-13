import { Options as HTMLMinifierTerserOptions, minify } from 'html-minifier-terser'

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

export function minifyHtml(html: string, options?: HTMLMinifierTerserOptions): Promise<string> {
  return minify(html, {
    ...defaultMinifyOptions,
    ...options,
  })
}
