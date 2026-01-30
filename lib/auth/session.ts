import { createClient } from '../supabase/server';

export async function getSession() {
  const supabase = createClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    return null;
  }
}

export async function getUser() {
  const session = await getSession();
  return session?.user ?? null;
}
