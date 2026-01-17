"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Premium Feel: We wait for the window 'load' event, 
    // but cap it at 3s to ensure the user isn't stuck.
    const handleLoad = () => setLoading(false);
    
    if (document.readyState === "complete") {
      // Small delay even if ready to prevent "flicker"
      const flickerTimer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(flickerTimer);
    } else {
      window.addEventListener("load", handleLoad);
      const backupTimer = setTimeout(() => setLoading(false), 3000);
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
            transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] } 
          }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white"
        >
          {/* 1. KINETIC MORPHING RING (The Core) */}
          <div className="relative flex items-center justify-center">
            {/* Pulsing Aura */}
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute w-32 h-32 bg-home-accent/30 blur-[60px] rounded-full"
            />
            
            <motion.div
              animate={{ 
                rotate: 360,
                borderRadius: ["40% 60% 60% 40% / 40% 40% 60% 60%", "50%", "40% 60% 60% 40% / 40% 40% 60% 60%"],
                scale: [1, 1.1, 1],
                borderWidth: ["2px", "4px", "2px"]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="w-20 h-20 border-t-tools-accent border-r-life-accent border-b-cat-home-accent border-l-home-accent shadow-premium"
            />
          </div>
          
          {/* 2. MINIMALIST TYPOGRAPHY */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-16 text-center space-y-2"
          >
            <h2 className="text-[10px] font-black tracking-[0.6em] uppercase text-primary-text/20">
              Synchronizing
            </h2>
            <p className="text-xl font-serif italic text-primary-text/60">
              Kynar Universe
            </p>
          </motion.div>

          {/* 3. SUBTLE PROGRESS LINE */}
          <div className="absolute bottom-20 w-32 h-[1px] bg-black/5 overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-home-accent to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
