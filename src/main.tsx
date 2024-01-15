import React from 'react'
import ReactDOM from 'react-dom/client'
import RouteLoader from './components/layout/RouteLoader'

import './styles/index.scss'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouteLoader />
  </React.StrictMode>,
)
