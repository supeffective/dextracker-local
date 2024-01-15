import config from '@/config'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './AppFooter.module.scss'

type AppFooterProps = {} & ComponentPropsWithoutRef<'div'>

export default function AppFooter({ className, ...props }: AppFooterProps) {
  return (
    <footer className={cn(styles.footer, className)} {...props}>
      <section>
        <p>
          <i>
            <b>{config.title} </b>
            <span>v{config.version}</span>
          </i>
        </p>
        <p>&copy; 2024 Javier Aguilar, supereffective.gg.</p>
      </section>
      <section>
        <small>This is a fan site and is not affiliated with The Pokémon Company, Game Freak or © Nintendo.</small>
      </section>
    </footer>
  )
}
