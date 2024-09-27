import React, { useState } from 'react'
import { Button, Link } from '@nextui-org/react'
import { ImageProps } from 'app/common/models'

interface AboutUsProps {
  images?: ImageProps[]
  title: string
  description: string
  description1: string
  description2: string
}

export const AboutUsSection: React.FC<AboutUsProps> = ({
  images,
  title,
  description,
  description1,
  description2,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-4 p-4 opacity-20">
        {images?.map((src, index) => (
          <img
            key={index}
            src={src.image.url}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-xl p-6 md:p-8">
          <h2 className="text-light-blue text-3xl md:text-4xl font-bold text-center mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <div
            className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}
          >
            <p className="text-lg text-gray-700 mb-4">{description1}</p>
            <p className="text-lg text-gray-700 mb-4">{description2}</p>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-light-blue text-white font-semibold py-2 px-4 transition duration-300"
              color="primary"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
