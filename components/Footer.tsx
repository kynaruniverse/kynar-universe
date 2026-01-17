"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-[92%] max-w-7xl mx-auto mb-8 mt-32 relative z-10">
      {/* 1. GLASS CONTAINER */}
      <div className="bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[48px] px-8 md:px-12 py-16 shadow-glass relative overflow-hidden">
        
        {/* Decorative Internal Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-home-accent/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-16">
          
          {/* 2. BRAND & LORE */}
          <div className="text-center lg:text-left space-y-4 max-w-xs">
            <span className="text-3xl font-black font-sans text-primary-text tracking-tighter block uppercase">
              KYNAR
            </span>
            <p className="font-serif text-base text-primary-text/40 italic leading-relaxed">
              Synthesizing clarity across your digital domains. Tools, life, and home in one unified manifest.
            </p>
          </div>

          {/* 3. NAVIGATION CLUSTERS */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center lg:items-start text-center md:text-left">
            
            {/* Sector Navigation */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-text/20">Sectors</h4>
              <nav className="flex flex-col gap-4 text-[11px] uppercase tracking-widest font-black text-primary-text/60">
                {['Marketplace', 'Guides', 'Help', 'Account'].map((item) => (
                  <Link 
                    key={item}
                    href={`/${item.toLowerCase()}`} 
                    className="hover:text-primary-text hover:translate-x-1 transition-all duration-300"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal Protocol (UK Compliance) */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-text/20">Protocol</h4>
              <nav className="flex flex-col gap-4 text-[11px] uppercase tracking-widest font-black text-primary-text/40">
                <Link href="/terms" className="hover:text-primary-text transition-colors">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="hover:text-primary-text transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/contact" className="hover:text-primary-text transition-colors">
                  Contact Support
                </Link>
              </nav>
            </div>
          </div>

          {/* 4. THE TRI-WORLD MARK & COPYRIGHT */}
          <div className="flex flex-col items-center lg:items-end gap-6 pt-8 lg:pt-0 border-t lg:border-t-0 border-black/5 w-full lg:w-auto">
            <div className="flex gap-4">
               <motion.div whileHover={{ scale: 1.5 }} className="w-2.5 h-2.5 rounded-full bg-tools-accent shadow-[0_0_10px_rgba(168,139,255,0.4)]" />
               <motion.div whileHover={{ scale: 1.5 }} className="w-2.5 h-2.5 rounded-full bg-life-accent shadow-[0_0_10px_rgba(142,217,161,0.4)]" />
               <motion.div whileHover={{ scale: 1.5 }} className="w-2.5 h-2.5 rounded-full bg-cat-home-accent shadow-[0_0_10px_rgba(255,206,184,0.4)]" />
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary-text/20 font-black">
                © {currentYear} KYNAR UNIVERSE
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-primary-text/10 font-bold mt-1">
                UK Digital Standard
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
