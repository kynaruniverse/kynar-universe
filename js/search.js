/* KYNAR UNIVERSE SEARCH ENGINE (js/search.js)
   "The Lens."
   Status: OPTIMISED & SECURE (Cached Index + DOM Safety)
*/

import { KYNAR_DATA } from './data.js';

// Cache the search index in memory to avoid rebuilding on every keystroke
let searchIndex = [];

document.addEventListener('DOMContentLoaded', () => {
  // Pre-build the index once data is available
  initializeSearchIndex();
});

function initializeSearchIndex() {
  const products = (KYNAR_DATA.products || []).map(item => ({ ...item, type: 'product' }));
  const guides = (KYNAR_DATA.guides || []).map(item => ({ ...item, type: 'guide' }));
  searchIndex = [...products, ...guides];
}

/* =========================================
   1. VISIBILITY LOGIC
   ========================================= */
window.toggleSearch = function() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) {
    injectSearchUI();
    // Allow DOM paint
    requestAnimationFrame(() => openSearch());
  } else if (overlay.classList.contains('active')) {
    closeSearch();
  } else {
    openSearch();
  }
};

function openSearch() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  const input = document.getElementById('search-input');
  if(input) setTimeout(() => input.focus(), 100);
}

function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  
  // Cleanup after animation
  setTimeout(() => {
    if(input) input.value = '';
    if(results) resetResults(results);
  }, 300);
}

/* =========================================
   2. UI INJECTION (Safe DOM Creation)
   ========================================= */
function injectSearchUI() {
  const mount = document.getElementById('search-mount') || document.body;
  
  // Create wrapper
  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  
  // Using innerHTML here is acceptable for STATIC structural markup only.
  // No user input is passed here.
  overlay.innerHTML = `
    <div class="search-container stack-md animate-enter" role="dialog" aria-modal="true" aria-label="Search Universe">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap: 8px;">
          <i class="ph ph-planet" style="color: var(--accent-primary); font-size: 1.5rem;"></i>
          <h2 class="text-h3" style="margin:0;">Search Universe</h2>
        </div>
        <button class="btn-tertiary" id="btn-close-search" aria-label="Close Search">
          <i class="ph ph-x"></i>
        </button>
      </div>
      
      <div style="position: relative;">
        <input type="text" id="search-input" class="search-input" 
               placeholder="Find scripts, planners, and guides..." 
               autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
        <i class="ph ph-magnifying-glass" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); opacity: 0.5;"></i>
      </div>
      
      <div id="search-results" class="search-results stack-sm" style="max-height: 60vh; overflow-y: auto; padding-right: 4px; padding-bottom: 20px;">
        </div>

      <div style="border-top: 1px solid var(--border-subtle); padding-top: 12px; display: flex; justify-content: space-between; opacity: 0.5;">
        <span class="text-micro">ESC to close</span>
        <span class="text-micro">Kynar Universe</span>
      </div>
    </div>
  `;
  
  mount.appendChild(overlay);
  
  // Init default state
  const resultsContainer = document.getElementById('search-results');
  resetResults(resultsContainer);

  // Attach Listeners
  document.getElementById('search-input').addEventListener('input', (e) => handleSearch(e.target.value));
  document.getElementById('btn-close-search').addEventListener('click', closeSearch);
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });
  
  document.addEventListener('keydown', handleKeyEvents);
}

function handleKeyEvents(e) {
  const overlay = document.getElementById('search-overlay');
  if (!overlay || !overlay.classList.contains('active')) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      window.toggleSearch();
    }
    return;
  }
  
  if (e.key === 'Escape') {
    closeSearch();
    return;
  }
  
  // Keyboard Nav Logic
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    const results = document.querySelectorAll('.search-result-card');
    if (results.length === 0) return;
    
    e.preventDefault();
    const focused = document.activeElement;
    const index = Array.from(results).indexOf(focused);
    let nextIndex = 0;

    if (index === -1) {
      nextIndex = 0;
    } else if (e.key === 'ArrowDown') {
      nextIndex = (index + 1) % results.length;
    } else {
      nextIndex = (index - 1 + results.length) % results.length;
    }
    
    results[nextIndex].focus();
  }
}

/* =========================================
   3. SEARCH ALGORITHM (Optimized)
   ========================================= */
function handleSearch(query) {
  const resultsContainer = document.getElementById('search-results');
  const term = query.toLowerCase().trim();

  if (term.length < 2) {
    if (term.length === 0) resetResults(resultsContainer);
    return;
  }

  // Use the cached index instead of flattening every time
  const matches = searchIndex.filter(item => {
    return (
      (item.title && item.title.toLowerCase().includes(term)) || 
      (item.tag && item.tag.toLowerCase().includes(term)) ||
      (item.subCategory && item.subCategory.toLowerCase().includes(term)) ||
      (item.category && item.category.toLowerCase().includes(term))
    );
  });

  resultsContainer.innerHTML = ''; // Clear current

  if (matches.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.style.cssText = "text-align:center; opacity:0.5; padding: 2rem;";
    emptyState.innerHTML = `
        <p class="text-body">Sector Uncharted.</p>
        <p class="text-micro" style="margin-top:8px;">Try "Automation", "Finance", or "Kids".</p>
    `;
    resultsContainer.appendChild(emptyState);
  } else {
    // Append safe DOM nodes
    matches.forEach(item => {
      resultsContainer.appendChild(createResultCard(item));
    });
  }
}

function resetResults(container) {
  if(!container) return;
  container.innerHTML = `
    <div style="text-align:center; opacity:0.6; padding: 3rem 1rem;">
      <i class="ph ph-telescope" style="font-size: 2rem; margin-bottom: 12px; opacity: 0.5;"></i>
      <p class="text-body">Explore the Digital Department Store.</p>
    </div>`;
}

/* =========================================
   4. RENDERER (Safe DOM Creation)
   ========================================= */
function createResultCard(item) {
  const linkPath = resolveSearchPath(item);
  
  const card = document.createElement('a');
  card.href = linkPath;
  card.className = "card search-result-card animate-enter";
  card.onclick = closeSearch;
  card.style.cssText = "display:block; text-decoration:none; padding:12px; margin-bottom: 8px;";
  
  // --- Icon Logic ---
  let iconName = 'ph-cube';
  let badgeColor = '';
  let badgeText = '';

  if (item.type === 'product') {
    iconName = item.previewIcon || 'ph-package';
    if(item.status === 'upcoming') {
       badgeText = "Upcoming";
    } else {
       badgeText = `£${item.price.toFixed(2)}`;
       badgeColor = 'var(--accent-primary)';
    }
  } else {
    iconName = 'ph-book-open';
    badgeText = "Read";
  }

  // --- Build Internal Structure Safely ---
  // Using innerHTML for the wrapper structure is okay, 
  // provided we insert text content safely afterwards.
  
  const innerWrapper = document.createElement('div');
  innerWrapper.style.cssText = "display:flex; align-items:center; gap:var(--space-md);";
  
  // Icon
  const iconBox = document.createElement('div');
  iconBox.style.cssText = "width:40px; height:40px; border-radius:50%; background:var(--bg-page); display:flex; align-items:center; justify-content:center; flex-shrink: 0; border: 1px solid var(--border-subtle);";
  const icon = document.createElement('i');
  icon.className = `ph ${iconName}`;
  icon.style.cssText = "font-size:1.25rem; color:var(--text-main); opacity: 0.8;";
  iconBox.appendChild(icon);

  // Content Stack
  const contentStack = document.createElement('div');
  contentStack.className = "stack-xs";
  contentStack.style.flex = "1";

  // Title Row
  const titleRow = document.createElement('div');
  titleRow.style.cssText = "display:flex; justify-content:space-between; align-items:center;";
  
  const title = document.createElement('h4');
  title.className = "text-body";
  title.style.cssText = "font-weight:600; font-size:0.95rem; margin:0;";
  title.textContent = item.title; // SAFE SINK

  const badge = document.createElement('span');
  badge.style.fontWeight = "600";
  if(badgeColor) badge.style.color = badgeColor;
  badge.style.fontSize = "0.85rem";
  badge.textContent = badgeText; // SAFE SINK

  titleRow.appendChild(title);
  titleRow.appendChild(badge);

  // Subtext Row
  const subRow = document.createElement('div');
  subRow.style.cssText = "display:flex; justify-content:space-between; font-size: 0.8rem; opacity: 0.6; margin-top: 2px;";
  
  const subText = document.createElement('span');
  const catName = item.category ? (item.category.charAt(0).toUpperCase() + item.category.slice(1)) : '';
  subText.textContent = item.type === 'product' 
    ? `Verified Tool • ${catName}` 
    : `Knowledge Record • ${item.readTime || 'Guide'}`; // SAFE SINK

  subRow.appendChild(subText);

  contentStack.appendChild(titleRow);
  contentStack.appendChild(subRow);

  innerWrapper.appendChild(iconBox);
  innerWrapper.appendChild(contentStack);
  card.appendChild(innerWrapper);

  return card;
}

function resolveSearchPath(item) {
  const path = window.location.pathname;
  let prefix = 'pages/'; 

  // Simple path resolution
  if (path.includes('/pages/') && path.split('/').length > 3) {
     prefix = '../'; 
  } else if (path.includes('/pages/')) {
     prefix = ''; 
  }

  if (item.type === 'product') {
    return `${prefix}product.html?id=${item.id}`;
  } else {
    return `${prefix}guide.html?guide=${item.id}`; 
  }
}
