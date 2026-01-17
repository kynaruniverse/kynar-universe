"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { User, ArrowRight, Loader2, AlertCircle, LogOut, Download, Lock, Package } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { login, signup } from './auth';
import { getDownloadLink } from './actions'; // <--- Import Key Master

export default function AccountPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [viewState, setViewState] = useState<'checking' | 'authenticated' | 'guest'>('checking');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  // STORE FULL PRODUCT DATA
  const [libraryItems, setLibraryItems] = useState<any[]>([]); 
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null); // Track which item is downloading
  const [errorMessage, setErrorMessage] = useState('');

  // 1. INIT
  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserEmail(user.email);
        setViewState('authenticated');

        // A. Get Purchases
        const { data: purchases } = await supabase.from('purchases').select('product_id, created_at');
        
        if (purchases && purchases.length > 0) {
          // B. Get Product Details for these purchases
          const slugs = purchases.map(p => p.product_id);
          const { data: products } = await supabase
            .from('products')
            .select('title, slug, image')
            .in('slug', slugs);

          // C. Merge Data (Combine Receipt Date with Product Info)
          const mergedItems = purchases.map(purchase => {
            const details = products?.find(p => p.slug === purchase.product_id);
            return {
              ...purchase,
              title: details?.title || purchase.product_id, // Fallback to slug if no title
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

  // HANDLE DOWNLOAD
  async function handleDownload(slug: string) {
    setDownloadingId(slug); // Show spinner on button
    const result = await getDownloadLink(slug);
    
    if (result.error) {
      alert(result.error);
    } else if (result.url) {
      // Open the signed URL in a new tab
      window.open(result.url, '_blank');
    }
    
    setDownloadingId(null); // Stop spinner
  }

  // HANDLE LOGIN/SIGNUP
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
      <div className="min-h-screen bg-account-base flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-text animate-spin" />
      </div>
    );
  }

  if (viewState === 'authenticated') {
    return (
      <main className="min-h-screen bg-account-base pb-24">
        <div className="bg-account-surface border-b border-black/5 px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold font-sans text-primary-text">My Library</h1>
              <p className="font-serif text-primary-text/60 italic mt-1">Welcome back. Your tools are ready for you.</p>
            </div>
            <button onClick={handleLogout} className="px-6 py-2 border border-primary-text/20 rounded-btn hover:bg-white hover:text-red-600 transition-colors flex items-center text-sm font-medium">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {libraryItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {libraryItems.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-card border border-black/5 shadow-sm flex items-start gap-4">
                  {/* Image or Icon */}
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center bg-home-base text-home-accent">
                         <Package className="w-8 h-8" />
                       </div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-primary-text">{item.title}</h3>
                    <p className="text-sm text-primary-text/60 mb-4">Purchased: {new Date(item.created_at).toLocaleDateString()}</p>
                    
                    <button 
                      onClick={() => handleDownload(item.slug)}
                      disabled={downloadingId === item.slug}
                      className="text-sm font-bold text-home-accent hover:underline flex items-center disabled:opacity-50"
                    >
                      {downloadingId === item.slug ? (
                        <>Preparing <Loader2 className="ml-1 w-3 h-3 animate-spin" /></>
                      ) : (
                        <>Download Files <Download className="w-4 h-4 ml-1" /></>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-card p-12 text-center border border-black/5 shadow-sm">
               <div className="w-16 h-16 bg-account-base rounded-full flex items-center justify-center mx-auto mb-6 text-primary-text/40">
                <Download className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold font-sans text-primary-text mb-2">Your library awaits. This space is waiting for you.</h2>
              <Link href="/marketplace" className="inline-flex items-center px-6 py-3 bg-primary-text text-white rounded-btn hover:opacity-90 transition-all mt-4">
                Browse Marketplace <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </main>
    );
  }

  // GUEST VIEW (Same as before)
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
          <div>
            <label className="block text-sm font-bold text-primary-text mb-1">Email</label>
            <input name="email" type="email" required placeholder="name@example.com" className="w-full px-4 py-3 rounded-btn border border-gray-300 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-bold text-primary-text mb-1">Password</label>
            <div className="relative">
              <input name="password" type="password" required placeholder="••••••••" className="w-full px-4 py-3 rounded-btn border border-gray-300 bg-white" minLength={6} />
              <Lock className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
          {errorMessage && (
            <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {errorMessage}
            </div>
          )}
          <button type="submit" disabled={loading} className="w-full py-3 bg-primary-text text-white font-medium rounded-btn hover:opacity-90 transition-opacity flex items-center justify-center">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isLoginMode ? 'Sign In' : 'Create Account')}
          </button>
        </form>
        <div className="mt-6 text-sm">
          <button onClick={() => { setIsLoginMode(!isLoginMode); setErrorMessage(''); }} className="text-primary-text/60 hover:text-primary-text underline">
            {isLoginMode ? "No account? Create one." : "Already have an account? Sign in."}
          </button>
        </div>
      </div>
    </main>
  );
}
