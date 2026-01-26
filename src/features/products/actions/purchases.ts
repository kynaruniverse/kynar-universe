'use server'

import { createClient } from '@/lib/supabase/server'

/**
 * getUserPurchases
 * Fetches completed purchases for a specific user.
 * Joins with products table to get full metadata.
 */
export async function getUserPurchases(userId: string) {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('purchases')
      .select(`
        id, 
        purchase_date, 
        product:products(*)
      `)
      .eq('user_id', userId)
      .eq('status', 'completed')
      .order('purchase_date', { ascending: false })
    
    if (error) {
      console.error('Error fetching purchases:', error.message)
      return []
    }
    
    return data || []
  } catch (err) {
    console.error('Critical failure in getUserPurchases:', err)
    return []
  }
}
