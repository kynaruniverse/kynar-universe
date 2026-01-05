/* ==========================================================================
   KYNAR ENGINE v10.0 | OPERATIONS CORE
   Architecture: EventBus -> UI Shell -> System Logic
   ========================================================================== */
import { EventBus, EVENTS } from './src/core/events.js';
import { Logger } from './src/core/logger.js';
import { initCart } from './src/modules/cart.js';
import { initCheckout } from './src/modules/checkout.js';

/* --- BOOT SEQUENCE --- */
document.addEventListener("DOMContentLoaded", async () => {
  Logger.log("System: Engine Booting...");

  try {
    // 1. Initialize Sync Core
    initTheme();
    initCheckout();
    
    // 2. Load UI Shell (Critical Path)
    await Promise.all([
      loadComponent('global-header', 'components/header.html'),
      injectOverlays() 
    ]);

    // 3. Initialize UI-Dependent Modules
    initCart();
    initUIHandlers();
    setActiveNavigation(); // NEW: Highlights the current page in Nav
    
    // Non-critical load (Footer)
    await loadComponent('global-footer', 'components/footer.html'); 
    setActiveNavigation(); // Run again for footer links

  } catch (err) {
    console.error("CRITICAL SYSTEM FAILURE:", err);
    // Emergency Fallback: Force show content
    document.querySelectorAll('.reveal-up').forEach(el => el.classList.add('reveal-visible'));
  }

  // 4. Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .catch(err => console.error('SW Failed:', err));
  }
  
  Logger.log("System: Engine Online");
});

/* --- GLOBAL EVENT DELEGATION --- */
document.body.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-trigger]');
  if (trigger) {
    // Prevent default unless it's a specific link type
    if (trigger.tagName !== 'A' || trigger.dataset.trigger.includes('prevent')) {
       e.preventDefault();
    }
    const action = trigger.dataset.trigger;
    const payload = trigger.dataset.payload;
    
    // Haptic Feedback for Mobile
    if (navigator.vibrate) navigator.vibrate(10);
    
    EventBus.emit(action, payload);
  }
});

/* --- UI HANDLERS --- */
function initUIHandlers() {
  // 1. Directory (Menu) Toggle
  EventBus.on(EVENTS.MENU_TOGGLE, () => {
    document.getElementById('navOverlay')?.classList.toggle('active');
    const menuBtn = document.getElementById('menuTrigger');
    if (menuBtn) {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
    }
  });

  // 2. Search Overlay
  EventBus.on(EVENTS.SEARCH_TOGGLE, () => {
    const el = document.getElementById('searchOverlay');
    if(el) {
      el.classList.toggle('active');
      if (el.classList.contains('active')) setTimeout(() => el.querySelector('input').focus(), 100);
    }
  });

  // 3. Theme Tumbler
  EventBus.on(EVENTS.THEME_TOGGLE, () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('kynar_theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
  
  // 4. Product Modal / Navigation
  EventBus.on(EVENTS.MODAL_OPEN, (id) => window.location.href = `product.html?id=${id}`);
}

/* --- UTILITIES --- */
function initTheme() {
  const theme = localStorage.getItem('kynar_theme');
  if (theme === 'dark') document.body.classList.add('dark-mode');
}

// NEW: Automatically highlights the "Active" link in Nav/Footer
function setActiveNavigation() {
  const currentPath = window.location.pathname;
  // Get filename (e.g., 'shop.html' or 'index.html')
  const page = currentPath.split("/").pop() || 'index.html';

  document.querySelectorAll('a').forEach(link => {
    // If link href matches current page, add 'active' style (text-accent)
    if (link.getAttribute('href') === page) {
      link.classList.add('text-accent');
      link.style.opacity = '1';
    }
  });
}

async function injectOverlays() {
  try {
    // Prevent double injection
    if (document.getElementById('navOverlay')) return;
    
    const res = await fetch('components/overlays.html');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    document.body.insertAdjacentHTML('beforeend', html);
  } catch (err) {
    console.warn("Overlay Injection Failed:", err);
  }
}

async function loadComponent(elementId, path) {
  const el = document.getElementById(elementId);
  if (!el) return;
  try {
    const res = await fetch(path);
    if (res.ok) el.innerHTML = await res.text();
  } catch (err) {
    console.warn(`Failed to load ${path}`, err);
  }
}
