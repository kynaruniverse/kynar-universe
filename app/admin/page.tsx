import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, Edit2, Eye, TrendingUp, FileText, ShoppingBag, PackageOpen } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import type { Product } from '@/lib/types';

// Force dynamic rendering to ensure admin data is always fresh
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 1. Initialize Server Client (Cookies)
  const supabase = await createClient();

  // 2. Security Check: Verify User
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect('/login');
  }

  // 3. Check Admin Role (Double security)
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) {
    redirect('/');
  }

  // 4. Fetch Products
  const { data: productData } = await supabase
    .from('products')
    .select('id, title, slug, world, is_published, created_at, price_id')
    .order('created_at', { ascending: false });

  const products = (productData as Product[]) || [];

  // 5. Fetch Stats (Sales Count)
  const { count: totalPurchases } = await supabase
    .from('purchases')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');

  // Calculate Derived Stats
  const publishedCount = products.filter(p => p.is_published).length;
  const draftCount = products.filter(p => !p.is_published).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* --- Page Header --- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Dashboard
          </h1>
          <p className="text-sm text-kyn-slate-500 mt-1">
            Overview of your digital empire.
          </p>
        </div>
        <Link 
          href="/admin/products/new"
          className="
            bg-kyn-green-600 hover:bg-kyn-green-700 text-white 
            px-5 py-2.5 rounded-full text-sm font-bold 
            flex items-center gap-2 shadow-lg shadow-kyn-green-900/10 
            transition-all active:scale-[0.98]
          "
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Product
        </Link>
      </div>

      {/* --- Stats Overview --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          label="Total Sales" 
          value={totalPurchases || 0} 
          icon={TrendingUp}
          color="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
        />
        <StatCard 
          label="Live Products" 
          value={publishedCount} 
          icon={ShoppingBag}
          color="bg-kyn-green-50 text-kyn-green-600 dark:bg-kyn-green-900/20 dark:text-kyn-green-400"
        />
        <StatCard 
          label="Drafts" 
          value={draftCount} 
          icon={FileText}
          color="bg-kyn-slate-100 text-kyn-slate-600 dark:bg-kyn-slate-800 dark:text-kyn-slate-400"
        />
      </div>

      {/* --- Products List --- */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-primary">Recent Products</h2>
        
        <div className="bg-surface rounded-2xl border border-kyn-slate-200 dark:border-kyn-slate-800 overflow-hidden shadow-sm">
          {products.length > 0 ? (
            <div className="divide-y divide-kyn-slate-100 dark:divide-kyn-slate-800">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="flex items-center justify-between p-4 hover:bg-kyn-slate-50 dark:hover:bg-kyn-slate-800/50 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <h3 className="font-bold text-primary truncate">
                        {product.title}
                      </h3>
                      <span className={`
                        px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                        ${product.is_published 
                          ? 'bg-kyn-green-100 text-kyn-green-700 dark:bg-kyn-green-900/30 dark:text-kyn-green-400' 
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}
                      `}>
                        {product.is_published ? 'Live' : 'Draft'}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-kyn-slate-500 gap-2">
                      <span className="capitalize">{product.world}</span>
                      <span>•</span>
                      <span className="font-mono">
                        {/* Display simplified Price ID or placeholder if we add real price col later */}
                        {product.price_id ? 'Linked' : 'No Price'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/product/${product.slug}`}
                      className="p-2 text-kyn-slate-400 hover:text-kyn-green-600 hover:bg-kyn-green-50 dark:hover:bg-kyn-green-900/20 rounded-lg transition-colors"
                      title="View Live Page"
                      target="_blank"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link 
                      href={`/admin/products/${product.id}`}
                      className="p-2 text-kyn-slate-400 hover:text-primary hover:bg-kyn-slate-100 dark:hover:bg-kyn-slate-800 rounded-lg transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-kyn-slate-100 dark:bg-kyn-slate-800 text-kyn-slate-400 rounded-full flex items-center justify-center mb-3">
                <PackageOpen size={24} />
              </div>
              <p className="text-kyn-slate-500 mb-4 font-medium">No products found yet.</p>
              <Link 
                href="/admin/products/new"
                className="text-sm font-bold text-kyn-green-600 hover:underline"
              >
                Create your first product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper Component for Stats
function StatCard({ label, value, icon: Icon, color }: { label: string, value: number, icon: any, color: string }) {
  return (
    <div className="bg-surface p-5 rounded-2xl border border-kyn-slate-200 dark:border-kyn-slate-800 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs text-kyn-slate-500 font-bold uppercase tracking-wider mb-1">{label}</p>
        <p className="text-3xl font-bold text-primary">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  );
}
