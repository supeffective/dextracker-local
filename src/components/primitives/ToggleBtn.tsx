import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import Btn from './Btn'
import styles from './ToggleBtn.module.scss'

type ToggleBtnProps = {
  value?: boolean
  inverted?: boolean
  onToggle?: (active: boolean) => void
  children: React.ReactElement | [React.ReactElement, React.ReactElement]
} & Omit<ComponentPropsWithoutRef<'button'>, 'type' | 'value' | 'onClick' | 'children'>

export default function ToggleBtn({ className, value, inverted, children, ...props }: ToggleBtnProps) {
  // const [active, setActive] = useState(initialActive)

  const stylesValue = inverted ? !value : value

  return (
    <Btn
      variant="yellow"
      type="button"
      value={value ? '1' : '0'}
      className={cn(styles.btn, { [styles.active]: stylesValue }, className)}
      {...props}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.onToggle?.(!value)
        e.stopPropagation()
      }}
    >
      {children}
    </Btn>
  )
}
