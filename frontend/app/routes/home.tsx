import {
  type MetaFunction,
  type LoaderFunction,
  json,
  type ActionFunction,
} from '@remix-run/node'
import { useActionData, useLoaderData } from '@remix-run/react'
import { axiosInstance } from 'app/utils'
import {
  BannerSection,
  ProductSection,
  CompanyDirectorySection,
  AboutUsSection,
} from 'app/components/home'
import { Footer, NavHeader } from 'app/common'
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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email')

  if (typeof email !== 'string' || email.trim() === '') {
    return json({ error: 'Email is required' }, { status: 400 })
  }

  if (!email.includes('@')) {
    return json({ error: 'Invalid email address' }, { status: 400 })
  }

  const getEmailSubscriber = await axiosInstance.get(
    `/newsletter/subscriber/${email}`
  )

  if (
    getEmailSubscriber?.status === 200 &&
    getEmailSubscriber?.data?.isAvailable
  ) {
    return json({ error: 'Email already subscribed.' }, { status: 200 })
  }

  return json({ success: true, message: 'Subscription successful!' })
}

export default function Home() {
  const homeAPI = useLoaderData<typeof loader>()
  const { home } = homeAPI
  const actionData = useActionData<typeof action>()

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
            buttonUrl={home.companyButtonUrl}
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
      <Footer data={home.Footer} actionData={actionData} formAction="/home" />
    </>
  )
}
