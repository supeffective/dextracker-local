import ErrorBoundary from '@/components/errors/ErrorBoundary'
import StatelessAppLayout from '@/components/layout/StatelessAppLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppErrorFallback } from '../errors/ErrorBoundaryFallback'

const queryClient = new QueryClient()

// Stateful App layout, used as a wrapper of every page, unless they have an exported component named "layout",
// then, that custom layout component will be used instead.

function StatefulAppLayout({ children }: { children?: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={(error) => <AppErrorFallback error={error} />}>
      <StatelessAppLayout>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </StatelessAppLayout>
    </ErrorBoundary>
  )
}

export default StatefulAppLayout
