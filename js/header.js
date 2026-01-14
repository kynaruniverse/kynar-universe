/* KYNAR HEADER ENGINE (js/header.js)
   Status: EVOLVED MASTER (Encapsulated + Active States)
   Description: Injects navigation, handles theme toggling, and highlights current location.
*/

(function() {
  'use strict'; // 1. Strict Mode: Catches silent errors

  /* --- CORE: AUTO-LOADER --- */
  (function loadIcons() {
    if (document.querySelector('link[href*="remixicon"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css';
    document.head.appendChild(link);
  })();

  /* --- INITIALIZATION --- */
  document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
  });

  /* --- MAIN INJECTION LOGIC --- */
  function injectHeader() {
    const rootPath = resolveRootPath();
    const accountPath = `${rootPath}pages/account/index.html`; 
    const homeLink = `${rootPath}index.html`;
    const currentPath = window.location.pathname;

    // 2. Active State Logic: Check where we are
    const isAccountActive = currentPath.includes('/account') ? 'active' : '';

    const header = document.createElement('header');
    header.className = 'glass-header animate-enter';
    
    // 3. Clean HTML (Removed inline onclick="toggleSearch()")
    header.innerHTML = `
      <div class="container header-inner">
        <a href="${homeLink}" class="header-logo" aria-label="Kynar Universe Home">
          <img src="${rootPath}assets/logo.svg" alt="Kynar Logo" style="height: 24px; width: auto;">
          <span style="font-weight: 600; font-size: 0.95rem;">Kynar Universe</span>
        </a>

        <div class="header-actions">
          
          <button id="search-trigger" class="header-btn" aria-label="Search Universe">
            <i class="ri-search-2-line"></i>
          </button>
          
          <button id="theme-toggle" class="header-btn" aria-label="Toggle Atmosphere">
            <i class="ri-moon-line" id="theme-icon"></i>
          </button>

          <a href="${accountPath}" class="header-btn ${isAccountActive}" aria-label="Open Inventory">
            <i class="ri-user-3-line"></i>
          </a>

        </div>
      </div>
    `;

    document.body.insertBefore(header, document.body.firstChild);

    /* --- EVENT LISTENERS (Safe Attachment) --- */
    
    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // Search Toggle (Safe Check)
    const searchBtn = document.getElementById('search-trigger');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        if (typeof window.toggleSearch === 'function') {
          window.toggleSearch();
        } else {
          console.warn('Search Engine (js/search.js) not loaded.');
        }
      });
    }
    
    // Initialize Icon
    updateThemeIcon();
  }

  /* --- HELPER FUNCTIONS --- */

  function updateThemeIcon() {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    const current = document.documentElement.getAttribute('data-mode') || 'dark';
    
    // Simple ternary operator for cleaner logic
    icon.className = (current === 'light') ? 'ri-moon-line' : 'ri-sun-line';
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-mode') || 'dark';
    const next = (current === 'dark') ? 'light' : 'dark';
    
    // Safely call the global theme setter from app.js
    if (window.setTheme) window.setTheme(next); 
    updateThemeIcon();
  }

  function resolveRootPath() {
    const path = window.location.pathname;
    // Robust check for deep nesting
    if (!path.includes('/pages/')) return './'; 
    const parts = path.split('/pages/')[1];
    // If we are in pages/tools/python (2 levels deep), go back twice
    if (parts && parts.includes('/')) return '../../';
    return '../';
  }

})(); 
