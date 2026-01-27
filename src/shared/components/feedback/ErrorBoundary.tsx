'use client'

import { Component, ReactNode } from 'react'
import { RefreshCcw, AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log the error for internal tracking (consider a logging service for production)
    console.error('Kynar Error Boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // In production, we strictly hide technical details from the user
      // We only allow the dev block if the node environment is specifically 'development'
      const isDev = process.env.NODE_ENV === 'development'

      return this.props.fallback || (
        <div className='min-h-[60vh] flex items-center justify-center px-6 animate-in fade-in duration-500'>
          <div className='text-center space-y-8 max-w-sm'>
            
            {/* Visual Indicator */}
            <div className='relative mx-auto w-20 h-20'>
              <div className='absolute inset-0 bg-red-500/20 blur-2xl rounded-full animate-pulse' />
              <div className='relative bg-surface border border-red-100 dark:border-red-900/30 p-5 rounded-[2rem] shadow-xl flex items-center justify-center'>
                <AlertTriangle className='text-red-500' size={32} />
              </div>
            </div>

            <div className='space-y-3'>
              <h2 className='text-3xl font-black text-primary tracking-tight italic'>
                Universe Glitch
              </h2>
              <p className='text-sm font-medium text-kyn-slate-500 dark:text-kyn-slate-400 leading-relaxed'>
                Something didn't load quite right. Let's try to resync your connection.
              </p>
            </div>

            <button
              onClick={() => {
                this.setState({ hasError: false })
                window.location.reload()
              }}
              className='
                group w-full flex items-center justify-center gap-3 
                bg-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest
                shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-95
              '
            >
              <RefreshCcw size={18} className='group-hover:rotate-180 transition-transform duration-700' />
              Resync Connection
            </button>

            {/* Technical logs only show in development mode */}
            {isDev && (
              <div className='mt-6 p-4 bg-kyn-slate-50 dark:bg-kyn-slate-900 rounded-xl border border-kyn-slate-200 dark:border-kyn-slate-800 text-left overflow-hidden'>
                <p className='text-[10px] font-mono text-kyn-slate-400 uppercase tracking-widest mb-2'>
                  Dev Diagnostic
                </p>
                <p className='text-[10px] font-mono text-red-500 break-words'>
                  {this.state.error?.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
