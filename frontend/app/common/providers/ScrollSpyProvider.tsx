import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { MenuProps } from 'app/common/models'
import { useLocation } from '@remix-run/react'

interface ScrollspyContextType {
  activeSection: string
  setActiveSection: (section: string) => void
}

interface ScrollspyProviderProps {
  children: React.ReactNode
  navItems: MenuProps[]
  offset?: number
}

const ScrollspyContext = createContext<ScrollspyContextType | undefined>(
  undefined
)

export const useScrollSpy = (): ScrollspyContextType => {
  const context = useContext(ScrollspyContext)
  if (context === undefined) {
    throw new Error('useScrollspy must be used within ScrollspyProvider')
  }
  return context
}

export const ScrollspyProvider: React.FC<ScrollspyProviderProps> = ({
  children,
  navItems,
  offset = 0,
}) => {
  const [activeSection, setActiveSection] = useState<string>('')
  const location = useLocation()

  const checkSection = useCallback(() => {
    const scrollPosition = window.scrollY + offset

    for (const item of navItems) {
      const element = document.getElementById(item.uid)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(item.uid)
          return
        }
      }
    }
  }, [navItems, offset])

  useEffect(() => {
    checkSection()
    window.addEventListener('scroll', checkSection)
    return () => window.removeEventListener('scroll', checkSection)
  }, [checkSection])

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash) {
      const element = document.getElementById(hash)
      if (element) {
        setTimeout(() => {
          const topOffset =
            element.getBoundingClientRect().top + window.pageYOffset - offset
          window.scrollTo({ top: topOffset, behavior: 'smooth' })
        }, 0)
      }
    }
  }, [location, offset])

  return (
    <ScrollspyContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ScrollspyContext.Provider>
  )
}
