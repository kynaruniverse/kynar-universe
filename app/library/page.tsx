"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Lock, PackageOpen, Download, ArrowRight, Sparkles, Orbit } from 'lucide-react';

export default function LibraryPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchLibrary();
    } else if (!authLoading) {
      setDataLoading(false);
    }
  }, [user, authLoading]);

  const fetchLibrary = async () => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select(`
          id,
          product:products (
            id,
            name,
            world,
            thumbnail_url,
            hero_benefit
          )
        `)
        .eq('user_id', user?.id);

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error("Error fetching library:", err);
    } finally {
      setDataLoading(false);
    }
  };

  // 1. LOADING: Calm Skeleton State
  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kyn-canvas dark:bg-kyn-slate-900">
        <div className="flex flex-col items-center gap-4">
          <Orbit className="animate-spin-slow text-kyn-green-500" size={40} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400">
            Accessing Vault...
          </span>
        </div>
      </div>
    );
  }

  // 2. UNAUTHORIZED: High-Trust Secure Wall
  if (!user) {
    return (
      <div className="min-h-screen px-6 flex flex-col items-center justify-center text-center bg-kyn-canvas dark:bg-kyn-slate-900">
        <div className="w-20 h-20 bg-white dark:bg-kyn-slate-800 rounded-[2rem] flex items-center justify-center mb-8 shadow-kyn-lift border border-kyn-slate-100 dark:border-kyn-slate-700">
          <Lock className="text-kyn-slate-900 dark:text-white" size={32} />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">The Vault</h1>
        <p className="text-sm text-kyn-slate-500 dark:text-kyn-slate-400 mb-10 max-w-xs leading-relaxed italic">
          "Your collection of digital assets is stored securely within the Kynar Universe."
        </p>
        <button 
          onClick={() => router.push('/auth')}
          className="w-full max-w-xs bg-kyn-slate-900 dark:bg-white text-white dark:text-kyn-slate-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all"
        >
          Verify Identity
        </button>
      </div>
    );
  }

  // 3. EMPTY: "Start Your Collection" State
  if (items.length === 0) {
    return (
      <div className="min-h-screen px-6 py-20 flex flex-col items-center text-center bg-kyn-canvas dark:bg-kyn-slate-900">
        <div className="w-24 h-24 bg-kyn-slate-50 dark:bg-kyn-slate-800 rounded-full flex items-center justify-center mb-8 border border-dashed border-kyn-slate-200 dark:border-kyn-slate-700">
          <PackageOpen className="text-kyn-slate-300" size={40} />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-3">Vault Empty</h2>
        <p className="text-xs font-medium text-kyn-slate-400 uppercase tracking-widest mb-12">
          Your collection is ready for its first asset.
        </p>
        
        <div className="grid w-full max-w-sm gap-4">
          {['Home', 'Lifestyle', 'Tools'].map((world) => (
            <Link key={world} href={`/world/${world.toLowerCase()}`} className="kyn-card p-6 flex items-center justify-between group">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-kyn-slate-900 dark:text-white">
                Explore {world}
              </span>
              <ArrowRight size={18} className="text-kyn-green-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // 4. SUCCESS: The Library Grid
  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 px-6 py-12 pb-40">
      <header className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
           <div className="p-2 bg-kyn-green-500 rounded-lg text-white">
             <Sparkles size={16} />
           </div>
           <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400">Personal Vault</h2>
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-kyn-slate-900 dark:text-white mb-2">
          Your Library
        </h1>
        <p className="text-[10px] font-bold text-kyn-green-600 uppercase tracking-widest">
          {items.length} Secure Asset{items.length > 1 ? 's' : ''} • {user.email}
        </p>
      </header>

      <div className="max-w-2xl mx-auto grid gap-6">
        {items.map((item: any) => (
          <div key={item.id} className="kyn-card p-5 flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-kyn-slate-50 dark:bg-kyn-slate-800 shrink-0">
              <img 
                src={item.product.thumbnail_url} 
                alt={item.product.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-grow min-w-0">
              <span className="text-[8px] font-black uppercase tracking-widest text-kyn-slate-400 mb-1 block">
                {item.product.world} World
              </span>
              <h3 className="font-black text-lg text-kyn-slate-900 dark:text-white leading-none mb-2 truncate">
                {item.product.name}
              </h3>
              <p className="text-[10px] font-medium italic text-kyn-slate-500 line-clamp-1">
                {item.product.hero_benefit}
              </p>
            </div>
            <button className="p-4 bg-kyn-green-50 dark:bg-kyn-green-900/20 text-kyn-green-600 rounded-2xl active:scale-90 transition-transform shadow-sm">
              <Download size={22} />
            </button>
          </div>
        ))}
      </div>

      <footer className="max-w-2xl mx-auto mt-16 p-8 rounded-[2.5rem] bg-white dark:bg-kyn-slate-800 border border-dashed border-kyn-slate-200 dark:border-kyn-slate-700 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-400">
          Lifetime Access Guaranteed
        </p>
      </footer>
    </div>
  );
}
