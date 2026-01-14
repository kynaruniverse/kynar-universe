/* KYNAR UNIVERSE FOOTER COMPONENT (js/footer.js)
   Universal footer injection with lore system integration.
   Status: FINAL MASTER
*/

document.addEventListener('DOMContentLoaded', () => {
  injectFooter();
});

function injectFooter() {
  // Check if footer already exists
  if (document.querySelector('.kynar-footer')) return;
  
  const footer = document.createElement('footer');
  footer.className = 'kynar-footer';
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
        <a href="/pages/about/index.html" class="text-micro" style="text-decoration: none;">About</a>
        <span>•</span>
        <a href="/pages/support/index.html" class="text-micro" style="text-decoration: none;">Support</a>
        <span>•</span>
        <a href="/pages/legal/privacy.html" class="text-micro" style="text-decoration: none;">Privacy</a>
      </div>
      
      <p class="text-micro" style="margin-top: var(--space-sm); opacity: 0.4;">
        © ${new Date().getFullYear()} Kynar Universe. All Rights Reserved.
      </p>
    </div>
  `;
  
  document.body.appendChild(footer);
}