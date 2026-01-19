"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ShieldCheck, Zap, Scale, Star, Globe, Info } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import AddToCartButton from '../../../components/AddToCartButton';
import { getCategoryTheme } from '../../../lib/theme';


/**
 * UTILITY: Maps category names to brand colors
 */

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getProduct() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', params.slug)
          .single();
        
        if (error) throw error;
        if (!data) return notFound();
        
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [params.slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full" />
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-brand-text/50">{error}</p>
    </div>
  );

  const styles = getCategoryTheme(product.category);

  return (
    <main className="min-h-screen bg-brand-base pb-32 selection:bg-brand-accent/20">
      
      {/* 1. BREADCRUMBS & BACK NAV */}
      <nav className="max-w-7xl mx-auto px-6 pt-12 mb-12">
        <div className="flex items-center space-x-3 text-[10px] uppercase font-semibold tracking-[0.25em] text-brand-text/30 mb-8">
          <Link href="/marketplace" className="hover:text-brand-text transition-colors">The Store</Link>
          <span className="text-brand-text/10">/</span>
          <span className={styles.text}>{product.category}</span>
        </div>
        
        <Link href="/marketplace" className="group inline-flex items-center text-[10px] uppercase font-bold tracking-widest text-brand-text/40 hover:text-brand-text transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Back to Shop
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* 2. MEDIA SECTION: Visual display with category-colored glow/page.tsx] */}
        <div className="lg:sticky lg:top-32">
          <motion.div layoutId={`card-${product.slug}`} className={`card-elevated p-4 shadow-tactile-hover overflow-hidden border-t-4 ${styles.border}`} role="img" aria-label={`${product.title} product image`}>
            <div className="aspect-[4/5] rounded-inner overflow-hidden relative bg-brand-base">
              <motion.img layoutId={`image-${product.slug}`} src={product.image} alt={product.title} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-text shadow-sm border border-white/40">
                {product.format || 'Digital Asset'}
              </div>
            </div>
          </motion.div>
          {/* Subtle Dynamic Glow */}
          <div className={`absolute -inset-10 z-[-1] opacity-10 blur-[120px] rounded-full pointer-events-none ${styles.bg}`} />
        </div>

        {/* 3. PRODUCT DETAILS SECTION */}
        <div className="flex flex-col pt-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                 <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-accent-thermal fill-accent-thermal" />)}
                 </div>
                 <span className="text-[10px] font-bold text-brand-text/40 uppercase tracking-widest">4.9 Creator Rating</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-semibold text-brand-text tracking-tight leading-tight">{product.title}</h1>
            </header>
            
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Badge icon={<Zap size={14} className={styles.text} />} text="Priority Access" />
              <Badge icon={<Globe size={14} className="text-brand-text/40" />} text="Global License" />
            </div>

            <div className="text-5xl font-semibold text-brand-text mb-12 tracking-tight">£{product.price}</div>

            {/* PURCHASE AREA/page.tsx] */}
            <div className="max-w-md space-y-8">
               <AddToCartButton product={product} />
               
               <div className="grid grid-cols-2 gap-4 py-4 border-y border-brand-surface/20">
                <TrustItem icon={<ShieldCheck size={16} className={styles.text} />} text="Secure Checkout" />
                <TrustItem icon={<Scale size={16} className={styles.text} />} text="UK Digital Rights" />
               </div>

               <PreviewNotice />
            </div>

            {/* DESCRIPTION & RIGHTS */}
            <section className="mt-24 space-y-16">
              <div className="space-y-8">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text/20">Product Details</h3>
                <p className="text-xl md:text-2xl text-brand-text/70 leading-relaxed max-w-xl">{product.description || product.summary}</p>
              </div>
              
              <UsageRights styles={styles} />
            </section>

          </motion.div>
        </div>
      </div>
    </main>
  );
}

/** * SUB-COMPONENTS FOR READABILITY 
 */
function Badge({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center px-6 py-3 bg-white shadow-tactile rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-text">
      {icon} <span className="ml-2">{text}</span>
    </div>
  );
}

function TrustItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-brand-text/30">
      {icon} {text}
    </div>
  );
}

function PreviewNotice() {
  return (
    <div className="flex items-start gap-3 bg-brand-surface/5 p-5 rounded-inner border border-brand-surface/10">
      <Info size={16} className="text-brand-accent shrink-0 mt-0.5" />
      <p className="text-[10px] leading-relaxed text-brand-text/50 font-medium">
        The shop is in preview mode. Formal purchasing will be available shortly.
      </p>
    </div>
  );
}

function UsageRights({ styles }: { styles: any }) {
  const rights = ['Full Resource Access', 'Future Updates', 'Multi-Device Use', 'Commercial Rights', 'Priority Help', 'Verified Delivery'];
  return (
    <div className="card-elevated p-12 surface-frosted shadow-tactile">
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-text/40 mb-10">Usage & Rights</h4>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
        {rights.map((feat) => (
          <li key={feat} className="flex items-center text-xs font-semibold text-brand-text">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-4 ${styles.bg} bg-opacity-10`}>
              <Check className={`w-3 h-3 ${styles.text}`} strokeWidth={3} />
            </div>
            <span className="tracking-tight">{feat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
