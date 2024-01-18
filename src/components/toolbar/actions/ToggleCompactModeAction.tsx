import FlexLabel from '@/components/primitives/FlexLabel'
import ToggleBtn from '@/components/primitives/ToggleBtn'
import { Grid2X2Icon, Grid3X3Icon } from '@/lib/icons'
import useDexTrackerStore from '@/stores/useDexTrackerStore'

export default function ToggleCompactModeAction({ className }: { className?: string }) {
  const [value, setValue] = useDexTrackerStore((store) => [store.filters?.compactMode === true, store.setCompactMode])
  const isCompact = value === true
  const compactIcon = <Grid3X3Icon data-nofill />
  const normalIcon = <Grid2X2Icon data-nofill />

  return (
    <>
      <FlexLabel className={className} label={<span>Toggle Grid Size</span>}>
        <ToggleBtn
          name="compact-mode"
          title={'Toggle Compact mode'}
          value={value}
          inverted
          onToggle={(active) => {
            console.log('ToggleCompactModeAction', { value, active })
            setValue(active)
          }}
        >
          {isCompact ? compactIcon : normalIcon}
        </ToggleBtn>
      </FlexLabel>
    </>
  )
}
