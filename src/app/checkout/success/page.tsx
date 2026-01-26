'use client'

import { useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, ArrowRight, Library, Sparkles } from 'lucide-react'
import { Skeleton } from '@/shared/components/ui/Skeleton'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  useEffect(() => {
    // Analytics or pixel tracking would fire here
    if (orderId) {
      console.log(`Transaction ${orderId} verified. Syncing vault...`)
    }
  }, [orderId])

  return (
    <div className='min-h-[85vh] flex flex-col items-center justify-center px-6 py-12 text-center animate-in fade-in zoom-in-95 duration-1000'>
      
      {/* 1. Success Aura */}
      <div className='relative mb-10'>
        <div className='absolute inset-0 bg-kyn-green-500 blur-[60px] opacity-20 animate-pulse' />
        <div className='relative bg-surface dark:bg-kyn-slate-900 p-6 rounded-[2.5rem] shadow-2xl border border-kyn-green-100 dark:border-kyn-green-900/30'>
          <CheckCircle2 size={56} className='text-kyn-green-500' strokeWidth={2.5} />
        </div>
        <Sparkles className='absolute -top-3 -right-3 text-kyn-caramel-500 animate-bounce' size={28} />
      </div>

      {/* 2. Success Messaging */}
      <div className='space-y-4 mb-12'>
        <h1 className='text-4xl font-black text-primary tracking-tight italic'>
          Artifact Secured
        </h1>
        <p className='text-kyn-slate-500 dark:text-kyn-slate-400 text-sm max-w-[280px] mx-auto font-medium leading-relaxed'>
          Your digital tools are being synchronized with your identity. Check your library in a few moments.
        </p>
      </div>

      {/* 3. Navigation Actions */}
      <div className='w-full max-w-xs space-y-4'>
        <Link 
          href='/account' 
          className='
            flex items-center justify-center gap-3 w-full py-5 
            bg-primary text-white rounded-[1.5rem] 
            font-black text-[10px] uppercase tracking-[0.2em]
            shadow-2xl shadow-primary/20 hover:bg-kyn-green-600 
            transition-all active:scale-[0.97]
          '
        >
          <Library size={18} />
          Access My Library
        </Link>
        
        <Link 
          href='/store' 
          className='
            flex items-center justify-center gap-2 w-full py-4 
            text-kyn-slate-400 font-black text-[10px] uppercase tracking-widest
            hover:text-primary transition-colors
          '
        >
          Explore More Artifacts
          <ArrowRight size={14} className='opacity-50' />
        </Link>
      </div>

      {/* 4. Digital Receipt Footer */}
      <div className='mt-20 pt-8 border-t border-kyn-slate-100 dark:border-kyn-slate-800/50 w-full max-w-sm'>
        <div className='bg-surface/50 p-4 rounded-2xl inline-block border border-kyn-slate-100 dark:border-kyn-slate-800/50'>
          <p className='text-[10px] font-black uppercase tracking-widest text-kyn-slate-400 mb-1'>
            Transmission ID
          </p>
          <p className='font-mono text-xs text-primary'>
            {orderId || 'AUTHENTICATING...'}
          </p>
        </div>
        <p className='text-[10px] text-kyn-slate-400 mt-6 leading-relaxed'>
          A verification receipt has been dispatched to your email.<br />
          For technical support, please contact the Kynar Forge.
        </p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessLoading />}>
      <SuccessContent />
    </Suspense>
  )
}

function SuccessLoading() {
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center px-6 space-y-8'>
      <Skeleton className='h-24 w-24 rounded-[2.5rem]' />
      <div className='space-y-3 flex flex-col items-center'>
        <Skeleton className='h-8 w-48 rounded-xl' />
        <Skeleton className='h-4 w-64 rounded-lg' />
      </div>
      <Skeleton className='h-16 w-full max-w-xs rounded-[1.5rem]' />
    </div>
  )
}
