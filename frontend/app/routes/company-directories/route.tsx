import { ScrollspyProvider } from '~/common/providers'
import {
  Form,
  json,
  MetaFunction,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from '@remix-run/react'
import { LoaderFunction, ActionFunction } from '@remix-run/node'
import { Footer, NavHeader } from 'app/common'
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableColumn,
  Button,
  Image,
  Pagination,
  Spinner,
} from '@nextui-org/react'
import {
  fetchCompanies,
  fetchCompanyDirectory,
  fetchHomeData,
} from 'app/utils/api'
import { useEffect, useState } from 'react'
import { Company } from 'app/common/models'

export const meta: MetaFunction = () => {
  return [
    { title: 'Forerunners Company Directories' },
    { name: 'description', content: 'Welcome to Forerunners HUB!' },
    { name: 'keywords', content: 'HR,Human Resources,AI' },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10)

  const companies = await fetchCompanies(page, pageSize)
  const companyDirectory = await fetchCompanyDirectory()
  const home = await fetchHomeData()

  return json({
    companyDirectories: companyDirectory.data,
    companies,
    home: home.data,
    page,
    pageSize,
  })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const page = Number(formData.get('page') || '1')
  const pageSize = Number(formData.get('pageSize') || '10')
  const companies = await fetchCompanies(page, pageSize)

  return json({
    companies,
  })
}

export default function CompanyDirectories() {
  const loaderAPI = useLoaderData<typeof loader>()
  const actionAPI = useActionData<typeof action>()
  const navigation = useNavigation()
  const submit = useSubmit()

  const isLoading = navigation.state === 'submitting'

  const { companyDirectories, home } = loaderAPI
  const companyResponse = actionAPI?.companies || loaderAPI.companies
  const [page, setPage] = useState(loaderAPI.page || 1)
  const { data: companies, meta: companyPagination } = companyResponse

  useEffect(() => {
    const form = new FormData()
    form.append('page', page.toString())
    form.append('pageSize', '10')
    submit(form, { method: 'get' })
  }, [page, submit])

  return (
    <>
      <ScrollspyProvider navItems={companyDirectories.menu}>
        <NavHeader menus={companyDirectories.menu} />
        <div className="lg:px-20">
          <div className="p-6 mt-4">
            <header className="bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 text-white py-10">
              <div className="container mx-auto px-6">
                <h1 className="text-2xl font-bold mb-2 uppercase">
                  {companyDirectories.companyDIrectoryMainTitle}
                </h1>
                <p className="text-md">
                  {companyDirectories.companyDirectoryMainDescription}
                </p>
              </div>
            </header>
          </div>
          <div className="lg:flex">
            <div className="w-full p-6">
              <div className="mb-4">
                <Table
                  removeWrapper
                  aria-label={companyDirectories.companyDIrectoryListAriaLabel}
                >
                  <TableHeader className="bg-gray -50">
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
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <TableBody>
                      {companies?.map((company: Company) => (
                        <TableRow
                          className="p-10 border-b border-gray-300"
                          key={company.id}
                        >
                          <TableCell className="py-6 flex justify-center text-center">
                            {company?.logo ? (
                              <Image
                                className="w-60 h-20 object-contain"
                                src={company?.logo[0].url}
                                alt={`${company.name} Logo`}
                              />
                            ) : (
                              <Image
                                className="w-60 h-20 object-contain"
                                src="/no-image.png"
                                alt="No Logo"
                              />
                            )}
                          </TableCell>
                          <TableCell className="py-6">{company.name}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </div>
              <div className="w-full flex justify-end gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    setPage((prev: number) => (prev > 1 ? prev - 1 : prev))
                  }
                  isDisabled={page <= 1 || isLoading}
                  type="submit"
                >
                  Previous
                </Button>
                <Pagination
                  showShadow
                  color="primary"
                  onChange={setPage}
                  page={page}
                  total={companyPagination?.pagination.pageCount}
                />
                <Button
                  size="sm"
                  isDisabled={
                    page >= companyPagination?.pagination.pageCount || isLoading
                  }
                  onClick={() =>
                    setPage((prev: number) =>
                      prev < companyPagination?.pagination.pageCount
                        ? prev + 1
                        : prev
                    )
                  }
                  type="submit"
                >
                  Next
                </Button>
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
