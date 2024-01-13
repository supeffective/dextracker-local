# Custom Router

This is a minimalistic and lightweight router, inspired on React Router and Next.js App Router.

## Features

- Via Zustand, we have hooks like `useRouteNavigator`, `useRouteParams`, `useRouteQuery`, and `useRouterStore`, without
  the need of wrapping the parent components in a context provider.
- Supports nested routes with params, defined in a similar way like Next.js App Router (but not file-based, programmatic
  only)
- Supports page components and different Layouts
  - Page components need to be wrapped in a div and the props need to be of type `PageComponent<RouteParamKeys>`
  - It will receive an object called routerParams, which is a `Record<RouteParamKeys, string>`
  - If the page component needs to be the `default` export, and you can also use the `Layout` named export to use a
    different layout for that page component.
