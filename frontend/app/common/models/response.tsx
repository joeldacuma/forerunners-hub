import { MenuProps, ProductProps, ImageProps, Image, FooterProps } from './util'

export interface HomeAPIResponse {
  menu: MenuProps[]
  bannertitle: string
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

export interface CompaniesAPIResponse {
  data: Company[] | []
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    } 
  }
}
