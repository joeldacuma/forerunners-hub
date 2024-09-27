import { type MetaFunction, type LoaderFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { NavHeader } from 'app/common'
import { axiosInstance } from 'app/utils'
import {
  BannerSection,
  ProductSection,
  CompanyDirectorySection,
  AboutUsSection,
} from 'app/components/home'
import { Footer } from 'app/common'
import { ScrollspyProvider } from '~/common/providers'

export const meta: MetaFunction = () => {
  return [
    { title: 'Forerunners HUB' },
    { name: 'description', content: 'Welcome to Forerunners HUB!' },
    { name: 'keywords', content: 'HR,Human Resources,AI' },
  ]
}

export const loader: LoaderFunction = async () => {
  const homeResponse = await axiosInstance.get('/home?pLevel')
  const { data } = homeResponse
  return json({
    home: data.data,
  })
}

export default function Index() {
  const homeAPI = useLoaderData<typeof loader>()
  const { home } = homeAPI

  return (
    <>
      <ScrollspyProvider navItems={home.menu}>
        <NavHeader menus={home.menu} />
        <div id="home">
          <BannerSection
            title={home.bannerTitle}
            description={home.bannerDescription}
            actionText={home.bannerActionText}
          />
        </div>
        <div id="products">
          <ProductSection data={home.products} />
        </div>
        <div id="company-directories">
          <CompanyDirectorySection
            title={home.companySectionTitle}
            description={home.companySectionDescription}
            buttonText={home.companyButtonText}
          />
        </div>
        <div id="about">
          <AboutUsSection
            images={home.companyBackgroundImages}
            description={home.aboutUsDescription}
            description1={home.aboutUsDescription1}
            description2={home.aboutUsDescription2}
            title={home.aboutUsSectionTitle}
          />
        </div>
      </ScrollspyProvider>
      <Footer data={home.Footer} />
    </>
  )
}
