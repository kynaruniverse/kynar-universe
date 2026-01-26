'use client'

import { useEffect } from 'react'
import { RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function ProductError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => console.error('Product route glitch:', error), [error])
  
  return (
    <div className='min-h-[70vh] flex flex-col items-center justify-center px-6 text-center space-y-8'>
      <div className='space-y-2'>
        <h2 className='text-2xl font-black text-primary uppercase italic'>Asset Unreachable</h2>
        <p className='text-sm text-kyn-slate-500 max-w-[240px]'>
          The intelligence for this artifact could not be decrypted.
        </p>
      </div>

      <div className='flex flex-col w-full max-w-[200px] gap-3'>
        <button 
          onClick={() => reset()} 
          className='bg-primary text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2'
        >
          <RefreshCcw size={14} />
          Retry Sync
        </button>
        <Link 
          href='/store'
          className='bg-surface border border-kyn-slate-100 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2'
        >
          <Home size={14} />
          Back to Store
        </Link>
      </div>
    </div>
  )
}
