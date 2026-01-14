/* KYNAR UNIVERSE CORE ENGINE (js/app.js)
   The central nervous system. Handles Atmosphere, Motion, and System Feedback.
   Status: EVOLVED MASTER (Performance Optimized + Fault Tolerant)
*/

// SAFELY IMPORT MODULES
let KYNAR_DATA = {};
let Analytics = { trackThemeChange: () => {} }; // Dummy fallback

try {
  const dataModule = await import('./data.js');
  KYNAR_DATA = dataModule.KYNAR_DATA || {};
} catch (e) { console.warn('Universe Data Missing - Lore System Disabled'); }

try {
  const analyticsModule = await import('./analytics.js');
  Analytics = analyticsModule.Analytics || Analytics;
} catch (e) { console.warn('Analytics Module Missing - Tracking Disabled'); }

// CRITICAL GLOBAL EXPOSURE (For HTML onclick events)
window.Analytics = Analytics;

document.addEventListener('DOMContentLoaded', () => {
  injectIconSystem();   // Visuals
  initLoreSystem();     // Narrative
  initMotionSystem();   // Cinematic Feel
  initScrollProgress(); // Performance-Optimized Scroll Bar
  initThemeSystem();    // Atmosphere
  initLazyImages();     // Speed
  initImageErrorHandling(); // Resilience
  // Personalized Greeting based on Onboarding Choice
const userPath = localStorage.getItem('kynar_user_path');
if (userPath) {
  const heroSpan = document.querySelector('.hero-logo-glow + h1 span'); 
  if (heroSpan) {
    // If they chose 'tools', emphasize 'Infinite Solutions' in their color
    heroSpan.style.color = `var(--accent-primary)`;
    console.log(`[Universe] Personalizing for path: ${userPath}`);
  }
}

});

/* =========================================
   0. ICON SYSTEM INJECTOR
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
   ========================================= */
function initLoreSystem() {
  const footerLore = document.querySelector('.text-lore');
  if (!footerLore || !KYNAR_DATA.lore) return;

  const body = document.body;
  let currentTheme = body.getAttribute('data-theme') || 'home';
  
  // Normalization logic
  if (currentTheme === 'home-category') currentTheme = 'home';
  if (currentTheme === 'hub') currentTheme = 'general';
  
  const themePhrases = KYNAR_DATA.lore[currentTheme] || [];
  const globalPhrases = KYNAR_DATA.lore.general || []; 
  const combinedPool = [...themePhrases, ...globalPhrases];
  
  if (combinedPool.length > 0) {
    const randomPhrase = combinedPool[Math.floor(Math.random() * combinedPool.length)];
    footerLore.textContent = `"${randomPhrase}"`;
    footerLore.style.opacity = '1'; // Ensure visibility
  }
}

/* =========================================
   2. THE MOTION SYSTEM (Waterfall Effect)
   Updated to support specific classes AND "data-animate" attribute.
   ========================================= */
function initMotionSystem() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.1, rootMargin: '50px' });

  // Select standard elements PLUS anything with data-animate="true"
  const elements = document.querySelectorAll('.card, .text-body, section, h2, header, .animate-enter, [data-animate]');
  
  elements.forEach((el, index) => {
    el.classList.add('scroll-fade-item');
    // Staggered delay for a natural "waterfall" feel
    // Capped at 300ms so the user doesn't wait too long
    const delay = Math.min((index % 5) * 50, 300); 
    el.style.transitionDelay = `${delay}ms`; 
    observer.observe(el);
  });
}

/* =========================================
   2B. SCROLL PROGRESS (High Performance)
   Uses requestAnimationFrame to prevent lag on 120Hz screens.
   ========================================= */
function initScrollProgress() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Create bar if it doesn't exist
  let progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
  }

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
  
  // Icon Mapping
  const icons = {
    normal: '<i class="ri-information-line"></i>',
    success: '<i class="ri-checkbox-circle-line" style="color:var(--color-success)"></i>',
    error: '<i class="ri-error-warning-line" style="color:var(--color-error)"></i>',
    starwalker: '<i class="ri-shining-2-line" style="color:var(--accent-primary)"></i>'
  };
  
  const iconHtml = icons[type] || icons.normal;
  
  toast.innerHTML = `
    ${iconHtml}
    <span>${message}</span>
    <button class="btn-tertiary close-toast" aria-label="Dismiss">
      <i class="ri-close-line"></i>
    </button>
  `;

  // Attach click listener for close button
  toast.querySelector('.close-toast').onclick = () => removeToast(toast);

  // Auto-Dismiss Bar
  const dismissTime = 3000;
  const timerBar = document.createElement('div');
  timerBar.className = 'toast-timer'; // Define styles in CSS for cleaner JS
  timerBar.style.cssText = `position:absolute; bottom:0; left:0; height:2px; background:var(--accent-primary); width:100%; opacity:0.5; transition:width ${dismissTime}ms linear;`;
  
  toast.appendChild(timerBar);
  container.appendChild(toast);
  
  // Trigger Animation
  requestAnimationFrame(() => { timerBar.style.width = '0%'; });
  setTimeout(() => removeToast(toast), dismissTime);
}

function removeToast(toast) {
  if (!toast) return;
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(10px)';
  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 300);
}

window.showToast = showToast;

/* =========================================
   4. ATMOSPHERE SYSTEM (Themes)
   ========================================= */
function initThemeSystem() {
  // We check for saved preference, but we DO NOT force it if it conflicts.
  const savedMode = localStorage.getItem('kynar_mode');
  if (savedMode) {
    document.documentElement.setAttribute('data-mode', savedMode);
  }
}

function setTheme(mode) {
  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-mode');
    localStorage.removeItem('kynar_mode');
    showToast('System synced to device.');
  } else {
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('kynar_mode', mode);
    
    // Analytics Tracking
    if (Analytics && typeof Analytics.trackThemeChange === 'function') {
      Analytics.trackThemeChange(mode);
    }

    // Feedback
    const messages = {
      starwalker: 'Starwalker Mode Engaged.',
      light: 'Daylight atmosphere applied.',
      dark: 'Midnight atmosphere applied.'
    };
    showToast(messages[mode] || 'Atmosphere updated.', mode === 'starwalker' ? 'starwalker' : 'normal');
  }
}

window.setTheme = setTheme;

/* =========================================
   5. SERVICE WORKER & UTILS
   ========================================= */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

function initLazyImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          obs.unobserve(entry.target);
        }
      });
    });
    images.forEach(img => observer.observe(img));
  } else {
    images.forEach(img => img.classList.add('loaded'));
  }
}

function initImageErrorHandling() {
  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
      e.target.style.display = 'none';
      // Create a subtle placeholder
      const p = document.createElement('div');
      p.className = 'image-placeholder';
      p.innerHTML = `<i class="ri-image-2-line"></i>`;
      e.target.parentNode.insertBefore(p, e.target);
    }
  }, true);
}
