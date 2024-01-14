import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './DebouncedSearchBox.module.scss'

export type DebouncedSearchBoxProps = {
  onDebouncedChange?: (searchQuery: string) => void
  debounceDelay?: number
} & Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'onChange'>

export default function DebouncedSearchBox({
  className,
  onDebouncedChange,
  debounceDelay = 300,
  ...props
}: DebouncedSearchBoxProps) {
  let debounceSearchTimeout: NodeJS.Timeout | null = null
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceSearchTimeout) {
      clearTimeout(debounceSearchTimeout)
    }
    debounceSearchTimeout = setTimeout(() => {
      onDebouncedChange?.(e.target.value)
    }, debounceDelay)
  }

  return (
    <div className={cn(styles.searchBoxWrapper, className)}>
      <div className={styles.searchBox}>
        <input type="search" onChange={handleSearchChange} {...props} />
      </div>
    </div>
  )
}
