// KYNAR - Fixed Auth UI with proper initialization timing
// Wait for Firebase to be loaded before initializing

function initAuthUI() {
  // Check if Firebase is loaded
  if (!window._firebaseAuth) {
    console.warn('Firebase not loaded yet, retrying...');
    setTimeout(initAuthUI, 100);
    return;
  }
  
  const auth = window._firebaseAuth;
  const onAuthChange = window._firebaseOnAuthStateChanged;
  const signInFirebase = window._firebaseSignIn;
  const signUpFirebase = window._firebaseSignUp;
  const signOutFirebase = window._firebaseSignOut;
  
  // Elements
  const signInLink = document.querySelector('.sign-in-link');
  const signInText = document.querySelector('.sign-in-text');
  const lockIconContainer = document.querySelector('.custom-lock-icon');
  const accountNavLinks = document.querySelectorAll('#account-nav-link, #account-nav-mobile, .account-nav-link');
  const burger = document.querySelector('.custom-burger');
  
  // Modals
  const loginModal = document.getElementById('auth-modal');
  const signupModal = document.getElementById('signup-modal');
  
  if (!signInLink) return;
  
  // --- Helper: Open/Close Logic ---
  const openLogin = () => {
    if (!loginModal) return;
    signupModal?.classList.remove('is-open');
    if (window.deactivateFocusTrap) window.deactivateFocusTrap('signup');
    
    loginModal.classList.add('is-open');
    loginModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    document.body.style.overflow = 'hidden';
    
    // Activate focus trap after modal is visible
    setTimeout(() => {
      if (window.activateFocusTrap) {
        window.activateFocusTrap(loginModal.querySelector('.auth-modal-dialog'), 'login');
      } else {
        document.getElementById('auth-email')?.focus();
      }
    }, 100);
  };
  
  const openSignup = () => {
    if (!signupModal) return;
    loginModal?.classList.remove('is-open');
    if (window.deactivateFocusTrap) window.deactivateFocusTrap('login');
    
    signupModal.classList.add('is-open');
    signupModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    document.body.style.overflow = 'hidden';
    
    // Activate focus trap after modal is visible
    setTimeout(() => {
      if (window.activateFocusTrap) {
        window.activateFocusTrap(signupModal.querySelector('.auth-modal-dialog'), 'signup');
      } else {
        document.getElementById('reg-name')?.focus();
      }
    }, 100);
  };
  
  const closeAllModals = () => {
    // Deactivate focus traps
    if (window.deactivateFocusTrap) {
      window.deactivateFocusTrap('login');
      window.deactivateFocusTrap('signup');
    }
    
    if (loginModal) {
      loginModal.classList.remove('is-open');
      loginModal.setAttribute('aria-hidden', 'true');
    }
    if (signupModal) {
      signupModal.classList.remove('is-open');
      signupModal.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';
  };
  
  // --- Sign In / Account Button Logic ---
  signInLink.addEventListener('click', (e) => {
    e.preventDefault(); // Always prevent default
    
    const user = auth.currentUser;
    const isAccountPage = window.location.pathname.includes('account.html');
    
    // If on account page, the button is "Sign Out"
    if (isAccountPage && user) {
      signOutFirebase(auth).then(() => {
        window.location.href = 'index.html';
      }).catch(err => {
        console.error('Sign out error:', err);
      });
      return;
    }
    
    // If logged in, go to account page
    if (user) {
      window.location.href = 'account.html';
    } else {
      // If NOT logged in, open login modal
      openLogin();
    }
  });
  
  // --- Interceptors (Account Links) ---
  accountNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (!auth.currentUser) {
        e.preventDefault();
        openLogin();
      }
    });
  });
  
  // --- Modal Switching ---
  document.getElementById('auth-toggle-mode')?.addEventListener('click', (e) => {
    e.preventDefault();
    openSignup();
  });
  
  document.getElementById('back-to-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    openLogin();
  });
  
  // --- Close Listeners ---
  const closeButtons = document.querySelectorAll('.auth-modal-close, .auth-modal-backdrop');
  closeButtons.forEach(btn => btn.addEventListener('click', closeAllModals));
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
  
  // --- LOGIN FORM SUBMISSION ---
  const loginForm = document.getElementById('auth-form');
  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msgEl = document.getElementById('auth-message');
    const btn = document.getElementById('auth-submit-btn');
    const email = document.getElementById('auth-email').value.trim();
    const pass = document.getElementById('auth-password').value.trim();
    
    if (window.LoadingState) {
  LoadingState.buttonStart(btn);
} else if (btn) {
  btn.disabled = true;
}
    if (msgEl) {
      msgEl.textContent = "Signing in...";
      msgEl.style.color = "#666";
    }
    
    try {
      await signInFirebase(auth, email, pass);
      if (msgEl) {
        msgEl.style.color = "#28a745";
        msgEl.textContent = "Welcome back! Redirecting...";
      }
      setTimeout(() => {
        window.location.href = 'account.html';
      }, 1500);
    } catch (err) {
      if (window.LoadingState) {
  LoadingState.buttonEnd(btn);
} else if (btn) {
  btn.disabled = false;
}
      if (msgEl) {
        msgEl.style.color = "#dc3545";
        msgEl.textContent = err.message.replace('Firebase: ', '').replace('Error ', '');
      }
    }
  });
  
  // --- SIGNUP FORM SUBMISSION ---
  const signupForm = document.getElementById('signup-form');
  signupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msgEl = document.getElementById('reg-message');
    const btn = document.getElementById('reg-submit-btn');
    
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-password').value.trim();
    
    if (!name) {
      if (msgEl) {
        msgEl.style.color = "#dc3545";
        msgEl.textContent = "Please enter your name";
      }
      return;
    }
    
    if (window.LoadingState) {
  LoadingState.buttonStart(btn);
} else if (btn) {
  btn.disabled = true;
}
    if (msgEl) {
      msgEl.textContent = "Creating account...";
      msgEl.style.color = "#666";
    }
    
    try {
      await signUpFirebase(auth, email, pass, name);
      if (msgEl) {
        msgEl.style.color = "#28a745";
        msgEl.textContent = "Account created! Redirecting...";
      }
      setTimeout(() => {
        window.location.href = 'account.html';
      }, 2000);
    } catch (err) {
      if (window.LoadingState) {
  LoadingState.buttonEnd(btn);
} else if (btn) {
  btn.disabled = false;
}
      if (msgEl) {
        msgEl.style.color = "#dc3545";
        msgEl.textContent = err.message.replace('Firebase: ', '').replace('Error ', '');
      }
    }
  });
  
  // --- AUTH STATE UI UPDATES ---
  onAuthChange(auth, (user) => {
    const isLoggedIn = !!user;
    const isAccountPage = window.location.pathname.includes('account.html');
    
    localStorage.setItem('kynar_auth_state', isLoggedIn ? 'logged_in' : 'logged_out');
    
    if (isLoggedIn) {
      // Update display name
      if (signInText) {
        if (isAccountPage) {
          signInText.textContent = 'Sign out';
        } else {
          const displayName = user.displayName ? user.displayName.split(' ')[0] : 'Account';
          signInText.textContent = displayName;
        }
      }
      
      // Update burger button aria-label when logged in
      if (burger) {
        burger.setAttribute('aria-label', `Menu for ${user.displayName || 'user'}`);
      }
      
    } else {
      // Logged out state
      if (signInText) signInText.textContent = 'Sign in';
      
      if (lockIconContainer) {
        lockIconContainer.innerHTML = `<img src="images/log-in-icon.png" alt="User sign in" style="width: 100%; height: 100%; object-fit: contain;">`;
      }
      
      if (burger) {
        burger.setAttribute('aria-label', 'Toggle navigation menu');
      }
    }
    
    // Enable account links
    accountNavLinks.forEach(link => {
      link.style.opacity = '1';
      link.style.pointerEvents = 'auto';
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuthUI);
} else {
  initAuthUI();
}