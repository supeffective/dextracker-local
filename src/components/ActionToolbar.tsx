import { PokeballOutlineIcon } from '@/lib/icons'
import SvgSparklesIcon from '@/lib/icons/sections/SparklesIcon'
import { cn } from '@/lib/utils'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import styles from './ActionToolbar.module.scss'
import GameImg from './GameImg'
import GameSelectField from './GameSelectField'
import PokedexSelectField from './PokedexSelectField'
import ToggleBtn from './primitives/ToggleBtn'

export default function ActionToolbar() {
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

  return (
    <div className={styles.toolbar}>
      {state.currentGameId && (
        <GameImg className={cn(styles.item, styles.cover)} width={60} height={60} gameId={state.currentGameId} />
      )}
      <GameSelectField
        className={styles.item}
        label="Game: "
        value={state.currentGameId}
        onChange={(e) => {
          state.setCurrentGame(e.target.value)
        }}
      />
      <PokedexSelectField
        className={styles.item}
        label="Dex: "
        gameId={state.currentGameId}
        value={state.currentDexId}
        onChange={(e) => {
          state.setCurrentDex(e.target.value)
        }}
      />
      <div className={styles.item}>
        <ToggleBtn
          value={state.filter?.shinyMode}
          onToggle={(active) => {
            state.setShinyMode(active)
          }}
        >
          <SvgSparklesIcon />
        </ToggleBtn>
      </div>
      <div className={styles.item}>
        <ToggleBtn
          value={state.filter?.onlyMissing}
          onToggle={(active) => {
            state.setOnlyMissing(active)
          }}
        >
          <PokeballOutlineIcon />
        </ToggleBtn>
      </div>
      <div className={styles.item}>
        <input
          type="search"
          placeholder="Search..."
          defaultValue={state.filter?.searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  )
}
