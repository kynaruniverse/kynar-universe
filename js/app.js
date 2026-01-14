/* KYNAR UNIVERSE CORE ENGINE (js/app.js)
   The central nervous system. Handles Atmosphere, Motion, and System Feedback.
   Status: FINAL MASTER (Aligned with "Grand Vision" & "No Digital Filler")
*/

import { KYNAR_DATA } from './data.js';
import { Analytics } from './analytics.js';

document.addEventListener('DOMContentLoaded', () => {
  injectIconSystem(); // Visuals
  initLoreSystem();   // Narrative
  initMotionSystem(); // Cinematic Feel
  initScrollProgress(); // Add scroll indicator
  initThemeSystem();  // Atmosphere
  initLazyImages();
  initImageErrorHandling();
});

/* =========================================
   0. ICON SYSTEM INJECTOR
   Ensures the visual language (Phosphor Icons) is always present.
   ========================================= */
function injectIconSystem() {
  if (!document.getElementById('phosphor-icons')) {
    const script = document.createElement('script');
    script.id = 'phosphor-icons';
    script.src = 'https://unpkg.com/@phosphor-icons/web';
    script.async = true;
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
  // e.g., 'home-category' (Beige) uses the 'home' lore pool.
  let currentTheme = body.getAttribute('data-theme') || 'home';
  if (currentTheme === 'home-category') currentTheme = 'home';
  if (currentTheme === 'hub') currentTheme = 'general'; // Hub uses general wisdom
  
  const footerLore = document.querySelector('.text-lore');
  
  // Safety Check: Ensure the element and data exist
  if (footerLore && KYNAR_DATA && KYNAR_DATA.lore) {
    const themePhrases = KYNAR_DATA.lore[currentTheme] || [];
    const globalPhrases = KYNAR_DATA.lore.general || []; 
    
    // Mix specific theme lore with general universe lore for variety
    const combinedPool = [...themePhrases, ...globalPhrases];
    
    if (combinedPool.length > 0) {
      const randomPhrase = combinedPool[Math.floor(Math.random() * combinedPool.length)];
      // Inject with quotes for that "Whisper" effect
      footerLore.textContent = `"${randomPhrase}"`;
    }
  }
}

/* =========================================
   2. THE MOTION SYSTEM
   Handles the "Waterfall" reveal effect on page load.
   Aligned with: "Guided World" (Gentle, not jarring).
   ========================================= */
function initMotionSystem() {
  // Accessibility: Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Efficiency: Stop watching once visible
      }
    });
  }, observerOptions);

  // Targets: Cards, Text Blocks, Headers, Sections
  const animatedElements = document.querySelectorAll('.card, .text-body, section, h2, header, .animate-enter');
  
  animatedElements.forEach((el, index) => {
    el.classList.add('scroll-fade-item');
    // Logic: Stagger delay slightly for a premium "waterfall" feel
    // Cap it at 500ms so the user doesn't wait too long
    const delay = Math.min((index % 5) * 50, 500); 
    el.style.transitionDelay = `${delay}ms`; 
    observer.observe(el);
  });
}

/* =========================================
   2B. SCROLL PROGRESS INDICATOR
   Shows reading progress on long pages
   ========================================= */
function initScrollProgress() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  // Update on scroll
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
   "Soft feedback" for user actions (Save, Copy, Theme Change).
   ========================================= */
function showToast(message, type = 'normal') {
  let container = document.querySelector('.toast-container');
  
  // Create container if it doesn't exist yet
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast animate-enter';
  
  let icon = '<i class="ph ph-info"></i>';
  if (type === 'success') {
    icon = '<i class="ph ph-check-circle" style="color:var(--color-success)"></i>';
  } else if (type === 'error') {
    icon = '<i class="ph ph-warning-circle" style="color:var(--color-error)"></i>';
  } else if (type === 'starwalker') {
    icon = '<i class="ph ph-star-four" style="color:var(--accent-primary)"></i>';
  }
  
  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" class="btn-tertiary" style="padding: 4px 8px; margin-left: auto;">
      <i class="ph ph-x" style="font-size: 0.9rem;"></i>
    </button>
  `;
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '12px';
  
  container.appendChild(toast);
  
  // Auto-dismiss with visual countdown
  const dismissTime = 3000;
  let startTime = Date.now();
  
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
/* =========================================
   4. ATMOSPHERE SYSTEM (Themes)
   Handles Light, Dark, and the Secret "Starwalker" Mode.
   ========================================= */
function initThemeSystem() {
  const savedMode = localStorage.getItem('kynar_mode');
  
  // Apply saved preference immediately on load
  if (savedMode) {
    document.documentElement.setAttribute('data-mode', savedMode);
  }
}

function setTheme(mode) {
  // mode options: 'light', 'dark', 'auto', 'starwalker'
  
  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-mode');
    localStorage.removeItem('kynar_mode');
    showToast('System atmosphere synced.');
  } else {
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('kynar_mode', mode);
    Analytics.trackThemeChange(mode)
    // Feedback Logic
    if (mode === 'starwalker') {
      showToast('Starwalker Mode Engaged.', 'starwalker');
    } else if (mode === 'light') {
      showToast('Daylight atmosphere applied.');
    } else {
      showToast('Midnight atmosphere applied.');
    }
  }
}

// Expose to window so Settings Page and Header can call it
window.setTheme = setTheme;

/* =========================================
   5. SERVICE WORKER REGISTRATION
   Enables offline functionality and caching
   ========================================= */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('[Universe] Service Worker registered:', registration.scope);
      })
      .catch(error => {
        console.log('[Universe] Service Worker registration failed:', error);
      });
  });
}

/* =========================================
   IMAGE LAZY LOADING HANDLER
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
    // Fallback for older browsers
    images.forEach(img => img.classList.add('loaded'));
  }
}

/* =========================================
   IMAGE ERROR HANDLING
   Replaces broken images with placeholder
   ========================================= */
function initImageErrorHandling() {
  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
      e.target.style.display = 'none';
      
      // Create placeholder
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
          <i class="ph ph-image-broken" style="font-size: 2rem; opacity: 0.3;"></i>
          <span class="text-micro" style="opacity: 0.5;">Image unavailable</span>
        </div>
      `;
      
      e.target.parentNode.insertBefore(placeholder, e.target);
    }
  }, true);
}