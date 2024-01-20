import { PawPrintIcon } from '@/lib/icons/sections'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import FlexLabel from '../../primitives/FlexLabel'
import ToggleBtn from '../../primitives/ToggleBtn'

export default function TrackFormsAction({ className }: { className?: string }) {
  const [value, setValue] = useDexTrackerStore((store) => [store.options?.hideForms, store.setHideForms])

  return (
    <>
      <FlexLabel className={className} label={<span>Track forms</span>}>
        <ToggleBtn
          name="toggle-forms"
          title="Toggle Forms"
          value={value}
          inverted
          onToggle={(active) => {
            setValue(active)
          }}
        >
          <PawPrintIcon
            style={{
              // opacity: value ? 0.8 : 1,
              transform: value ? 'rotate(-25deg) scale(1.1)' : 'rotate(0deg)',
            }}
          />
        </ToggleBtn>
      </FlexLabel>
    </>
  )
}
