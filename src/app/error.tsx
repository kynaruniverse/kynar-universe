'use client';

import { useEffect } from 'react';
import { RefreshCcw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-sm">
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="relative bg-surface border border-red-100 dark:border-red-900/30 p-5 rounded-[2rem] shadow-xl flex items-center justify-center">
            <AlertTriangle className="text-red-500" size={32} />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-primary tracking-tight">
            Universe Glitch
          </h2>
          <p className="text-sm font-medium text-kyn-slate-500 dark:text-kyn-slate-400 leading-relaxed">
            Something went wrong. Let's try to resync.
          </p>
        </div>
        <button
          onClick={reset}
          className="group w-full flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-95"
        >
          <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
          Resync Connection
        </button>
      </div>
    </div>
  );
}