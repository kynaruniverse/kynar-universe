/* KYNAR UNIVERSE SEARCH ENGINE (js/search.js)
   Status: EVOLVED MASTER (Debounced + Full Keyboard Navigation)
*/

import { KYNAR_DATA } from './data.js';

// 1. INDEXING
const SEARCH_INDEX = [
  ...KYNAR_DATA.products.map(p => ({ ...p, type: 'product', searchable: `${p.title} ${p.shortDesc} ${p.keywords?.join(' ') || ''}` })),
  ...KYNAR_DATA.guides.map(g => ({ ...g, type: 'guide', searchable: `${g.title} ${g.shortDesc}` }))
];

let searchDebounceTimer;
let activeResultIndex = -1;

document.addEventListener('DOMContentLoaded', () => {
  injectSearchUI();
  attachListeners();
});

function injectSearchUI() {
  if (document.getElementById('search-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  
  overlay.innerHTML = `
    <div class="search-container stack-md animate-enter">
      <header class="search-header">
        <div class="flex-center gap-sm">
          <i class="ri-planet-line accent-text"></i>
          <h2 class="text-h3">Search Universe</h2>
        </div>
        <button id="close-search" class="btn-tertiary sm">
          <i class="ri-close-line"></i>
        </button>
      </header>
      
      <div class="search-input-wrapper">
        <input type="text" id="search-input" class="search-input" placeholder="Search blueprints, tools, or guides..." autocomplete="off">
        <div class="search-spinner" id="search-spinner"></div>
      </div>
      
      <div id="search-results" class="search-results-area custom-scrollbar">
        <div class="search-placeholder">
          <i class="ri-search-eye-line"></i>
          <p class="text-body">Awaiting Input...</p>
        </div>
      </div>

      <footer class="search-footer flex-between">
        <div class="flex-center gap-sm">
          <kbd>ESC</kbd> <span class="text-micro">Close</span>
          <kbd>↑↓</kbd> <span class="text-micro">Navigate</span>
          <kbd>↵</kbd> <span class="text-micro">Select</span>
        </div>
        <span class="text-micro muted">Kynar_OS v2.1</span>
      </footer>
    </div>
  `;
  
  document.body.appendChild(overlay);
}

/**
 * 2. CORE SEARCH LOGIC (Debounced)
 */
function handleSearch(query) {
  const container = document.getElementById('search-results');
  const term = query.toLowerCase().trim();
  activeResultIndex = -1;

  if (term.length < 2) {
    container.innerHTML = `<div class="search-placeholder"><i class="ri-search-eye-line"></i><p class="text-body">Keep typing...</p></div>`;
    return;
  }

  const matches = SEARCH_INDEX.filter(item => item.searchable.toLowerCase().includes(term));

  if (matches.length === 0) {
    container.innerHTML = `
      <div class="search-placeholder">
        <p class="text-body">Sector Uncharted</p>
        <p class="text-micro muted">Try searching for "Python" or "Planner"</p>
      </div>`;
  } else {
    container.innerHTML = matches.map((item, idx) => renderResult(item, term, idx)).join('');
  }
}

function renderResult(item, term, index) {
  const path = resolvePath(item);
  const icon = item.type === 'guide' ? 'ri-book-open-line' : 'ri-box-3-line';
  const price = item.type === 'product' ? `£${item.price.toFixed(2)}` : 'Guide';
  
  // Highlighting
  const regex = new RegExp(`(${term})`, 'gi');
  const highlightedTitle = item.title.replace(regex, '<mark>$1</mark>');

  return `
    <a href="${path}" class="search-item card" data-index="${index}">
      <div class="search-item-inner">
        <div class="icon-box sm"><i class="${icon}"></i></div>
        <div class="search-item-content">
          <div class="flex-between">
            <h4 class="text-body bold">${highlightedTitle}</h4>
            <span class="text-micro accent-text">${price}</span>
          </div>
          <span class="text-micro muted">${item.category}</span>
        </div>
      </div>
    </a>
  `;
}

/**
 * 3. LISTENERS & ACCESSIBILITY
 */
function attachListeners() {
  const input = document.getElementById('search-input');
  const overlay = document.getElementById('search-overlay');

  // Input with Debounce
  input.oninput = (e) => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => handleSearch(e.target.value), 250);
  };

  // Close Events
  document.getElementById('close-search').onclick = closeSearch;
  overlay.onclick = (e) => { if (e.target === overlay) closeSearch(); };

  // Global Shortcuts & Navigation
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }

    if (!overlay.classList.contains('active')) return;

    if (e.key === 'Escape') closeSearch();
    
    // Keyboard Navigation Logic
    const results = document.querySelectorAll('.search-item');
    if (results.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeResultIndex = Math.min(activeResultIndex + 1, results.length - 1);
        updateActiveResult(results);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeResultIndex = Math.max(activeResultIndex - 1, 0);
        updateActiveResult(results);
      } else if (e.key === 'Enter' && activeResultIndex > -1) {
        e.preventDefault();
        results[activeResultIndex].click();
      }
    }
  });
}

function updateActiveResult(results) {
  results.forEach(el => el.classList.remove('is-active'));
  if (activeResultIndex > -1) {
    const activeEl = results[activeResultIndex];
    activeEl.classList.add('is-active');
    activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

/* --- STATE MANAGEMENT --- */

export function openSearch() {
  const overlay = document.getElementById('search-overlay');
  overlay.classList.add('active');
  document.body.classList.add('no-scroll');
  setTimeout(() => document.getElementById('search-input').focus(), 100);
}

export function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  overlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

window.toggleSearch = () => {
  const overlay = document.getElementById('search-overlay');
  overlay.classList.contains('active') ? closeSearch() : openSearch();
};

function resolvePath(item) {
  const isInternal = window.location.pathname.includes('/pages/');
  const prefix = isInternal ? (window.location.pathname.split('/pages/')[1].includes('/') ? '../../' : '../') : 'pages/';
  return `${prefix}${item.type}.html?${item.type === 'product' ? 'id' : 'guide'}=${item.id}`;
}
