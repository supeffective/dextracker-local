import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { CurrentRoute, PageComponent } from './types'

import { useRouterStore } from '../../stores/useRouterStore'

export type RouterLinkProps = {
  to: string
  children?: React.ReactNode
} & Omit<ComponentPropsWithoutRef<'a'>, 'href'>

export function RouterLink({ to, children, ...rest }: RouterLinkProps) {
  const [currentRoute, navigate] = useRouterStore((state) => [state.route, state.navigate])
  const isCurrent = currentRoute?.basePath === to

  return (
    // biome-ignore lint/a11y/useValidAnchor: this should also work without JS
    <a
      href={to}
      data-current={isCurrent}
      onClick={(e) => {
        e.preventDefault()
        navigate(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

export type RouteRendererProps = {
  route?: CurrentRoute
  fallback?: PageComponent
} & ComponentPropsWithoutRef<'div'>

export function RouteRenderer({ route, fallback, ...rest }: RouteRendererProps): ReactNode {
  let Component: PageComponent<string> | undefined
  const routeParams: Record<string, string> = {}

  if (route) {
    Component = route.component
    route.params.forEach((value, key) => {
      routeParams[key] = value
    })
  } else if (fallback) {
    Component = fallback
  }

  if (!Component) {
    throw new Error('No route found for current path')
  }

  return <Component routeParams={routeParams} {...rest} />
}
