import { UploadIcon } from '@/lib/icons/actions'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import FileUploadBtn from '../primitives/FileUploadBtn'

export default function DataUploadJsonAction({ className }: { className?: string }) {
  const loadDataFromJSON = useDexTrackerStore((store) => store.loadFromJSON)

  const handleJsonUpload = (data: string) => {
    try {
      loadDataFromJSON(data)
    } catch (error) {
      alert(`${error}`)
    }
    alert('Data imported successfully.')
    window.location.reload()
  }
  return (
    <FileUploadBtn
      title="Upload data"
      className={className}
      variant="yellow"
      label={<span>Upload data</span>}
      accepts=".json"
      name="upload-data"
      onUpload={handleJsonUpload}
    >
      <UploadIcon data-nofill />
    </FileUploadBtn>
  )
}
