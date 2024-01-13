import AppSkeleton from '@/components/layout/AppSkeleton'
import ErrorBoundary from '@/components/layout/ErrorBoundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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

function AppLayout({ children }: { children?: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<AppErrorFallback />}>
      <AppSkeleton>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </AppSkeleton>
    </ErrorBoundary>
  )
}

export default AppLayout
