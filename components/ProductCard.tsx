"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  title: string;
  category: string;
  price: number;
  summary: string;
  slug: string;
  image?: string;
  creator?: string; // Product Creator/Brand
  rating?: number;  // User Rating
  sales?: string;   // Transaction Volume
}

export default function ProductCard({ 
  title, 
  category, 
  price, 
  summary, 
  slug, 
  image,
  creator = "Kynar",
  rating = 4.9,
  sales = "1.2k+"
}: ProductCardProps) {

  return (
    <Link href={`/marketplace/${slug}`} className="block h-full">
      <motion.div
        whileHover={{ y: -8 }}
        className="group relative flex flex-col h-full brand-card shadow-tactile-hover overflow-hidden transition-all duration-700"
      >
        {/* 1. MEDIA PREVIEW: Static Image with smooth hover transition */}
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-base">
          {image ? (
            <motion.img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center surface-mocha">
               <div className="w-12 h-12 rounded-full border border-brand-text/10 flex items-center justify-center">
                  <span className="text-brand-text/20 text-[10px] font-bold uppercase tracking-widest">Kynar</span>
               </div>
            </div>
          )}
          
          {/* Subtle hover overlay for visual depth */}
          <div className="absolute inset-0 bg-brand-text/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>

        {/* 2. PRODUCT INFO: High-clarity typography */}
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold tracking-tight text-brand-text leading-tight group-hover:text-brand-accent transition-colors duration-500">
              {title}
            </h3>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-text/30 mb-4">
            by {creator}
          </p>

          {/* 3. RATINGS & STATS: Minimal social proof signals */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1">
              <Star size={10} className="text-accent-thermal fill-accent-thermal" />
              <span className="text-[10px] font-bold text-brand-text/50">{rating}</span>
            </div>
            <span className="text-[10px] font-medium text-brand-text/20 uppercase tracking-widest">
              {sales} Sales
            </span>
            <div className="h-3 w-[1px] bg-brand-surface/30" />
            <span className="text-[9px] font-bold text-brand-accent/60 uppercase tracking-tighter">
              Standard License
            </span>
          </div>

          {/* 4. PURCHASE ROW: Pricing & Navigation */}
          <div className="mt-auto pt-6 border-t border-brand-surface/10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold tracking-tight text-brand-text">
                £{price}
              </span>
            </div>
            
            {/* CTA: Focuses interaction on hover */}
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-text/40 group-hover:text-brand-text transition-all duration-500">
              <span>View Product</span>
              <div className="w-8 h-8 rounded-full bg-brand-base flex items-center justify-center group-hover:bg-brand-text group-hover:text-white transition-all duration-700 shadow-tactile">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
