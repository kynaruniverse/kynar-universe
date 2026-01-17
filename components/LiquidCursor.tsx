"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";

export default function LiquidCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();

  // 1. Position motion values
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const scale = useMotionValue(1);

  // 2. Liquid Physics: High damping for a "viscous" fluid feel
  const springConfig = { damping: 50, stiffness: 100, mass: 1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const cursorScale = useSpring(scale, { damping: 20, stiffness: 200 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setIsDesktop(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    const handleMouseDown = () => scale.set(1.2);
    const handleMouseUp = () => scale.set(1);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, scale]);

  // 3. DYNAMIC SECTOR COLORING
  const isTools = pathname.includes('Tools') || pathname.includes('tools');
  const isLife = pathname.includes('Life') || pathname.includes('life');
  
  const gradientColor = isTools 
    ? "from-tools-accent/40 via-tools-accent/10 to-transparent" 
    : isLife 
    ? "from-life-accent/40 via-life-accent/10 to-transparent" 
    : "from-home-accent/30 via-home-accent/10 to-transparent";

  if (!isDesktop) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        scale: cursorScale,
      }}
      className={`pointer-events-none fixed top-0 left-0 z-[-1] h-[300px] w-[300px] rounded-full bg-gradient-to-br ${gradientColor} blur-[120px] will-change-transform opacity-50 transition-colors duration-1000`}
    />
  );
}
