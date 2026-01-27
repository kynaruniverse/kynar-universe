import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import ProductForm from '@/features/admin/components/ProductForm'
import { requireAdmin } from '@/features/auth/actions/auth'

export default async function NewProductPage() {
  // 1. Security Gate: Verify admin privileges before rendering
  await requireAdmin()
  
  return (
    <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto px-4 pb-20'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <Link 
            href='/admin' 
            className='inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-400 hover:text-primary transition-colors mb-4'
          >
            <ChevronLeft size={12} strokeWidth={3} />
            Back to Forge
          </Link>
          <h1 className='text-3xl font-black text-primary italic uppercase tracking-tight'>
            Forge New Artifact
          </h1>
          <p className='text-sm text-kyn-slate-500 font-medium'>
            Index a new digital asset into the Kynar Universe.
          </p>
        </div>
      </div>

      <div className='bg-surface p-10 rounded-[2.5rem] border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-2xl shadow-black/5'>
        {/* Render empty form for new entry */}
        <ProductForm />
      </div>
    </div>
  )
}
