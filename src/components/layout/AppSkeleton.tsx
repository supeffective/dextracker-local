import AppFooter from './AppFooter'
import AppHeader from './AppHeader'

function AppSkeleton({ children }: { children: React.ReactNode }) {
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

export default AppSkeleton
