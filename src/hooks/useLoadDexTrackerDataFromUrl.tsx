import { useEffect } from 'react'
import useDexTrackerStore from '../stores/useDexTrackerStore'
import { useRouterStore } from '../stores/useRouterStore'

export type DexTrackerRouteParams = {
  gameId?: string
  dexId?: string
}

export default function useLoadDexTrackerDataFromUrl(): DexTrackerRouteParams {
  const params: DexTrackerRouteParams = useRouterStore((store) => store.params)
  const [setGame, setDex] = useDexTrackerStore((store) => [store.setCurrentGame, store.setCurrentDex])

  // biome-ignore lint/correctness/useExhaustiveDependencies: setGame, setDex should not be dependencies
  useEffect(() => {
    if (params.dexId) {
      setDex(params.dexId, params.gameId)
      return
    }
    if (params.gameId) {
      setGame(params.gameId)
    }
  }, [params.gameId, params.dexId])

  return params
}
