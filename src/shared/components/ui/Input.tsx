import { cn } from '@/shared/utils/formatting'
import { InputHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes < HTMLInputElement > {
  error ? : string
}

export const Input = forwardRef < HTMLInputElement,
  InputProps > (
    ({ className, error, ...props }, ref) => {
      return (
        <div className='w-full'>
        <input
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-2xl border border-kyn-slate-100 dark:border-kyn-slate-800 bg-canvas px-4 py-2 text-sm transition-all placeholder:text-kyn-slate-400 focus:outline-none focus:ring-2 focus:ring-kyn-green-500/20 focus:border-kyn-green-500 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className='mt-1.5 ml-1 text-[10px] font-bold text-red-500 uppercase tracking-widest'>{error}</p>}
      </div>
      )
    }
  )
Input.displayName = 'Input'