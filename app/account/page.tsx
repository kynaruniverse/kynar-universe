'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Package, Download, ExternalLink, RefreshCcw, Sparkles } from 'lucide-react';

import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/Skeleton';
import { WORLD_CONFIG } from '@/lib/constants';
import type { World } from '@/lib/types';

interface PurchaseWithProduct {
  id: string;
  purchase_date: string;
  product: {
    id: string;
    title: string;
    slug: string;
    world: World;
    content_url: string | null;
    preview_image: string | null;
    category: string;
  };
}

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const [purchases, setPurchases] = useState<PurchaseWithProduct[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      fetchPurchases(user.id);
    }
  }, [user, loading, router]);

  async function fetchPurchases(userId: string) {
    try {
      setFetching(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('purchases')
        .select(`
          id,
          purchase_date,
          product:products (
            id, title, slug, world, content_url, preview_image, category
          )
        `)
        .eq('user_id', userId)
        .eq('status', 'completed')
        .order('purchase_date', { ascending: false });

      if (fetchError) throw fetchError;
      setPurchases(data as unknown as PurchaseWithProduct[]);
    } catch (err) {
      console.error('Error loading purchases:', err);
      setError('Failed to sync library.');
    } finally {
      setFetching(false);
    }
  }

  if (loading || !user) return null; 

  return (
    <div className="px-6 py-8 space-y-10 pb-32 animate-in fade-in duration-700">
      
      {/* 1. Header & Identity */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-primary tracking-tight">
            Library
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-kyn-green-500 animate-pulse" />
            <p className="text-[10px] font-bold text-kyn-slate-400 uppercase tracking-widest truncate max-w-[180px]">
              {user.email}
            </p>
          </div>
        </div>
        <button 
          onClick={() => signOut()}
          className="p-3 bg-kyn-slate-50 dark:bg-kyn-slate-900 text-kyn-slate-400 rounded-2xl hover:text-red-500 transition-colors border border-kyn-slate-100 dark:border-kyn-slate-800"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* 2. Main Content */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-xs font-black uppercase tracking-[0.2em] text-kyn-slate-400">
             Your Assets
           </h2>
           <button 
             onClick={() => fetchPurchases(user.id)}
             className="text-kyn-green-600 dark:text-kyn-green-400 p-1 hover:rotate-180 transition-transform duration-500"
           >
             <RefreshCcw size={16} />
           </button>
        </div>

        {fetching ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-40 w-full rounded-[2rem]" />
            ))}
          </div>
        ) : purchases.length === 0 ? (
          <div className="text-center py-16 px-8 rounded-[2.5rem] border-2 border-dashed border-kyn-slate-100 dark:border-kyn-slate-800 bg-surface/30">
            <Package className="w-12 h-12 text-kyn-slate-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-primary mb-2">The vault is empty</h3>
            <p className="text-sm text-kyn-slate-500 mb-8">
              Explore the store to find tools that simplify your life.
            </p>
            <Link 
              href="/store"
              className="inline-block bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-kyn-slate-900/10 active:scale-95 transition-all"
            >
              Browse Store
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {purchases.map((item) => {
              const worldInfo = WORLD_CONFIG[item.product.world];
              const theme = worldInfo?.colorClasses;
              
              return (
                <div 
                  key={item.id} 
                  className="group relative bg-surface p-6 rounded-[2rem] border border-kyn-slate-100 dark:border-kyn-slate-800 shadow-sm overflow-hidden"
                >
                  {/* Subtle Background Glow */}
                  <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 ${theme?.bg || 'bg-kyn-slate-500'}`} />

                  <div className="relative flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${theme?.text || 'text-kyn-slate-500'}`}>
                          {item.product.world} • {item.product.category}
                        </span>
                        <h3 className="text-xl font-bold text-primary leading-tight">
                          {item.product.title}
                        </h3>
                      </div>
                      <Link 
                        href={`/product/${item.product.slug}`}
                        className="p-2 text-kyn-slate-300 hover:text-primary transition-colors"
                      >
                        <ExternalLink size={18} />
                      </Link>
                    </div>

                    <div className="flex gap-3">
                      {item.product.content_url ? (
                        <a 
                          href={item.product.content_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl
                            bg-kyn-green-600 text-white font-bold shadow-lg shadow-kyn-green-600/20
                            hover:bg-kyn-green-500 active:scale-[0.97] transition-all
                          "
                        >
                          <Download size={18} strokeWidth={2.5} />
                          Download Now
                        </a>
                      ) : (
                        <div className="flex-1 py-4 flex items-center justify-center gap-2 text-sm font-bold text-kyn-slate-400 bg-kyn-slate-50 dark:bg-kyn-slate-900 rounded-2xl border border-kyn-slate-100 dark:border-kyn-slate-800">
                          <RefreshCcw size={16} className="animate-spin" />
                          Preparing Files...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
