/**
 * QUIET FORGE CIRCADIAN ENGINE
 * Role: Sync interface lighting with user's local time
 */

(function() {
    function setRhythm() {
        const hour = new Date().getHours();
        const body = document.body;

        // Reset first
        body.removeAttribute('data-time');

        if (hour >= 6 && hour < 11) {
            body.setAttribute('data-time', 'morning');
            console.log('🌑 Circadian: Morning Light');
        } 
        else if (hour >= 17 && hour < 20) {
            body.setAttribute('data-time', 'evening');
            console.log('🌑 Circadian: Evening Glow');
        } 
        else if (hour >= 20 || hour < 6) {
            body.setAttribute('data-time', 'night');
            console.log('🌑 Circadian: Deep Night');
        }
        // Else: Default Day (Limestone)
    }

    // Run on load
    document.addEventListener('DOMContentLoaded', setRhythm);
    
    // Check every 10 minutes (in case user leaves tab open)
    setInterval(setRhythm, 600000);
})();
