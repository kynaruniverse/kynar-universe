/* ASTRYX ENGINE (js/app.js)
   Handles Lore injection, Scroll Motion, and Global interactions.
*/

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

/* 1. THE LORE SYSTEM */
const LORE_LIBRARY = {
  global: [
    "The path continues.",
    "This space is yours.",
    "Built for the journey.",
    "Every corner has a story."
  ],
  tools: [
    "Every tool is a small spark.",
    "Clear tools, brighter paths.",
    "Optimize your world."
  ],
  living: [
    "Here's where your story grows.",
    "Breathe. Create. Live.",
    "Small steps matter."
  ],
  home: [
    "This space is yours.",
    "Warmth in every corner.",
    "Simple days, quiet nights."
  ],
  accounts: [
    "Welcome back, traveler.",
    "Your collections are safe here.",
    "The Archive remembers."
  ],
  about: [
    "A world built with care.",
    "Human by design.",
    "It started with a belief."
  ]
};

function initLoreSystem() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme') || 'home';
  let visitCount = localStorage.getItem('astryx_visits') || 0;
  
  if (currentTheme !== 'home') { // Don't count internal clicks as new "visits" logic if not desired, but usually fine
     // logic kept simple
  }
  
  const footerLore = document.querySelector('footer p');
  
  if (footerLore) {
    const themePhrases = LORE_LIBRARY[currentTheme] || [];
    const globalPhrases = LORE_LIBRARY.global;
    const combinedPool = [...themePhrases, ...globalPhrases];
    const randomPhrase = combinedPool[Math.floor(Math.random() * combinedPool.length)];
    footerLore.textContent = randomPhrase;
  }
}

/* 2. THE MOTION SYSTEM */
function initMotionSystem() {
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.card, .text-body, section, h2, header');
  
  animatedElements.forEach((el, index) => {
    el.classList.add('scroll-fade-item');
    el.style.transitionDelay = `${index * 50}ms`; 
    observer.observe(el);
  });
}

/* =========================================
   3. TOAST SYSTEM
   "Soft feedback."
   ========================================= */
function showToast(message, type = 'normal') {
  // 1. Create Container if it doesn't exist
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // 2. Create Toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  // Optional: Add icon based on type
  let icon = type === 'success' ? '<i class="ph ph-check-circle" style="color:var(--pal-living-green)"></i>' : 
             type === 'error' ? '<i class="ph ph-warning-circle" style="color:#ff6b6b"></i>' : '';

  toast.innerHTML = `${icon}<span>${message}</span>`;

  // 3. Add to screen
  container.appendChild(toast);

  // 4. Remove after 3 seconds
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
  // 1. Check LocalStorage
  const savedMode = localStorage.getItem('astryx_mode');
  if (savedMode) {
    document.documentElement.setAttribute('data-mode', savedMode);
  }
}

function setTheme(mode) {
  // mode = 'light', 'dark', 'auto', or 'starwalker'
  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-mode');
    localStorage.removeItem('astryx_mode');
    showToast('System theme applied.');
  } else {
    document.documentElement.setAttribute('data-mode', mode);
    localStorage.setItem('astryx_mode', mode);
    
    // Lore Whisper for Starwalker
    if (mode === 'starwalker') {
      showToast('✨ Starwalker Mode Unlocked', 'success');
    } else {
      showToast(`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode active.`);
    }
  }
}
// Export for buttons
window.setTheme = setTheme;
