"use client";
import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";

export default function MagneticLogo() {
  const ref = useRef<HTMLDivElement>(null);

  // 1. Position motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2. Spring physics: High stiffness, low mass for a "Light & Snappy" feel
  const springConfig = { damping: 12, stiffness: 180, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    // Only run on devices with a mouse (pointer: fine)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // 0.35 pull strength feels more "Magnetic" than 0.3
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center p-4 touch-none" 
    >
      <Link href="/">
        <motion.div
          ref={ref}
          style={{
            x: springX,
            y: springY,
          }}
          // KINETIC TOUCH FEEDBACK:
          // On phones, the logo "reacts" to the press instead of the hover
          whileTap={{ scale: 0.9, rotate: -2 }} 
          className="text-2xl md:text-3xl font-black font-sans text-primary-text tracking-tighter cursor-pointer select-none"
        >
          KYNAR
        </motion.div>
      </Link>
    </div>
  );
}
