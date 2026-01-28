"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { triggerDownload } from '@/lib/storage'; // Import the new utility
import Link from 'next/link';
import { Lock, PackageOpen, Download, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { Product } from '@/types/index';

// Updated interface to include storage path
interface LibraryItem {
  id: string;
  product: Pick < Product,
  'id' | 'name' | 'world' | 'thumbnail_url' | 'hero_benefit' > & {
    file_path: string; // Ensure this column exists in your products table
  };
}

export default function LibraryPage() {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState < LibraryItem[] > ([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState < string | null > (null);
  const router = useRouter();
  
  useEffect(() => {
    if (user) fetchLibrary();
    else if (!authLoading) setDataLoading(false);
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
            hero_benefit,
            file_path
          )
        `)
        .eq('user_id', user?.id);
      
      if (error) throw error;
      setItems((data as unknown as LibraryItem[]) || []);
    } catch (err) {
      console.error("Vault Access Error:", err);
    } finally {
      setDataLoading(false);
    }
  };
  
  const handleDownload = async (path: string, name: string, id: string) => {
    setDownloadingId(id);
    await triggerDownload(path, `${name}.pdf`); // Standardizes file extension
    setDownloadingId(null);
  };
  
  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-kyn-canvas dark:bg-kyn-slate-900">
        <Loader2 className="animate-spin text-kyn-green-500 mb-4" size={32} />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400">Syncing Universe...</span>
      </div>
    );
  }
  
  // ... (Unauthorized and Empty states remain same as previous)
  
  return (
    <div className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 px-6 py-12 pb-40 pt-32">
      <header className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
           <div className="p-2 bg-kyn-green-500 rounded-lg text-white shadow-sm">
             <Sparkles size={16} />
           </div>
           <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-kyn-slate-400">Personal Vault</h2>
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-kyn-slate-900 dark:text-white mb-2 leading-none">Your Library</h1>
        <p className="text-[10px] font-bold text-kyn-green-600 dark:text-kyn-green-400 uppercase tracking-widest">
          {items.length} Secure Asset{items.length > 1 ? 's' : ''} • {user?.email}
        </p>
      </header>

      <div className="max-w-2xl mx-auto grid gap-6">
        {items.map((item) => (
          <div key={item.id} className="kyn-card p-5 flex items-center gap-5 bg-white dark:bg-kyn-slate-800 border border-kyn-slate-50 dark:border-kyn-slate-700">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-kyn-slate-50 dark:bg-kyn-slate-900 shrink-0 border border-kyn-slate-100 dark:border-kyn-slate-700">
              <img src={item.product.thumbnail_url} alt={item.product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow min-w-0">
              <span className="text-[8px] font-black uppercase tracking-widest text-kyn-slate-400 mb-1 block">{item.product.world} World</span>
              <h3 className="font-black text-lg text-kyn-slate-900 dark:text-white leading-none mb-2 truncate">{item.product.name}</h3>
              <p className="text-[10px] font-medium italic text-kyn-slate-500 dark:text-kyn-slate-400 line-clamp-1">{item.product.hero_benefit}</p>
            </div>
            <button 
              onClick={() => handleDownload(item.product.file_path, item.product.name, item.id)}
              disabled={downloadingId === item.id}
              className="p-4 bg-kyn-green-50 dark:bg-kyn-green-900/20 text-kyn-green-600 dark:text-kyn-green-400 rounded-2xl active:scale-90 transition-transform shadow-sm border border-kyn-green-100 dark:border-kyn-green-900/20 disabled:opacity-50"
            >
              {downloadingId === item.id ? <Loader2 className="animate-spin" size={22} /> : <Download size={22} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}