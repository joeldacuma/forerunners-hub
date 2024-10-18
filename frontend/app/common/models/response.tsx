import { MenuProps, ProductProps, ImageProps, Image, FooterProps, } from './util'

export interface Home {
  menu: MenuProps[]
  bannerTitle: string
  bannerActionText: string
  bannerDescription: string
  productSectionTitle: string
  products: ProductProps[]
  companySectionTitle: string
  companyButtonText: string
  companyButtonUrl: string
  companySectionDescription: string
  companyBackgroundImages: ImageProps[]
  aboutUsSectionTitle: string
  aboutUsDescription: string
  aboutUsDescription2: string
  aboutUsDescription3: string
  Footer: FooterProps
}

export interface Industry {
  id: number
  documentId: string
  title: string
  uid: string
}

export interface Company {
  id: number
  name: string
  overview?: string
  contactHR?: string
  valueProposition?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  website?: string
  logo: Image[]
  industry: Industry | null
}

export interface User {
  id: number
  documentId: string
  username: string
  email: string
}

export interface CompanyDirectory {
  id: number
  documentId: string
  companyDirectoryMainTitle: string
  companyDirectoryMainDescription: string
  companyDirectoryListAriaLabel: string
  menu: MenuProps[]
}

interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface CompaniesAPIResponse {
  data: Company[] | []
  meta?: {
    pagination?: Pagination
  }
}

export interface HomeAPIResponse {
  data: Home
  meta: {
    pagination?: Pagination
  }
}

export interface CompanyDirectoriesResponse {
  data: CompanyDirectory
  meta: {
    pagination?: Pagination
  }
}

export interface AuthResponse {
  jwt: string
  user: User
}

export interface ResponseError {
  message: string
}
