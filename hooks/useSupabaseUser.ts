"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; 
import { User } from '@supabase/supabase-js';

/**
 * useSupabaseUser Hook:
 * A direct, lightweight listener for the Supabase Auth session.
 * Used for simple "is-logged-in" checks without Profile data.
 */
export function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial Handshake: Check for existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Real-time Subscription: Update state on login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 3. Cleanup: Unsubscribe to prevent memory leaks
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
