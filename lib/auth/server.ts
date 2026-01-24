'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const requireAuth = cache(async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return user;
});

export const requireAdmin = cache(async () => {
  const user = await requireAuth();
  const supabase = await createClient();
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
  
  if (!profile?.is_admin) {
    redirect('/');
  }
  
  return { user, profile };
});