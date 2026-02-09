"use client";

import { useEffect } from "react";
import { useVaultRealtime } from "@/hooks/use-vault-realtime";

interface RealtimeListenerProps {
  userId ? : string;
}

/**
 * KYNAR UNIVERSE: Realtime Listener
 * Role: Subscribes to vault updates for a given user.
 * Non-visual component (returns null).
 */
export function RealtimeListener({ userId }: RealtimeListenerProps) {
  useEffect(() => {
    if (!userId) return;
    
    const unsubscribe = useVaultRealtime(userId);
    
    // Cleanup on unmount
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [userId]);
  
  return null;
}