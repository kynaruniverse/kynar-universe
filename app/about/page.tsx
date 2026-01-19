"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import UniverseCanvas from "../../components/UniverseCanvas";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
// 1. Import the unified theme utility
import { CATEGORY_THEMES } from "../../lib/theme";

export default function AboutPage() {
  const containerRef = useRef(null);
  
  // 1. SCROLL PERFORMANCE
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 80 });

  // 2. DYNAMIC COLOR TRANSFORMATION
  // This maps the scroll position to your three brand colors
  const scrollColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#4A5D4E", "#9B94B0", "#D97E6E"] // Tools -> Life -> Home
  );

  return (
    <main ref={containerRef} className="relative bg-brand-base transition-colors duration-1000">
      
      {/* BACKGROUND */}
      <div className="fixed top-0 h-[100dvh] w-full z-0 overflow-hidden opacity-50 pointer-events-none">
        <UniverseCanvas />
      </div>

      {/* 3. THEMED PROGRESS BAR: Now changes color as you scroll */}
      <motion.div 
        style={{ 
          scaleX: smoothProgress,
          backgroundColor: scrollColor 
        }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left opacity-60"
      />

      <div className="relative z-10">
        
        {/* SECTION 1: THE MISSION (Efficiency / Tools Focus) */}
        <section className="min-h-[100dvh] flex flex-col items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-6xl text-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent mb-8 block">
              {CATEGORY_THEMES.Tools.label}
            </span>
            <h1 className="text-6xl md:text-[120px] font-semibold font-sans tracking-tight mb-12 leading-[0.9] text-brand-text">
              Quality Tools. <br/> Better Work.
            </h1>
            <p className="text-lg md:text-2xl font-medium text-brand-text/50 leading-relaxed max-w-2xl mx-auto px-4">
              Kynar was established to refine your digital workflow—replacing complexity with intentionality.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: THE PHILOSOPHY (Creation / Life Focus) */}
        <section className="min-h-[100dvh] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-5xl p-10 md:p-24 card-elevated surface-frosted relative overflow-hidden border-t-4 border-accent-lavender"
          >
            <div className="absolute top-0 right-0 p-12 text-accent-lavender/10">
              <Sparkles size={140} strokeWidth={1} />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-lavender mb-8 block">
              {CATEGORY_THEMES.Life.label}
            </span>
            <h2 className="text-4xl md:text-6xl font-semibold font-sans mb-10 tracking-tight text-brand-text leading-[1.1]">
              Simplicity <br/> in Every Interaction.
            </h2>
            <p className="text-xl md:text-2xl text-brand-text/60 mb-14 leading-relaxed font-medium">
              We believe in <span className="text-brand-text font-semibold underline underline-offset-8 decoration-accent-lavender/20">digital products built to last</span>—designed to endure, assist, and inspire.
            </p>
            
            <div className="flex items-center gap-4">
               <div className={`h-1 w-16 ${CATEGORY_THEMES.Tools.bg} rounded-full opacity-60`} />
               <div className={`h-1 w-8 ${CATEGORY_THEMES.Home.bg} rounded-full opacity-40`} />
               <div className={`h-1 w-4 ${CATEGORY_THEMES.Life.bg} rounded-full opacity-30`} />
            </div>
          </motion.div>
        </section>

        {/* SECTION 3: THE FUTURE (Growth / Home Focus) */}
        <section className="min-h-[100dvh] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="max-w-4xl text-center space-y-14"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-thermal mb-4 block">
              {CATEGORY_THEMES.Home.label}
            </span>
            <h2 className="text-6xl md:text-[100px] font-semibold font-sans tracking-tighter leading-[0.9] text-brand-text">
              Join the <br/> Shop.
            </h2>
            <p className="text-lg font-medium text-brand-text/30 max-w-md mx-auto">
              Create an account today to manage your digital products and resources.
            </p>
            <div className="pt-6">
              <Link 
                href="/account"
                className={`btn-primary group inline-flex items-center gap-4 text-[10px] tracking-[0.3em] ${CATEGORY_THEMES.Home.bg} hover:brightness-110`}
              >
                CREATE ACCOUNT <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
