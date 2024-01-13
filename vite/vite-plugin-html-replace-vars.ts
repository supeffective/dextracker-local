import { Plugin } from 'vite'
// import dataJson from '../src/data.json'

type HtmlReplaceVarsOptions = {
  data: Record<string, string>
  delimiters?: [start: string, end: string]
}

export default function htmlReplaceVars({ data, delimiters = ['{{', '}}'] }: HtmlReplaceVarsOptions): Plugin {
  const htmlReplaceVarsPlugin: Plugin = {
    name: 'vite-plugin-html-replace-vars',
    transformIndexHtml(html) {
      const dataVars = Object.entries(data)
      const [tstart, tend] = delimiters

      let transformedHtml = html
      for (const [key, value] of dataVars) {
        const regex = new RegExp(`${tstart}\s?${key}\s?${tend}`, 'g')
        transformedHtml = transformedHtml.replace(regex, value)
      }

      return transformedHtml
    },
    buildEnd() {
      console.log('')
      console.log('[htmlReplaceVars]  Build complete')
    },
  }

  return htmlReplaceVarsPlugin
}
