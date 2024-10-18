import { createCookieSessionStorage, redirect } from '@remix-run/node'

interface SessionData {
  jwt: string | null
}

interface SessionFlashData {}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__ForerunnersUserSession',
      secrets: [process.env.APP_SECRET || 'secret123'],
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax', // Protection against CSRF
      path: '/',
      httpOnly: true,
    },
  })

export async function getUserSession(request: Request): Promise<string | null> {
  const session = await getSession(request.headers.get('Cookie'))
  return session.get('jwt') || null
}

export async function loginUserSession(request: Request, jwt: string) {
  const session = await getSession(request.headers.get('Cookie'))
  session.set('jwt', jwt)

  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': await commitSession(session)
    },
  })
}

export async function logoutUserSession(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  
  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(session),
    }
  })
}
