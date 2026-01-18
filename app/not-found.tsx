"use client";
import { motion } from "framer-motion";
import UniverseCanvas from "../components/UniverseCanvas";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-base">
      
      {/* 1. THE MUSE CORE: Subtle Background Presence */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <UniverseCanvas />
      </div>

      {/* 2. ARCHITECTURAL REDIRECT: Physical Depth Surface */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 max-w-xl w-[92%] p-12 md:p-24 brand-card surface-mocha text-center"
      >
        {/* LARGE WATERMARK: Subtle presence, not noise */}
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] font-semibold text-brand-text/[0.03] leading-none select-none pointer-events-none">
          404
        </h1>
        
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-semibold font-sans text-brand-text tracking-tight leading-none">
              Lost in the <br/> Registry
            </h2>
            <p className="font-medium text-[17px] text-brand-text/50 leading-relaxed max-w-sm mx-auto">
              The asset you are seeking cannot be located in our current directory.
            </p>
          </div>

          <div className="pt-8">
            <Link 
              href="/"
              className="btn-primary group inline-flex items-center gap-4 text-[11px] tracking-[0.3em]"
            >
              RETURN TO GALLERY <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-500" />
            </Link>
          </div>

          {/* DISCREET STATUS: Intelligence on Demand */}
          <div className="pt-12 flex justify-center gap-4">
             <div className="w-2 h-2 rounded-full bg-brand-accent/20" />
             <div className="w-2 h-2 rounded-full bg-accent-thermal/20" />
             <div className="w-2 h-2 rounded-full bg-accent-lavender/20" />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
