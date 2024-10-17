import React, { useCallback, useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
  Link as MenuLink,
  Button,
} from '@nextui-org/react'
import { MenuProps } from 'app/common/models'
import { useScrollSpy } from 'app/common/providers'

interface NavHeaderProps {
  menus?: MenuProps[]
}

export const NavHeader: React.FC<NavHeaderProps> = ({ menus }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { setActiveSection } = useScrollSpy()

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault()
      const element = document.getElementById(id)
      if (element) {
        setActiveSection(id)
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [setActiveSection]
  )

  return (
    <Navbar shouldHideOnScroll isMenuOpen={isOpen} onMenuOpenChange={setIsOpen} className="py-4">
      <NavbarBrand>
        <MenuLink href="/">
          <img src="/logo.png" alt="Forerunners" className="h-5 md:h-8" />
        </MenuLink>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-x-10" justify="center">
        {menus?.map((menu) => (
          <NavbarItem key={menu.title}>
            {menu.url.includes('#') ? (
              <MenuLink
                onClick={(e) => handleLinkClick(e, menu.uid)}
                className={`text-sky-700 text-sm font-bold p-2 after:bg-light-blue after:absolute after:h-1 after:w-0 after:bottom-0 
          after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer`}
              >
                {menu.title.toUpperCase()}
              </MenuLink>
            ) : (
              <MenuLink
                href={`${menu.url}`}
                className={`text-sky-700 text-sm font-bold p-2 after:bg-light-blue after:absolute after:h-1 after:w-0 after:bottom-0 
          after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer`}
              >
                {menu.title.toUpperCase()}
              </MenuLink>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-x-10" justify="end">
        <NavbarItem>
          <MenuLink href="/login">
          <Button
            className="bg-light-violet text-white font-bold"
            variant="flat"
          >
            GET STARTED
          </Button>
          </MenuLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle aria-label={isOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>
      <NavbarMenu className="flex md:hidden gap-y-5 pt-10">
        {menus?.map((menu) => (
          <NavbarMenuItem key={menu.title}>
            <MenuLink
              href={menu.url}
              onClick={() => setIsOpen(false)}
              className={`text-sky-700 text-sm font-bold p-2 after:bg-light-blue after:absolute after:h-1 after:w-0 after:bottom-0 
                after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer`}
            >
              {menu.title.toUpperCase()}
            </MenuLink>
          </NavbarMenuItem>
        ))}
        <NavbarItem>
          <MenuLink href="/login">
          <Button
            className="bg-light-violet text-white font-bold"
            variant="flat"
          >
            GET STARTED
          </Button>
          </MenuLink>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  )
}
