"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { User, ArrowRight, Check, Loader2, AlertCircle, LogOut, Download } from 'lucide-react';
// FIX: Import the modern client that can read Cookies
import { createBrowserClient } from '@supabase/ssr';
import { signInWithEmail } from './actions';

export default function AccountPage() {
  // 1. INITIALIZE THE "SMART" CLIENT
  // This client knows how to read the cookies set by your login route
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [viewState, setViewState] = useState<'checking' | 'authenticated' | 'guest'>('checking');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // 2. CHECK SESSION ON LOAD
  useEffect(() => {
    async function checkSession() {
      // Now this 'getUser' looks at the Cookie, not LocalStorage
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || 'Traveler');
        setViewState('authenticated');
      } else {
        setViewState('guest');
      }
    }
    checkSession();
  }, [supabase]);

  // LOGIN HANDLER
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const result = await signInWithEmail(formData);

    if (result?.error) {
      setFormStatus('error');
      setErrorMessage(result.error);
    } else {
      setFormStatus('success');
    }
  }

  // LOGOUT HANDLER
  async function handleLogout() {
    await supabase.auth.signOut();
    setViewState('guest');
    setUserEmail(null);
    window.location.reload(); // Force refresh to clear cookies cleanly
  }

  // LOADING VIEW
  if (viewState === 'checking') {
    return (
      <div className="min-h-screen bg-account-base flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-text animate-spin" />
      </div>
    );
  }

  // --- LIBRARY VIEW (LOGGED IN) ---
  if (viewState === 'authenticated') {
    return (
      <main className="min-h-screen bg-account-base pb-24">
        <div className="bg-account-surface border-b border-black/5 px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold font-sans text-primary-text">My Library</h1>
              <p className="font-serif text-primary-text/60 italic mt-1">Welcome back 100, {userEmail}</p>
            </div>
            <button onClick={handleLogout} className="px-6 py-2 border border-primary-text/20 rounded-btn hover:bg-white hover:text-red-600 transition-colors flex items-center text-sm font-medium">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-card p-12 text-center border border-black/5 shadow-sm">
            <div className="w-16 h-16 bg-account-base rounded-full flex items-center justify-center mx-auto mb-6 text-primary-text/40">
              <Download className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold font-sans text-primary-text mb-2">Your collection is empty</h2>
            <p className="text-primary-text/60 mb-8 max-w-sm mx-auto">
              Once you purchase a tool, it will appear here for instant download.
            </p>
            <Link href="/marketplace" className="inline-flex items-center px-6 py-3 bg-primary-text text-white rounded-btn hover:opacity-90 transition-all">
              Browse Marketplace <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // --- GUEST VIEW (LOGIN FORM) ---
  return (
    <main className="min-h-screen bg-account-base flex flex-col items-center justify-center p-4">
      <div className="bg-account-surface w-full max-w-md p-8 rounded-card shadow-sm border border-black/5 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary-text shadow-sm">
          <User className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold font-sans text-primary-text mb-2 tracking-tight">Welcome back 100.</h1>
        <p className="font-serif text-primary-text/70 mb-8 leading-relaxed">Enter your email to access your library.</p>

        {formStatus === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-btn p-6 animate-fade-in">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-primary-text mb-2">Magic Link Sent!</h3>
            <p className="text-sm text-primary-text/70">Check your inbox to enter.</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-primary-text mb-1">Email Address</label>
              <input name="email" type="email" id="email" required placeholder="name@example.com" className="w-full px-4 py-3 rounded-btn border border-gray-300 focus:outline-none focus:ring-2 focus:ring-home-accent bg-white/80" />
            </div>
            {formStatus === 'error' && (
              <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-md">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                {errorMessage || "Something went wrong."}
              </div>
            )}
            <button type="submit" disabled={formStatus === 'loading'} className="w-full py-3 bg-primary-text text-white font-medium rounded-btn hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
              {formStatus === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send Link <ArrowRight className="ml-2 w-4 h-4" /></>}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
