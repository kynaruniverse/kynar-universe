"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import UniverseCanvas from "../../components/UniverseCanvas";
import Link from "next/link";

export default function AboutPage() {
  const containerRef = useRef(null);
  
  // 1. SCROLL TRACKING
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 2. KINETIC COLOR TRANSITION
  // Smooth the scroll value so the 3D color doesn't "jump" on jerky thumb scrolls
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  const sphereColor = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["#A88BFF", "#8ED9A1", "#FFCEB8"]
  );

  return (
    <main ref={containerRef} className="relative bg-home-base">
      
      {/* 1. PERSISTENT 3D BACKGROUND (STAYING STICKY) */}
      <div className="sticky top-0 h-[100dvh] w-full z-0 overflow-hidden opacity-30 md:opacity-50 pointer-events-none">
        <UniverseCanvas activeColor={sphereColor as any} />
      </div>

      {/* 2. SCROLL PROGRESS INDICATOR (Mobile UX) */}
      <motion.div 
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-home-accent z-[100] origin-left"
      />

      {/* 3. SCROLLING CONTENT LAYERS */}
      <div className="relative z-10 -mt-[100dvh]">
        
        {/* SECTION 1: THE VISION */}
        <section className="min-h-[100dvh] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl text-center"
          >
            <h1 className="text-5xl md:text-8xl font-black font-sans tracking-tighter mb-8 uppercase leading-[0.9]">
              One Universe. <br/> Infinite Growth.
            </h1>
            <p className="text-lg md:text-2xl font-serif italic text-primary-text/60 leading-relaxed max-w-2xl mx-auto px-4">
              Kynar was born from a simple realization: the digital world is too loud. 
              We created a space that breathes—where tools feel like extensions of your intent.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: THE PHILOSOPHY (Glass Card) */}
        <section className="min-h-[100dvh] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-10% "}}
            className="max-w-4xl p-8 md:p-16 rounded-[48px] bg-white/40 backdrop-blur-3xl border border-white/40 shadow-glass will-change-transform"
          >
            <h2 className="text-3xl md:text-5xl font-black font-sans mb-8 tracking-tighter uppercase text-primary-text">Gently Alive UI</h2>
            <p className="text-base md:text-xl text-primary-text/70 mb-8 leading-relaxed font-serif italic">
              We believe in <span className="text-primary-text font-bold not-italic">"Premium Kineticism."</span> Every interaction should feel liquid, responsive, and human. Our design language uses glassmorphism and 3D depth to create a sense of emotional safety.
            </p>
            <div className="flex gap-4">
               <div className="w-12 h-[2px] bg-tools-accent" />
               <div className="w-12 h-[2px] bg-life-accent" />
               <div className="w-12 h-[2px] bg-cat-home-accent" />
            </div>
          </motion.div>
        </section>

        {/* SECTION 3: THE FUTURE */}
        <section className="min-h-[100dvh] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-center space-y-10"
          >
            <h2 className="text-5xl md:text-7xl font-black font-sans tracking-tighter uppercase leading-none">
              Your Journey <br/> Starts Here.
            </h2>
            <Link 
              href="/account"
              className="inline-block px-12 py-5 bg-primary-text text-white rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest"
            >
              Establish Presence
            </Link>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
