'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle, Loader2, Sparkles } from 'lucide-react';
import { rateLimit, cleanupRateLimits } from '@/lib/rate-limit';
import { getCheckoutIntent } from '@/lib/checkout'; // Use the utility you built!

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // 1. Rate Limiting
    cleanupRateLimits();
    const { success, resetIn } = rateLimit(email, 5, 300000); 
    
    if (!success) {
      setMessage({ 
        type: 'error', 
        text: `Security delay: Try again in ${Math.ceil(resetIn / 60)} minutes.`
      });
      setLoading(false);
      return;
    }

    // 2. Auth Execution
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
    } else {
      // 3. Post-Auth Routing Logic
      const checkoutRedirect = getCheckoutIntent(); // Consolidated utility
      
      if (checkoutRedirect) {
        // Use window.location for external Lemon Squeezy URLs
        window.location.href = checkoutRedirect;
      } else {
        router.push('/account');
        router.refresh();
      }
    }
  };

  const handleSignUp = async () => {
    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ 
        type: 'success', 
        text: 'Universe access pending! Check your inbox to confirm.' 
      });
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <div className="px-6 py-12 max-w-md mx-auto min-h-[80vh] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-[2rem] bg-kyn-green-600/10 text-kyn-green-600 mb-2">
          <Sparkles size={32} />
        </div>
        <h1 className="text-4xl font-black text-primary tracking-tight italic">
          Kynar Portal
        </h1>
        <p className="text-kyn-slate-400 text-sm font-medium max-w-[280px] mx-auto leading-relaxed">
          Your digital vault for high-performance assets.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-400 ml-1">
            Identity
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full px-5 py-4 rounded-2xl bg-surface border border-kyn-slate-100 dark:border-kyn-slate-800 text-primary font-bold focus:ring-4 focus:ring-kyn-green-500/10 focus:border-kyn-green-500 outline-none transition-all disabled:opacity-50"
            placeholder="you@domain.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-400 ml-1">
            Access Key
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full px-5 py-4 rounded-2xl bg-surface border border-kyn-slate-100 dark:border-kyn-slate-800 text-primary font-bold focus:ring-4 focus:ring-kyn-green-500/10 focus:border-kyn-green-500 outline-none transition-all disabled:opacity-50"
            placeholder="••••••••"
          />
        </div>

        {message && (
          <div className={`p-4 rounded-2xl text-sm flex items-start gap-3 border animate-in zoom-in-95 ${
            message.type === 'error' 
              ? 'bg-red-50/50 border-red-100 text-red-600 dark:bg-red-900/10 dark:border-red-900/20 dark:text-red-400' 
              : 'bg-kyn-green-50/50 border-kyn-green-100 text-kyn-green-600 dark:bg-kyn-green-900/10 dark:border-kyn-green-900/20 dark:text-kyn-green-400'
          }`}>
            {message.type === 'error' ? <AlertCircle size={20} className="shrink-0" /> : <CheckCircle size={20} className="shrink-0" />}
            <span className="font-bold leading-tight">{message.text}</span>
          </div>
        )}

        <div className="space-y-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-2xl font-black text-white bg-kyn-green-600 hover:bg-kyn-green-500 transition-all active:scale-[0.98] disabled:opacity-70 shadow-xl shadow-kyn-green-600/20 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : null}
            {loading ? 'Verifying...' : 'Enter Vault'}
          </button>

          <button
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-black text-kyn-slate-400 hover:text-primary hover:bg-kyn-slate-50 dark:hover:bg-kyn-slate-900 transition-all uppercase tracking-widest text-[10px]"
          >
            Create New Identity
          </button>
        </div>
      </form>
    </div>
  );
}
