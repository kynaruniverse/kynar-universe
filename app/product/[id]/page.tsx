import { supabase } from '@/lib/supabase';
import { getCheckoutUrl } from '@/lib/commerce';
import { CheckCircle2, ShoppingBag, Download, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // 1. Fetch Product Data
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) notFound();

  // Note: Ownership check (useIsOwned) is handled on the client side 
  // in a child component or via a Client Action to keep this a Server Component.

  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 pb-40">
      {/* Header Navigation */}
      <nav className="p-6">
        <Link href="/store" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-kyn-slate-400 hover:text-kyn-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={14} />
          Back to Universe
        </Link>
      </nav>

      {/* Hero Visual Section */}
      <section className="px-6 mb-12">
        <div className="max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden bg-white dark:bg-kyn-slate-800 shadow-kyn-lift border border-kyn-slate-100 dark:border-kyn-slate-700">
          <div className="aspect-video w-full relative">
            <img 
              src={product.preview_url || product.thumbnail_url} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="px-6 max-w-2xl mx-auto space-y-12">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-kyn-green-600 mb-3 block">
            {product.world} World Asset
          </span>
          <h1 className="text-4xl font-black text-kyn-slate-900 dark:text-white mb-4 leading-none uppercase tracking-tighter">
            {product.name}
          </h1>
          <p className="text-xl text-kyn-slate-500 dark:text-kyn-slate-400 font-medium italic leading-relaxed">
            "{product.hero_benefit}"
          </p>
        </div>

        {/* Benefit Bullets (Language Guide 3.1) */}
        <section className="grid grid-cols-1 gap-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-400 mb-2">What's Inside</h2>
          {product.whats_included?.map((item: string, i: number) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-kyn-slate-800/50 border border-kyn-slate-50 dark:border-kyn-slate-800">
              <CheckCircle2 size={20} className="text-kyn-green-500 shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-kyn-slate-700 dark:text-kyn-slate-300">{item}</span>
            </div>
          ))}
        </section>

        {/* "Who this is for" Section (Brand Strategy 5.0) */}
        <section className="p-8 rounded-[2rem] bg-kyn-slate-900 text-white dark:bg-white dark:text-kyn-slate-900">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-60">Ideal for you if...</h2>
          <ul className="space-y-4">
            {product.who_it_is_for?.map((text: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-sm font-bold italic">
                <Zap size={16} className="text-kyn-green-400" />
                {text}
              </li>
            ))}
          </ul>
        </section>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 text-kyn-slate-400">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Instant Lifetime Access</span>
        </div>
      </main>

      {/* Fixed Action Bar (UX Guide 9.1) */}
      <div className="fixed bottom-24 inset-x-6 z-40 md:max-w-md md:mx-auto">
        <div className="bg-white/90 dark:bg-kyn-slate-900/90 backdrop-blur-xl border border-kyn-slate-100 dark:border-kyn-slate-800 p-4 rounded-[2rem] shadow-2xl flex items-center justify-between gap-4">
          <div className="pl-4">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-kyn-slate-400 block">Invest</span>
            <span className="text-2xl font-black text-kyn-slate-900 dark:text-white leading-none">£{product.price_gbp}</span>
          </div>
          
          <a 
            href={getCheckoutUrl({ variantId: product.ls_variant_id })}
            className="flex-grow bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-kyn-lift"
          >
            <ShoppingBag size={16} />
            Add to Universe
          </a>
        </div>
      </div>
    </div>
  );
}
