import { StateCreator, create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import createDebouncedStorage from './createDebouncedStorage'

const STORAGE_DEBOUNCE_DELAY = 1000
const STORE_ID = 'pokedex-tracker-store'

export default function createPersistentStore<T>(
  creator: StateCreator<T, [['zustand/devtools', never], ['zustand/persist', unknown]], []>,
  name = STORE_ID,
) {
  return create<T, [['zustand/devtools', T], ['zustand/persist', T]]>(
    devtools(
      persist(creator, {
        name,
        storage: createJSONStorage(() => createDebouncedStorage(STORAGE_DEBOUNCE_DELAY)),
      }),
      {
        name,
        enabled: process.env.NODE_ENV === 'development',
      },
    ),
  )
}
