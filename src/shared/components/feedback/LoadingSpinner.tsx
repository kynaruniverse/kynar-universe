import { cn } from '@/shared/utils/formatting'
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const LoadingSpinner = ({ className, size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className='flex items-center justify-center p-4'>
      <Loader2 
        className={cn(
          'animate-spin text-kyn-green-600', 
          sizeClasses[size], 
          className
        )} 
      />
    </div>
  )
}
