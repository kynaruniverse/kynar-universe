/* KYNAR AUTH ENGINE (js/pages/auth.js)
   Status: SECURE (Centralized Client)
*/

import { supabase } from '../supabase.js';

let isLoginMode = true;

document.addEventListener('DOMContentLoaded', () => {
  initAuthUI();
});

function initAuthUI() {
  const form = document.getElementById('auth-form');
  const toggleBtn = document.getElementById('toggle-mode-btn');

  toggleBtn?.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    updateUIText();
  });

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
  
  const originalBtnText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="ph ph-spinner" style="animation: spin 1s linear infinite"></i> Processing...';

  try {
    let result;
    if (isLoginMode) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    const { data, error } = result;
    if (error) throw error;

    if (isLoginMode) {
      if (window.showToast) window.showToast('Access Granted.', 'success');
      // No manual localStorage setting needed; Supabase handles the session
      setTimeout(() => {
        window.location.href = '../account/index.html';
      }, 1000);
    } else {
      if (window.showToast) window.showToast('Identity Created.', 'success');
      setTimeout(() => {
        window.location.href = '../onboarding/index.html';
      }, 1000);
    }

  } catch (error) {
    console.error('Auth Error:', error);
    if (window.showToast) {
      window.showToast(error.message, 'error');
    } else {
      alert(error.message);
    }
    btn.disabled = false;
    btn.innerHTML = originalBtnText;
  }
}
