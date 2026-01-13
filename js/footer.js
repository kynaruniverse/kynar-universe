/* KYNAR UNIVERSE FOOTER COMPONENT (js/footer.js)
   Universal footer injection with lore system integration.
   Status: FINAL MASTER (Path-Safe & Git-Ready)
*/

document.addEventListener('DOMContentLoaded', () => {
  injectFooter();
});

function injectFooter() {
  // Check if footer already exists
  if (document.querySelector('.kynar-footer')) return;
  
  // 1. Resolve Root Path (Prevents broken links on sub-pages)
  const rootPath = resolveRootPath();
  
  const footer = document.createElement('footer');
  footer.className = 'kynar-footer';
  
  // Using specific styles to ensure spacing consistency
  footer.style.cssText = `
    margin-top: var(--space-section);
    padding: var(--space-xl) 0 var(--space-lg);
    border-top: 1px solid var(--border-subtle);
    text-align: center;
  `;
  
  footer.innerHTML = `
    <div class="container stack-md">
      <p class="text-lore" style="margin-bottom: var(--space-md);">
        "One Universe. Infinite Solutions."
      </p>
      
      <div style="display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap; opacity: 0.6;">
        <a href="${rootPath}pages/about/index.html" class="text-micro" style="text-decoration: none; color: var(--text-main);">About</a>
        <span>•</span>
        <a href="${rootPath}pages/support/index.html" class="text-micro" style="text-decoration: none; color: var(--text-main);">Support</a>
        <span>•</span>
        <a href="${rootPath}pages/legal/privacy.html" class="text-micro" style="text-decoration: none; color: var(--text-main);">Privacy</a>
      </div>
      
      <p class="text-micro" style="margin-top: var(--space-sm); opacity: 0.4;">
        © ${new Date().getFullYear()} Kynar Universe. All Rights Reserved.
      </p>
    </div>
  `;
  
  document.body.appendChild(footer);
}

/* HELPER: Smart Path Resolution
   Ensures links work from deeply nested folders (e.g. tools/index.html)
*/
function resolveRootPath() {
  const path = window.location.pathname;
  
  // 1. Root (index.html)
  if (!path.includes('/pages/')) {
    return './'; 
  }
  
  // 2. Deep Category (pages/tools/index.html)
  const parts = path.split('/pages/')[1];
  if (parts && parts.includes('/')) {
    return '../../';
  }
  
  // 3. Shallow Page (pages/legal.html)
  return '../';
}
