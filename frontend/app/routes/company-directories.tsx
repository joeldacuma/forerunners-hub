import { ScrollspyProvider } from '~/common/providers'
import { MetaFunction } from '@remix-run/react'
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
  Link,
} from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import {
  useHomeData,
  useCompanyDirectoriesData,
  useCompaniesData,
  useFetchCompaniesDirectoryData,
  useFetchHomeData,
  useFetchCompaniesData,
} from 'app/common/app-store'
import { LoadingSpinner } from 'app/components'
import { Company } from '~/common/models'

export const meta: MetaFunction = () => {
  return [
    { title: 'Forerunners Company Directories' },
    { name: 'description', content: 'Welcome to Forerunners HUB!' },
    { name: 'keywords', content: 'HR,Human Resources,AI' },
  ]
}

export default function CompanyDirectories() {
  const [isLoading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const homeData = useHomeData()
  const companyDirectoriesData = useCompanyDirectoriesData()
  const _companiesData = useCompaniesData()
  const [companiesData, setCompaniesData] = useState(_companiesData)

  const fetchHomeData = useFetchHomeData()
  const fetchCompaniesDirectoryData = useFetchCompaniesDirectoryData()
  const fetchCompaniesData = useFetchCompaniesData()

  const handlePaginationChange = async (page: number) => {
    setLoading(true)
    setPage(page)
    await fetchCompaniesData(page)
    setCompaniesData(_companiesData)
    setLoading(false)
  }

  useEffect(() => {
    if (_companiesData) {
      setCompaniesData(_companiesData)
    }

    if (!homeData && !companyDirectoriesData) {
      fetchHomeData()
      fetchCompaniesDirectoryData()
    }
  }, [
    page,
    isLoading,
    setLoading,
    _companiesData,
    setCompaniesData,
    homeData,
    companyDirectoriesData,
    fetchCompaniesDirectoryData,
    fetchHomeData,
  ])

  const renderCell = (company: Company, columnKey: React.Key) => {
    switch (columnKey) {
      case 'logo':
        return (
          <div className="py-6">
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
        return (
          <div className="py-6">
            <Link className="text-xl hover:underline cursor-pointer">
              {company.name}
            </Link>
          </div>
        )
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
                      {companyDirectoriesData?.data?.companyDirectoryMainTitle}
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
                  <div className="w-full flex justify-end gap-2 mb-6">
                    <Button
                      size="sm"
                      isDisabled={page <= 1}
                      onClick={() =>
                        handlePaginationChange(page > 1 ? page - 1 : 1)
                      }
                      className="text-primary"
                    >
                      Previous
                    </Button>
                    <Pagination
                      showShadow
                      color="primary"
                      className="text-primary"
                      onChange={(page) => handlePaginationChange(page)}
                      page={page}
                      total={companiesData?.meta?.pagination?.pageCount || 1}
                    />
                    <Button
                      isDisabled={
                        page >=
                        (companiesData?.meta?.pagination?.pageCount || 1)
                      }
                      size="sm"
                      onClick={() =>
                        handlePaginationChange(
                          page <=
                            (companiesData?.meta?.pagination?.pageCount || 1)
                            ? page + 1
                            : page
                        )
                      }
                      className="text-primary"
                    >
                      Next
                    </Button>
                  </div>
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
                            style={{
                              width: column.key === 'logo' ? '40px' : 'auto',
                            }}
                          >
                            {column.label}
                          </TableColumn>
                        )}
                      </TableHeader>
                      <TableBody
                        loadingContent={<Spinner />}
                        loadingState={
                          isLoading || companiesData?.data?.length === 0
                            ? 'loading'
                            : 'idle'
                        }
                        items={companiesData?.data || []}
                      >
                        {(company: Company) => (
                          <TableRow
                            key={company.id}
                            className="p-8 border-b border-gray-300"
                          >
                            {(columnKey) => (
                              <TableCell
                                style={{
                                  width: columnKey === 'logo' ? '40px' : 'auto',
                                }}
                              >
                                {renderCell(company, columnKey)}
                              </TableCell>
                            )}
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
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
