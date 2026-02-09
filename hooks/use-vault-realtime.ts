"use client";

/**
 * KYNAR UNIVERSE: Realtime Vault Sync Hook (v1.6)
 * Role: Reactively syncs Vault state on library acquisition events.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { UserLibrary } from "@/lib/supabase/types";

export function useVaultRealtime(userId ? : string) {
  const router = useRouter();
  
  useEffect(() => {
    if (!userId) return;
    
    const supabase = createClient();
    
    const channel = supabase
      .channel(`vault_sync:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "user_library",
          filter: `user_id=eq.${userId}`,
        },
        ({ new: record }: { new: UserLibrary }) => {
          console.debug(
            "[Vault Realtime] Product acquired:",
            record.product_id
          );
          
          // Invalidate RSC + client cache (Vault, Library, etc.)
          router.refresh();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, router]);
}