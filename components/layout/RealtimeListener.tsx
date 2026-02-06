"use client";

import { useVaultRealtime } from "@/lib/supabase/realtime";

export function RealtimeListener({ userId }: { userId: string | undefined }) {
  useVaultRealtime(userId);
  return null; // This component doesn't render anything, it just listens
}
