import StatelessAppLayout from '@/components/layout/StatelessAppLayout'
import { PageNotFoundError } from '@/lib/router/errors'
import PokemonImg from '../PokemonImg'
import styles from './ErrorBoundaryFallback.module.scss'

export function ErrorBoundaryFallback({ error }: { error: Error }) {
  if (error instanceof PageNotFoundError) {
    return (
      <StatelessAppLayout>
        <div className={styles.notFoundError}>
          <PokemonImg pkmId="0137" style={{ animation: 'var(--animation-bounce)' }} />
          <p className={styles.errorMsg}>
            <small>Ooops! It seems this page does not exist or your parameters are wrong. Bzzzzzt...</small>
          </p>
        </div>
      </StatelessAppLayout>
    )
  }
  return (
    <StatelessAppLayout>
      <div className={styles.error}>
        <PokemonImg pkmId="0292" style={{ animation: 'var(--animation-pulse)' }} />
        <p className={styles.errorMsg}>
          <b>Unexpected ERROR! </b>
          <br />
          <small>
            Something went wrong, but we don't know what. Please check the console for more info, and report this error
            to the developers via Github (preferred), Discord or Twitter.
          </small>
        </p>
      </div>
    </StatelessAppLayout>
  )
}
