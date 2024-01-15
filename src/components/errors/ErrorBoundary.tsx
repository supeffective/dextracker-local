import React from 'react'

type ErrorBoundaryState = {
  error?: Error
  errorInfo?: React.ErrorInfo
  hasError: boolean
}

type ErrorBoundaryProps = {
  children: React.ReactNode
  fallback?: (error: Error) => React.ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service
    // console.error('Uncaught error:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  render() {
    const fallbackFn = this.props.fallback
    if (this.state.hasError) {
      if (!this.state.error) {
        return <>Error</>
      }
      // You can render any custom fallback UI
      return fallbackFn ? (
        fallbackFn(this.state.error)
      ) : (
        <>
          <div className="error-panel">
            <h1>Something went wrong. Check the console for more info.</h1>
          </div>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
