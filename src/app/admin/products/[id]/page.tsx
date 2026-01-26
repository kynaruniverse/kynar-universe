import { notFound } from 'next/navigation'
import { requireAdmin } from '@/features/auth/lib/server'
import { createClient } from '@/lib/supabase/server'
import ProductForm from '@/features/admin/components/ProductForm'

interface EditPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditPageProps) {
  // 1. Await params (Next.js 15 Requirement)
  const { id } = await params
  
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
    <div className='space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto px-4 pb-20'>
      <div className='space-y-1'>
        <h1 className='text-3xl font-black text-primary italic uppercase tracking-tight'>
          Edit Artifact
        </h1>
        <p className='text-sm text-kyn-slate-500 font-medium'>
          Updating: <span className='font-mono text-kyn-green-600'>{product.title}</span>
        </p>
      </div>

      <div className='bg-surface p-8 rounded-[2.5rem] border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-sm'>
        <ProductForm initialData={product} />
      </div>
    </div>
  )
}
