'use server'

import { createClient } from '@/lib/supabase/server'
import { getAdminClient } from '@/lib/supabase-admin' // Standardized import
import { revalidatePath } from 'next/cache'
import type { ActionResult } from '@/lib/types'

export async function verifyAdminAccess(): Promise<{ isAdmin: boolean; userId?: string }> {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) return { isAdmin: false }
  
    const { data: profile, error: dbError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()
    
    if (dbError) {
      console.error('Database error verifying admin:', dbError.message)
      return { isAdmin: false, userId: user.id }
    }
  
    return { 
      isAdmin: !!profile?.is_admin,
      userId: user.id 
    }
  } catch (error) {
    console.error('Critical auth action failure:', error)
    return { isAdmin: false }
  }
}

export async function signOut(): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) return { success: false, error: error.message }

    revalidatePath('/', 'layout')
    return { success: true, data: undefined }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function deleteAccount(): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { success: false, error: 'Not authenticated' }

    // Using the standardized Admin Client for high-privilege deletion
    const admin = getAdminClient()
    const { error } = await admin.auth.admin.deleteUser(user.id)

    if (error) return { success: false, error: error.message }

    return { success: true, data: undefined }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
