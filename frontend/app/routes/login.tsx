import { useState, ChangeEvent, useEffect, useCallback } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Link,
  Tabs,
  Tab,
  Image,
} from '@nextui-org/react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Wave } from '~/components'
import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { loginAuthUser } from 'app/api/strapi'
import { Form, redirect, useActionData, useNavigation } from '@remix-run/react'
import { getUserSession, loginUserSession } from 'app/session.server'
import axios, { AxiosError } from 'axios'
import { ResponseError } from 'app/common/models'
import { LoginProps } from 'app/common/models'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const jwt = await getUserSession(request)
  if (jwt) {
    return redirect('/dashboard')
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const email = formData.get('email')?.toString().trim()
  const password = formData.get('password')?.toString().trim()

  if (!email || !password) {
    return json({ error: 'email and password is required.' }, { status: 400 })
  }

  const emailRegex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  if (!emailRegex.test(email)) {
    return json({ error: 'Invalid email format' }, { status: 400 })
  }

  try {
    const response = await loginAuthUser(email, password)
    return loginUserSession(request, response?.jwt)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ResponseError>
      const errorMessage = axiosError.response?.data
        ? 'Invalid email or password'
        : 'An error occurred.'
      return json(
        { error: errorMessage },
        { status: axiosError.response?.status || 400 }
      )
    }
    return json({ error: 'Unexpected error occured.' }, { status: 500 })
  }
}

export default function Login() {
  const actionData = useActionData<{ error: string }>()
  const navigation = useNavigation()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('login')
  const toggleVisibility = () => setIsVisible(!isVisible)
  const [inputValue, setInputValue] = useState<LoginProps>({
    email: '',
    password: '',
  })
  const isSubmitting = navigation.state === 'submitting'
  const hasError = actionData?.error

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-300 to-blue-500 items-center justify-center">
        <div
          className="w-3/4 h-3/4 bg-no-repeat bg-center"
          style={{
            backgroundImage: `url('/login.png?height=600&width=600')`,
            backgroundSize: 'contain',
          }}
          aria-hidden="true"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center bg-gray-100 justify-center p-4 overflow-hidden">
        <div className="absolute md:w-1/2 inset-0 z-0">
          <Wave color="rgba(255, 255, 255, 0.3)" duration="7s" />
          <Wave color="rgba(255, 255, 255, 0.2)" duration="11s" delay="-5s" />
          <Wave color="rgba(255, 255, 255, 0.1)" duration="13s" delay="-2s" />
        </div>

        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col gap-1 items-center">
            <Image width="200" src="/logo.png" />
            <p className="text-sm text-default-500">Sign in your account</p>
          </CardHeader>
          <CardBody>
            <Tabs
              fullWidth
              size="lg"
              aria-label="Auth tabs"
              selectedKey={activeTab}
              isDisabled // remove when registration is ready
              onSelectionChange={(key) => setActiveTab(key.toString())}
            >
              <Tab key="login" title="LOGIN">
                <Form method="post" className="flex flex-col gap-4 mt-4">
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    name="email"
                    value={inputValue?.email}
                    onChange={handleChangeInput}
                  />
                  <Input
                    isRequired
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    value={inputValue?.password}
                    onChange={handleChangeInput}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? 'text' : 'password'}
                  />
                  {!!hasError ? (
                    <p className="mt-4 text-red-600">{hasError}</p>
                  ) : (
                    ''
                  )}
                  <div className="flex justify-between items-center">
                    <Link href="#" size="sm">
                      Forgot password?
                    </Link>
                    <Button
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      type="submit"
                      className="bg-light-violet text-white"
                    >
                      Sign In
                    </Button>
                  </div>
                </Form>
              </Tab>
              <Tab key="sign-up" title="REGISTER">
                <Form method="post" className="flex flex-col gap-4 mt-4">
                  <Input
                    isRequired
                    label="Name"
                    placeholder="Enter your name"
                  />
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Create a password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? 'text' : 'password'}
                  />
                  <Button className="bg-light-violet text-white">
                    SIGN UP
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
