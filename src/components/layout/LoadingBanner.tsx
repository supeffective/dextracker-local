import { PokeballIcon } from '@/lib/icons/gamegui'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './LoadingBanner.module.scss'

type LoadingBannerProps = {} & ComponentPropsWithoutRef<'div'>

function LoadingBanner({ children, className, ...rest }: LoadingBannerProps) {
  return (
    <div className={cn(styles.loading, className)} {...rest}>
      <PokeballIcon className={styles.spinning} />
      {children}
    </div>
  )
}

export default LoadingBanner
