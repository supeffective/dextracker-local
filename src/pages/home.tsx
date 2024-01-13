import StickyToolbar from '@/components/StickyToolbar'
import AppMainText from '@/components/layout/AppMainText'
import DexTracker from '@/components/tracker/DexTracker'
import { PageComponent } from '@/lib/router/types'

const HomePage: PageComponent<'id' | 'foo'> = ({ ...rest }) => {
  return (
    <div {...rest}>
      <StickyToolbar />
      <AppMainText />
      <DexTracker />
    </div>
  )
}

export default HomePage
