import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
} from '@nextui-org/react'
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

export const ProductSection: React.FC<ProductSectionProps> = ({ title, data }) => {
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
                <CardHeader className="flex-col items-start px-4 py-5 bg-primary/10">
                  <h3 className="text-xl font-semibold text-sky-700">
                    {card.Title}
                  </h3>
                </CardHeader>
                <CardBody className="px-4 py-5">
                  <p>{card.Description}</p>
                </CardBody>
                <CardFooter className="text-center justify-center px-4 py-3">
                  <Button
                    variant="bordered"
                    color="primary"
                    className="w-full text-lg font-medium hover:underline"
                  >
                    {card.ActionButtonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
