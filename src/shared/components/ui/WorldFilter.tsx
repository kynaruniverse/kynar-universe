'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { WORLDS } from '@/shared/constants/worlds'

/**
 * FilterContent
 * Handles the logic for generating world-specific filtering links.
 */
function FilterContent() {
  const searchParams = useSearchParams()
  const currentWorld = searchParams.get('world')
  const query = searchParams.get('q')

  const getLink = (worldName?: string) => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (worldName) {
      params.set('world', worldName.toLowerCase())
    }
    
    const queryString = params.toString()
    return `/store${queryString ? `?${queryString}` : ''}`
  }

  return (
    <div className='flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar'>
      <Link 
        href={getLink()}
        className={`
          whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all
          ${!currentWorld 
            ? 'bg-primary text-white border-primary shadow-xl' 
            : 'bg-surface text-kyn-slate-400 border-kyn-slate-100 dark:border-kyn-slate-800'}
        `}
      >
        All Dimensions
      </Link>
      
      {WORLDS.map((w) => {
        const isActive = currentWorld === w.toLowerCase()
        return (
          <Link 
            key={w} 
            href={getLink(w)}
            className={`
              whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all
              ${isActive 
                ? 'bg-kyn-green-600 text-white border-kyn-green-600 shadow-lg shadow-kyn-green-600/20' 
                : 'bg-surface text-kyn-slate-400 border-kyn-slate-100 dark:border-kyn-slate-800'}
            `}
          >
            {w}
          </Link>
        )
      })}
    </div>
  )
}

/**
 * Exported WorldFilter with Suspense Boundary.
 * Essential for Next.js 15 route segment optimization.
 */
export default function WorldFilter() {
  return (
    <Suspense fallback={<div className='h-12 w-full animate-pulse bg-kyn-slate-50 dark:bg-kyn-slate-900 rounded-2xl' />}>
      <FilterContent />
    </Suspense>
  )
}
