import ErrorBoundary from '@/components/errors/ErrorBoundary'
import StatelessAppLayout from '@/components/layout/StatelessAppLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { invoke } from '@tauri-apps/api/tauri'
import { useState } from 'react'
import { ErrorBoundaryFallback } from '../errors/ErrorBoundaryFallback'

const queryClient = new QueryClient()

export function TauriDemo() {
  const [greetMsg, setGreetMsg] = useState('')
  const [name, setName] = useState('')
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }))
  }
  return (
    <div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault()
          greet()
        }}
      >
        <input id="greet-input" onChange={(e) => setName(e.currentTarget.value)} placeholder="Enter a name..." />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  )
}

// Stateful App layout, used as a wrapper of every page, unless they have an exported component named "layout",
// then, that custom layout component will be used instead.

function StatefulAppLayout({ children }: { children?: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={(error) => <ErrorBoundaryFallback error={error} />}>
      <StatelessAppLayout>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </StatelessAppLayout>
    </ErrorBoundary>
  )
}

export default StatefulAppLayout
