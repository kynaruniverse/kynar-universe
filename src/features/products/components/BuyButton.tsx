'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag } from 'lucide-react'
import { openCheckout, saveCheckoutIntent } from '@/features/products/lib/checkout'
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner'

declare global {
  interface Window {
    createLemonSqueezy?: () => void
    LemonSqueezy?: {
      Url: {
        Open: (url: string) => void
      }
      Setup: () => void
    }
  }
}

interface BuyButtonProps {
  variantId: string
  userId?: string
  className?: string
}

export default function BuyButton({ variantId, userId, className }: BuyButtonProps) {
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    // Initialize the Lemon Squeezy script if available in the DOM
    if (typeof window !== 'undefined') {
      window.createLemonSqueezy?.()
      window.LemonSqueezy?.Setup?.()
    }
  }, [])
  
  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (loading) return
    
    setLoading(true)
    
    try {
      const checkoutUrl = variantId.startsWith('http') 
        ? variantId 
        : `https://kynar.lemonsqueezy.com/checkout/buy/${variantId}`

      await openCheckout({
        priceId: variantId,
        userId,
        onUnauthenticated: () => {
          // Store the intent so we can auto-trigger checkout after login
          saveCheckoutIntent(checkoutUrl)
          const returnPath = encodeURIComponent(window.location.pathname)
          // Matches our middleware's expected 'redirectedFrom' param
          window.location.href = `/login?redirectedFrom=${returnPath}`
        },
        embed: true, 
      })
    } catch (error) {
      console.error('Handshake failure with vault:', error)
    } finally {
      // Extended timeout for mobile overlay rendering
      setTimeout(() => setLoading(false), 2500)
    }
  }
  
  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`
        group relative inline-flex items-center justify-center gap-3
        bg-primary text-white
        px-8 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em]
        transition-all hover:opacity-90 active:scale-[0.97]
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-2xl shadow-primary/20
        ${className}
      `}
    >
      {loading ? (
        <div className='flex items-center gap-2'>
          <LoadingSpinner size={16} />
          <span className='animate-pulse'>Syncing...</span>
        </div>
      ) : (
        <>
          <ShoppingBag className='w-4 h-4 transition-transform group-hover:-translate-y-0.5' strokeWidth={3} />
          <span>Acquire Artifact</span>
        </>
      )}
      
      {/* Decorative glow effect */}
      <div className='absolute inset-0 rounded-[1.5rem] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none' />
    </button>
  )
}
