"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
// 1. Import the unified theme utility
import { getCategoryTheme, CATEGORY_THEMES } from '../lib/theme';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-[94%] max-w-7xl mx-auto mb-12 mt-32 relative z-10">
      <div className="card-elevated surface-frosted px-8 md:px-16 py-20 shadow-tactile relative overflow-hidden">
        
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-20">
          
          {/* BRAND IDENTITY */}
          <div className="text-center lg:text-left space-y-6 max-w-sm">
            <span className="text-4xl font-semibold text-brand-text tracking-tighter block">
              KYNAR
            </span>
            <p className="text-[15px] text-brand-text/50 leading-relaxed font-medium">
              Practical digital products to help you do more — for work, learning, creativity, and play.
            </p>
          </div>

          {/* NAVIGATION CLUSTERS */}
          <div className="flex flex-col md:flex-row gap-16 lg:gap-32 items-center lg:items-start text-center md:text-left">
            
            {/* 2. THEMED CATEGORIES: Dynamically pulling from lib/theme.ts */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text/30">Explore</h4>
              <nav className="flex flex-col gap-5 text-[11px] uppercase tracking-widest font-semibold">
                <Link href="/marketplace?category=Tools" className={`hover:translate-x-1 transition-all duration-base ${CATEGORY_THEMES.Tools.text}`}>
                  {CATEGORY_THEMES.Tools.label}
                </Link>
                <Link href="/marketplace?category=Life" className={`hover:translate-x-1 transition-all duration-base ${CATEGORY_THEMES.Life.text}`}>
                  {CATEGORY_THEMES.Life.label}
                </Link>
                <Link href="/marketplace?category=Home" className={`hover:translate-x-1 transition-all duration-base ${CATEGORY_THEMES.Home.text}`}>
                  {CATEGORY_THEMES.Home.label}
                </Link>
              </nav>
            </div>

            {/* Support & Legal */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text/30">Information</h4>
              <nav className="flex flex-col gap-5 text-[11px] uppercase tracking-widest font-semibold text-brand-text/40">
                <Link href="/account" className="hover:text-brand-text transition-colors">My Library</Link>
                <Link href="/terms" className="hover:text-brand-text transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="hover:text-brand-text transition-colors">Privacy Policy</Link>
              </nav>
            </div>
          </div>

          {/* 3. BRAND MARKS: Colored dots now act as mini-links to categories */}
          <div className="flex flex-col items-center lg:items-end gap-10 pt-10 lg:pt-0 border-t lg:border-t-0 border-brand-text/5 w-full lg:w-auto">
            <div className="flex gap-6">
               <Link href="/marketplace?category=Tools">
                  <motion.div whileHover={{ scale: 1.4 }} className={`w-2.5 h-2.5 rounded-full shadow-sm ${CATEGORY_THEMES.Tools.bg}`} />
               </Link>
               <Link href="/marketplace?category=Life">
                  <motion.div whileHover={{ scale: 1.4 }} className={`w-2.5 h-2.5 rounded-full shadow-sm ${CATEGORY_THEMES.Life.bg}`} />
               </Link>
               <Link href="/marketplace?category=Home">
                  <motion.div whileHover={{ scale: 1.4 }} className={`w-2.5 h-2.5 rounded-full shadow-sm ${CATEGORY_THEMES.Home.bg}`} />
               </Link>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-text/20 font-bold">
                © {currentYear} KYNAR Universe
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-brand-text/10 font-semibold mt-2">
                Quality Digital Goods — UK
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
