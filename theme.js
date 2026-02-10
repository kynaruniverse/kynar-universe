const teleport = (destination) => {
    // Haptic Feedback
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(10);
    }
    
    console.log("Navigating to:", destination);

    if (destination === 'worlds') {
        if (typeof renderMarketplace === "function") {
            renderMarketplace();
        } else {
            console.error("Marketplace engine not loaded.");
        }
    } else if (destination === 'square') {
        // Return to Home without a full reload for better PWA feel
        location.href = "/"; 
    }
};

// Initialize Identity Aura
document.addEventListener('DOMContentLoaded', () => {
    const aura = localStorage.getItem('kynar_aura') || '#00ffff';
    document.documentElement.style.setProperty('--aura-color', aura);
    console.log("Aura Sync Complete");
});
