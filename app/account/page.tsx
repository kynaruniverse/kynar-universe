'use client';

import { useEffect, useState } from 'react';
import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import { LogOut, Package, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/Skeleton';


// Define the Purchase Type (Joined with Product)
// Note: metadata export doesn't work in 'use client' components
// Consider moving to a layout or server component wrapper if SEO is needed
interface Purchase {
  id: string;
  purchase_date: string;
  product: {
    id: string;
    title: string;
    slug: string;
    world: 'Home' | 'Lifestyle' | 'Tools';
    content_url: string | null;
    preview_image: string | null;
  };
}

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [fetching, setFetching] = useState(true);
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

  const [error, setError] = useState<string | null>(null);

    async function fetchPurchases(userId: string) {
      try {
        setError(null);
        const { data, error } = await supabase
          .from('purchases')
          .select(`
            id,
            purchase_date,
            product:products (
              id, title, slug, world, content_url, preview_image
            )
          `)
          .eq('user_id', userId)
          .eq('status', 'completed')
          .order('purchase_date', { ascending: false });

        if (error) throw error;
      
        setPurchases(data as unknown as Purchase[]);
      } catch (err) {
        console.error('Error loading purchases:', err);
        setError('Failed to load your library. Please refresh to try again.');
      } finally {
        setFetching(false);
      }
    }

  if (loading || !user) return null; // Or a loading spinner

  return (
    <div className="px-4 py-6 space-y-8 pb-24">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-kyn-slate-900 dark:text-white">
          My Account
        </h1>
        <button 
          onClick={signOut}
          className="text-sm text-red-500 font-medium flex items-center gap-1 hover:opacity-80"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      {/* User Info */}
      <div className="bg-white dark:bg-kyn-slate-800 p-4 rounded-xl border border-kyn-slate-200 dark:border-kyn-slate-700 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 bg-kyn-green-100 dark:bg-kyn-green-900/30 text-kyn-green-600 rounded-full flex items-center justify-center font-bold text-lg">
          {user.email?.[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-kyn-slate-500 uppercase tracking-wider font-semibold">Logged in as</p>
          <p className="font-medium text-kyn-slate-900 dark:text-white truncate">
            {user.email}
          </p>
        </div>
      </div>

      {/* Downloads Library */}
      <section className="space-y-4">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        
        <h2 className="text-lg font-bold text-kyn-slate-900 dark:text-white flex items-center gap-2">
          Downloads Library
          <span className="bg-kyn-slate-100 dark:bg-kyn-slate-700 text-kyn-slate-600 dark:text-kyn-slate-300 text-xs px-2 py-0.5 rounded-full">
            {purchases.length}
          </span>
        </h2>
        
        {
  fetching ? (
      /* Skeleton Loading State */
      <div className="grid gap-4">
    {[1, 2].map((i) => (
      <div key={i} className="bg-white dark:bg-kyn-slate-800 p-4 rounded-xl border border-kyn-slate-100 dark:border-kyn-slate-800 flex flex-col gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16 rounded-full" /> {/* World Badge */}
          <Skeleton className="h-6 w-3/4" /> {/* Title */}
          <Skeleton className="h-3 w-1/2" /> {/* Date */}
        </div>
        <div className="flex gap-2 pt-2 border-t border-kyn-slate-50 dark:border-kyn-slate-700">
          <Skeleton className="h-10 flex-1 rounded-lg" /> {/* Button 1 */}
          <Skeleton className="h-10 w-12 rounded-lg" />   {/* Button 2 */}
        </div>
      </div>
    ))}
  </div>
    ) : purchases.length === 0 ? (
      // ... Keep your existing Empty State code here ...
          /* Empty State */
          <div className="text-center py-12 bg-kyn-slate-50 dark:bg-kyn-slate-800/50 rounded-2xl border border-dashed border-kyn-slate-300 dark:border-kyn-slate-700">
            <Package className="w-12 h-12 text-kyn-slate-400 mx-auto mb-3" />
            <h3 className="text-kyn-slate-900 dark:text-white font-medium mb-1">
              Ready for downloads
            </h3>
            <p className="text-sm text-kyn-slate-500 mb-4 px-8">
              Your library's waiting. Start shopping.
            </p>
            <button 
              onClick={() => router.push('/store')}
              className="text-sm font-bold text-kyn-green-600 hover:underline"
            >
              Browse Store
            </button>
          </div>
        ) : (
          /* Purchases Grid */
          <div className="grid gap-4">
            {purchases.map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-kyn-slate-800 p-4 rounded-xl border border-kyn-slate-200 dark:border-kyn-slate-700 shadow-sm flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`
                      inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white mb-2
                      ${item.product.world === 'Home' ? 'bg-kyn-green-500' : ''}
                      ${item.product.world === 'Lifestyle' ? 'bg-kyn-caramel-500' : ''}
                      ${item.product.world === 'Tools' ? 'bg-kyn-slate-500' : ''}
                    `}>
                      {item.product.world}
                    </span>
                    <h3 className="font-bold text-kyn-slate-900 dark:text-white leading-tight">
                      {item.product.title}
                    </h3>
                    <p className="text-xs text-kyn-slate-400 mt-1">
                      Purchased on {new Date(item.purchase_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-kyn-slate-100 dark:border-kyn-slate-700">
                  {item.product.content_url ? (
                    <a 
                      href={item.product.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-kyn-green-50 dark:bg-kyn-green-900/20 text-kyn-green-700 dark:text-kyn-green-300 text-sm font-semibold hover:bg-kyn-green-100 dark:hover:bg-kyn-green-900/40 transition-colors"
                    >
                      <Download size={16} />
                      Access Content
                    </a>
                  ) : (
                    <button disabled className="flex-1 py-2 text-sm text-kyn-slate-400 bg-kyn-slate-50 rounded-lg cursor-not-allowed">
                      Processing...
                    </button>
                  )}
                  
                  <Link 
                    href={`/product/${item.product.slug}`}
                    className="px-3 py-2 rounded-lg text-kyn-slate-500 hover:bg-kyn-slate-50 dark:hover:bg-kyn-slate-700 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
