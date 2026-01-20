import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fallback logic to prevent client-side crash, but log warning
const urlToUse = supabaseUrl || 'https://placeholder.supabase.co';
const keyToUse = supabaseKey || 'placeholder';

export const supabase = createClient(urlToUse, keyToUse, {
  auth: {
    persistSession: true, 
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'kynar-auth-session', 
  },
  global: {
    headers: { 'x-application-name': 'kynar-digital-v1' },
  },
  db: {
    schema: 'public',
  },
});
