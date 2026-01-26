import Link from 'next/link'
import { LayoutDashboard, ShieldAlert } from 'lucide-react'

export default function AdminNotFound() {
  return (
    <div className='min-h-[70vh] flex flex-col items-center justify-center px-6'>
      <div className='text-center space-y-10 max-w-sm'>
        <div className='relative mx-auto w-20 h-20'>
          <div className='absolute inset-0 bg-primary/10 blur-3xl rounded-full animate-pulse' />
          <div className='relative bg-surface border border-kyn-slate-100 dark:border-kyn-slate-800 p-5 rounded-[2rem] flex items-center justify-center shadow-xl'>
            <ShieldAlert size={36} className='text-primary' />
          </div>
        </div>

        <div className='space-y-4'>
          <h2 className='text-3xl font-black text-primary tracking-tight italic'>
            Sector Offline
          </h2>
          <p className='text-sm font-medium text-kyn-slate-500 leading-relaxed'>
            The administrative sector you are looking for has either been decommissioned or moved to another coordinate.
          </p>
        </div>

        <Link 
          href='/admin' 
          className='
            inline-flex items-center justify-center gap-3 bg-primary text-white 
            px-10 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] 
            shadow-2xl shadow-primary/20 hover:bg-kyn-green-600 transition-all active:scale-[0.97]
          '
        >
          <LayoutDashboard size={16} />
          Command Center
        </Link>
      </div>
    </div>
  )
}
