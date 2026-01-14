/* KYNAR UNIVERSE BREADCRUMB COMPONENT (js/breadcrumb.js)
   Auto-generates navigation and injects SEO Schema.
   Status: EVOLVED MASTER (SEO Optimized + Smart Formatting)
*/

export function injectBreadcrumb() {
  const placeholder = document.getElementById('breadcrumb-nav');
  if (!placeholder) return;
  
  // 1. Clean the path
  const rawPath = window.location.pathname;
  const segments = rawPath.split('/').filter(s => s && s !== 'index.html' && s !== 'pages');
  const rootPath = resolveRoot(rawPath);

  // 2. Build the Visual Breadcrumb
  let html = `<nav class="breadcrumb animate-enter" aria-label="Breadcrumb">`;
  
  // A. The "Back" Button Logic
  // If we are deep (e.g. Tools -> Product), show "Back". If top level, show "Home".
  const backLabel = segments.length > 1 ? 'Back' : 'Home';
  html += `
    <a href="${rootPath}index.html" class="btn-tertiary back-link">
      <i class="ri-arrow-left-line"></i> ${backLabel}
    </a>
    <span class="breadcrumb-separator">/</span>
  `;

  // B. Intermediate Segments
  let cumulativePath = rootPath + 'pages/';
  
  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    const displayName = formatSegment(segment);
    
    // Update path for the next link
    // Note: We construct relative paths to ensure offline/local compatibility
    if (index > 0) cumulativePath += `${segment}/`;

    if (isLast) {
      // Current Page (Not clickable, styled as active)
      html += `<span class="text-micro breadcrumb-current" aria-current="page">${displayName}</span>`;
    } else {
      // Parent Category (Clickable)
      html += `
        <a href="${cumulativePath}index.html" class="btn-tertiary">
          ${displayName}
        </a>
        <span class="breadcrumb-separator">/</span>
      `;
    }
  });
  
  html += `</nav>`;
  placeholder.outerHTML = html;

  // 3. Inject SEO Schema (Invisible to user, visible to Google)
  injectSchema(segments);
}

/* --- HELPERS --- */

/**
 * Calculates how many folders deep we are to find Root
 */
function resolveRoot(path) {
  if (!path.includes('/pages/')) return './';
  // Count how many slashes appear after '/pages/'
  const depth = (path.split('/pages/')[1].match(/\//g) || []).length;
  // If depth is 0 (pages/tools), go back 2 levels. If 1, go back 3.
  return '../'.repeat(depth + 1); 
}

/**
 * Turns "finance-tracker" into "Finance Tracker"
 */
function formatSegment(str) {
  if (!str) return '';
  
  // Dictionary for specific overrides
  const dictionary = {
    'tools': 'Kynar Tools',
    'living': 'Kynar Living', 
    'home': 'Kynar Home',
    'hub': 'The Hub',
    'faq': 'FAQ'
  };

  if (dictionary[str.toLowerCase()]) return dictionary[str.toLowerCase()];

  // Standard formatting: Replace hyphens with spaces & Capitalize Words
  return str
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Generates JSON-LD for Google Search Results
 */
function injectSchema(segments) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": segments.map((segment, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": formatSegment(segment),
      // In a real deployed site, this should be the absolute URL (https://...)
      // For now, we leave item undefined to prevent relative path errors in Schema
    }))
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}

// Auto-run if loaded directly
document.addEventListener('DOMContentLoaded', injectBreadcrumb);
