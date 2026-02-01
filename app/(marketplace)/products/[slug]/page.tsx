/**
 * KYNAR UNIVERSE: Product Deep-Dive (v1.5)
 * Role: The "Conversation" - Turning discovery into ownership.
 * Fix: TypeScript Type Casting & Next.js 15 Async Params
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { formatGBP, getPriceFromId } from "@/lib/marketplace/pricing";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { AddToCartButton } from "@/components/marketplace/AddToCartButton";
// Ensure this import points to your actual Product interface
import { Product } from "@/lib/supabase/types"; 
import { ShieldCheck, Download, Users, Landmark } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 1. Await Params (Next.js 15 Requirement)
  const { slug } = await params;
  const supabase = await createClient();
  
  // 2. Fetch with Explicit Type Casting
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  // Cast 'data' to 'Product' to satisfy the TypeScript compiler
  const product = data as Product;

  if (!product) notFound();

  // Now TypeScript knows price_id exists
  const price = getPriceFromId(product.price_id);
  
  // 3. Discovery Loop: Related items (Casting result as Product[])
  const { data: relatedData } = await supabase
    .from("products")
    .select("*")
    .eq("world", product.world)
    .neq("id", product.id)
    .limit(2);

  const related = (relatedData as Product[]) || [];

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
             <span className="rounded-full bg-surface border border-border px-4 py-1.5 font-ui text-[10px] font-medium uppercase tracking-[0.15em] text-text-secondary">
              Part of {product.world}
            </span>
          </div>
          
          <h1 className="font-brand text-4xl font-medium tracking-tight text-text-primary md:text-7xl leading-[1.1]">
            {product.title}
          </h1>
          
          <p className="mt-8 font-ui text-lg text-text-secondary leading-relaxed md:text-xl max-w-2xl mx-auto">
            {/* Fallback for different naming conventions in the DB */}
            {product.short_description || "A grounded tool for your digital vault."}
          </p>
          
          <div className="mt-16 flex flex-col items-center gap-10">
            <div className="space-y-2">
              <span className="font-brand text-5xl font-medium text-text-primary">{formatGBP(price)}</span>
              <div className="flex items-center justify-center gap-2 font-ui text-[10px] font-medium uppercase tracking-widest text-text-secondary">
                <Landmark size={12} />
                <span>One-time purchase • Inclusive of UK VAT</span>
              </div>
            </div>
            
            <AddToCartButton product={product} />
            
            <div className="flex items-center gap-6 font-ui text-[11px] font-medium uppercase tracking-widest text-text-secondary">
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

      {/* Visual Proof */}
      <section className="px-6 mb-24 max-w-screen-xl mx-auto">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface aspect-[16/9] shadow-sm relative">
          <Image 
            src={product.image_url || "/placeholder-preview.png"} 
            alt={`${product.title} overview`}
            fill
            className="object-cover transition-opacity duration-700"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>
      </section>

      <div className="mx-auto max-w-screen-lg px-6">
        <div className="grid gap-16 md:grid-cols-2 mb-32 border-b border-border pb-24">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-text-primary">
              <Users size={24} strokeWidth={1.5} className="text-kyn-green-700" />
              <h2 className="font-brand text-2xl font-medium">The Purpose</h2>
            </div>
            <p className="font-ui text-base text-text-secondary leading-loose">
              Built to bring clarity and permanence to your personal digital ecosystem.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-text-primary">
              <Download size={24} strokeWidth={1.5} className="text-text-secondary" />
              <h2 className="font-brand text-2xl font-medium">Inside your Vault</h2>
            </div>
            <ul className="font-ui text-sm space-y-4">
              {/* Handling array types safely */}
              {(product.file_types as string[])?.map((ft) => (
                <li key={ft} className="flex items-center gap-3 text-text-secondary">
                  <span className="flex h-7 w-7 items-center justify-center rounded bg-surface border border-border text-[9px] font-medium uppercase">
                    {ft}
                  </span>
                  <span>Native format for immediate use.</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <article className="max-w-2xl mx-auto">
          <h2 className="font-brand text-3xl font-medium text-text-primary mb-8 tracking-tight text-center">Development Notes</h2>
          <div 
            className="prose prose-slate prose-lg max-w-none font-ui text-text-secondary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description || "" }} 
          />
        </article>
      </div>

      {related.length > 0 && (
        <section className="mt-32 border-t border-border bg-surface/30 px-6 py-24">
          <div className="mx-auto max-w-screen-xl">
            <h2 className="font-brand text-2xl font-medium mb-12 text-text-primary text-center">Continue your Discovery</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {related.map((r) => (
                <ProductCard key={r.id} product={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
 