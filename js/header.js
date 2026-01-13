/* KYNAR HEADER ENGINE */

// 1. Force Physics (Kill Blue Bar)
try {
  document.documentElement.style.overscrollBehavior = 'none';
  document.body.style.overscrollBehavior = 'none';
  document.body.style.minHeight = '100vh';
} catch (e) { console.log('Physics Error:', e); }

// 2. Load Icons
if (!document.querySelector('link[href*="remixicon"]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css';
  document.head.appendChild(link);
}

// 3. Inject Header
document.addEventListener('DOMContentLoaded', () => {
  try {
    const path = window.location.pathname;
    let root = './';
    if (path.includes('/pages/')) {
      const parts = path.split('/pages/')[1];
      root = (parts && parts.includes('/')) ? '../../' : '../';
    }

    const header = document.createElement('header');
    header.className = 'glass-header animate-enter';
    
    header.innerHTML = `
      <div class="container header-inner">
        <a href="${root}index.html" class="header-logo" aria-label="Home">
          <img src="${root}assets/logo.svg" alt="Logo" style="height: 24px; width: auto;">
          <span style="font-weight: 600; font-size: 0.95rem;">Kynar Universe</span>
        </a>
        <div class="header-actions">
          <button onclick="toggleSearch()" class="header-btn"><i class="ri-search-2-line"></i></button>
          <button id="theme-toggle" class="header-btn"><i class="ri-moon-line" id="theme-icon"></i></button>
          <a href="${root}pages/account/index.html" class="header-btn"><i class="ri-user-3-line"></i></a>
        </div>
      </div>
    `;

    document.body.insertBefore(header, document.body.firstChild);

    // 4. Attach Events
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.onclick = () => {
        const current = document.documentElement.getAttribute('data-mode') || 'dark';
        const next = (current === 'dark' || current === 'starwalker') ? 'light' : 'dark';
        if (window.setTheme) window.setTheme(next);
        updateIcon();
      };
      updateIcon();
    }
  } catch (err) {
    console.error('Header Injection Failed:', err);
  }
});

function updateIcon() {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    const mode = document.documentElement.getAttribute('data-mode') || 'dark';
    icon.className = (mode === 'light') ? 'ri-moon-line' : 'ri-sun-line';
  }
}
