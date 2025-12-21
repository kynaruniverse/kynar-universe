const LoadingState = {
    overlay: null,
    
    init() {
        this.overlay = document.getElementById('global-loading');
        if (!this.overlay) {
            // Create overlay if it doesn't exist
            this.overlay = document.createElement('div');
            this.overlay.id = 'global-loading';
            this.overlay.className = 'loading-overlay';
            this.overlay.setAttribute('aria-live', 'polite');
            this.overlay.setAttribute('aria-label', 'Loading');
            this.overlay.innerHTML = '<div class="loading-spinner"></div>';
            document.body.appendChild(this.overlay);
        }
    },
    
    show(message = 'Loading...') {
        if (!this.overlay) this.init();
        this.overlay.setAttribute('aria-label', message);
        this.overlay.classList.add('is-visible');
    },
    
    hide() {
        if (!this.overlay) return;
        this.overlay.classList.remove('is-visible');
    },
    
    // Button-specific loading
    buttonStart(button) {
        if (!button) return;
        button.disabled = true;
        button.classList.add('btn-loading');
        button.dataset.originalText = button.textContent;
    },
    
    buttonEnd(button, newText = null) {
        if (!button) return;
        button.disabled = false;
        button.classList.remove('btn-loading');
        if (newText) {
            button.textContent = newText;
        } else if (button.dataset.originalText) {
            button.textContent = button.dataset.originalText;
        }
    }
};

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LoadingState.init());
} else {
    LoadingState.init();
}

// Export globally
window.LoadingState = LoadingState;
