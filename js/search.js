/* ASTRYX SEARCH ENGINE (js/search.js)
   Client-side search for Products and Guides.
   Status: FINAL MASTER (Aligned with Data Arrays & Path Logic)
*/

import { KYNAR_DATA } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  injectSearchUI();
});

function injectSearchUI() {
  // 1. Create the Trigger Button
  const trigger = document.createElement('button');
  trigger.className = 'btn-tertiary'; 
  trigger.style.padding = '8px';
  trigger.innerHTML = '<i class="ph ph-magnifying-glass" style="font-size: 1.25rem;"></i>';
  trigger.ariaLabel = "Search Kynar Universe";
  trigger.onclick = openSearch;

  // 2. Inject into Header (with fallback)
  setTimeout(() => {
    const headerContainer = document.getElementById('header-actions-container');
    if (headerContainer) {
      headerContainer.insertBefore(trigger, headerContainer.firstChild);
    } else {
      // Fallback: Fixed floating button if no header exists
      trigger.className = 'search-trigger animate-enter'; 
      trigger.style.position = 'fixed';
      trigger.style.top = '24px';
      trigger.style.right = '24px';
      trigger.style.zIndex = '900';
      document.body.appendChild(trigger);
    }
  }, 100); 

  // 3. Create the Overlay (Hidden by default)
  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  overlay.innerHTML = `
    <div class="search-container stack-md">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2 class="text-h3" style="margin:0;">Search</h2>
        <button class="btn-tertiary" id="close-search-btn">Close</button>
      </div>
      
      <input type="text" id="search-input" class="search-input" placeholder="Type to explore..." autocomplete="off">
      
      <div id="search-results" class="search-results stack-sm" style="max-height: 60vh; overflow-y: auto;">
        <div style="text-align:center; opacity:0.5; padding: 2rem;">
          <p class="text-micro">Find tools, guides, and resources.</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // 4. Attach Listeners
  document.getElementById('search-input').addEventListener('input', (e) => handleSearch(e.target.value));
  document.getElementById('close-search-btn').onclick = closeSearch;
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });
}

// --- LOGIC ---

function openSearch() {
  document.getElementById('search-overlay').classList.add('active');
  // Small delay to allow CSS transition to start before focusing
  setTimeout(() => document.getElementById('search-input').focus(), 50);
}

function closeSearch() {
  document.getElementById('search-overlay').classList.remove('active');
  document.getElementById('search-input').value = ''; 
  // Reset results
  document.getElementById('search-results').innerHTML = '<div style="text-align:center; opacity:0.5; padding: 2rem;"><p class="text-micro">Find tools, guides, and resources.</p></div>';
}
window.closeSearch = closeSearch;

function handleSearch(query) {
  const resultsContainer = document.getElementById('search-results');
  const term = query.toLowerCase().trim();

  if (term.length < 2) {
    // Keep the empty state if query is too short
    return;
  }

  // 1. Flatten Data (Convert Arrays to Searchable List)
  const allItems = [
    ...KYNAR_DATA.products.map(item => ({ ...item, type: 'product' })),
    ...KYNAR_DATA.guides.map(item => ({ ...item, type: 'guide' }))
  ];

  // 2. Filter Algorithm
  const matches = allItems.filter(item => {
    return (
      item.title.toLowerCase().includes(term) || 
      (item.tag && item.tag.toLowerCase().includes(term)) ||
      (item.subCategory && item.subCategory.toLowerCase().includes(term)) ||
      (item.shortDesc && item.shortDesc.toLowerCase().includes(term)) ||
      item.category.toLowerCase().includes(term)
    );
  });

  // 3. Render
  if (matches.length === 0) {
    resultsContainer.innerHTML = `
      <div style="text-align:center; opacity:0.5; padding: 2rem;">
        <p class="text-body">No matches found.</p>
        <p class="text-micro" style="margin-top:8px;">Try "Planner", "Python", or "Wellness"</p>
      </div>`;
  } else {
    resultsContainer.innerHTML = matches.map(item => renderResultCard(item)).join('');
  }
}

function renderResultCard(item) {
  const link = resolvePath(item);
  
  // Visual Configuration
  let iconClass = 'ph-file';
  let badgeColor = 'var(--bg-surface)';
  let metaInfo = '';

  if (item.type === 'product') {
    iconClass = item.previewIcon || 'ph-cube';
    // Use Category Colors for badge background
    if (item.category === 'tools') badgeColor = 'var(--pal-tools-white)';
    if (item.category === 'living') badgeColor = 'var(--pal-living-meadow)';
    if (item.category === 'home') badgeColor = 'var(--pal-family-beige)';
    
    metaInfo = `<span style="color: var(--accent-primary); font-weight: 600;">£${item.price.toFixed(2)}</span>`;
  } else {
    // Guides
    iconClass = 'ph-article';
    badgeColor = 'var(--pal-hub-base)';
    metaInfo = `<span>${item.readTime}</span>`;
  }

  return `
    <a href="${link}" class="card search-result-card animate-enter" style="text-decoration: none; border: 1px solid var(--border-subtle);">
      <div style="display:flex; align-items:center; gap:var(--space-md);">
        
        <div style="background:${badgeColor}; width:48px; height:48px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink: 0;">
          <i class="ph ${iconClass}" style="font-size:1.5rem; color:var(--text-main); opacity: 0.8;"></i>
        </div>
        
        <div class="stack-xs" style="flex:1;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
             <h4 class="text-body" style="font-weight:600; font-size:1rem; margin:0;">${item.title}</h4>
             <span class="tag" style="font-size:0.7rem; padding:2px 8px;">${item.type === 'product' ? 'Tool' : 'Guide'}</span>
          </div>
          
          <div style="display:flex; justify-content:space-between; font-size: 0.85rem; opacity: 0.8; margin-top: 4px;">
            <p style="margin:0; max-width: 80%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${item.shortDesc}</p>
            ${metaInfo}
          </div>
        </div>
      </div>
    </a>
  `;
}

/* HELPER: Resolve Relative Paths
   Determines the correct link based on current page depth.
*/
function resolvePath(item) {
  const path = window.location.pathname;
  let prefix = '';

  // HEURISTIC: Count slashes to determine depth
  // Level 0 (Root): /index.html -> needs 'pages/'
  // Level 1 (Product): /pages/product.html -> needs ''
  // Level 2 (Category): /pages/tools/index.html -> needs '../'
  
  // Note: On GitHub Pages, there might be a repo name prefix. 
  // Checking for 'pages' string is safer.
  
  if (!path.includes('/pages/')) {
    // We are at Root
    prefix = 'pages/';
  } else {
    // We are inside /pages/
    const partsAfterPages = path.split('/pages/')[1];
    if (partsAfterPages.includes('/')) {
      // We are deep (e.g. tools/index.html) -> Go up one level
      prefix = '../';
    } else {
      // We are at /pages/product.html level -> sibling
      prefix = '';
    }
  }

  if (item.type === 'product') {
    return `${prefix}product.html?id=${item.id}`;
  } else {
    // Future Phase: Guide Template
    return `${prefix}guide.html?guide=${item.id}`; 
  }
}
