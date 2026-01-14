/* KYNAR HEADER ENGINE (js/header.js)
   Injects the Glass Navigation Bar and handles Atmosphere Toggling.
   Status: FINAL MASTER (Smart Auth Routing)
*/

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
});

function injectHeader() {
  // 0. Locate the Mount Point (Defined in index.html)
  const headerMount = document.getElementById('app-header');
  if (!headerMount) {
    console.error('[Universe] Header mount point missing.');
    return;
  }

  // 1. Resolve Paths (Smart Navigation)
  const rootPath = resolveRootPath();
  const homeLink = `${rootPath}index.html`;

  // 2. The Clean HTML
  // We inject directly into the existing <header> tag
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

  // 3. Attach Logic
  
  // Theme Toggle
  document.getElementById('theme-toggle').onclick = toggleTheme;
  
  // Search Trigger
  const searchBtn = document.getElementById('btn-search-trigger');
  searchBtn.onclick = () => {
    if (window.toggleSearch) {
      window.toggleSearch();
    } else {
      console.warn('[Universe] Search module not ready.');
    }
  };

  // Account Trigger (Smart Auth Check)
  const accountBtn = document.getElementById('btn-account-trigger');
  accountBtn.onclick = () => {
    handleAccountNavigation(rootPath);
  };
  
  // 4. Initialize State
  updateThemeIcon();
}

/* HELPER: Smart Account Navigation 
   Checks if user is logged in before deciding destination.
*/
function handleAccountNavigation(rootPath) {
  // Check for session marker (set by auth.js)
  // In a full production app, you might check supabase.auth.getSession() here too
  const isLoggedIn = localStorage.getItem('kynar_session');

  if (isLoggedIn) {
    window.location.href = `${rootPath}pages/account/index.html`;
  } else {
    window.location.href = `${rootPath}pages/login.html`;
  }
}

/* HELPER: Toggle Atmosphere
   Cycles: Light <-> Dark.
   If user is in "Starwalker" (Secret) mode, clicking this returns them to reality (Dark).
*/
function toggleTheme() {
  // Check if window.setTheme exists (from app.js)
  if (!window.setTheme) return;

  const current = document.documentElement.getAttribute('data-mode') || 'dark';
  let next = 'dark';

  if (current === 'dark') {
    next = 'light';
  } else if (current === 'light') {
    next = 'dark';
  } else if (current === 'starwalker') {
    // If in Secret Mode, exit back to standard Dark Mode
    next = 'dark';
  }
  
  window.setTheme(next); 
  updateThemeIcon();
}

/* HELPER: Update Icon State
   Handles Sun, Moon, and the Secret Starwalker Icon.
*/
function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;

  const current = document.documentElement.getAttribute('data-mode') || 'dark';
  
  // Reset base class
  icon.className = 'ph';

  if (current === 'light') {
    icon.classList.add('ph-moon'); // Show Moon (to switch to Dark)
  } else if (current === 'dark') {
    icon.classList.add('ph-sun');  // Show Sun (to switch to Light)
  } else if (current === 'starwalker') {
    icon.classList.add('ph-star-four'); // Show Star (Secret State)
    icon.style.color = 'var(--pal-star-gold)'; // Gold Tint
  } else {
    // Fallback for Auto
    icon.classList.add('ph-sun');
  }
}

/* HELPER: Smart Path Resolution
   Handles root (./), deep pages (../../), and shallow pages (../)
*/
function resolveRootPath() {
  const path = window.location.pathname;
  
  // 1. Root (index.html)
  if (!path.includes('/pages/')) {
    return './'; 
  }
  
  // 2. Deep Category (pages/tools/index.html)
  const parts = path.split('/pages/')[1];
  if (parts && parts.includes('/')) {
    return '../../';
  }
  
  // 3. Shallow Page (pages/legal.html)
  return '../';
}
