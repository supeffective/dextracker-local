import clsx, { ClassValue } from 'clsx'

export function cn(...args: ClassValue[]): string {
  return clsx(...cnSanitizedArgs(args))
}

function cnSanitizedArgs(...args: ClassValue[]): ClassValue[] {
  const sanitizedArgs: ClassValue[] = []

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (!arg || arg === 'undefined') {
      continue
    }

    if (Array.isArray(arg)) {
      sanitizedArgs.push(cnSanitizedArgs(...arg))
      continue
    }

    if (typeof arg === 'object') {
      sanitizedArgs.push(Object.fromEntries(Object.entries(arg).filter(([key]) => key !== 'undefined')))
      continue
    }

    sanitizedArgs.push(arg)
  }

  return sanitizedArgs.flatMap((arg) => (Array.isArray(arg) ? arg : [arg]))
}

export function base64Encode(str: string): string {
  if (typeof Buffer === 'undefined') {
    return btoa(str)
  }
  return Buffer.from(str).toString('base64')
}

export function base64Decode(str: string): string {
  if (typeof Buffer === 'undefined') {
    return atob(str)
  }
  return Buffer.from(str, 'base64').toString()
}

export function urlSafeBase64Encode(str: string): string {
  return base64Encode(str).replace(/\+/g, '-').replace(/\//g, '_')
}

export function urlSafeBase64Decode(str: string): string {
  return base64Decode(str.replace(/-/g, '+').replace(/_/g, '/'))
}

export function decodeLocationHash(): string | undefined {
  const hash = window.location.hash.slice(1)
  if (!hash) {
    return undefined
  }

  return urlSafeBase64Decode(hash)
}

export function decodeLocationState<T>(): T | Partial<T> {
  const hash = decodeLocationHash()
  const data = JSON.parse(hash ?? '{}')

  return data?.state ?? data ?? {}
}

export function encodeLocationState<T>(state: T): string {
  const data = JSON.stringify(state)

  return urlSafeBase64Encode(data)
}

export function pushEncodedLocationHash(value: string): string {
  const newHash = urlSafeBase64Encode(value)
  history.pushState(undefined, '', `#${newHash}`)
  return newHash
}

export function replaceEncodedLocationHash(value: string): string {
  const newHash = urlSafeBase64Encode(value)
  history.replaceState(undefined, '', `#${newHash}`)

  return newHash
}

export function safelyJoinCss(...args: (string | null | undefined)[]): string {
  return args
    .map((value: string | null | undefined): string | undefined => {
      if (!value) {
        return
      }
      return value.trim().replace(/;$/, '')
    })
    .filter(Boolean)
    .join('; ')
}

export function indentLines(str: string, indent = 2): string {
  const lines = str.split('\n')

  return (
    ' '.repeat(indent) +
    lines
      .map((line) => ' '.repeat(indent) + line.trimStart())
      .join('\n')
      .trim()
  )
}

export function unindentLines(str: string): string {
  const lines = str.split('\n')

  return lines
    .map((line) => line.trimStart())
    .join('\n')
    .trimStart()
}

export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export function isClientSide(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

export function isServerSide(): boolean {
  return !isClientSide()
}
