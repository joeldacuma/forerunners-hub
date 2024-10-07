import React from 'react'
import { Spinner } from '@nextui-org/react'

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Spinner size="lg" color="primary" />
    </div>
  )
}
