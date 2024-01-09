import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ActionToolbar from './components/ActionToolbar'
import AppFooter from './components/layout/AppFooter'
import AppHeader from './components/layout/AppHeader'
import AppMainText from './components/layout/AppMainText'
import DexTracker from './components/tracker/DexTracker'

const queryClient = new QueryClient()

function App() {
  return (
    <div id="app">
      <QueryClientProvider client={queryClient}>
        <div>
          <AppHeader />
          <ActionToolbar />
          <AppMainText />
          <DexTracker />
        </div>
        <AppFooter />
      </QueryClientProvider>
    </div>
  )
}

export default App
