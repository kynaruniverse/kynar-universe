/* KYNAR UNIVERSE SEARCH ENGINE (js/search.js)
   Status: EVOLVED MASTER (Pretty URLs + CSP Compliant)
*/

import { KYNAR_DATA } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  injectSearchUI();
  setupKeyboardListeners();
});

/* =========================================
   1. INJECT THE LENS (OVERLAY)
   ========================================= */
function injectSearchUI() {
  if (document.getElementById('search-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  
  overlay.innerHTML = `
    <div class="search-container stack-md animate-enter">
      <div class="flex-between">
        <div class="flex-center" style="gap: 8px;">
          <i class="ri-planet-line" style="color: var(--accent-primary); font-size: 1.25rem;"></i>
          <h2 class="text-h3">Search Universe</h2>
        </div>
        <button id="close-search-btn" class="btn-tertiary">
          <i class="ri-close-line"></i> Close
        </button>
      </div>
      
      <div style="position: relative;">
        <input type="text" id="search-input" class="search-input" placeholder="Find tools, planners, and guides..." autocomplete="off">
        <i class="ri-search-2-line" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); opacity: 0.5;"></i>
      </div>
      
      <div id="search-results" class="search-results-area stack-sm">
        <div class="search-placeholder">
          <i class="ri-eye-2-line"></i>
          <p class="text-body">Explore the Digital Department Store.</p>
          <p class="text-micro">Type to access verified assets.</p>
        </div>
      </div>

      <div style="border-top: 1px solid var(--border-subtle); padding-top: 12px; display: flex; justify-content: space-between; opacity: 0.5;">
        <span class="text-micro">ESC to close • CTRL+K to open</span>
        <span class="text-micro">Kynar Universe</span>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);

  // CSP COMPLIANT LISTENERS
  document.getElementById('close-search-btn')?.addEventListener('click', toggleSearch);
  document.getElementById('search-input')?.addEventListener('input', (e) => handleSearch(e.target.value));
}

/* =========================================
   2. SEARCH ALGORITHM & CACHING
   ========================================= */
const allItems = [
  ...KYNAR_DATA.products.map(item => ({ ...item, type: 'product' })),
  ...KYNAR_DATA.guides.map(item => ({ ...item, type: 'guide' }))
];

function handleSearch(query) {
  const container = document.getElementById('search-results');
  const term = query.toLowerCase().trim();

  if (term.length < 2) {
    if (term.length === 0) resetResults();
    return;
  }

  const matches = allItems.filter(item => 
    item.title.toLowerCase().includes(term) || 
    (item.tag && item.tag.toLowerCase().includes(term)) ||
    item.category.toLowerCase().includes(term)
  );

  if (matches.length === 0) {
    container.innerHTML = `
      <div class="search-placeholder">
        <p class="text-body">Sector Uncharted.</p>
        <p class="text-micro">Try "Automation", "Wellness", or "Planner".</p>
      </div>`;
  } else {
    container.innerHTML = matches.map(item => renderResultCard(item)).join('');
  }
}

function renderResultCard(item) {
  const link = resolvePath(item);
  const isProduct = item.type === 'product';
  const iconClass = isProduct ? (item.previewIcon || 'ri-archive-line') : 'ri-book-open-line';
  const subText = isProduct ? `Verified Tool • ${item.category}` : `Knowledge Record • ${item.readTime}`;
  const badgeText = isProduct ? `£${item.price.toFixed(2)}` : 'Read Guide';

  return `
    <a href="${link}" class="card search-result-card" data-variant="${item.category}">
      <div class="flex-center" style="gap:var(--space-md); text-align: left;">
        <div class="icon-box sm">
          <i class="${iconClass}"></i>
        </div>
        <div style="flex:1;">
          <div class="flex-between">
             <h4 class="text-body bold">${item.title}</h4>
             <span class="text-micro bold" style="color:var(--accent-primary);">${badgeText}</span>
          </div>
          <p class="text-micro muted">${subText}</p>
        </div>
      </div>
    </a>
  `;
}

/* =========================================
   3. VISIBILITY & NAVIGATION
   ========================================= */
export function toggleSearch() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  
  const isActive = overlay.classList.toggle('active');
  document.body.style.overflow = isActive ? 'hidden' : '';
  
  if (isActive) {
    setTimeout(() => document.getElementById('search-input')?.focus(), 100);
  } else {
    document.getElementById('search-input').value = '';
    resetResults();
  }
}
window.toggleSearch = toggleSearch;

function resetResults() {
  const res = document.getElementById('search-results');
  if (res) res.innerHTML = `<div class="search-placeholder"><i class="ri-eye-2-line"></i><p class="text-body">Explore the Digital Department Store.</p></div>`;
}

function resolvePath(item) {
  const path = window.location.pathname;
  let prefix = !path.includes('/pages/') ? 'pages/' : 
               (path.split('/pages/')[1]?.includes('/') ? '../' : '');

  // SUPPORT PRETTY URLS: Using /slug instead of .html?id=
  const folder = item.type === 'product' ? 'product' : 'guide';
  return `${prefix}${folder}/${item.id}`;
}

function setupKeyboardListeners() {
  document.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('search-overlay');
    if (e.key === 'Escape') toggleSearch();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      toggleSearch();
    }
    
    if (overlay?.classList.contains('active')) {
      const results = document.querySelectorAll('.search-result-card');
      const focused = document.activeElement;
      const index = Array.from(results).indexOf(focused);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        results[index < results.length - 1 ? index + 1 : 0].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        results[index > 0 ? index - 1 : results.length - 1].focus();
      } else if (e.key === 'Enter' && e.target.id === 'search-input') {
        results[0]?.click();
      }
    }
  });
}
