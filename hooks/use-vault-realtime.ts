"use client";

/**
 * KYNAR UNIVERSE: Realtime Vault Sync Hook (v1.5)
 * Path: hooks/use-vault-realtime.ts
 * Role: Listens for library acquisitions and triggers server-side refreshes.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { UserLibrary } from '@/lib/supabase/types';

export function useVaultRealtime(userId: string | undefined) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // Exit if no user is authenticated to prevent channel errors
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
        (payload: { new: UserLibrary }) => {
          console.log('[Realtime] Asset synchronized:', payload.new.product_id);
          
          /**
           * router.refresh() invalidates the Client Component cache 
           * and re-fetches Server Components (like your Vault grid).
           */
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      // Clean up the channel on unmount to prevent memory leaks
      supabase.removeChannel(channel);
    };
  }, [userId, supabase, router]);
}
