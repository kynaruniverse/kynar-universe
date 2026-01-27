'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Download, ExternalLink, RefreshCcw } from 'lucide-react'
import { useAuth } from '@/features/auth/components/AuthProvider'
import { Skeleton } from '@/shared/components/ui/Skeleton'
import { WORLD_CONFIG } from '@/shared/constants/worlds'
import type { World } from '@/lib/types/models'
import NoPurchases from '@/shared/components/feedback/empty-states/NoPurchases'
import { formatDate } from '@/shared/utils/formatting'
import { getUserPurchases } from '@/features/products/actions/purchases'

interface PurchaseWithProduct {
  id: string
  purchase_date: string
  product: {
    id: string
    title: string
    slug: string
    world: World
    content_url: string | null
    preview_image: string | null
    category: string
  } | null
}

export default function AccountPage() {
  const { user, loading, signOut } = useAuth()
  const [purchases, setPurchases] = useState<PurchaseWithProduct[]>([])
  const [fetching, setFetching] = useState(true)
  const router = useRouter()

  const fetchPurchases = useCallback(async (userId: string) => {
    try {
      setFetching(true)
      const data = await getUserPurchases(userId)
      // Cast to our local interface to ensure the .map() below knows 
      // exactly what 'item.product' contains.
      setPurchases((data || []) as unknown as PurchaseWithProduct[])
    } catch (err) {
      console.error('Error loading library:', err)
      setPurchases([])
    } finally {
      setFetching(false)
    }
  }, [])


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
    if (user) {
      fetchPurchases(user.id)
    }
  }, [user, loading, router, fetchPurchases])

  if (loading || !user) {
    return (
      <div className='px-6 py-8 space-y-10'>
        <Skeleton className='h-12 w-48 rounded-xl' />
        <Skeleton className='h-64 w-full rounded-[2rem]' />
      </div>
    )
  }

  return (
    <div className='px-6 py-8 space-y-10 pb-32 animate-in fade-in duration-700'>
      
      {/* Identity Header */}
      <div className='flex items-start justify-between'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-black text-primary tracking-tight italic uppercase'>Library</h1>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-kyn-green-500 animate-pulse' />
            <p className='text-[10px] font-bold text-kyn-slate-400 uppercase tracking-widest truncate max-w-[180px]'>
              {user.email}
            </p>
          </div>
        </div>
        <button 
          onClick={() => signOut()}
          className='p-3 bg-surface text-kyn-slate-400 rounded-2xl hover:text-red-500 transition-colors border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-sm'
        >
          <LogOut size={20} />
        </button>
      </div>

      <section className='space-y-6'>
        <div className='flex items-center justify-between px-1'>
           <h2 className='text-xs font-black uppercase tracking-[0.2em] text-kyn-slate-400'>Your Assets</h2>
           <button 
             onClick={() => fetchPurchases(user.id)}
             disabled={fetching}
             className='text-kyn-green-600 dark:text-kyn-green-400 p-1 hover:rotate-180 transition-transform duration-500 disabled:opacity-50'
           >
             <RefreshCcw size={16} />
           </button>
        </div>

        {fetching ? (
          <div className='grid gap-6'>
            {[1, 2].map((i) => (
              <Skeleton key={i} className='h-44 w-full rounded-[2rem]' />
            ))}
          </div>
        ) : purchases.length === 0 ? (
          <NoPurchases />
        ) : (
          <div className='grid gap-6'>
            {purchases.map((item) => {
              if (!item.product) return null
              
              const worldInfo = WORLD_CONFIG[item.product.world as keyof typeof WORLD_CONFIG]
              const theme = worldInfo?.colorClasses
              const formattedDate = formatDate(item.purchase_date)
              
              return (
                <div 
                  key={item.id} 
                  className='group relative bg-surface p-6 rounded-[2rem] border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-sm overflow-hidden'
                >
                  {/* Subtle Themed Glow */}
                  <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 ${theme?.bg || 'bg-kyn-slate-500'}`} />

                  <div className='relative flex flex-col gap-6'>
                    <div className='flex justify-between items-start'>
                      <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                          <span className={`text-[9px] font-black uppercase tracking-widest ${theme?.text || 'text-kyn-slate-500'}`}>
                            {item.product.world} • {item.product.category}
                          </span>
                          <span className='text-[10px] font-bold text-kyn-slate-300'>•</span>
                          <span className='text-[9px] font-bold text-kyn-slate-400 uppercase tracking-widest'>
                            Purchased {formattedDate}
                          </span>
                        </div>
                        <h3 className='text-xl font-black text-primary leading-tight italic'>
                          {item.product.title}
                        </h3>
                      </div>
                      <Link 
                        href={`/product/${item.product.slug}`}
                        className='p-2 text-kyn-slate-300 hover:text-primary transition-colors'
                      >
                        <ExternalLink size={18} />
                      </Link>
                    </div>

                    <div className='flex gap-3'>
                      {item.product.content_url ? (
                        <a 
                          href={`/api/download?productId=${item.product.id}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/10 hover:opacity-90 active:scale-[0.97] transition-all'
                        >
                          <Download size={16} strokeWidth={3} />
                          Access Artifact
                        </a>
                      ) : (
                        <div className='flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-kyn-slate-400 bg-kyn-slate-50 dark:bg-kyn-slate-900 rounded-2xl border border-kyn-slate-100 dark:border-kyn-slate-800'>
                          <RefreshCcw size={14} className='animate-spin' />
                          Decrypting Files...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
