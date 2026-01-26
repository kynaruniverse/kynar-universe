import ProductForm from '@/features/admin/components/ProductForm'
import { requireAdmin } from '@/features/auth/lib/server'

export default async function NewProductPage() {
  await requireAdmin()
  
  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto px-4 pb-20'>
      <div className='space-y-1'>
        <h1 className='text-3xl font-black text-primary italic uppercase tracking-tight'>
          Forge New Artifact
        </h1>
        <p className='text-sm text-kyn-slate-500 font-medium'>
          Index a new digital asset into the Kynar Universe.
        </p>
      </div>

      <div className='bg-surface p-8 rounded-[2.5rem] border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-sm'>
        <ProductForm />
      </div>
    </div>
  )
}
