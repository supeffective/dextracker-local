import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './FlexLabel.module.scss'

type FlexLabelProps = {
  label?: React.ReactNode
} & ComponentPropsWithoutRef<'label'>

export default function FlexLabel({ className, label, children, ...props }: FlexLabelProps) {
  return (
    <label className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.label}>{label}</div>
      {children}
    </label>
  )
}
