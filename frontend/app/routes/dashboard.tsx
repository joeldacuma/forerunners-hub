import React from 'react'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { getUserSession } from '~/utils/session'
import { fetchUserInfo } from 'app/api/strapi'
import { User } from 'app/common/models'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const jwt = await getUserSession(request)
  if (!jwt) {
    return redirect('/login')
  }

  const response = await fetchUserInfo(jwt)
  if (!response) {
    return redirect('/login')
  }
  const userData: User = response
  return userData
}

export default function dashboard() {
  return <div>dashboard</div>
}
