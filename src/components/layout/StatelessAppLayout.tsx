import AppFooter from './AppFooter'
import AppHeader from './AppHeader'

// Base App layout, used by error boundaries and other more stateful components / layouts.
// It should be minimal to avoid infinite loops when an error occurs also in an ErrorBoundary
// fallback component (which must not happen).
function StatelessAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="app">
      <div>
        <AppHeader />
        {children}
      </div>
      <AppFooter />
    </div>
  )
}

export default StatelessAppLayout
