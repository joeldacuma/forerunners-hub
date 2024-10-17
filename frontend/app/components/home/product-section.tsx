import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, Button } from '@nextui-org/react'
import { ProductProps } from 'app/common/models'

interface ProductSectionProps {
  title: string
  data: ProductProps[]
}

const shakeAnimation = {
  hover: {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.4 },
  },
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  data,
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="relative h-[dvh] min-h-[600px] w-full py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-light-blue">
          {title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {data.map((card, index) => (
            <motion.div
              key={index}
              variants={shakeAnimation}
              animate={hoveredCard === index ? 'hover' : 'initial'}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className="h-[40vh]">
                <div
                  className="relative h-full bg-center"
                  style={{ backgroundImage: `url('${card.image.url}')` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-60" />
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
                    <CardBody className="flex-grow flex flex-col text-center justify-center items-center">
                      <h3 className="text-2xl font-semibold text-white mb-4">
                        {card.Title}
                      </h3>
                      <p className="text-white/90 mb-6 text-lg">
                        {card.Description}
                      </p>
                      <Button
                        className="mt-4 px-6 py-2 
                              font-bold
                              bg-white text-light-blue
                              rounded-full hover:bg-opacity-90 
                              transition-colors duration-200"
                      >
                        {card.ActionButtonText}
                      </Button>
                    </CardBody>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
