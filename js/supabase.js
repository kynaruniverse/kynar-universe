/* KYNAR SUPABASE CLIENT (js/supabase.js)
   The Single Source of Truth for Identity.
   Status: FINAL MASTER
*/

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Configuration
const SUPABASE_URL = 'https://wtmshxqojvafphokscze.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0bXNoeHFvanZhZnBob2tzY3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMjAzOTIsImV4cCI6MjA4Mzg5NjM5Mn0.278Q8WU3AZM6OmFLdCpQXB2zvV4fgJfMCB0bsYre1X0';

// Export initialized client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
