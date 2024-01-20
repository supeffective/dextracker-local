import { PokeballIcon, ShinyIcon } from '@/lib/icons/gamegui'
import { cn } from '@/lib/utils'
import { DexTrackerOptionsState } from '@/stores/types/state'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import { DrawerMenuProps } from '../primitives/DrawerMenu'
import FlexLabel from '../primitives/FlexLabel'
import ToggleBtn from '../primitives/ToggleBtn'
import styles from './DexSettingsDrawer.module.scss'
import SettingsDrawer from './SettingsDrawer'
import RemoveDexAction from './actions/RemoveDexAction'
import ToggleCompactModeAction from './actions/ToggleCompactModeAction'
import TrackFormsAction from './actions/TrackFormsAction'

export default function DexSettingsDrawer({ children, ...props }: DrawerMenuProps) {
  const store = useDexTrackerStore((store) => store)
  const dexOptions: DexTrackerOptionsState = store.options ?? {}

  if (!store.currentFullDexId) {
    return null
  }

  return (
    <SettingsDrawer {...props}>
      <ToggleCompactModeAction />
      <FlexLabel label={<span>Show Caught</span>}>
        <ToggleBtn
          name="toggle-caught"
          title="Toggle Caught"
          className={cn(styles.toggle, { [styles.disabledBall]: dexOptions.hideCaught })}
          value={dexOptions.hideCaught}
          inverted
          onToggle={(active) => {
            store.setHideCaught(active)
          }}
        >
          <PokeballIcon
            style={{
              // opacity: filters.hideCaught ? 0.75 : 1,
              transform: dexOptions.hideCaught ? 'none' : 'rotate(25deg)',
            }}
          />
        </ToggleBtn>
      </FlexLabel>

      <hr />
      <TrackFormsAction />

      <FlexLabel label={<span>Track shinies</span>}>
        <ToggleBtn
          name="toggle-shiny"
          title="Toggle Shiny"
          className={cn(styles.toggle)}
          value={dexOptions.trackShinies}
          onToggle={(active) => {
            store.setTrackShinies(active)
          }}
        >
          <ShinyIcon
            style={{
              // opacity: filters.shinyMode ? 1 : 0.6,
              transform: dexOptions.trackShinies ? 'scale(0.9)' : 'none',
            }}
          />
        </ToggleBtn>
      </FlexLabel>
      <hr />
      <RemoveDexAction />
      {children}
    </SettingsDrawer>
  )
}
