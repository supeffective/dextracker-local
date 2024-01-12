import { StateStorage } from 'zustand/middleware'

type DebouncedLocalStorage = StateStorage & {
  updateTimeout: NodeJS.Timeout | number | undefined
  updateDelay: number
}

/**
 * Updates localStorage with a delay and keeps a history of previous values,
 * to be able use undo/redo functionality.
 */
const createDebouncedStorage = (debounceDelay = 1000): DebouncedLocalStorage => {
  const debouncedStorage: DebouncedLocalStorage = {
    updateTimeout: undefined,
    updateDelay: debounceDelay,
    getItem: (name: string) => {
      const str = localStorage.getItem(name)
      if (!str) {
        return null
      }
      return str
    },
    setItem: (name: string, newValue: string): void => {
      if (debouncedStorage.updateTimeout) {
        clearTimeout(debouncedStorage.updateTimeout)
      }
      debouncedStorage.updateTimeout = setTimeout(() => {
        localStorage.setItem(name, newValue)
      }, debouncedStorage.updateDelay)
    },
    removeItem: (name: string) => localStorage.removeItem(name),
  }

  return debouncedStorage
}

export default createDebouncedStorage
