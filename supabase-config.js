// supabase-config.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://fprelxpopaiqbihpzpll.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwcmVseHBvcGFpcWJpaHB6cGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MTQ1NjIsImV4cCI6MjA4NjI5MDU2Mn0.fy23C5HCbWxB38JLkv2CggPIjw7NAmgf73F1nuJdn78';

// Attach to window so marketplace.js and artifact.js can use it
window.kynarDB = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Kynar Intelligence System: Connected");
