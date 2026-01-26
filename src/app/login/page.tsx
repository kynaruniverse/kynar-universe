'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlertCircle, CheckCircle, Loader2, Sparkles } from 'lucide-react'
import { rateLimit, cleanupRateLimits } from '@/features/auth/lib/rate-limit'
import { getCheckoutIntent } from '@/features/products/lib/checkout'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectedFrom = searchParams.get('redirectedFrom')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // 1. Security: Rate Limiting
    cleanupRateLimits()
    const { success, resetIn } = rateLimit(email, 5, 300000) 
    
    if (!success) {
      setMessage({ 
        type: 'error', 
        text: `Security lockout: Retry in ${Math.ceil(resetIn / 60)} minutes.`
      })
      setLoading(false)
      return
    }

    // 2. Auth Execution
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage({ type: 'error', text: error.message })
      setLoading(false)
    } else {
      // 3. Smart Routing
      const checkoutRedirect = getCheckoutIntent()
      
      if (checkoutRedirect) {
        window.location.href = checkoutRedirect
      } else if (redirectedFrom) {
        router.push(redirectedFrom)
      } else {
        router.push('/account')
      }
      router.refresh()
    }
  }

  const handleSignUp = async () => {
    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Access keys must be 6+ characters.' })
      return
    }

    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ 
        type: 'success', 
        text: 'Universe access pending. Verify your transmission (inbox).' 
      })
      setPassword('')
    }
    setLoading(false)
  }

  return (
    <div className='px-6 py-12 max-w-md mx-auto min-h-[85vh] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000'>
      
      <div className='text-center space-y-4 mb-12'>
        <div className='inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-surface border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-xl text-kyn-green-500 mb-2'>
          <Sparkles size={36} />
        </div>
        <div className='space-y-1'>
          <h1 className='text-4xl font-black text-primary tracking-tight italic'>
            Kynar Portal
          </h1>
          <p className='text-kyn-slate-400 text-[10px] font-black uppercase tracking-[0.3em]'>
            Initialize Connection
          </p>
        </div>
      </div>

      <form onSubmit={handleLogin} className='space-y-8'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-400 ml-1'>
              Identity
            </label>
            <input
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className='w-full px-6 py-5 rounded-[1.5rem] bg-surface/50 backdrop-blur-sm border border-kyn-slate-100 dark:border-kyn-slate-800 text-primary font-bold focus:ring-4 focus:ring-kyn-green-500/5 focus:border-kyn-green-500/50 outline-none transition-all disabled:opacity-50'
              placeholder='user@kynar.io'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-400 ml-1'>
              Access Key
            </label>
            <input
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className='w-full px-6 py-5 rounded-[1.5rem] bg-surface/50 backdrop-blur-sm border border-kyn-slate-100 dark:border-kyn-slate-800 text-primary font-bold focus:ring-4 focus:ring-kyn-green-500/5 focus:border-kyn-green-500/50 outline-none transition-all disabled:opacity-50'
              placeholder='••••••••'
            />
          </div>
        </div>

        {message && (
          <div className={`p-5 rounded-[1.5rem] text-xs flex items-start gap-4 border animate-in slide-in-from-top-2 ${
            message.type === 'error' 
              ? 'bg-red-500/5 border-red-500/10 text-red-600 dark:text-red-400' 
              : 'bg-kyn-green-500/5 border-kyn-green-500/10 text-kyn-green-600 dark:text-kyn-green-400'
          }`}>
            {message.type === 'error' ? <AlertCircle size={18} className='shrink-0' /> : <CheckCircle size={18} className='shrink-0' />}
            <span className='font-bold leading-normal'>{message.text}</span>
          </div>
        )}

        <div className='space-y-4'>
          <button
            type='submit'
            disabled={loading}
            className='w-full py-5 rounded-[1.5rem] font-black text-white bg-primary hover:bg-kyn-green-600 transition-all active:scale-[0.97] disabled:opacity-70 shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px]'
          >
            {loading ? <Loader2 className='animate-spin' size={16} /> : null}
            {loading ? 'Authenticating...' : 'Establish Link'}
          </button>

          <button
            type='button'
            onClick={handleSignUp}
            disabled={loading}
            className='w-full py-4 rounded-[1.5rem] font-black text-kyn-slate-400 hover:text-primary hover:bg-surface transition-all uppercase tracking-widest text-[9px]'
          >
            Request New Identity
          </button>
        </div>
      </form>
    </div>
  )
}
