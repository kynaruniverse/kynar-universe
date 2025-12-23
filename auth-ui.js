/**
 * KYNAR UNIVERSE - Authentication Logic Layer
 * Architect: AetherCode
 * Description: Connects Firebase Auth state to the UI components (Header, Modals).
 */

import { 
    auth, 
    registerUser, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from './firebase-config.js';

// Configuration Constants
const ROUTES = {
    ACCOUNT: 'account.html',
    HOME: 'index.html'
};

const SELECTORS = {
    HEADER_AUTH_TRIGGER: '#auth-trigger',     // The "Sign In" link in header
    HEADER_LOCK_ICON: '#header-lock-icon',    // The icon box
    HEADER_AUTH_TEXT: '#header-auth-text',    // "Sign In" or "Account" text
    MOBILE_ACC_LINK: '#account-nav-mobile',   // Mobile drawer link
    
    MODAL_LOGIN: '#auth-modal',
    MODAL_SIGNUP: '#signup-modal',
    
    FORM_LOGIN: '#auth-form',
    FORM_SIGNUP: '#signup-form',
    
    BTN_TOGGLE_TO_SIGNUP: '#auth-toggle-mode',
    BTN_TOGGLE_TO_LOGIN: '#back-to-login',
    
    // Global Logout Trigger (can be anywhere)
    BTN_SIGNOUT: '[data-action="sign-out"]' 
};


class AuthManager {
    constructor() {
        this.init();
    }

    init() {
        // 1. Listen for Auth Changes (Real-time)
        onAuthStateChanged(auth, (user) => this.renderHeaderState(user));

        // 2. Setup Global Event Listeners (Delegation)
        this.setupEventListeners();
    }

    /**
     * Updates the UI based on whether a user is logged in or out.
     */
    renderHeaderState(user) {
        const lockIcon = document.querySelector(SELECTORS.HEADER_LOCK_ICON);
        const authText = document.querySelector(SELECTORS.HEADER_AUTH_TEXT);
        const authLink = document.querySelector(SELECTORS.HEADER_AUTH_TRIGGER);
        const mobileLink = document.querySelector(SELECTORS.MOBILE_ACC_LINK);

        if (user) {
            // --- LOGGED IN ---
            document.body.classList.add('user-logged-in');
            
            // Header: Show "Account" and gold border
            if (authText) authText.textContent = 'Account';
            if (lockIcon) lockIcon.classList.add('active-user');
            
            // Link: Point to Account Dashboard
            if (authLink) {
                authLink.setAttribute('href', ROUTES.ACCOUNT);
                authLink.removeAttribute('data-modal-trigger'); // Remove modal trigger behavior
            }

            // Mobile: Personalized Greeting
            if (mobileLink) {
                const name = (user.displayName || 'Creator').split(' ')[0];
                mobileLink.innerHTML = `<i class="fa-solid fa-user-check"></i> Hello, ${name}`;
                mobileLink.style.color = "var(--color-main-gold)";
                mobileLink.setAttribute('href', ROUTES.ACCOUNT);
            }

        } else {
            // --- LOGGED OUT ---
            document.body.classList.remove('user-logged-in');

            // Header: Show "Sign In" and standard border
            if (authText) authText.textContent = 'Sign in';
            if (lockIcon) lockIcon.classList.remove('active-user');

            // Link: Trigger Login Modal
            if (authLink) {
                authLink.setAttribute('href', '#');
                authLink.setAttribute('data-modal-trigger', 'login');
            }

            // Mobile: Standard Link
            if (mobileLink) {
                mobileLink.innerHTML = `<i class="fa-regular fa-circle-user"></i> My Account`;
                mobileLink.style.color = "";
                mobileLink.setAttribute('href', ROUTES.ACCOUNT); // Let it redirect via protected route logic
            }
        }
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const target = e.target;

            // A. Open Login Modal (Header Link)
            const trigger = target.closest('[data-modal-trigger="login"]');
            if (trigger) {
                e.preventDefault();
                this.openModal(SELECTORS.MODAL_LOGIN);
                return;
            }

            // B. Toggle Between Modals (Login <-> Signup)
            if (target.matches(SELECTORS.BTN_TOGGLE_TO_SIGNUP)) {
                this.closeModal(SELECTORS.MODAL_LOGIN);
                this.openModal(SELECTORS.MODAL_SIGNUP);
            }
            if (target.matches(SELECTORS.BTN_TOGGLE_TO_LOGIN)) {
                this.closeModal(SELECTORS.MODAL_SIGNUP);
                this.openModal(SELECTORS.MODAL_LOGIN);
            }

            // C. Close Modals (X button or Backdrop)
            if (target.matches('.auth-modal-close') || target.matches('.auth-modal-backdrop')) {
                const modal = target.closest('.auth-modal');
                if (modal) modal.classList.remove('is-open');
            }

            // D. Sign Out (Anywhere)
            if (target.closest(SELECTORS.BTN_SIGNOUT)) {
                e.preventDefault();
                this.handleSignOut();
            }
        });

        // E. Form Submissions (Event Delegation for dynamically loaded forms)
        document.addEventListener('submit', (e) => {
            if (e.target.matches(SELECTORS.FORM_LOGIN)) {
                e.preventDefault();
                this.handleLogin(e.target);
            }
            if (e.target.matches(SELECTORS.FORM_SIGNUP)) {
                e.preventDefault();
                this.handleSignup(e.target);
            }
        });
    }

    // --- FORM HANDLERS ---

    async handleLogin(form) {
        const email = form.querySelector('#auth-email').value;
        const password = form.querySelector('#auth-password').value;
        
        await this.processAuthAction(form, async () => {
            await signInWithEmailAndPassword(auth, email, password);
        }, 'Login Successful!');
    }

    async handleSignup(form) {
        const name = form.querySelector('#reg-name').value;
        const email = form.querySelector('#reg-email').value;
        const password = form.querySelector('#reg-password').value;

        if (!name) throw new Error("Please enter your name.");

        await this.processAuthAction(form, async () => {
            await registerUser(email, password, name);
        }, 'Account Created! Welcome.');
    }

    /**
     * Generic wrapper for Auth actions to handle loading states and errors.
     */
    async processAuthAction(form, actionFn, successMessage) {
        const btn = form.querySelector('button[type="submit"]');
        const msg = form.querySelector('.auth-message');
        const originalText = btn.textContent;

        try {
            // Loading State
            btn.textContent = 'Processing...';
            btn.disabled = true;
            if (msg) msg.textContent = '';

            // Execute Logic
            await actionFn();

            // Success State
            if (msg) {
                msg.style.color = 'var(--color-search-deep)'; // Green/Teal
                msg.textContent = successMessage;
            }

            // Close & Redirect
            setTimeout(() => {
                this.closeAllModals();
                // If on account page, reload to refresh data. Else redirect to account.
                if (window.location.href.includes(ROUTES.ACCOUNT)) {
                    window.location.reload();
                } else {
                    window.location.href = ROUTES.ACCOUNT;
                }
            }, 1000);

        } catch (error) {
            console.error(error);
            if (msg) {
                msg.style.color = 'var(--color-star-red)';
                msg.textContent = this.formatErrorMessage(error);
            }
            btn.textContent = originalText;
            btn.disabled = false;
        }
    }

    async handleSignOut() {
        if (confirm("Are you sure you want to sign out?")) {
            await signOut(auth);
            window.location.href = ROUTES.HOME;
        }
    }

    // --- UTILITIES ---

    openModal(selector) {
        const modal = document.querySelector(selector);
        if (modal) modal.classList.add('is-open');
    }

    closeModal(selector) {
        const modal = document.querySelector(selector);
        if (modal) modal.classList.remove('is-open');
    }

    closeAllModals() {
        document.querySelectorAll('.auth-modal').forEach(m => m.classList.remove('is-open'));
    }

    formatErrorMessage(error) {
        const code = error.code || '';
        if (code.includes('invalid-credential')) return "Incorrect email or password.";
        if (code.includes('email-already-in-use')) return "This email is already registered.";
        if (code.includes('weak-password')) return "Password should be at least 6 characters.";
        return error.message.replace('Firebase:', '').trim();
    }
}

// Instantiate to start
const authManager = new AuthManager();
export default authManager;
