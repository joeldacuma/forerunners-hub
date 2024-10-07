import { ScrollspyProvider } from '~/common/providers'
import {
  json,
  MetaFunction,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
  useNavigate,
} from '@remix-run/react'
import { ActionFunction } from '@remix-run/node'
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
import { fetchCompanies } from '~/api/strapi'
import { useEffect, useMemo, useState } from 'react'
import {
  useHomeData,
  useCompanyDirectoriesData,
  useCompaniesData,
  useFetchCompaniesData,
  useFetchCompaniesDirectoryData,
  useFetchHomeData,
} from 'app/common/app-store'
import { LoadingSpinner } from 'app/components'
import { Company, CompaniesAPIResponse } from '~/common/models'

export const meta: MetaFunction = () => {
  return [
    { title: 'Forerunners Company Directories' },
    { name: 'description', content: 'Welcome to Forerunners HUB!' },
    { name: 'keywords', content: 'HR,Human Resources,AI' },
  ]
}

// export const loader: LoaderFunction = async ({ request }) => {
//   const url = new URL(request.url)
//   const page = parseInt(url.searchParams.get('page') || '1', 10)
//   const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10)
//   const companies = await fetchCompanies(page, pageSize)

//   return json({
//     companies,
//     page,
//     pageSize,
//   })
// }

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page') || '1')
  const pageSize = Number(url.searchParams.get('pageSize') || '10')
  const companies = await fetchCompanies(page, pageSize)

  return json({ companies })
}

export default function CompanyDirectories() {
  const actionData = useActionData<typeof action>()
  const submit = useSubmit()
  const navigate = useNavigation()
  const isLoading = navigate.state === 'loading' || navigate.state === 'submitting'
  const [page, setPage] = useState(1)
  const homeData = useHomeData()
  const companyDirectoriesData = useCompanyDirectoriesData()
  const companiesData = useCompaniesData()

  const fetchHomeData = useFetchHomeData()
  const fetchCompaniesDirectoryData = useFetchCompaniesDirectoryData()
  // const fetchCompaniesData = useFetchCompaniesData()

  useEffect(() => {    
    if (!homeData && !companyDirectoriesData) {
      fetchHomeData()
      fetchCompaniesDirectoryData()
    }
    const form = new FormData()
    form.append('page', String(page))
    form.append('pageSize', '10')
  }, [
    page,
    submit
  ])

  const renderCell = (company: Company, columnKey: React.Key) => {
    switch (columnKey) {
      case 'logo':
        return (
          <div className="py-6 flex justify-center text-center">
            {company?.logo ? (
              <Image
                className="w-60 h-20 object-contain"
                src={company.logo[0].url}
                alt={`${company.name} Logo`}
              />
            ) : (
              <Image
                className="w-60 h-20 object-contain"
                src="/no-image.png"
                alt="No Logo"
              />
            )}
          </div>
        )
      case 'name':
        return <div className="py-6">{company.name}</div>
      default:
        return null
    }
  }

  const columns = useMemo(
    () => [
      {
        key: 'logo',
        label: 'COMPANY LOGO',
      },
      {
        key: 'name',
        label: 'NAME',
      },
    ],
    []
  )

  return (
    <>
      {homeData?.data && companyDirectoriesData?.data ? (
        <div>
          <ScrollspyProvider navItems={companyDirectoriesData?.data.menu}>
            <NavHeader menus={companyDirectoriesData?.data.menu} />
            <div className="lg:px-20">
              <div className="p-6 mt-4">
                <header className="bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 text-white py-10">
                  <div className="container mx-auto px-6">
                    <h1 className="text-2xl font-bold mb-2 uppercase">
                      {companyDirectoriesData?.data.companyDirectoryMainTitle}
                    </h1>
                    <p className="text-md">
                      {
                        companyDirectoriesData?.data
                          .companyDirectoryMainDescription
                      }
                    </p>
                  </div>
                </header>
              </div>
              <div className="lg:flex">
                <div className="w-full p-6">
                  <div className="mb-4">
                    <Table
                      removeWrapper
                      aria-label={
                        companyDirectoriesData?.data
                          .companyDirectoryListAriaLabel
                      }
                    >
                      <TableHeader columns={columns}>
                        {(column) => (
                          <TableColumn
                            key={column.key}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {column.label}
                          </TableColumn>
                        )}
                      </TableHeader>
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        <TableBody items={companiesData?.data || []}>
                          {(company: Company) => (
                            <TableRow
                              key={company.id}
                              className="p-10 border-b border-gray-300"
                            >
                              {(columnKey) => (
                                <TableCell>
                                  {renderCell(company, columnKey)}
                                </TableCell>
                              )}
                            </TableRow>
                          )}
                        </TableBody>
                      )}
                    </Table>
                  </div>
                  <div className="w-full flex justify-end gap-2">
                    {/* <Button
                      size="sm"
                      onClick={() =>
                        setPage((prev) => (prev > 1 ? prev - 1 : prev))
                      }
                      isDisabled={page <= 1 || isLoading}
                    >
                      Previous
                    </Button>
                    <Pagination
                      showShadow
                      color="primary"
                      onChange={setPage}
                      page={page}
                      total={companiesData?.meta?.pagination?.pageCount || 1}
                    />
                    <Button
                      size="sm"
                      isDisabled={
                        page >=
                          (companiesData?.meta?.pagination?.pageCount || 1) ||
                        isLoading
                      }
                      onClick={() =>
                        setPage((prev) =>
                          prev <
                          (companiesData?.meta?.pagination?.pageCount || 1)
                            ? prev + 1
                            : prev
                        )
                      }
                    >
                      Next
                    </Button> */}
                  </div>
                </div>
                <div className="w-full p-4"></div>
              </div>
            </div>
          </ScrollspyProvider>
          <Footer data={homeData.data?.Footer} />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  )
}
