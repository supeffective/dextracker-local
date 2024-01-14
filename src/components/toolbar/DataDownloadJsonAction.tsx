import { FileDownloadIcon } from '@/lib/icons/actions'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import FlexLabel from '../primitives/FlexLabel'
import { DownloadTextButton } from '../primitives/text-download'

export default function DataDownloadJsonAction({ className }: { className?: string }) {
  const store = useDexTrackerStore((store) => store)
  const jsonState = JSON.stringify(store, null, 2)

  return (
    <FlexLabel className={className} label={<span>Download data</span>}>
      <DownloadTextButton
        filename="superpokedextracker-data.json"
        content={jsonState}
        name="download-data"
        title="Download data"
        contentType="application/json"
        variant="yellow"
      >
        <FileDownloadIcon data-nofill />
      </DownloadTextButton>
    </FlexLabel>
  )
}
