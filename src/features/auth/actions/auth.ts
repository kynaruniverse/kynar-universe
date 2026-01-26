'use server';

import { createClient } from '@/lib/supabase/server';

export async function verifyAdminAccess(): Promise<{ isAdmin: boolean; userId?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { isAdmin: false };
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
  
  return { 
    isAdmin: profile?.is_admin || false,
    userId: user.id 
  };
}