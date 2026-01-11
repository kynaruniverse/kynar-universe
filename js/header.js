/* KYNAR HEADER ENGINE (js/header.js)
   Injects the Glass Navigation Bar and handles Theme Toggling.
   Status: FINAL MASTER (Aligned with Path Logic & Color Bible)
*/

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
});

function injectHeader() {
  // 1. Resolve Paths (Where are we?)
  const rootPath = resolveRootPath();
  const accountPath = `${rootPath}pages/settings/index.html`;
  const homeLink = `${rootPath}index.html`;

  // 2. Create the Header Element
  const header = document.createElement('header');
  header.className = 'glass-header animate-enter';
  // Ensure High Z-Index so it sits above content
  header.style.zIndex = 'var(--z-header)'; 
  
  header.innerHTML = `
    <div class="container" style="height: 100%; display: flex; justify-content: space-between; align-items: center;">
      
      <a href="${homeLink}" class="header-logo">
        <span class="logo-dot"></span>
        <span class="text-h3" style="font-size: 1rem; font-weight: 600; letter-spacing: -0.02em;">Kynar Universe</span>
      </a>

      <div class="header-actions" id="header-actions-container">
        
        <button id="theme-toggle" class="btn-tertiary" style="padding: 8px;" aria-label="Toggle Dark Mode">
          <i class="ph ph-moon" style="font-size: 1.25rem;"></i>
        </button>

        <a href="${accountPath}" class="btn-tertiary" style="padding: 8px;" aria-label="Account">
          <i class="ph ph-user" style="font-size: 1.25rem;"></i>
        </a>

      </div>

    </div>
  `;

  // 3. Inject at the top of Body
  document.body.insertBefore(header, document.body.firstChild);

  // 4. Attach Theme Toggle Logic
  document.getElementById('theme-toggle').onclick = toggleTheme;
}

/* HELPER: Toggle Theme
   Cycles: Light -> Dark -> Auto
   Interacts with window.setTheme defined in app.js
*/
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-mode') || 'light';
  
  if (current === 'light') {
    window.setTheme('dark');
  } else if (current === 'dark') {
    // Hidden Secret: 1% chance to hit Starwalker mode from Dark
    // Otherwise go back to Light (or Auto)
    window.setTheme('light');
  }
  
  // Update Icon
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.getElementById('theme-toggle');
  const current = document.documentElement.getAttribute('data-mode') || 'light';
  const icon = btn.querySelector('i');
  
  if (current === 'dark') {
    icon.classList.replace('ph-moon', 'ph-sun');
  } else {
    icon.classList.replace('ph-sun', 'ph-moon');
  }
}

/* HELPER: Resolve Path Depth
   Determines if we need "../" or "../../" prefixes.
*/
function resolveRootPath() {
  const path = window.location.pathname;
  
  // Case 1: Root (index.html)
  if (!path.includes('/pages/')) {
    return './'; 
  }
  
  // Case 2: Deep Category (pages/tools/index.html)
  // Logic: Split by 'pages', then count slashes in the remainder
  const parts = path.split('/pages/')[1];
  if (parts.includes('/')) {
    return '../../';
  }
  
  // Case 3: Shallow Page (pages/product.html)
  return '../';
}
