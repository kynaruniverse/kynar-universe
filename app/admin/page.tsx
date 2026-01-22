import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Plus, Edit2, Eye, EyeOff } from 'lucide-react';

// Force dynamic so the list is always fresh
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch ALL products (including drafts)
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-kyn-slate-900 dark:text-white">
          Products
        </h1>
        <Link 
          href="/admin/products/new"
          className="bg-kyn-green-600 hover:bg-kyn-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
        >
          <Plus size={16} />
          Add New
        </Link>
      </div>

      {/* Product List */}
      <div className="bg-white dark:bg-kyn-slate-800 rounded-xl border border-kyn-slate-200 dark:border-kyn-slate-700 overflow-hidden">
        {products?.map((product) => (
          <div 
            key={product.id}
            className="flex items-center justify-between p-4 border-b border-kyn-slate-100 dark:border-kyn-slate-700 last:border-0"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-kyn-slate-900 dark:text-white">
                  {product.title}
                </h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${product.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {product.is_published ? 'LIVE' : 'DRAFT'}
                </span>
              </div>
              <p className="text-xs text-kyn-slate-500 mt-1">
                {product.world} • £5.00
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link 
                href={`/product/${product.slug}`}
                className="text-kyn-slate-400 hover:text-kyn-green-600"
                title="View Live"
              >
                <Eye size={18} />
              </Link>
              {/* Edit Button (We will build this page next) */}
              <Link 
                href={`/admin/products/${product.id}`}
                className="text-kyn-slate-400 hover:text-blue-600"
              >
                <Edit2 size={18} />
              </Link>
            </div>
          </div>
        ))}

        {(!products || products.length === 0) && (
          <div className="p-8 text-center text-kyn-slate-500">
            No products found. Add your first one!
          </div>
        )}
      </div>
    </div>
  );
}
