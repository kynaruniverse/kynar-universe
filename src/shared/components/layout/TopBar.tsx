'use client'

import Link from 'next/link'
import { Store, User } from 'lucide-react'
import { useAuth } from '@/features/auth/components/AuthProvider'

export default function TopBar() {
  const { user, loading } = useAuth()

  return (
    <header 
      className='fixed top-0 left-0 right-0 z-50 h-16 
      bg-canvas/80 backdrop-blur-md 
      border-b border-kyn-slate-100 dark:border-kyn-slate-800
      transition-all duration-300'
    >
      <div className='max-w-md mx-auto px-6 h-full flex items-center justify-between'>
        {/* Logo */}
        <Link 
          href='/' 
          className='font-black text-xl tracking-tighter text-primary italic'
        >
          KYNAR<span className='text-kyn-green-500'>.</span>
        </Link>

        {/* Icons (Right Side) */}
        <div className='flex items-center gap-1'>
          {/* Store / Browse Link */}
          <Link 
            href='/store' 
            aria-label='Browse store'
            className='p-2.5 text-kyn-slate-400 hover:text-primary transition-colors'
          >
            <Store size={20} strokeWidth={2.5} />
          </Link>
          
          {/* Smart User Link */}
          {!loading && (
            <Link 
              href={user ? '/account' : '/login'}
              aria-label={user ? 'My account' : 'Log in'}
              className={`
                p-2.5 rounded-xl transition-all
                ${user 
                  ? 'text-kyn-green-600 bg-kyn-green-50 dark:bg-kyn-green-900/20' 
                  : 'text-kyn-slate-400 hover:text-primary'}
              `}
            >
              <User size={20} strokeWidth={2.5} />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
