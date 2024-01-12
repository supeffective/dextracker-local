import React from 'react'

type ErrorBoundaryState = {
  error?: Error
  errorInfo?: React.ErrorInfo
  hasError: boolean
}

type ErrorBoundaryProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
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
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // You can render any custom fallback UI
      return (
        this.props.fallback ?? (
          <>
            <div className="error-panel">
              <h1>Something went wrong. Check the console for more info.</h1>
            </div>
          </>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
