"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
// 1. Import the unified theme utility
import { getCategoryTheme } from '../lib/theme';

interface ProductCardProps {
  title: string;
  category: string;
  price: number;
  summary: string;
  slug: string;
  image?: string;
  creator?: string; 
  rating?: number;  
  sales?: string;   
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

  // 2. Access the theme directly from the central utility
  const theme = getCategoryTheme(category);

  return (
    <Link href={`/marketplace/${slug}`} className="block h-full" aria-label={`View ${title} product details`}>
      <motion.div
        whileHover={{ y: -8 }}
        // 3. Dynamic top border uses the central theme
        className={`group relative flex flex-col h-full card-elevated shadow-tactile-hover overflow-hidden transition-all duration-slow border-t-4 ${theme.border}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-base">
          {image ? (
            <motion.img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-liquid ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center surface-frosted">
               <div className="w-12 h-12 rounded-full border border-brand-text/10 flex items-center justify-center">
                  <span className="text-brand-text/20 text-[10px] font-bold uppercase tracking-widest">Kynar</span>
               </div>
            </div>
          )}
          <div className="absolute inset-0 bg-brand-text/5 opacity-0 group-hover:opacity-100 transition-opacity duration-slow pointer-events-none" />
        </div>

        <div className="p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold tracking-tight text-brand-text leading-tight group-hover:text-brand-accent transition-colors duration-base">
              {title}
            </h3>
          </div>
          
          {/* 4. Category text now uses the central theme color */}
          <p className={`text-[11px] font-bold uppercase tracking-widest mb-1 ${theme.text}`}>
            {category}
          </p>
          
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text/20 mb-4">
            by {creator}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1">
              <Star size={10} className="text-accent-thermal fill-accent-thermal" />
              <span className="text-[10px] font-bold text-brand-text/50">{rating}</span>
            </div>
            <span className="text-[10px] font-medium text-brand-text/20 uppercase tracking-widest">
              {sales} Sales
            </span>
          </div>

          <div className="mt-auto pt-6 border-t border-brand-surface/10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold tracking-tight text-brand-text">
                £{price}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-text/40 group-hover:text-brand-text transition-all duration-base">
              <span>View Product</span>
              <div className="w-8 h-8 rounded-full bg-brand-base flex items-center justify-center group-hover:bg-brand-text group-hover:text-white transition-all duration-slow shadow-tactile">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
