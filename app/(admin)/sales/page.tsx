import { createClient } from '@/lib/supabase/server';
import { format } from 'date-fns'; // Recommended for clean date strings

export default async function AdminSalesPage() {
  const supabase = createClient();

  // Fetch purchases with related product and profile info
  const { data: sales, error } = await supabase
    .from('purchases')
    .select(`
      id,
      amount_paid,
      created_at,
      ls_order_id,
      products (title),
      profiles (email)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="text-red-500 p-6">Error loading ledger.</div>;
  }

  // Calculate Total Revenue
  const totalRevenue = sales?.reduce((acc, sale) => acc + (Number(sale.amount_paid) || 0), 0) || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Revenue Hero Card */}
      <header className="bg-kyn-green-700 rounded-[32px] p-8 text-white shadow-xl shadow-kyn-green-700/20">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70 block mb-2">
          Total Revenue
        </span>
        <h1 className="text-4xl font-semibold italic">
          £{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h1>
        <div className="mt-6 flex gap-4 border-t border-white/10 pt-6">
          <div>
            <span className="block text-[10px] uppercase tracking-widest opacity-60">Orders</span>
            <span className="text-lg font-medium">{sales?.length || 0}</span>
          </div>
          <div className="ml-auto text-right">
            <span className="block text-[10px] uppercase tracking-widest opacity-60">Avg. Order</span>
            <span className="text-lg font-medium">
              £{(totalRevenue / (sales?.length || 1)).toFixed(2)}
            </span>
          </div>
        </div>
      </header>

      {/* 2. Transaction List */}
      <section className="space-y-4">
        <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-kyn-slate-400 ml-1">
          Recent Activity
        </h2>

        {sales?.length === 0 ? (
          <div className="py-20 text-center bg-white border border-kyn-slate-500/10 rounded-[32px]">
            <p className="text-sm text-kyn-slate-400 italic">No transactions recorded yet.</p>
          </div>
        ) : (
          sales?.map((sale) => (
            <div 
              key={sale.id} 
              className="bg-white border border-kyn-slate-500/10 p-5 rounded-[28px] shadow-sm flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-kyn-green-700 uppercase tracking-tight">
                    {/* @ts-ignore - handling nested join data */}
                    {sale.products?.title || 'Unknown Product'}
                  </p>
                  <p className="text-sm text-kyn-slate-500 font-medium">
                    {/* @ts-ignore */}
                    {sale.profiles?.email || 'Guest User'}
                  </p>
                </div>
                <span className="text-lg font-semibold text-kyn-green-700">
                  £{sale.amount_paid}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-kyn-slate-500/5">
                <span className="text-[10px] text-kyn-slate-400 font-mono">
                  #{sale.ls_order_id?.split('_').pop() || 'Internal'}
                </span>
                <span className="text-[10px] text-kyn-slate-400">
                  {format(new Date(sale.created_at), 'MMM d, h:mm a')}
                </span>
              </div>
            </div>
          ))
        )}
      </section>

    </div>
  );
}
