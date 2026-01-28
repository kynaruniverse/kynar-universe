"use client";
import React, { useState } from 'react';
import { Orbit, Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

/**
 * LaunchingSoon Component:
 * The Universe Gatekeeper during maintenance/pre-launch.
 * Aligned with Brand Language 1.1: Instills calm and anticipation.
 */
export default function LaunchingSoon() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Injects the user into the waitlist for launch notification
    const { error } = await supabase.from('waitlist').insert([{ email }]);
    
    if (!error) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('idle');
      // Gentle feedback for existing entries
      alert("You're already in the vault! We'll be in touch soon.");
    }
  };

  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Atmosphere (Visual Guide 9.2: Cosmic Glow) */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-kyn-green-200/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-kyn-caramel-200/10 rounded-full blur-[120px] animate-pulse delay-700 pointer-events-none" />

      <div className="z-10 text-center max-w-sm transition-all duration-700">
        {/* Signature Universe Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-kyn-slate-900 dark:bg-white rounded-kyn mb-10 shadow-2xl transition-transform hover:rotate-12">
          <Orbit size={40} className="text-white dark:text-kyn-slate-900" />
        </div>

        <h1 className="text-4xl font-black tracking-tighter text-kyn-slate-900 dark:text-white uppercase mb-4 leading-tight">
          Kynar Universe <br/> <span className="text-kyn-green-600">is loading.</span>
        </h1>

        <p className="text-kyn-slate-500 font-medium italic mb-10 text-sm leading-relaxed">
          One calm place to browse, buy, and organise your digital life. 
          The big universe of home, lifestyle, and project tools is arriving soon.
        </p>

        {status === 'success' ? (
          <div className="bg-kyn-green-50 dark:bg-kyn-green-900/10 p-8 rounded-kyn border border-kyn-green-100 dark:border-kyn-green-900/20 transition-all scale-100">
            <CheckCircle2 className="text-kyn-green-600 mx-auto mb-2" size={32} />
            <p className="text-sm font-bold text-kyn-green-800 dark:text-kyn-green-400">You're in the Universe.</p>
            <p className="text-[10px] uppercase tracking-widest text-kyn-green-600 mt-1">We'll email you at launch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative group max-w-full">
            <input 
              type="email" 
              required
              placeholder="Your email address"
              className="w-full bg-white dark:bg-kyn-slate-900 p-6 pr-16 rounded-kyn border border-kyn-slate-100 dark:border-kyn-slate-800 focus:ring-2 focus:ring-kyn-green-500 outline-none shadow-xl shadow-kyn-slate-200/10 transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
            />
            <button 
              type="submit"
              disabled={status === 'loading'}
              aria-label="Join Waitlist"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 p-4 rounded-2xl active:scale-95 transition-all shadow-lg hover:shadow-kyn-green-500/20"
            >
              <Send size={20} className={status === 'loading' ? 'animate-ping' : ''} />
            </button>
          </form>
        )}
      </div>

      {/* Trust Signal */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-kyn-slate-400">
          Curated in the UK
        </p>
      </div>
    </div>
  );
}
