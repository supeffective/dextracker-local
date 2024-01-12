import configJson from './config.json'

const config = configJson satisfies Record<string, string>

export const WEBAPP_BASE_PATH = `${import.meta.env.BASE_URL}`.replace(/\/$/, '')

export default config
