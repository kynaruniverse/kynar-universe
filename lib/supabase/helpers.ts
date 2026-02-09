/* KYNAR UNIVERSE: Supabase User Utilities (v1.3) */
import { createClient } from './server';
import { redirect } from 'next/navigation';
import type { Database } from '@/lib/supabase/types';
import type { User } from '@supabase/supabase-js';

const supabase = createClient();

/**
 * Fetch the currently authenticated user.
 * Redirects to login page if no user is found.
 */
export async function getUser(): Promise<User> {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect('/auth/login');
  }

  return data.user;
}

/**
 * Fetch the profile row associated with the current user.
 * Returns `null` if no user is authenticated or profile is missing.
 */
export async function getUserProfile(): Promise<Database['public']['Tables']['profiles']['Row'] | null> {
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return profile ?? null;
}