"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Premium Feel: We wait for the window 'load' event, 
    // but cap it at 2.5s so the user isn't stuck if a 3D asset is slow.
    const handleLoad = () => setLoading(false);
    
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      const backupTimer = setTimeout(() => setLoading(false), 2500);
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
            transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } 
          }}
          style={{ transform: "translateZ(0)" }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white"
        >
          {/* 1. KINETIC MORPHING RING */}
          <div className="relative flex items-center justify-center">
            {/* Inner Glow */}
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-24 h-24 bg-home-accent/20 blur-3xl rounded-full"
            />
            
            <motion.div
              animate={{ 
                rotate: 360,
                borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
                scale: [1, 1.15, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-16 h-16 border-[3px] border-home-accent border-r-tools-accent border-b-life-accent shadow-2xl"
            />
          </div>
          
          {/* 2. MINIMALIST TYPOGRAPHY */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary-text/30">
              Initializing
            </h2>
            <p className="mt-2 text-sm font-serif italic text-primary-text/60">
              Kynar Universe
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
