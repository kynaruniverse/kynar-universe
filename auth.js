/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR IDENTITY SERVICE (V2.0 - ROBUST SYNC)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Manages secure Firebase authentication via Event Delegation.
 */

import { auth, db } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const KynarAuth = (() => {
  
  // 1. INITIALIZATION
  function init() {
    monitorAuthState();
    bindGlobalEvents(); // New: Delegation Strategy
    console.log("Kynar Identity: System Active");
  }

  // 2. EVENT DELEGATION (The "Catch-All" Strategy)
  // This ensures buttons work even if modals.html loads late.
  function bindGlobalEvents() {
    
    // Listen for ANY form submit on the page
    document.addEventListener("submit", (e) => {
      if (e.target && e.target.id === "login-form") {
        handleLogin(e);
      }
      if (e.target && e.target.id === "register-form") {
        handleRegister(e);
      }
    });

    // Listen for logout click anywhere
    document.addEventListener("click", (e) => {
      // Handle ID or Class based logout buttons
      if (e.target && (e.target.id === "btn-logout" || e.target.closest("#btn-logout"))) {
        e.preventDefault();
        handleLogout();
      }
    });
  }

  // 3. AUTHENTICATION LOGIC
  async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;
    const btn = e.target.querySelector("button");

    setLoading(btn, true, "Authorizing...");

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      closeAuthInterface();
      if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(50);
    } catch (error) {
      console.error("Kynar Auth Error:", error);
      // Optional: Add a visual toast here instead of alert for better UX
      alert("Authorization Failed: " + cleanError(error.message));
      setLoading(btn, false, "Authorize Entry");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const pass = document.getElementById("reg-pass").value;
    const btn = e.target.querySelector("button");

    setLoading(btn, true, "Verifying Identity...");

    try {
      // 1. Create Auth User
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCred.user;

      // 2. Update Profile Display Name
      await updateProfile(user, { displayName: name });

      // 3. Create Merchant Database Entry
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        status: "verified", 
        tier: "standard", // Default tier
        joinedDate: new Date().toISOString(),
      });

      closeAuthInterface();
      if (window.navigator && window.navigator.vibrate) window.navigator.vibrate([50, 50, 100]);
    } catch (error) {
      console.error("Kynar Registration Error:", error);
      alert("Registration Failed: " + cleanError(error.message));
      setLoading(btn, false, "Initialize Account");
    }
  }

  async function handleLogout() {
    if (confirm("Terminate secure session?")) {
      try {
        await signOut(auth);
        localStorage.removeItem("kynar_auth_token");
        window.location.reload(); // Refresh to reset state
      } catch (error) {
        console.error("Logout Error:", error);
      }
    }
  }

  // 4. REACTIVE UI ENGINE
  function monitorAuthState() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        localStorage.setItem("kynar_auth_token", "active");
        updateAccountUI(user);
        
        // Broadcast Event for other modules (like Vault)
        document.dispatchEvent(new CustomEvent("KynarAuthChanged", { detail: { user } }));
      } else {
        localStorage.removeItem("kynar_auth_token");
        resetAccountUI();
        document.dispatchEvent(new CustomEvent("KynarAuthChanged", { detail: { user: null } }));
      }
    });
  }

  // Updates the Account Page UI (if present)
  function updateAccountUI(user) {
    const guestState = document.getElementById("state-guest");
    const userState = document.getElementById("state-user");
    const greeting = document.getElementById("user-greeting");
    const emailDisplay = document.getElementById("user-email-display");
    const avatar = document.getElementById("user-avatar-text");

    if (guestState && userState) {
      guestState.style.display = "none";
      userState.style.display = "block";
    }

    if (greeting) greeting.textContent = user.displayName || "Verified Member";
    if (emailDisplay) emailDisplay.textContent = `ID: ${user.email}`;
    if (avatar && user.displayName) avatar.textContent = user.displayName.charAt(0).toUpperCase();
  }

  function resetAccountUI() {
    const guestState = document.getElementById("state-guest");
    const userState = document.getElementById("state-user");

    if (guestState && userState) {
      guestState.style.display = "flex"; // or block depending on layout
      userState.style.display = "none";
    }
  }

  // 5. UTILITIES
  function closeAuthInterface() {
    // Utilize the helper we defined in modals.html
    if (window.KynarCore && window.KynarCore.closeAuthModal) {
      window.KynarCore.closeAuthModal();
    } else {
      // Fallback: Remove class manually
      const overlay = document.getElementById("modal-overlay");
      if (overlay) overlay.classList.remove('is-visible');
      document.body.style.overflow = '';
    }
  }

  function setLoading(btn, isLoading, text) {
    if (isLoading) {
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner" style="width:16px; height:16px; border-top-color:white; border-left-color: rgba(255,255,255,0.3); margin-right:8px; display:inline-block;"></span> ${text}`;
      btn.style.opacity = "0.8";
    } else {
      btn.disabled = false;
      btn.textContent = text;
      btn.style.opacity = "1";
    }
  }

  function cleanError(msg) {
    return msg.replace("Firebase: ", "").replace("auth/", "").replace(/-/g, " ");
  }

  return { init };
})();

// Start Engine
KynarAuth.init();
