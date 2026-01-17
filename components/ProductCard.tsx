"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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

  // 1. TILT LOGIC (Desktop Optimized)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Stronger damping for mobile performance stability
  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 150 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }} // Tactile feedback for mobile
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col h-full rounded-card p-5 md:p-6 transition-all duration-500 
        bg-white/40 backdrop-blur-md border border-white/20 
        hover:shadow-glass hover:bg-white/60 overflow-hidden will-change-transform"
    >
      {/* 2. THE CATEGORY GLOW (Enhanced for mobile tap) */}
      <div className={`absolute -inset-px opacity-0 group-hover:opacity-10 group-active:opacity-20 transition-opacity duration-500 blur-2xl ${glowColor}`} />

      {/* 3. IMAGE AREA WITH FLYING TRANSITION */}
      <div 
        style={{ transform: "translateZ(40px)" }} 
        className="w-full aspect-square md:aspect-video mb-5 overflow-hidden rounded-2xl bg-gray-50 relative shadow-inner"
      >
        {image ? (
          <motion.img 
            layoutId={`image-${slug}`}
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center opacity-20 ${glowColor}`}>
             <span className="font-serif italic text-[10px] tracking-widest uppercase">Kynar Universe</span>
          </div>
        )}
      </div>

      {/* 4. CONTENT AREA */}
      <div style={{ transform: "translateZ(25px)" }} className="relative z-10 flex flex-col flex-grow">
        <div className="mb-3">
          <span className={`text-[9px] font-bold tracking-[0.2em] uppercase ${accentColor} border border-current/20 px-2 py-1 rounded-md bg-white/50`}>
            {category}
          </span>
        </div>

        <h3 className="text-xl font-bold font-sans text-primary-text mb-2 tracking-tight group-hover:text-black transition-colors">
          {title}
        </h3>
        <p className="font-serif text-primary-text/60 text-sm leading-relaxed mb-6 line-clamp-2 italic">
          {summary}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-black/5">
          <span className="text-lg font-bold font-sans text-primary-text">£{price}</span>
          <Link href={`/marketplace/${slug}`} className="inline-flex items-center text-sm font-bold text-primary-text group-hover:gap-2 transition-all">
            Choose <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
