import { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Download, BookOpen, ShieldCheck, Clock, ChevronRight } from "lucide-react";
import { UserLibrary, Product } from "@/lib/supabase/types";
import { RealtimeListener } from "@/components/layout/RealtimeListener";

type UserLibraryWithProduct = UserLibrary & {
  product: Product | null;
};

export const metadata: Metadata = {
  title: "The Vault | Your Collection",
  description: "A permanent archive of your acquired digital assets.",
};

export default async function LibraryPage() {
  const supabase = await createClient();
  
  const { data: { user: authUser } } = await supabase.auth.getUser();
  if (!authUser) redirect("/auth/login?return_to=/library");
  
  // RLS (Phase 02) now secures this query automatically
  const { data: rawItems, error } = await (supabase
    .from('user_library')
    .select(`
      id,
      acquired_at,
      status,
      product_id,
      product:products (
        id,
        title,
        short_description,
        world,
        slug,
        preview_image 
      )
    `)
    .eq('user_id', authUser.id)
    .order('acquired_at', { ascending: false }) as any);
  
  if (error) {
    console.error("[Vault] Sync error:", error.message);
  }
  
  const items = (rawItems || []).map((item: any) => ({
    ...item,
    product: item.product || {}
  })) as UserLibraryWithProduct[];
  
  return (
    <div className="max-w-screen-xl mx-auto px-gutter">
      {/* PHASE 03: The Bridge */}
      <RealtimeListener userId={authUser.id} />

      <header className="py-16 md:py-24">
        <h1 className="font-brand text-4xl font-bold text-kyn-slate-900 tracking-tight md:text-6xl">
          Your Collection
        </h1>
        <p className="font-ui text-base text-text-secondary mt-6 max-w-md">
          Your permanent archive. Verified assets, secured for life.
        </p>
      </header>

      <section className="pb-24">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-border rounded-[2.5rem] bg-surface/50">
            <ShieldCheck size={40} className="text-kyn-slate-200 mb-8" strokeWidth={1} />
            <h2 className="font-brand text-xl font-bold text-text-primary">The Vault is Quiet</h2>
            <p className="font-ui text-sm text-text-secondary mt-3 mb-10">
              You haven&apos;t added any technical assets to your universe yet.
            </p>
            <Link href="/store" className="button-primary group">
              Explore Hub
              <ChevronRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map((item) => (
              <article 
                key={item.id} 
                className="group flex flex-col bg-white border border-border rounded-[2rem] overflow-hidden hover:shadow-kynar-deep transition-all duration-700 animate-in fade-in slide-in-from-bottom-4"
              >
                <div className="aspect-[16/10] bg-kyn-slate-50 relative overflow-hidden">
                  {item.product?.preview_image ? (
                    <Image 
                      src={item.product.preview_image} 
                      alt={item.product.title || "Asset"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-kyn-slate-100">
                      <ShieldCheck size={64} strokeWidth={0.5} />
                    </div>
                  )}
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={12} className="text-kyn-green-600" />
                    <span className="text-[10px] font-bold text-kyn-slate-400 uppercase tracking-widest">
                      Index Date: {item.acquired_at ? new Date(item.acquired_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  
                  <h3 className="font-brand text-2xl font-bold text-kyn-slate-900 mb-3">
                    {item.product?.title || "Unknown Asset"}
                  </h3>
                  
                  <div className="mt-auto space-y-4">
                    <Link 
                      href={`/api/download/${item.product_id}`}
                      className="flex items-center justify-center gap-3 w-full bg-kyn-slate-900 py-4 rounded-2xl text-white font-brand text-xs font-bold uppercase tracking-widest hover:bg-black transition-all"
                    >
                      <Download size={16} />
                      Access Assets
                    </Link>
                    
                    <Link
                      href={`/guides/${item.product?.slug}`}
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
    </div>
  );
}
