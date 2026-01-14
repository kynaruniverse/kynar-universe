/* KYNAR HEADER ENGINE (js/header.js) */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', injectHeader);

  function injectHeader() {
    const rootPath = resolveRootPath();
    const accountPath = `${rootPath}pages/account/index.html`; 
    const homeLink = `${rootPath}index.html`;
    const currentPath = window.location.pathname;

    const isAccountActive = currentPath.includes('/account') ? 'active' : '';

    const header = document.createElement('header');
    header.className = 'glass-header animate-enter';
    
    header.innerHTML = `
      <div class="container header-inner">
        <a href="${homeLink}" class="header-logo" aria-label="Kynar Universe Home">
          <img src="${rootPath}assets/logo.svg" alt="Kynar Logo" style="height: 24px; width: auto;">
          <span class="logo-text">Kynar Universe</span>
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

    // Theme Toggle Handler
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-mode') || 'dark';
      const next = (current === 'dark') ? 'light' : 'dark';
      if (window.setTheme) window.setTheme(next);
      updateThemeIcon(next);
    });

    // Search Toggle Handler
    const searchBtn = document.getElementById('search-trigger');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        if (typeof window.toggleSearch === 'function') window.toggleSearch();
      });
    }
    
    updateThemeIcon(document.documentElement.getAttribute('data-mode') || 'dark');
  }

  function updateThemeIcon(mode) {
    const icon = document.getElementById('theme-icon');
    if (icon) icon.className = (mode === 'light') ? 'ri-moon-line' : 'ri-sun-line';
  }

  function resolveRootPath() {
    const path = window.location.pathname;
    if (!path.includes('/pages/')) return './'; 
    const parts = path.split('/pages/')[1];
    return (parts && parts.includes('/')) ? '../../' : '../';
  }
})();
