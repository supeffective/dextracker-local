import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './Btn.module.scss'

type BtnProps = {
  variant?: 'default' | 'yellow'
} & ComponentPropsWithoutRef<'button'>

export default function Btn({ className, variant = 'default', children, ...props }: BtnProps) {
  return (
    <button tabIndex={0} type="button" className={cn(styles.btn, styles[`variant-${variant}`], className)} {...props}>
      {children}
    </button>
  )
}
