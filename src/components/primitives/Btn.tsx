import { RouterLink } from '@/lib/router'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, ComponentType, ElementType } from 'react'
import styles from './Btn.module.scss'

type BtnProps<T extends ElementType> = {
  variant?: 'default' | 'yellow'
  as?: ElementType
} & ComponentPropsWithoutRef<T>

export default function Btn<T extends ElementType>({
  className,
  variant = 'default',
  as: Component = 'button',
  children,
  ...props
}: BtnProps<T>) {
  if (Component === 'a') {
    const CAnchor = Component as 'a'
    return (
      <CAnchor tabIndex={0} className={cn(styles.btn, styles[`variant-${variant}`], className)} {...props}>
        {children}
      </CAnchor>
    )
  }

  if (Component === 'button') {
    const CButton = Component as 'button'
    return (
      <CButton
        tabIndex={0}
        type="button"
        className={cn(styles.btn, styles[`variant-${variant}`], className)}
        {...props}
      >
        {children}
      </CButton>
    )
  }

  const COther = Component as ComponentType<typeof RouterLink>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const otherProps = props as any

  return (
    <COther className={cn(styles.btn, styles[`variant-${variant}`], className)} {...otherProps}>
      {children}
    </COther>
  )
}
