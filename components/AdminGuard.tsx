'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldAlert } from 'lucide-react';

import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Wait for AuthProvider to finish initialization
    if (authLoading) return;

    // 2. No User? Redirect to Login immediately
    if (!user) {
      router.replace('/login');
      return;
    }

    // 3. Check Admin Status in DB
    const verifyAdmin = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        if (error || !data?.is_admin) {
          console.warn('Unauthorized admin access attempt:', user.id);
          router.replace('/'); // Not an admin -> Go Home
        } else {
          setChecking(false); // Success -> Show Content
        }
      } catch (err) {
        console.error('Admin verification failed:', err);
        router.replace('/');
      }
    };

    verifyAdmin();
  }, [user, authLoading, router]);

  // Loading Screen (Matches Admin Layout)
  if (authLoading || checking) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-canvas gap-4">
        <Loader2 className="h-8 w-8 text-kyn-green-600 animate-spin" />
        <p className="text-sm font-bold text-kyn-slate-500 uppercase tracking-wider animate-pulse">
          Verifying Privileges...
        </p>
      </div>
    );
  }

  // Render Admin Content
  return <>{children}</>;
}
