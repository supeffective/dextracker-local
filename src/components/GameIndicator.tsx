import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import GameImg from './GameImg'
import styles from './GameIndicator.module.scss'

type GameIndicatorProps = {
  gameId: string
  children?: string
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export default function GameIndicator({ className, gameId, children, ...props }: GameIndicatorProps) {
  return (
    <div className={cn(styles.outer, className)} {...props}>
      <GameImg className={cn('avatar-raised')} width={48} height={48} gameId={gameId} />
      {children && <div className={styles.indicator}>{children}</div>}
    </div>
  )
}
