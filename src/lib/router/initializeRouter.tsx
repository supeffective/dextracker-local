import { AppRouter } from './appRouterClass'
import type { PageComponent, PageComponentProps, RouterPage } from './types'

export function initializeRouter(
  router: AppRouter,
  appRoutes: Record<string, RouterPage>,
  errorPage: RouterPage,
  defaultLayout: PageComponent,
): AppRouter {
  const DefaultLayout = defaultLayout
  const Error404Layout = errorPage.Layout ?? defaultLayout
  const Error404Fc = errorPage.default as React.FC

  router.setFallback((props: PageComponentProps) => {
    return (
      <Error404Layout {...props}>
        <Error404Fc />
      </Error404Layout>
    )
  })

  for (const pattern of Object.keys(appRoutes)) {
    const page = appRoutes[pattern]
    if (!page || !page.default) {
      throw new Error(`Page with route '${pattern}' does not have a default JSX.Element export.`)
    }

    const LayoutFc = page.Layout ?? DefaultLayout
    const PageFc = page.default

    router.add(pattern, (props: PageComponentProps) => {
      return (
        <LayoutFc {...props}>
          <PageFc {...props} />
          {props?.children}
        </LayoutFc>
      )
    })
  }

  if (router.length === 0) {
    throw new Error('Router error: No routes found')
  }

  return router
}
