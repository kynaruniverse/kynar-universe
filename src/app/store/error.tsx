'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RefreshCcw } from 'lucide-react'

export default function StoreError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => console.error('Store boundary glitch:', error), [error])
  
  return (
    <div className='min-h-[60vh] flex items-center justify-center px-6'>
      <div className='text-center space-y-8 max-w-sm'>
        <div className='space-y-3'>
          <h2 className='text-2xl font-black text-primary uppercase italic'>Archive Offline</h2>
          <p className='text-sm text-kyn-slate-500 font-medium'>
            We couldn't reach the artifact database. Let's try to reconnect.
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          <button
            onClick={() => reset()}
            className='flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest'
          >
            <RefreshCcw size={16} />
            Retry Connection
          </button>
          
          <Link 
            href='/' 
            className='flex items-center justify-center gap-3 bg-surface border border-kyn-slate-100 dark:border-kyn-slate-800 py-4 rounded-2xl font-black text-xs uppercase tracking-widest'
          >
            <Home size={16} />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
