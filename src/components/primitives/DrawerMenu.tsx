import { MenuIcon } from '@/lib/icons/actions'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, useState } from 'react'
import styles from './DrawerMenu.module.scss'

type DrawerMenuProps = {
  icon?: React.ReactNode
  placement?: 'left' | 'right'
} & ComponentPropsWithoutRef<'div'>

export default function DrawerMenu({ className, children, icon, placement, ...props }: DrawerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

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
