/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: CLEARVIEW AUTH SYSTEM (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Manages Firebase authentication, account persistence,
 * and reactive UI updates for the customer dashboard.
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

const AuthSystem = (() => {
  
  /**
   * Initializes the Auth System.
   */
  function init() {
    // Listen for the global "Modals Loaded" event from core.js
    document.addEventListener("KynarModalsLoaded", () => {
      setupListeners();
    });

    // Fallback: Run if modals are already present
    if (document.getElementById("modal-overlay")) {
      setupListeners();
    }

    // Start Firebase Listener
    monitorAuthState();

    console.log("Kynar Auth: Online");
  }

  /**
   * Binds DOM event listeners to the sign-in/register forms.
   */
  function setupListeners() {
    const loginForm = document.getElementById("login-form");
    const regForm = document.getElementById("register-form");
    const logoutBtn = document.getElementById("btn-logout");

    if (loginForm) loginForm.addEventListener("submit", handleLogin);
    if (regForm) regForm.addEventListener("submit", handleRegister);
    if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
  }

  /**
   * Handles user sign-in.
   */
  async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;
    const btn = e.target.querySelector("button");

    setLoading(btn, true, "Signing In...");

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      closeModal();
      if (window.Haptics) window.Haptics.success();
    } catch (error) {
      console.error(error);
      alert("Sign In Failed: " + error.message);
      setLoading(btn, false, "Sign In");
    }
  }

  /**
   * Handles new account registration.
   */
  async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const pass = document.getElementById("reg-pass").value;
    const btn = e.target.querySelector("button");

    setLoading(btn, true, "Creating Account...");

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      const user = userCred.user;

      await updateProfile(user, { displayName: name });

      // Create Database Entry
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        tier: "member", 
        createdAt: new Date().toISOString(),
      });

      closeModal();
      if (window.Haptics) window.Haptics.success();
    } catch (error) {
      console.error(error);
      alert("Registration Failed: " + error.message);
      setLoading(btn, false, "Create Account");
    }
  }

  /**
   * Handles Sign Out.
   */
  async function handleLogout() {
    if (confirm("Sign out of your account?")) {
      try {
        await signOut(auth);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * Monitors Auth State.
   */
  function monitorAuthState() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        localStorage.setItem("kynar_auth_token", "active");
        updateAccountUI(user);
      } else {
        localStorage.removeItem("kynar_signal_token");
        resetAccountUI();
      }
    });
  }

  /**
   * Updates UI for logged-in users.
   */
  function updateAccountUI(user) {
    const guestState = document.getElementById("state-guest");
    const userState = document.getElementById("state-user");
    const greeting = document.getElementById("user-greeting");
    const emailDisplay = document.getElementById("user-email-display");

    if (guestState && userState) {
      guestState.style.display = "none";
      userState.style.display = "block";
      setTimeout(() => { userState.style.opacity = "1"; }, 50);
    }

    if (greeting) greeting.textContent = user.displayName || "Member";
    if (emailDisplay) emailDisplay.textContent = user.email;
  }

  /**
   * Resets UI for guests.
   */
  function resetAccountUI() {
    const guestState = document.getElementById("state-guest");
    const userState = document.getElementById("state-user");

    if (guestState && userState) {
      guestState.style.display = "flex";
      userState.style.display = "none";
    }
  }

  function closeModal() {
    const overlay = document.getElementById("modal-overlay");
    if (overlay) {
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
    }
  }

  function setLoading(btn, isLoading, text) {
    if (isLoading) {
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner"></span> ${text}`;
      btn.style.opacity = "0.7";
    } else {
      btn.disabled = false;
      btn.textContent = text;
      btn.style.opacity = "1";
    }
  }

  return { init };
})();

AuthSystem.init();
