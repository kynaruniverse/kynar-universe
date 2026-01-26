'use server';

import { createClient } from '@/lib/supabase/server';

export async function getUserPurchases(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('purchases')
    .select(`id, purchase_date, product:products(*)`)
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('purchase_date', { ascending: false });
  
  return data || [];
}