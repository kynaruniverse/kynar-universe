'use server';

import { createClient } from '@supabase/supabase-js';

export async function signInWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // FIX: Using your dynamic Vercel URL
  // We will default to the Vercel URL you just created.
  // REPLACE 'kynar-universe.vercel.app' WITH YOUR EXACT VERCEL DOMAIN IF DIFFERENT
  const siteUrl = 'https://kynar-universe.vercel.app'; 

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
