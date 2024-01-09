import { cn } from '@/lib/utils'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import styles from './ActionToolbar.module.scss'
import GameImg from './GameImg'
import GameSelectField from './GameSelectField'
import PokedexSelectField from './PokedexSelectField'
import ToggleBtn from './primitives/ToggleBtn'

export default function ActionToolbar() {
  const state = useDexTrackerStore((state) => state)

  return (
    <div className={styles.toolbar} data-noselect>
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
      <ToggleBtn
        value={state.shinyMode}
        onToggle={(active) => {
          state.setShinyMode(active)
        }}
      >
        Shiny
      </ToggleBtn>
    </div>
  )
}
