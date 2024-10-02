import { redirect, LoaderFunction } from '@remix-run/node'
import { Spinner } from '@nextui-org/react'

export const loader: LoaderFunction = async () => {
  return redirect('/home')
}

export default function Index() {
  return (
    <>
      <div>
        <Spinner />
      </div>
    </>
  )
}
