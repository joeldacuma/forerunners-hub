import { redirect, LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async () => {
  return redirect('/home')
}

export default function Index() {
  return (
    <>
      <div>Loading...</div>
    </>
  )
}
