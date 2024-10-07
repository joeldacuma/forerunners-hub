import { redirect, LoaderFunction } from '@remix-run/node'
import { LoadingSpinner } from 'app/components'

export const loader: LoaderFunction = async () => {
  return redirect('/home')
}

export default function Index() {

  return (
    <>
      <LoadingSpinner />
    </>
  )
}
