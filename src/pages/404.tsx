import { PageComponent } from '@/lib/router/types'

const ErrorPage404: PageComponent<'id' | 'foo'> = ({ routeParams: _, ...rest }) => {
  return (
    <article {...rest}>
      <h2>Error 404: Route Not Found</h2>
    </article>
  )
}

export default ErrorPage404
