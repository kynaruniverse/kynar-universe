"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Lightbulb, Coffee, Sparkles } from 'lucide-react';

export default function Guides() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <main className="min-h-screen bg-life-base pb-32 transition-colors duration-1000">
      
      {/* 1. HERO SECTION */}
      <section className="px-6 py-24 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-[20px] bg-life-accent/10 text-life-accent mb-4 shadow-inner">
            <BookOpen className="w-7 h-7" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-sans text-primary-text tracking-tighter uppercase leading-none">
            Journal
          </h1>
          <p className="text-lg md:text-2xl font-serif text-primary-text/60 italic leading-relaxed px-4">
            Ideas, tutorials, and cosmic resources <br className="hidden md:block" /> for your digital journey.
          </p>
        </motion.div>
      </section>

      {/* 2. FEATURED GUIDES GRID */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* ARTICLE CARD 1 */}
          <motion.article 
            variants={itemVariants}
            className="group relative bg-white/40 backdrop-blur-2xl rounded-[40px] p-8 md:p-12 border border-white/40 shadow-glass hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-life-accent/10 blur-[80px] rounded-full group-hover:bg-life-accent/20 transition-colors" />
            
            <div className="relative z-10">
              <div className="text-life-accent mb-8 bg-white/60 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold font-sans text-primary-text mb-4 tracking-tight leading-tight group-hover:text-black">
                Getting Started with Digital Tools
              </h2>
              <p className="font-serif text-lg text-primary-text/60 mb-10 leading-relaxed italic">
                New to digital planning? A gentle introduction to setting up your first workspace without the overwhelm.
              </p>
              <Link href="#" className="inline-flex items-center text-sm font-black uppercase tracking-widest text-primary-text group-hover:gap-3 transition-all">
                Read Manifest <ArrowRight className="ml-2 w-4 h-4 text-life-accent" />
              </Link>
            </div>
          </motion.article>

          {/* ARTICLE CARD 2 */}
          <motion.article 
            variants={itemVariants}
            className="group relative bg-white/40 backdrop-blur-2xl rounded-[40px] p-8 md:p-12 border border-white/40 shadow-glass hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-life-accent/10 blur-[80px] rounded-full group-hover:bg-life-accent/20 transition-colors" />

            <div className="relative z-10">
              <div className="text-life-accent mb-8 bg-white/60 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">
                <Coffee className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold font-sans text-primary-text mb-4 tracking-tight leading-tight group-hover:text-black">
                Building a Calm Routine
              </h2>
              <p className="font-serif text-lg text-primary-text/60 mb-10 leading-relaxed italic">
                How to use Kynar tools to create moments of pause in a busy day. Less grinding, more living.
              </p>
              <Link href="#" className="inline-flex items-center text-sm font-black uppercase tracking-widest text-primary-text group-hover:gap-3 transition-all">
                Read Manifest <ArrowRight className="ml-2 w-4 h-4 text-life-accent" />
              </Link>
            </div>
          </motion.article>

        </div>
      </motion.section>

      {/* 3. SUB-SECTION: HELP & SUPPORT */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-6 text-center py-20 mt-12"
      >
        <div className="p-12 rounded-[48px] bg-white/20 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-6 h-6 mx-auto mb-6 text-life-accent opacity-50" />
          <h3 className="text-3xl font-bold font-sans text-primary-text mb-4 tracking-tight">Need technical setup?</h3>
          <p className="font-serif text-lg text-primary-text/50 mb-10 italic">
            Our support guides answer common questions about downloads, <br className="hidden md:block" /> formats, and cosmic setup.
          </p>
          <Link 
            href="/help" 
            className="inline-block px-12 py-4 bg-primary-text text-white rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Visit Help Center
          </Link>
        </div>
      </motion.section>

    </main>
  );
}
