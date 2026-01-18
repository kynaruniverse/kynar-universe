"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import UniverseCanvas from "../../components/UniverseCanvas";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef(null);
  
  // 1. SCROLL TRACKING: Unhurried and smooth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 80 });

  return (
    <main ref={containerRef} className="relative bg-brand-base transition-colors duration-1000">
      
      {/* 1. PERSISTENT MUSE BACKGROUND: Intelligence on Demand */}
      <div className="fixed top-0 h-[100dvh] w-full z-0 overflow-hidden opacity-50 pointer-events-none">
        <UniverseCanvas />
      </div>

      {/* 2. PROGRESS INDICATOR: Subtle Protocol Line */}
      <motion.div 
        style={{ scaleX: smoothProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-accent z-[100] origin-left opacity-30"
      />

      {/* 3. EDITORIAL CONTENT LAYERS */}
      <div className="relative z-10">
        
        {/* SECTION 1: THE VISION */}
        <section className="min-h-[100dvh] flex flex-col items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-6xl text-center"
          >
            <h1 className="text-6xl md:text-[120px] font-semibold font-sans tracking-tight mb-12 leading-[0.9] text-brand-text">
              Curated Logic. <br/> Refined Living.
            </h1>
            <p className="text-lg md:text-2xl font-medium text-brand-text/50 leading-relaxed max-w-2xl mx-auto px-4">
              Kynar Muse was established to refine the modern digital journey—replacing noise with intentionality.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: THE PHILOSOPHY (Tactile Surface) */}
        <section className="min-h-[100dvh] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-5xl p-10 md:p-24 brand-card surface-mocha relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 text-brand-accent/10">
              <Sparkles size={140} strokeWidth={1} />
            </div>

            <h2 className="text-4xl md:text-6xl font-semibold font-sans mb-10 tracking-tight text-brand-text leading-[1.1]">
              Quiet Luxury <br/> in Every Interaction.
            </h2>
            <p className="text-xl md:text-2xl text-brand-text/60 mb-14 leading-relaxed font-medium">
              We believe in <span className="text-brand-text font-semibold underline underline-offset-8 decoration-brand-accent/20">software that feels like a physical heirloom</span>—designed to endure, assist, and inspire.
            </p>
            
            <div className="flex items-center gap-4">
               <div className="h-1 w-16 bg-brand-accent rounded-full opacity-60" />
               <div className="h-1 w-8 bg-accent-thermal rounded-full opacity-40" />
               <div className="h-1 w-4 bg-accent-lavender rounded-full opacity-30" />
            </div>
          </motion.div>
        </section>

        {/* SECTION 3: THE REGISTRY CALL */}
        <section className="min-h-[100dvh] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl text-center space-y-14"
          >
            <h2 className="text-6xl md:text-[100px] font-semibold font-sans tracking-tighter leading-[0.9] text-brand-text">
              Establish <br/> Your Presence.
            </h2>
            <p className="text-lg font-medium text-brand-text/30 max-w-md mx-auto">
              Join the private registry and begin curating your premium digital library today.
            </p>
            <div className="pt-6">
              <Link 
                href="/account"
                className="btn-primary group inline-flex items-center gap-4 text-[10px] tracking-[0.3em]"
              >
                REGISTER IDENTITY <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
