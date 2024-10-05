import _ from 'lodash'
import { create, type StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const assignWith = _.assignWith
const set = _.set
const upperFirst = _.upperFirst

export function createImmerStore<S>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slices: StateCreator<S> | Array<StateCreator<any>>,
) {
  const slicesArray = Array.isArray(slices) ? slices : [slices]

  return create<S>()(
    immer((...init) =>
      assignWith(
        {},
        ...slicesArray.map((slice) =>
          (slice as unknown as StateCreator<unknown>)(...init),
        ),
      ),
    ),
  )
}

export type StoreHooks<S> = {
  [K in keyof S as K extends string ? `use${Capitalize<K>}` : never]: () => S[K]
}

/**
 * Takes an ImmerStore and create react hooks for the store properties.
 *
 * @example
 * ```
 * const data = createImmerStore(() => ({ a: [], b: 'hello world' }))
 * const hooks = createStoreHooks(data)
 *
 * console.log(hooks.useB())
 * // Prints 'hello world'
 * ```
 */
export function createStoreHooks<S extends {}>(
  _store: ReturnType<typeof createImmerStore<S>>,
) {
  const hooks = {} as StoreHooks<S>
  for (const k of Object.keys(_store.getState()) as Array<
    keyof ReturnType<typeof _store.getState>
  >) {
    set(hooks, `use${upperFirst(k.toString())}`, () => _store((s) => s[k]))
  }

  return hooks
}

export function createStoreWithHooks<S extends {}>(
  slices: Parameters<typeof createImmerStore>[0],
): [
  ReturnType<typeof createImmerStore<S>>,
  ReturnType<typeof createStoreHooks<S>>,
] {
  const slicesArray = Array.isArray(slices) ? slices : [slices]

  const store = createImmerStore<S>(slicesArray)
  const hooks = createStoreHooks<S>(store)

  return [store, hooks]
}
