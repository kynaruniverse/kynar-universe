/**
 * QUIET FORGE LOADING STATE
 * Role: Subtle visual feedback for async actions
 */

const LoadingState = {
    
    // Turns a button into a "Thinking" state
    buttonStart(btnElement) {
        if (!btnElement) return;
        
        // Save original text
        btnElement.dataset.originalText = btnElement.textContent;
        
        // Set pulsing state
        btnElement.textContent = 'Processing...';
        btnElement.style.opacity = '0.7';
        btnElement.style.pointerEvents = 'none';
        btnElement.style.transition = 'opacity 0.5s ease';
        
        // Pulse animation via CSS injection if needed, 
        // or just simple opacity shift for "Quiet" feel.
    },

    buttonEnd(btnElement, newText = null) {
        if (!btnElement) return;
        
        if (newText) {
            btnElement.textContent = newText;
        } else {
            btnElement.textContent = btnElement.dataset.originalText || 'Submit';
        }
        
        btnElement.style.opacity = '1';
        btnElement.style.pointerEvents = 'all';
    }
};

window.LoadingState = LoadingState;
