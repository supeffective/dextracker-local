import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

import type { CurrentRoute, PageComponent, RouterPageModule, RouterPageModuleRouteMap } from '@/lib/router/types'
import { AppRouter } from './appRouterClass'
import { initializeRouter } from './initializeRouter'

type State = {
  route?: CurrentRoute
  isNotFound: boolean
  params: Record<string, string | undefined>
  query: Record<string, string | undefined>
}

type Actions = {
  navigate: (path: string) => void
  loadState: () => () => void
  getFallbackComponent: () => PageComponent | undefined
}

export const appRouter = new AppRouter()

export function initializeAppRouter(
  appRoutes: RouterPageModuleRouteMap,
  errorPage: RouterPageModule,
  defaultLayout: PageComponent,
): AppRouter {
  if (appRouter.hasRoutes()) {
    throw new Error('App router already initialized')
  }

  return initializeRouter(appRouter, appRoutes, errorPage, defaultLayout)
}

export const useRouterStore = createWithEqualityFn<State & Actions>((set) => {
  appRouter.refresh(window.location.hash)

  const buildState = (): State => {
    return {
      route: appRouter.currentRoute ? { ...appRouter.currentRoute } : undefined,
      params: Object.fromEntries(appRouter.currentRoute?.params.entries() ?? []),
      query: Object.fromEntries(appRouter.currentRoute?.query.entries() ?? []),
      isNotFound: appRouter.currentRoute === undefined,
    }
  }

  const updateState = () => {
    set(() => {
      return buildState()
    })
  }

  return {
    ...buildState(),
    loadState: () => {
      appRouter.refresh(window.location.hash)
      updateState()

      return appRouter.register(updateState)
    },
    navigate: (path: string) => {
      appRouter.navigate(path)
      updateState()
    },
    getFallbackComponent: () => appRouter.getFallback(),
  }
}, shallow)

export function useRouteParams(): {
  [key: string]: string | undefined
} {
  return useRouterStore((state) => state.params)
}

export function useRouteQuery(): {
  [key: string]: string | undefined
} {
  return useRouterStore((state) => state.query)
}

export function useRouteNavigator(): (path: string) => void {
  return useRouterStore((state) => state.navigate)
}
