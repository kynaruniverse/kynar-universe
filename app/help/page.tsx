"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, FileQuestion, ArrowUpRight, MessageCircle } from 'lucide-react';

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-home-base pb-32 transition-colors duration-1000">
      
      {/* 1. HERO SECTION */}
      <section className="px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black font-sans text-primary-text mb-6 tracking-tighter uppercase">
            Get Settled
          </h1>
          <p className="text-lg md:text-2xl font-serif text-primary-text/60 italic max-w-2xl mx-auto leading-relaxed px-4">
            Support, answers, and cosmic guidance. <br className="hidden md:block" /> We are here to help you navigate the universe.
          </p>
        </motion.div>
      </section>

      {/* 2. SUPPORT SECTOR */}
      <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        
        {/* CARD 1: KNOWLEDGE BASE */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/40 backdrop-blur-2xl p-8 md:p-10 rounded-[40px] border border-white/40 shadow-glass flex flex-col"
        >
          <div className="w-12 h-12 bg-home-accent/10 rounded-2xl flex items-center justify-center mb-8 text-home-accent">
            <FileQuestion size={24} />
          </div>
          
          <h2 className="text-2xl font-bold font-sans text-primary-text mb-6 tracking-tight">Common Questions</h2>
          
          <ul className="space-y-6 text-sm md:text-base">
            <li className="flex gap-4 group">
              <div className="w-1 h-1 bg-home-accent rounded-full mt-2.5 shrink-0" />
              <p className="text-primary-text/70 leading-relaxed">
                <strong className="text-primary-text">Downloads:</strong> Links are transmitted to your signal origin (email) immediately after checkout.
              </p>
            </li>
            <li className="flex gap-4 group">
              <div className="w-1 h-1 bg-home-accent rounded-full mt-2.5 shrink-0" />
              <p className="text-primary-text/70 leading-relaxed">
                <strong className="text-primary-text">Refunds:</strong> As digital matter cannot be returned, all sales are final. We are happy to troubleshoot any issues.
              </p>
            </li>
            <li className="flex gap-4 group">
              <div className="w-1 h-1 bg-home-accent rounded-full mt-2.5 shrink-0" />
              <p className="text-primary-text/70 leading-relaxed">
                <strong className="text-primary-text">Formats:</strong> Native support for PDF, Notion, and Excel spreadsheets.
              </p>
            </li>
          </ul>
        </motion.div>

        {/* CARD 2: SIGNAL ORIGIN (CONTACT) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/40 backdrop-blur-2xl p-8 md:p-10 rounded-[40px] border border-white/40 shadow-glass flex flex-col"
        >
          <div className="w-12 h-12 bg-tools-accent/10 rounded-2xl flex items-center justify-center mb-8 text-tools-accent">
            <Mail size={24} />
          </div>
          
          <h2 className="text-2xl font-bold font-sans text-primary-text mb-6 tracking-tight">Contact Support</h2>
          <p className="text-primary-text/60 font-serif italic mb-10 leading-relaxed">
            Need help with an order or have a question before entering the marketplace? Our team responds within 24 hours.
          </p>
          
          <div className="mt-auto">
            <a 
              href="mailto:support@kynaruniverse.co.uk" 
              className="group flex items-center justify-between w-full p-6 bg-white/60 hover:bg-white rounded-3xl border border-white/40 transition-all active:scale-[0.98] shadow-sm"
            >
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest font-black text-primary-text/30 mb-1">Email Support</span>
                <span className="text-sm md:text-base font-bold text-primary-text">support@kynaruniverse.co.uk</span>
              </div>
              <ArrowUpRight className="text-primary-text/20 group-hover:text-primary-text group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          </div>
        </motion.div>

      </section>

      {/* 3. FOOTER LOGO MARK */}
      <div className="mt-24 text-center">
        <div className="flex justify-center gap-2 mb-4">
           <div className="w-1 h-1 rounded-full bg-home-accent" />
           <div className="w-1 h-1 rounded-full bg-tools-accent" />
           <div className="w-1 h-1 rounded-full bg-life-accent" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary-text/30">
          Mon - Fri // 09:00 - 17:00 GMT
        </p>
      </div>

    </main>
  );
}
