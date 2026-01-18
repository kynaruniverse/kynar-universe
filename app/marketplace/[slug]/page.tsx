"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ShieldCheck, Zap, DownloadCloud, Scale } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import AddToCartButton from '../../../components/AddToCartButton';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('slug', params.slug)
        .single();
      
      if (!data) return notFound();
      setProduct(data);
      setLoading(false);
    }
    getProduct();
  }, [params.slug]);

  if (loading) return null;

  const isTools = product.category === 'Tools';
  const isLife = product.category === 'Life';
  const themeClass = isTools ? 'bg-tools-base' : isLife ? 'bg-life-base' : 'bg-cat-home-base';
  const accentText = isTools ? 'text-tools-accent' : isLife ? 'text-life-accent' : 'text-cat-home-accent';
  const accentBg = isTools ? 'bg-tools-accent' : isLife ? 'bg-life-accent' : 'bg-cat-home-accent';

  return (
    <main className={`min-h-screen ${themeClass} pb-32 transition-colors duration-1000 ease-in-out`}>
      
      {/* 1. BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-6 pt-12 mb-8">
        <nav className="flex items-center space-x-2 text-[10px] uppercase font-black tracking-[0.3em] text-primary-text/30 mb-6">
          <Link href="/marketplace" className="hover:text-primary-text transition-colors">Marketplace</Link>
          <span>/</span>
          <span className={accentText}>{product.category}</span>
        </nav>
        
        <Link href="/marketplace" className="group inline-flex items-center text-[10px] uppercase font-black tracking-widest text-primary-text/40 hover:text-primary-text transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Return to Home
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* 2. IMAGE SECTOR */}
        <div className="relative group lg:sticky lg:top-24">
          <motion.div 
            layoutId={`card-${product.slug}`}
            className="bg-white/40 backdrop-blur-3xl p-4 rounded-[48px] border border-white/40 shadow-glass"
          >
            <div className="aspect-square rounded-[36px] overflow-hidden relative shadow-inner bg-gray-50/50">
              <motion.img 
                layoutId={`image-${product.slug}`}
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary-text shadow-sm">
                {product.format || 'Immediate Access'}
              </div>
            </div>
          </motion.div>
          <div className={`absolute -inset-10 z-[-1] opacity-20 blur-[100px] rounded-full animate-pulse ${accentBg}`} />
        </div>

        {/* 3. DETAILS SECTOR */}
        <div className="flex flex-col pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-8xl font-black font-sans text-primary-text mb-8 tracking-tighter leading-[0.85] uppercase">
              {product.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <div className="flex items-center px-5 py-2.5 bg-white/60 backdrop-blur-md rounded-full border border-white/40 shadow-sm text-[10px] font-black uppercase tracking-widest text-primary-text">
                <Zap className={`w-3 h-3 mr-2 ${accentText}`} fill="currentColor" /> Instant Delivery
              </div>
              <div className="flex items-center px-5 py-2.5 bg-black/5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-text/40">
                <DownloadCloud className="w-3 h-3 mr-2" /> {product.format || 'PDF'}
              </div>
            </div>

            <div className="text-5xl font-black text-primary-text mb-12 tracking-tighter">
              £{product.price}
            </div>

            {/* ACTION AREA */}
            <div className="max-w-md space-y-6">
               <AddToCartButton product={product} />
               
               {/* LEGAL DISCLAIMER (UK Consumer Law Support) */}
               <p className="text-[10px] leading-relaxed text-primary-text/40 font-serif italic text-center px-4">
                 Access granted immediately upon checkout. Under UK Law, digital content is non-refundable once the download process begins.
               </p>

               <div className="flex items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary-text/30">
                  <ShieldCheck size={14} className={accentText} /> Secure Download
                </div>
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary-text/30">
                  <Scale size={14} className={accentText} /> UK Regulated
                </div>
               </div>
            </div>

            {/* DESCRIPTION SECTION */}
            <div className="mt-20 space-y-12">
              <div className="space-y-6">
                <h3 className="font-sans font-black text-[10px] uppercase tracking-[0.4em] text-primary-text/20">About This Product</h3>
                <p className="font-serif text-xl md:text-2xl text-primary-text/70 leading-relaxed italic pr-4">
                  {product.description || product.summary}
                </p>
              </div>
              
              <div className="p-10 bg-white/40 backdrop-blur-3xl rounded-[48px] border border-white/40 shadow-glass">
                <h4 className="font-sans font-black text-[10px] uppercase tracking-widest text-primary-text/40 mb-8">What You Get</h4>
                <ul className="space-y-5">
                  {[
                    `Full ${product.format || 'Digital Asset'} Source File`,
                    'Future Version Access',
                    'Works on all Devices',
                    'Lifetime Library Access'
                  ].map((feat) => (
                    <li key={feat} className="flex items-center text-sm font-bold text-primary-text">
                      <div className={`w-6 h-6 rounded-full ${accentBg}/10 flex items-center justify-center mr-4`}>
                        <Check className={`w-3 h-3 ${accentText}`} strokeWidth={4} />
                      </div>
                      <span className="tracking-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
