/**
 * KYNAR UNIVERSE: The Library (v1.5)
 * Role: A sanctuary of ownership and permanent access.
 * Update: Synchronized with v1.5 Design System & Next.js 15 Standards.
 */

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Download, BookOpen, ShieldCheck, HelpCircle, Clock } from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';

export default async function LibraryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Redirecting to the hardened v1.5 auth path
  if (!user) redirect('/auth/login?return_to=/library');

  const { data: items } = await supabase
    .from('user_library')
    .select(`
      id,
      acquired_at,
      product:products (
        id,
        name,
        description_short,
        world,
        slug,
        preview_image
      )
    `)
    .eq('user_id', user.id)
    .order('acquired_at', { ascending: false });

  return (
    <main className="min-h-screen bg-canvas animate-in fade-in duration-700 ease-out">
      <div className="max-w-screen-xl mx-auto px-6">
        <Breadcrumbs paths={[{ label: 'Library', href: '/library' }]} />
        
        <header className="py-12 md:py-24 border-b border-border">
          <h1 className="font-brand text-4xl font-medium text-kyn-slate-900 tracking-tight md:text-6xl">
            Your Collection
          </h1>
          <p className="font-ui mt-6 text-lg text-kyn-slate-500 max-w-xl leading-relaxed">
            Every tool here is yours to keep. Secured, permanent, and ready for your use.
          </p>
        </header>

        <section className="py-16">
          {!items || items.length === 0 ? (
            <div className="py-32 text-center rounded-3xl bg-surface border border-border px-6">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-kyn-slate-100/50 flex items-center justify-center">
                <ShieldCheck className="text-kyn-slate-300" size={24} />
              </div>
              <p className="font-ui text-base text-kyn-slate-500 mb-8 max-w-xs mx-auto">
                Your collection is currently empty. Explore the universe to find your first tool.
              </p>
              <Link 
                href="/store" 
                className="inline-flex items-center justify-center rounded-xl bg-kyn-slate-900 px-8 py-4 font-brand text-sm font-medium text-white hover:bg-black transition-all active:scale-[0.98]"
              >
                Browse Marketplace
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item: any) => (
                <div 
                  key={item.id} 
                  className="group flex flex-col h-full bg-canvas border border-border rounded-2xl overflow-hidden hover:border-kyn-slate-300 transition-all duration-500 hover:shadow-kynar-soft"
                >
                  {/* Visual Anchor */}
                  <div className="aspect-[16/10] bg-kyn-slate-50 relative overflow-hidden border-b border-border">
                    <img 
                      src={item.product.preview_image || "/placeholder.png"} 
                      alt={item.product.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-kyn-slate-900 px-2.5 py-1 rounded bg-white/90 backdrop-blur-sm border border-white/20">
                        {item.product.world}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex-1">
                    <div className="flex items-center gap-2 mb-4 text-kyn-slate-400">
                      <Clock size={12} />
                      <span className="text-[10px] font-medium uppercase tracking-wider">
                        Acquired {new Date(item.acquired_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <h3 className="font-brand text-xl font-medium text-kyn-slate-900 mb-3">
                      {item.product.name}
                    </h3>
                    <p className="font-ui text-sm text-kyn-slate-500 leading-relaxed line-clamp-2">
                      {item.product.description_short}
                    </p>
                  </div>

                  <div className="px-8 pb-8 space-y-3">
                    <Link
                      href={`/api/download/${item.product.id}`}
                      className="flex items-center justify-center gap-2 w-full bg-kyn-slate-900 py-4 rounded-xl text-white font-brand text-sm font-medium hover:bg-black transition-all active:scale-[0.98]"
                    >
                      <Download size={18} strokeWidth={2} />
                      Access Assets
                    </Link>
                    
                    <Link
                      href={`/guides/${item.product.slug}`}
                      className="flex items-center justify-center gap-2 w-full py-2 font-ui text-[10px] font-medium text-kyn-slate-400 hover:text-kyn-slate-900 transition-colors uppercase tracking-[0.2em]"
                    >
                      <BookOpen size={14} />
                      Technical Guide
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="py-24 flex flex-col items-center border-t border-border">
          <HelpCircle size={32} strokeWidth={1} className="text-kyn-slate-200 mb-6" />
          <p className="text-[10px] text-kyn-slate-400 font-medium uppercase tracking-[0.3em] mb-4 text-center">Permanent Collection Support</p>
          <a href="mailto:support@kynaruniverse.com" className="text-base font-brand font-medium text-kyn-slate-900 underline underline-offset-8 decoration-kyn-slate-200 hover:decoration-kyn-green-500 transition-colors">
            support@kynaruniverse.com
          </a>
        </footer>
      </div>
    </main>
  );
}
