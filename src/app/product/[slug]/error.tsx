'use client';
import { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

export default function ProductError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => console.error('Product error:', error), [error]);
  
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-black text-primary">Product Not Available</h2>
        <button onClick={reset} className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 mx-auto">
          <RefreshCcw size={18} />
          Try Again
        </button>
      </div>
    </div>
  );
}