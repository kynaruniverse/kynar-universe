/* ASTRYX ENGINE (js/app.js)
   Handles Lore injection, Scroll Motion, and Global interactions.
*/

document.addEventListener('DOMContentLoaded', () => {
  initLoreSystem();
  initMotionSystem();
});

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
