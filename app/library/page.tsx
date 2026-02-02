/**
 * KYNAR UNIVERSE: The Library Vault (v1.6)
 * Role: A sanctuary of ownership and permanent access.
 * Optimization: Staggered entrance, high-fidelity asset cards.
 */

import { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Download, BookOpen, ShieldCheck, HelpCircle, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Vault | Your Collection",
  description: "A permanent archive of your acquired digital assets.",
};

export default async function LibraryPage() {
  const supabase = await createClient();
  
  // Security is managed by middleware; we fetch the context here.
  const { data: { user } } = await supabase.auth.getUser();

  const { data: items, error } = await supabase
    .from('user_library')
    .select(`
      id,
      acquired_at,
      product:products (
        id,
        title,
        short_description,
        world,
        slug,
        image_url
      )
    `)
    .eq('user_id', user?.id)
    .order('acquired_at', { ascending: false });

  if (error) console.error("[Vault] Sync error:", error.message);

  return (
    <main className="min-h-screen bg-canvas pb-32">
      {/* Handrail: Navigation */}
      <nav className="border-b border-kyn-slate-50 bg-white/50 backdrop-blur-md px-gutter">
        <div className="mx-auto max-w-screen-xl flex h-14 items-center">
          <Breadcrumbs paths={[{ label: 'Library', href: '/library' }]} />
        </div>
      </nav>

      <div className="max-w-screen-xl mx-auto px-gutter">
        <header className="py-16 md:py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-brand text-4xl font-bold text-kyn-slate-900 tracking-tight md:text-6xl">
            Your Collection
          </h1>
          <p className="font-ui text-base text-text-secondary mt-6 max-w-md leading-relaxed">
            A permanent archive of your acquired digital assets. Your tools and intelligence, grounded and secure.
          </p>
        </header>

        <section className="pb-24">
          {!items || items.length === 0 ? (
            /* Reassured Empty State */
            <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-kyn-slate-200 rounded-[2.5rem] bg-surface/50 animate-in fade-in duration-1000">
              <div className="h-20 w-20 flex items-center justify-center rounded-3xl bg-white shadow-kynar-soft text-kyn-slate-200 mb-8">
                <ShieldCheck size={40} strokeWidth={1} />
              </div>
              <h2 className="font-brand text-xl font-bold text-kyn-slate-900">The Vault is Quiet</h2>
              <p className="font-ui text-sm text-text-secondary mt-3 mb-10 max-w-xs">
                You haven't added any technical assets to your universe yet.
              </p>
              <Link href="/store" className="button-primary group">
                Explore Hub
                <ChevronRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {items.map((item: any, index: number) => (
                <article 
                  key={item.id} 
                  className="group flex flex-col bg-white border border-kyn-slate-50 rounded-[2rem] overflow-hidden hover:shadow-kynar-deep transition-all duration-700 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Visual Anchor */}
                  <div className="aspect-[16/10] bg-kyn-slate-50 relative overflow-hidden">
                    {item.product.image_url ? (
                      <Image 
                        src={item.product.image_url} 
                        alt={item.product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-kyn-slate-100">
                        <ShieldCheck size={64} strokeWidth={0.5} />
                      </div>
                    )}
                    
                    {/* World Badge */}
                    <div className="absolute top-5 left-5">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.15em] text-kyn-slate-900 shadow-sm">
                        {item.product.world}
                      </span>
                    </div>
                  </div>

                  {/* Vault Metadata */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock size={12} className="text-kyn-green-600" />
                      <span className="text-[10px] font-bold text-kyn-slate-400 uppercase tracking-widest">
                        Index Date: {new Date(item.acquired_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <h3 className="font-brand text-2xl font-bold text-kyn-slate-900 mb-3 group-hover:text-black transition-colors">
                      {item.product.title}
                    </h3>
                    <p className="font-ui text-sm text-text-secondary mb-10 leading-relaxed line-clamp-2">
                      {item.product.short_description}
                    </p>

                    {/* Action Hub */}
                    <div className="mt-auto space-y-4">
                      <button className="flex items-center justify-center gap-3 w-full bg-kyn-slate-900 py-4 rounded-2xl text-white font-brand text-xs font-bold uppercase tracking-widest hover:bg-black transition-all active:scale-[0.97] shadow-xl shadow-kyn-slate-900/10">
                        <Download size={16} />
                        Access Assets
                      </button>
                      
                      <Link
                        href={`/guides/${item.product.slug}`}
                        className="flex items-center justify-center gap-2 w-full py-2 font-brand text-[10px] font-black text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors uppercase tracking-[0.2em]"
                      >
                        <BookOpen size={14} />
                        Technical Guide
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Support Handrail */}
        <footer className="py-24 flex flex-col items-center border-t border-kyn-slate-50 animate-in fade-in duration-1000 delay-500">
          <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-kyn-slate-50 text-kyn-slate-300 mb-8">
            <HelpCircle size={28} strokeWidth={1.5} />
          </div>
          <p className="text-[10px] text-kyn-slate-400 font-black uppercase tracking-[0.3em] mb-4 text-center">Permanent Collection Support</p>
          <a 
            href="mailto:support@kynaruniverse.com" 
            className="text-lg font-brand font-bold text-kyn-slate-900 hover:text-kyn-green-600 transition-colors underline decoration-kyn-slate-100 underline-offset-8 hover:decoration-kyn-green-500/30"
          >
            support@kynaruniverse.com
          </a>
        </footer>
      </div>
    </main>
  );
}
