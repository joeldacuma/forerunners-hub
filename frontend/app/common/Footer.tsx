import React from 'react'
import { Input, Button, Link } from '@nextui-org/react'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'lucide-react'
import { FooterProps } from 'app/common/models'
import { Form, useActionData } from '@remix-run/react'

interface ExtendedFooterProps {
  data: FooterProps
  actionData?: {
    error?: string
    success?: boolean
    message?: string
  }
  formAction?: string
}

export const Footer: React.FC<ExtendedFooterProps> = ({
  data,
  actionData,
  formAction,
}) => {
  const formActionData = useActionData<typeof actionData>()

  return (
    <div className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-8 sm:mb-0">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Company
            </h2>
            <ul className="space-y-2">
              {data?.Company?.map((company, index) => (
                <li key={index} className="cursor-pointer">
                  <Link href={company.url} color="foreground">
                    {company.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8 sm:mb-0">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Products
            </h2>
            <ul className="space-y-2">
              {data?.Products.map((product, index) => (
                <li key={index} className="cursor-pointer">
                  <Link href={product.url} color="foreground">
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8 sm:mb-0">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Support
            </h2>
            <ul className="space-y-2">
              {data?.Support.map((support, index) => (
                <li key={index} className="cursor-pointer">
                  <Link href={support.url} color="foreground">
                    {support.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {formAction && (
            <div className="mb-8 sm:mb-0">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                {data.subscribeTitle}
              </h2>
              <p className="mb-4">{data.subscribeDescription}</p>
              <Form method="post" action={formAction} className="space-y-2">
                <Input
                  type="email"
                  name="email"
                  variant="bordered"
                  placeholder="Enter your email..."
                  aria-label="Email for newsletter"
                  className="w-full sm:w-auto"
                />
                {formActionData?.error && (
                  <em className="text-red-500">{formActionData.error}</em>
                )}
                {formActionData?.success && (
                  <em className="text-green-500">{formActionData.message}</em>
                )}
                <Button
                  type="submit"
                  className="bg-light-violet text-white w-full"
                >
                  {data.subscribeButtonText}
                </Button>
              </Form>
            </div>
          )}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 sm:mb-0">
              {data.facebookUrl && (
                <Link href={data.facebookUrl} aria-label="Facebook">
                  <FacebookIcon className="text-light-blue w-6 h-6" />
                </Link>
              )}
              {data.twitterUrl && (
                <Link href={data.twitterUrl} aria-label="Twitter">
                  <TwitterIcon className="text-light-blue w-6 h-6" />
                </Link>
              )}
              {data.instagramUrl && (
                <Link href={data.instagramUrl} aria-label="Instagram">
                  <InstagramIcon className="text-light-blue w-6 h-6" />
                </Link>
              )}
              {data.linkedinUrl && (
                <Link href={data.linkedinUrl} aria-label="LinkedIn">
                  <LinkedinIcon className="text-light-blue w-6 h-6" />
                </Link>
              )}
            </div>
            <p className="text-sm text-center sm:text-right">
              {data.copyrightText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
