import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StickyToolbar from './components/StickyToolbar'
import AppMainText from './components/layout/AppMainText'
import AppSkeleton from './components/layout/AppSkeleton'
import ErrorBoundary from './components/layout/ErrorBoundary'
import DexTracker from './components/tracker/DexTracker'

const queryClient = new QueryClient()

function AppErrorFallback() {
  return (
    <AppSkeleton>
      <div className="error-panel">
        <h1>Something went wrong. Check the console for more info.</h1>
      </div>
    </AppSkeleton>
  )
}

function App() {
  return (
    <ErrorBoundary fallback={<AppErrorFallback />}>
      <AppSkeleton>
        <QueryClientProvider client={queryClient}>
          <StickyToolbar />
          <AppMainText />
          <DexTracker />
        </QueryClientProvider>
      </AppSkeleton>
    </ErrorBoundary>
  )
}

export default App
