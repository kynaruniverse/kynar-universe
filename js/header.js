/* KYNAR HEADER ENGINE (js/header.js)
   Injects the Glass Navigation Bar and handles Atmosphere Toggling.
   Status: FINAL MASTER (Aligned with "Inventory" & "Starwalker" Logic)
*/

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
});

function injectHeader() {
  // 1. Resolve Paths (Smart Navigation)
  const rootPath = resolveRootPath();
  const accountPath = `${rootPath}pages/account/index.html`; // Points to "The Inventory"
  const homeLink = `${rootPath}index.html`;

  // 2. Create the Header Element
  const header = document.createElement('header');
  header.className = 'glass-header animate-enter';
  
  // 3. The Clean HTML
  // Uses .header-inner for layout and .header-btn for the 44px tactile targets
  header.innerHTML = `
    <div class="container header-inner">
      
      <a href="${homeLink}" class="header-logo" aria-label="Kynar Universe Home">
        <img src="${rootPath}assets/logo.png" alt="Kynar Logo" style="height: 24px; width: auto;">
        <span style="font-weight: 600; font-size: 0.95rem; letter-spacing: -0.01em;">Kynar Universe</span>
      </a>

      <div class="header-actions">
        
        <button onclick="toggleSearch()" class="header-btn" aria-label="Search Universe">
          <i class="ph ph-magnifying-glass"></i>
        </button>
        
        <button id="theme-toggle" class="header-btn" aria-label="Toggle Atmosphere">
          <i class="ph ph-moon" id="theme-icon"></i>
        </button>

        <a href="${accountPath}" class="header-btn" aria-label="Open Inventory">
          <i class="ph ph-user"></i>
        </a>

      </div>

    </div>
  `;

  // 4. Inject at the top of the body
  document.body.insertBefore(header, document.body.firstChild);

  // 5. Attach Logic
  document.getElementById('theme-toggle').onclick = toggleTheme;
  
  // 6. Initialize State
  updateThemeIcon();
}

/* HELPER: Toggle Atmosphere
   Cycles: Light <-> Dark.
   If user is in "Starwalker" (Secret) mode, clicking this returns them to reality (Dark).
*/
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
