import StickyToolbar from '@/components/StickyToolbar'
import ChangelogEntries from '@/components/home/ChangelogEntries'
import DexProgressTiles from '@/components/home/DexProgressTiles'
import WelcomeBanner from '@/components/home/WelcomeBanner'
import HomeDexSwitchDrawer from '@/components/toolbar/HomeDexSwitchDrawer'
import SettingsDrawer from '@/components/toolbar/SettingsDrawer'
import TrackFormsAction from '@/components/toolbar/actions/TrackFormsAction'
import { PageComponent } from '@/lib/router/types'

const HomePage: PageComponent<'id' | 'foo'> = ({ routeParams: _, ...rest }) => {
  return (
    <div {...rest}>
      <StickyToolbar stickyness="none" vplacement="center">
        <HomeDexSwitchDrawer />
        <SettingsDrawer>
          <TrackFormsAction />
          <hr />
        </SettingsDrawer>
      </StickyToolbar>
      <WelcomeBanner />
      <DexProgressTiles />
      <ChangelogEntries versionsLimit={5} versionEntriesLimit={5} />
    </div>
  )
}

export default HomePage
