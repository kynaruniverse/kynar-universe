"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import UniverseCanvas from "../../components/UniverseCanvas";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef(null);
  
  // 1. SCROLL TRACKING
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 2. KINETIC COLOR TRANSITION
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Transitions from Tools (Violet) -> Life (Green) -> Home (Peach)
  const sphereColor = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["#A88BFF", "#8ED9A1", "#FFCEB8"]
  );

  return (
    <main ref={containerRef} className="relative bg-home-base transition-colors duration-1000">
      
      {/* 1. PERSISTENT 3D BACKGROUND (Sticky Layer) */}
      <div className="sticky top-0 h-[100dvh] w-full z-0 overflow-hidden opacity-40 md:opacity-60 pointer-events-none">
        <UniverseCanvas activeColor={sphereColor as any} />
      </div>

      {/* 2. SCROLL PROGRESS (UK Digital Standard UX) */}
      <motion.div 
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary-text z-[100] origin-left"
      />

      {/* 3. SCROLLING CONTENT LAYERS */}
      <div className="relative z-10 -mt-[100dvh]">
        
        {/* SECTION 1: THE VISION */}
        <section className="min-h-[100dvh] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-5xl text-center"
          >
            <h1 className="text-6xl md:text-9xl font-black font-sans tracking-tighter mb-10 uppercase leading-[0.8] text-primary-text">
              One Universe. <br/> Infinite Solutions.
            </h1>
            <p className="text-xl md:text-3xl font-serif italic text-primary-text/40 leading-relaxed max-w-2xl mx-auto px-4">
              We created Kynar to help you clear the clutter and: <br className="hidden md:block"/> Focus on what matters.
            </p>
          </motion.div>
        </section>

        {/* SECTION 2: THE PHILOSOPHY (Glass Card) */}
        <section className="min-h-[100dvh] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-20%" }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-5xl p-10 md:p-20 rounded-[64px] bg-white/40 backdrop-blur-3xl border border-white/60 shadow-glass relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Sparkles size={120} />
            </div>

            <h2 className="text-4xl md:text-6xl font-black font-sans mb-10 tracking-tighter uppercase text-primary-text leading-none">
              Gently Alive <br/> Intuitive & Simple
            </h2>
            <p className="text-xl md:text-2xl text-primary-text/50 mb-12 leading-relaxed font-serif italic">
              We believe in <span className="text-primary-text font-black not-italic uppercase tracking-widest text-sm bg-white/50 px-3 py-1 rounded-lg">high-quality design that feels natural and makes your day easier.</span>
              </p>
            
            <div className="flex items-center gap-6">
               <div className="h-1 w-20 bg-tools-accent rounded-full" />
               <div className="h-1 w-12 bg-life-accent rounded-full" />
               <div className="h-1 w-8 bg-cat-home-accent rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* SECTION 3: THE CALL TO ACCOUNT */}
        <section className="min-h-[100dvh] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl text-center space-y-12"
          >
            <h2 className="text-6xl md:text-8xl font-black font-sans tracking-tighter uppercase leading-[0.85] text-primary-text">
              Join <br/> the Community.
            </h2>
            <p className="text-lg font-serif italic text-primary-text/30 max-w-md mx-auto">
              Sign up today and become part of the growing community using our premium digital tools.
            </p>
            <div className="pt-6">
              <Link 
                href="/account"
                className="inline-flex items-center px-16 py-6 bg-primary-text text-white rounded-full font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}
