import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Plus, Edit2, Eye } from 'lucide-react';

// 1. Define the Interface so TypeScript knows what a Product looks like
interface Product {
  id: string;
  title: string;
  slug: string;
  world: string;
  is_published: boolean;
  created_at: string;
}

// Force dynamic so the list is always fresh
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 2. Fetch data (Notice we don't alias to 'products' immediately)
  const { data } = await supabase
    .from('products')
    .select('id, title, slug, world, is_published, created_at')
    .order('created_at', { ascending: false });

  // 3. Explicitly tell TypeScript: "Trust me, this data is a list of Products"
  const products = (data as Product[]) || [];

  const { count: totalPurchases } = await supabase
    .from('purchases')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');

  // 4. Now these filters work perfectly because TS knows 'is_published' exists
  const publishedCount = products.filter(p => p.is_published).length;
  const draftCount = products.filter(p => !p.is_published).length;

  return (
    <div className="space-y-6">
      
      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-kyn-slate-800 p-4 rounded-xl border border-kyn-slate-200 dark:border-kyn-slate-700">
          <p className="text-xs text-kyn-slate-500 font-medium">Published</p>
          <p className="text-2xl font-bold text-kyn-green-600">{publishedCount}</p>
        </div>
        <div className="bg-white dark:bg-kyn-slate-800 p-4 rounded-xl border border-kyn-slate-200 dark:border-kyn-slate-700">
          <p className="text-xs text-kyn-slate-500 font-medium">Drafts</p>
          <p className="text-2xl font-bold text-kyn-slate-600">{draftCount}</p>
        </div>
        <div className="bg-white dark:bg-kyn-slate-800 p-4 rounded-xl border border-kyn-slate-200 dark:border-kyn-slate-700">
          <p className="text-xs text-kyn-slate-500 font-medium">Sales</p>
          <p className="text-2xl font-bold text-kyn-slate-900 dark:text-white">{totalPurchases || 0}</p>
        </div>
      </div>

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
        {products.map((product) => (
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
              <Link 
                href={`/admin/products/${product.id}`}
                className="text-kyn-slate-400 hover:text-blue-600"
              >
                <Edit2 size={18} />
              </Link>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="p-8 text-center text-kyn-slate-500">
            No products found. Add your first one!
          </div>
        )}
      </div>
    </div>
  );
}
