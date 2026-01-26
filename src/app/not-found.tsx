import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <h1 className="text-8xl font-black text-kyn-green-600">404</h1>
          <h2 className="text-3xl font-black text-primary tracking-tight">
            Lost in Space
          </h2>
          <p className="text-kyn-slate-500 font-medium">
            This sector of the Kynar Universe doesn't exist.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform"
          >
            <Home size={18} />
            Home
          </Link>
          <Link
            href="/store"
            className="flex items-center gap-2 bg-surface border border-kyn-slate-200 dark:border-kyn-slate-800 px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-transform"
          >
            <Search size={18} />
            Browse Store
          </Link>
        </div>
      </div>
    </div>
  );
}