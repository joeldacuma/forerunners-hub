import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'

interface ProductProps {
  Title: string
  Description: string
  ActionButtonText: string
  ActionButtonUrl: string
}

interface ProductSectionProps {
  data: ProductProps[]
}

const shakeAnimation = {
  hover: {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.4 },
  },
}

export const ProductSection: React.FC<ProductSectionProps> = ({ data }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="relative h-[dvh] min-h-[600px] w-full py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-light-blue">
          Our Products
        </h2>
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
                <CardHeader className="flex-col items-start px-4 py-5 bg-primary/10">
                  <h3 className="text-xl font-semibold text-sky-700">
                    {card.Title}
                  </h3>
                </CardHeader>
                <CardBody className="px-4 py-5">
                  <p>{card.Description}</p>
                </CardBody>
                <CardFooter className="px-4 py-3">
                  <button className="text-sky-700 font-medium hover:underline">
                    {card.ActionButtonText}
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
