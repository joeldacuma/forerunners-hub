import { type StateCreator } from 'zustand'
import { HomeAPIResponse, CompanyDirectoriesResponse } from 'app/common/models'
import { fetchHome, fetchCompanyDirectory } from '~/api/strapi'

interface Props {
  homeData: HomeAPIResponse | null
  companyDirectoriesData: CompanyDirectoriesResponse | null
  error: string | null
  isLoading: boolean
  fetchHomeData: () => Promise<void>
  fetchCompaniesDirectoryData: () => Promise<void>
}

export const createPageDataSlice: StateCreator<Props> = (set) => ({
  homeData: null,
  companyDirectoriesData: null,
  companiesData: null,
  error: null,
  isLoading: false,
  fetchHomeData: async () => {
    set({ isLoading: true })
    try {
      const response = await fetchHome()
      set({ homeData: response, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch home data', isLoading: false })
    }
  },
  fetchCompaniesDirectoryData: async () => {
    set({ isLoading: true })
    try {
      const response = await fetchCompanyDirectory()
      set({ companyDirectoriesData: response, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch company directories data', isLoading: false })
    }
  },
})
