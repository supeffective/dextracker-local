import { useCallback, useEffect, useState } from 'react'

export enum AsyncStatus {
  Idle = 'idle',
  Pending = 'pending',
  Success = 'success',
  Error = 'error',
}

export type AsyncState<T, E = string> = {
  execute: () => Promise<void>
  status: AsyncStatus
  value: T | undefined
  error: E | undefined
}

export const useAsync = <T, E = string>(asyncFunction: () => Promise<T>, runImmediately = true): AsyncState<T, E> => {
  const [status, setStatus] = useState<AsyncStatus>(AsyncStatus.Idle)
  const [value, setValue] = useState<T | undefined>()
  const [error, setError] = useState<E | undefined>()

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus(AsyncStatus.Pending)
    setValue(undefined)
    setError(undefined)
    return asyncFunction()
      .then((response: T) => {
        setValue(response)
        setStatus(AsyncStatus.Success)
      })
      .catch((error: E) => {
        setError(error)
        setStatus(AsyncStatus.Error)
      })
  }, [asyncFunction])

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (runImmediately) {
      execute()
    }
  }, [execute, runImmediately])

  return { execute, status, value, error }
}
