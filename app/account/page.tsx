"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { User, ArrowRight, Check, Loader2, AlertCircle, LogOut, Download } from 'lucide-react';
import { supabase } from '../../lib/supabase'; // Using your existing helper
import { signInWithEmail } from './actions';

export default function AccountPage() {
  // STATE: 
  // 'checking' = asking Supabase if you are logged in
  // 'authenticated' = yes, show Library
  // 'guest' = no, show Login Form
  const [viewState, setViewState] = useState<'checking' | 'authenticated' | 'guest'>('checking');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // LOGIN FORM STATES
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // 1. CHECK SESSION ON LOAD
  useEffect(() => {
    async function checkSession() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || 'Traveler');
        setViewState('authenticated');
      } else {
        setViewState('guest');
      }
    }
    checkSession();
  }, []);

  // 2. HANDLE LOGIN SUBMIT
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

  // 3. HANDLE LOGOUT
  async function handleLogout() {
    await supabase.auth.signOut();
    setViewState('guest');
    setUserEmail(null);
  }

  // LOADING SCREEN
  if (viewState === 'checking') {
    return (
      <div className="min-h-screen bg-account-base flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-text animate-spin" />
      </div>
    );
  }

  // ------------------------------------------------------------------
  // VIEW A: THE LIBRARY (Logged In)
  // ------------------------------------------------------------------
  if (viewState === 'authenticated') {
    return (
      <main className="min-h-screen bg-account-base pb-24">
        
        {/* HEADER */}
        <div className="bg-account-surface border-b border-black/5 px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold font-sans text-primary-text">My Library</h1>
              <p className="font-serif text-primary-text/60 italic mt-1">
                Welcome back, {userEmail}
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-6 py-2 border border-primary-text/20 rounded-btn hover:bg-white hover:text-red-600 transition-colors flex items-center text-sm font-medium"
            >
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </button>
          </div>
        </div>

        {/* LIBRARY GRID */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          
          {/* EMPTY STATE (Since we haven't built the purchase history yet) */}
          <div className="bg-white rounded-card p-12 text-center border border-black/5 shadow-sm">
            <div className="w-16 h-16 bg-account-base rounded-full flex items-center justify-center mx-auto mb-6 text-primary-text/40">
              <Download className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold font-sans text-primary-text mb-2">Your collection is empty</h2>
            <p className="text-primary-text/60 mb-8 max-w-sm mx-auto">
              Once you purchase a tool or guide, it will appear here for instant download, forever.
            </p>
            <Link 
              href="/marketplace" 
              className="inline-flex items-center px-6 py-3 bg-primary-text text-white rounded-btn hover:opacity-90 transition-all"
            >
              Browse the Marketplace <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
    );
  }

  // ------------------------------------------------------------------
  // VIEW B: LOGIN FORM (Guest)
  // ------------------------------------------------------------------
  return (
    <main className="min-h-screen bg-account-base flex flex-col items-center justify-center p-4">
      <div className="bg-account-surface w-full max-w-md p-8 rounded-card shadow-sm border border-black/5 text-center">
        
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary-text shadow-sm">
          <User className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-bold font-sans text-primary-text mb-2 tracking-tight">
          Welcome back, traveler.
        </h1>
        
        <p className="font-serif text-primary-text/70 mb-8 leading-relaxed">
          Your library awaits. Enter your email to access your tools.
        </p>

        {formStatus === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-btn p-6 animate-fade-in">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-primary-text mb-2">Magic Link Sent!</h3>
            <p className="text-sm text-primary-text/70">
              Check your inbox. Click the link to enter your library.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-primary-text mb-1">Email Address</label>
              <input 
                name="email"
                type="email" 
                id="email"
                required
                placeholder="name@example.com" 
                className="w-full px-4 py-3 rounded-btn border border-gray-300 focus:outline-none focus:ring-2 focus:ring-home-accent bg-white/80"
              />
            </div>

            {formStatus === 'error' && (
              <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-md">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                {errorMessage || "Something went wrong. Please try again."}
              </div>
            )}
            
            <button 
              type="submit"
              disabled={formStatus === 'loading'}
              className="w-full py-3 bg-primary-text text-white font-medium rounded-btn hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formStatus === 'loading' ? (
                <>Sending <Loader2 className="ml-2 w-4 h-4 animate-spin" /></>
              ) : (
                <>Send Access Link <ArrowRight className="ml-2 w-4 h-4" /></>
              )}
            </button>
          </form>
        )}

        <div className="mt-8 pt-8 border-t border-black/10">
          <p className="text-sm text-primary-text/60">
            Just browsing? <Link href="/marketplace" className="font-bold underline hover:text-primary-text">Return to the Marketplace</Link>.
          </p>
        </div>

      </div>
    </main>
  );
}

