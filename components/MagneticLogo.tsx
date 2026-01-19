"use client";
import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
// 1. Import the unified theme utility
import { getCategoryTheme } from '../lib/theme';

export default function MagneticLogo() {
  const ref = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // 2. Detect the active theme color from the URL
  const activeCategory = searchParams.get('category') || undefined;
  const theme = getCategoryTheme(activeCategory);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * 0.25);
    y.set(distanceY * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center p-4 group" 
    >
      <Link href="/">
        <motion.div
          ref={ref}
          style={{
            x: springX,
            y: springY,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }} 
          className="relative z-10 text-xl md:text-2xl font-semibold text-brand-text tracking-tight cursor-pointer select-none uppercase"
        >
          Kynar
          
          {/* 3. THEMED UNDERLINE: Matches the active category */}
          <motion.div 
            className={`absolute -bottom-1.5 left-0 right-0 h-[1.5px] origin-left transition-colors duration-slow ${theme.bg}`}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 0.4 }} 
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
        </motion.div>
      </Link>

      {/* 4. THEMED GLOW: Background glow reacts to the current category */}
      <div className={`absolute inset-0 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none ${theme.lightBg.replace('/5', '/10')}`} />
    </div>
  );
}
