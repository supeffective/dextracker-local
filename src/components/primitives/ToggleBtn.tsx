import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, useState } from 'react'
import styles from './ToggleBtn.module.scss'

type ToggleBtnProps = {
  value?: boolean
  activeChildren?: React.ReactNode
  onToggle?: (active: boolean) => void
} & Omit<ComponentPropsWithoutRef<'button'>, 'type' | 'value' | 'onClick'>

export default function ToggleBtn({
  className,
  value: initialActive,
  children,
  activeChildren,
  ...props
}: ToggleBtnProps) {
  const [active, setActive] = useState(initialActive)

  return (
    <button
      type="button"
      value={active ? '1' : '0'}
      className={cn(styles.btn, { [styles.active]: active }, className)}
      {...props}
      onClick={() => {
        setActive(!active)
        props.onToggle?.(!active)
      }}
    >
      {activeChildren && active ? activeChildren : children}
    </button>
  )
}
