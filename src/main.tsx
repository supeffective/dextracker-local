import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/layout/AppWithRouter'

import AppLayout from './components/layout/AppLayout'
import { appRoutes } from './kernel/routes'
import { initializeAppRouter } from './lib/router/hooks'
import * as ErrorPage404 from './pages/error'
import './styles/index.scss'

initializeAppRouter(appRoutes, ErrorPage404, AppLayout)

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
