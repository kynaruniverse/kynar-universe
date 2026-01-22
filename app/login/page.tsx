'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      router.push('/account'); // Redirect to Account on success
      router.refresh();
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      // Optional: Add metadata like full name here if needed
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Check your email for the confirmation link!' });
    }
    setLoading(false);
  };

  return (
    <div className="px-4 py-12 max-w-sm mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-kyn-slate-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-kyn-slate-500">
          Log in to access your digital library.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-kyn-slate-700 dark:text-kyn-slate-300 mb-1">
            Email address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-kyn-slate-200 dark:border-kyn-slate-700 bg-white dark:bg-kyn-slate-800 focus:ring-2 focus:ring-kyn-green-500 outline-none transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-kyn-slate-700 dark:text-kyn-slate-300 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-kyn-slate-200 dark:border-kyn-slate-700 bg-white dark:bg-kyn-slate-800 focus:ring-2 focus:ring-kyn-green-500 outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-lg font-bold text-white bg-kyn-green-600 hover:bg-kyn-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Log In'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            className="text-sm text-kyn-slate-500 hover:text-kyn-green-600 transition-colors"
          >
            Need an account? <span className="underline">Sign up</span>
          </button>
        </div>
      </form>
    </div>
  );
}
