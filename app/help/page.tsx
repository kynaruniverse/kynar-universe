"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, FileQuestion, ArrowUpRight, ShieldCheck, Zap, Globe } from 'lucide-react';

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-brand-base pb-32 transition-colors duration-1000">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="px-6 py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h1 className="text-6xl md:text-[100px] font-semibold font-sans text-brand-text mb-8 tracking-tight leading-[0.9]">
            The Trust <br/> Registry
          </h1>
          <p className="text-lg md:text-2xl font-medium text-brand-text/50 max-w-2xl mx-auto leading-relaxed px-4">
            Procedural guidance, asset support, and direct assistance for your journey with the Muse Engine.
          </p>
        </motion.div>
      </section>

      {/* 2. REGISTRY SUPPORT SECTIONS */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
        
        {/* CARD 1: PROCEDURAL KNOWLEDGE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="brand-card p-10 md:p-16 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 text-brand-text/5">
            <FileQuestion size={140} strokeWidth={1} />
          </div>

          <div className="w-14 h-14 bg-brand-surface/10 rounded-inner flex items-center justify-center mb-12 text-brand-accent shadow-sm">
            <Zap size={24} strokeWidth={1.5} />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-semibold font-sans text-brand-text mb-12 tracking-tight leading-[1.1]">
            Common <br/> Protocols
          </h2>
          
          <ul className="space-y-10 relative z-10">
            <li className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text/30 flex items-center gap-3">
                <Globe size={14} className="text-brand-accent" /> Asset Delivery
              </h4>
              <p className="text-base font-medium text-brand-text/60 leading-relaxed pr-8">
                Purchases are synchronized to your inbox instantly. They are also archived in your private <Link href="/account" className="text-brand-text font-semibold underline underline-offset-4 decoration-brand-accent/30 hover:decoration-brand-accent">Library</Link> for permanent access.
              </p>
            </li>
            <li className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text/30 flex items-center gap-3">
                <ShieldCheck size={14} className="text-accent-thermal" /> Legal Standards
              </h4>
              <p className="text-base font-medium text-brand-text/60 leading-relaxed pr-8">
                In compliance with UK Digital Standards, assets are non-refundable once the retrieval protocol is initiated.
              </p>
            </li>
          </ul>
        </motion.div>

        {/* CARD 2: DIRECT CONSULTATION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="brand-card p-10 md:p-16 flex flex-col relative overflow-hidden"
        >
          <div className="w-14 h-14 bg-brand-surface/10 rounded-inner flex items-center justify-center mb-12 text-accent-lavender shadow-sm">
            <Mail size={24} strokeWidth={1.5} />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-semibold font-sans text-brand-text mb-8 tracking-tight leading-[1.1]">
            Curator <br/> Assistance
          </h2>
          <p className="text-lg md:text-xl font-medium text-brand-text/50 mb-14 leading-relaxed max-w-sm">
            Our team provides prioritized responses to all inquiries within 24 hours.
          </p>
          
          <div className="mt-auto">
            <a 
              href="mailto:Kynaruniverse@gmail.com" 
              className="group flex items-center justify-between w-full p-8 bg-brand-base hover:bg-white rounded-inner shadow-sm transition-all duration-700 active:scale-[0.99] border border-brand-surface/5"
            >
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-brand-text/20 mb-3">Direct Protocol</span>
                <span className="text-[15px] font-semibold text-brand-text tracking-tight">kynarmuse@gmail.com</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-brand-text text-white flex items-center justify-center group-hover:bg-brand-accent transition-colors duration-500">
                <ArrowUpRight size={20} strokeWidth={1.5} />
              </div>
            </a>
          </div>
        </motion.div>

      </section>

      {/* 3. UPTIME STATUS: Discreet Intelligence */}
      <div className="mt-32 text-center">
        <div className="flex justify-center items-center gap-4 mb-8">
           <motion.div 
             animate={{ opacity: [0.3, 1, 0.3] }} 
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
             className="w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_15px_rgba(74,93,78,0.3)]" 
           />
           <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-text/20">Registry Online</span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-text/10">
          Standard GMT Operating Hours
        </p>
      </div>

    </main>
  );
}
