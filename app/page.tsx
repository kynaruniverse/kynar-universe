"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, ShieldCheck, Star, Zap } from 'lucide-react';
import { motion } from "framer-motion";
import UniverseCanvas from '../components/UniverseCanvas';

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-base flex flex-col selection:bg-brand-accent/20 overflow-x-hidden">
      
      {/* 1. SEARCH BAR - Now immediately under the Navbar */}
      <div className="w-full bg-brand-base relative z-30 py-4"> 
        <motion.div 
          className="relative w-[96%] max-w-6xl mx-auto group"
        >
          <div className="relative flex items-center bg-white shadow-sm rounded-xl p-1 pl-6 border border-brand-surface/20 transition-all duration-500">
            <Search className="text-brand-text/30 mr-3" size={18} />
            <input 
              type="text" 
              placeholder="Search the shop..." 
              className="flex-grow bg-transparent border-none outline-none text-brand-text placeholder:text-brand-text/20 py-2 text-sm"
            />
            <button className="bg-brand-text text-white px-6 py-2 rounded-lg text-xs font-semibold hover:bg-brand-accent transition-colors duration-500">
              Search
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* 2. PREVIEW BANNER - Placed under search, but above hero text */}
      <div className="w-full py-2 border-y border-brand-surface/10">
        <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-brand-text/40 text-center">
          The Kynar Store is currently in preview. Products will be available shortly.
        </p>
      </div>

      {/* 3. HERO SECTION - Now under the search and banner */}
      <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center px-6 pt-12 pb-20">
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none grayscale">
          <UniverseCanvas />
        </div>

        <div className="relative z-10 max-w-4xl w-full text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <h1 className="font-semibold tracking-tight text-brand-text mb-6">
              Quality digital products <br/> for professional use.
            </h1>
            <p className="text-brand-text/60 max-w-2xl mx-auto">
              Premium resources curated and trusted for those who value efficiency and simplicity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 w-full pb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Top Selections</h2>
            <p className="text-brand-text/40 mt-2">Curated products for a better digital workflow.</p>
          </div>
          <Link href="/marketplace" className="hidden md:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-text/40 hover:text-brand-accent transition-colors">
            View Shop <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[700px]">
          {/* MAIN FEATURE CARD */}
          <div className="md:col-span-2 md:row-span-2 brand-card shadow-tactile-hover group overflow-hidden relative cursor-pointer">
            <div className="absolute inset-0 bg-brand-surface/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="p-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent mb-4 block">Newest</span>
                <h3 className="text-4xl font-semibold max-w-xs mb-4">The Minimalist OS</h3>
                <p className="text-brand-text/50 max-w-sm">A complete digital workspace for organized professionals.</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold">£49</span>
                <button className="px-6 py-3 bg-brand-text text-white rounded-full text-xs font-bold uppercase tracking-widest">Preview</button>
              </div>
            </div>
          </div>

          {/* SECONDARY CARD */}
          <div className="md:col-span-2 brand-card shadow-tactile-hover group cursor-pointer surface-mocha">
            <div className="p-8 flex justify-between items-center h-full">
              <div className="max-w-[60%]">
                <h3 className="text-2xl font-semibold mb-2">Daily Habits Guide</h3>
                <p className="text-xs text-brand-text/40 uppercase tracking-widest font-bold">Recommended</p>
              </div>
              <div className="w-24 h-24 bg-white/50 rounded-inner flex items-center justify-center">
                <Zap className="text-brand-accent" size={32} />
              </div>
            </div>
          </div>

          {/* SMALL CARD 1 */}
          <div className="brand-card shadow-tactile-hover group cursor-pointer">
            <div className="p-8 flex flex-col justify-between h-full">
              <Star className="text-accent-thermal" size={24} />
              <h3 className="text-xl font-semibold">UI Templates</h3>
            </div>
          </div>

          {/* SMALL CARD 2 */}
          <div className="brand-card shadow-tactile-hover group cursor-pointer bg-brand-text text-white">
            <div className="p-8 flex flex-col justify-between h-full">
              <ShieldCheck className="text-brand-accent" size={24} />
              <h3 className="text-xl font-semibold">Verified</h3>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TRUST BAR */}
      <section className="w-full border-t border-brand-surface/20 py-20 bg-white/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest mb-2">Secure Payments</span>
              <p className="text-[9px] font-medium">Standard Protection</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest mb-2">Instant Access</span>
              <p className="text-[9px] font-medium">Digital Download</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest mb-2">Customer Choice</span>
              <p className="text-[9px] font-medium">4.9/5 Average Rating</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest mb-2">Direct Support</span>
              <p className="text-[9px] font-medium">Email Assistance</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
