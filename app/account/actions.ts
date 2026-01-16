'use server';

import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

export async function signInWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  
  // Create the client using your environment variables
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // UNIVERSAL FIX: Dynamically grab the current URL (e.g. your new Cloudflare link)
  const origin = headers().get('origin');
  
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // This tells Supabase: "Send them back exactly where they came from"
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
