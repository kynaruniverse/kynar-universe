'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function StoreError({ error }: { error: Error }) {
  useEffect(() => console.error('Store error:', error), [error]);
  
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-black text-primary">Store Unavailable</h2>
        <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold">
          <Home size={18} />
          Go Home
        </Link>
      </div>
    </div>
  );
}