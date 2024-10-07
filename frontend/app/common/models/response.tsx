import { MenuProps, ProductProps, ImageProps, Image, FooterProps, } from './util'

export interface Home {
  menu: MenuProps[]
  bannerTitle: string
  bannerActionText: string
  bannerDescription: string
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

export interface Company {
  id: number
  documentId: string
  name: string
  overview?: string
  contactHR?: string
  valueProposition?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale?: string
  website?: string
  logo: Image[]
  localizations?: string
}

export interface CompanyDirectory {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string | null
  companyDirectoryMainTitle: string
  companyDirectoryMainDescription: string
  companyDirectoryListAriaLabel: string
  menu: MenuProps[]
  localizations: string[]
}

export interface CompaniesAPIResponse {
  data?: Company[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface HomeAPIResponse {
  data: Home
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    } 
  }
}

export interface CompanyDirectoriesResponse {
  data: CompanyDirectory
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    } 
  }
}