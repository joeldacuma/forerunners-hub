import { type StateCreator } from 'zustand'
import { CompaniesAPIResponse } from 'app/common/models'
import { fetchCompanies, fetchCompanybyName } from '~/api/strapi'
import { useApplicationStore as store } from 'app/common/app-store'

interface Props {
  companiesData: CompaniesAPIResponse | null
  fetchCompaniesData: (page?: number, pageSize?: number) => Promise<void>
  error: string | null
  isLoading: boolean
}

export const createCompanySlice: StateCreator<Props> = (set) => ({
  searchCompanyText: null,
  companiesData: null,
  error: null,
  isLoading: false,
  fetchCompaniesData: async (page = 1, pageSize = 5) => {
    set({ isLoading: true })
    try {
      const response = await fetchCompanies(page, pageSize)
      set({ companiesData: response, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch companies data', isLoading: false })
    }
  },
})

export const onSearchCompanyByName = async (
  companyName: string,
  page: number
) => {
  const response = companyName
    ? await fetchCompanybyName(companyName, page, 5)
    : await fetchCompanies(1, 5)
  store.setState({
    companiesData: response,
  })
}
