import { initializeAppRouter } from '@/lib/router/hooks'
import routerConfig from './routerConfig'

const appRouter = initializeAppRouter(routerConfig.appRoutes, routerConfig.errorPage, routerConfig.defaultLayout)

export default appRouter
