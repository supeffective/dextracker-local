import path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import { PluginOption, defineConfig } from 'vite'
import dataJson from './src/config.json'
import htmlInlineAssets from './vite/vite-plugin-html-inline-assets'
import htmlReplaceVars from './vite/vite-plugin-html-replace-vars'

// Casting needed to avoid TS error "Excessive stack depth comparing types". This might be some circular ref. issue.
const reactPlugin = react() as PluginOption

const plugins: PluginOption[] = [
  reactPlugin,
  htmlReplaceVars({ data: dataJson }),
  htmlInlineAssets({ deleteInlinedFiles: true }),
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
