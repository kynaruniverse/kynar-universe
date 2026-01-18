"use client";

import React, { useState } from 'react';
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
    <main className="min-h-screen bg-home-base flex flex-col selection:bg-home-accent/30 overflow-x-hidden">
      
      {/* 1. HERO SECTION WITH 3D */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden px-6">
        {/* The 3D Universe Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <UniverseCanvas />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-4xl text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="title-responsive"
          >
            Digital tools for  <br/> a simpler life.
          </motion.h1>
    
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-primary-text/60 mt-6 font-medium"
          >
            Premium digital resources for everyone from busy parents <br className="hidden md:block" /> to students and professionals.
          </motion.p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/marketplace" className="px-8 py-4 bg-primary-text text-white rounded-full font-bold hover:scale-105 transition-all">
              
              Browse the Shop
            </Link>
            <Link href="/about" className="px-8 py-4 bg-white/50 background-blur-md rounded-full font-bold border border-white/20 hover:bg-white transition-all">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY GRID */}
      <section className="max-w-7xl mx-auto px-6 w-full pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          
          {[
            { id: 'tools', title: 'Tools', icon: Wrench, color: colors.tools, text: 'Everything you need to build, create, and stay organised.' },
            { id: 'life', title: 'Life', icon: Heart, color: colors.life, text: 'Guides, tools, and resources for everyday life.' },
            { id: 'home', title: 'Home', icon: HomeIcon, color: colors.home, text: 'Simple tools and solutions for a more organized and peaceful home life.' }
          ].map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <Link 
                href={`/marketplace?category=${cat.title}`}
                onMouseEnter={() => setActiveColor(cat.color)}
                onTouchStart={() => setActiveColor(cat.color)}
                onMouseLeave={() => setActiveColor(colors.default)}
                className="group relative block h-full"
              >
                <div className="bg-white/40 backdrop-blur-3xl p-10 rounded-[48px] h-full border border-white/40 shadow-glass hover:shadow-2xl hover:-translate-y-2 active:scale-[0.97] transition-all duration-500">
                  <div className="w-14 h-14 bg-white/60 rounded-[20px] flex items-center justify-center mb-8 text-primary-text shadow-sm group-hover:scale-110 transition-transform">
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-black mb-4 text-primary-text tracking-tighter uppercase">
                    {cat.title}
                  </h2>
                  <p className="font-serif text-primary-text/50 italic leading-relaxed text-base">
                    {cat.text}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}

        </div>
      </section>
    </main>
  );
}
