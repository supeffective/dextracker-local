import fs from 'node:fs'
import http from 'node:http'
import { AddressInfo } from 'node:net'
import path from 'node:path'
import express, { Express } from 'express'
import { Options as HTMLMinifierTerserOptions, minify } from 'html-minifier-terser'
import puppeteer, { Browser, PuppeteerLaunchOptions } from 'puppeteer'
import type { Plugin } from 'vite'
import { BundleSizeEnforcerOptions, enforceAssetsSize } from './plugin-utils/assets-size-enforcer'
import { defaultMinifyOptions } from './plugin-utils/minify-html'

/*
 * Work adapted from https://github.com/saeedafzal/vite-plugin-html-prerender
 * Simplified to our needs, with less dependencies.
 */

//
export interface HtmlPrerenderOptions {
  /**
   * The output path of `vite build`. By default, it is "dist", relative to process.cwd().
   */
  distPath?: string

  /**
   * Routes to render. By default, only the root route "/" is rendered.
   */
  routes?: Array<string>

  /**
   * The query selector for the root element to wait for.
   * Defaults to "#root".
   * Optional.
   */
  rootSelector?: string
  sizeEnforcerOptions?: Omit<BundleSizeEnforcerOptions, 'distPath'>
  minifyOptions?: HTMLMinifierTerserOptions
}

type RenderedRoute = {
  route: string
  html: string
}

const defaultOptions: HtmlPrerenderOptions = {
  distPath: 'dist',
  routes: ['/'],
  rootSelector: '#root',
  sizeEnforcerOptions: {
    assetLimits: {
      'index.html': 1024 * 1024 * 2, // 2 MB
    },
    failOnExceed: true,
  },
  minifyOptions: {
    ...defaultMinifyOptions,
  },
}

const htmlPrerender = (options?: HtmlPrerenderOptions): Plugin => {
  const resolvedOptions: HtmlPrerenderOptions = {
    ...defaultOptions,
    ...options,
    sizeEnforcerOptions: {
      ...defaultOptions.sizeEnforcerOptions,
      ...options?.sizeEnforcerOptions,
    },
    minifyOptions: {
      ...defaultOptions.minifyOptions,
      ...options?.minifyOptions,
    },
  }
  resolvedOptions.distPath = path.resolve(process.cwd(), resolvedOptions.distPath)

  return {
    name: 'vite-plugin-html-prerender',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      await emitRendered(resolvedOptions)
      await enforceAssetsSize({
        ...resolvedOptions.sizeEnforcerOptions,
        distPath: resolvedOptions.distPath,
      })
    },
  }
}

const emitRendered = async (options: HtmlPrerenderOptions): Promise<void> => {
  const serverPort = 0
  const server = new SSGRendererServer(serverPort)
  const renderer = new SSGRenderer()

  await server
    .init(options.distPath)
    .then(async () => {
      console.log('\n[vite-plugin-html-prerender] Starting headless browser...')
      return await renderer.init()
    })
    .then(async () => {
      const renderedRoutes: RenderedRoute[] = []
      for (const route of options.routes) {
        console.log('[vite-plugin-html-prerender] Pre-rendering route:', route)
        const renderedRoute = await renderer.renderRoute(route, server.runningPort, options.rootSelector)
        renderedRoutes.push(renderedRoute)
      }
      return renderedRoutes
    })
    .then(async (renderedRoutes) => {
      console.log('[vite-plugin-html-prerender] Saving pre-rendered routes to output...')
      for (const renderedRoute of renderedRoutes) {
        if (options.minifyOptions) {
          console.log('[vite-plugin-html-prerender] Minifying HTML...')
          renderer.saveToFile(options.distPath, {
            route: renderedRoute.route,
            html: await minify(renderedRoute.html, options.minifyOptions),
          })
        }

        await renderer.saveToFile(options.distPath, renderedRoute)
      }
    })
    .then(async () => {
      await renderer.destroy()
      await server.destroy()
      console.log('[vite-plugin-html-prerender] Pre-rendering routes completed.')
    })
    .catch(async (e) => {
      await renderer.destroy()
      await server.destroy()
      console.error('[vite-plugin-html-prerender] Failed to prerender routes:', e)
    })
}

export default htmlPrerender

class SSGRendererServer {
  runningPort = 0

  private readonly _port: number
  private readonly _server: Express
  private _instance?: http.Server

  constructor(port: number) {
    this._port = port
    this._server = express()
  }

  init(distPath: string): Promise<void> {
    this._server.use(express.static(distPath, { dotfiles: 'allow' }))
    this._server.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')))

    return new Promise((resolve) => {
      this._instance = this._server.listen(this._port, () => {
        this.runningPort = (this._instance?.address() as AddressInfo).port
        resolve()
      })
    })
  }

  async destroy(): Promise<void> {
    return new Promise((resolve) => {
      this._instance?.close(() => resolve())
    })
  }
}

class SSGRenderer {
  private _browser?: Browser

  async init(): Promise<void> {
    const options: PuppeteerLaunchOptions = {
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }

    this._browser = await puppeteer.launch(options)
  }

  async destroy(): Promise<void> {
    await this._browser?.close()
  }

  async renderRoute(route: string, port: number, selector: string): Promise<RenderedRoute> {
    if (!this._browser) {
      throw Error('Headless browser instance not started. Failed to prerender.')
    }

    const page = await this._browser.newPage()
    await page.goto(`http://localhost:${port}${route}`)
    await page.waitForSelector(selector, { timeout: 10000 }) // 10s timeout
    const html = await page.content()

    return { route, html }
  }

  async saveToFile(distPath: string, renderedRoute: RenderedRoute): Promise<void> {
    const target = path.join(distPath, renderedRoute.route, 'index.html')
    const directory = path.dirname(target)

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }

    fs.writeFileSync(target, renderedRoute.html)
  }
}
