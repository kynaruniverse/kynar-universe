import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function AdminProductsPage() {
  const supabase = createClient();

  // Fetch all products, sorted by most recently created
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="text-red-500">Error loading products.</div>;
  }

  const worldColors = {
    home: 'text-kyn-green-700 bg-kyn-green-500/10',
    lifestyle: 'text-kyn-caramel-500 bg-kyn-caramel-500/10',
    tools: 'text-kyn-slate-500 bg-kyn-slate-500/10',
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Header with Primary Action */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-kyn-green-700">Universe Ledger</h1>
          <p className="text-sm text-kyn-slate-500">Manage your digital assets and status.</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="bg-kyn-green-700 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all"
        >
          + New
        </Link>
      </header>

      {/* 2. Product List */}
      <section className="space-y-4">
        {products?.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-kyn-slate-500/10 rounded-[32px]">
            <p className="text-sm text-kyn-slate-400 italic">No products in the nebula yet.</p>
          </div>
        ) : (
          products?.map((p) => (
            <Link 
              key={p.id} 
              href={`/admin/products/${p.id}`}
              className="group block bg-white border border-kyn-slate-500/10 p-5 rounded-[28px] hover:border-kyn-green-700/30 transition-all shadow-sm active:scale-[0.99]"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-tighter ${worldColors[p.world as keyof typeof worldColors]}`}>
                      {p.world}
                    </span>
                    {!p.is_published && (
                      <span className="text-[9px] font-bold uppercase tracking-tighter text-kyn-slate-400 bg-kyn-slate-100 px-2 py-0.5 rounded-[4px]">
                        Draft
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-kyn-green-700 group-hover:text-kyn-green-600 transition-colors">
                    {p.title}
                  </h3>
                </div>
                <span className="text-sm font-semibold text-kyn-green-700">
                  £{p.price_gbp}
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-kyn-slate-500/5">
                <span className="text-[10px] text-kyn-slate-400 font-medium">
                  ID: {p.lemon_squeezy_variant_id || 'No Variant Link'}
                </span>
                <span className="text-[10px] text-kyn-green-700 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Edit Details →
                </span>
              </div>
            </Link>
          ))
        )}
      </section>

      {/* 3. Global Stats Overlay (Optional) */}
      <footer className="grid grid-cols-2 gap-4">
        <div className="p-6 rounded-[24px] bg-white border border-kyn-slate-500/10">
          <span className="block text-[10px] uppercase tracking-widest text-kyn-slate-400 font-bold mb-1">Total Assets</span>
          <span className="text-2xl font-semibold text-kyn-green-700">{products?.length || 0}</span>
        </div>
        <div className="p-6 rounded-[24px] bg-white border border-kyn-slate-500/10">
          <span className="block text-[10px] uppercase tracking-widest text-kyn-slate-400 font-bold mb-1">Live Tools</span>
          <span className="text-2xl font-semibold text-kyn-green-700">
            {products?.filter(p => p.is_published).length || 0}
          </span>
        </div>
      </footer>
    </div>
  );
}
