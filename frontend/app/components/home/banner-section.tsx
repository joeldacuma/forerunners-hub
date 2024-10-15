import React from 'react'
import { Wave, Spiral } from 'app/components/home'
import { Button, Link } from '@nextui-org/react'

interface BannerProps {
  title: string
  description: string
  actionText: string
  actionUrl?: string
}

export const BannerSection: React.FC<BannerProps> = ({
  title,
  description,
  actionText,
}) => {
  return (
    <div className="relative h-[90vh] min-h-[500px] w-full overflow-hidden bg-gradient-to-br from-blue-300 to-blue-500">
      <div className="absolute inset-0 z-0">
        <Wave color="rgba(255, 255, 255, 0.3)" duration="7s" />
        <Wave color="rgba(255, 255, 255, 0.2)" duration="11s" delay="-5s" />
        <Wave color="rgba(255, 255, 255, 0.1)" duration="13s" delay="-2s" />
      </div>

      <div className="flex z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mb-8 text-lg text-blue-100 sm:text-xl">{description}</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="flat">
              <Link className="text-white" href="/get-started">
                {actionText}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Spiral size={300} top="-50px" left="-50px" />
        <Spiral size={200} bottom="-30px" right="-30px" />
        <Spiral
          size={150}
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      </div>
    </div>
  )
}
