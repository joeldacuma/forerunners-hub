import React, { useState } from 'react'
import { Link } from '@remix-run/react'
import { Menu, X } from 'lucide-react'

import { routeNames } from 'app/route-names'

export const NavHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="text-black">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center text-xl font-bold">
          <img
            src="/logo.png"
            alt="Forerunners"
            className="w-auto h-8 md:h-10"
          />
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link
            to={routeNames.root}
            className="text-light-blue hover:text-gray-300 font-bold"
          >
            HOME
          </Link>
          <Link
            to={routeNames.about}
            className="text-light-blue hover:text-gray-300 font-bold"
          >
            ABOUT
          </Link>
        </div>

        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to={routeNames.root}
              className="text-light-blue block px-3 py-2 rounded-md hover:bg-gray-100"
            >
              HOME
            </Link>
            <Link
              to={routeNames.about}
              className="text-light-blue block px-3 py-2 rounded-md hover:bg-gray-100"
            >
              ABOUT
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
