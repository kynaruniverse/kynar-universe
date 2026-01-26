import AdminGuard from '@/features/admin/components/AdminGuard'
import Link from 'next/link'
import { ArrowLeft, LayoutDashboard, Store } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className='min-h-screen bg-canvas pb-24'>
        
        {/* Admin Navigation Bar */}
        <header 
          className='
            sticky top-0 z-40 h-16 px-6
            bg-surface/80 backdrop-blur-xl
            border-b border-kyn-slate-100 dark:border-kyn-slate-800/50
            flex items-center justify-between
          '
        >
          <div className='flex items-center gap-4'>
            <Link 
              href='/' 
              className='text-kyn-slate-400 hover:text-primary transition-colors p-1'
              aria-label='Exit Admin'
            >
              <ArrowLeft size={20} />
            </Link>
            <div className='flex flex-col'>
              <span className='font-black text-xs uppercase tracking-[0.2em] text-primary italic'>
                Kynar OS
              </span>
              <span className='text-[10px] font-bold text-kyn-green-600 dark:text-kyn-green-500 uppercase tracking-widest'>
                Root Access
              </span>
            </div>
          </div>

          <div className='flex items-center gap-2'>
             {/* Link to view live store */}
             <Link 
               href='/store' 
               className='p-2.5 text-kyn-slate-400 hover:text-kyn-green-500 hover:bg-kyn-green-500/5 rounded-xl transition-all'
               title='View Live Store'
             >
                <Store size={20} />
             </Link>
             
             {/* Dashboard Link */}
             <Link 
               href='/admin' 
               className='p-2.5 text-primary hover:bg-primary/5 rounded-xl transition-all'
               title='Command Center'
             >
                <LayoutDashboard size={20} />
             </Link>
          </div>
        </header>

        {/* Admin Content Area */}
        {/* Admin views need slightly more horizontal breathing room than the standard mobile feed */}
        <main className='max-w-4xl mx-auto p-6 animate-in fade-in slide-in-from-top-2 duration-700'>
          {children}
        </main>

      </div>
    </AdminGuard>
  )
}
