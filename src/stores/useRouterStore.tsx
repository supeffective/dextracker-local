import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

import appRouter from '@/kernel/router'
import type { CurrentRoute, PageComponent } from '@/lib/router/types'

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
