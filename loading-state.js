/**
 * KYNAR UNIVERSE - Loading State Manager
 * Architect: AetherCode
 * Description: Centralized control for global spinners and button loading states.
 */

const LoadingState = {
    overlay: null,
    isLoading: false,
    timeout: null,
    
    /**
     * Finds or creates the global loading overlay in the DOM.
     */
    init() {
        this.overlay = document.getElementById('global-loading');
        
        // Defensive: If overlay is missing from HTML, create it dynamically
        if (!this.overlay) {
            if (!document.body) return; // DOM not ready yet
            
            this.overlay = document.createElement('div');
            this.overlay.id = 'global-loading';
            this.overlay.className = 'loading-overlay';
            this.overlay.setAttribute('aria-live', 'polite');
            this.overlay.setAttribute('aria-label', 'Loading content');
            
            // Matches styles.css structure
            this.overlay.innerHTML = '<div class="loading-spinner"></div>';
            document.body.appendChild(this.overlay);
        }
    },
    
    /**
     * Shows the global full-screen spinner.
     * @param {string} message - Accessibility label
     * @param {number} maxDuration - Safety timeout in ms (default 15s)
     */
    show(message = 'Loading...', maxDuration = 15000) {
        if (!this.overlay) this.init();
        if (!this.overlay) return;
        
        this.overlay.setAttribute('aria-label', message);
        this.overlay.classList.add('is-visible');
        this.isLoading = true;
        
        // Safety: Prevent infinite loading if an error occurs
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.warn('[LoadingState] Operation timed out, hiding overlay.');
            this.hide();
        }, maxDuration);
    },
    
    /**
     * Hides the global spinner.
     */
    hide() {
        if (!this.overlay) return;
        
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        
        this.overlay.classList.remove('is-visible');
        this.isLoading = false;
    },
    
    /**
     * Puts a specific button into a loading state.
     * Prevents double-clicks and shows a spinner/loading style.
     */
    buttonStart(button) {
        if (!button || button.classList.contains('btn-loading')) return;
        
        // Store original state
        button.dataset.wasDisabled = button.disabled;
        // We store width to prevent button collapsing when text is hidden
        button.style.minWidth = getComputedStyle(button).width; 
        
        button.disabled = true;
        button.classList.add('btn-loading');
        button.setAttribute('aria-busy', 'true');
    },

    /**
     * Restores a button to its interactive state.
     */
    buttonEnd(button, newText = null) {
        if (!button) return;
        
        const wasDisabled = button.dataset.wasDisabled === 'true';
        button.disabled = wasDisabled;
        
        button.classList.remove('btn-loading');
        button.removeAttribute('aria-busy');
        button.style.minWidth = ''; // Reset width constraint
        
        // Optional: Change text (e.g., "Saved!")
        if (newText) {
            // If newText is provided, replace content temporarily or permanently
            // NOTE: If the button had an icon, this replaces it.
            // Best used for simple text updates.
            const originalHTML = button.innerHTML;
            button.innerHTML = newText;
            
            // If it's a success message, maybe revert after 2 seconds?
            // For now, we assume permanent change unless handled by caller.
        }
        
        delete button.dataset.wasDisabled;
    }
};

// Initialize as soon as DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LoadingState.init());
} else {
    LoadingState.init();
}

// Export to Window for global access
window.LoadingState = LoadingState;
