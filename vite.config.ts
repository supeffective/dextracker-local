import path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import { PluginOption, defineConfig } from 'vite'
import { VitePWA as pwaPlugin } from 'vite-plugin-pwa'
import dataJson from './src/config.json'
import htmlInlineAssets from './vite/vite-plugin-html-inline-assets'
import htmlPrerender from './vite/vite-plugin-html-prerender'
import htmlReplaceVars from './vite/vite-plugin-html-replace-vars'
import webappManifest from './vite/webapp-manifest'

// Casting needed to avoid TS error "Excessive stack depth comparing types". This might be some circular ref. issue.
const reactPlugin = react() as PluginOption

const plugins: PluginOption[] = [
  reactPlugin,
  htmlReplaceVars({ data: dataJson }),
  htmlInlineAssets({ cleanupInlineFiles: true }),
  pwaPlugin({
    // https://vite-pwa-org.netlify.app/guide/
    registerType: 'autoUpdate',
    manifest: webappManifest,
    includeAssets: ['logo.png', 'logo.svg', 'robots.txt'],
    injectRegister: 'inline',
    devOptions: {
      enabled: false,
    },
  }),
  htmlPrerender(),
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: plugins,
  esbuild: { legalComments: 'none' },
  assetsInclude: ['**/*.avif', '**/*.webp'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
})
