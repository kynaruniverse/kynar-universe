"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProductCardProps {
  title: string;
  category: string;
  price: number;
  summary: string;
  slug: string;
  image?: string;
}

export default function ProductCard({ title, category, price, summary, slug, image }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // 1. TILT LOGIC (Optimized for Mobile Performance)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Softer spring for a more "liquid" premium feel
  const mouseXSpring = useSpring(x, { damping: 30, stiffness: 200 });
  const mouseYSpring = useSpring(y, { damping: 30, stiffness: 200 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isTools = category === 'Tools';
  const isLife = category === 'Life';
  const accentColor = isTools ? 'text-tools-accent' : isLife ? 'text-life-accent' : 'text-cat-home-accent';
  const glowColor = isTools ? 'bg-tools-accent' : isLife ? 'bg-life-accent' : 'bg-cat-home-accent';

  return (
    <Link href={`/marketplace/${slug}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.97 }} 
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative flex flex-col h-full rounded-[40px] p-6 transition-all duration-500 
          bg-white/40 backdrop-blur-2xl border border-white/40 
          hover:shadow-glass hover:bg-white/60 overflow-hidden will-change-transform"
      >
        {/* 2. KINETIC GLOW */}
        <div className={`absolute -inset-20 opacity-0 group-hover:opacity-10 group-active:opacity-20 transition-opacity duration-700 blur-[80px] pointer-events-none ${glowColor}`} />

        {/* 3. IMAGE AREA WITH SHARED LAYOUT */}
        <div 
          style={{ transform: "translateZ(50px)" }} 
          className="w-full aspect-square mb-6 overflow-hidden rounded-[28px] bg-gray-50/50 relative shadow-inner border border-black/5"
        >
          {image ? (
            <motion.img 
              layoutId={`image-${slug}`}
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center opacity-10 ${glowColor}`}>
               <Sparkles className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* 4. CONTENT AREA */}
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col flex-grow">
          <div className="mb-4">
            <span className={`text-[9px] font-black tracking-[0.3em] uppercase ${accentColor} border border-current/10 px-3 py-1.5 rounded-full bg-white/40 backdrop-blur-sm`}>
              {category}
            </span>
          </div>

          <h3 className="text-2xl font-black font-sans text-primary-text mb-2 tracking-tighter uppercase leading-none group-hover:text-black transition-colors">
            {title}
          </h3>
          <p className="font-serif text-primary-text/40 text-sm leading-relaxed mb-8 line-clamp-2 italic pr-4">
            {summary}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6 border-t border-black/5">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-primary-text/20 uppercase tracking-widest">Price</span>
              <span className="text-xl font-black font-sans text-primary-text tracking-tighter">£{price}</span>
            </div>
            <div className="w-10 h-10 bg-primary-text text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
