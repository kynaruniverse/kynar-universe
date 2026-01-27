import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import ProductCard from '@/features/products/components/ProductCard'
// FIX 1: Point to the actual server-side service instead of the schema file
import { getProducts } from '@/features/products/services/products.server'
// FIX 2: Ensure path matches file tree (src/shared/components/feedback/EmptyState.tsx)
import { EmptyState } from '@/shared/components/feedback/EmptyState'
import { WORLD_CONFIG } from '@/shared/constants/worlds'

export const revalidate = 60

export default async function Home() {
  // Fetch products using the server-side service logic
  const products = await getProducts({ limit: 4 })
  
  return (
    <div className='px-6 py-10 space-y-20 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
      
      {/* --- 1. Hero Section --- */}
      <section className='text-center space-y-8 pt-12 pb-4'>
        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-kyn-green-500/5 border border-kyn-green-500/10 backdrop-blur-sm'>
          <Sparkles size={12} className='text-kyn-green-500' />
          <span className='text-[10px] font-black uppercase tracking-[0.3em] text-kyn-green-600 dark:text-kyn-green-400'>
            New Era
          </span>
        </div>

        <div className='space-y-4'>
          <h1 className='text-5xl font-black tracking-tighter text-primary leading-[1]'>
            One universe,<br />
            <span className='text-transparent bg-clip-text bg-gradient-to-br from-kyn-green-600 via-kyn-green-500 to-kyn-green-400'>
              unlimited solutions
            </span>
          </h1>

          <p className='text-kyn-slate-500 dark:text-kyn-slate-400 text-base max-w-[300px] mx-auto font-medium leading-relaxed italic'>
            Curated digital artifacts to orchestrate your home, life, and projects.
          </p>
        </div>

        <div className='pt-6'>
          <Link 
            href='/store' 
            className='
              inline-flex items-center justify-center 
              bg-primary hover:bg-kyn-green-600
              text-white font-black text-xs uppercase tracking-widest
              px-12 py-5 rounded-[2rem] 
              shadow-2xl shadow-primary/20 
              transition-all active:scale-95
            '
          >
            Enter the Store
            <ArrowRight className='ml-3 w-4 h-4 opacity-50' />
          </Link>
        </div>
      </section>

      {/* --- 2. New Arrivals --- */}
      <section className='space-y-8'>
        <div className='flex items-end justify-between px-2'>
          <div className='space-y-1'>
            <h2 className='text-[10px] uppercase tracking-[0.3em] font-black text-kyn-slate-400'>
              The Feed
            </h2>
            <p className='text-xl font-black text-primary italic'>New Arrivals</p>
          </div>
          <Link 
            href='/store' 
            className='text-[10px] uppercase tracking-widest text-kyn-green-600 font-black hover:opacity-70 transition-opacity pb-1'
          >
            Browse All
          </Link>
        </div>
        
        <div className='grid grid-cols-2 gap-4'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {products.length === 0 && (
            <div className='col-span-full'>
              <EmptyState
                title='Scanning the universe...'
                description='New artifacts are being forged as we speak.'
                variant='dashed'
              />
            </div>
          )}
        </div>
      </section>

      {/* --- 3. Browse by World --- */}
      <section className='space-y-8 pt-12 border-t border-kyn-slate-100 dark:border-kyn-slate-800/50'>
         <div className='px-2'>
           <h2 className='text-[10px] uppercase tracking-[0.3em] font-black text-kyn-slate-400'>
            Territories
          </h2>
          <p className='text-xl font-black text-primary italic'>Explore Worlds</p>
        </div>
        
        <div className='flex gap-4 overflow-x-auto pb-8 scrollbar-hide -mx-6 px-6'>
          {(Object.keys(WORLD_CONFIG) as Array<keyof typeof WORLD_CONFIG>).map((worldKey) => {
            const config = WORLD_CONFIG[worldKey]
            return (
              <Link 
                key={worldKey} 
                href={`/store?world=${worldKey.toLowerCase()}`} 
                className={`
                  flex-none w-48 p-6
                  bg-surface border border-kyn-slate-100 dark:border-kyn-slate-800 
                  rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1
                  transition-all active:scale-95 group
                `}
              >
                <div className={`w-8 h-8 rounded-full mb-4 ${config.colorClasses.badge} opacity-20`} />
                <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${config.colorClasses.text}`}>
                  {worldKey}
                </p>
                <p className='text-sm font-bold text-primary group-hover:text-kyn-green-600 transition-colors'>
                  {config.label}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

    </div>
  )
}
