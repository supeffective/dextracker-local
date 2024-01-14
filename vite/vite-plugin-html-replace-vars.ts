import { Plugin } from 'vite'
import { replaceVars } from './plugin-utils/replace-vars'
// import dataJson from '../src/data.json'

type HtmlReplaceVarsOptions = {
  data: Record<string, unknown>
  delimiters?: [start: string, end: string]
}

export default function htmlReplaceVars({ data, delimiters = ['{{', '}}'] }: HtmlReplaceVarsOptions): Plugin {
  const htmlReplaceVarsPlugin: Plugin = {
    name: 'vite-plugin-html-replace-vars',
    transformIndexHtml(html) {
      return replaceVars(html, data, delimiters)
    },
    buildEnd() {
      console.log('')
      console.log('[htmlReplaceVars]  Build complete')
    },
  }

  return htmlReplaceVarsPlugin
}
