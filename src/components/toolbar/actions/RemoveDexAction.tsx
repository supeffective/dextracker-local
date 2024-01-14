import Btn from '@/components/primitives/Btn'
import { Trash2Icon } from '@/lib/icons'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import FlexLabel from '../../primitives/FlexLabel'

export default function RemoveDexAction({ className }: { className?: string }) {
  const [dexes, dexId, removeDex] = useDexTrackerStore((store) => [
    store.dexes,
    store.currentFullDexId,
    store.removeDex,
  ])

  // Current dex not loaded or has no data
  if (!dexId || !dexes[dexId]) {
    return null
  }

  const handleRemoveDex = () => {
    if (confirm('Are you sure you want to clear all data for this Pokedex?')) {
      removeDex(dexId)
    }
  }

  return (
    <FlexLabel className={className} label={<span>Remove dex</span>}>
      <Btn type="button" name="remove-dex" variant="yellow" onClick={handleRemoveDex}>
        <Trash2Icon data-nofill />
      </Btn>
    </FlexLabel>
  )
}
