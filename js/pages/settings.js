/* KYNAR SETTINGS PAGE LOGIC (js/pages/settings.js)
   Handles theme switching and user preferences.
   Status: FINAL MASTER (Logic Cleaned - No Double Toasts)
*/

// Bridge to the main theme engine in app.js
window.setThemeFromSettings = function(mode) {
  if (window.setTheme) {
    // 1. EXECUTE CHANGE
    // We call the Core Engine in app.js.
    // NOTE: app.js automatically handles the Toast Notification ("Atmosphere Applied").
    // We removed the local toast logic here to prevent double notifications.
    window.setTheme(mode);
    
    // 2. CONSOLE LOGGING (For Debugging)
    console.log(`[Settings] Mode switched to: ${mode}`);
    
  } else {
    console.error("[Settings] Critical Error: app.js is not loaded. Theme engine unavailable.");
    alert("System Error: Kynar Core Engine not found.");
  }
};
