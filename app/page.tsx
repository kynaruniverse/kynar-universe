import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ArrowRight, Sparkles, Home, Heart, Hammer, Orbit } from 'lucide-react';

/**
 * PREVIEW_SECRET: Used for stakeholder access during maintenance.
 */
const PREVIEW_SECRET = process.env.PREVIEW_SECRET || 'kynar_reveal_2024';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  
  const isPreviewAttempt = params.preview === PREVIEW_SECRET;
  const hasPreviewCookie = cookieStore.has('kynar_preview_access');
  
  // Maintenance Mode Gate
  // Flip to 'false' for public launch
  const isMaintenanceMode = true; 
  
  if (isMaintenanceMode && !isPreviewAttempt && !hasPreviewCookie) {
    redirect('/soon');
  }
  
  return (
    <div className="flex flex-col w-full min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900">
      
      {/* 1. HERO SECTION: Brand Promise (UX Guide 2.1) */}
      <section className="px-6 py-20 md:py-32 text-center relative overflow-hidden">
        {/* Subtle Background Glow - Cosmic/Earthy aesthetic */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-kyn-green-50/50 via-transparent to-transparent dark:from-kyn-green-900/10 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {hasPreviewCookie && (
            <div className="inline-block bg-kyn-slate-900 text-white text-[9px] font-black uppercase px-4 py-1.5 rounded-full mb-8 tracking-[0.3em] animate-pulse">
              Universe Preview Mode
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-kyn-slate-800 shadow-sm border border-kyn-slate-100 dark:border-kyn-slate-700 text-kyn-slate-600 dark:text-kyn-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Sparkles size={14} className="text-kyn-green-500" />
            <span>UK-First Digital Marketplace</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-kyn-slate-900 dark:text-white mb-8 uppercase leading-[0.85]">
            One universe, <br />
            <span className="text-kyn-green-500">unlimited solutions.</span>
          </h1>
          
          <p className="text-base md:text-lg text-kyn-slate-500 dark:text-kyn-slate-400 max-w-md mx-auto mb-12 leading-relaxed italic font-medium">
            "Organise your home, lifestyle, and projects in one tap with curated digital assets."
          </p>

          <Link href="/store" className="inline-flex items-center gap-3 bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-kyn-lift hover:shadow-xl group">
            Browse Store
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 2. THREE WORLDS SHOWCASE (Brand Guide 9.1) */}
      <section className="px-6 py-12 pb-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Home World */}
          <Link href="/world/home" className="group kyn-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl bg-kyn-green-50 dark:bg-kyn-green-900/20 text-kyn-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Home size={32} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-kyn-green-600 mb-2">Home</span>
            <h3 className="text-xl font-black text-kyn-slate-900 dark:text-white mb-3 uppercase tracking-tighter">Make life less chaotic</h3>
            <p className="text-xs text-kyn-slate-500 dark:text-kyn-slate-400 leading-relaxed font-medium">Household planners, cleaning schedules, and family organisers.</p>
          </Link>

          {/* Lifestyle World */}
          <Link href="/world/lifestyle" className="group kyn-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl bg-kyn-caramel-50 dark:bg-kyn-caramel-900/20 text-kyn-caramel-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Heart size={32} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-kyn-caramel-500 mb-2">Lifestyle</span>
            <h3 className="text-xl font-black text-kyn-slate-900 dark:text-white mb-3 uppercase tracking-tighter">Build better habits</h3>
            <p className="text-xs text-kyn-slate-500 dark:text-kyn-slate-400 leading-relaxed font-medium">Wellness guides, habit trackers, and personal growth tools.</p>
          </Link>

          {/* Tools World */}
          <Link href="/world/tools" className="group kyn-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl bg-kyn-slate-50 dark:bg-kyn-slate-800 text-kyn-slate-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Hammer size={32} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-500 mb-2">Tools</span>
            <h3 className="text-xl font-black text-kyn-slate-900 dark:text-white mb-3 uppercase tracking-tighter">Accelerate projects</h3>
            <p className="text-xs text-kyn-slate-500 dark:text-kyn-slate-400 leading-relaxed font-medium">Professional assets, coding templates, and creator kits.</p>
          </Link>

        </div>
      </section>

      {/* 3. TRUST SIGNALS (Language Guide 8.0) */}
      <footer className="px-6 py-12 border-t border-kyn-slate-100 dark:border-kyn-slate-800 flex flex-col items-center gap-6">
        <Orbit size={24} className="text-kyn-slate-200" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400 text-center">
          Secure payment via Lemon Squeezy • Instant access
        </p>
      </footer>
    </div>
  );
}
