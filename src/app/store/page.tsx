import { Metadata } from 'next'
import { PackageX, Sparkles } from 'lucide-react'
import { getAllProducts } from '@/features/products/services/products.server'
import ProductCard from '@/features/products/components/ProductCard'
import StoreSearch from '@/shared/components/ui/StoreSearch'
import WorldFilter from '@/shared/components/ui/WorldFilter'
// FIX: Use named import to match our new named export
import { EmptyState } from '@/shared/components/feedback/EmptyState'
import type { Product } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Archive | Kynar Universe',
  description: 'Discover digital artifacts across all dimensions.',
}

export const revalidate = 60 // ISR: Revalidate every minute

interface StoreProps {
  searchParams: Promise<{ world?: string; q?: string }>
}

export default async function StorePage({ searchParams }: StoreProps) {
  // 1. Await params (Next.js 15 Requirement)
  const { world, q } = await searchParams
  
  // 2. Fetch data using our unified server service
  const allProducts = (await getAllProducts()) as Product[]

  // 3. Server-side filtering logic
  const filteredProducts = allProducts.filter((p) => {
    const matchesWorld = !world || p.world.toLowerCase() === world.toLowerCase()
    const matchesSearch = !q || 
      p.title.toLowerCase().includes(q.toLowerCase()) || 
      p.short_description?.toLowerCase().includes(q.toLowerCase())
    
    return matchesWorld && matchesSearch
  })

  return (
    <div className='px-4 py-8 pb-32 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700'>
      
      {/* Header & Search */}
      <div className='space-y-6'>
        <div className='flex justify-between items-end'>
          <div className='space-y-1'>
            <h1 className='text-4xl font-black text-primary italic tracking-tight uppercase'>The Archive</h1>
            <div className='flex items-center gap-2'>
              <Sparkles size={10} className='text-kyn-green-500' />
              <p className='text-[10px] font-black text-kyn-slate-400 uppercase tracking-[0.2em]'>
                {filteredProducts.length} Artifacts Indexed
              </p>
            </div>
          </div>
        </div>
        
        <StoreSearch />
      </div>

      {/* Dimensional Filter */}
      <WorldFilter />

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 gap-4'>
          {filteredProducts.map((product) => (
            // Pass the typed product safely to the card
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={PackageX}
          title='No Matches Found'
          description={q ? `No artifacts matching "${q}" in this sector.` : 'Sector currently empty.'}
        />
      )}
    </div>
  )
}
