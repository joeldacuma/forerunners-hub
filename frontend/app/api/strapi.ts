import { axiosInstance } from 'app/utils'
import {
  HomeAPIResponse,
  CompanyDirectoriesResponse,
  CompaniesAPIResponse,
  AuthResponse,
} from 'app/common/models'

export const loginAuthUser = async (email: string, password: string) => {
  const response = await axiosInstance.post<AuthResponse>('/auth/local', {
   identifier: email,
   password,
  })
  return response.data
}

export const fetchUserInfo = async (jwt: string) => {
  const response = await axiosInstance.get('/users/me?pLevel', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  return response.data
}

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

export const fetchCompanybyName = async (name: string, page: number = 1, pageSize: number = 5) => {
  const response = await axiosInstance.get<CompaniesAPIResponse>(
    `/companies?filters[name][$contains]=${name}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&pLevel`
  )
  return response.data
}
