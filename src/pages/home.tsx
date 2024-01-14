import StickyToolbar from '@/components/StickyToolbar'
import ChangelogEntries from '@/components/home/ChangelogEntries'
import DexProgressTiles from '@/components/home/DexProgressTiles'
import AppMainText from '@/components/layout/AppMainText'
import { PageComponent } from '@/lib/router/types'

const HomePage: PageComponent<'id' | 'foo'> = ({ routeParams: _, ...rest }) => {
  return (
    <div {...rest}>
      <StickyToolbar noSearch leftContent={<AppMainText />} style={{ position: 'relative' }} />
      <DexProgressTiles />
      <ChangelogEntries />
    </div>
  )
}

export default HomePage
