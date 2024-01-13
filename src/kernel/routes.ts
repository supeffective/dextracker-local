import AppLayout from '@/components/layout/AppLayout'
import { getFirstDexForGame, getFirstGameForDex } from '@/lib/dataset/pokedexes'
import { initializeAppRouter } from '@/lib/router/hooks'
import { RouterPage } from '@/lib/router/types'
import * as ErrorPage404 from '@/pages/404'
import * as HomePage from '@/pages/home'
import * as GamePokedexPage from '@/pages/pokedex/detail'

export const appRoutes: Record<string, RouterPage> = {
  '/': HomePage,
  '/pokedex/[dexId]/[gameId]': GamePokedexPage,
}

const appRouter = initializeAppRouter(appRoutes, ErrorPage404, AppLayout)

export const routeFactory = {
  home: '/',
  pokedex: (dexId: string | null | undefined, gameId: string | null | undefined) => {
    if (!gameId && !dexId) {
      throw new Error('routeFactory.pokedex: gameId and dexId are both undefined')
    }

    if (gameId && !dexId) {
      const dex = getFirstDexForGame(gameId)
      return `/#/pokedex/${dex?.id}/${gameId}`
    }

    if (!gameId && dexId) {
      const game = getFirstGameForDex(dexId)
      return `/#/pokedex/${dexId}/${game?.id}`
    }

    return `/#/pokedex/${dexId}/${gameId}`
  },
}

export default appRouter
