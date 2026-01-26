import Link from 'next/link'
import { Home, Search, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='min-h-[85vh] flex flex-col items-center justify-center px-6 relative overflow-hidden'>
      {/* Background Atmosphere */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-kyn-green-500/10 blur-[100px] rounded-full' />
      
      <div className='relative text-center space-y-12 max-w-sm'>
        <div className='space-y-4'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-kyn-slate-100 dark:border-kyn-slate-800 mb-4 shadow-sm'>
            <Compass size={12} className='text-kyn-green-500 animate-spin-slow' />
            <span className='text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400'>
              Navigation Failure
            </span>
          </div>
          
          <h1 className='text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-primary to-kyn-slate-300 dark:to-kyn-slate-700 leading-none tracking-tighter'>
            404
          </h1>
          
          <h2 className='text-3xl font-black text-primary tracking-tight italic'>
            Lost in the Void
          </h2>
          
          <p className='text-kyn-slate-500 dark:text-kyn-slate-400 text-sm font-medium leading-relaxed max-w-[240px] mx-auto'>
            This sector of the Kynar Universe has either drifted away or never existed.
          </p>
        </div>

        <div className='flex flex-col gap-4 w-full'>
          <Link
            href='/'
            className='
              flex items-center justify-center gap-3 bg-primary text-white 
              px-8 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em]
              shadow-2xl shadow-primary/20 hover:bg-kyn-green-600 transition-all active:scale-[0.97]
            '
          >
            <Home size={16} />
            Return to Core
          </Link>
          
          <Link
            href='/store'
            className='
              flex items-center justify-center gap-3 bg-surface border border-kyn-slate-100 
              dark:border-kyn-slate-800 px-8 py-4 rounded-[1.5rem] 
              font-black text-[10px] uppercase tracking-[0.2em] text-kyn-slate-500
              hover:text-primary hover:border-kyn-slate-300 transition-all
            '
          >
            <Search size={16} />
            Scan Store
          </Link>
        </div>
      </div>
    </div>
  )
}
