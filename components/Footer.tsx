"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-[95%] mx-auto mb-6 mt-20 relative z-10">
      {/* 1. GLASS CONTAINER */}
      <div className="bg-white/30 backdrop-blur-xl border border-white/20 rounded-[40px] px-8 py-12 shadow-glass">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          {/* 2. BRAND & LORE */}
          <div className="text-center md:text-left space-y-2 w-full md:w-auto">
            <span className="text-2xl font-black font-sans text-primary-text tracking-tighter block">
              KYNAR
            </span>
            <p className="font-serif text-sm text-primary-text/50 italic max-w-[200px] mx-auto md:mx-0">
              One Universe. <br className="hidden md:block" /> Infinite Solutions.
            </p>
          </div>

          {/* 3. ESSENTIAL NAVIGATION */}
          <div className="flex flex-col md:flex-row gap-10 w-full md:w-auto items-center md:items-start">
            {/* Main Links */}
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] uppercase tracking-widest font-black text-primary-text/60">
              {['Marketplace', 'Guides', 'Help', 'Account'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase()}`} 
                  className="hover:text-primary-text hover:translate-y-[-1px] transition-all duration-300"
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Legal Links (Added for UK Compliance) */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[10px] uppercase tracking-widest font-black text-primary-text/30 border-t md:border-t-0 md:border-l border-black/5 pt-6 md:pt-0 md:pl-10">
              <Link href="/terms" className="hover:text-primary-text transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-primary-text transition-colors">
                Privacy
              </Link>
            </nav>
          </div>

          {/* 4. COPYRIGHT & LOGO MARK */}
          <div className="text-center md:text-right space-y-3 w-full md:w-auto">
            <div className="flex justify-center md:justify-end gap-3 opacity-20">
               <div className="w-2 h-2 rounded-full bg-tools-accent" />
               <div className="w-2 h-2 rounded-full bg-life-accent" />
               <div className="w-2 h-2 rounded-full bg-cat-home-accent" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary-text/30 font-sans font-bold">
              © {currentYear} Kynar Universe
            </p>
          </div>
          
        </div>
      </div>

      {/* SUBTLE DECORATIVE BLUR (Mobile First) */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-home-accent/10 blur-[60px] z-[-1]" />
    </footer>
  );
}
