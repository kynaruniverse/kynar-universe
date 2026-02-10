window.teleport = (destination) => {
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(10);
    }
    
    if (destination === 'worlds') {
        if (typeof window.renderMarketplace === "function") window.renderMarketplace();
    } else if (destination === 'identity') {
        if (typeof window.renderIdentity === "function") window.renderIdentity();
    } else if (destination === 'square') {
        window.location.reload(); 
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const aura = localStorage.getItem('kynar_aura') || '#00ffff';
    document.documentElement.style.setProperty('--aura-color', aura);
});
