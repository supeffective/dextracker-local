import path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import { PluginOption, defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
// @ts-ignore
import data from './src/data'

const htmlTransformPlugin: PluginOption = {
  name: 'html-replace-vars',
  transformIndexHtml(html) {
    const dataVars = Object.entries(data)

    let transformedHtml = html
    for (const [key, value] of dataVars) {
      transformedHtml = transformedHtml
        .replace(new RegExp(`%% ${key} %%`, 'g'), value)
        .replace(new RegExp(`%%${key}%%`, 'g'), value)
    }

    return transformedHtml
  },
  buildEnd() {
    console.log('Build complete')
  },
}

const plugins: PluginOption[] = [
  // biome-ignore lint/suspicious/noExplicitAny: Needed to avoid TS error "Excessive stack depth comparing types"
  react() as any,
  htmlTransformPlugin,
  viteSingleFile({
    inlinePattern: [],
  }),
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
})
