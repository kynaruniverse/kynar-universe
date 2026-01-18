"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function LiquidCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  
  // 1. Position motion values
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const scale = useMotionValue(1);
  
  // 2. Liquid Physics: Increased mass and damping for a "Premium Viscous" feel
  // This makes the glow feel like it has actual physical weight.
  const springConfig = { damping: 60, stiffness: 80, mass: 1.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const cursorScale = useSpring(scale, { damping: 30, stiffness: 150 });
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setIsDesktop(mediaQuery.matches);
    
    if (!mediaQuery.matches) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Centering the 400px glow on the cursor
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };
    
    const handleMouseDown = () => scale.set(1.15);
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
  
  if (!isDesktop) return null;
  
  return ( <
    motion.div style = {
      {
        x: cursorX,
        y: cursorY,
        scale: cursorScale,
      }
    }
    // Muse Engine Style: A faint Mocha/Stone glow that reveals texture
    className = "pointer-events-none fixed top-0 left-0 z-[-1] h-[400px] w-[400px] rounded-full bg-brand-surface/10 blur-[140px] will-change-transform opacity-60 transition-opacity duration-1000" /
    >
  );
}