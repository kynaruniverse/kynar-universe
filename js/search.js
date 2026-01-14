/* KYNAR UNIVERSE SEARCH ENGINE (js/search.js)
   "The Lens."
   Allows instant querying of the centralized Inventory and Knowledge Library.
   Status: FINAL MASTER (Mobile Optimized)
*/

import { KYNAR_DATA } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // We don't auto-inject on load to save performance.
  // We wait for the first user interaction or explicit call.
  // But to ensure the header button works immediately, we prep the toggle function.
});

/* =========================================
   1. VISIBILITY LOGIC (Global Entry Point)
   ========================================= */
window.toggleSearch = function() {
  const overlay = document.getElementById('search-overlay');
  
  if (!overlay) {
    // Lazy Load: First time opening? Build the UI.
    injectSearchUI();
    // Small delay to allow DOM to paint before opening
    setTimeout(openSearch, 50);
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
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  
  // Attempt focus (Works on Desktop, flaky on Mobile)
  const input = document.getElementById('search-input');
  setTimeout(() => input.focus(), 100);
}

function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  
  // Clean up
  setTimeout(() => {
    document.getElementById('search-input').value = '';
    resetResults();
  }, 300);
}

/* =========================================
   2. INJECT THE LENS (OVERLAY)
   ========================================= */
function injectSearchUI() {
  // Mount Point check (from index.html)
  const mount = document.getElementById('search-mount') || document.body;
  
  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  
  overlay.innerHTML = `
    <div class="search-container stack-md animate-enter" role="dialog" aria-modal="true" aria-label="Search Universe">
      
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap: 8px;">
          <i class="ph ph-planet" style="color: var(--accent-primary); font-size: 1.5rem;"></i>
          <h2 class="text-h3" style="margin:0;">Search Universe</h2>
        </div>
        <button class="btn-tertiary" onclick="toggleSearch()" aria-label="Close Search">
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
        <div style="text-align:center; opacity:0.6; padding: 3rem 1rem;">
          <i class="ph ph-telescope" style="font-size: 2rem; margin-bottom: 12px; opacity: 0.5;"></i>
          <p class="text-body">Explore the Digital Department Store.</p>
        </div>
      </div>

      <div style="border-top: 1px solid var(--border-subtle); padding-top: 12px; display: flex; justify-content: space-between; opacity: 0.5;">
        <span class="text-micro">ESC to close</span>
        <span class="text-micro">Kynar Universe</span>
      </div>

    </div>
  `;
  
  mount.appendChild(overlay);

  // Attach Listeners
  const input = document.getElementById('search-input');
  input.addEventListener('input', (e) => handleSearch(e.target.value));
  
  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });
  
  // Keyboard Trap & Shortcuts
  document.addEventListener('keydown', handleKeyEvents);
}

function handleKeyEvents(e) {
  const overlay = document.getElementById('search-overlay');
  if (!overlay || !overlay.classList.contains('active')) {
    // Global shortcut to open
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      window.toggleSearch();
    }
    return;
  }
  
  // Close on ESC
  if (e.key === 'Escape') {
    closeSearch();
    return;
  }
  
  // Navigation
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const results = document.querySelectorAll('.search-result-card');
    if (results.length === 0) return;
    
    const focused = document.activeElement;
    let next;
    
    // If we haven't focused a card yet, start at the first
    if (!focused.classList.contains('search-result-card')) {
      next = results[0];
    } else {
      const index = Array.from(results).indexOf(focused);
      if (e.key === 'ArrowDown') {
        next = results[index + 1] || results[0]; // Loop
      } else {
        next = results[index - 1] || results[results.length - 1]; // Loop
      }
    }
    next.focus();
  }
}

/* =========================================
   3. SEARCH ALGORITHM (OPTIMIZED)
   ========================================= */
function handleSearch(query) {
  const resultsContainer = document.getElementById('search-results');
  const term = query.toLowerCase().trim();

  if (term.length < 2) {
    if (term.length === 0) resetResults();
    return;
  }

  // Flatten Data (Once per search for speed)
  const allItems = [
    ...(KYNAR_DATA.products || []).map(item => ({ ...item, type: 'product' })),
    ...(KYNAR_DATA.guides || []).map(item => ({ ...item, type: 'guide' }))
  ];

  // Filter
  const matches = allItems.filter(item => {
    return (
      item.title.toLowerCase().includes(term) || 
      (item.tag && item.tag.toLowerCase().includes(term)) ||
      (item.subCategory && item.subCategory.toLowerCase().includes(term)) ||
      item.category.toLowerCase().includes(term)
    );
  });
  
  // Render
  if (matches.length === 0) {
    resultsContainer.innerHTML = `
      <div style="text-align:center; opacity:0.5; padding: 2rem;">
        <p class="text-body">Sector Uncharted.</p>
        <p class="text-micro" style="margin-top:8px;">Try "Automation", "Finance", or "Kids".</p>
      </div>`;
  } else {
    resultsContainer.innerHTML = matches.map(item => renderResultCard(item)).join('');
  }
}

function resetResults() {
  const container = document.getElementById('search-results');
  if(container) {
    container.innerHTML = `
      <div style="text-align:center; opacity:0.6; padding: 3rem 1rem;">
        <i class="ph ph-telescope" style="font-size: 2rem; margin-bottom: 12px; opacity: 0.5;"></i>
        <p class="text-body">Explore the Digital Department Store.</p>
      </div>`;
  }
}

/* =========================================
   4. RENDERER
   ========================================= */
function renderResultCard(item) {
  const link = resolveSearchPath(item);
  
  let iconClass = 'ph-cube';
  let subText = '';
  let badge = '';

  if (item.type === 'product') {
    iconClass = item.previewIcon || 'ph-package';
    subText = `Verified Tool • ${capitalize(item.category)}`;
    // If upcoming, show label instead of price
    if(item.status === 'upcoming') {
       badge = `<span class="tag" style="font-size:0.7em;">Upcoming</span>`;
    } else {
       badge = `<span style="font-weight: 600; color: var(--accent-primary);">£${item.price.toFixed(2)}</span>`;
    }
  } else {
    iconClass = 'ph-book-open';
    subText = `Knowledge Record • ${item.readTime || 'Guide'}`;
    badge = `<span style="font-size: 0.8rem; opacity: 0.7;">Read</span>`;
  }

  return `
    <a href="${link}" class="card search-result-card animate-enter" onclick="closeSearch()" style="display:block; text-decoration:none; padding:12px;">
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
   ========================================= */
function resolveSearchPath(item) {
  // Robust path resolution based on current depth
  const path = window.location.pathname;
  let prefix = 'pages/'; // Default if at root

  // If already in pages/ (e.g. pages/tools/index.html), we are 2 levels deep
  if (path.includes('/pages/') && path.split('/').length > 3) {
     prefix = '../'; // Go up one level to pages/
  } 
  // If in pages/ (e.g. pages/about.html), we are 1 level deep
  else if (path.includes('/pages/')) {
     prefix = ''; // Same directory
  }

  if (item.type === 'product') {
    return `${prefix}product.html?id=${item.id}`;
  } else {
    return `${prefix}guide.html?guide=${item.id}`; 
  }
}

function capitalize(s) {
  if(!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
