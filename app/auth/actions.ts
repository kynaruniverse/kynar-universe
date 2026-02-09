/**
 * KYNAR UNIVERSE: Unified Auth Actions (v1.2.2)
 * Refactor: Streamlined login, signup, and logout with clean redirects
 */

"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Sign in user with email & password
 */
export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) {
    return redirect(`?error=${encodeURIComponent(error.message)}`);
  }
  
  return redirect("/library");
}

/**
 * Register a new user identity
 */
export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });
  
  if (error) {
    return redirect(`?error=${encodeURIComponent(error.message)}`);
  }
  
  return redirect(
    `?message=${encodeURIComponent("Check your email to confirm registration.")}`
  );
}

/**
 * Log out the current session
 */
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
}