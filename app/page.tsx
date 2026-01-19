"use client";

import React from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Info } from 'lucide-react';
import { motion } from "framer-motion";
import UniverseCanvas from '../components/UniverseCanvas';
import { getCategoryTheme } from '../lib/theme';

export default function Home() {
  const categories = ['Tools', 'Life', 'Home'];
  
  return (
    <main className="min-h-screen bg-brand-base flex flex-col selection:bg-brand-accent/20 overflow-x-hidden">
      
      {/* 1. SEARCH BAR */}
      <div className="w-full bg-brand-base relative z-30 py-4"> 
        <motion.div className="relative w-[96%] max-w-6xl mx-auto group">
          <div className="relative flex items-center bg-white shadow-sm rounded-xl p-1 pl-6 border border-color-border transition-all duration-base">
            <Search className="text-brand-text/30 mr-3" size={18} />
            <input
              aria-label="Search the shop" 
              type="text" 
              placeholder="Search the shop..." 
              className="flex-grow bg-transparent border-none outline-none text-brand-text placeholder:text-brand-text/20 py-2 text-sm"
              disabled
            />
            <button 
              disabled 
              aria-label="Search (Preview mode)" 
              className="bg-brand-text text-white px-6 py-2 rounded-lg text-xs font-semibold transition-colors duration-base opacity-50 cursor-not-allowed"
            >
              Search
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* 2. PREVIEW BANNER */}
      <div className="w-full py-3 border-y border-color-border bg-brand-surface/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-3">
          <Info size={14} className="text-brand-accent shrink-0" />
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text/50 text-center">
            Preview Mode — Launching Q1 2026
          </p>
        </div>
      </div>

      {/* 3. HERO SECTION */}
      <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center px-6 pt-16 pb-24">
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none grayscale" aria-hidden="true">
          <UniverseCanvas />
        </div>

        <div className="relative z-10 max-w-4xl w-full text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <h1 className="font-semibold tracking-tight text-brand-text mb-6">
              Digital tools and resources for work, creativity, learning, and lifestyle.
            </h1>
            <p className="text-color-muted max-w-2xl mx-auto leading-relaxed">
              Carefully curated, easy to use, and built to last.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-6 w-full pb-24">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight text-brand-text">Browse by Category</h2>
          <p className="text-color-muted mt-2">Find resources tailored to what you need.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {categories.map((cat) => {
            const theme = getCategoryTheme(cat);
            return (
              <Link 
                key={cat}
                href={`/marketplace?category=${cat}`} 
                className={`card-elevated p-12 md:p-20 shadow-tactile-hover group border-l-4 ${theme.border} bg-white transition-all duration-slow`}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="max-w-xl space-y-4">
                    <div className="space-y-1">
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] block ${theme.text}`}>
                        {theme.sublabel}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-semibold text-brand-text">
                        {cat === 'Tools' && "Productivity & Workflows"}
                        {cat === 'Life' && "Design & Creative Tools"}
                        {cat === 'Home' && "Learning & Lifestyle"}
                      </h3>
                    </div>
                    <p className="text-color-muted leading-relaxed">
                      {cat === 'Tools' && "Practical resources for projects, tasks, and daily workflows — built for beginners and professionals."}
                      {cat === 'Life' && "Creative resources for anyone who wants to design, make, or craft something meaningful."}
                      {cat === 'Home' && "Guides, planners, and tools for learners of all ages and interests."}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <ArrowRight 
                      className={`text-brand-text/10 group-hover:translate-x-2 transition-all duration-slow ${theme.text.replace('text-', 'group-hover:text-')}`} 
                      size={32} 
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. TRUST BAR */}
      <TrustBar />
    </main>
  );
}

/**
 * SUB-COMPONENT: Trust Bar
 */
function TrustBar() {
  const items = [
    { label: "Secure Payments", detail: "Encrypted Checkout" },
    { label: "Instant Access", detail: "Digital Delivery" },
    { label: "Trusted Quality", detail: "4.9/5 Rating" },
    { label: "Direct Support", detail: "Email Assistance" }
  ];
  
  return (
    <section className="w-full border-t border-color-border py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-8 md:gap-12 opacity-60">
          {items.map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="flex flex-col items-start min-w-max">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-text/40 mb-1">
                  {item.label}
                </span>
                <p className="text-[11px] font-semibold text-brand-text/60">
                  {item.detail}
                </p>
              </div>
              {idx < items.length - 1 && (
                <div 
                  className="hidden md:block w-px h-6 bg-color-border" 
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}