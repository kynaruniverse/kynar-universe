/* KYNAR AUTH ENGINE (js/pages/auth.js)
   Status: FINAL MASTER (Supabase ESM Integration)
*/

// 1. IMPORT SUPABASE (No Build Tools Required)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 2. CONFIGURATION
const SUPABASE_URL = 'https://wtmshxqojvafphokscze.supabase.co';

// ⚠️ IMPORTANT: Paste your FULL 'anon' public key below (it starts with eyJ...)
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0bXNoeHFvanZhZnBob2tzY3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMjAzOTIsImV4cCI6MjA4Mzg5NjM5Mn0.278Q8WU3AZM6OmFLdCpQXB2zvV4fgJfMCB0bsYre1X0';

// Initialize Client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// State
let isLoginMode = true;

document.addEventListener('DOMContentLoaded', () => {
  initAuthUI();
});

function initAuthUI() {
  const form = document.getElementById('auth-form');
  const toggleBtn = document.getElementById('toggle-mode-btn');

  // Toggle Logic (Login <-> Sign Up)
  toggleBtn?.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    updateUIText();
  });

  // Submit Logic
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleAuth();
  });
}

function updateUIText() {
  const title = document.getElementById('form-title');
  const desc = document.getElementById('form-desc');
  const btn = document.getElementById('submit-btn');
  const toggle = document.getElementById('toggle-mode-btn');

  if (isLoginMode) {
    title.innerText = 'Access Inventory';
    desc.innerText = 'Unlock your verified digital upgrades.';
    btn.innerHTML = 'Open Vault <i class="ph ph-arrow-right"></i>';
    toggle.innerHTML = 'Need an identity? <span style="color:var(--text-main); font-weight:600;">Initialize</span>';
  } else {
    title.innerText = 'Create Identity';
    desc.innerText = 'Begin your journey in the Kynar Universe.';
    btn.innerHTML = 'Initialize Account <i class="ph ph-user-plus"></i>';
    toggle.innerHTML = 'Have an account? <span style="color:var(--text-main); font-weight:600;">Access Vault</span>';
  }
}

async function handleAuth() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const btn = document.getElementById('submit-btn');
  
  // 1. Loading State
  const originalBtnText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="ph ph-spinner" style="animation: spin 1s linear infinite"></i> Processing...';

  try {
    let result;
    
    // 2. Execute Supabase Request
    if (isLoginMode) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    const { data, error } = result;

    if (error) throw error;

    // 3. Success Handling
    if (isLoginMode) {
      // LOGIN SUCCESS
      if (window.showToast) window.showToast('Access Granted.', 'success');
      
      // Save basic session marker for UI checks (security is handled by Supabase)
      localStorage.setItem('kynar_session', 'true');
      
      setTimeout(() => {
        window.location.href = '../account/index.html';
      }, 1000);

    } else {
      // SIGNUP SUCCESS
      if (window.showToast) window.showToast('Identity Created.', 'success');
      
      localStorage.setItem('kynar_session', 'true');
      
      setTimeout(() => {
        // New users go to Onboarding Protocol
        window.location.href = '../onboarding/index.html';
      }, 1000);
    }

  } catch (error) {
    // 4. Error Handling
    console.error('Auth Error:', error);
    if (window.showToast) {
      window.showToast(error.message, 'error');
    } else {
      alert(error.message);
    }
    
    // Reset Button
    btn.disabled = false;
    btn.innerHTML = originalBtnText;
  }
}
