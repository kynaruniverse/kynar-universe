'use client';

import React, { useState } from 'react';

/**
 * Product Preview Gallery
 * Purpose:
 * - Display product images in a focused view
 * - Mobile-first horizontal swipe/scroll
 * - Minimalist navigation dots
 */

interface ProductPreviewProps {
  images: string[];
  world?: 'home' | 'lifestyle' | 'tools';
}

export default function ProductPreview({ images, world = 'home' }: ProductPreviewProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Fallback if no images are provided
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full bg-kyn-mist rounded-[40px] border border-kyn-slate-500/10 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-kyn-slate-500/20" />
      </div>
    );
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const newIdx = Math.round(scrollLeft / width);
    if (newIdx !== activeIdx) setActiveIdx(newIdx);
  };

  const dotColors = {
    home: 'bg-kyn-green-500',
    lifestyle: 'bg-kyn-caramel-500',
    tools: 'bg-kyn-slate-500',
  };

  return (
    <div className="relative group w-full">
      {/* 1. Swipeable Container */}
      <div 
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-[40px] aspect-square bg-kyn-mist border border-kyn-slate-500/10"
      >
        {images.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-full h-full snap-center">
            <img 
              src={src} 
              alt={`Preview ${i + 1}`} 
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>
        ))}
      </div>

      {/* 2. Minimalist Dots Navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {images.map((_, i) => (
            <div 
              key={i}
              className={`
                h-1.5 rounded-full transition-all duration-300
                ${activeIdx === i 
                  ? `w-6 ${dotColors[world]}` 
                  : 'w-1.5 bg-white/50 backdrop-blur-sm'}
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}
