"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // RECOMMENDATION: Encode the actual error message so the user knows exactly what's wrong
    return redirect(`/auth/login?error=${encodeURIComponent(error.message)}`);
  }

  return redirect("/library");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Ensure this env variable is set in your .env or Netlify settings
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    // RECOMMENDATION: Encode the actual error message (e.g., "Password too short")
    return redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`);
  }

  // Success: Send them to login with a friendly instruction
  return redirect("/auth/login?message=Identity created. Please check your email to confirm registration.");
}
