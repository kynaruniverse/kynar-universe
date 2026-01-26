'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/features/auth/components/AuthProvider';
import { verifyAdminAccess } from '@/features/auth/actions/auth';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    
    const verify = async () => {
      const { isAdmin } = await verifyAdminAccess();
      if (!isAdmin) {
        console.warn('Unauthorized admin access attempt:', user.id);
        router.replace('/');
      } else {
        setChecking(false);
      }
    };
    
    verify();
  }, [user, authLoading, router]);
  
  if (authLoading || checking) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-canvas gap-4">
        <LoadingSpinner size={18} />
        <p className="text-sm font-bold text-kyn-slate-500 uppercase tracking-wider animate-pulse">
          Verifying Privileges...
        </p>
      </div>
    );
  }
  
  return <>{children}</>;
}