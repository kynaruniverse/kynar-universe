/* KYNAR HEADER ENGINE (js/header.js)
   Status: SECURE (Verified Session Routing)
*/

import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
});

function injectHeader() {
  const headerMount = document.getElementById('app-header');
  if (!headerMount) return;

  const rootPath = resolveRootPath();
  const homeLink = `${rootPath}index.html`;

  headerMount.innerHTML = `
    <div class="container header-inner">
      <a href="${homeLink}" class="header-logo" aria-label="Kynar Universe Home">
        <img src="${rootPath}assets/logo.svg" alt="Kynar Logo" style="height: 24px; width: auto;">
        <span style="font-weight: 600; font-size: 0.95rem; letter-spacing: -0.01em;">Kynar Universe</span>
      </a>

      <div class="header-actions">
        <button id="btn-search-trigger" class="header-btn" aria-label="Search Universe">
          <i class="ph ph-magnifying-glass"></i>
        </button>
        
        <button id="theme-toggle" class="header-btn" aria-label="Toggle Atmosphere">
          <i class="ph ph-moon" id="theme-icon"></i>
        </button>

        <button id="btn-account-trigger" class="header-btn" aria-label="Open Account">
          <i class="ph ph-user"></i>
        </button>
      </div>
    </div>
  `;

  // Logic Binding
  document.getElementById('theme-toggle').onclick = toggleTheme;
  
  document.getElementById('btn-search-trigger').onclick = () => {
    if (window.toggleSearch) window.toggleSearch();
  };

  // SECURITY UPGRADE: Async Session Check
  const accountBtn = document.getElementById('btn-account-trigger');
  accountBtn.onclick = async () => {
    // Visual feedback while checking
    const originalIcon = accountBtn.innerHTML;
    accountBtn.innerHTML = '<i class="ph ph-spinner" style="animation: spin 1s linear infinite"></i>';
    
    try {
      await handleAccountNavigation(rootPath);
    } finally {
      accountBtn.innerHTML = originalIcon;
    }
  };
  
  updateThemeIcon();
}

/* HELPER: Secure Navigation Logic */
async function handleAccountNavigation(rootPath) {
  // 1. Verify Session with Server (No more localStorage spoofing)
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    window.location.href = `${rootPath}pages/account/index.html`;
  } else {
    window.location.href = `${rootPath}pages/login.html`;
  }
}

/* HELPER: Toggle Atmosphere */
function toggleTheme() {
  if (!window.setTheme) return;
  const current = document.documentElement.getAttribute('data-mode') || 'dark';
  let next = 'dark';

  if (current === 'dark') next = 'light';
  else if (current === 'light') next = 'dark';
  else if (current === 'starwalker') next = 'dark';
  
  window.setTheme(next); 
  updateThemeIcon();
}

/* HELPER: Update Icon State */
function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;

  const current = document.documentElement.getAttribute('data-mode') || 'dark';
  icon.className = 'ph';

  if (current === 'light') icon.classList.add('ph-moon');
  else if (current === 'dark') icon.classList.add('ph-sun');
  else if (current === 'starwalker') {
    icon.classList.add('ph-star-four');
    icon.style.color = 'var(--pal-star-gold)';
  } else {
    icon.classList.add('ph-sun');
  }
}

function resolveRootPath() {
  const path = window.location.pathname;
  if (!path.includes('/pages/')) return './';
  const parts = path.split('/pages/')[1];
  if (parts && parts.includes('/')) return '../../';
  return '../';
}
