'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAdminStatus() {
      if (!user) return; // AuthProvider handles redirect to login if needed

      // Check the profiles table we just created
      const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (data?.is_admin) {
        setIsAdmin(true);
      } else {
        router.push('/'); // Kick out non-admins
      }
      setChecking(false);
    }

    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else {
        checkAdminStatus();
      }
    }
  }, [user, authLoading, router]);

  if (authLoading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kyn-slate-50 dark:bg-kyn-slate-900 text-kyn-green-600 font-bold">
        Verifying Admin Access...
      </div>
    );
  }

  // If we get here, they are definitely an admin
  return <>{children}</>;
}
