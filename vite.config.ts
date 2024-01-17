import path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import { PluginOption, defineConfig } from 'vite'
import pkgJson from './package.json'
import dataJson from './src/config.json'
import htmlInlineAssets from './vite/vite-plugin-html-inline-assets'
import htmlPrerender from './vite/vite-plugin-html-prerender'
import htmlReplaceVars from './vite/vite-plugin-html-replace-vars'
import pwaPlugin from './vite/vite-plugin-pwa-configured'

// Casting needed to avoid TS error "Excessive stack depth comparing types". This might be some circular ref. issue.
const reactPlugin = react() as PluginOption

const plugins: PluginOption[] = [
  reactPlugin,
  htmlReplaceVars({ data: { ...dataJson, ...pkgJson } }),
  htmlInlineAssets({ cleanupInlineFiles: true }),
  pwaPlugin(),
  htmlPrerender(),
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: plugins,
  esbuild: { legalComments: 'none' },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1510,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  // to access the Tauri environment variables set by the CLI with information about the current target
  envPrefix: [
    'VITE_',
    'TAURI_PLATFORM',
    'TAURI_ARCH',
    'TAURI_FAMILY',
    'TAURI_PLATFORM_VERSION',
    'TAURI_PLATFORM_TYPE',
    'TAURI_DEBUG',
  ],
  build: {
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari16',
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
})
