import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { requireAdmin } from '@/features/auth/actions/auth'
import { createClient } from '@/lib/supabase/server'
import ProductForm from '@/features/admin/components/ProductForm'

interface EditPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditPageProps) {
  // 1. Await params (Next.js 15 Requirement)
  const { id } = await params
  
  if (!id) notFound()

  // 2. Security Gate
  await requireAdmin()

  const supabase = await createClient()

  // 3. Fetch existing product data
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <div className='space-y-8 animate-in fade-in duration-700 max-w-4xl mx-auto px-4 pb-20'>
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
            Edit Artifact
          </h1>
          <p className='text-sm text-kyn-slate-500 font-medium'>
            Modifying record: <span className='font-mono text-kyn-green-600 bg-kyn-green-500/5 px-2 py-0.5 rounded-lg'>{product.title}</span>
          </p>
        </div>
      </div>

      <div className='bg-surface p-10 rounded-[2.5rem] border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-2xl shadow-black/5'>
        <ProductForm initialData={product} />
      </div>
    </div>
  )
}
