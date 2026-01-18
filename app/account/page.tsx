"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight, Loader2, AlertCircle, LogOut, Download, Lock, Package, Sparkles, ShieldCheck, Info } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { login, signup } from './auth';
import { getDownloadLink } from './actions';

export default function AccountPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [viewState, setViewState] = useState<'checking' | 'authenticated' | 'guest'>('checking');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [libraryItems, setLibraryItems] = useState<any[]>([]); 
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
        setViewState('authenticated');
        
        const { data: purchases } = await supabase
          .from('purchases')
          .select('product_id, created_at')
          .order('created_at', { ascending: false });
        
        if (purchases && purchases.length > 0) {
          const slugs = purchases.map(p => p.product_id);
          const { data: products } = await supabase
            .from('products')
            .select('title, slug, image, format')
            .in('slug', slugs);

          const mergedItems = purchases.map(purchase => {
            const details = products?.find(p => p.slug === purchase.product_id);
            return {
              ...purchase,
              title: details?.title || "Digital Asset",
              image: details?.image,
              slug: purchase.product_id,
              format: details?.format || 'Digital'
            };
          });
          setLibraryItems(mergedItems);
        }
      } else {
        setViewState('guest');
      }
    }
    init();
  }, [supabase]);

  async function handleDownload(slug: string) {
    // PHASE 3: Block downloads at UI level during preview
    return;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    const formData = new FormData(e.currentTarget);
    const action = isLoginMode ? login : signup;
    
    const result = await action(formData);
    if (result?.error) {
      setErrorMessage(result.error);
      setLoading(false);
    } else {
      window.location.reload();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  if (viewState === 'checking') {
    return (
      <div className="min-h-screen bg-brand-base flex flex-col items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 border-t-2 border-brand-accent rounded-full"
        />
      </div>
    );
  }

  if (viewState === 'authenticated') {
    return (
      <main className="min-h-screen bg-brand-base pb-32 selection:bg-brand-accent/20">
        {/* DASHBOARD HEADER: Phase 1 Editorial Shift */}
        <div className="bg-white/30 backdrop-blur-3xl border-b border-brand-surface/20 px-6 py-20 md:py-32">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-semibold text-brand-text tracking-tight">
                Private Registry
              </h1>
              <p className="text-brand-text/40 font-medium">
                {userEmail} — Your established presence.
              </p>
            </div>
            <button 
              onClick={handleLogout} 
              className="px-10 py-4 bg-brand-base text-brand-text/50 hover:text-brand-text rounded-full border border-brand-surface/30 transition-all text-[10px] font-bold uppercase tracking-widest"
            >
              Terminate Session
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24">
          <AnimatePresence mode="wait">
            {libraryItems.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
              >
                {libraryItems.map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    key={idx} 
                    className="brand-card p-8 shadow-tactile-hover flex flex-col sm:flex-row items-center gap-10 group"
                  >
                    <div className="w-28 h-28 bg-brand-base rounded-inner overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-brand-text/10 surface-mocha"><Package size={32} /></div>
                      )}
                    </div>
                    
                    <div className="flex-grow text-center sm:text-left">
                      <div className="text-[9px] font-bold text-brand-accent uppercase tracking-[0.2em] mb-2">{item.format} Asset</div>
                      <h3 className="font-semibold text-2xl text-brand-text tracking-tight mb-6">{item.title}</h3>
                      
                      <button 
                        disabled={true}
                        className="inline-flex items-center px-8 py-4 bg-brand-text/10 text-brand-text/40 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-not-allowed transition-all duration-500"
                      >
                        Unlocking Soon <Lock className="w-3.5 h-3.5 ml-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* PHASE 6: Testing Library Empty State - Ensuring it feels intentional */
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="brand-card p-12 md:p-24 text-center surface-mocha max-w-2xl mx-auto"
              >
                <Sparkles className="w-12 h-12 text-brand-accent/20 mx-auto mb-8" />
                <h2 className="text-3xl font-semibold text-brand-text mb-6 tracking-tight">Registry Initialized</h2>
                <p className="text-brand-text/40 mb-10 leading-relaxed max-w-sm mx-auto">
                  Your identity is verified. Discover premium assets in the collection to begin curating your library.
                </p>
                
                <div className="flex flex-col items-center gap-6">
                  <Link href="/marketplace" className="btn-primary inline-flex items-center gap-3">
                    Browse Collection <ArrowRight size={16} />
                  </Link>
                  
                  <div className="flex items-center gap-2 text-[10px] font-bold text-brand-text/20 uppercase tracking-widest">
                    <Info size={14} /> Acquisition protocols currently in preview
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-base flex flex-col items-center justify-center p-6 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="brand-card w-full max-w-md p-10 md:p-16 shadow-tactile text-center relative z-10"
      >
        <h1 className="text-4xl font-semibold text-brand-text mb-6 tracking-tight">
          {isLoginMode ? 'Establish Presence' : 'Register Identity'}
        </h1>
        <p className="text-brand-text/40 mb-12">
          {isLoginMode ? 'Verify your credentials to access the registry.' : 'Join the Kynar Registry to curate your digital assets.'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-8 text-left">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-brand-text/20 uppercase tracking-[0.25em] ml-6">Registry Email</label>
            <input name="email" type="email" required placeholder="name@domain.com" className="w-full px-8 py-5 rounded-full bg-brand-base/50 border border-transparent focus:bg-white focus:border-brand-surface/30 focus:outline-none transition-all duration-500 font-medium text-sm" />
          </div>
          <div className="space-y-3 pb-4">
            <label className="text-[10px] font-bold text-brand-text/20 uppercase tracking-[0.25em] ml-6">Secure Key</label>
            <input name="password" type="password" required placeholder="••••••••" className="w-full px-8 py-5 rounded-full bg-brand-base/50 border border-transparent focus:bg-white focus:border-brand-surface/30 focus:outline-none transition-all duration-500 font-medium text-sm" />
          </div>

          <AnimatePresence>
            {errorMessage && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center text-[10px] font-bold uppercase tracking-widest text-accent-thermal bg-accent-thermal/5 p-5 rounded-inner border border-accent-thermal/10">
                <AlertCircle className="w-4 h-4 mr-3" /> {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" disabled={loading} className="btn-primary w-full py-6 flex items-center justify-center text-[10px] uppercase tracking-[0.25em]">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLoginMode ? 'Verify Presence' : 'Register Identity')}
          </button>
        </form>

        <button 
          onClick={() => setIsLoginMode(!isLoginMode)} 
          className="mt-12 text-[10px] font-bold uppercase tracking-widest text-brand-text/20 hover:text-brand-text transition-all"
        >
          {isLoginMode ? "Need to register? Join here" : "Established? Verify here"}
        </button>
        
        <div className="mt-10 pt-10 border-t border-brand-surface/20 flex items-center justify-center gap-6 text-brand-text/10">
           <ShieldCheck size={18} /> <Lock size={18} />
        </div>
      </motion.div>
    </main>
  );
}
