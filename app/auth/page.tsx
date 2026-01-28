"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Orbit, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';

/**
 * AuthPage: Magic Link Entry Point
 * Aligned with Brand Strategy: "Frictionless, Secure, and Intentional."
 */
export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    
    // Request a passwordless Magic Link via Supabase
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Destination after the user clicks the email link
        emailRedirectTo: `${window.location.origin}/library`,
      },
    });

    setLoading(false);
    if (!error) {
      setSent(true);
    } else {
      console.error("Auth Dispatch Error:", error.message);
      setErrorMsg("Entry failed. Please verify your email format.");
    }
  };

  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 flex flex-col items-center justify-center px-6 pb-32">
      
      {/* Brand Anchor */}
      <Link href="/" className="mb-12 flex flex-col items-center gap-4 group">
        <div className="w-16 h-16 bg-kyn-slate-900 dark:bg-white rounded-kyn flex items-center justify-center transition-transform group-active:scale-95 shadow-kyn-lift">
          <Orbit size={32} className="text-white dark:text-kyn-slate-900" />
        </div>
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-kyn-slate-400">
          Kynar Universe
        </h2>
      </Link>

      <div className="w-full max-w-sm">
        {sent ? (
          <div className="kyn-card p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-12 h-12 bg-kyn-green-50 dark:bg-kyn-green-900/20 text-kyn-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-black text-kyn-slate-900 dark:text-white mb-3 uppercase tracking-tighter">
              Check your inbox
            </h3>
            <p className="text-sm text-kyn-slate-500 dark:text-kyn-slate-400 font-medium italic leading-relaxed">
              "A secure access link has been dispatched to your email address."
            </p>
            <button 
              onClick={() => setSent(false)} 
              className="mt-8 text-[9px] font-black uppercase tracking-widest text-kyn-slate-400 hover:text-kyn-slate-900 dark:hover:text-white transition-colors"
            >
              Back to Entry
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-black text-kyn-slate-900 dark:text-white uppercase tracking-tighter mb-2">
                Secure Entry
              </h1>
              <p className="text-xs font-medium text-kyn-slate-400 uppercase tracking-widest">
                Access your library & downloads
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-kyn-slate-300" size={18} />
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full bg-white dark:bg-kyn-slate-800 p-5 pl-12 rounded-2xl border border-kyn-slate-100 dark:border-kyn-slate-700 outline-none text-sm font-bold focus:ring-4 focus:ring-kyn-green-500/10 transition-all dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {errorMsg && (
                <p className="text-[10px] font-black uppercase tracking-widest text-red-500 text-center">
                  {errorMsg}
                </p>
              )}

              <button 
                disabled={loading}
                className="w-full bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-kyn-lift disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : (
                  <>
                    Send Magic Link
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-kyn-slate-300 dark:text-kyn-slate-600">
              <ShieldCheck size={14} />
              <span className="text-[9px] font-black uppercase tracking-widest">
                Verified Security by Supabase
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
