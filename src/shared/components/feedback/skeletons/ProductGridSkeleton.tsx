import { ProductCardSkeleton } from '@/shared/components/feedback/skeletons/ProductCardSkeleton'

/**
 * ProductGridSkeleton
 * Responsive grid container for loading states.
 * Uses 'grid-cols-2' to match your mobile store design.
 */
export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className='grid grid-cols-2 gap-4'>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
