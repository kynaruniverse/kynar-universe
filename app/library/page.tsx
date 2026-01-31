import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Download, BookOpen, ShieldCheck, HelpCircle, Clock } from "lucide-react";
import Link from 'next/link';

/**
 * KYNAR UNIVERSE: The Library (v1.3)
 * Purpose: A sanctuary of ownership. 
 * Alignment: Verified against products (name, preview_image) and user_library (acquired_at).
 */
export default async function LibraryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login?next=/library');

  // Schema Alignment: Fetching preview_image and name per CSV inventory
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
    <main className="min-h-screen bg-canvas animate-in fade-in duration-1000">
      <div className="max-w-screen-xl mx-auto px-6">
        <Breadcrumbs paths={[{ label: 'Library', href: '/library' }]} />
        
        <header className="py-12 md:py-24 border-b border-kyn-slate-100">
          <h1 className="font-brand text-4xl font-bold text-text-primary tracking-tight md:text-6xl">
            Your Collection
          </h1>
          <p className="font-ui mt-6 text-lg text-text-secondary max-w-xl leading-relaxed">
            Every tool here is yours to keep. Secured, permanent, and ready for your use.
          </p>
        </header>

        <section className="py-16">
          {!items || items.length === 0 ? (
            <div className="py-32 text-center rounded-3xl bg-surface border border-kyn-slate-100 px-6">
              <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-kyn-slate-50 flex items-center justify-center">
                <ShieldCheck className="text-kyn-slate-200" size={24} />
              </div>
              <p className="font-ui text-base text-text-secondary mb-8 max-w-xs mx-auto">
                Your collection is currently empty. Explore the universe to find your first tool.
              </p>
              <Link 
                href="/store" 
                className="inline-flex items-center justify-center rounded-full bg-text-primary px-8 py-4 font-brand text-sm font-bold text-canvas hover:opacity-90 transition-opacity"
              >
                Browse Marketplace
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item: any) => (
                <div 
                  key={item.id} 
                  className="group flex flex-col h-full bg-canvas border border-kyn-slate-100 rounded-2xl overflow-hidden hover:border-kyn-slate-300 transition-all duration-500"
                >
                  {/* Visual Anchor */}
                  <div className="aspect-[16/10] bg-surface relative overflow-hidden border-b border-kyn-slate-50">
                    <img 
                      src={item.product.preview_image || "/placeholder.png"} 
                      alt={item.product.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-primary px-2.5 py-1 rounded bg-canvas/90 backdrop-blur-sm border border-white/20">
                        {item.product.world}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex-1">
                    <div className="flex items-center gap-2 mb-4 text-kyn-slate-400">
                      <Clock size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Acquired {new Date(item.acquired_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <h3 className="font-brand text-xl font-bold text-text-primary mb-3">
                      {item.product.name}
                    </h3>
                    <p className="font-ui text-sm text-text-secondary leading-relaxed line-clamp-2">
                      {item.product.description_short}
                    </p>
                  </div>

                  <div className="px-8 pb-8 space-y-3">
                    <Link
                      href={`/api/download/${item.product.id}`}
                      className="flex items-center justify-center gap-2 w-full bg-text-primary py-4 rounded-xl text-canvas font-brand text-sm font-bold hover:bg-text-primary/90 transition-all"
                    >
                      <Download size={18} strokeWidth={2.5} />
                      Access Assets
                    </Link>
                    
                    <Link
                      href={`/guides/${item.product.slug}`}
                      className="flex items-center justify-center gap-2 w-full py-2 font-ui text-[10px] font-bold text-kyn-slate-400 hover:text-text-primary transition-colors uppercase tracking-[0.2em]"
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

        <footer className="py-24 flex flex-col items-center border-t border-kyn-slate-100">
          <HelpCircle size={32} strokeWidth={1.5} className="text-kyn-slate-200 mb-6" />
          <p className="text-[10px] text-kyn-slate-400 font-bold uppercase tracking-[0.3em] mb-4 text-center">Permanent Collection Support</p>
          <a href="mailto:support@kynaruniverse.com" className="text-base font-brand font-bold text-text-primary underline underline-offset-8 decoration-kyn-slate-200 hover:decoration-kyn-green-500 transition-colors">
            support@kynaruniverse.com
          </a>
        </footer>
      </div>
    </main>
  );
}
