'use server';

import { createClient } from '../../lib/supabase-server';
import { revalidatePath } from 'next/cache';

// 1. SIGN UP LOGIC
export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  // ✅ VALIDATION MUST BE INSIDE THE FUNCTION
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters long.' };
  }
  
  const supabase = createClient();
  
  // Redirect users back to the production domain after verification
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    (process.env.VERCEL_URL ?
      `https://${process.env.VERCEL_URL}` :
      'http://localhost:3000');
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,
    },
  });
  
  if (error) {
    return { error: error.message };
  }
  
  revalidatePath('/', 'layout');
  return {
    success: 'Verification email sent. Please check your inbox to verify your account.',
  };
}

// 2. LOG IN LOGIC
export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  const supabase = createClient();
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    return { error: 'Login failed. Please check your credentials and try again.' };
  }
  
  // Refresh the site layout to update the user navigation
  revalidatePath('/', 'layout');
  
  return { success: true };
}