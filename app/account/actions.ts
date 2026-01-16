'use server';

import { createClient } from '@supabase/supabase-js';

export async function signInWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // UNIVERSAL FIX: Hardcoded URL. 
  // This MUST match your Netlify URL exactly.
  const siteUrl = 'https://kynar-universe-v1.netlify.app';

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
