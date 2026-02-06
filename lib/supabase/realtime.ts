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

    const channel = supabase
      .channel(`vault_sync_${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_library',
          filter: `user_id=eq.${userId}`,
        },
        (payload: any) => { // Fixed: Explicitly typed 'payload' to satisfy build
          console.log('[Realtime] New asset acquired:', payload.new.product_id);
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, supabase, router]);
}
