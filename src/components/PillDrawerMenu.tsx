import { MenuIcon } from '@/lib/icons/actions'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, useState } from 'react'
import styles from './PillDrawerMenu.module.scss'

type PillDrawerMenuProps = {
  icon?: React.ReactNode
  placement?: 'left' | 'right'
} & ComponentPropsWithoutRef<'div'>

export default function PillDrawerMenu({ className, children, icon, placement, ...props }: PillDrawerMenuProps) {
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
