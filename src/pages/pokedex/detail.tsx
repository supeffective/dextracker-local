import StickyToolbar from '@/components/StickyToolbar'
import LoadingBanner from '@/components/layout/LoadingBanner'
import DexTracker from '@/components/tracker/DexTracker'
import useLoadDexTrackerDataFromUrl, { DexTrackerRouteParams } from '@/hooks/useLoadDexTrackerDataFromUrl'
import { PageComponent } from '@/lib/router'

const GamePokedexPage: PageComponent<keyof DexTrackerRouteParams> = ({ routeParams, ...rest }) => {
  useLoadDexTrackerDataFromUrl()

  if (!routeParams.gameId || !routeParams.dexId) {
    return <LoadingBanner />
  }

  return (
    <div {...rest}>
      <StickyToolbar />
      <DexTracker />
    </div>
  )
}

export default GamePokedexPage
