import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Check if logged in
  if (!user) redirect('/login');

  // 2. Check if is_admin is true in profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (!profile?.is_admin) redirect('/');

  return (
    <div className="bg-kyn-mist min-h-screen">
      <nav className="bg-white border-b border-kyn-slate-500/10 px-6 py-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-kyn-slate-400">
          Admin Control
        </span>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}
