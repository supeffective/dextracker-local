import { PageComponent } from '@/lib/router/types'

const DemoPage: PageComponent<'id' | 'foo'> = ({ routeParams: _, ...rest }) => {
  return (
    <article {...rest}>
      <h2>Demo Page</h2>
      <p>Demo page to test the router</p>
    </article>
  )
}

export default DemoPage
