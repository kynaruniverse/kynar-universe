"use client";
import React from "react";
import { motion } from "framer-motion";
import UniverseCanvas from "../../components/UniverseCanvas";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function MaintenancePage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-home-base transition-colors duration-1000">
      
      {/* 1. KINETIC BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-40 md:opacity-60 pointer-events-none">
        <UniverseCanvas activeColor="#8FB7FF" />
      </div>

      {/* 2. ENHANCED GLASS CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 max-w-xl w-[90%] p-10 md:p-20 rounded-[48px] bg-white/40 backdrop-blur-3xl border border-white/60 shadow-glass text-center overflow-hidden"
      >
        {/* Subtle Scanning Light Effect */}
        <motion.div 
          animate={{ x: ['-150%', '250%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
        />

        <div className="mb-10 flex justify-center">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-[32px] border border-dashed border-home-accent/40 flex items-center justify-center"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-6 h-6 bg-home-accent rounded-full shadow-[0_0_25px_rgba(143,183,255,0.6)] flex items-center justify-center" 
              >
                <Zap size={10} className="text-white" />
              </motion.div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black font-sans text-primary-text mb-6 tracking-tighter uppercase leading-none">
          Maintenance <br/> Mode
        </h1>
        
        <p className="font-serif text-xl text-primary-text/40 italic leading-relaxed mb-12 px-4">
          We are currently performing routine maintenance to improve our store. We will be back soon!
        </p>

        <div className="space-y-8 relative z-10">
          <Link 
            href="mailto:support@kynaruniverse.co.uk"
            className="inline-flex items-center px-12 py-6 bg-primary-text text-white rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Get Help
          </Link>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-3">
               <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-home-accent" />
               <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 rounded-full bg-tools-accent" />
               <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 rounded-full bg-life-accent" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-primary-text/20 font-black">
              Status: Updating...
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
