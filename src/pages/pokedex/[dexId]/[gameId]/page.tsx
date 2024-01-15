import StickyToolbar from '@/components/StickyToolbar'
import LoadingBanner from '@/components/primitives/LoadingBanner'
import DexPokemonSearchBox from '@/components/toolbar/DexPokemonSearchBox'
import DexSettingsDrawer from '@/components/toolbar/DexSettingsDrawer'
import DexSwitchDrawer from '@/components/toolbar/DexSwitchDrawer'
import DexTracker from '@/components/tracker/DexTracker'
import { DexTrackerRouteParams } from '@/hooks/useLoadDexTrackerDataFromUrl'
import { PageComponent } from '@/lib/router'

const GamePokedexPage: PageComponent<keyof DexTrackerRouteParams> = ({ routeParams, ...rest }) => {
  if (!routeParams.gameId || !routeParams.dexId) {
    return <LoadingBanner />
  }

  return (
    <div {...rest}>
      <StickyToolbar>
        <DexSwitchDrawer />
        <DexPokemonSearchBox />
        <DexSettingsDrawer />
      </StickyToolbar>
      <DexTracker />
    </div>
  )
}

export default GamePokedexPage
