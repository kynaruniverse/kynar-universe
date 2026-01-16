'use server';

import { createClient } from '@supabase/supabase-js';

// We create a server-side client to handle the login request safely
export async function signInWithEmail(formData: FormData) {
  const email = formData.get('email') as string;
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // This tells Supabase where to send the user after they click the email link
      emailRedirectTo: 'https://kynar-universe.netlify.app/auth/callback',
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
