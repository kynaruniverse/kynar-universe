"use client";
import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";

export default function MagneticLogo() {
  const ref = useRef<HTMLDivElement>(null);

  // 1. Position motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2. Spring physics: Adjusted for a more "viscous" and high-end feel
  const springConfig = { damping: 15, stiffness: 200, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    // Safety: Disable magnetic pull on touch devices to prevent jumpy navigation
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Pull strength set to 0.4 for a more pronounced "catch"
    x.set(distanceX * 0.4);
    y.set(distanceY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center p-2 group" 
    >
      <Link href="/">
        <motion.div
          ref={ref}
          style={{
            x: springX,
            y: springY,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92, rotate: -1 }} 
          className="relative z-10 text-2xl md:text-3xl font-black font-sans text-primary-text tracking-tighter cursor-pointer select-none uppercase leading-none"
        >
          KYNAR
          
          {/* Subtle underline flare */}
          <motion.div 
            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-home-accent origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>
      </Link>

      {/* Kinetic Ambient Glow behind logo */}
      <div className="absolute inset-0 bg-home-accent/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
