/**
 * KYNAR UNIVERSE - Authentication UI Module (Mobile Safe Version)
 * Fix: Keeps header layout stable (No icon swapping, fixed text width).
 */
import { auth, registerUser, signInWithEmailAndPassword, signOut, onAuthStateChanged } from './firebase-config.js';

const AuthUI = (() => {

    const CONFIG = {
        paths: { account: 'account.html', home: 'index.html' }
    };

    // --- UI UPDATERS ---
    const updateHeaderState = (user) => {
        const signInText = document.querySelector('.sign-in-text');
        const lockIconContainer = document.querySelector('.custom-lock-icon');
        const mobileAccountLink = document.getElementById('account-nav-mobile');

        if (user) {
            // LOGGED IN STATE
            const firstName = (user.displayName || 'Account').split(' ')[0];

            // 1. TEXT: Set to "Account" or generic fixed text to prevent squishing
            // If you really want the name, you can change 'Account' back to firstName,
            // but 'Account' is safer for layout stability.
            if (signInText) signInText.textContent = 'Account'; 
            
            // 2. ICON: We DO NOT touch the innerHTML anymore. 
            // We just add the class for the gold border.
            if (lockIconContainer) {
                lockIconContainer.classList.add('active-user');
                lockIconContainer.closest('a')?.setAttribute('href', CONFIG.paths.account);
            }
            
            // Mobile Menu (Drawer) - We can still show the name here as it has plenty of space
            if (mobileAccountLink) {
                 mobileAccountLink.innerHTML = `<i class="fa-solid fa-user-check"></i> Hello, ${firstName}`;
                 mobileAccountLink.style.color = "var(--color-main-gold)";
            }

            document.body.classList.add('user-logged-in');

        } else {
            // LOGGED OUT STATE
            if (signInText) signInText.textContent = 'Sign in';
            
            if (lockIconContainer) {
                // Remove the gold border class
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
        
        const emailInput = form.querySelector('input[type="email"]');
        const passInput = form.querySelector('input[type="password"]');
        const nameInput = form.querySelector('input[type="text"]'); 

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

            if (msgContainer) {
                msgContainer.style.color = 'green';
                msgContainer.textContent = "Success! Redirecting...";
            }

            setTimeout(() => {
                const activeCloseBtn = document.querySelector('.auth-modal.is-open .auth-modal-close');
                if (activeCloseBtn) activeCloseBtn.click();
                
                if (window.location.href.includes('account.html')) {
                    window.location.reload();
                }
            }, 1000);

        } catch (error) {
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

    // --- INIT WITH POLLING ---
    const init = () => {
        // 1. Auth Listener
        onAuthStateChanged(auth, (user) => updateHeaderState(user));

        // 2. Poll for Forms
        let attempts = 0;
        const formCheck = setInterval(() => {
            attempts++;
            const loginForm = document.getElementById('auth-form');
            const signupForm = document.getElementById('signup-form');

            if (loginForm && signupForm) {
                clearInterval(formCheck);
                
                loginForm.onsubmit = (e) => {
                    e.preventDefault();
                    handleAuthSubmit(loginForm, 'login');
                };

                signupForm.onsubmit = (e) => {
                    e.preventDefault();
                    handleAuthSubmit(signupForm, 'signup');
                };
            }

            // Logout Listener
            document.body.addEventListener('click', async (e) => {
                const btn = e.target.closest('#sign-out-btn');
                if (btn) {
                    e.preventDefault();
                    if(confirm("Are you sure you want to sign out?")) {
                        await signOut(auth);
                        window.location.href = CONFIG.paths.home;
                    }
                }
            });

            if (attempts > 20) clearInterval(formCheck);

        }, 500);
    };

    return { init };
})();

// Start immediately
AuthUI.init();
