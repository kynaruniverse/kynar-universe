/* KYNAR UNIVERSE CORE ENGINE (js/app.js)
   The central nervous system. Handles Atmosphere, Motion, and System Feedback.
   Status: FINAL MASTER (Aligned with "Grand Vision" & "No Digital Filler")
*/

// Graceful Imports
let Analytics = { trackThemeChange: () => {} }; // Fallback dummy
try {
  const module = await import('./analytics.js');
  Analytics = module.Analytics;
} catch (e) {
  console.warn('[Universe] Analytics module pending...');
}

import { KYNAR_DATA } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Visual Foundation
  injectIconSystem(); 
  
  // 2. Narrative & Atmosphere
  initLoreSystem();   
  initThemeSystem();  
  
  // 3. Performance & Interaction
  initMotionSystem(); 
  initScrollProgress(); 
  initLazyImages();
  initImageErrorHandling();
  
  console.log('🚀 KYNAR UNIVERSE: Systems Nominal');
});

/* =========================================
   0. ICON SYSTEM INJECTOR
   Ensures the visual language (Phosphor Icons) is always present.
   Strategy: Checks for local CSS, falls back to CDN if icon font fails to render.
   ========================================= */
function injectIconSystem() {
  // We check if a known icon (like 'ph-house') renders correctly.
  // For now, we ensure the CDN backup is ready if local assets fail.
  if (!document.getElementById('phosphor-icons-cdn')) {
    const script = document.createElement('script');
    script.id = 'phosphor-icons-cdn';
    script.src = 'https://unpkg.com/@phosphor-icons/web';
    script.async = true;
    script.onload = () => console.log('[Universe] Icon System: Active');
    document.head.appendChild(script);
  }
}

/* =========================================
   1. THE LORE SYSTEM
   Pulls from KYNAR_DATA to inject the "Whispers" into the footer.
   Aligned with: "A space, not a screen."
   ========================================= */
function initLoreSystem() {
  const body = document.body;
  
  // LOGIC: Map specific page themes back to their parent lore category
  let currentTheme = body.getAttribute('data-theme') || 'home';
  if (currentTheme === 'home-category') currentTheme = 'home';
  if (currentTheme === 'hub') currentTheme = 'general';
  
  const footerLore = document.querySelector('.text-lore');
  
  // Safety Check: Ensure data exists before trying to read it
  if (footerLore && typeof KYNAR_DATA !== 'undefined' && KYNAR_DATA.lore) {
    const themePhrases = KYNAR_DATA.lore[currentTheme] || [];
    const globalPhrases = KYNAR_DATA.lore.general || []; 
    
    // Mix specific theme lore with general universe lore
    const combinedPool = [...themePhrases, ...globalPhrases];
    
    if (combinedPool.length > 0) {
      const randomPhrase = combinedPool[Math.floor(Math.random() * combinedPool.length)];
      // Inject with quotes for that "Whisper" effect
      footerLore.textContent = `"${randomPhrase}"`;
      footerLore.style.opacity = '1'; // Fade in
    }
  }
}

/* =========================================
   2. THE MOTION SYSTEM
   Handles the "Waterfall" reveal effect on page load.
   Aligned with: "Guided World" (Gentle, not jarring).
   ========================================= */
function initMotionSystem() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Efficiency
      }
    });
  }, observerOptions);

  // Auto-animate these elements
  const targets = document.querySelectorAll('.card, .text-body, section h2, header, .animate-enter, .hero-soul');
  
  targets.forEach((el, index) => {
    el.classList.add('scroll-fade-item');
    el.style.opacity = '0'; // Ensure hidden before JS kicks in
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
    
    // Stagger delay based on index relative to viewport would be complex,
    // so we use a simple mod-based stagger for local groups.
    const delay = Math.min((index % 5) * 100, 500); 
    el.style.transitionDelay = `${delay}ms`; 
    
    // Helper class for when it becomes visible
    el.addEventListener('transitionend', () => {
        el.style.transitionDelay = '0ms'; // Remove delay for subsequent hovers
    }, { once: true });

    observer.observe(el);
  });
  
  // Add the CSS class dynamically to handle the "is-visible" state
  const style = document.createElement('style');
  style.textContent = `
    .scroll-fade-item.is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/* =========================================
   2B. SCROLL PROGRESS (Optimized)
   Shows reading progress on long pages.
   Uses requestAnimationFrame for 60fps mobile performance.
   ========================================= */
function initScrollProgress() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - winHeight;
        const scrolled = window.scrollY;
        
        // Prevent division by zero
        const progress = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
        
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* =========================================
   3. SYSTEM FEEDBACK (Toasts)
   Globally accessible via window.showToast()
   ========================================= */
window.showToast = function(message, type = 'normal') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast animate-enter';
  
  // Icon Logic
  let iconClass = 'ph-info';
  let colorVar = ''; // Optimization: Use var, not inline style string
  
  if (type === 'success') { iconClass = 'ph-check-circle'; colorVar = 'var(--color-success)'; }
  else if (type === 'error') { iconClass = 'ph-warning-circle'; colorVar = 'var(--color-error)'; }
  else if (type === 'starwalker') { iconClass = 'ph-star-four'; colorVar = 'var(--pal-star-gold)'; }
  
  // SECURITY FIX: Create elements instead of innerHTML
  const icon = document.createElement('i');
  icon.className = `ph ${iconClass}`;
  icon.style.fontSize = '1.25rem';
  if(colorVar) icon.style.color = colorVar;

  const text = document.createElement('span');
  text.style.fontWeight = '500';
  text.textContent = message; // Safe sink

  toast.appendChild(icon);
  toast.appendChild(text);
  
  container.appendChild(toast);
  
  // ... (Animation logic remains unchanged)
  const dismissTime = 4000;
  const bar = document.createElement('div');
  bar.style.cssText = `position: absolute; bottom: 0; left: 0; height: 3px; background: currentColor; opacity: 0.2; width: 100%; transition: width ${dismissTime}ms linear;`;
  toast.style.position = 'relative';
  toast.style.overflow = 'hidden';
  toast.appendChild(bar);

  requestAnimationFrame(() => { bar.style.width = '0%'; });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, dismissTime);
}


/* =========================================
   4. ATMOSPHERE SYSTEM (Themes)
   Handles Light, Dark, and the Secret "Starwalker" Mode.
   ========================================= */
function initThemeSystem() {
  const savedMode = localStorage.getItem('kynar_mode');
  if (savedMode) {
    document.documentElement.setAttribute('data-mode', savedMode);
  }
}

window.setTheme = function(mode) {
  // mode options: 'light', 'dark', 'auto', 'starwalker'
  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-mode');
    localStorage.removeItem('kynar_mode');
    window.showToast('System atmosphere synced.');
  } else {
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('kynar_mode', mode);
    
    // Analytics tracking (Safe call)
    Analytics.trackThemeChange(mode);

    // Feedback
    if (mode === 'starwalker') {
      window.showToast('Starwalker Mode Engaged.', 'starwalker');
    } else if (mode === 'light') {
      window.showToast('Daylight atmosphere applied.');
    } else {
      window.showToast('Midnight atmosphere applied.');
    }
  }
}

/* =========================================
   5. IMAGE HANDLING (Lazy & Error)
   ========================================= */
function initLazyImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    images.forEach(img => imageObserver.observe(img));
  } else {
    images.forEach(img => img.classList.add('loaded'));
  }
}

function initImageErrorHandling() {
  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
      // Prevent infinite loop if placeholder fails
      if(e.target.dataset.failed) return;
      e.target.dataset.failed = true;
      
      e.target.style.display = 'none';
      
      // Render Placeholder
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      placeholder.innerHTML = `
        <div style="
          width: 100%; height: 100%; min-height: 150px;
          background: var(--bg-surface);
          border: 1px dashed var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 8px;
          color: var(--text-muted);
        ">
          <i class="ph ph-image-broken" style="font-size: 2rem; opacity: 0.5;"></i>
          <span class="text-micro">Asset Unavailable</span>
        </div>
      `;
      e.target.parentNode.insertBefore(placeholder, e.target);
    }
  }, true);
}
