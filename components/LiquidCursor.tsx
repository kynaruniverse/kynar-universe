"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function LiquidCursor() {
  const [isDesktop, setIsDesktop] = useState(false);

  // 1. Position motion values
  const mouseX = useMotionValue(-500); // Start off-screen
  const mouseY = useMotionValue(-500);

  // 2. Liquid Physics: Lower stiffness for a "drifting" feel
  const springConfig = { damping: 40, stiffness: 120, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable if the device has a mouse (hover: hover)
    const mediaQuery = window.matchMedia("(hover: hover)");
    setIsDesktop(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 150); // Offset by half width
      mouseY.set(e.clientY - 150); // Offset by half height
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // If mobile, don't render at all to save battery
  if (!isDesktop) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="pointer-events-none fixed inset-0 z-[-1] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-home-accent/30 via-tools-accent/20 to-life-accent/10 blur-[100px] will-change-transform opacity-60"
    />
  );
}
