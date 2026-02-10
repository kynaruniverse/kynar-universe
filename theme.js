const teleport = (destination) => {
    // Haptic Feedback API
    if (window.navigator.vibrate) {
        window.navigator.vibrate(10);
    }
    console.log(`Teleporting to: ${destination}`);
    // Logic for Phase 2 World-shifting will expand here
};

// Initialize Identity Aura
document.addEventListener('DOMContentLoaded', () => {
    const aura = localStorage.getItem('kynar_aura') || '#00ffff';
    document.documentElement.style.setProperty('--aura-color', aura);
});
