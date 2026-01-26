import { cn } from '@/shared/utils/formatting'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes < HTMLButtonElement > {
  variant ? : 'primary' | 'secondary' | 'ghost' | 'outline'
  isLoading ? : boolean
}

export const Button = forwardRef < HTMLButtonElement,
  ButtonProps > (
    ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
      const variants = {
        primary: 'bg-kyn-green-500 text-white hover:bg-kyn-green-600 shadow-lg shadow-kyn-green-500/10',
        secondary: 'bg-primary text-white hover:opacity-90',
        ghost: 'bg-transparent hover:bg-kyn-slate-50 dark:hover:bg-kyn-slate-900 text-kyn-slate-600',
        outline: 'border border-kyn-slate-200 dark:border-kyn-slate-800 hover:bg-kyn-slate-50 text-kyn-slate-600',
      }
      
      return (
        <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center px-6 h-12 rounded-2xl font-black italic tracking-tight transition-all active:scale-[0.98] disabled:opacity-50',
          variants[variant],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <span className='mr-2 animate-spin'>⌛</span> : null}
        {children}
      </button>
      )
    }
  )
Button.displayName = 'Button'