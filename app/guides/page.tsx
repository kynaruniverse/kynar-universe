"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Coffee, Sparkles, Terminal } from 'lucide-react';

export default function Guides() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] } 
    }
  };

  return (
    <main className="min-h-screen bg-brand-base pb-32 transition-colors duration-1000">
      
      {/* 1. HEADER SECTION */}
      <section className="px-6 py-24 md:py-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-4xl mx-auto space-y-10"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-inner bg-brand-surface/10 text-brand-accent mb-4 shadow-sm">
            <BookOpen className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <h1 className="text-6xl md:text-[100px] font-semibold font-sans text-brand-text tracking-tight leading-[0.9]">
            Guides
          </h1>
          <p className="text-lg md:text-2xl font-medium text-brand-text/50 leading-relaxed px-4 max-w-2xl mx-auto">
            Useful tips and resources to help you organize your digital and physical spaces.
          </p>
        </motion.div>
      </section>

      {/* 2. ARTICLE LISTING */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
          
          {/* ARTICLE CARD 1 */}
          <motion.article 
            variants={itemVariants}
            className="brand-card p-10 md:p-16 hover:shadow-tactile-hover transition-all duration-700 flex flex-col justify-between group"
          >
            <div className="relative">
              <div className="text-brand-accent mb-12 bg-brand-base w-14 h-14 rounded-inner flex items-center justify-center shadow-sm">
                <Terminal className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold font-sans text-brand-text mb-8 tracking-tight leading-[1.1]">
                Organize Your <br/> Digital Life
              </h2>
              <p className="font-medium text-[17px] text-brand-text/50 mb-14 leading-relaxed pr-6">
                How to set up your space and tools for better focus and flow.
              </p>
            </div>

            <Link href="#" className="btn-primary self-start group/btn inline-flex items-center text-[10px] tracking-[0.25em]">
              READ GUIDE <ArrowRight className="ml-3 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </motion.article>

          {/* ARTICLE CARD 2 */}
          <motion.article 
            variants={itemVariants}
            className="brand-card p-10 md:p-16 hover:shadow-tactile-hover transition-all duration-700 flex flex-col justify-between group"
          >
            <div className="relative">
              <div className="text-accent-thermal mb-12 bg-brand-base w-14 h-14 rounded-inner flex items-center justify-center shadow-sm">
                <Coffee className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold font-sans text-brand-text mb-8 tracking-tight leading-[1.1]">
                Build <br/> Productive Habits
              </h2>
              <p className="font-medium text-[17px] text-brand-text/50 mb-14 leading-relaxed pr-6">
                How to structure daily routines that support focus and creativity.
              </p>
            </div>

            <Link href="#" className="btn-primary self-start group/btn inline-flex items-center text-[10px] tracking-[0.25em]">
              READ GUIDE <ArrowRight className="ml-3 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </motion.article>

        </div>
      </motion.section>

      {/* 3. SUPPORT FOOTER */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 text-center py-24 mt-12"
      >
        <div className="p-16 md:p-24 brand-card surface-mocha relative overflow-hidden">
          <Sparkles className="w-8 h-8 mx-auto mb-10 text-brand-accent opacity-30" />
          <h3 className="text-4xl md:text-6xl font-semibold font-sans text-brand-text mb-8 tracking-tight">Help Center</h3>
          <p className="font-medium text-lg md:text-xl text-brand-text/40 mb-14 max-w-xl mx-auto">
            Answers, guidance, and support for all your digital products.
          </p>
          <Link 
            href="/help" 
            className="btn-primary py-6 px-14 text-[11px] tracking-[0.3em]"
          >
            Visit Help Center
          </Link>
        </div>
      </motion.section>

    </main>
  );
}
