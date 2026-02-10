const teleport = (destination) => {
    if (window.navigator.vibrate) window.navigator.vibrate(10);
    
    if (destination === 'worlds') {
        renderMarketplace();
    } else if (destination === 'square') {
        location.reload(); // Temporary return to Home
    }
};


// Initialize Identity Aura
document.addEventListener('DOMContentLoaded', () => {
    const aura = localStorage.getItem('kynar_aura') || '#00ffff';
    document.documentElement.style.setProperty('--aura-color', aura);
});
