import useLoadDexTrackerDataFromUrl from '@/hooks/useLoadDexTrackerDataFromUrl'
import { RouteRenderer } from '@/lib/router/components'
import { useRouterStore } from '@/stores/useRouterStore'
import { useEffect } from 'react'

// This component is the entry point of the app, it will load the initial router state and render the current route
// To configure the default layout that will be used for the pages, check src/kernel/routerConfig.ts
const RouteLoader = () => {
  const [route, loadState, getFallbackComponent] = useRouterStore((state) => [
    state.route,
    state.loadState,
    state.getFallbackComponent,
  ])
  // Here we want to load the initial router state just once on mount, and not on every rerender
  // biome-ignore lint/correctness/useExhaustiveDependencies: not applicable here
  useEffect(() => {
    loadState()
  }, [])

  useLoadDexTrackerDataFromUrl()

  return <RouteRenderer fallback={getFallbackComponent()} route={route} />
}

export default RouteLoader
