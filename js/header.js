/* KYNAR HEADER ENGINE (js/header.js)
   Status: FINAL MASTER (Clean Version)
*/

// 1. Auto-Load Icons
(function loadIcons() {
  if (document.querySelector('link[href*="remixicon"]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css';
  document.head.appendChild(link);
})();

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
});

function injectHeader() {
  const rootPath = resolveRootPath();
  const accountPath = `${rootPath}pages/account/index.html`; 
  const homeLink = `${rootPath}index.html`;

  const header = document.createElement('header');
  header.className = 'glass-header animate-enter';
  
  header.innerHTML = `
    <div class="container header-inner">
      <a href="${homeLink}" class="header-logo" aria-label="Kynar Universe Home">
        <img src="${rootPath}assets/logo.svg" alt="Kynar Logo" style="height: 24px; width: auto;">
        <span style="font-weight: 600; font-size: 0.95rem;">Kynar Universe</span>
      </a>

      <div class="header-actions">
        <button onclick="toggleSearch()" class="header-btn"><i class="ri-search-2-line"></i></button>
        <button id="theme-toggle" class="header-btn"><i class="ri-moon-line" id="theme-icon"></i></button>
        <a href="${accountPath}" class="header-btn"><i class="ri-user-3-line"></i></a>
      </div>
    </div>
  `;

  document.body.insertBefore(header, document.body.firstChild);
  
  // Initialize Logic
  if (document.getElementById('theme-toggle')) {
    document.getElementById('theme-toggle').onclick = toggleTheme;
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  const current = document.documentElement.getAttribute('data-mode') || 'dark';
  
  if (current === 'light') icon.className = 'ri-moon-line'; 
  else icon.className = 'ri-sun-line';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-mode') || 'dark';
  const next = (current === 'dark') ? 'light' : 'dark';
  if (window.setTheme) window.setTheme(next); 
  updateThemeIcon();
}

function resolveRootPath() {
  const path = window.location.pathname;
  if (!path.includes('/pages/')) return './'; 
  const parts = path.split('/pages/')[1];
  if (parts && parts.includes('/')) return '../../';
  return '../';
}
