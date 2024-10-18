import React, { useState } from 'react'
import {
  UserCircle,
  Settings,
  Briefcase,
  LayoutDashboard,
} from 'lucide-react'

export const Sidemenu: React.FC = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen)

  return (
    <div
      className={`bg-white w-64 fixed h-full transition-transform duration-300 ease-in-out transform 
        ${isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Forerunners</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Analysis
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                <UserCircle className="w-5 h-5 mr-3" />
                Customers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                <Briefcase className="w-5 h-5 mr-3" />
                Human Resourcing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
