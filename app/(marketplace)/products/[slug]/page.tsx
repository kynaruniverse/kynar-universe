/**
 * KYNAR UNIVERSE: Product Deep-Dive (v1.5)
 * Role: The "Conversation" - Turning discovery into ownership.
 * Optimization: Metadata Generation, Ownership Awareness, and Next.js 15 Async.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { formatGBP, getPriceFromId } from "@/lib/marketplace/pricing";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { AddToCartButton } from "@/components/marketplace/AddToCartButton";
import { Product } from "@/lib/supabase/types";
import { ShieldCheck, Download, Zap, Landmark, BookOpen, ArrowLeft } from "lucide-react";

interface ProductPageProps {
  params: Promise < { slug: string } > ;
}

/**
 * SEO & Social Identity
 */
export async function generateMetadata({ params }: ProductPageProps): Promise < Metadata > {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase?.from("products").select("title, short_description").eq("slug", slug).single() || {};
  
  return {
    title: product?.title ? `${product.title} | Hub` : 'Product',
    description: product?.short_description || 'Explore this digital asset in the Kynar Universe.',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  
  if (!supabase) return null;
  
  // 1. Concurrent Data Fetch: Product + User Ownership
  const [{ data: product }, { data: { user } }] = await Promise.all([
    supabase.from("products").select("*").eq("slug", slug).single(),
    supabase.auth.getUser()
  ]);
  
  if (!product) notFound();
  
  // 2. Check if already owned (Permanent Collection Rule)
  const { data: ownership } = user
    ?
    await supabase.from('user_library').select('id').eq('user_id', user.id).eq('product_id', product.id).single() :
    { data: null };
  
  const price = getPriceFromId(product.price_id);
  
  // 3. Related Discovery (Same World, excluding current)
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("world", product.world)
    .neq("id", product.id)
    .limit(2);
  
  const breadcrumbPaths = [
    { label: 'The Hub', href: '/store' },
    { label: product.world, href: `/store?world=${product.world}` },
    { label: product.title, href: `/products/${product.slug}` }
  ];
  
  return (
    <main className="min-h-screen bg-canvas pb-32 animate-in fade-in slide-in-from-bottom-2 duration-1000">
      {/* Handrail */}
      <div className="max-w-screen-xl mx-auto px-gutter pt-8">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      <section className="max-w-screen-xl mx-auto px-gutter mt-8 lg:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Visual Wing: 16:10 Cinematic Display */}
          <div className="lg:col-span-7 space-y-8">
            <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border bg-surface shadow-kynar-elevated">
              <Image
                src={product.preview_image || "/assets/placeholder.jpg"}
                alt={product.title}
                fill
                priority
                className="object-cover calm-transition group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content Wing: Editorial Body */}
            <div className="hidden lg:block">
               <h2 className="font-brand text-2xl font-bold text-text-primary mb-6">Technical Architecture</h2>
               <div 
                  className="prose prose-slate max-w-none font-ui text-text-secondary leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: product.description || "Information being retrieved..." }} 
               />
            </div>
          </div>

          {/* Action Wing: Acquisition Panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <div>
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.3em] text-kyn-slate-400">
                  Sector: {product.world}
                </span>
                <h1 className="font-brand mt-4 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
                  {product.title}
                </h1>
                <p className="font-ui mt-6 text-lg text-text-secondary leading-relaxed">
                  {product.short_description}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-8 shadow-kynar-soft">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <p className="font-ui text-[10px] font-bold uppercase tracking-wider text-kyn-slate-400">Fixed Value</p>
                    <p className="font-brand text-3xl font-bold text-text-primary">{formatGBP(price)}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-canvas border border-border flex items-center justify-center text-kyn-green-600">
                    <Zap size={20} fill="currentColor" />
                  </div>
                </div>

                {ownership ? (
                  <Link 
                    href="/library" 
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-kyn-green-600 py-4 font-brand text-sm font-bold text-white shadow-lg hover:bg-kyn-green-700 transition-all active:scale-[0.98]"
                  >
                    <Landmark size={18} />
                    Already In Your Vault
                  </Link>
                ) : (
                  <AddToCartButton product={product as Product} />
                )}

                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-[11px] font-ui font-medium text-text-secondary">
                    <ShieldCheck size={14} className="text-kyn-green-500" />
                    <span>One-time acquisition. Perpetual ownership.</span>
                  </div>
                </div>
              </div>

              {/* Technical Metadata List */}
              <div className="space-y-4 pt-4">
                <h3 className="font-brand text-xs font-bold uppercase tracking-widest text-kyn-slate-900">Format Integrity</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {(product.file_types as string[])?.map((ft) => (
                    <li key={ft} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border font-ui text-[11px] text-text-primary">
                      <Download size={12} className="text-kyn-slate-400" />
                      {ft} Format
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only Editorial Section */}
        <div className="mt-16 lg:hidden">
          <h2 className="font-brand text-2xl font-bold text-text-primary mb-6">Technical Architecture</h2>
          <div 
            className="prose prose-slate max-w-none font-ui text-text-secondary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description || "" }} 
          />
        </div>

        {/* Related Discovery Sector */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="mt-32 pt-24 border-t border-border">
            <div className="flex items-end justify-between mb-12">
              <div className="space-y-2">
                <h2 className="font-brand text-2xl font-bold text-text-primary">Related Acquisitions</h2>
                <p className="font-ui text-sm text-text-secondary">Explore more tools within the {product.world} sector.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
              {relatedProducts.map((r) => (
                <ProductCard key={r.id} product={r as Product} />
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}