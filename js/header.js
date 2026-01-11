/* js/header.js */
/* Status: FINAL MASTER (Aligned Controls & Glass Buttons) */

const rootPath = window.location.pathname.includes('/pages/') ? '../../' : '';

// 1. Define the HTML for the Header
const headerHTML = `
  <header class="glass-header animate-enter">
    <div class="container" style="height: 100%; display: flex; align-items: center; justify-content: space-between;">
      
      <a href="${rootPath}index.html" class="header-logo">
        <div class="logo-dot"></div>
        <span style="font-weight: 500; letter-spacing: -0.01em; font-size: 0.95rem;">Kynar Universe</span>
      </a>

      <div class="header-actions">
        
        <button onclick="toggleSearch()" class="header-btn" aria-label="Search">
          <i class="ph ph-magnifying-glass"></i>
        </button>

        <button onclick="toggleTheme()" class="header-btn" aria-label="Toggle Theme">
          <i class="ph ph-moon" id="theme-icon"></i>
        </button>

        <a href="${rootPath}pages/settings/index.html" class="header-btn" aria-label="Account">
          <i class="ph ph-user"></i>
        </a>

      </div>

    </div>
  </header>
`;

// 2. Inject into the DOM
document.body.insertAdjacentHTML('afterbegin', headerHTML);

// 3. Theme Logic (Preserved)
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

function toggleTheme() {
  const current = html.getAttribute('data-mode') || 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-mode', next);
  localStorage.setItem('kynar_theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(mode) {
  // If light mode, show Moon (to switch to dark). If dark, show Sun.
  if (mode === 'light') {
    themeIcon.classList.replace('ph-sun', 'ph-moon');
  } else {
    themeIcon.classList.replace('ph-moon', 'ph-sun');
  }
}

// Initialize Theme on Load
const savedTheme = localStorage.getItem('kynar_theme') || 'dark';
document.documentElement.setAttribute('data-mode', savedTheme);
updateThemeIcon(savedTheme);
