"use client";
import React from "react";
import { motion } from "framer-motion";
import UniverseCanvas from "../../components/UniverseCanvas";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function MaintenancePage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-base">
      
      {/* 1. BACKGROUND ANIMATION: Subtle visual presence */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <UniverseCanvas />
      </div>

      {/* 2. MAINTENANCE MODAL: Centered content card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 max-w-xl w-[92%] p-12 md:p-24 brand-card surface-mocha text-center overflow-hidden"
      >
        {/* Loading Indicator: Rotating status icon */}
        <div className="mb-14 flex justify-center">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 rounded-full border border-brand-text/5 border-t-brand-accent flex items-center justify-center shadow-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center text-brand-accent/40">
              <Sparkles size={24} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* PAGE CONTENT: Standard maintenance notification */}
        <h1 className="text-4xl md:text-6xl font-semibold font-sans text-brand-text mb-8 tracking-tight leading-none">
          Under <br/> Maintenance
        </h1>
        
        <p className="font-medium text-[17px] text-brand-text/50 leading-relaxed mb-16 px-6">
          The site is currently undergoing a scheduled update to improve your experience. We will be back online shortly.
        </p>

        <div className="space-y-12 relative z-10">
          <Link 
            href="mailto:kynarmuse@gmail.com"
            className="btn-primary group inline-flex items-center gap-4 text-[11px] tracking-[0.3em]"
          >
            CONTACT SUPPORT <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
          
          {/* STATUS INDICATOR: Real-time update signal */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4">
               <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 4, repeat: Infinity }} className="w-2 h-2 rounded-full bg-brand-accent shadow-sm" />
               <div className="w-2 h-2 rounded-full bg-brand-text/5" />
               <div className="w-2 h-2 rounded-full bg-brand-text/5" />
            </div>
            <p className="text-[9px] uppercase tracking-[0.5em] text-brand-text/20 font-bold">
              System Update in Progress
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
