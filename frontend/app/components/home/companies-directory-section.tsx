import { Button, Link } from '@nextui-org/react'
import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

interface CompanyDirectoryProps {
  title: string
  description: string
  buttonText: string
  buttonUrl?: string
}

export const CompanyDirectorySection: React.FC<CompanyDirectoryProps> = ({
  title,
  description,
  buttonText,
  buttonUrl,
}) => {
  const [loading, setLoading] = useState(false)

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/company.png"
          alt="Beautiful landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
          {title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8">
          {description}
        </p>
        <div>
          <Link href={`${buttonUrl}`}>
            <Button
              isLoading={loading}
              onClick={() => setLoading(true)}
              size="lg"
              className="text-base font-bold text-sky-700 sm:text-lg px-6 sm:px-8 py-2 sm:py-3"
            >
              {buttonText}
              <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
