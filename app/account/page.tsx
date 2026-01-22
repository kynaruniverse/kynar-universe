'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { LogOut, Package } from 'lucide-react';

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // Protect the route
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-kyn-slate-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-8">
      
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

      {/* Profile Card */}
      <div className="bg-white dark:bg-kyn-slate-800 p-4 rounded-xl border border-kyn-slate-200 dark:border-kyn-slate-700 flex items-center gap-4">
        <div className="w-12 h-12 bg-kyn-green-100 dark:bg-kyn-green-900/30 text-kyn-green-600 rounded-full flex items-center justify-center font-bold text-lg">
          {user.email?.[0].toUpperCase()}
        </div>
        <div>
          <p className="text-sm text-kyn-slate-500">Signed in as</p>
          <p className="font-medium text-kyn-slate-900 dark:text-white truncate max-w-[200px]">
            {user.email}
          </p>
        </div>
      </div>

      {/* Downloads Library (Placeholder for next milestone) */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-kyn-slate-900 dark:text-white">
          Downloads Library
        </h2>
        
        {/* Empty State */}
        <div className="text-center py-12 bg-kyn-slate-50 dark:bg-kyn-slate-800/50 rounded-2xl border border-dashed border-kyn-slate-300 dark:border-kyn-slate-700">
          <Package className="w-12 h-12 text-kyn-slate-400 mx-auto mb-3" />
          <h3 className="text-kyn-slate-900 dark:text-white font-medium mb-1">
            Your library is empty
          </h3>
          <p className="text-sm text-kyn-slate-500 mb-4 px-8">
            Start your collection to organise your digital life.
          </p>
          <button 
            onClick={() => router.push('/store')}
            className="text-sm font-bold text-kyn-green-600 hover:underline"
          >
            Browse Store
          </button>
        </div>
      </section>
    </div>
  );
}
