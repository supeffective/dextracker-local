import { StateCreator, create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import createDebouncedStorage from './createDebouncedStorage'

const STORAGE_DEBOUNCE_DELAY = 1000

export default function createPersistentStore<T>(
  name: string,
  version: number,
  creator: StateCreator<T, [['zustand/devtools', never], ['zustand/persist', unknown]], []>,
) {
  return create<T, [['zustand/devtools', T], ['zustand/persist', T]]>(
    devtools(
      persist(creator, {
        name,
        version: version,
        storage: createJSONStorage(() => createDebouncedStorage(STORAGE_DEBOUNCE_DELAY)),
        migrate: (persistedState, persistedVersion: number) => {
          if (persistedVersion !== version) {
            // for now, just wipe the state if versions mismatch
            console.log(`[createPersistentStore] versions mismatch, wiping state of ${name}`)
            return undefined as T
          }
          return persistedState as T
        },
      }),
      {
        name,
        enabled: process.env.NODE_ENV === 'development',
      },
    ),
  )
}
