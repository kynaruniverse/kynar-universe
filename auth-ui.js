/**
 * KYNAR UNIVERSE - Authentication UI Module (Mobile Safe Version)
 * Uses polling to ensure forms are found even on slow connections.
 */
import { auth, registerUser, signInWithEmailAndPassword, signOut, onAuthStateChanged } from './firebase-config.js';

const AuthUI = (() => {

    const CONFIG = {
        paths: { account: 'account.html', home: 'index.html' }
    };

    // --- HELPER: Mobile Alert ---
    // Only shows alerts if we really need to debug. 
    // You can delete this function later.
    const debugLog = (msg) => {
        // console.log(msg); // Fallback
        // alert("DEBUG: " + msg); // Uncomment this if you want popups for every step
    };

    // --- UI UPDATERS ---
    const updateHeaderState = (user) => {
        const signInText = document.querySelector('.sign-in-text');
        const lockIconContainer = document.querySelector('.custom-lock-icon');
        const mobileAccountLink = document.getElementById('account-nav-mobile');

        if (user) {
            // LOGGED IN
            const firstName = (user.displayName || 'Account').split(' ')[0];
            const initial = firstName.charAt(0).toUpperCase();

            if (signInText) signInText.textContent = firstName;
            
            if (lockIconContainer) {
                lockIconContainer.innerHTML = `<span class="user-initial">${initial}</span>`;
                lockIconContainer.classList.add('active-user');
                lockIconContainer.closest('a')?.setAttribute('href', CONFIG.paths.account);
            }
            
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
                lockIconContainer.closest('a')?.setAttribute('href', '#'); 
            }

            if (mobileAccountLink) {
                mobileAccountLink.innerHTML = `<i class="fa-regular fa-circle-user"></i> My Account`;
                mobileAccountLink.style.color = "";
            }
            document.body.classList.remove('user-logged-in');
        }
    };

    // --- FORM SUBMISSION HANDLER ---
    const handleAuthSubmit = async (form, actionType) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        const msgContainer = form.querySelector('.auth-message');
        
        // Mobile Debug: Prove the JS caught the click
        // alert(`Processing ${actionType}...`); 

        // Get Inputs
        const emailInput = form.querySelector('input[type="email"]');
        const passInput = form.querySelector('input[type="password"]');
        const nameInput = form.querySelector('input[type="text"]'); // For signup

        const email = emailInput ? emailInput.value : '';
        const password = passInput ? passInput.value : '';

        // Validation
        if (!email || !password) {
            alert("Please fill in email and password.");
            return;
        }

        // Loading State
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = "Processing..."; 
        submitBtn.disabled = true;
        if (msgContainer) msgContainer.textContent = '';

        try {
            if (actionType === 'signup') {
                if (!nameInput || !nameInput.value.trim()) {
                    throw new Error("Please enter a Display Name.");
                }
                await registerUser(email, password, nameInput.value);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }

            // Success
            if (msgContainer) {
                msgContainer.style.color = 'green';
                msgContainer.textContent = "Success! Redirecting...";
            }
            
            // alert("Success! Logging you in..."); // Visual confirmation

            setTimeout(() => {
                const activeCloseBtn = document.querySelector('.auth-modal.is-open .auth-modal-close');
                if (activeCloseBtn) activeCloseBtn.click();
                
                if (window.location.href.includes('account.html')) {
                    window.location.reload();
                }
            }, 1000);

        } catch (error) {
            // alert("Error: " + error.message); // Visual Error
            console.error(error);
            if (msgContainer) {
                msgContainer.style.color = 'red';
                msgContainer.textContent = error.message.replace('Firebase:', '').replace('auth/', '');
            }
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    };

    // --- INIT WITH POLLING (The Mobile Fix) ---
    const init = () => {
        // 1. Auth Listener
        onAuthStateChanged(auth, (user) => updateHeaderState(user));

        // 2. Poll for Forms (Checks every 0.5s until found)
        let attempts = 0;
        const formCheck = setInterval(() => {
            attempts++;
            const loginForm = document.getElementById('auth-form');
            const signupForm = document.getElementById('signup-form');
            const logoutBtn = document.getElementById('sign-out-btn'); // Link in Account page

            // If we found the forms, attach listeners and STOP looking
            if (loginForm && signupForm) {
                clearInterval(formCheck);
                debugLog("Forms found after " + attempts + " attempts");

                // Clear old listeners by cloning (optional safety) or just attaching
                loginForm.onsubmit = (e) => {
                    e.preventDefault();
                    handleAuthSubmit(loginForm, 'login');
                };

                signupForm.onsubmit = (e) => {
                    e.preventDefault();
                    handleAuthSubmit(signupForm, 'signup');
                };
            }

            // Logout Listener (Delegated to body to be safe)
            document.body.addEventListener('click', async (e) => {
                // Check if clicked element is the logout button or inside it
                const btn = e.target.closest('#sign-out-btn');
                if (btn) {
                    e.preventDefault();
                    if(confirm("Are you sure you want to sign out?")) {
                        await signOut(auth);
                        window.location.href = CONFIG.paths.home;
                    }
                }
            });

            // Stop checking after 10 seconds to save battery
            if (attempts > 20) clearInterval(formCheck);

        }, 500);
    };

    return { init };
})();

// Start immediately
AuthUI.init();
