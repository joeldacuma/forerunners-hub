import { ScrollspyProvider } from '~/common/providers'
import { axiosInstance } from 'app/utils'
import { json, MetaFunction, useLoaderData } from '@remix-run/react'
import { LoaderFunction } from '@remix-run/node'
import { Footer, NavHeader } from 'app/common'

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

export default function CompanyDirectories() {
  const homeAPI = useLoaderData<typeof loader>()
  const { home } = homeAPI

  return (
    <>
      <ScrollspyProvider navItems={home.menu}>
        <NavHeader menus={home.menu} />
      </ScrollspyProvider>
    </>
  )
}
