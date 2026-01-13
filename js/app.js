/* KYNAR UNIVERSE CORE ENGINE (js/app.js)
   The central nervous system. Handles Atmosphere, Motion, and System Feedback.
   Status: FINAL MASTER (Aligned with "Grand Vision" & "No Digital Filler")
*/

import { KYNAR_DATA } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  injectIconSystem(); // Visuals
  initLoreSystem();   // Narrative
  initMotionSystem(); // Cinematic Feel
  initThemeSystem();  // Atmosphere
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
  toast.className = 'toast animate-enter'; // Reuse animation class
  
  // Icon Mapping based on Tokens
  let icon = '<i class="ph ph-info"></i>'; // Default
  if (type === 'success') {
      icon = '<i class="ph ph-check-circle" style="color:var(--color-success)"></i>';
  } else if (type === 'error') {
      icon = '<i class="ph ph-warning-circle" style="color:var(--color-error)"></i>';
  } else if (type === 'starwalker') {
      icon = '<i class="ph ph-star-four" style="color:var(--accent-primary)"></i>';
  }

  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  // Auto-Dismiss Logic
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    // Remove from DOM after transition
    setTimeout(() => toast.remove(), 300); 
  }, 3000);
}

// Expose to window so inline HTML (buttons) can call it
window.showToast = showToast;

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
   6. PERFORMANCE MONITORING
   Tracks real user metrics for optimization
   ========================================= */
window.addEventListener('load', () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const perfData = performance.getEntriesByType('navigation')[0];
    
    if (perfData) {
      const metrics = {
        dns: Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
        tcp: Math.round(perfData.connectEnd - perfData.connectStart),
        ttfb: Math.round(perfData.responseStart - perfData.requestStart),
        download: Math.round(perfData.responseEnd - perfData.responseStart),
        domReady: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
        load: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
        total: Math.round(perfData.loadEventEnd - perfData.fetchStart)
      };
      
      console.log('[Universe] Performance Metrics:', metrics);
      
      // Optional: Send to analytics
      // You can add Google Analytics or Plausible here later
      if (window.gtag) {
        gtag('event', 'timing_complete', {
          name: 'load',
          value: metrics.total,
          event_category: 'Performance'
        });
      }
    }
  }
});