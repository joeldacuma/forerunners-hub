import React, { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
  Link as MenuLink,
} from '@nextui-org/react'

import { routeNames } from 'app/route-names'

export const NavHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsOpen}>
      <NavbarBrand>
        <MenuLink href={routeNames.root}>
          <img src="/logo.png" alt="Forerunners" className="h-8 md:h-10" />
        </MenuLink>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-x-10" justify="center">
        <NavbarItem>
          <MenuLink
            href={routeNames.about}
            className="text-sky-700 font-bold p-2 after:bg-light-blue after:absolute after:h-1 after:w-0 after:bottom-0 
            after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            HOME
          </MenuLink>
        </NavbarItem>
        <NavbarItem>
          <MenuLink
            href={routeNames.about}
            className="text-sky-700 font-bold p-2 after:bg-light-blue after:absolute after:h-1 after:w-0 after:bottom-0 
            after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            COMPANY DIRECTORIES
          </MenuLink>
        </NavbarItem>
        <NavbarItem>
          <MenuLink
            href={routeNames.about}
            className="text-sky-700 font-bold p-2 after:bg-light-blue after:absolute after:h-1 after:w-0 after:bottom-0 
            after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
          >
            ABOUT
          </MenuLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle aria-label={isOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>
      <NavbarMenu className="flex md:hidden gap-y-5">
        <NavbarMenuItem>
          <MenuLink
            href={routeNames.root}
            className="text-sky-700 hover:text-gray-300 font-bold"
          >
            HOME
          </MenuLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <MenuLink
            href={routeNames.about}
            className="text-sky-700 hover:text-gray-300 font-bold"
          >
            ABOUT
          </MenuLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
