"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/browser';

/**
 * KYNAR UNIVERSE: Realtime Vault Sync
 * Role: Listens for database inserts and refreshes Server Components.
 */
export function useVaultRealtime(userId: string | undefined) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (!userId) return;

    // 1. Create a scoped channel for this user's library
    const channel = supabase
      .channel(`vault_sync_${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT', // Only listen for new acquisitions
          schema: 'public',
          table: 'user_library',
          filter: `user_id=eq.${userId}`, // RLS safety + specific filter
        },
        (payload) => {
          console.log('[Realtime] New asset acquired:', payload.new.product_id);
          
          // 2. Refresh the current route's Server Components
          router.refresh();
        }
      )
      .subscribe();

    // 3. Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, supabase, router]);
}
