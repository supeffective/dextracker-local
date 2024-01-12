import { ManifestOptions } from 'vite-plugin-pwa'
import dataJson from '../src/config.json'

const webappManifest: Partial<ManifestOptions> = {
  id: 'com.itsjavi.pokedex-tracker',
  lang: 'en',
  scope: '/pokedex-tracker',
  start_url: '/pokedex-tracker',
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
      src: '/pokedex-tracker/twitter-card.png',
      type: 'image/png',
      sizes: '2400x1240',
      form_factor: 'wide',
    },
  ],
  icons: [
    {
      src: '/pokedex-tracker/logo.png',
      type: 'image/png',
      sizes: '256x256',
    },
  ],
}

export default webappManifest
