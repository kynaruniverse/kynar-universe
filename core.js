/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR MARKETPLACE CORE (V1.0)
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

  // 2. NAVIGATION & SMART HEADER
  initNavigation() {
    const trigger = document.getElementById("nav-toggle");
    const drawer = document.getElementById("nav-drawer");
    const backdrop = document.getElementById("nav-backdrop");
    const closeBtn = document.getElementById("close-nav");

    if (!trigger || !drawer) return;

    const openMenu = () => {
      drawer.classList.add("is-open");
      if (backdrop) backdrop.classList.add("is-visible");
      document.body.style.overflow = "hidden";
      const progress = document.getElementById('scroll-indicator');
      if (progress) progress.style.opacity = '0';
    };

    const closeMenu = () => {
      drawer.classList.remove("is-open");
      if (backdrop) backdrop.classList.remove("is-visible");
      document.body.style.overflow = "";
      const progress = document.getElementById('scroll-indicator');
      if (progress) progress.style.opacity = '1';
    };

    trigger.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (backdrop) backdrop.addEventListener("click", closeMenu);
    
    // Smart Header Logic
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.app-header');
      if (!header) return;
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
      lastScrollY = window.scrollY;
    }, { passive: true });
  },

  // 3. ACCOUNT MODALS
  initModals() {
    document.body.addEventListener("click", (e) => {
      if (e.target.closest(".trigger-access")) {
        e.preventDefault();
        this.openAuthModal();
      }
    });

    const overlay = document.getElementById("modal-overlay");
    const closeBtn = document.getElementById("close-access");

    if (overlay) {
      const closeModal = () => {
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
      };
      if (closeBtn) closeBtn.addEventListener("click", closeModal);
      overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
    }
  },

  openAuthModal() {
    const overlay = document.getElementById("modal-overlay");
    if (overlay) {
      overlay.style.visibility = "visible";
      overlay.style.opacity = "1";
    }
  }
};

// 4. INITIALIZATION
document.addEventListener("DOMContentLoaded", async () => {
  await KynarCore.loadComponents();
  KynarCore.initNavigation();
  KynarCore.initModals();

  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-indicator';
  document.body.appendChild(progressBar);

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
});

window.KynarCore = KynarCore;
window.ForgeCore = KynarCore; // Bridge
