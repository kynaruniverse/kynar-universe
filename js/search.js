/* ASTRYX SEARCH ENGINE (js/search.js)
   Client-side search for Products and Guides.
*/
import { products, guides } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  injectSearchUI();
});

function injectSearchUI() {
  // 1. Create the Trigger Button (Top Right)
  const trigger = document.createElement('button');
  trigger.className = 'search-trigger animate-enter';
  trigger.innerHTML = '<i class="ph ph-magnifying-glass"></i>';
  trigger.onclick = openSearch;
  document.body.appendChild(trigger);

  // 2. Create the Overlay (Hidden by default)
  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  overlay.innerHTML = `
    <div class="search-container stack-md">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2 class="text-h3" style="margin:0;">Search</h2>
        <button class="btn-tertiary" onclick="closeSearch()">Close</button>
      </div>
      
      <input type="text" id="search-input" class="search-input" placeholder="Type to explore..." autocomplete="off">
      
      <div id="search-results" class="search-results stack-sm">
        <div style="text-align:center; opacity:0.5; padding: 2rem;">
          <p class="text-micro">Start typing to find tools and guides.</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // 3. Attach Input Listener
  document.getElementById('search-input').addEventListener('input', (e) => handleSearch(e.target.value));
}

// --- LOGIC ---

function openSearch() {
  document.getElementById('search-overlay').classList.add('active');
  document.getElementById('search-input').focus();
}

// Make close globally available
window.closeSearch = function() {
  document.getElementById('search-overlay').classList.remove('active');
  document.getElementById('search-input').value = ''; // Optional: clear on close
};

function handleSearch(query) {
  const resultsContainer = document.getElementById('search-results');
  const term = query.toLowerCase().trim();

  if (term.length < 2) {
    resultsContainer.innerHTML = '<div style="text-align:center; opacity:0.5; padding: 2rem;"><p class="text-micro">Keep typing...</p></div>';
    return;
  }

  // 1. Combine Data
  // We map them to a standard format for searching
  const allItems = [
    ...Object.entries(products).map(([id, item]) => ({ ...item, id, type: 'product' })),
    ...Object.entries(guides).map(([id, item]) => ({ ...item, id, type: 'guide' }))
  ];

  // 2. Filter
  const matches = allItems.filter(item => {
    return (
      item.title.toLowerCase().includes(term) || 
      item.tag?.toLowerCase().includes(term) ||
      item.shortDesc?.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  });

  // 3. Render
  if (matches.length === 0) {
    resultsContainer.innerHTML = '<div style="text-align:center; opacity:0.5; padding: 2rem;"><p class="text-body">No matches found.</p></div>';
  } else {
    resultsContainer.innerHTML = matches.map(item => renderResultCard(item)).join('');
  }
}

function renderResultCard(item) {
  // Determine correct path prefix based on where the user currently is
  // Simple heuristic: If we are in root, prefix is 'pages/'. If in pages/, prefix is '../'
  // But since this script is a module, we can just use absolute or smart relative paths.
  // Best bet for Kynar structure: assume user is deep in pages or at root.
  // We will let the link be generic and rely on the user being in a 'pages' subdir mostly.
  
  // Actually, easier: Determine link based on type
  let link = '';
  const isRoot = window.location.pathname.endsWith('index.html') && window.location.pathname.split('/').length <= 2; 
  // This path logic can be tricky on GitHub pages. 
  // Let's use a safe "dot-dot" strategy assuming we are mostly in subpages.
  
  // If we are at root index.html
  const depth = window.location.pathname.split('/').length - 2; // Rough estimate
  // Let's just use the "Loader" strategy: relative links from data.js context are hard.
  // We'll standardise:
  
  let basePath = 'pages/';
  if (document.title.includes('Kynar Universe |')) { 
      // We are at root Home
      basePath = 'pages/';
  } else if (document.title.includes('Product') || document.title.includes('Guide')) {
      // We are in pages/
      basePath = '';
  } else {
     // We are in pages/tools, pages/living etc.
     basePath = '../';
  }

  if (item.type === 'product') {
    link = `${basePath}product.html?id=${item.id}`;
  } else {
    link = `${basePath}guide.html?guide=${item.id}`;
  }

  // Visuals
  const icon = item.previewIcon ? `<i class="ph ${item.previewIcon}" style="font-size:1.5rem; color:var(--accent-primary);"></i>` : '📄';
  const badgeColor = item.type === 'product' ? 'var(--pal-tools-white)' : 'var(--pal-hub-base)';
  const badgeText = item.type === 'product' ? 'Tool' : 'Guide';

  return `
    <a href="${link}" class="card search-result-card animate-enter">
      <div style="display:flex; align-items:center; gap:var(--space-md);">
        <div style="background:${badgeColor}; width:48px; height:48px; border-radius:50%; display:flex; align-items:center; justify-content:center;">
          ${icon}
        </div>
        <div class="stack-xs" style="flex:1;">
          <div style="display:flex; justify-content:space-between;">
             <h4 class="text-body" style="font-weight:600; font-size:1rem;">${item.title}</h4>
             <span class="tag" style="font-size:0.7rem; padding:2px 8px;">${badgeText}</span>
          </div>
          <p class="text-micro" style="text-transform:none; opacity:0.7;">${item.shortDesc}</p>
        </div>
      </div>
    </a>
  `;
}
