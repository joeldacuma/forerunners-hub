import { axiosInstance } from 'app/utils'
import {
  HomeAPIResponse,
  CompanyDirectoriesResponse,
  CompaniesAPIResponse,
  CompanyWithoutDocumentId,
  Company,
} from 'app/common/models'

// Fetch companies with pagination
export const fetchCompanies = async (page = 1, pageSize = 5) => {
  const response = await axiosInstance.get<CompaniesAPIResponse>(
    `/companies?pagination[page]=${page}&pagination[pageSize]=${pageSize}&pLevel`
  )
  return response.data
}

export const fetchCompanyDirectory = async () => {
  const response = await axiosInstance.get<CompanyDirectoriesResponse>(
    '/company-directory?pLevel'
  )
  return response.data
}

export const fetchHome = async () => {
  const response = await axiosInstance.get<HomeAPIResponse>('/home?pLevel')
  return response.data
}

export const fetchCompanybyName = async (name: string) => {
  const response = await axiosInstance.get<CompaniesAPIResponse>(
    `/companies?filters[name][$contains]=${name}`
  )
  return response.data
}
