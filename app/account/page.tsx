"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { User, ArrowRight, Loader2, AlertCircle, LogOut, Download, Lock } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { login, signup } from './auth';

export default function AccountPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [viewState, setViewState] = useState<'checking' | 'authenticated' | 'guest'>('checking');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  // FORM STATE
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Sign Up
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 1. CHECK SESSION
  useEffect(() => {
    async function checkSession() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
        setViewState('authenticated');
      } else {
        setViewState('guest');
      }
    }
    checkSession();
  }, [supabase]);

  // 2. HANDLE SUBMIT
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    
    // Choose function based on mode
    const action = isLoginMode ? login : signup;
    const result = await action(formData);

    if (result?.error) {
      setErrorMessage(result.error);
      setLoading(false);
    } else {
      // Success! Refresh page to trigger session check
      window.location.reload();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  // --- LOADING ---
  if (viewState === 'checking') {
    return (
      <div className="min-h-screen bg-account-base flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-text animate-spin" />
      </div>
    );
  }

  // --- LIBRARY (LOGGED IN) ---
  if (viewState === 'authenticated') {
    return (
      <main className="min-h-screen bg-account-base pb-24">
        <div className="bg-account-surface border-b border-black/5 px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold font-sans text-primary-text">My Library</h1>
              <p className="font-serif text-primary-text/60 italic mt-1">Welcome back, {userEmail}</p>
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
            <Link href="/marketplace" className="inline-flex items-center px-6 py-3 bg-primary-text text-white rounded-btn hover:opacity-90 transition-all mt-4">
              Browse Marketplace <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // --- FORM (GUEST) ---
  return (
    <main className="min-h-screen bg-account-base flex flex-col items-center justify-center p-4">
      <div className="bg-account-surface w-full max-w-md p-8 rounded-card shadow-sm border border-black/5 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary-text shadow-sm">
          <User className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-bold font-sans text-primary-text mb-2">
          {isLoginMode ? 'Welcome back.' : 'Join the Universe.'}
        </h1>
        <p className="font-serif text-primary-text/70 mb-8">
          {isLoginMode ? 'Enter your details to access your library.' : 'Create an account to start your journey.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-bold text-primary-text mb-1">Email</label>
            <input name="email" type="email" required placeholder="name@example.com" className="w-full px-4 py-3 rounded-btn border border-gray-300 bg-white" />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-bold text-primary-text mb-1">Password</label>
            <div className="relative">
              <input name="password" type="password" required placeholder="••••••••" className="w-full px-4 py-3 rounded-btn border border-gray-300 bg-white" minLength={6} />
              <Lock className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {errorMessage}
            </div>
          )}

          {/* SUBMIT */}
          <button type="submit" disabled={loading} className="w-full py-3 bg-primary-text text-white font-medium rounded-btn hover:opacity-90 transition-opacity flex items-center justify-center">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isLoginMode ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {/* TOGGLE MODE */}
        <div className="mt-6 text-sm">
          <button 
            onClick={() => { setIsLoginMode(!isLoginMode); setErrorMessage(''); }}
            className="text-primary-text/60 hover:text-primary-text underline"
          >
            {isLoginMode ? "No account? Create one." : "Already have an account? Sign in."}
          </button>
        </div>

      </div>
    </main>
  );
}
