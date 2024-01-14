import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './ProgressBar.module.scss'

type ProgressBarProps = {
  value: number
  max?: number
  label?: React.ReactNode | true
} & Omit<ComponentPropsWithoutRef<'div'>, 'value' | 'children'>

export default function ProgressBar({ className, value, label, max = 100, ...props }: ProgressBarProps) {
  const percentFloat = (value / max) * 100
  const percent = Math.round(percentFloat * 100) / 100

  const barStyles: React.CSSProperties = { width: `${percent}%` }
  if (percent >= 100) {
    barStyles.border = 'none'
  }
  return (
    <div
      title={`${percent}%`}
      className={cn(styles.progress, className)}
      data-value={value}
      data-value-percent={percent}
      {...props}
    >
      <div className={styles.bar} style={barStyles} />
      {label && <div className={styles.label}>{label === true ? `${percent}%` : label}</div>}
    </div>
  )
}
