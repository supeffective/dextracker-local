import pkg from '../package.json'
import configJson from './config.json'

const config = { ...configJson, version: pkg.version } satisfies Record<string, string>

export const WEBAPP_BASE_PATH = `${import.meta.env.BASE_URL}`.replace(/\/$/, '')

export default config
