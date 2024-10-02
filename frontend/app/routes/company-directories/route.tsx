import { ScrollspyProvider } from '~/common/providers'
import { axiosInstance } from 'app/utils'
import {
  json,
  MetaFunction,
  useLoaderData,
  useNavigation,
} from '@remix-run/react'
import { LoaderFunction } from '@remix-run/node'
import { Footer, NavHeader } from 'app/common'
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableColumn,
} from '@nextui-org/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Forerunners Company Directories' },
    { name: 'description', content: 'Welcome to Forerunners HUB!' },
    { name: 'keywords', content: 'HR,Human Resources,AI' },
  ]
}

export const loader: LoaderFunction = async () => {
  const companyResponse = await axiosInstance.get('/company-directory?pLevel')
  const homeResponse = await axiosInstance.get('/home?pLevel')
  const { data: companyDirectory } = companyResponse
  const { data: home } = homeResponse
  return json({
    companyDirectories: companyDirectory.data,
    home: home.data,
  })
}

export default function CompanyDirectories() {
  const loaderAPI = useLoaderData<typeof loader>()
  const { companyDirectories, home } = loaderAPI

  return (
    <>
      <ScrollspyProvider navItems={companyDirectories.menu}>
        <NavHeader menus={companyDirectories.menu} />
        <div className="lg:px-20">
          <div className="p-6 mt-4">
            <header className="bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 text-white py-10">
              <div className="container mx-auto px-6">
                <h1 className="text-2xl font-bold mb-2">COMPANY DIRECTORY</h1>
                <p className="text-md">
                  Glimpse our partners location and details
                </p>
              </div>
            </header>
          </div>
          <div className="lg:flex">
            <div className="w-full p-6">
              <div className="mb-4">
                <Table removeWrapper>
                  <TableHeader className="bg-gray-50">
                    <TableColumn
                      key="logo"
                      className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      COMPANY LOGO
                    </TableColumn>
                    <TableColumn
                      key="name"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      NAME
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell className="text-left">sample Image</TableCell>
                      <TableCell>Credit card corporation</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="w-full p-4"></div>
          </div>
        </div>
      </ScrollspyProvider>
      <Footer data={home?.Footer} />
    </>
  )
}
