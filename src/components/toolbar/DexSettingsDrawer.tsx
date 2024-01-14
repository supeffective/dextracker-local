import { PokeballIcon, ShinyIcon } from '@/lib/icons/gamegui'
import { cn } from '@/lib/utils'
import { DexTrackerFilterState } from '@/stores/types/state'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import { DrawerMenuProps } from '../primitives/DrawerMenu'
import FlexLabel from '../primitives/FlexLabel'
import ToggleBtn from '../primitives/ToggleBtn'
import styles from './DexSettingsDrawer.module.scss'
import SettingsDrawer from './SettingsDrawer'
import TrackFormsAction from './TrackFormsAction'

export default function DexSettingsDrawer({ children, ...props }: DrawerMenuProps) {
  const store = useDexTrackerStore((store) => store)
  const filters: DexTrackerFilterState = store.filters ?? {}

  return (
    <SettingsDrawer {...props}>
      <FlexLabel label={<span>Toggle Caught</span>}>
        <ToggleBtn
          name="toggle-caught"
          title="Toggle Caught"
          className={cn(styles.toggle, { [styles.disabledBall]: filters.hideCaught })}
          value={filters.hideCaught}
          inverted
          onToggle={(active) => {
            store.setHideCaught(active)
          }}
        >
          <PokeballIcon
            style={{
              // opacity: filters.hideCaught ? 0.75 : 1,
              transform: filters.hideCaught ? 'none' : 'rotate(25deg)',
            }}
          />
        </ToggleBtn>
      </FlexLabel>

      <TrackFormsAction />

      <hr />
      <FlexLabel label={<span>Shiny sprites</span>}>
        <ToggleBtn
          name="toggle-shiny"
          title="Toggle Shiny"
          className={cn(styles.toggle)}
          value={filters.shinyMode}
          onToggle={(active) => {
            store.setShinyMode(active)
          }}
        >
          <ShinyIcon
            style={{
              // opacity: filters.shinyMode ? 1 : 0.6,
              transform: filters.shinyMode ? 'scale(0.9)' : 'none',
            }}
          />
        </ToggleBtn>
      </FlexLabel>
      {children}
    </SettingsDrawer>
  )
}
