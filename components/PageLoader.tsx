"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    
    if (document.readyState === "complete") {
      // Muse Engine Unhurried Entry: Slower than a standard app for a luxury feel
      const flickerTimer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(flickerTimer);
    } else {
      window.addEventListener("load", handleLoad);
      const backupTimer = setTimeout(() => setLoading(false), 3500);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(backupTimer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.015, // Subtle expansion on exit
            transition: { duration: 1.6, ease: [0.19, 1, 0.22, 1] } 
          }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-brand-base"
        >
          {/* 1. THE MUSE CORE */}
          <div className="relative flex items-center justify-center">
            {/* Soft Intelligence Aura: Mocha-tinted warmth */}
            <motion.div 
              animate={{ 
                scale: [0.95, 1.1, 0.95],
                opacity: [0.08, 0.12, 0.08] 
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-64 h-64 bg-brand-surface/40 blur-[120px] rounded-full"
            />
            
            {/* The Monochromatic Ring: Viscous motion */}
            <motion.div
              animate={{ 
                rotate: 360,
                borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "50%", "42% 58% 70% 30% / 45% 45% 55% 55%"],
              }}
              transition={{ 
                duration: 8, // Slower rotation for higher perceived value
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="w-12 h-12 border-[1.2px] border-brand-text/5 border-t-brand-accent shadow-tactile"
            />
          </div>
          
          {/* 2. HUMANIST BRANDING */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.4 }}
            className="mt-16 text-center space-y-4"
          >
            <p className="font-sans text-2xl font-semibold tracking-tight text-brand-text">
              Kynar Muse
            </p>
            <h2 className="font-body text-[9px] font-bold uppercase tracking-[0.6em] text-brand-text/20">
              Establishing Presence
            </h2>
          </motion.div>

          {/* 3. LIQUID PROGRESS */}
          <div className="absolute bottom-24 w-28 h-[1px] bg-brand-text/5 overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 3.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
              className="w-full h-full bg-brand-accent/30"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
