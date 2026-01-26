import { Skeleton } from '@/shared/components/ui/Skeleton'
import { ProductGridSkeleton } from '@/shared/components/feedback/skeletons/ProductGridSkeleton'

/**
 * Global Home Loading
 * Matches the structure of page.tsx to provide a seamless skeleton transition.
 */
export default function HomeLoading() {
  return (
    <div className='px-6 py-10 space-y-20 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
      
      {/* 1. Hero Skeleton */}
      <section className='text-center space-y-8 pt-12 pb-4'>
        {/* Sparkle Badge Skeleton */}
        <Skeleton className='h-8 w-32 mx-auto rounded-full opacity-40' />

        <div className='space-y-4'>
          {/* Headline Skeletons */}
          <Skeleton className='h-12 w-[80%] mx-auto rounded-[1.5rem]' />
          <Skeleton className='h-12 w-[55%] mx-auto rounded-[1.5rem]' />
          
          {/* Tagline Skeleton */}
          <Skeleton className='h-4 w-[40%] mx-auto rounded-lg opacity-30 mt-6' />
        </div>

        <div className='pt-6'>
          {/* CTA Button Skeleton */}
          <Skeleton className='h-16 w-48 mx-auto rounded-[2rem]' />
        </div>
      </section>

      {/* 2. New Arrivals Skeleton */}
      <section className='space-y-8'>
        <div className='flex items-end justify-between px-2'>
          <div className='space-y-3'>
            <Skeleton className='h-4 w-20 rounded-full opacity-30' />
            <Skeleton className='h-8 w-40 rounded-xl' />
          </div>
          <Skeleton className='h-6 w-24 rounded-full opacity-20' />
        </div>
        
        {/* Using the specialized grid skeleton */}
        <ProductGridSkeleton />
      </section>

      {/* 3. Worlds Skeleton */}
      <section className='space-y-8 pt-12 border-t border-kyn-slate-100 dark:border-kyn-slate-800/50'>
        <div className='px-2 space-y-3'>
          <Skeleton className='h-4 w-24 rounded-full opacity-30' />
          <Skeleton className='h-8 w-36 rounded-xl' />
        </div>
        
        <div className='flex gap-4 overflow-x-auto pb-8 -mx-6 px-6'>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className='flex-none w-48 h-40 rounded-[2.5rem] opacity-40' />
          ))}
        </div>
      </section>

    </div>
  )
}
