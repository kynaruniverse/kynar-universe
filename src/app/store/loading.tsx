import { PageHeaderSkeleton } from '@/shared/components/feedback/skeletons/PageHeaderSkeleton'
import { ProductGridSkeleton } from '@/shared/components/feedback/skeletons/ProductGridSkeleton'
import { Skeleton } from '@/shared/components/ui/Skeleton'

export default function StoreLoading() {
  return (
    <div className='px-4 py-8 pb-32 space-y-8 animate-in fade-in duration-500'>
      <PageHeaderSkeleton />
      
      {/* Skeleton Pill Row for World Filter */}
      <div className='flex gap-3 overflow-hidden'>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className='h-11 w-28 rounded-2xl flex-shrink-0' />
        ))}
      </div>

      <ProductGridSkeleton count={6} />
    </div>
  )
}
