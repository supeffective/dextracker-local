import clsx, { ClassValue } from 'clsx'

export function isClientSide(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

export function isServerSide(): boolean {
  return !isClientSide()
}

export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

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
