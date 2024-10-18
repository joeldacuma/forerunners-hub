import { useState } from 'react'
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

export default function login() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('login')
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-300 to-blue-500 items-center justify-center">
        <div 
          className="w-3/4 h-3/4 bg-no-repeat bg-center"
          style={{
            backgroundImage: `url('/login.png?height=600&width=600')`,
            backgroundSize: 'contain'
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
              onSelectionChange={(key) => setActiveTab(key.toString())}
            >
              <Tab key="login" title="LOGIN">
                <form className="flex flex-col gap-4 mt-4">
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
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
                  <div className="flex justify-between items-center">
                    <Link href="#" size="sm">
                      Forgot password?
                    </Link>
                    <Button className="bg-light-violet text-white">Sign In</Button>
                  </div>
                </form>
              </Tab>
              <Tab key="sign-up" title="REGISTER">
                <form className="flex flex-col gap-4 mt-4">
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
                  <Button className="bg-light-violet text-white">SIGN UP</Button>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
