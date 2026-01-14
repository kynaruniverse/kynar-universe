/* KYNAR UNIVERSE BREADCRUMB COMPONENT (js/components/breadcrumb.js)
   Auto-generates breadcrumb navigation based on URL path.
   Status: PHASE 3 - Deduplication
*/

export function injectBreadcrumb() {
  // Check if breadcrumb placeholder exists
  const placeholder = document.getElementById('breadcrumb-nav');
  if (!placeholder) return;
  
  const path = window.location.pathname;
  const segments = path.split('/').filter(s => s && s !== 'index.html');
  
  // Build breadcrumb HTML
  let breadcrumbHTML = '<nav class="breadcrumb animate-enter" aria-label="Breadcrumb">';
  
  // Always start with Home
  breadcrumbHTML += `<a href="${getRootPath()}index.html" class="btn-tertiary" style="padding-left:0;">`;
  
  // Check if we're on a deep page
  if (segments.length > 1) {
    breadcrumbHTML += `<i class="ph ph-arrow-left"></i> Home`;
  } else {
    breadcrumbHTML += `<i class="ph ph-arrow-left"></i> Return`;
  }
  
  breadcrumbHTML += `</a>`;
  
  // Add intermediate segments
  let currentPath = '';
  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i];
    if (segment === 'pages') continue;
    
    currentPath += `/${segment}`;
    breadcrumbHTML += `<span style="opacity: 0.3;">/</span>`;
    breadcrumbHTML += `<a href="${getRootPath()}pages/${segment}/index.html" class="btn-tertiary" style="padding-left:0;">`;
    breadcrumbHTML += capitalize(segment);
    breadcrumbHTML += `</a>`;
  }
  
  // Add current page (non-linked)
  if (segments.length > 0) {
    const lastSegment = segments[segments.length - 1].replace('.html', '');
    if (lastSegment !== 'pages') {
      breadcrumbHTML += `<span style="opacity: 0.3;">/</span>`;
      breadcrumbHTML += `<span class="text-micro" style="opacity: 0.6;">${capitalize(lastSegment)}</span>`;
    }
  }
  
  breadcrumbHTML += '</nav>';
  
  placeholder.outerHTML = breadcrumbHTML;
}

function getRootPath() {
  const path = window.location.pathname;
  if (!path.includes('/pages/')) return './';
  const depth = (path.split('/pages/')[1].match(/\//g) || []).length;
  return '../'.repeat(depth + 1);
}

function capitalize(str) {
  if (!str) return '';
  // Handle special cases
  const specialCases = {
    'tools': 'Tools',
    'living': 'Living', 
    'home': 'Home',
    'account': 'Account',
    'hub': 'The Hub',
    'about': 'About',
    'support': 'Support',
    'settings': 'Settings',
    'legal': 'Legal',
    'onboarding': 'Onboarding',
    'checkout': 'Checkout',
    'product': 'Product',
    'guide': 'Guide',
    'collections': 'Inventory'
  };
  
  return specialCases[str.toLowerCase()] || str.charAt(0).toUpperCase() + str.slice(1);
}

document.addEventListener('DOMContentLoaded', injectBreadcrumb);