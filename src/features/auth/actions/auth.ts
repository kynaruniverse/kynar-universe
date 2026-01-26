'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * verifyAdminAccess
 * Server Action to check if the current session belongs to an admin.
 * Used in protected route layouts and admin-only actions.
 */
export async function verifyAdminAccess(): Promise<{ isAdmin: boolean; userId?: string }> {
  try {
    const supabase = await createClient();
    
    // .getUser() is the only secure way to verify the user on the server
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return { isAdmin: false };
    }
  
    // Check the 'profiles' table for admin status
    const { data: profile, error: dbError } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();
    
    if (dbError) {
      console.error('Database error verifying admin:', dbError.message);
      return { isAdmin: false, userId: user.id };
    }
  
    return { 
      isAdmin: !!profile?.is_admin,
      userId: user.id 
    };
  } catch (error) {
    console.error('Critical auth action failure:', error);
    return { isAdmin: false };
  }
}

/**
 * Note: If you need a standard 'requireAuth' helper as mentioned in 
 * the "Orphaned Exports" report, we can add it here later to 
 * simplify your API routes.
 */
