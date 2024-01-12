import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StickyToolbar from './components/StickyToolbar'
import AppFooter from './components/layout/AppFooter'
import AppHeader from './components/layout/AppHeader'
import AppMainText from './components/layout/AppMainText'
import DexTracker from './components/tracker/DexTracker'

const queryClient = new QueryClient()

function App() {
  // TODO: if bundling pokemon.json data is too much, create a provider that loads it using fetch, asynchronously
  return (
    <div id="app">
      <QueryClientProvider client={queryClient}>
        <div>
          <AppHeader />
          <StickyToolbar />
          <AppMainText />
          <DexTracker />
        </div>
        <AppFooter />
      </QueryClientProvider>
    </div>
  )
}

export default App
