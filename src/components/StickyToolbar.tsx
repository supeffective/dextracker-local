import { SettingsIcon } from '@/lib/icons/actions'
import { cn } from '@/lib/utils'
import useDexTrackerStore, { useCurrentGameAndDex } from '@/stores/useDexTrackerStore'
import { ComponentPropsWithoutRef } from 'react'
import GameIndicator from './GameIndicator'
import PillDrawerMenu from './PillDrawerMenu'
import styles from './StickyToolbar.module.scss'

type StickyToolbarProps = {} & ComponentPropsWithoutRef<'div'>

export default function StickyToolbar({ className, ...props }: StickyToolbarProps) {
  const { currentGame } = useCurrentGameAndDex()
  const state = useDexTrackerStore((state) => state)

  let debounceSearchTimeout: NodeJS.Timeout | null = null
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceSearchTimeout) {
      clearTimeout(debounceSearchTimeout)
    }
    debounceSearchTimeout = setTimeout(() => {
      state.setSearchQuery(e.target.value)
    }, 300)
  }

  const gameIcon = <GameIndicator className={cn('avatar-raised')} gameId={currentGame.id} />
  const settingsIcon = <SettingsIcon />

  return (
    <div className={cn(styles.toolbar, className)} {...props}>
      <PillDrawerMenu placement="left" icon={gameIcon}>
        Text
      </PillDrawerMenu>
      <div className={styles.inner}>
        <div className={styles.searchBox}>
          <input
            // biome-ignore lint/a11y/noAutofocus: <explanation>
            autoFocus
            type="search"
            placeholder="Search Pokémon..."
            defaultValue={state.filter?.searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <PillDrawerMenu placement="right" icon={settingsIcon} />
    </div>
  )
}
