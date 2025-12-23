/**
 * KYNAR UNIVERSE - Authentication UI Module
 * Handles: Login, Signup, Header State
 */
import { auth, registerUser, signInWithEmailAndPassword, signOut, onAuthStateChanged } from './firebase-config.js';

const AuthUI = (() => {

    // --- 1. CONFIGURATION ---
    const CONFIG = {
        redirectDelay: 1500,
        paths: {
            account: 'account.html',
            home: 'index.html'
        }
    };

    // --- 2. INTERNAL UTILITIES ---
    const triggerModalClose = () => {
        // Uses the global Close logic from script.js / utilities.js
        const activeCloseBtn = document.querySelector('.auth-modal.is-open .auth-modal-close');
        if (activeCloseBtn) activeCloseBtn.click();
    };

    // --- 3. UI UPDATERS ---
    const updateHeaderState = (user) => {
        const signInText = document.querySelector('.sign-in-text');
        const lockIconContainer = document.querySelector('.custom-lock-icon');
        
        // Mobile drawer link
        const mobileAccountLink = document.getElementById('account-nav-mobile');

        if (user) {
            // LOGGED IN
            const initial = (user.displayName || 'U').charAt(0).toUpperCase();
            const firstName = (user.displayName || 'Account').split(' ')[0];

            if (signInText) signInText.textContent = firstName;
            
            if (lockIconContainer) {
                lockIconContainer.innerHTML = `<span class="user-initial">${initial}</span>`;
                lockIconContainer.classList.add('active-user');
                // Change the parent link to go to account page instead of opening modal
                const parentLink = lockIconContainer.closest('a');
                if (parentLink) parentLink.setAttribute('href', CONFIG.paths.account);
            }
            
            // Update Mobile Link
            if (mobileAccountLink) {
                 mobileAccountLink.innerHTML = `<i class="fa-solid fa-user-check"></i> Hello, ${firstName}`;
                 mobileAccountLink.style.color = "var(--color-main-gold)";
            }

            document.body.classList.add('user-logged-in');
        } else {
            // LOGGED OUT
            if (signInText) signInText.textContent = 'Sign in';
            
            if (lockIconContainer) {
                lockIconContainer.innerHTML = `<img src="images/log-in-icon.png" alt="" width="60" height="60">`;
                lockIconContainer.classList.remove('active-user');
                const parentLink = lockIconContainer.closest('a');
                if (parentLink) parentLink.setAttribute('href', '#'); 
            }

            if (mobileAccountLink) {
                mobileAccountLink.innerHTML = `<i class="fa-regular fa-circle-user"></i> My Account`;
                mobileAccountLink.style.color = "";
            }
            
            document.body.classList.remove('user-logged-in');
        }
    };

    // --- 4. FORM HANDLERS ---
    const handleAuthSubmit = async (form, actionType) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        const msgContainer = form.querySelector('.auth-message');
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;
        
        // For signup, name input might differ by ID, so we grab generic text input or by ID
        const nameInput = form.querySelector('input[type="text"]'); 

        // Loading State
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;
        if (msgContainer) msgContainer.textContent = '';

        try {
            if (actionType === 'signup') {
                if (!nameInput || !nameInput.value) throw new Error("Display name is required");
                // Use our custom register function
                await registerUser(email, password, nameInput.value);
            } else {
                // Standard Login
                await signInWithEmailAndPassword(auth, email, password);
            }

            // Success feedback
            if (msgContainer) {
                msgContainer.style.color = 'var(--color-search-deep)';
                msgContainer.textContent = "Success! Redirecting...";
            }

            setTimeout(() => {
                if (window.location.href.includes(CONFIG.paths.account)) {
                    window.location.reload(); 
                } else {
                    triggerModalClose();
                    // Optional: Update header immediately just in case
                    updateHeaderState(auth.currentUser);
                }
            }, 1000);

        } catch (error) {
            console.error(error);
            if (msgContainer) {
                msgContainer.style.color = 'var(--color-star-red)';
                const cleanMsg = error.message.replace('Firebase:', '').replace('auth/', '').replace(/-/g, ' ');
                msgContainer.textContent = cleanMsg;
            }
        } finally {
            submitBtn.classList.remove('btn-loading');
            submitBtn.disabled = false;
        }
    };

    const setupLogout = () => {
        // We use delegation because the logout button might be in the dynamic header
        document.body.addEventListener('click', async (e) => {
            if (e.target.id === 'sign-out-btn' || e.target.closest('#sign-out-btn')) {
                e.preventDefault();
                await signOut(auth);
                window.location.href = CONFIG.paths.home;
            }
        });
    };

    // --- 5. INIT ---
    const init = () => {
        // 1. Listen for Auth State
        onAuthStateChanged(auth, (user) => {
            updateHeaderState(user);
        });

        // 2. Attach Form Listeners (Now guaranteed to exist)
        const loginForm = document.getElementById('auth-form');
        const signupForm = document.getElementById('signup-form');

        if (loginForm) {
            console.log("✅ Login Form Detected");
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                handleAuthSubmit(loginForm, 'login');
            });
        } else {
            console.warn("⚠️ Login Form NOT found");
        }

        if (signupForm) {
            console.log("✅ Signup Form Detected");
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                handleAuthSubmit(signupForm, 'signup');
            });
        }

        setupLogout();
    };

    return { init };
})();

// === CRITICAL FIX ===
// Wait for the components (Header/Modals) to be injected by utilities.js
document.addEventListener('componentsLoaded', () => {
    console.log("🧩 AuthUI: Components loaded, initializing...");
    AuthUI.init();
});

// Fallback safety (in case the event fired before this script loaded)
setTimeout(() => {
    if (!document.getElementById('auth-form')) return;
    // Check if listeners are missing (simple logic check)
    // For now, we rely on componentsLoaded, which is robust in utilities.js
}, 2000);
