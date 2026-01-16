"use client";

import Link from 'next/link';
import { useState } from 'react';
import { User, ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';
import { signInWithEmail } from './actions';

export default function AccountPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const result = await signInWithEmail(formData);

    if (result?.error) {
      setStatus('error');
      setErrorMessage(result.error);
    } else {
      setStatus('success');
    }
  }

  return (
    <main className="min-h-screen bg-account-base flex flex-col items-center justify-center p-4">
      
      {/* CARD CONTAINER */}
      <div className="bg-account-surface w-full max-w-md p-8 rounded-card shadow-sm border border-black/5 text-center">
        
        {/* ICON */}
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary-text shadow-sm">
          <User className="w-8 h-8" />
        </div>

        {/* LORE & WELCOME */}
        <h1 className="text-3xl font-bold font-sans text-primary-text mb-2 tracking-tight">
          Welcome back, traveler.
        </h1>
        
        <p className="font-serif text-primary-text/70 mb-8 leading-relaxed">
          Your library awaits. Enter your email to access your tools and guides.
        </p>

        {/* SUCCESS STATE */}
        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-btn p-6 animate-fade-in">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-primary-text mb-2">Magic Link Sent!</h3>
            <p className="text-sm text-primary-text/70">
              Check your inbox. Click the link to instantly access your library.
            </p>
            <p className="text-xs text-primary-text/40 mt-4">
              (You can close this tab)
            </p>
          </div>
        ) : (
          /* LOGIN FORM */
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
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

            {/* ERROR MESSAGE */}
            {status === 'error' && (
              <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-md">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                {errorMessage || "Something went wrong. Please try again."}
              </div>
            )}
            
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-primary-text text-white font-medium rounded-btn hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>Sending <Loader2 className="ml-2 w-4 h-4 animate-spin" /></>
              ) : (
                <>Send Access Link <ArrowRight className="ml-2 w-4 h-4" /></>
              )}
            </button>
          </form>
        )}

        {/* FOOTER NUDGE */}
        <div className="mt-8 pt-8 border-t border-black/10">
          <p className="text-sm text-primary-text/60">
            Just browsing? <Link href="/marketplace" className="font-bold underline hover:text-primary-text">Return to the Marketplace</Link>.
          </p>
        </div>

      </div>
    </main>
  );
}
