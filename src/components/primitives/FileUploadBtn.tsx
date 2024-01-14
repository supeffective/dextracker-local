import React from 'react'
import Btn from './Btn'
import FlexLabel from './FlexLabel'

type FileUploadBtnProps = {
  label?: React.ReactNode
  accepts?: string
  variant?: 'default' | 'yellow'
  name?: string
  onUpload?: (fileContents: string) => void
} & React.ComponentPropsWithoutRef<'label'>

function FileUploadBtn({
  label,
  children,
  variant,
  name = 'upload-data',
  accepts = '.json',
  onUpload,
  title,
  ...props
}: FileUploadBtnProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileSelectAndUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      const reader = new FileReader()
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          onUpload?.(event.target.result as string)
        }
      }
      reader.readAsText(file)
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <FlexLabel {...props} label={label}>
      <input ref={fileInputRef} hidden type="file" onChange={handleFileSelectAndUpload} accept={accepts} />
      <Btn title={title} type="button" name={name} onClick={triggerFileInput} variant={variant}>
        {children}
      </Btn>
    </FlexLabel>
  )
}

export default FileUploadBtn
