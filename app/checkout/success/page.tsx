'use client';

import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight, Download, Library, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  // Confetti effect or analytics could be triggered here
  useEffect(() => {
    console.log(`Order ${orderId} successful. Tracking conversion...`);
  }, [orderId]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 text-center animate-in fade-in zoom-in-95 duration-700">
      
      {/* 1. Success Icon & Visuals */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-kyn-green-500 blur-3xl opacity-20 animate-pulse" />
        <div className="relative bg-white dark:bg-kyn-slate-900 p-4 rounded-full shadow-2xl border border-kyn-green-100 dark:border-kyn-green-900/30">
          <CheckCircle2 size={64} className="text-kyn-green-500" />
        </div>
        <Sparkles className="absolute -top-2 -right-2 text-kyn-caramel-500 animate-bounce" size={24} />
      </div>

      {/* 2. Headline */}
      <h1 className="text-4xl font-black text-primary mb-4 tracking-tight">
        You're All Set!
      </h1>
      <p className="text-lg text-kyn-slate-500 max-w-sm mx-auto leading-relaxed mb-10">
        Your digital tools have been added to your library. It might take a minute for the transaction to fully sync.
      </p>

      {/* 3. Action Buttons */}
      <div className="w-full max-w-xs space-y-4">
        <Link 
          href="/account" 
          className="flex items-center justify-center gap-3 w-full py-5 bg-kyn-green-600 text-white rounded-[1.5rem] font-bold text-lg shadow-xl shadow-kyn-green-600/20 hover:bg-kyn-green-500 transition-all active:scale-95"
        >
          <Library size={22} />
          Go to My Library
        </Link>
        
        <Link 
          href="/store" 
          className="flex items-center justify-center gap-2 w-full py-4 text-kyn-slate-400 font-bold hover:text-primary transition-colors"
        >
          Continue Browsing
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* 4. Support Footer */}
      <div className="mt-16 pt-8 border-t border-kyn-slate-100 dark:border-kyn-slate-800 w-full max-w-md">
        <p className="text-xs text-kyn-slate-400">
          Order ID: <span className="font-mono">{orderId || 'Processing...'}</span>
        </p>
        <p className="text-[10px] text-kyn-slate-400 mt-2">
          A receipt has been sent to your email. If you have any issues, please contact support.
        </p>
      </div>
    </div>
  );
}

// Main Page Component with Suspense Boundary for useSearchParams
export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessLoading />}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessLoading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 space-y-6">
      <Skeleton className="h-24 w-24 rounded-full" />
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-16 w-full max-w-xs rounded-2xl" />
    </div>
  );
}
