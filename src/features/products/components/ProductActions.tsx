'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ShoppingCart, CreditCard, Sparkles } from 'lucide-react'
import { useAuth } from '@/features/auth/components/AuthProvider'
import { openCheckout, saveCheckoutIntent } from '@/features/products/lib/checkout'
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner'

export default function ProductActions({ 
  checkoutUrl, 
  price 
}: { 
  checkoutUrl: string | null
  price: string
}) {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isProcessing, setIsProcessing] = useState(false)

  const isCartEnabled = false 

  const handleBuy = async () => {
    if (!checkoutUrl || isProcessing) return
    
    setIsProcessing(true)

    try {
      await openCheckout({
        priceId: checkoutUrl,
        userId: user?.id,
        userEmail: user?.email,
        onUnauthenticated: () => {
          saveCheckoutIntent(checkoutUrl)
          // Consistent with our middleware and login redirect logic
          router.push(`/login?redirectedFrom=${encodeURIComponent(pathname)}`)
        },
      })
    } catch (error) {
      console.error('Vault connection failure:', error)
    } finally {
      setTimeout(() => setIsProcessing(false), 2000)
    }
  }

  return (
    <div className='flex flex-col gap-6 pt-4'>
      <div className='flex gap-4'>
        <button 
          onClick={handleBuy}
          disabled={isProcessing || !checkoutUrl}
          className='
            flex-[4] py-5 rounded-[1.5rem] font-black text-white 
            bg-primary hover:bg-kyn-green-600 
            shadow-2xl shadow-primary/20 
            transition-all active:scale-[0.97] disabled:opacity-50 
            flex items-center justify-center gap-4 group
          '
        >
          {isProcessing ? (
            <div className='flex items-center gap-2'>
              <LoadingSpinner size={16} />
              <span className='text-[10px] uppercase tracking-widest'>Syncing...</span>
            </div>
          ) : (
            <>
              <CreditCard size={18} strokeWidth={3} className='group-hover:-rotate-12 transition-transform' />
              <span className='text-[10px] uppercase tracking-[0.2em] font-black'>
                Unlock Artifact
              </span>
              <div className='ml-2 bg-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black border border-white/10 backdrop-blur-sm'>
                {price}
              </div>
            </>
          )}
        </button>
        
        <button 
          disabled={!isCartEnabled}
          className='
            flex-1 px-6 rounded-[1.5rem] 
            bg-surface border border-kyn-slate-100 dark:border-kyn-slate-800 
            text-kyn-slate-200 dark:text-kyn-slate-800 cursor-not-allowed
            flex items-center justify-center transition-colors
          '
        >
          <ShoppingCart size={20} strokeWidth={2} />
        </button>
      </div>

      <div className='flex items-center justify-center gap-3 py-3 rounded-[1.25rem] bg-kyn-green-500/5 border border-kyn-green-500/10'>
        <Sparkles size={12} className='text-kyn-green-500 fill-kyn-green-500/20' />
        <p className='text-[9px] font-black text-kyn-green-600/80 dark:text-kyn-green-400/80 uppercase tracking-[0.2em]'>
          Instant Uplink & Lifetime Ownership
        </p>
      </div>
    </div>
  )
}
