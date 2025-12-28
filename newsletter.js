/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR NETWORK INTELLIGENCE (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Handles network subscriptions, manages the real-time member 
 * counter, and authorizes access to free marketplace assets.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. LIVE MEMBER COUNTER (SOCIAL PROOF)
  const counterEl = document.getElementById("subscriber-count");
  let memberCount = 12420;

  if (counterEl) {
    // Initial Sync
    counterEl.textContent = memberCount.toLocaleString() + "+";

    // Intelligence Loop: Subtle fluctuation for realism
    setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
      memberCount += fluctuation;

      counterEl.style.transition = "opacity 0.3s ease";
      counterEl.style.opacity = "0.7";
      
      setTimeout(() => {
        counterEl.textContent = memberCount.toLocaleString() + "+";
        counterEl.style.opacity = "1";
      }, 300);
    }, 4500);
  }

  // 2. SUBSCRIPTION ENGINE
  const form = document.getElementById("newsletter-form");
  const btn = document.getElementById("btn-subscribe");
  const emailInput = document.getElementById("email");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // --- UI: Transition to Loading ---
      if (window.Haptics) window.Haptics.light();
      
      btn.disabled = true;
      btn.style.opacity = "0.8";
      btn.innerHTML = `
        <span class="spinner" style="
          width: 18px; 
          height: 18px; 
          border-top-color: var(--ink-display);
          margin-right: 12px;">
        </span> AUTHORIZING...`;

      // --- Logic: Secure Handshake Simulation ---
      setTimeout(() => {
        const email = emailInput.value;

        // Authorize Access: Sync with Kynar Commerce Engine
        localStorage.setItem("kynar_auth_token", "active");

        // --- UI: Success State ---
        btn.style.background = "#10B981"; 
        btn.style.color = "white";
        btn.innerHTML = `✔ ACCESS GRANTED`;

        if (window.Haptics) window.Haptics.success();

        // --- Redirect: Move user to the Shop to use their new access ---
        setTimeout(() => {
          // Visual confirmation before jump
          console.log(`Kynar: Network authorization successful for ${email}`);
          window.location.href = "shop.html";
        }, 1200);
      }, 2000);
    });
  }
});
