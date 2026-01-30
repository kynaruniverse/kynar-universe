import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AccountPage() {
  const supabase = createClient();

  // 1. Get the authenticated session
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Redirect to login if they aren't signed in
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col gap-12 py-12 px-6 animate-in fade-in duration-1000">
      
      {/* Identity Section */}
      <header className="space-y-2">
        <div className="w-2 h-2 rounded-full bg-kyn-green-500 mb-4" />
        <h1 className="text-3xl font-semibold text-kyn-green-700">Account</h1>
        <p className="text-sm text-kyn-slate-500 font-medium tracking-tight">
          Logged in as <span className="text-kyn-green-700">{user.email}</span>
        </p>
      </header>

      {/* Action Handrails */}
      <section className="flex flex-col gap-4">
        <Link 
          href="/library"
          className="flex items-center justify-between p-6 bg-white border border-kyn-slate-500/10 rounded-[28px] shadow-sm active:scale-[0.98] transition-all group"
        >
          <div className="space-y-1">
            <span className="text-sm font-semibold text-kyn-green-700 block">Your Library</span>
            <span className="text-xs text-kyn-slate-400">Access your owned assets and tools.</span>
          </div>
          <span className="text-xl opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
        </Link>

        <Link 
          href="/"
          className="flex items-center justify-between p-6 bg-white border border-kyn-slate-500/10 rounded-[28px] shadow-sm active:scale-[0.98] transition-all group"
        >
          <div className="space-y-1">
            <span className="text-sm font-semibold text-kyn-green-700 block">Marketplace</span>
            <span className="text-xs text-kyn-slate-400">Discover new tools for clarity.</span>
          </div>
          <span className="text-xl opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
        </Link>
      </section>

      {/* Exit Logic */}
      <footer className="pt-8 mt-auto border-t border-kyn-slate-500/5">
        <form action="/auth/signout" method="post">
          <button 
            type="submit"
            className="w-full py-4 text-[10px] uppercase tracking-[0.3em] font-bold text-kyn-slate-400 hover:text-red-400 transition-colors"
          >
            Leave the Universe (Logout)
          </button>
        </form>
      </footer>

    </div>
  );
}
