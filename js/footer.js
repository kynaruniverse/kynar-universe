/* KYNAR FOOTER ENGINE (js/footer.js)
   Injects the Site Footer and the "Whispers" container.
   Status: FINAL MASTER (Lore-Ready)
*/

document.addEventListener('DOMContentLoaded', () => {
  injectFooter();
});

function injectFooter() {
  const footerMount = document.getElementById('app-footer');
  if (!footerMount) return;

  const root = resolveRootPath();

  footerMount.innerHTML = `
    <div class="container">
      
      <div style="
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
        gap: var(--space-xl); 
        padding-bottom: var(--space-xl);
        border-bottom: 1px solid var(--border-subtle);
      ">
        
        <div class="stack-sm">
          <a href="${root}index.html" style="display: flex; align-items: center; gap: 8px; opacity: 0.8;">
            <img src="${root}assets/logo.svg" alt="Kynar Logo" style="width: 24px; height: 24px; filter: grayscale(1);">
            <span style="font-weight: 600; letter-spacing: -0.01em;">Kynar Universe</span>
          </a>
          
          <p class="text-lore" style="
            font-size: 0.9rem; 
            color: var(--text-muted); 
            margin-top: var(--space-sm);
            min-height: 1.5em; /* Prevent layout shift */
          ">
            "Initializing..."
          </p>
        </div>

        <div class="stack-xs">
          <span class="text-micro">Departments</span>
          <a href="${root}pages/tools/index.html" class="footer-link">Kynar Tools</a>
          <a href="${root}pages/living/index.html" class="footer-link">Kynar Living</a>
          <a href="${root}pages/home/index.html" class="footer-link">Kynar Home</a>
        </div>

        <div class="stack-xs">
          <span class="text-micro">Universe</span>
          <a href="${root}pages/about/index.html" class="footer-link">Manifesto</a>
          <a href="${root}pages/account/index.html" class="footer-link">Inventory</a>
          <a href="${root}pages/hub/index.html" class="footer-link">The Hub</a>
        </div>

        <div class="stack-xs">
          <span class="text-micro">Protocol</span>
          <a href="${root}pages/legal/privacy.html" class="footer-link">Privacy</a>
          <a href="${root}pages/support/index.html" class="footer-link">Support</a>
          <span style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
            &copy; ${new Date().getFullYear()} Kynar Universe
          </span>
        </div>

      </div>

      <div style="padding-top: var(--space-md); display: flex; justify-content: space-between; align-items: center; opacity: 0.5;">
        <span class="text-micro">System Status: Nominal</span>
        <div style="width: 8px; height: 8px; background: var(--color-success); border-radius: 50%; box-shadow: 0 0 8px var(--color-success);"></div>
      </div>

    </div>
  `;

  // Inject Styles for Footer Links (Keep CSS clean)
  const style = document.createElement('style');
  style.textContent = `
    .footer-link {
      color: var(--text-body);
      font-size: 0.95rem;
      transition: color 0.2s;
    }
    .footer-link:hover {
      color: var(--text-main);
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 4px;
    }
  `;
  document.head.appendChild(style);
}

/* HELPER: Path Resolver (Same as Header) */
function resolveRootPath() {
  const path = window.location.pathname;
  if (!path.includes('/pages/')) return './';
  const parts = path.split('/pages/')[1];
  if (parts && parts.includes('/')) return '../../';
  return '../';
}
