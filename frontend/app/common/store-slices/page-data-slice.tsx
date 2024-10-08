import { type StateCreator } from 'zustand'
import { HomeAPIResponse, CompanyDirectoriesResponse, CompaniesAPIResponse } from 'app/common/models'
import { fetchHome, fetchCompanyDirectory, fetchCompanies } from '~/api/strapi'

interface Props {
  homeData: HomeAPIResponse | null
  companyDirectoriesData: CompanyDirectoriesResponse | null
  companiesData: CompaniesAPIResponse |  null
  error: string | null
  isLoading: boolean
  fetchHomeData: () => Promise<void>
  fetchCompaniesDirectoryData: () => Promise<void>
  fetchCompaniesData: (page?: number, pageSize?: number) => Promise<void>
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
  fetchCompaniesData: async (page = 1, pageSize = 10) => {
    set({ isLoading: true })
    try {
      const response = await fetchCompanies(page, pageSize)
      set({ companiesData: response, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch companies data', isLoading: false })
    }
  }, 
})
