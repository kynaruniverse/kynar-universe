/* KYNAR HEADER ENGINE (js/header.js)
   Injects the Glass Navigation Bar and handles Atmosphere Toggling.
   Status: FINAL MASTER (REMIX ICON ENGINE)
*/

/* KYNAR AUTO-LOADER
   Injects the REMIX ICON library automatically.
   No JS execution required for icons to appear.
*/
(function loadIcons() {
  // Check if Remix is already loaded to prevent duplicates
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
  // 1. Resolve Paths (Smart Navigation)
  const rootPath = resolveRootPath();
  const accountPath = `${rootPath}pages/account/index.html`; 
  const homeLink = `${rootPath}index.html`;

  // 2. Create the Header Element
  const header = document.createElement('header');
  header.className = 'glass-header animate-enter';
  
  // 3. The Clean HTML (REMIX ICONS)
  header.innerHTML = `
    <div class="container header-inner">
      
      <a href="${homeLink}" class="header-logo" aria-label="Kynar Universe Home">
        <img src="${rootPath}assets/logo.svg" alt="Kynar Logo" style="height: 24px; width: auto;">
        <span style="font-weight: 600; font-size: 0.95rem; letter-spacing: -0.01em;">Kynar Universe</span>
      </a>

      <div class="header-actions">
        
        <button onclick="toggleSearch()" class="header-btn" aria-label="Search Universe">
          <i class="ri-search-2-line"></i>
        </button>
        
        <button id="theme-toggle" class="header-btn" aria-label="Toggle Atmosphere">
          <i class="ri-moon-line" id="theme-icon"></i>
        </button>

        <a href="${accountPath}" class="header-btn" aria-label="Open Inventory">
          <i class="ri-user-3-line"></i>
        </a>

      </div>

    </div>
  `;

  // 4. Inject
  document.body.insertBefore(header, document.body.firstChild);

  // 5. Attach Logic
  document.getElementById('theme-toggle').onclick = toggleTheme;
  
  // 6. Initialize Icon State
  updateThemeIcon();
}

/* HELPER: Update Icon State (REMIX VERSION) */
function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;

  const current = document.documentElement.getAttribute('data-mode') || 'dark';
  
  // Reset base class
  icon.className = ''; 

  if (current === 'light') {
    icon.className = 'ri-moon-line'; // Moon (Click to go Dark)
  } else if (current === 'dark') {
    icon.className = 'ri-sun-line';  // Sun (Click to go Light)
  } else if (current === 'starwalker') {
    icon.className = 'ri-shining-2-line'; // The "Starwalker" Star
  } else {
    icon.className = 'ri-sun-line';
  }
}

/* HELPER: Toggle Atmosphere */
function toggleTheme() {
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
  
  window.setTheme(next); // Uses the main app.js engine
  updateThemeIcon();
}

/* HELPER: Smart Path Resolution */
function resolveRootPath() {
  const path = window.location.pathname;
  
  // 1. Root
  if (!path.includes('/pages/')) {
    return './'; 
  }
  
  // 2. Deep Category
  const parts = path.split('/pages/')[1];
  if (parts && parts.includes('/')) {
    return '../../';
  }
  
  // 3. Shallow Page
  return '../';
}
