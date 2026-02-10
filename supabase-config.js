// supabase-config.js - The Data Backbone
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://fprelxpopaiqbihpzpll.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwcmVseHBvcGFpcWJpaHB6cGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MTQ1NjIsImV4cCI6MjA4NjI5MDU2Mn0.fy23C5HCbWxB38JLkv2CggPIjw7NAmgf73F1nuJdn78';

// Initialize the Kynar Intelligence Database Client
export const kynarDB = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Bridge for non-module legacy scripts
window.kynarDB = kynarDB;

/**
 * Diagnostic Tool: Verify database heartbeat
 */
export const checkConnection = async () => {
    try {
        const { data, error } = await kynarDB.from('artifacts').select('count', { count: 'exact', head: true });
        if (error) throw error;
        console.log("📡 Kynar Intelligence: Connection Optimized.");
        return true;
    } catch (err) {
        console.warn("⚠️ Kynar Intelligence: Sync Latency Detected.", err.message);
        return false;
    }
};

console.log("💎 System Core: Data Backbone Initialized");
