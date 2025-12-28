/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR IDENTITY SERVICE (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Manages secure Firebase authentication, account persistence,
 * and real-time UI synchronization for the member dashboard.
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
    // Sync with KynarCore's dynamic loading
    document.addEventListener("KynarModalsLoaded", () => setupListeners());

    // Instant check for static pages
    if (document.getElementById("modal-overlay")) setupListeners();

    monitorAuthState();
    console.log("Kynar Identity: System Active");
  }

  function setupListeners() {
    const loginForm = document.getElementById("login-form");
    const regForm = document.getElementById("register-form");
    const logoutBtn = document.getElementById("btn-logout");

    if (loginForm) loginForm.addEventListener("submit", handleLogin);
    if (regForm) regForm.addEventListener("submit", handleRegister);
    if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
  }

  // 2. AUTHENTICATION LOGIC
  async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;
    const btn = e.target.querySelector("button");

    setLoading(btn, true, "Authorizing...");

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      closeModal();
      if (window.Haptics) window.Haptics.success();
    } catch (error) {
      console.error("Kynar Auth Error:", error);
      alert("Authorization Failed: " + error.message);
      setLoading(btn, false, "Sign In");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const pass = document.getElementById("reg-pass").value;
    const btn = e.target.querySelector("button");

    setLoading(btn, true, "Verifying...");

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCred.user;

      await updateProfile(user, { displayName: name });

      // Create Merchant-Standard Database Entry
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        status: "verified", 
        joinedDate: new Date().toISOString(),
      });

      closeModal();
      if (window.Haptics) window.Haptics.success();
    } catch (error) {
      console.error("Kynar Registration Error:", error);
      alert("Registration Failed: " + error.message);
      setLoading(btn, false, "Create Account");
    }
  }

  async function handleLogout() {
    if (confirm("Terminate secure session?")) {
      try {
        await signOut(auth);
        localStorage.removeItem("kynar_auth_token");
        window.location.reload();
      } catch (error) {
        console.error("Logout Error:", error);
      }
    }
  }

  // 3. REACTIVE UI ENGINE
  function monitorAuthState() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        localStorage.setItem("kynar_auth_token", "active");
        updateAccountUI(user);
      } else {
        localStorage.removeItem("kynar_auth_token");
        resetAccountUI();
      }
    });
  }

  function updateAccountUI(user) {
    const guestState = document.getElementById("state-guest");
    const userState = document.getElementById("state-user");
    const greeting = document.getElementById("user-greeting");
    const emailDisplay = document.getElementById("user-email-display");

    if (guestState && userState) {
      guestState.style.display = "none";
      userState.style.display = "block";
    }

    if (greeting) greeting.textContent = user.displayName || "Verified Member";
    if (emailDisplay) emailDisplay.textContent = `Member ID: ${user.email}`;
  }

  function resetAccountUI() {
    const guestState = document.getElementById("state-guest");
    const userState = document.getElementById("state-user");

    if (guestState && userState) {
      guestState.style.display = "flex";
      userState.style.display = "none";
    }
  }

  // 4. UTILITIES
  function closeModal() {
    if (window.KynarCore) {
      const overlay = document.getElementById("modal-overlay");
      if (overlay) {
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
      }
    }
  }

  function setLoading(btn, isLoading, text) {
    if (isLoading) {
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner" style="width:16px; height:16px; border-top-color:white; margin-right:8px;"></span> ${text}`;
      btn.style.opacity = "0.8";
    } else {
      btn.disabled = false;
      btn.textContent = text;
      btn.style.opacity = "1";
    }
  }

  return { init };
})();

KynarAuth.init();
