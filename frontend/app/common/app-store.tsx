import { createImmerStore, createStoreHooks } from 'app/utils/zustand'
import { createPageDataSlice } from 'app/common/store-slices'

export type ApplicationStore = ReturnType<typeof createPageDataSlice> // Build a list of all the "slices"

export const useApplicationStore = createImmerStore<ApplicationStore>(
  [createPageDataSlice],
  'applicationStore'
)

// // Each hook is exported individually to ensure the rule of hooks is applied
export const {
  useFetchHomeData,
  useHomeData,  
} = createStoreHooks(useApplicationStore)
