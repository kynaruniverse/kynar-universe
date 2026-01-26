'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/features/auth/components/AuthProvider'
import { verifyAdminAccess } from '@/features/auth/actions/auth'
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner'

/**
 * AdminGuard
 * Prevents unauthorized users from accessing the Admin Forge.
 * Checks both Auth session and the 'is_admin' database flag.
 */
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth()
  const [checking, setChecking] = useState(true)
  const router = useRouter()
  
  useEffect(() => {
    // Wait for the auth session to resolve
    if (authLoading) return
    
    // Redirect if no user is found
    if (!user) {
      router.replace('/login')
      return
    }
    
    const verify = async () => {
      // Server-side check of the user's profile role
      const { isAdmin } = await verifyAdminAccess()
      
      if (!isAdmin) {
        console.warn('Unauthorized administrative access attempt:', user.id)
        router.replace('/')
      } else {
        setChecking(false)
      }
    }
    
    verify()
  }, [user, authLoading, router])
  
  if (authLoading || checking) {
    return (
      <div className='min-h-screen w-full flex flex-col items-center justify-center bg-canvas gap-5'>
        <div className='relative flex items-center justify-center'>
          <LoadingSpinner size={24} />
          <div className='absolute inset-0 bg-kyn-green-500/10 blur-xl rounded-full animate-pulse' />
        </div>
        <div className='flex flex-col items-center gap-1'>
          <p className='text-[10px] font-black text-kyn-slate-400 uppercase tracking-[0.25em]'>
            Establishing
          </p>
          <p className='text-[10px] font-black text-primary uppercase tracking-[0.25em]'>
            Secure Uplink
          </p>
        </div>
      </div>
    )
  }
  
  return <>{children}</>
}
