/* KYNAR ENGINE (js/app.js)
   The internal code engine powering Kynar Universe.
   Handles Lore injection, Motion, and Global interactions.
   Status: FINAL MASTER (Aligned with Data Engine & Business Vision)
*/

import { KYNAR_DATA } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  injectIconSystem();
  initLoreSystem();
  initMotionSystem();
  initThemeSystem();
});

/* =========================================
   0. ICON SYSTEM INJECTOR
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
   Pulls from KYNAR_DATA in data.js (Single Source of Truth)
   "A whisper, not a shout."
   ========================================= */
function initLoreSystem() {
  const body = document.body;
  
  // MAPPING FIX: 'home-category' theme (Family) shares lore with 'home'
  let currentTheme = body.getAttribute('data-theme') || 'home';
  if (currentTheme === 'home-category') currentTheme = 'home';
  
  // Storage: Align with Business Name (Kynar)
  let visitCount = localStorage.getItem('kynar_visits') || 0;
  
  const footerLore = document.querySelector('footer p');
  
  // Ensure data exists before trying to access it
  if (footerLore && KYNAR_DATA && KYNAR_DATA.lore) {
    const themePhrases = KYNAR_DATA.lore[currentTheme] || [];
    // Note: 'general' key matches the structure in data.js
    const globalPhrases = KYNAR_DATA.lore.general || []; 
    
    const combinedPool = [...themePhrases, ...globalPhrases];
    
    if (combinedPool.length > 0) {
      const randomPhrase = combinedPool[Math.floor(Math.random() * combinedPool.length)];
      footerLore.textContent = randomPhrase;
    }
  }
}

/* =========================================
   2. THE MOTION SYSTEM
   ========================================= */
function initMotionSystem() {
  // Accessibility: Respect reduced motion preference
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

  // Targeted elements for "Warm Guidance" reveal
  const animatedElements = document.querySelectorAll('.card, .text-body, section, h2, header');
  
  animatedElements.forEach((el, index) => {
    el.classList.add('scroll-fade-item');
    // Stagger delay based on index for "waterfall" effect (capped to avoid long waits)
    el.style.transitionDelay = `${(index % 5) * 50}ms`; 
    observer.observe(el);
  });
}

/* =========================================
   3. TOAST SYSTEM
   "Soft feedback."
   ========================================= */
function showToast(message, type = 'normal') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  // ALIGNMENT: Use Token Colors defined in tokens.css
  let icon = '';
  if (type === 'success') {
      icon = '<i class="ph ph-check-circle" style="color:var(--color-success)"></i>';
  } else if (type === 'error') {
      icon = '<i class="ph ph-warning-circle" style="color:var(--color-error)"></i>';
  } else if (type === 'info') {
      icon = '<i class="ph ph-info" style="color:var(--color-info)"></i>';
  }

  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('leaving');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3000);
}

// Make it globally available so buttons can call it
window.showToast = showToast;

/* =========================================
   4. THEME SYSTEM
   "Let the user feel ownership."
   ========================================= */
function initThemeSystem() {
  // ALIGNMENT: Use 'kynar_mode' to match business identity
  const savedMode = localStorage.getItem('kynar_mode');
  if (savedMode) {
    document.documentElement.setAttribute('data-mode', savedMode);
  }
}

function setTheme(mode) {
  // mode = 'light', 'dark', 'auto', or 'starwalker'
  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-mode');
    localStorage.removeItem('kynar_mode');
    showToast('System theme applied.');
  } else {
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('kynar_mode', mode);
    
    // Lore Whisper for Starwalker (Premium Tier)
    if (mode === 'starwalker') {
      showToast('✨ Starwalker Mode Unlocked', 'success');
    } else {
      showToast(`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode active.`);
    }
  }
}
window.setTheme = setTheme;
