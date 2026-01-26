'use client'

import { useEffect } from 'react'
import { RefreshCcw, AlertOctagon } from 'lucide-react'

/**
 * Global Error Boundary
 * Catches runtime errors across the app and provides a recovery path.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // In production, you would log this to a service like Sentry
    console.error('System Transmission Error:', error)
  }, [error])

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-6 animate-in fade-in duration-700'>
      <div className='text-center space-y-12 max-w-sm w-full'>
        
        {/* Error Visualizer */}
        <div className='relative mx-auto w-24 h-24'>
          <div className='absolute inset-0 bg-red-500/20 blur-[40px] rounded-full animate-pulse' />
          <div className='relative bg-surface border border-red-500/10 p-6 rounded-[2.5rem] shadow-2xl flex items-center justify-center'>
            <AlertOctagon className='text-red-500' size={40} strokeWidth={2.5} />
          </div>
        </div>

        {/* Messaging */}
        <div className='space-y-4'>
          <h2 className='text-4xl font-black text-primary tracking-tight italic'>
            Transmission Error
          </h2>
          <p className='text-sm font-medium text-kyn-slate-500 dark:text-kyn-slate-400 leading-relaxed max-w-[260px] mx-auto'>
            The connection to the Kynar Forge was interrupted. Attempting to restore uplink...
          </p>
        </div>

        {/* Recovery Action */}
        <button
          onClick={() => reset()}
          className='
            group w-full flex items-center justify-center gap-4 
            bg-primary text-white py-5 rounded-[1.5rem] 
            font-black text-[10px] uppercase tracking-[0.2em] 
            shadow-2xl shadow-primary/20 hover:bg-red-600 
            transition-all active:scale-[0.97]
          '
        >
          <RefreshCcw size={16} className='group-hover:rotate-180 transition-transform duration-700' />
          Re-establish Connection
        </button>
        
        {/* Subtle technical feedback */}
        {error.digest && (
          <p className='text-[8px] font-mono text-kyn-slate-400 uppercase tracking-widest opacity-50'>
            ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
