import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function LibraryPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect to login if they wander here unauthenticated
  if (!user) redirect('/login');

  // Fetch items the user owns, joining product details and their associated assets
  const { data: items, error } = await supabase
    .from('library_items')
    .select(`
      id,
      added_at,
      products (
        id,
        title,
        subtitle,
        world,
        format_label,
        product_assets (
          id,
          label,
          asset_type,
          asset_value
        )
      )
    `)
    .eq('user_id', user.id)
    .order('added_at', { ascending: false });

  const worldAccents = {
    home: 'bg-kyn-green-500',
    lifestyle: 'bg-kyn-caramel-500',
    tools: 'bg-kyn-slate-500',
  };

  return (
    <div className="flex flex-col gap-8 pb-24 animate-in fade-in duration-1000">
      
      {/* 1. Header */}
      <header className="pt-8 px-6">
        <h1 className="text-2xl font-semibold text-kyn-green-700">Your Library</h1>
        <p className="text-sm text-kyn-slate-500">The tools you own in this universe.</p>
      </header>

      {/* 2. The Shelf */}
      <section className="px-6 space-y-6">
        {items?.length === 0 ? (
          <div className="py-20 text-center bg-white border border-kyn-slate-500/10 rounded-[32px] px-8">
            <p className="text-sm text-kyn-slate-400 italic mb-6">Your shelf is currently empty.</p>
            <a href="/" className="text-xs uppercase tracking-widest font-bold text-kyn-green-700 underline decoration-kyn-green-500/30 underline-offset-4">
              Explore the Marketplace
            </a>
          </div>
        ) : (
          items?.map((item: any) => (
            <div 
              key={item.id} 
              className="bg-white border border-kyn-slate-500/10 rounded-[32px] overflow-hidden shadow-sm"
            >
              {/* Asset Header */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${worldAccents[item.products.world as keyof typeof worldAccents]}`} />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-kyn-slate-400">
                    {item.products.format_label}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-kyn-green-700">{item.products.title}</h3>
                  <p className="text-sm text-kyn-slate-500 leading-relaxed">{item.products.subtitle}</p>
                </div>
              </div>

              {/* Downloadable Links */}
              <div className="bg-kyn-mist p-4 flex flex-col gap-2">
                {item.products.product_assets.map((asset: any) => (
                  <a
                    key={asset.id}
                    href={asset.asset_value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full bg-white px-5 py-4 rounded-2xl border border-kyn-slate-500/5 hover:border-kyn-green-700/20 active:scale-[0.98] transition-all group"
                  >
                    <span className="text-sm font-medium text-kyn-slate-700">{asset.label}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-kyn-green-700 opacity-60 group-hover:opacity-100">
                      {asset.asset_type === 'url' ? 'Open link ↗' : 'Download ↓'}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* 3. Help Anchor */}
      <footer className="px-10 text-center">
        <p className="text-[10px] text-kyn-slate-400 leading-relaxed">
          Need help with your assets? <br /> Reach out at <span className="text-kyn-green-700 font-medium">support@kynar.universe</span>
        </p>
      </footer>

    </div>
  );
}
