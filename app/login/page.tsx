'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
    } else {
      // Check for pending checkout redirect (Lemon Squeezy integration)
      const checkoutRedirect = sessionStorage.getItem('kynar_checkout_redirect');
      if (checkoutRedirect) {
        sessionStorage.removeItem('kynar_checkout_redirect');
        window.location.href = checkoutRedirect;
      } else {
        router.push('/account');
        router.refresh();
      }
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Redirect back to this page after email confirmation if needed
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ 
        type: 'success', 
        text: 'Confirmation email sent! Please check your inbox.' 
      });
      // Clear password for security
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <div className="px-4 py-12 max-w-sm mx-auto min-h-[60vh] flex flex-col justify-center">
      <div className="text-center space-y-3 mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Welcome back
        </h1>
        <p className="text-kyn-slate-500 text-sm leading-relaxed">
          Log in to access your library or continue shopping.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-1.5">
          <label 
            htmlFor="email" 
            className="block text-xs font-bold uppercase tracking-wider text-kyn-slate-500"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="
              w-full px-4 py-3 rounded-xl 
              bg-surface border border-kyn-slate-200 dark:border-kyn-slate-800 
              text-primary placeholder:text-kyn-slate-400
              focus:ring-2 focus:ring-kyn-green-500 focus:border-transparent outline-none 
              transition-all disabled:opacity-50
            "
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1.5">
          <label 
            htmlFor="password" 
            className="block text-xs font-bold uppercase tracking-wider text-kyn-slate-500"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="
              w-full px-4 py-3 rounded-xl 
              bg-surface border border-kyn-slate-200 dark:border-kyn-slate-800 
              text-primary placeholder:text-kyn-slate-400
              focus:ring-2 focus:ring-kyn-green-500 focus:border-transparent outline-none 
              transition-all disabled:opacity-50
            "
            placeholder="••••••••"
          />
        </div>

        {/* Status Messages */}
        {message && (
          <div className={`
            p-3 rounded-xl text-sm flex items-start gap-2
            ${message.type === 'error' 
              ? 'bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400' 
              : 'bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400'}
          `}>
            {message.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
            <span className="flex-1 font-medium">{message.text}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-3.5 rounded-full font-bold text-white 
            bg-kyn-green-600 hover:bg-kyn-green-700 
            transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed
            shadow-lg shadow-kyn-green-900/10 flex items-center justify-center gap-2
          "
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          {loading ? 'Processing...' : 'Log In'}
        </button>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            className="text-sm text-kyn-slate-500 hover:text-kyn-green-600 transition-colors"
          >
            Need an account? <span className="underline font-medium">Sign up</span>
          </button>
        </div>
      </form>
    </div>
  );
}
