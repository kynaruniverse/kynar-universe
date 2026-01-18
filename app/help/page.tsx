"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, FileQuestion, ArrowUpRight, ShieldCheck, Zap, Globe } from 'lucide-react';

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-home-base pb-32 transition-colors duration-1000 ease-in-out">
      
      {/* 1. HERO SECTION */}
      <section className="px-6 py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-6xl md:text-8xl font-black font-sans text-primary-text mb-8 tracking-tighter uppercase leading-[0.85]">
            Help & <br/> Support
          </h1>
          <p className="text-xl md:text-2xl font-serif text-primary-text/40 italic max-w-2xl mx-auto leading-relaxed px-4">
            Answers, support, and guidance for your <br className="hidden md:block" /> journey through the Kynar Universe.
          </p>
        </motion.div>
      </section>

      {/* 2. SUPPORT SECTOR */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        
        {/* CARD 1: KNOWLEDGE BASE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/40 backdrop-blur-3xl p-10 md:p-16 rounded-[48px] border border-white/60 shadow-glass flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <FileQuestion size={120} />
          </div>

          <div className="w-14 h-14 bg-home-accent/10 rounded-2xl flex items-center justify-center mb-10 text-home-accent border border-home-accent/20">
            <Zap size={28} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black font-sans text-primary-text mb-10 tracking-tighter uppercase leading-none">
            Frequently asked <br/> Questions
          </h2>
          
          <ul className="space-y-8">
            <li className="space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-text/40 flex items-center gap-2">
                <Globe size={12} /> Product Delivery
              </h4>
              <p className="text-sm font-serif italic text-primary-text/70 leading-relaxed">
                Your purchase is delivered to your inbox right away. It is also saved in your personal library for future use.  <Link href="/account" className="text-primary-text font-bold underline decoration-home-accent/30">Vault</Link>.
              </p>
            </li>
            <li className="space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-text/40 flex items-center gap-2">
                <ShieldCheck size={12} /> UK Digital Law
              </h4>
              <p className="text-sm font-serif italic text-primary-text/70 leading-relaxed">
                Per UK Consumer Rights, digital assets are non-refundable once the download or access protocol has been initiated.
              </p>
            </li>
          </ul>
        </motion.div>

        {/* CARD 2: CONTACT SIGNAL */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white/40 backdrop-blur-3xl p-10 md:p-16 rounded-[48px] border border-white/60 shadow-glass flex flex-col relative overflow-hidden"
        >
          <div className="w-14 h-14 bg-tools-accent/10 rounded-2xl flex items-center justify-center mb-10 text-tools-accent border border-tools-accent/20">
            <Mail size={28} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black font-sans text-primary-text mb-6 tracking-tighter uppercase leading-none">
            Reach <br/> Out
          </h2>
          <p className="text-lg font-serif italic text-primary-text/40 mb-12 leading-relaxed">
            Need help fast? Our team typically responds to all inquiries within 24 hours.
          </p>
          
          <div className="mt-auto">
            <a 
              href="mailto:Kynaruniverse@gmail.com" 
              className="group flex items-center justify-between w-full p-8 bg-white/60 hover:bg-white rounded-[32px] border border-white/40 transition-all active:scale-[0.98] shadow-sm"
            >
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-primary-text/20 mb-2">Email Support</span>
                <span className="text-sm md:text-base font-black text-primary-text tracking-tight uppercase">Kynaruniverse@gmail.com</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-text text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowUpRight size={18} />
              </div>
            </a>
          </div>
        </motion.div>

      </section>

      {/* 3. UPTIME STATUS */}
      <div className="mt-32 text-center">
        <div className="flex justify-center gap-3 mb-6">
           <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-life-accent" />
           <div className="w-2 h-2 rounded-full bg-tools-accent/20" />
           <div className="w-2 h-2 rounded-full bg-home-accent/20" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-text/20">
          Support Hours: Mon-Fri // 9am - 5pm GMT
        </p>
      </div>

    </main>
  );
}
