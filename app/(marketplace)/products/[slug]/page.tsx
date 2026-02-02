/**
 * KYNAR UNIVERSE: Product Deep-Dive (v2.2)
 * Fully type-safe for Next.js 15 + Supabase v2
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { formatGBP, getPriceFromId } from "@/lib/marketplace/pricing";
import { AddToCartButton } from "@/components/marketplace/AddToCartButton";
import { Product } from "@/lib/supabase/types";
import { ShieldCheck, Download, Zap, Landmark } from "lucide-react";

interface ProductPageProps {
  params: { slug: string };
}

/**
 * SEO Metadata
 */
export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("title, short_description")
    .eq("slug", params.slug)
    .maybeSingle();

  return {
    title: product?.title
      ? `${product.title} | Hub`
      : "Product | Hub",
    description:
      product?.short_description ??
      "Explore this digital asset in the Kynar Universe.",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = await createClient();

  /**
   * Fetch product + user concurrently
   */
  const [
    { data: product },
    { data: { user } },
  ] = await Promise.all([
    supabase
      .from("products")
      .select("*")
      .eq("slug", params.slug)
      .single(),
    supabase.auth.getUser(),
  ]);

  if (!product) notFound();

  const typedProduct = product as Product;

  /**
   * Ownership verification
   */
  const { data: ownership } = user
    ? await supabase
        .from("user_library")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", typedProduct.id)
        .maybeSingle()
    : { data: null };

  const price = getPriceFromId(typedProduct.price_id);

  const breadcrumbPaths = [
    { label: "The Hub", href: "/store" },
    {
      label: typedProduct.world,
      href: `/store?world=${typedProduct.world}`,
    },
    {
      label: typedProduct.title,
      href: `/products/${typedProduct.slug}`,
    },
  ];

  return (
    <main className="min-h-screen bg-canvas pb-32 animate-in fade-in duration-1000">
      <div className="max-w-screen-xl mx-auto px-gutter pt-8">
        <Breadcrumbs paths={breadcrumbPaths} />
      </div>

      <section className="max-w-screen-xl mx-auto px-gutter mt-8 lg:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Visual Wing */}
          <div className="lg:col-span-7 space-y-8">
            <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border bg-surface shadow-kynar-elevated">
              <Image
                src={typedProduct.preview_image || "/assets/placeholder.jpg"}
                alt={typedProduct.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="hidden lg:block">
              <h2 className="font-brand text-2xl font-bold text-text-primary mb-6">
                Technical Architecture
              </h2>
              <div
                className="prose prose-slate max-w-none font-ui text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: typedProduct.description || "",
                }}
              />
            </div>
          </div>

          {/* Action Wing */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              <div>
                <span className="font-ui text-[10px] font-bold uppercase tracking-[0.3em] text-kyn-slate-400">
                  Sector: {typedProduct.world}
                </span>
                <h1 className="font-brand mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                  {typedProduct.title}
                </h1>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-8 shadow-kynar-soft">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="font-ui text-[10px] font-bold uppercase tracking-wider text-kyn-slate-400">
                      Fixed Value
                    </p>
                    <p className="font-brand text-3xl font-bold">
                      {formatGBP(price)}
                    </p>
                  </div>
                  <Zap
                    size={24}
                    className="text-kyn-green-600"
                    fill="currentColor"
                  />
                </div>

                {ownership ? (
                  <Link
                    href="/library"
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-kyn-green-600 py-4 font-brand text-sm font-bold text-white hover:bg-kyn-green-700 transition-all"
                  >
                    <Landmark size={18} />
                    In Your Vault
                  </Link>
                ) : (
                  <AddToCartButton
                    product={typedProduct}
                    variantId={typedProduct.price_id}
                  />
                )}

                <div className="mt-6 flex items-center gap-3 text-[11px] font-ui text-text-secondary">
                  <ShieldCheck
                    size={14}
                    className="text-kyn-green-500"
                  />
                  <span>Verified Asset. One-time acquisition.</span>
                </div>
              </div>

              {/* Format Integrity */}
              {typedProduct.file_types && typedProduct.file_types.length > 0 && (
                <div className="space-y-4 pt-4">
                  <h3 className="font-brand text-xs font-bold uppercase tracking-widest">
                    Format Integrity
                  </h3>
                  <ul className="grid grid-cols-2 gap-3">
                    {typedProduct.file_types.map((ft) => (
                      <li
                        key={ft}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border font-ui text-[11px]"
                      >
                        <Download
                          size={12}
                          className="text-kyn-slate-400"
                        />
                        {ft}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}