"use client";
import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";

export default function MagneticLogo() {
  const ref = useRef<HTMLDivElement>(null);

  // 1. Position tracking values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2. Spring physics: High damping for a smooth, weighted follow effect
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    // Accessibility: Disable magnetic pull on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Movement Logic: Subtle pull multiplier (0.25)
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
          
          {/* Visual Feedback: Brand accent underline on hover */}
          <motion.div 
            className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-brand-accent origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 0.4 }} 
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          />
        </motion.div>
      </Link>

      {/* Hover Highlight: Subtle background glow */}
      <div className="absolute inset-0 bg-brand-surface/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </div>
  );
}
