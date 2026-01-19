"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
// 1. Import your theme configuration
import { CATEGORY_THEMES } from "../lib/theme";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    
    if (document.readyState === "complete") {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    } else {
      window.addEventListener("load", handleLoad);
      const backupTimer = setTimeout(() => setLoading(false), 3500);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(backupTimer);
      };
    }
  }, []);

  // 2. Define the color sequence for the animation
  const themeColors = [
    "#4A5D4E", // Tools (Green)
    "#9B94B0", // Life (Lavender)
    "#D97E6E", // Home (Thermal)
  ];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.015,
            transition: { duration: 1.6, ease: [0.19, 1, 0.22, 1] } 
          }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-brand-base"
        >
          <div className="relative flex items-center justify-center">
            {/* Background Glow - Now cycles through theme colors */}
            <motion.div 
              animate={{ 
                scale: [0.95, 1.1, 0.95],
                opacity: [0.08, 0.12, 0.08],
                backgroundColor: themeColors
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-64 h-64 blur-[120px] rounded-full"
            />
            
            {/* Loading Ring - Top border cycles through brand colors */}
            <motion.div
              animate={{ 
                rotate: 360,
                borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "50%", "42% 58% 70% 30% / 45% 45% 55% 55%"],
                borderTopColor: themeColors
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="w-12 h-12 border-[1.2px] border-brand-text/5 shadow-tactile"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.4 }}
            className="mt-16 text-center space-y-4"
          >
            <p className="font-sans text-2xl font-semibold tracking-tight text-brand-text">
              Kynar
            </p>
            <h2 className="font-body text-[9px] font-bold uppercase tracking-[0.6em] text-brand-text/20">
              Initializing Universe
            </h2>
          </motion.div>

          {/* 3. PROGRESS INDICATOR - Bar cycles through brand colors */}
          <div className="absolute bottom-24 w-28 h-[1px] bg-brand-text/5 overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ 
                x: "100%",
                backgroundColor: themeColors 
              }}
              transition={{ 
                x: { duration: 3.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] },
                backgroundColor: { duration: 6, repeat: Infinity, ease: "linear" }
              }}
              className="w-full h-full opacity-40"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
