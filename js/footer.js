/* KYNAR UNIVERSE FOOTER COMPONENT (js/footer.js)
   Universal footer injection with lore integration and utility links.
   Status: EVOLVED MASTER (Clean UI + Navigation Support)
*/

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    injectFooter();
  });

  function injectFooter() {
    if (document.querySelector('.kynar-footer')) return;
    
    const rootPath = resolveRootPath();
    const footer = document.createElement('footer');
    footer.className = 'kynar-footer animate-enter';
    
    footer.innerHTML = `
      <div class="container stack-lg">
        
        <p class="text-lore footer-whisper">
          "One Universe. Infinite Solutions."
        </p>
        
        <div class="footer-nav">
          <a href="${rootPath}pages/about/index.html" class="text-micro">About</a>
          <span class="footer-sep">•</span>
          <a href="${rootPath}pages/support/index.html" class="text-micro">Support</a>
          <span class="footer-sep">•</span>
          <a href="${rootPath}pages/legal/privacy.html" class="text-micro">Privacy</a>
        </div>

        <div class="footer-actions">
          <button id="back-to-top" class="btn-tertiary" aria-label="Return to top">
            <i class="ri-arrow-up-line"></i> <span class="text-micro">Top</span>
          </button>
        </div>
        
        <p class="text-micro copyright">
          © ${new Date().getFullYear()} Kynar Universe. <span class="mobile-hide">All Rights Reserved.</span>
        </p>
      </div>
    `;
    
    document.body.appendChild(footer);

    // Attach Back to Top logic
    const topBtn = document.getElementById('back-to-top');
    if (topBtn) {
      topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function resolveRootPath() {
    const path = window.location.pathname;
    if (!path.includes('/pages/')) return './'; 
    const parts = path.split('/pages/')[1];
    return (parts && parts.includes('/')) ? '../../' : '../';
  }

})();
