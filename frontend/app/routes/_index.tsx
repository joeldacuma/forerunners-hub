import type { MetaFunction } from '@remix-run/node'
import { NavHeader } from 'app/common'

export const meta: MetaFunction = () => {
  return [
    { title: 'Forerunners HUB' },
    { name: 'description', content: 'Welcome to Forerunners HUB!' },
    { name: 'keywords', content: 'HR,Human Resources,AI' },
  ]
}

export default function Index() {
  return (
    <>
      <NavHeader />
      <div className="flex max-h-screen items-center justify-center"></div>
    </>
  )
}
