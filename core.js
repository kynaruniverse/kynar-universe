/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR MARKETPLACE CORE (V1.3 - MASTER SYNC)
 * ══════════════════════════════════════════════════════════════════════════
 */

const KynarCore = {
  // 1. COMPONENT LOADER
  async loadComponents() {
    const elements = document.querySelectorAll("[data-include]");
    const promises = Array.from(elements).map(async (el) => {
      const file = el.dataset.include;
      try {
        const response = await fetch(file);
        if (response.ok) {
          const html = await response.text();
          el.innerHTML = html;
          this.executeScripts(el);
          
          if (file.includes("header")) document.dispatchEvent(new Event("KynarHeaderLoaded"));
          if (file.includes("modals")) document.dispatchEvent(new Event("KynarModalsLoaded"));
        }
      } catch (err) {
        console.error(`Kynar: Error loading ${file}`, err);
      }
    });
    await Promise.all(promises);
  },

  executeScripts(container) {
    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  },

  // 2. GLOBAL INTERACTION ENGINE
  initInteractions() {
    document.body.addEventListener("click", (e) => {
      
      // --- A. NAVIGATION DRAWER ---
      if (e.target.closest("#nav-toggle")) {
        this.toggleMenu(true);
      }
      if (e.target.closest("#close-nav") || e.target.id === "nav-backdrop") {
        this.toggleMenu(false);
      }

      // --- B. AUTH MODALS ---
      if (e.target.closest(".trigger-access")) {
        e.preventDefault();
        this.toggleMenu(false); // Close nav if open
        this.openAuthModal();
      }
      const overlay = document.getElementById("modal-overlay");
      if (e.target === overlay || e.target.id === "close-access") {
        this.closeAuthModal();
      }

      // --- C. CART DRAWER (Master Sync) ---
      if (e.target.closest("#cart-trigger")) {
        e.preventDefault();
        this.toggleMenu(false); // Close nav if open
        if (window.KynarCart) window.KynarCart.openDrawer();
      }
      
      // FIXED: Specifically listen for the Cart Close Button and Backdrop
      if (e.target.closest("#close-drawer") || e.target.id === "cart-drawer-backdrop") {
        if (window.KynarCart) window.KynarCart.closeDrawer();
      }
    });

    // Smart Header Logic
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.app-header');
      if (!header || document.body.style.overflow === "hidden") return;
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
      lastScrollY = window.scrollY;
    }, { passive: true });
  },

  // 3. UI STATE CONTROLLERS
  toggleMenu(isOpen) {
    const drawer = document.getElementById("nav-drawer");
    const backdrop = document.getElementById("nav-backdrop");
    if (!drawer) return;

    if (isOpen) {
      drawer.classList.add("is-open");
      if (backdrop) backdrop.classList.add("is-visible");
      document.body.style.overflow = "hidden";
    } else {
      drawer.classList.remove("is-open");
      if (backdrop) backdrop.classList.remove("is-visible");
      document.body.style.overflow = "";
    }
  },

  openAuthModal() {
    const overlay = document.getElementById("modal-overlay");
    if (overlay) {
      overlay.classList.add("is-visible");
      document.body.style.overflow = "hidden";
      if (window.Haptics) window.Haptics.medium();
    }
  },

  closeAuthModal() {
    const overlay = document.getElementById("modal-overlay");
    if (overlay) {
      overlay.classList.remove("is-visible");
      document.body.style.overflow = "";
    }
  }
};

// 4. INITIALIZATION
document.addEventListener("DOMContentLoaded", async () => {
  await KynarCore.loadComponents();
  KynarCore.initInteractions();

  // Scroll Indicator
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-indicator';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + "%";
  }, { passive: true });
});

window.KynarCore = KynarCore;
