import { type StateCreator } from 'zustand'
import { HomeAPIResponse } from 'app/common/models'
import { fetchHomeData } from 'app/utils/api'

interface Props {
  homeData: HomeAPIResponse | null
  error: string | null
  isLoading: boolean
  fetchHomeData: () => Promise<void>
}

export const createPageDataSlice: StateCreator<Props> = (set) => ({
  homeData: null,
  error: null,
  isLoading: false,
  fetchHomeData: async () => {
    set({ isLoading: true })
    try {
      const response = await fetchHomeData()
      set({ homeData: response, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch home data', isLoading: false })
    }
  } 
})
