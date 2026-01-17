"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight, Loader2, AlertCircle, LogOut, Download, Lock, Package, Sparkles } from 'lucide-react';
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
        const { data: purchases } = await supabase.from('purchases').select('product_id, created_at');
        
        if (purchases && purchases.length > 0) {
          const slugs = purchases.map(p => p.product_id);
          const { data: products } = await supabase
            .from('products')
            .select('title, slug, image')
            .in('slug', slugs);

          const mergedItems = purchases.map(purchase => {
            const details = products?.find(p => p.slug === purchase.product_id);
            return {
              ...purchase,
              title: details?.title || purchase.product_id,
              image: details?.image,
              slug: purchase.product_id
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
    const result = await getDownloadLink(slug);
    if (result.error) alert(result.error);
    else if (result.url) window.open(result.url, '_blank');
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
      window.location.reload();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  if (viewState === 'checking') {
    return (
      <div className="min-h-screen bg-home-base flex flex-col items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-2 border-home-accent border-t-transparent rounded-full"
        />
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary-text/30">Syncing</p>
      </div>
    );
  }

  if (viewState === 'authenticated') {
    return (
      <main className="min-h-screen bg-home-base pb-32">
        <div className="bg-white/40 backdrop-blur-md border-b border-white/20 px-6 py-16">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-black font-sans text-primary-text tracking-tighter uppercase">Library</h1>
              <p className="font-serif text-lg text-primary-text/60 italic mt-2">Welcome back. Your assets are secure.</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="px-8 py-3 bg-white/60 hover:bg-white text-primary-text rounded-full border border-black/5 transition-all flex items-center text-xs font-bold uppercase tracking-widest active:scale-95"
            >
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-16">
          <AnimatePresence>
            {libraryItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {libraryItems.map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="bg-white/40 backdrop-blur-2xl p-6 rounded-[32px] border border-white/20 shadow-glass flex items-center gap-6 group"
                  >
                    <div className="w-20 h-20 bg-white/60 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner border border-black/5">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-home-accent/30">
                           <Package className="w-10 h-10" />
                         </div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-bold text-xl text-primary-text tracking-tight">{item.title}</h3>
                      <p className="text-xs font-serif italic text-primary-text/40 mb-4 uppercase tracking-widest">
                        Transmitted: {new Date(item.created_at).toLocaleDateString()}
                      </p>
                      
                      <button 
                        onClick={() => handleDownload(item.slug)}
                        disabled={downloadingId === item.slug}
                        className="text-sm font-black text-home-accent hover:opacity-70 flex items-center disabled:opacity-50 transition-all uppercase tracking-widest"
                      >
                        {downloadingId === item.slug ? (
                          <>Syncing <Loader2 className="ml-2 w-3 h-3 animate-spin" /></>
                        ) : (
                          <>Access Files <Download className="w-4 h-4 ml-2" /></>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/40 backdrop-blur-2xl rounded-[40px] p-16 text-center border border-white/20 shadow-glass"
              >
                <div className="w-20 h-20 bg-white/60 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary-text/20">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black font-sans text-primary-text mb-4 tracking-tighter">The sector is quiet.</h2>
                <p className="font-serif text-lg text-primary-text/50 italic mb-10">Your digital library is waiting to be filled.</p>
                <Link href="/marketplace" className="inline-flex items-center px-10 py-4 bg-primary-text text-white rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-all">
                  Explore Marketplace <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-home-base flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/40 backdrop-blur-3xl w-full max-w-md p-10 md:p-12 rounded-[48px] shadow-glass border border-white/20 text-center"
      >
        <div className="w-20 h-20 bg-white/60 rounded-[28px] flex items-center justify-center mx-auto mb-8 shadow-sm">
          <User className="w-10 h-10 text-primary-text/30" />
        </div>
        <h1 className="text-4xl font-black font-sans text-primary-text mb-2 tracking-tighter uppercase">
          {isLoginMode ? 'Identity' : 'Entry'}
        </h1>
        <p className="font-serif text-lg text-primary-text/50 italic mb-10 leading-relaxed px-4">
          {isLoginMode ? 'Verify your credentials to access your secure library.' : 'Establish your presence in the Kynar Universe.'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label className="block text-[10px] font-black text-primary-text/30 uppercase tracking-[0.2em] mb-2 ml-4">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              autoComplete="email"
              spellCheck={false}
              placeholder="name@universe.com" 
              className="w-full px-6 py-4 rounded-full border border-black/5 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-home-accent/20 transition-all font-medium" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-primary-text/30 uppercase tracking-[0.2em] mb-2 ml-4">Passkey</label>
            <div className="relative">
              <input 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••" 
                className="w-full px-6 py-4 rounded-full border border-black/5 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-home-accent/20 transition-all font-medium" 
                minLength={6} 
              />
              <Lock className="absolute right-6 top-4.5 w-4 h-4 text-primary-text/20" />
            </div>
          </div>

          <AnimatePresence>
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex items-center text-xs font-bold text-red-500 bg-red-50/50 p-4 rounded-2xl border border-red-100"
              >
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-5 bg-primary-text text-white font-black rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center shadow-xl uppercase tracking-widest text-sm"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLoginMode ? 'Verify Identity' : 'Establish Presence')}
          </button>
        </form>

        <div className="mt-10">
          <button 
            onClick={() => { setIsLoginMode(!isLoginMode); setErrorMessage(''); }} 
            className="text-[10px] font-black uppercase tracking-widest text-primary-text/40 hover:text-primary-text transition-colors underline underline-offset-4"
          >
            {isLoginMode ? "Need a passkey? Create one." : "Already have a passkey? Sign in."}
          </button>
        </div>
      </motion.div>
    </main>
  );
}
