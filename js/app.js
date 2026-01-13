/* KYNAR UNIVERSE CORE ENGINE (js/app.js)
   The central nervous system. Handles Atmosphere, Motion, and System Feedback.
   Status: FINAL MASTER (REMIX ICON ALIGNED)
*/

import { KYNAR_DATA } from './data.js';
import { Analytics } from './analytics.js'; 

// CRITICAL: Make Analytics global so HTML files can use it (e.g. onclick="Analytics.track...")
window.Analytics = Analytics;

document.addEventListener('DOMContentLoaded', () => {
  injectIconSystem(); // Visuals (Fallback)
  initLoreSystem();   // Narrative
  initMotionSystem(); // Cinematic Feel
  initScrollProgress(); // Add scroll indicator
  initThemeSystem();  // Atmosphere
  initLazyImages();
  initImageErrorHandling();
});

/* =========================================
   0. ICON SYSTEM INJECTOR (REMIX ICONS)
   Ensures the visual language is always present.
   ========================================= */
function injectIconSystem() {
  if (document.querySelector('link[href*="remixicon"]')) return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css';
  document.head.appendChild(link);
}

/* =========================================
   1. THE LORE SYSTEM
   Pulls from KYNAR_DATA to inject the "Whispers" into the footer.
   ========================================= */
function initLoreSystem() {
  const body = document.body;
  let currentTheme = body.getAttribute('data-theme') || 'home';
  if (currentTheme === 'home-category') currentTheme = 'home';
  if (currentTheme === 'hub') currentTheme = 'general';
  
  const footerLore = document.querySelector('.text-lore');
  
  if (footerLore && KYNAR_DATA && KYNAR_DATA.lore) {
    const themePhrases = KYNAR_DATA.lore[currentTheme] || [];
    const globalPhrases = KYNAR_DATA.lore.general || []; 
    const combinedPool = [...themePhrases, ...globalPhrases];
    
    if (combinedPool.length > 0) {
      const randomPhrase = combinedPool[Math.floor(Math.random() * combinedPool.length)];
      footerLore.textContent = `"${randomPhrase}"`;
    }
  }
}

/* =========================================
   2. THE MOTION SYSTEM
   Handles the "Waterfall" reveal effect.
   ========================================= */
function initMotionSystem() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.card, .text-body, section, h2, header, .animate-enter');
  
  animatedElements.forEach((el, index) => {
    el.classList.add('scroll-fade-item');
    const delay = Math.min((index % 5) * 50, 500); 
    el.style.transitionDelay = `${delay}ms`; 
    observer.observe(el);
  });
}

/* =========================================
   2B. SCROLL PROGRESS INDICATOR
   ========================================= */
function initScrollProgress() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });
}

/* =========================================
   3. SYSTEM FEEDBACK (Toasts)
   REMIX ICON UPDATED
   ========================================= */
function showToast(message, type = 'normal') {
  let container = document.querySelector('.toast-container');
  
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast animate-enter';
  
  // REMIX ICONS MAPPING
  let icon = '<i class="ri-information-line"></i>';
  if (type === 'success') {
    icon = '<i class="ri-checkbox-circle-line" style="color:var(--color-success)"></i>';
  } else if (type === 'error') {
    icon = '<i class="ri-error-warning-line" style="color:var(--color-error)"></i>';
  } else if (type === 'starwalker') {
    icon = '<i class="ri-shining-2-line" style="color:var(--accent-primary)"></i>';
  }
  
  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" class="btn-tertiary" style="padding: 4px 8px; margin-left: auto;">
      <i class="ri-close-line" style="font-size: 0.9rem;"></i>
    </button>
  `;
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '12px';
  
  container.appendChild(toast);
  
  // Auto-dismiss
  const dismissTime = 3000;
  
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: var(--accent-primary);
    width: 100%;
    opacity: 0.5;
    transition: width ${dismissTime}ms linear;
  `;
  toast.style.position = 'relative';
  toast.appendChild(progressBar);
  
  requestAnimationFrame(() => {
    progressBar.style.width = '0%';
  });
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, dismissTime);
}

// Make showToast global too, just in case
window.showToast = showToast;

/* =========================================
   4. ATMOSPHERE SYSTEM (Themes)
   ========================================= */
function initThemeSystem() {
  const savedMode = localStorage.getItem('kynar_mode');
  if (savedMode) {
    document.documentElement.setAttribute('data-mode', savedMode);
  }
}

function setTheme(mode) {
  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-mode');
    localStorage.removeItem('kynar_mode');
    showToast('System atmosphere synced.');
  } else {
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('kynar_mode', mode);
    
    // Safely call analytics if available
    if (typeof Analytics !== 'undefined') Analytics.trackThemeChange(mode);

    if (mode === 'starwalker') {
      showToast('Starwalker Mode Engaged.', 'starwalker');
    } else if (mode === 'light') {
      showToast('Daylight atmosphere applied.');
    } else {
      showToast('Midnight atmosphere applied.');
    }
  }
}

window.setTheme = setTheme;

/* =========================================
   5. SERVICE WORKER REGISTRATION
   ========================================= */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        // console.log('[Universe] Service Worker registered');
      })
      .catch(error => {
        // console.log('[Universe] SW failed:', error);
      });
  });
}

/* =========================================
   IMAGE LAZY LOADING
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

/* =========================================
   IMAGE ERROR HANDLING (REMIX ICON UPDATED)
   ========================================= */
function initImageErrorHandling() {
  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
      e.target.style.display = 'none';
      
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      placeholder.innerHTML = `
        <div style="
          width: 100%;
          aspect-ratio: 16/9;
          background: var(--bg-surface);
          border: 1px dashed var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 8px;
        ">
          <i class="ri-image-2-line" style="font-size: 2rem; opacity: 0.3;"></i>
          <span class="text-micro" style="opacity: 0.5;">Image unavailable</span>
        </div>
      `;
      
      e.target.parentNode.insertBefore(placeholder, e.target);
    }
  }, true);
}
