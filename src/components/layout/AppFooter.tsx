import config from '@/config'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './AppFooter.module.scss'

type AppFooterProps = {} & ComponentPropsWithoutRef<'div'>

export default function AppFooter({ className, ...props }: AppFooterProps) {
  return (
    <footer data-noselect className={cn(styles.footer, className)} {...props}>
      <p>
        <i>
          <b>{config.title} </b>
          <span>v{config.version}</span>
        </i>
      </p>
      <p>&copy; 2024 Javier Aguilar, supereffective.gg.</p>
      <p>
        <small>This is a fan site and is not affiliated with The Pokémon Company, Game Freak or © Nintendo.</small>
      </p>
    </footer>
  )
}
