"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight, Loader2, AlertCircle, LogOut, Download, Lock, Package, Sparkles, ShieldCheck } from 'lucide-react';
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
      // 1. SESSION SYNC
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
        setViewState('authenticated');
        
        // 2. FETCH PURCHASES
        const { data: purchases } = await supabase
          .from('purchases')
          .select('product_id, created_at')
          .order('created_at', { ascending: false });
        
        if (purchases && purchases.length > 0) {
          const slugs = purchases.map(p => p.product_id);
          
          // 3. FETCH METADATA FROM PRODUCTS TABLE
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
    setDownloadingId(slug);
    // This calls the secure Key Master action we wrote earlier
    const result = await getDownloadLink(slug);
    if (result.error) {
      alert(result.error);
    } else if (result.url) {
      // Direct file transmission
      window.location.assign(result.url);
    }
    setDownloadingId(null);
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
      // Smooth re-sync of the universe
      window.location.reload();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  // --- RENDERING LOGIC ---

  if (viewState === 'checking') {
    return (
      <div className="min-h-screen bg-home-base flex flex-col items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-t-2 border-primary-text rounded-full"
        />
      </div>
    );
  }

  if (viewState === 'authenticated') {
    return (
      <main className="min-h-screen bg-home-base pb-32">
        <div className="bg-white/40 backdrop-blur-3xl border-b border-white/20 px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-2">
              <h1 className="text-6xl md:text-8xl font-black font-sans text-primary-text tracking-tighter uppercase leading-[0.8]">
                Vault
              </h1>
              <p className="font-serif text-lg text-primary-text/40 italic">
                {userEmail} — Your assets are synced.
              </p>
            </div>
            <button 
              onClick={handleLogout} 
              className="px-8 py-4 bg-white/60 hover:bg-white text-primary-text rounded-full border border-black/5 transition-all text-[10px] font-black uppercase tracking-widest"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20">
          <AnimatePresence mode="wait">
            {libraryItems.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {libraryItems.map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="bg-white/40 backdrop-blur-2xl p-8 rounded-[48px] border border-white/40 shadow-glass flex flex-col sm:flex-row items-center gap-8 group relative overflow-hidden"
                  >
                    <div className="w-24 h-24 bg-white/60 rounded-3xl overflow-hidden flex-shrink-0 shadow-inner border border-black/5">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-home-accent/30"><Package size={32} /></div>
                      )}
                    </div>
                    
                    <div className="flex-grow text-center sm:text-left">
                      <div className="text-[10px] font-black text-home-accent uppercase tracking-widest mb-1">{item.format}</div>
                      <h3 className="font-black text-2xl text-primary-text tracking-tight mb-4 uppercase">{item.title}</h3>
                      
                      <button 
                        onClick={() => handleDownload(item.slug)}
                        disabled={downloadingId === item.slug}
                        className="inline-flex items-center px-6 py-3 bg-primary-text text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {downloadingId === item.slug ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>Download <Download className="w-4 h-4 ml-2" /></>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/40 backdrop-blur-3xl rounded-[64px] p-20 text-center border border-white/40 shadow-glass max-w-2xl mx-auto"
              >
                <Sparkles className="w-12 h-12 text-home-accent/40 mx-auto mb-6" />
                <h2 className="text-4xl font-black font-sans text-primary-text mb-4 tracking-tighter uppercase">Vault Empty</h2>
                <p className="font-serif text-lg text-primary-text/40 italic mb-10 leading-relaxed">Your digital manifest is currently clear. Visit the marketplace to acquire new tools.</p>
                <Link href="/marketplace" className="inline-flex items-center px-12 py-5 bg-primary-text text-white rounded-full font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 active:scale-95 transition-all">
                  Explore Universe <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    );
  }

  // GUEST / AUTH FORM
  return (
    <main className="min-h-screen bg-home-base flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-home-accent/5 blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/40 backdrop-blur-3xl w-full max-w-md p-10 md:p-14 rounded-[64px] shadow-glass border border-white/40 text-center relative z-10"
      >
        <h1 className="text-5xl font-black font-sans text-primary-text mb-4 tracking-tighter uppercase leading-none">
          {isLoginMode ? 'Identity' : 'Presence'}
        </h1>
        <p className="font-serif text-lg text-primary-text/40 italic mb-12">
          {isLoginMode ? 'Verify your credentials.' : 'Establish your existence.'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary-text/30 uppercase tracking-[0.3em] ml-6 italic">Transmission Email</label>
            <input name="email" type="email" required placeholder="name@domain.com" className="w-full px-8 py-5 rounded-full bg-white/50 border border-white/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-home-accent/10 transition-all font-medium text-sm" />
          </div>
          <div className="space-y-2 pb-4">
            <label className="text-[10px] font-black text-primary-text/30 uppercase tracking-[0.3em] ml-6 italic">Secure Passkey</label>
            <input name="password" type="password" required placeholder="••••••••" className="w-full px-8 py-5 rounded-full bg-white/50 border border-white/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-home-accent/10 transition-all font-medium text-sm" />
          </div>

          <AnimatePresence>
            {errorMessage && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50/50 p-5 rounded-[24px] border border-red-100">
                <AlertCircle className="w-4 h-4 mr-3" /> {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" disabled={loading} className="w-full py-6 bg-primary-text text-white font-black rounded-full hover:shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center uppercase tracking-[0.2em] text-xs">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLoginMode ? 'Verify Access' : 'Create Manifest')}
          </button>
        </form>

        <button 
          onClick={() => setIsLoginMode(!isLoginMode)} 
          className="mt-12 text-[10px] font-black uppercase tracking-widest text-primary-text/30 hover:text-primary-text transition-colors"
        >
          {isLoginMode ? "Need a key? Create one here." : "Existing identity? Sign in."}
        </button>
        
        <div className="mt-8 flex items-center justify-center gap-4 opacity-20 grayscale">
           <ShieldCheck size={16} /> <Lock size={16} />
        </div>
      </motion.div>
    </main>
  );
}
