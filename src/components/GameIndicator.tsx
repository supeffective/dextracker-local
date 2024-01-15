import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import GameImg from './GameImg'
import styles from './GameIndicator.module.scss'

type GameIndicatorProps = {
  gameId: string
  children?: string
  size?: number
} & Omit<ComponentPropsWithoutRef<'img'>, 'children'>

export default function GameIndicator({ className, gameId, children, size = 48, ...props }: GameIndicatorProps) {
  return (
    <div className={cn(styles.outer, className)} {...props}>
      <GameImg className={cn('avatar-raised')} width={size} height={size} gameId={gameId} />
      {children && <div className={styles.indicator}>{children}</div>}
    </div>
  )
}
