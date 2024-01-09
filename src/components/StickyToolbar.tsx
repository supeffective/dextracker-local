import { ShinyIcon } from '@/lib/icons'
import { SettingsIcon } from '@/lib/icons/actions'
import { cn } from '@/lib/utils'
import useDexTrackerStore, { useCurrentGameAndDex } from '@/stores/useDexTrackerStore'
import { ComponentPropsWithoutRef } from 'react'
import GameIndicator from './GameIndicator'
import GameSelectField from './GameSelectField'
import PillDrawerMenu from './PillDrawerMenu'
import PokedexSelectField from './PokedexSelectField'
import styles from './StickyToolbar.module.scss'
import ToggleBtn from './primitives/ToggleBtn'

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
        <GameSelectField
          className={styles.labelledSelect}
          label="Game: "
          value={state.currentGameId}
          onChange={(e) => {
            state.setCurrentGame(e.target.value)
          }}
        />
        <PokedexSelectField
          className={styles.labelledSelect}
          label="Dex: "
          gameId={state.currentGameId}
          value={state.currentDexId}
          onChange={(e) => {
            state.setCurrentDex(e.target.value)
          }}
        />
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
      <PillDrawerMenu placement="right" icon={settingsIcon}>
        <label className={styles.flexLabel}>
          <span>Shiny sprites</span>
          <ToggleBtn
            className={cn(styles.toggle, { [styles.toggleActive]: state.filter?.shinyMode })}
            value={state.filter?.shinyMode}
            onToggle={(active) => {
              state.setShinyMode(active)
            }}
          >
            <ShinyIcon />
          </ToggleBtn>
        </label>
      </PillDrawerMenu>
    </div>
  )
}
