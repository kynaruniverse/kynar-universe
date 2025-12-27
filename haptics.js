/**
 * QUIET FORGE HAPTICS
 * Role: Provide tactile feedback on mobile devices
 */

const Haptics = {
    // Light tap (hover, focus)
    light: () => {
        if (navigator.vibrate) navigator.vibrate(5);
    },
    
    // Medium tap (button press, toggle)
    medium: () => {
        if (navigator.vibrate) navigator.vibrate(15);
    },
    
    // Heavy thud (Add to Satchel, Error)
    heavy: () => {
        if (navigator.vibrate) navigator.vibrate(30);
    },

    // Success ripple
    success: () => {
        if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
    }
};

// Auto-bind to common elements
document.addEventListener('DOMContentLoaded', () => {
    // Add light ticks to all ink-links
    const links = document.querySelectorAll('a, button, .ink-link');
    links.forEach(el => {
        el.addEventListener('touchstart', () => Haptics.light(), { passive: true });
    });
});

window.Haptics = Haptics;
