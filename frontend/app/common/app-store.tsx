import { createImmerStore, createStoreHooks } from 'app/utils/zustand'
import { createPageDataSlice, createCompanySlice } from 'app/common/store-slices'

export type ApplicationStore = ReturnType<typeof createPageDataSlice> &
ReturnType<typeof createCompanySlice>

export const useApplicationStore = createImmerStore<ApplicationStore>(
  [
   createPageDataSlice,
   createCompanySlice
  ],
  'forerunnersAppDataStore',
)

// // Each hook is exported individually to ensure the rule of hooks is applied
export const {
  useHomeData,
  useCompanyDirectoriesData,
  useCompaniesData,
  useFetchHomeData,
  useFetchCompaniesDirectoryData,
  useFetchCompaniesData,  
} = createStoreHooks(useApplicationStore)
