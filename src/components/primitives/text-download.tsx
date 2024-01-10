import { ComponentPropsWithoutRef } from 'react'
import Btn from './Btn'

export function triggerTextDownload(content: string, filename: string, contentType = 'text/plain') {
  const element = document.createElement('a')
  element.setAttribute('href', `data:${contentType};charset=utf-8,${encodeURIComponent(content)}`)
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

type DownloadTextLinkProps = {
  content: string
  contentType?: string
  filename: string
} & JSX.IntrinsicElements['a']

export function DownloadTextLink({
  content,
  filename,
  children,
  contentType = 'text/plain',
  ...props
}: DownloadTextLinkProps) {
  return (
    <a href={`data:${contentType};charset=utf-8,${encodeURIComponent(content)}`} download={filename} {...props}>
      {children}
    </a>
  )
}

type DownloadTextButtonProps = {
  content: string
  contentType?: string
  filename: string
} & ComponentPropsWithoutRef<typeof Btn>

export function DownloadTextButton({
  content,
  filename,
  children,
  contentType = 'text/plain',
  ...props
}: DownloadTextButtonProps) {
  return (
    <Btn onClick={() => triggerTextDownload(content, filename, contentType)} {...props}>
      {children}
    </Btn>
  )
}
