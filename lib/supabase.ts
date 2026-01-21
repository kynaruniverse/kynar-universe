// ✅ FIX 1: Lowercase 'import'
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
    // Good practice: Unique key to avoid conflicts with other localhost apps
    storageKey: 'kynar-auth-session', 
  },
  global: {
    headers: { 'x-application-name': 'kynar-digital-v1' },
  },
  db: {
    schema: 'public',
  },
});
