import StatelessAppLayout from '@/components/layout/StatelessAppLayout'
import { PageNotFoundError } from '@/lib/router/errors'

export function AppErrorFallback({ error }: { error: Error }) {
  if (error instanceof PageNotFoundError) {
    return (
      <StatelessAppLayout>
        <div className="error-panel">
          <h2>Error 404: Page Not Found</h2>
        </div>
      </StatelessAppLayout>
    )
  }
  return (
    <StatelessAppLayout>
      <div className="error-panel">
        <h2>Something went wrong. Check the console for more info.</h2>
      </div>
    </StatelessAppLayout>
  )
}
