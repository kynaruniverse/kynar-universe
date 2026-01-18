"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Lightbulb, Coffee, Sparkles, Terminal } from 'lucide-react';

export default function Guides() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.19, 1, 0.22, 1] } 
    }
  };

  return (
    <main className="min-h-screen bg-life-base pb-32 transition-colors duration-1000 ease-in-out">
      
      {/* 1. HERO SECTION */}
      <section className="px-6 py-24 md:py-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[24px] bg-white/40 text-life-accent mb-4 shadow-glass border border-white/40">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-sans text-primary-text tracking-tighter uppercase leading-[0.85]">
            Guides
          </h1>
          <p className="text-xl md:text-3xl font-serif text-primary-text/40 italic leading-relaxed px-4 max-w-2xl mx-auto">
            Helpful tips, step-by-step guides, and resources to help you succeed.
          </p>
        </motion.div>
      </section>

      {/* 2. FEATURED GUIDES GRID */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* ARTICLE CARD 1: TOOLS */}
          <motion.article 
            variants={itemVariants}
            className="group relative bg-white/40 backdrop-blur-3xl rounded-[48px] p-10 md:p-16 border border-white/60 shadow-glass hover:bg-white/60 transition-all duration-700 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-life-accent/10 blur-[100px] rounded-full group-hover:bg-life-accent/20 transition-all duration-1000" />
            
            <div className="relative z-10">
              <div className="text-life-accent mb-10 bg-white/80 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-black/5">
                <Terminal className="w-7 h-7" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-sans text-primary-text mb-6 tracking-tighter leading-[0.9] uppercase group-hover:text-black">
                Staying in the<br/> Zone
              </h2>
              <p className="font-serif text-lg md:text-xl text-primary-text/50 mb-12 leading-relaxed italic pr-6">
                Just starting with digital planning? Here is a simple guide to help you get organized.
              </p>
            </div>

            <Link href="#" className="relative z-10 inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-primary-text group-hover:gap-4 transition-all">
              Download Now <ArrowRight className="ml-2 w-4 h-4 text-life-accent" />
            </Link>
          </motion.article>

          {/* ARTICLE CARD 2: LIFE */}
          <motion.article 
            variants={itemVariants}
            className="group relative bg-white/40 backdrop-blur-3xl rounded-[48px] p-10 md:p-16 border border-white/60 shadow-glass hover:bg-white/60 transition-all duration-700 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-home-accent/10 blur-[100px] rounded-full group-hover:bg-home-accent/20 transition-all duration-1000" />

            <div className="relative z-10">
              <div className="text-home-accent mb-10 bg-white/80 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-black/5">
                <Coffee className="w-7 h-7" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-sans text-primary-text mb-6 tracking-tighter leading-[0.9] uppercase group-hover:text-black">
                Daily <br/> Rituals
              </h2>
              <p className="font-serif text-lg md:text-xl text-primary-text/50 mb-12 leading-relaxed italic pr-6">
                Learn how to build healthy daily habits that help you stay calm and focused.
              </p>
            </div>

            <Link href="#" className="relative z-10 inline-flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-primary-text group-hover:gap-4 transition-all">
              Initiate Download <ArrowRight className="ml-2 w-4 h-4 text-home-accent" />
            </Link>
          </motion.article>

        </div>
      </motion.section>

      {/* 3. Help Center */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 text-center py-24 mt-12"
      >
        <div className="p-16 md:p-24 rounded-[64px] bg-white/30 border border-white/20 backdrop-blur-3xl shadow-glass relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-life-accent/20 to-transparent" />
          
          <Sparkles className="w-8 h-8 mx-auto mb-8 text-life-accent opacity-40" />
          <h3 className="text-4xl md:text-6xl font-black font-sans text-primary-text mb-6 tracking-tighter uppercase">Help Center</h3>
          <p className="font-serif text-xl text-primary-text/40 mb-12 italic max-w-xl mx-auto">
            We are here to help with installation, compatibility, and any other questions.
          </p>
          <Link 
            href="/help" 
            className="inline-flex items-center px-12 py-6 bg-primary-text text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Access Help Center
          </Link>
        </div>
      </motion.section>

    </main>
  );
}
