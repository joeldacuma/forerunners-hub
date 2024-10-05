import {
  type MetaFunction,
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
import { NewsLetterParams, HomeAPIResponse } from '~/common/models'
import { useHomeData, useFetchHomeData } from 'app/common/app-store'
import { useEffect } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Forerunners HUB' },
    { name: 'description', content: 'Welcome to Forerunners HUB!' },
    { name: 'keywords', content: 'HR,Human Resources,AI' },
  ]
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

  const newsLetterBody: NewsLetterParams = {
    data: {
      email: email,
      active: true,
    },
  }

  const response = await axiosInstance.post('/newsletters', newsLetterBody)
  if (!response) {
    return {
      error: 'Something went wrong. Try again.',
    }
  }

  return json({ success: true, message: 'Subscription successful!' })
}

export default function Home() {
  const actionData = useActionData<typeof action>()
  const homeData = useHomeData()
  const fetchHomeData = useFetchHomeData()

  useEffect(() => {
    if (!homeData) {
      fetchHomeData()
    }
  }, [homeData, fetchHomeData])

  return (
    <>
      {homeData?.data ? (
        <div>
          <ScrollspyProvider navItems={homeData.data?.menu}>
            <NavHeader menus={homeData.data?.menu} />
            <div id="home">
              <BannerSection
                title={homeData.data.bannerTitle}
                description={homeData.data?.bannerDescription}
                actionText={homeData.data?.bannerActionText}
              />
            </div>
            <div id="products">
              <ProductSection data={homeData.data?.products} />
            </div>
            <div id="company-directories">
              <CompanyDirectorySection
                title={homeData.data?.companySectionTitle}
                description={homeData.data?.companySectionDescription}
                buttonText={homeData.data?.companyButtonText}
                buttonUrl={homeData.data?.companyButtonUrl}
              />
            </div>
            <div id="about">
              <AboutUsSection
                images={homeData.data?.companyBackgroundImages}
                description={homeData.data?.aboutUsDescription}
                description1={homeData.data.aboutUsDescription2}
                description2={homeData.data?.aboutUsDescription3}
                title={homeData.data?.aboutUsSectionTitle}
              />
            </div>
          </ScrollspyProvider>
          <Footer
            data={homeData.data?.Footer}
            actionData={actionData}
            formAction="/home"
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
