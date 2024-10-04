import { axiosInstance } from 'app/utils'

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
  
  // Fetch home details
  export const fetchHomeData = async () => {
    const response = await axiosInstance.get('/home?pLevel')
    return response.data
  }
