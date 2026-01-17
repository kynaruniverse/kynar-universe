"use client";
import React from "react";
import { motion } from "framer-motion";
import UniverseCanvas from "../../components/UniverseCanvas";
import Link from "next/link";

export default function MaintenancePage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-home-base">
      
      {/* 1. KINETIC BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-40 md:opacity-60">
        <UniverseCanvas activeColor="#8FB7FF" />
      </div>

      {/* 2. ENHANCED GLASS CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 max-w-lg w-[88%] p-8 md:p-12 rounded-[40px] bg-white/40 backdrop-blur-3xl border border-white/40 shadow-glass text-center overflow-hidden"
      >
        {/* Subtle Scanning Light Effect */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
        />

        <div className="mb-8 flex justify-center">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 rounded-full border border-dashed border-home-accent/30 flex items-center justify-center"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-4 bg-home-accent rounded-full shadow-[0_0_15px_rgba(143,183,255,0.5)]" 
              />
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black font-sans text-primary-text mb-4 tracking-tighter uppercase">
          Sector Update
        </h1>
        
        <p className="font-serif text-lg text-primary-text/60 italic leading-relaxed mb-10 px-2">
          We are currently refining the Kynar Universe. <br className="hidden md:block" /> 
          The gateway will be restored shortly.
        </p>

        <div className="space-y-6 relative z-10">
          <Link 
            href="mailto:support@kynaruniverse.co.uk"
            className="block w-full py-5 bg-primary-text text-white rounded-full font-bold shadow-xl hover:bg-black active:scale-[0.96] transition-all"
          >
            Signal Support
          </Link>
          
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-home-accent animate-bounce" />
               <div className="w-1.5 h-1.5 rounded-full bg-tools-accent animate-bounce [animation-delay:0.2s]" />
               <div className="w-1.5 h-1.5 rounded-full bg-life-accent animate-bounce [animation-delay:0.4s]" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary-text/30 font-black">
              Status: Optimizing
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
