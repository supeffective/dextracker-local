import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './AppFooter.module.scss'

type AppFooterProps = {} & ComponentPropsWithoutRef<'div'>

export default function AppFooter({ className, ...props }: AppFooterProps) {
  return (
    <footer data-noselect className={cn(styles.footer, className)} {...props}>
      &copy; 2024 Javier Aguilar, supereffective.gg
    </footer>
  )
}
