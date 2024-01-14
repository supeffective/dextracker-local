import config from '@/config'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './AppVersionItem.module.scss'

export default function AppVersionItem({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn(styles.appVersion, className)} {...props}>
      <b>{config.title}</b>
      <span>v{config.version}</span>
      {children}
    </div>
  )
}
