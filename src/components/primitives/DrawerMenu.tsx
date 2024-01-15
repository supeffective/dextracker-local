import { MenuIcon } from '@/lib/icons/actions'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, useState } from 'react'
import styles from './DrawerMenu.module.scss'

export type DrawerMenuProps = {
  icon?: React.ReactNode
  placement?: 'left' | 'right'
  buttonName?: string
  buttonTitle?: string
  defaultOpen?: boolean
} & ComponentPropsWithoutRef<'div'>

export default function DrawerMenu({
  className,
  children,
  buttonName,
  buttonTitle,
  icon,
  placement,
  defaultOpen = false,
  ...props
}: DrawerMenuProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen === true)

  return (
    <div
      className={cn(
        styles.outer,
        { [styles.placeLeft]: placement === 'left', [styles.placeRight]: placement === 'right', [styles.open]: isOpen },
        className,
      )}
      {...props}
    >
      <button
        className={styles.trigger}
        type="button"
        name={buttonName}
        title={buttonTitle}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        {icon ?? <MenuIcon />}
      </button>
      <div className={styles.inner}>{children}</div>
    </div>
  )
}
