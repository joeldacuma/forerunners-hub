import { MenuProps, ProductProps, ImageProps, FooterProps } from './util'

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
