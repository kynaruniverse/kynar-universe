"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench, Heart, Home as HomeIcon } from 'lucide-react';
import { motion } from "framer-motion";
import UniverseCanvas from '../components/UniverseCanvas';

export default function Home() {
  const [activeColor, setActiveColor] = useState("#8FB7FF"); // Default Blue

  const colors = {
    default: "#8FB7FF",
    tools: "#A88BFF", // Violet
    life: "#8ED9A1",  // Green
    home: "#FFCEB8"   // Peach
  };

  return (
    <main className="min-h-screen bg-home-base flex flex-col selection:bg-home-accent/30">
      
      {/* 1. HERO SECTION WITH 3D */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden px-6">
        {/* The 3D Universe Background */}
        <div className="absolute inset-0 z-0">
          <UniverseCanvas activeColor={activeColor} />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-8xl font-bold font-sans text-primary-text tracking-tighter leading-[0.9]"
          >
            One Universe. <br className="hidden md:block"/> Infinite Solutions.
          </motion.h1>
    
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-2xl font-serif text-primary-text/70 italic max-w-2xl mx-auto leading-relaxed px-4"
          >
            A calm, modern digital space where everyday tools help people everywhere work, live, and learn with ease.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link 
              href="/marketplace" 
              className="inline-flex items-center px-10 py-4 bg-primary-text text-white rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORY GRID (STAGGERED ANIMATION) */}
      <section className="max-w-7xl mx-auto px-6 w-full pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {[
            { id: 'tools', title: 'Tools', icon: Wrench, color: colors.tools, text: 'Everything you need to build, create, and stay organised.' },
            { id: 'life', title: 'Life', icon: Heart, color: colors.life, text: 'Guides, ideas, and resources for everyday life.' },
            { id: 'home', title: 'Home', icon: HomeIcon, color: colors.home, text: 'Warm, simple tools for families and daily comfort.' }
          ].map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.15, // Staggered entrance for premium feel
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <Link 
                href={`/marketplace?category=${cat.title}`}
                onMouseEnter={() => setActiveColor(cat.color)}
                onTouchStart={() => setActiveColor(cat.color)} // Crucial for mobile color shift
                onMouseLeave={() => setActiveColor(colors.default)}
                className="group relative block h-full"
              >
                <div className="bg-white/40 backdrop-blur-md p-8 rounded-[32px] h-full border border-white/20 will-change-transform hover:shadow-glass hover:-translate-y-2 active:scale-[0.97] transition-all duration-500">
                  <div className="w-12 h-12 bg-white/60 rounded-2xl flex items-center justify-center mb-6 text-primary-text shadow-sm group-hover:scale-110 transition-transform">
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-primary-text tracking-tight group-hover:text-black">
                    {cat.title}
                  </h2>
                  <p className="font-serif text-primary-text/60 leading-relaxed text-sm md:text-base">
                    {cat.text}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}

        </div>
      </motion.section>
    </main>
  );
}
