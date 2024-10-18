import React, { useState } from 'react'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { getUserSession } from 'app/session.server'
import { fetchUserInfo } from 'app/api/strapi'
import { User as UserModel } from 'app/common/models'
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Progress,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Button,
} from '@nextui-org/react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  Users,
  DollarSign,
  ShoppingCart,
  Phone,
  Menu,
  X,
  UserCircle,
  Settings,
  Briefcase,
  LayoutDashboard,
} from 'lucide-react'
import { Sidemenu } from 'app/components'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const jwt = await getUserSession(request)
  if (!jwt) {
    return redirect('/login')
  }

  const response = await fetchUserInfo(jwt)
  if (!response) {
    return redirect('/login')
  }
  const userData: UserModel = response
  return userData
}

const data = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
]

const recentDeals = [
  { id: 1, client: 'Alice Johnson', amount: 5000, status: 'completed' },
  { id: 2, client: 'Bob Smith', amount: 7500, status: 'pending' },
  { id: 3, client: 'Charlie Brown', amount: 3000, status: 'completed' },
  { id: 4, client: 'Diana Prince', amount: 10000, status: 'negotiation' },
]

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div>
        <Sidemenu />
      </div>
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          {/* <Button isIconOnly variant="light" className="md:hidden" onClick={toggleSideMenu}>
            {isSideMenuOpen ? <X /> : <Menu />}
          </Button> */}
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </header>
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardBody className="flex flex-row items-center">
                <Users className="w-8 h-8 mr-4 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Clients</p>
                  <p className="text-xl font-semibold">1,234</p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="flex flex-row items-center">
                <DollarSign className="w-8 h-8 mr-4 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="text-xl font-semibold">$50,000</p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="flex flex-row items-center">
                <ShoppingCart className="w-8 h-8 mr-4 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Deals Closed</p>
                  <p className="text-xl font-semibold">75</p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="flex flex-row items-center">
                <Phone className="w-8 h-8 mr-4 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500">Calls Made</p>
                  <p className="text-xl font-semibold">320</p>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Sales Overview</h2>
              </CardHeader>
              <Divider />
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Recent Deals</h2>
              </CardHeader>
              <Divider />
              <CardBody>
                <Table aria-label="Recent deals table">
                  <TableHeader>
                    <TableColumn>CLIENT</TableColumn>
                    <TableColumn>AMOUNT</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {recentDeals.map((deal) => (
                      <TableRow key={deal.id}>
                        <TableCell>
                          <User
                            name={deal.client}
                            avatarProps={{
                              src: `https://i.pravatar.cc/150?u=${deal.client.replace(' ', '')}`,
                            }}
                          />
                        </TableCell>
                        <TableCell>${deal.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Chip
                            color={
                              deal.status === 'completed'
                                ? 'success'
                                : deal.status === 'pending'
                                  ? 'warning'
                                  : 'primary'
                            }
                          >
                            {deal.status}
                          </Chip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Team Performance</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Alice Johnson</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} color="success" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Bob Smith</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <Progress value={72} color="primary" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Charlie Brown</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <Progress value={60} color="warning" />
                </div>
              </div>
            </CardBody>
          </Card>
        </main>
      </div>
    </div>
  )
}
