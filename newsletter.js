/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: CLEARVIEW NEWSLETTER LOGIC (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Manages newsletter subscriptions, simulates social proof 
 * subscriber activity, and unlocks free product downloads.
 */

document.addEventListener("DOMContentLoaded", () => {
  // #region [ 1. SUBSCRIBER COUNTER (SOCIAL PROOF) ]

  /**
   * Simulates a live counter of members currently active.
   */
  const strengthEl = document.getElementById("signal-strength");
  let subscribers = 1420;

  if (strengthEl) {
    strengthEl.textContent = subscribers.toLocaleString();

    // Dynamic update loop
    setInterval(() => {
      if (Math.random() > 0.7) {
        subscribers++;

        strengthEl.style.opacity = "0";
        setTimeout(() => {
          strengthEl.textContent = subscribers.toLocaleString();
          strengthEl.style.opacity = "1";
        }, 200);
      }
    }, 5000);
  }

  // #endregion

  // #region [ 2. SUBSCRIPTION HANDLER ]

  const form = document.getElementById("signal-form");
  const btn = document.getElementById("btn-signal");
  const emailInput = document.getElementById("email");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // --- UI: Loading State ---
      btn.disabled = true;
      btn.innerHTML = `
        <span class="spinner" style="
            width:16px; 
            height:16px; 
            border:2px solid white; 
            border-top-color:transparent; 
            border-radius:50%; 
            display:inline-block; 
            animation:spin 1s linear infinite; 
            margin-right:8px; 
            vertical-align:middle;">
        </span> Joining Newsletter...`;
      btn.style.opacity = "0.8";

      // --- Logic: Simulate Network Request ---
      setTimeout(() => {
        const email = emailInput.value;

        // Unlock Free Products
        localStorage.setItem("kynar_signal_token", "active");

        // --- UI: Success State ---
        btn.innerHTML = `✔ Subscription Active`;
        btn.style.background = "#10B981"; 
        btn.style.color = "white";

        if (window.Haptics) window.Haptics.success();

        // --- Logic: Success Flow ---
        setTimeout(() => {
          alert(
            `Welcome, ${email}. Your free downloads are now unlocked.`
          );
          window.location.href = "shop.html";
        }, 800);
      }, 1500);
    });
  }

  // #endregion

  // #region [ 3. SPINNER ANIMATION ]
  if (!document.getElementById("signal-css")) {
    const style = document.createElement("style");
    style.id = "signal-css";
    style.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }
  // #endregion
});
