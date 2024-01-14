import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './TitledSection.module.scss'

type TitledSectionProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  title?: React.ReactNode
} & Omit<ComponentPropsWithoutRef<'section'>, 'title'>

export default function TitledSection({ className, title, level = 2, children, ...props }: TitledSectionProps) {
  const Title: React.ElementType = `h${level ?? 2}`

  return (
    <section className={cn(styles.panel, className)} {...props}>
      {title && <Title className={styles.title}>{title}</Title>}
      {children}
    </section>
  )
}
