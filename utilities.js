/**
 * KYNAR UNIVERSE - Core Utilities
 * Architect: AetherCode
 * Description: Accessibility tools and Component Loader.
 */

/* --- 1. ACCESSIBILITY: FOCUS TRAP --- */
class FocusTrap {
    constructor(element, options = {}) {
        this.element = element;
        this.focusableElements = [];
        this.firstFocusable = null;
        this.lastFocusable = null;
        this.previousActiveElement = null;
        this.isActive = false;
        this.onEscape = options.onEscape || null;
    }

    activate() {
        if (this.isActive) return;
        this.isActive = true;
        this.previousActiveElement = document.activeElement;
        this.updateFocusableElements();

        if (this.focusableElements.length === 0) {
            console.warn('FocusTrap: No focusable elements found in', this.element);
            // Don't deactivate, just don't focus anything yet.
            // Content might load async.
            return;
        }

        if (this.firstFocusable) {
            this.firstFocusable.focus();
        }

        this.element.addEventListener('keydown', this.handleKeydown);
    }

    refresh() {
        this.updateFocusableElements();
    }

    deactivate() {
        if (!this.isActive) return;
        this.isActive = false;
        this.element.removeEventListener('keydown', this.handleKeydown);

        // Return focus to where it was before opening
        if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
            this.previousActiveElement.focus();
        }
    }

    updateFocusableElements() {
        const focusableSelectors = [
            'a[href]', 'button:not([disabled])', 'textarea:not([disabled])',
            'input:not([disabled])', 'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])', 'audio[controls]', 'video[controls]',
            '[contenteditable]:not([contenteditable="false"])'
        ];

        // Convert NodeList to Array and filter hidden elements
        this.focusableElements = Array.from(
            this.element.querySelectorAll(focusableSelectors.join(','))
        ).filter(el => {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' 
                && style.visibility !== 'hidden' 
                && style.opacity !== '0'
                && (el.offsetWidth > 0 || el.offsetHeight > 0);
        });

        this.firstFocusable = this.focusableElements[0];
        this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    }

    handleKeydown = (e) => {
        if (e.key === 'Escape' && this.onEscape) {
            this.onEscape(e);
            return;
        }

        if (e.key !== 'Tab' || this.focusableElements.length === 0) return;

        // Trap Focus Logic
        if (e.shiftKey) { // Shift + Tab (Backwards)
            if (document.activeElement === this.firstFocusable) {
                e.preventDefault();
                this.lastFocusable.focus();
            }
        } else { // Tab (Forwards)
            if (document.activeElement === this.lastFocusable) {
                e.preventDefault();
                this.firstFocusable.focus();
            }
        }
    }
}

// Global Trap Manager
const focusTraps = new Map();

function activateFocusTrap(modalElement, trapId = 'default', options = {}) {
    if (!modalElement) return;
    deactivateFocusTrap(trapId); // Cleanup collisions
    const trap = new FocusTrap(modalElement, options);
    trap.activate();
    focusTraps.set(trapId, trap);
    return trap;
}

function deactivateFocusTrap(trapId = 'default') {
    const trap = focusTraps.get(trapId);
    if (trap) {
        trap.deactivate();
        focusTraps.delete(trapId);
    }
}

function refreshFocusTrap(trapId = 'default') {
    const trap = focusTraps.get(trapId);
    if (trap) trap.refresh();
}

// Expose to Window
window.FocusTrap = FocusTrap;
window.activateFocusTrap = activateFocusTrap;
window.deactivateFocusTrap = deactivateFocusTrap;
window.refreshFocusTrap = refreshFocusTrap;


/* --- 2. COMPONENT LOADER (Engine) --- */

/**
 * Parses a string of HTML and executes any script tags found within it.
 * This fixes the issue where injected scripts don't run.
 */
function executeScripts(container) {
    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => 
            newScript.setAttribute(attr.name, attr.value)
        );
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

async function loadComponents() {
    const includes = document.querySelectorAll('[data-include]');
    if (includes.length === 0) return;

    const loadPromises = Array.from(includes).map(async (el) => {
        const file = el.dataset.include;
        try {
            const resp = await fetch(file);
            if (resp.ok) {
                const content = await resp.text();
                
                // Create a temporary container to parse HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = content;
                
                // Replace the placeholder with the new content
                el.outerHTML = content;
                
                // Note: Since we used outerHTML, 'el' is gone. 
                // We rely on the DOM updating. If specific script execution 
                // is needed inside components, it's safer to use the Global Event below.
            } else {
                console.error(`[Loader] Failed to load ${file}: ${resp.status}`);
            }
        } catch (err) {
            console.error(`[Loader] Error loading ${file}:`, err);
        }
    });

    await Promise.all(loadPromises);
    
    // Broadcast ready state
    document.dispatchEvent(new Event('componentsLoaded'));
    // console.log("[Loader] All components injected.");
}

// Init
document.addEventListener('DOMContentLoaded', loadComponents);
