import { supabase } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { notFound } from 'next/navigation';
import { Orbit, Home, Heart, Hammer } from 'lucide-react';

export default async function WorldPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const worldName = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  // 1. World-Specific Theme Config (Brand Guide 2.0)
  const themes: Record<string, any> = {
    Home: {
      color: 'text-kyn-green-600',
      bg: 'bg-kyn-green-50/50',
      darkBg: 'dark:bg-kyn-green-900/10',
      icon: Home,
      tagline: 'Make life less chaotic.'
    },
    Lifestyle: {
      color: 'text-kyn-caramel-500',
      bg: 'bg-kyn-caramel-50/50',
      darkBg: 'dark:bg-kyn-caramel-900/10',
      icon: Heart,
      tagline: 'Build better habits.'
    },
    Tools: {
      color: 'text-kyn-slate-500',
      bg: 'bg-kyn-slate-50/50',
      darkBg: 'dark:bg-kyn-slate-800/50',
      icon: Hammer,
      tagline: 'Accelerate your projects.'
    }
  };

  const theme = themes[worldName];
  if (!theme) notFound();

  // 2. Data Fetch
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('world', worldName)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  const Icon = theme.icon;

  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 pb-32">
      {/* Dynamic World Header */}
      <header className={`relative overflow-hidden px-6 py-16 border-b border-kyn-slate-100 dark:border-kyn-slate-800 ${theme.bg} ${theme.darkBg}`}>
        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <div className={`inline-flex p-4 rounded-3xl bg-white dark:bg-kyn-slate-900 shadow-sm mb-6 ${theme.color}`}>
            <Icon size={32} />
          </div>
          
          <h1 className="text-4xl font-black uppercase tracking-tighter text-kyn-slate-900 dark:text-white mb-2 leading-none">
            {worldName} <span className={theme.color}>World</span>
          </h1>
          
          <p className="text-sm font-medium italic text-kyn-slate-500 dark:text-kyn-slate-400">
            "{theme.tagline}"
          </p>
        </div>
        
        {/* Subtle Orbit Decoration */}
        <Orbit className="absolute -right-8 -bottom-8 w-40 h-40 text-kyn-slate-200/20 dark:text-white/5 rotate-12" />
      </header>

      {/* World-Specific Grid */}
      <main className="p-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-400">
            Showing {products?.length || 0} Assets
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {products && products.length > 0 ? (
            products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-kyn-slate-300">
                New assets arriving soon in the {worldName} World.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
