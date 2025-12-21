class FocusTrap {
    constructor(element) {
        this.element = element;
        this.focusableElements = null;
        this.firstFocusable = null;
        this.lastFocusable = null;
        this.previousActiveElement = null;
    }

    activate() {
        // Store the currently focused element
        this.previousActiveElement = document.activeElement;

        // Get all focusable elements within the trap
        this.updateFocusableElements();

        // Focus the first element
        if (this.firstFocusable) {
            this.firstFocusable.focus();
        }

        // Add event listener for tab key
        this.element.addEventListener('keydown', this.handleKeydown);
    }

    deactivate() {
        // Remove event listener
        this.element.removeEventListener('keydown', this.handleKeydown);

        // Restore focus to the previously focused element
        if (this.previousActiveElement && this.previousActiveElement.focus) {
            this.previousActiveElement.focus();
        }
    }

    updateFocusableElements() {
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ];

        this.focusableElements = Array.from(
            this.element.querySelectorAll(focusableSelectors.join(','))
        ).filter(el => {
            // Filter out hidden elements
            return el.offsetParent !== null;
        });

        this.firstFocusable = this.focusableElements[0];
        this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    }

    handleKeydown = (e) => {
        // Only handle Tab key
        if (e.key !== 'Tab') return;

        // If only one focusable element, prevent tabbing
        if (this.focusableElements.length === 1) {
            e.preventDefault();
            return;
        }

        // Shift + Tab (going backwards)
        if (e.shiftKey) {
            if (document.activeElement === this.firstFocusable) {
                e.preventDefault();
                this.lastFocusable.focus();
            }
        } 
        // Tab (going forwards)
        else {
            if (document.activeElement === this.lastFocusable) {
                e.preventDefault();
                this.firstFocusable.focus();
            }
        }
    }
}

// Global focus trap instances
const focusTraps = new Map();

// Helper functions to integrate with existing modals
function activateFocusTrap(modalElement, trapId = 'default') {
    if (!modalElement) return;

    const trap = new FocusTrap(modalElement);
    trap.activate();
    focusTraps.set(trapId, trap);
}

function deactivateFocusTrap(trapId = 'default') {
    const trap = focusTraps.get(trapId);
    if (trap) {
        trap.deactivate();
        focusTraps.delete(trapId);
    }
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.FocusTrap = FocusTrap;
    window.activateFocusTrap = activateFocusTrap;
    window.deactivateFocusTrap = deactivateFocusTrap;
}