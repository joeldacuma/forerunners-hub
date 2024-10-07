import _ from 'lodash'
import { create, type StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

const assignWith = _.assignWith
const set = _.set
const upperFirst = _.upperFirst

export function createImmerStore<S>(
  slices: StateCreator<S> | Array<StateCreator<any>>,
  storeKey: string
) {
  const slicesArray = Array.isArray(slices) ? slices : [slices]

  // Create a store with persistence
  return create<S>()(
    persist(
      immer((...init) =>
        assignWith(
          {},
          ...slicesArray.map((slice) =>
            (slice as unknown as StateCreator<unknown>)(...init)
          )
        )
      ),
      {
        name: storeKey, // Unique key for the store in localStorage
        partialize: (state: any) => _.omit(state, ['isLoading', 'error']), // Optionally exclude some parts of the state from persisting
      }
    )
  )
}

export type StoreHooks<S> = {
  [K in keyof S as K extends string ? `use${Capitalize<K>}` : never]: () => S[K]
}

/**
 * Create React hooks for accessing the store's properties.
 */
export function createStoreHooks<S extends {}>(
  _store: ReturnType<typeof createImmerStore<S>>
) {
  const hooks = {} as StoreHooks<S>
  for (const k of Object.keys(_store.getState()) as Array<
    keyof ReturnType<typeof _store.getState>
  >) {
    set(hooks, `use${upperFirst(k.toString())}`, () => _store((s) => s[k]))
  }

  return hooks
}

/**
 * Create a Zustand store with Immer, persistence, and React hooks.
 */
export function createStoreWithHooks<S extends {}>(
  slices: Parameters<typeof createImmerStore>[0],
  storeKey: string // Key for localStorage or sessionStorage
): [
  ReturnType<typeof createImmerStore<S>>,
  ReturnType<typeof createStoreHooks<S>>,
] {
  const slicesArray = Array.isArray(slices) ? slices : [slices]

  // Create the store with persistence
  const store = createImmerStore<S>(slicesArray, storeKey)
  const hooks = createStoreHooks<S>(store)

  return [store, hooks]
}
