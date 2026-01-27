'use server'

import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin' // Fixed import path
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { ActionResult } from '@/lib/types'

/**
 * requireAdmin
 * The "Bouncer" for server-side routes and actions.
 * Points to the 'profiles' table as per your verifyAdminAccess logic.
 */
export async function requireAdmin() {
  const { isAdmin, user } = await verifyAdminAccess()

  if (!user) {
    redirect('/login')
  }

  if (!isAdmin) {
    redirect('/store')
  }

  return user
}

/**
 * verifyAdminAccess
 * Checks if the current session belongs to an administrator.
 */
export async function verifyAdminAccess(): Promise<{ isAdmin: boolean; user?: any }> {
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
      return { isAdmin: false, user }
    }
  
    return { 
      isAdmin: !!profile?.is_admin,
      user 
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

    // Using the correctly imported supabaseAdmin from @/lib/supabase/admin
    const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)

    if (error) return { success: false, error: error.message }

    return { success: true, data: undefined }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
