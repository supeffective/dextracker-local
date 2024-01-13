import { Plugin } from 'vite'
import { ManifestOptions, VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import dataJson from '../src/config.json'

// https://vite-pwa-org.netlify.app/guide/

const webappManifest: Partial<ManifestOptions> = {
  id: 'com.supeffective.super-pokedex-tracker',
  lang: 'en',
  start_url: '/',
  name: dataJson.webapp_name,
  short_name: dataJson.webapp_short_name,
  description: dataJson.meta_description,
  background_color: dataJson.webapp_theme_color,
  theme_color: dataJson.webapp_theme_color,
  dir: 'ltr',
  orientation: 'any',
  display: 'standalone',
  display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
  categories: ['entertainment', 'games'],
  screenshots: [
    {
      src: '/screenshot.jpg',
      type: 'image/jpeg',
      sizes: '640x320',
      form_factor: 'wide',
      label: 'An example Scarlet Dex Tracker',
    },
  ],
  icons: [
    {
      src: '/images/logo/logo-2x.png',
      type: 'image/png',
      sizes: '512x512',
    },
    {
      src: '/images/logo/logo.png',
      type: 'image/png',
      sizes: '256x256',
    },
  ],
}

const pwaPluginOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  manifest: webappManifest,
  includeAssets: ['images/logo/logo.png', 'images/logo/logo.svg', 'images/logo/apple-touch-icon.png', 'robots.txt'],
  injectRegister: 'inline',
  devOptions: {
    enabled: false,
  },
}

export default function pwaPlugin(): Plugin[] {
  return VitePWA(pwaPluginOptions)
}
