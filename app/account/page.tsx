"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, AlertCircle, Lock, Package, Sparkles, ShieldCheck, Info } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { login, signup } from './auth';
import { getCategoryTheme } from '../../lib/theme';



export default function AccountPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [viewState, setViewState] = useState<'checking' | 'authenticated' | 'guest'>('checking');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [libraryItems, setLibraryItems] = useState<any[]>([]);

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
        
        if (purchases?.length) {
          const slugs = purchases.map(p => p.product_id);
          const { data: products } = await supabase
            .from('products')
            .select('title, slug, image, format, category')
            .in('slug', slugs);

          const mergedItems = purchases.map(purchase => {
            const details = products?.find(p => p.slug === purchase.product_id);
            return {
              ...purchase,
              title: details?.title || "Digital Asset",
              image: details?.image,
              category: details?.category,
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

  if (viewState === 'checking') return <LoadingState />;

  return (
    <main className="min-h-screen bg-brand-base pb-32 selection:bg-brand-accent/20">
      {viewState === 'authenticated' ? (
        <AuthenticatedLibrary 
          email={userEmail} 
          items={libraryItems} 
          onLogout={async () => { await supabase.auth.signOut(); window.location.reload(); }} 
        />
      ) : (
        <GuestAuthView />
      )}
    </main>
  );
}

/** * SUB-COMPONENT: Authenticated User Library 
 */
function AuthenticatedLibrary({ email, items, onLogout }: { email: string | null, items: any[], onLogout: () => void }) {
  return (
    <>
      <header className="bg-white/30 backdrop-blur-3xl border-b border-brand-surface/20 px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-semibold text-brand-text tracking-tight">My Library</h1>
            <p className="text-brand-text/40 font-medium">{email} — Your personal library.</p>
          </div>
          <button onClick={onLogout} aria-label="Sign out of account" className="px-10 py-4 bg-brand-base text-brand-text/50 hover:text-brand-text rounded-full border border-brand-surface/30 transition-all text-[10px] font-bold uppercase tracking-widest">
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-24">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {items.map((item, idx) => {
              const styles = getCategoryTheme(item.category);
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                  key={idx} className={`card-elevated p-8 shadow-tactile-hover flex flex-col sm:flex-row items-center gap-10 group border-t-4 ${styles.border}`}
                >
                  <div className="w-28 h-28 bg-brand-base rounded-inner overflow-hidden flex-shrink-0">
                    {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-liquid" /> : <div className="w-full h-full flex items-center justify-center text-brand-text/10 surface-frosted"><Package size={32} /></div>}
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <div className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-2 ${styles.text}`}>{item.format} Asset</div>
                    <h3 className="font-semibold text-2xl text-brand-text tracking-tight mb-6">{item.title}</h3>
                    <button disabled className="inline-flex items-center px-8 py-4 bg-brand-text/10 text-brand-text/40 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-not-allowed">
                      Launching Q1 2026<Lock className="w-3.5 h-3.5 ml-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : <EmptyLibraryState />}
      </div>
    </>
  );
}

/** * SUB-COMPONENT: Auth Form (Guest View) 
 */
function GuestAuthView() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent < HTMLFormElement > ) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
  
    try {
      const result = await (isLoginMode ? login(new FormData(e.currentTarget)) : signup(new FormData(e.currentTarget)));
      if (result?.error) {
        setErrorMessage(result.error);
        setLoading(false);
      } else {
        window.location.reload();
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-elevated w-full max-w-md p-12 md:p-20 shadow-tactile text-center">
        <h1 className="text-4xl font-semibold text-brand-text mb-6 tracking-tight">
          {isLoginMode ? 'Welcome Back—Sign In' : 'Create Account'}
        </h1>
        <p className="text-brand-text/40 mb-12">
          {isLoginMode ? 'Enter your details to access your library.' : 'Join Kynar to manage your digital products.'}
        </p>
        <form onSubmit={handleSubmit} className="space-y-8 text-left">
          <AuthInput label="Email Address" name="email" type="email" placeholder="yourname@example.com" autoComplete="email" />
                  <AuthInput label="Password" name="password" type="password" placeholder="••••••••" autoComplete={isLoginMode ? "current-password" : "new-password"} />
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {/* Using hover:bg-brand-accent to link auth to the "Efficiency" theme */}
          <button type="submit" disabled={loading} className="w-full py-6 flex items-center justify-center bg-brand-text hover:bg-brand-accent text-white rounded-full transition-all duration-slow text-[10px] font-bold uppercase tracking-[0.25em] shadow-tactile">

            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLoginMode ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        <button onClick={() => setIsLoginMode(!isLoginMode)} className="mt-12 text-[10px] font-bold uppercase tracking-widest text-brand-text/20 hover:text-brand-text transition-all">
          {isLoginMode ? "New here? Join KYNAR and start exploring" : "Already a member? Sign in to access your library"}
        </button>
      </motion.div>
    </div>
  );
}

/** * HELPER UI COMPONENTS 
 */
function AuthInput({ label, ...props }: any) {
  return (
    <div className="space-y-3">
      <label htmlFor={props.name} className="text-[10px] font-bold text-brand-text/20 uppercase tracking-[0.25em] ml-6">{label}</label>
      <input {...props} id={props.name} required className="w-full px-8 py-5 rounded-full bg-brand-base/50 border border-transparent focus:bg-white focus:border-brand-surface/30 focus:outline-none transition-all duration-base font-medium text-sm" />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-brand-base flex flex-col items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-6 h-6 border-t-2 border-brand-accent rounded-full" />
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center text-[10px] font-bold uppercase tracking-widest text-accent-thermal bg-accent-thermal/5 p-5 rounded-inner border border-accent-thermal/10">
      <AlertCircle className="w-4 h-4 mr-3" /> {message}
    </motion.div>
  );
}

function EmptyLibraryState() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="card-elevated p-16 md:p-24 text-center surface-frosted max-w-2xl mx-auto">
      <Sparkles className="w-12 h-12 text-brand-accent/20 mx-auto mb-8" />
      <h2 className="text-3xl font-semibold text-brand-text mb-6 tracking-tight">Account Ready</h2>
      <p className="text-brand-text/40 mb-10 leading-relaxed max-w-sm mx-auto">Your account is verified! Explore the collection to discover digital products for you.</p>
      <div className="flex flex-col items-center gap-6">
        <Link href="/marketplace" className="px-12 py-5 bg-brand-text hover:bg-brand-accent text-white rounded-full transition-all duration-slow inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em]">
          Explore Collection <ArrowRight size={16} />
        </Link>

        <div className="flex items-center gap-2 text-[10px] font-bold text-brand-text/20 uppercase tracking-widest"><Info size={14} /> Checkout is in preview. Products will be ready soon.</div>
      </div>
    </motion.div>
  );
}
