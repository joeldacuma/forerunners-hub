import { axiosInstance } from 'app/utils'
import { HomeAPIResponse } from 'app/common/models'

// Fetch companies with pagination
export const fetchCompanies = async (page = 1, pageSize = 10) => {
    const response = await axiosInstance.get(
      `/companies?pagination[page]=${page}&pagination[pageSize]=${pageSize}&pLevel`
    )
    return response.data
  }
  
  // Fetch company directory details
  export const fetchCompanyDirectory = async () => {
    const response = await axiosInstance.get('/company-directory?pLevel')
    return response.data
  }
  
  export const fetchHomeData = async () => {
    const response = await axiosInstance.get<HomeAPIResponse>('/home?pLevel')
    return response.data
  }
