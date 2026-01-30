import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/lib/utils/format';
import ProductPreview from '@/components/product/ProductPreview';
import Chip from '@/components/ui/Chip';
import Section from '@/components/layout/Section';
import Link from 'next/link';

/**
 * Product Detail Page - Kynar Universe 2.0
 * Purpose:
 * - Display single product narrative and assets
 * - Integrated purchase flow via Lemon Squeezy
 * - Mobile-first vertical rhythm
 */

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  // Fetch product data based on slug
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single();

  if (error || !product) {
    return notFound();
  }

  // Sample images - in production these come from a product_images table or column
  const displayImages = product.image_url ? [product.image_url] : [];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 1. Visual Stage */}
      <section className="px-6 pt-6">
        <ProductPreview 
          images={displayImages} 
          world={product.world as 'home' | 'lifestyle' | 'tools'} 
        />
      </section>

      {/* 2. Narrative Section */}
      <Section className="space-y-8">
        <header className="space-y-4">
          <div className="flex justify-between items-start">
            <Chip label={product.world} world={product.world} />
            <span className="text-xl font-bold text-kyn-green-700">
              {formatPrice(product.price_gbp)}
            </span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-kyn-green-700 leading-tight">
              {product.title}
            </h1>
            <p className="text-sm font-bold text-kyn-slate-400 uppercase tracking-[0.2em]">
              {product.format_label}
            </p>
          </div>
        </header>

        <article className="space-y-6">
          <p className="text-lg text-kyn-slate-600 leading-relaxed font-light">
            {product.subtitle}
          </p>
          <div className="h-px w-12 bg-kyn-slate-500/10" />
          <div className="text-sm text-kyn-slate-500 leading-relaxed space-y-4 whitespace-pre-wrap">
            {product.description || "The description for this cosmic tool is currently being manifested."}
          </div>
        </article>

        {/* 3. Action Bar (Sticky-ready) */}
        <footer className="pt-10 space-y-6">
          <div className="p-6 bg-kyn-mist rounded-[32px] border border-kyn-slate-500/5">
            <p className="text-[10px] uppercase tracking-widest text-kyn-slate-400 font-bold mb-4 text-center">
              Lifetime Access to this Asset
            </p>
            
            {/* Payment Integration Trigger */}
            <button className="w-full bg-kyn-green-700 text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-kyn-green-700/10 active:scale-95 transition-all">
              Initialize Purchase
            </button>
            
            <p className="text-[9px] text-kyn-slate-400 text-center mt-4 leading-relaxed">
              Secure payment via Lemon Squeezy. <br />
              Digital delivery to your Library instantly.
            </p>
          </div>

          <Link 
            href="/" 
            className="block text-center py-2 text-[10px] uppercase tracking-widest text-kyn-slate-400 font-bold"
          >
            ← Return to Universe
          </Link>
        </footer>
      </Section>
    </div>
  );
}
