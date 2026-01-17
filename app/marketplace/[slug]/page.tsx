"use client"; // We turn this to client-side to handle the high-end motion transitions
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ShieldCheck, Zap } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import AddToCartButton from '../../../components/AddToCartButton';
import { useEffect, useState } from 'react';

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

  if (loading) return null; // Let the PageLoader handle this

  const isTools = product.category === 'Tools';
  const isLife = product.category === 'Life';
  const themeClass = isTools ? 'bg-tools-base' : isLife ? 'bg-life-base' : 'bg-cat-home-base';
  const accentText = isTools ? 'text-tools-accent' : isLife ? 'text-life-accent' : 'text-cat-home-accent';

  return (
    <main className={`min-h-screen ${themeClass} pb-32 transition-colors duration-1000 ease-in-out`}>
      
      {/* 1. NAVIGATION BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-6 pt-12 mb-8">
        <nav className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-primary-text/30 mb-6">
          <Link href="/marketplace" className="hover:text-primary-text transition-colors">Marketplace</Link>
          <span>/</span>
          <span className={accentText}>{product.category}</span>
        </nav>
        
        <Link href="/marketplace" className="group inline-flex items-center text-sm font-bold text-primary-text/60 hover:text-primary-text transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Back to Universe
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* 2. IMAGE SECTOR (The "Flying" Image) */}
        <div className="relative group">
          <motion.div 
            layoutId={`card-${product.slug}`}
            className="bg-white/40 backdrop-blur-2xl p-3 rounded-[40px] border border-white/40 shadow-glass"
          >
            <div className="aspect-square md:aspect-video rounded-[32px] overflow-hidden relative shadow-inner bg-gray-50">
              <motion.img 
                layoutId={`image-${product.slug}`}
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
              <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-tighter text-primary-text shadow-sm">
                {product.category}
              </div>
            </div>
          </motion.div>
          {/* Subtle glow behind image */}
          <div className={`absolute -inset-4 z-[-1] opacity-20 blur-3xl rounded-[60px] ${isTools ? 'bg-tools-accent' : isLife ? 'bg-life-accent' : 'bg-cat-home-accent'}`} />
        </div>

        {/* 3. DETAILS SECTOR */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-black font-sans text-primary-text mb-6 tracking-tighter leading-[0.9]">
              {product.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/40 shadow-sm text-xs font-bold text-primary-text">
                <Zap className="w-3 h-3 mr-2 text-home-accent" /> Instant Download
              </div>
              <span className="text-sm font-serif italic text-primary-text/40">Digital License</span>
            </div>

            <div className="text-4xl font-black text-primary-text mb-10 tracking-tight">
              £{product.price}
            </div>

            {/* ACTION AREA */}
            <div className="max-w-md">
               <AddToCartButton product={product} />
               <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-widest text-primary-text/20 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 mr-2" /> Encrypted Checkout
              </p>
            </div>

            {/* DESCRIPTION SECTION */}
            <div className="mt-16 space-y-8">
              <div className="space-y-4">
                <h3 className="font-sans font-black text-[10px] uppercase tracking-[0.3em] text-primary-text/30">Overview</h3>
                <p className="font-serif text-lg md:text-xl text-primary-text/70 leading-relaxed italic">
                  {product.description || product.summary}
                </p>
              </div>
              
              <div className="p-8 bg-white/40 backdrop-blur-md rounded-[32px] border border-white/40 shadow-sm">
                <h4 className="font-sans font-black text-[10px] uppercase tracking-widest text-primary-text/40 mb-6">Manifest Content</h4>
                <ul className="space-y-4">
                  <li className="flex items-center text-sm font-bold text-primary-text">
                    <Check className={`w-5 h-5 ${accentText} mr-4`} strokeWidth={3} />
                    <span>Universal Access ({product.format || 'Digital Asset'})</span>
                  </li>
                  <li className="flex items-center text-sm font-bold text-primary-text">
                    <Check className={`w-5 h-5 ${accentText} mr-4`} strokeWidth={3} />
                    <span>Infinite Updates</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
