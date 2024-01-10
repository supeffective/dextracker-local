import React from 'react'
import Btn from './Btn'

type FileUploadBtnProps = {
  label?: React.ReactNode
  accepts?: string
  variant?: 'default' | 'yellow'
  onUpload?: (fileContents: string) => void
} & React.ComponentPropsWithoutRef<'label'>

function FileUploadBtn({ label, children, variant, accepts = '.json', onUpload, ...props }: FileUploadBtnProps) {
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
      // setSelectedFile(null)
      // if (fileInputRef.current) {
      //   fileInputRef.current.value = ''
      // }
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <label {...props}>
      {label}
      <input ref={fileInputRef} hidden type="file" onChange={handleFileSelectAndUpload} accept={accepts} />
      <Btn type="button" onClick={triggerFileInput} variant={variant}>
        {children}
      </Btn>
    </label>
  )
}

export default FileUploadBtn
