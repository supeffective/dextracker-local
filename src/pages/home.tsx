import StickyToolbar from '@/components/StickyToolbar'
import ChangelogEntries from '@/components/home/ChangelogEntries'
import DexProgressTiles from '@/components/home/DexProgressTiles'
import AppMainText from '@/components/layout/AppMainText'
import SettingsDrawer from '@/components/toolbar/SettingsDrawer'
import TrackFormsAction from '@/components/toolbar/TrackFormsAction'
import { PageComponent } from '@/lib/router/types'

const HomePage: PageComponent<'id' | 'foo'> = ({ routeParams: _, ...rest }) => {
  return (
    <div {...rest}>
      <StickyToolbar stickyness="none">
        <AppMainText />
        <SettingsDrawer>
          <TrackFormsAction />
        </SettingsDrawer>
      </StickyToolbar>
      <DexProgressTiles />
      <ChangelogEntries />
    </div>
  )
}

export default HomePage
