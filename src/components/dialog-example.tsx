import { LinkIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import { useRef } from 'react'

export function ShowShareableUrlrigger() {
  const shareableUrl = '#the-url' //usePlaygroundStateAsUrl()
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleOpenDialog = () => {
    if (!dialogRef.current) {
      return
    }
    if (dialogRef.current.open) {
      dialogRef.current.close()
    } else {
      dialogRef.current.showModal()
    }
  }

  return (
    <>
      <dialog className={cn('dialog')} ref={dialogRef}>
        <form method="dialog">
          <button type="submit">Close</button>
        </form>
        <section className="wrap-text">
          <p>Shareable URL:</p>
          <a href={shareableUrl} target="_blank" rel="noreferrer">
            {shareableUrl}
          </a>
        </section>
      </dialog>
      <button type="button" title="Get Shareable URL" onClick={handleOpenDialog}>
        <LinkIcon />
        <span className="sm-hidden">Share</span>
      </button>
    </>
  )
}
