import { Skeleton } from '@/shared/components/ui/Skeleton'

/**
 * PageHeaderSkeleton
 * Reusable placeholder for page titles and subtitles.
 */
export function PageHeaderSkeleton() {
  return (
    <div className='space-y-3'>
      {/* Title Placeholder */}
      <Skeleton className='h-10 w-48 rounded-2xl' />
      
      {/* Subtitle/Description Placeholder */}
      <Skeleton className='h-4 w-64 rounded-full' />
    </div>
  )
}
