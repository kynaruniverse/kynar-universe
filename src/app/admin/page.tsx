import Link from 'next/link'
import { redirect } from 'next/navigation'
import { verifyAdminAccess } from '@/features/auth/actions/auth' 
import { Plus, Edit2, Eye, TrendingUp, FileText, ShoppingBag, PackageOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types/models'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  // 1. Verify Access
  const { isAdmin } = await verifyAdminAccess()
  
  if (!isAdmin) {
    redirect('/')
  }
  
  const supabase = await createClient()

  // 2. Parallel Data Fetching
  const [productsRes, purchasesRes] = await Promise.all([
    supabase
      .from('products')
      .select('id, title, slug, world, is_published, created_at, price_id')
      .order('created_at', { ascending: false }),
    supabase
      .from('purchases')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed')
  ])

  const products = (productsRes.data as Product[]) || []
  const totalPurchases = purchasesRes.count || 0

  // 3. Derived Metrics
  const publishedCount = products.filter(p => p.is_published).length
  const draftCount = products.filter(p => !p.is_published).length

  return (
    <div className='space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 pb-20'>
      
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-black text-primary italic tracking-tight uppercase'>
            Command Center
          </h1>
          <p className='text-sm text-kyn-slate-500 font-medium'>
            Manage your digital artifacts and indexed sales.
          </p>
        </div>
        <Link 
          href='/admin/products/new'
          className='
            bg-kyn-green-600 hover:bg-kyn-green-500 text-white 
            px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest
            flex items-center justify-center gap-2 shadow-xl shadow-kyn-green-600/20 
            transition-all active:scale-[0.98]
          '
        >
          <Plus size={16} strokeWidth={3} />
          Add Product
        </Link>
      </div>

      {/* Grid Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <StatCard 
          label='Total Sales' 
          value={totalPurchases} 
          icon={TrendingUp}
          color='bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
        />
        <StatCard 
          label='Live Products' 
          value={publishedCount} 
          icon={ShoppingBag}
          color='bg-kyn-green-50 text-kyn-green-600 dark:bg-kyn-green-900/20 dark:text-kyn-green-400'
        />
        <StatCard 
          label='Drafts' 
          value={draftCount} 
          icon={FileText}
          color='bg-kyn-slate-100 text-kyn-slate-600 dark:bg-kyn-slate-800 dark:text-kyn-slate-400'
        />
      </div>

      {/* Recent Inventory */}
      <div className='space-y-4'>
        <h2 className='text-sm font-black text-kyn-slate-400 uppercase tracking-[0.2em]'>Recent Products</h2>
        
        <div className='bg-surface rounded-[2rem] border border-kyn-slate-100 dark:border-kyn-slate-800 overflow-hidden shadow-sm'>
          {products.length > 0 ? (
            <div className='divide-y divide-kyn-slate-50 dark:divide-kyn-slate-800/50'>
              {products.map((product) => (
                <div 
                  key={product.id}
                  className='flex items-center justify-between p-5 hover:bg-kyn-slate-50 dark:hover:bg-kyn-slate-900/50 transition-colors'
                >
                  <div className='min-w-0'>
                    <div className='flex items-center gap-3 mb-1'>
                      <h3 className='font-black text-[15px] text-primary truncate italic'>
                        {product.title}
                      </h3>
                      <span className={`
                        px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider
                        ${product.is_published 
                          ? 'bg-kyn-green-500 text-white' 
                          : 'bg-kyn-slate-200 text-kyn-slate-600 dark:bg-kyn-slate-700 dark:text-kyn-slate-400'}
                      `}>
                        {product.is_published ? 'Live' : 'Draft'}
                      </span>
                    </div>
                    <div className='flex items-center text-[10px] font-bold text-kyn-slate-400 uppercase tracking-widest gap-2'>
                      <span>{product.world}</span>
                      <span>•</span>
                      <span>{product.price_id ? 'Store Linked' : 'No ID'}</span>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Link 
                      href={`/product/${product.slug}`}
                      className='p-3 text-kyn-slate-400 hover:text-kyn-green-500 transition-colors'
                      title='View Live Page'
                      target='_blank'
                    >
                      <Eye size={18} />
                    </Link>
                    <Link 
                      href={`/admin/products/${product.id}`}
                      className='p-3 text-kyn-slate-400 hover:text-primary transition-colors'
                      title='Edit Product'
                    >
                      <Edit2 size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='p-16 text-center flex flex-col items-center justify-center'>
              <PackageOpen size={40} className='text-kyn-slate-200 mb-4' strokeWidth={1} />
              <p className='text-kyn-slate-500 mb-6 font-medium'>Archive is currently empty.</p>
              <Link 
                href='/admin/products/new'
                className='text-xs font-black text-kyn-green-600 uppercase tracking-widest border-b-2 border-kyn-green-600/20 pb-1'
              >
                Create First Artifact
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  color 
}: { 
  label: string
  value: number
  icon: any
  color: string 
}) {
  return (
    <div className='bg-surface p-6 rounded-[2rem] border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-sm flex items-center justify-between'>
      <div>
        <p className='text-[10px] text-kyn-slate-400 font-black uppercase tracking-[0.2em] mb-2'>{label}</p>
        <p className='text-4xl font-black text-primary italic leading-none'>{value}</p>
      </div>
      <div className={`p-4 rounded-2xl ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  )
}
