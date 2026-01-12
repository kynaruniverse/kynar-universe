/* KYNAR UNIVERSE SEARCH ENGINE (js/search.js)
   "The Lens."
   Allows instant querying of the centralized Inventory and Knowledge Library.
   Status: FINAL MASTER (Aligned with Header & Data Engine)
*/

import { KYNAR_DATA } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  injectSearchOverlay();
});

/* =========================================
   1. INJECT THE LENS (OVERLAY)
   ========================================= */
function injectSearchOverlay() {
  // Check if exists to prevent duplicates
  if (document.getElementById('search-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  
  // ALIGNMENT: "Grand Vision" Copy
  overlay.innerHTML = `
    <div class="search-container stack-md animate-enter">
      
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap: 8px;">
          <i class="ph ph-planet" style="color: var(--accent-primary);"></i>
          <h2 class="text-h3" style="margin:0;">Search Universe</h2>
        </div>
        <button class="btn-tertiary" onclick="toggleSearch()">
          <i class="ph ph-x"></i> Close
        </button>
      </div>
      
      <div style="position: relative;">
        <input type="text" id="search-input" class="search-input" placeholder="Find scripts, planners, and guides..." autocomplete="off">
        <i class="ph ph-magnifying-glass" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); opacity: 0.5;"></i>
      </div>
      
      <div id="search-results" class="search-results stack-sm" style="max-height: 60vh; overflow-y: auto; padding-right: 4px;">
        
        <div style="text-align:center; opacity:0.6; padding: 3rem 1rem;">
          <i class="ph ph-telescope" style="font-size: 2rem; margin-bottom: 12px; opacity: 0.5;"></i>
          <p class="text-body">Explore the Digital Department Store.</p>
          <p class="text-micro">Type to access verified tools and knowledge.</p>
        </div>

      </div>

      <div style="border-top: 1px solid var(--border-subtle); padding-top: 12px; display: flex; justify-content: space-between; opacity: 0.5;">
        <span class="text-micro">Press ESC to close</span>
        <span class="text-micro">Kynar Universe</span>
      </div>

    </div>
  `;
  
  document.body.appendChild(overlay);

  // LISTENERS
  const input = document.getElementById('search-input');
  input.addEventListener('input', (e) => handleSearch(e.target.value));
  
  // Keyboard Support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
    // Shortcut: Ctrl+K or Cmd+K to open
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });
}

/* =========================================
   2. VISIBILITY LOGIC
   Exposed globally so header.js can call it.
   ========================================= */
function toggleSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay.classList.contains('active')) {
    closeSearch();
  } else {
    openSearch();
  }
}
window.toggleSearch = toggleSearch; // Global Exposure

function openSearch() {
  const overlay = document.getElementById('search-overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Lock scroll
  
  // Focus input for "Instant Access"
  setTimeout(() => document.getElementById('search-input').focus(), 100);
}

function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = ''; // Unlock scroll
  
  // Optional: Clear input on close
  setTimeout(() => {
    document.getElementById('search-input').value = '';
    resetResults();
  }, 300);
}

function resetResults() {
  document.getElementById('search-results').innerHTML = `
    <div style="text-align:center; opacity:0.6; padding: 3rem 1rem;">
      <i class="ph ph-telescope" style="font-size: 2rem; margin-bottom: 12px; opacity: 0.5;"></i>
      <p class="text-body">Explore the Digital Department Store.</p>
    </div>`;
}

/* =========================================
   3. SEARCH ALGORITHM
   Flattens the "Centralized Hub" (Data) and filters it.
   ========================================= */
function handleSearch(query) {
  const resultsContainer = document.getElementById('search-results');
  const term = query.toLowerCase().trim();

  if (term.length < 2) {
    if (term.length === 0) resetResults();
    return;
  }

  // Combine Assets (Products) and Knowledge (Guides)
  const allItems = [
    ...KYNAR_DATA.products.map(item => ({ ...item, type: 'product' })),
    ...KYNAR_DATA.guides.map(item => ({ ...item, type: 'guide' }))
  ];

  // Filter Logic
  const matches = allItems.filter(item => {
    return (
      item.title.toLowerCase().includes(term) || 
      (item.tag && item.tag.toLowerCase().includes(term)) ||
      (item.subCategory && item.subCategory.toLowerCase().includes(term)) ||
      item.category.toLowerCase().includes(term)
    );
  });

  // Render Logic
  if (matches.length === 0) {
    resultsContainer.innerHTML = `
      <div style="text-align:center; opacity:0.5; padding: 2rem;">
        <p class="text-body">Sector Uncharted.</p>
        <p class="text-micro" style="margin-top:8px;">Try "Automation", "Wellness", or "Planner".</p>
      </div>`;
  } else {
    resultsContainer.innerHTML = matches.map(item => renderResultCard(item)).join('');
  }
}

/* =========================================
   4. RENDERER
   Displays results as "Verified Assets"
   ========================================= */
function renderResultCard(item) {
  const link = resolvePath(item);
  
  let iconClass = 'ph-cube';
  let subText = '';
  let badge = '';

  if (item.type === 'product') {
    iconClass = item.previewIcon || 'ph-package';
    subText = `Verified Tool • ${capitalize(item.category)}`;
    badge = `<span style="font-weight: 600; color: var(--accent-primary);">£${item.price.toFixed(2)}</span>`;
  } else {
    iconClass = 'ph-book-open';
    subText = `Knowledge Record • ${item.readTime}`;
    badge = `<span style="font-size: 0.8rem; opacity: 0.7;">Read Guide</span>`;
  }

  return `
    <a href="${link}" class="card search-result-card animate-enter" onclick="closeSearch()">
      <div style="display:flex; align-items:center; gap:var(--space-md);">
        
        <div style="width:40px; height:40px; border-radius:50%; background:var(--bg-page); display:flex; align-items:center; justify-content:center; flex-shrink: 0; border: 1px solid var(--border-subtle);">
          <i class="ph ${iconClass}" style="font-size:1.25rem; color:var(--text-main); opacity: 0.8;"></i>
        </div>
        
        <div class="stack-xs" style="flex:1;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
             <h4 class="text-body" style="font-weight:600; font-size:0.95rem; margin:0;">${item.title}</h4>
             ${badge}
          </div>
          
          <div style="display:flex; justify-content:space-between; font-size: 0.8rem; opacity: 0.6; margin-top: 2px;">
            <span>${subText}</span>
          </div>
        </div>

      </div>
    </a>
  `;
}

/* =========================================
   5. UTILITIES
   Smart Path Resolution (Matches Header Logic)
   ========================================= */
function resolvePath(item) {
  const path = window.location.pathname;
  let prefix = '';

  // Logic: Are we deep in a category?
  if (!path.includes('/pages/')) {
    prefix = 'pages/'; // We are at Root
  } else {
    const parts = path.split('/pages/')[1];
    if (parts && parts.includes('/')) {
      prefix = '../'; // We are deep (e.g. tools/index.html) -> Go up
    } else {
      prefix = ''; // We are at pages level (e.g. product.html)
    }
  }

  if (item.type === 'product') {
    return `${prefix}product.html?id=${item.id}`;
  } else {
    return `${prefix}guide.html?guide=${item.id}`; 
  }
}

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}
