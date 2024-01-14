import { ComponentPropsWithoutRef } from 'react'
import { AppRouter } from './appRouterClass'

export type PageComponentProps<RouteParamKeys extends string = string> = {
  routeParams: Partial<Record<RouteParamKeys, string | undefined>>
} & ComponentPropsWithoutRef<'div' | 'main' | 'article' | 'section'>

export type PageComponent<R extends string = string> = React.FC<PageComponentProps<R>>

export type Route<K extends string = string> = {
  pattern: string
  regex: RegExp
  component: PageComponent<K>
}

export type ParsedUri = {
  basePath?: string
  hashPath: string
  params: URLSearchParams
  query: URLSearchParams
}

export type CurrentRoute<K extends string = string> = Route<K> & ParsedUri

export type RouterPageModule<K extends string = string> = {
  default?: PageComponent<K>
  layout?: PageComponent<K>
}

export type RouterContextState<K extends string = string> = {
  router: AppRouter
  currentRoute?: CurrentRoute<K>
}

export type RouterPageModuleRouteMap<K extends string = string> = Record<string, RouterPageModule<K>>
