/**
 * KYNAR UNIVERSE: Product Deep-Dive (v1.5)
 * Role: The "Conversation" - Turning discovery into ownership.
 * Fix: Next.js 15 Async Params & Schema Alignment.
 */

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { formatGBP, getPriceFromId } from "@/lib/marketplace/pricing";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { AddToCartButton } from "@/components/marketplace/AddToCartButton";
import { Product } from "@/lib/supabase/types";
import { ShieldCheck, Download, Users, Landmark } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 1. Await Params (Next.js 15 Mandatory Fix)
  const resolvedParams = await params;
  const supabase = await createClient();
  
  // 2. Canonical fetch using v1.5 schema
  // Note: Ensure your DB uses 'description_short' and 'preview_image' per hardening
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (!product) notFound();

  const price = getPriceFromId(product.price_id);
  
  // 3. Discovery Loop: Related items from the same World
  const { data: related } = await supabase
    .from("products")
    .select("*")
    .eq("world", product.world)
    .neq("id", product.id)
    .limit(2);

  const breadcrumbPaths = [
    { label: "Hub", href: "/store" },
    { label: product.world, href: `/store?world=${product.world.toLowerCase()}` },
    { label: product.title, href: `/products/${product.slug}` }
  ];

  return (
    <div className="pb-32 animate-in fade-in duration-700 ease-out">
      <div className="max-w-screen-xl mx-auto px-6">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      {/* Hero: Emotional Orientation */}
      <section className="px-6 pt-16 pb-20 text-center md:pt-24 md:pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex justify-center">
             <span className="rounded-full bg-surface border border-border px-4 py-1.5 font-ui text-[10px] font-medium uppercase tracking-[0.15em] text-kyn-slate-400">
              Part of {product.world}
            </span>
          </div>
          
          <h1 className="font-brand text-4xl font-medium tracking-tight text-kyn-slate-900 md:text-7xl leading-[1.1]">
            {product.title}
          </h1>
          
          <p className="mt-8 font-ui text-lg text-kyn-slate-500 leading-relaxed md:text-xl max-w-2xl mx-auto">
            {product.description_short || product.short_description}
          </p>
          
          <div className="mt-16 flex flex-col items-center gap-10">
            <div className="space-y-2">
              <span className="font-brand text-5xl font-medium text-kyn-slate-900">{formatGBP(price)}</span>
              <div className="flex items-center justify-center gap-2 font-ui text-[10px] font-medium uppercase tracking-widest text-kyn-slate-400">
                <Landmark size={12} />
                <span>One-time purchase • Inclusive of UK VAT</span>
              </div>
            </div>
            
            <AddToCartButton product={product as Product} />
            
            <div className="flex items-center gap-6 font-ui text-[11px] font-medium uppercase tracking-widest text-kyn-slate-400">
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-kyn-green-700" />
                Permanent Ownership
              </span>
              <span className="h-4 w-px bg-border" />
              <span className="flex items-center gap-2">
                <Download size={14} />
                Instant Access
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Proof: The Product Vessel */}
      <section className="px-6 mb-24 max-w-screen-xl mx-auto">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface aspect-[16/9] shadow-sm relative">
          <img 
            src={product.preview_image || product.image_url || "/placeholder-preview.png"} 
            alt={`${product.title} overview`}
            className="w-full h-full object-cover transition-opacity duration-700"
          />
        </div>
      </section>

      <div className="mx-auto max-w-screen-lg px-6">
        {/* Specification Grid */}
        <div className="grid gap-16 md:grid-cols-2 mb-32 border-b border-border pb-24">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-kyn-slate-900">
              <Users size={24} strokeWidth={1.5} className="text-kyn-green-700" />
              <h2 className="font-brand text-2xl font-medium">The Purpose</h2>
            </div>
            <p className="font-ui text-base text-kyn-slate-500 leading-loose">
              Built to bring clarity and permanence to your personal digital ecosystem. This tool is designed for daily return and long-term utility.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-kyn-slate-900">
              <Download size={24} strokeWidth={1.5} className="text-kyn-slate-400" />
              <h2 className="font-brand text-2xl font-medium">Inside your Vault</h2>
            </div>
            <ul className="font-ui text-sm space-y-4">
              {product.file_types?.map((ft: string) => (
                <li key={ft} className="flex items-center gap-3 text-kyn-slate-500">
                  <span className="flex h-7 w-7 items-center justify-center rounded bg-surface border border-border text-[9px] font-medium uppercase text-kyn-slate-500">
                    {ft}
                  </span>
                  <span>Native format for immediate use.</span>
                </li>
              ))}
              <li className="flex items-center gap-3 text-kyn-green-700 font-medium pt-2">
                <ShieldCheck size={16} />
                Unlimited access via your Library.
              </li>
            </ul>
          </div>
        </div>

        {/* Narrative Section: The "Conversation" */}
        <article className="max-w-2xl mx-auto">
          <h2 className="font-brand text-3xl font-medium text-kyn-slate-900 mb-8 tracking-tight text-center">Development Notes</h2>
          <div className="prose prose-slate prose-lg max-w-none font-ui text-kyn-slate-600 leading-relaxed prose-headings:font-brand prose-headings:font-medium">
             <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </article>

        {/* Trust Seal: Design System Section 1 */}
        <div className="mt-32 rounded-3xl bg-surface border border-border p-12 text-center md:p-20">
          <h3 className="font-brand text-2xl font-medium text-kyn-slate-900">The Kynar Promise</h3>
          <p className="mt-6 font-ui text-base text-kyn-slate-500 max-w-md mx-auto leading-relaxed">
            Every tool you acquire here is yours to keep. No subscriptions. No tracking. Just useful things for an organised life.
          </p>
          <div className="mt-10 h-1 w-12 bg-kyn-green-700 mx-auto rounded-full opacity-20" />
        </div>
      </div>

      {/* Discovery Loop */}
      {related && related.length > 0 && (
        <section className="mt-32 border-t border-border bg-kyn-slate-50/30 px-6 py-24">
          <div className="mx-auto max-w-screen-xl">
            <h2 className="font-brand text-2xl font-medium mb-12 text-kyn-slate-900 text-center">Continue your Discovery</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {related.map((r) => (
                <ProductCard key={r.id} product={r as Product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
