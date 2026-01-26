import { Skeleton } from '@/shared/components/ui/Skeleton'

/**
 * Admin Forge Loading
 * Tailored for a data-heavy dashboard experience.
 */
export default function AdminLoading() {
  return (
    <div className='space-y-10 animate-in fade-in duration-700'>
      <div className='flex items-center justify-between'>
        <div className='space-y-3'>
          <Skeleton className='h-10 w-56 rounded-2xl' />
          <Skeleton className='h-4 w-72 rounded-full opacity-40' />
        </div>
        <Skeleton className='h-14 w-40 rounded-full' />
      </div>

      {/* Stats Overview Skeletons */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className='h-36 rounded-[2rem] opacity-60' />
        ))}
      </div>

      {/* Main Content Area Skeleton (The Table/List) */}
      <div className='space-y-4'>
        <Skeleton className='h-10 w-full rounded-2xl opacity-20' />
        <Skeleton className='h-[400px] w-full rounded-[2.5rem]' />
      </div>
    </div>
  )
}
