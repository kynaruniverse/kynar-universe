/* KYNAR SETTINGS PAGE LOGIC (js/pages/settings.js)
   Handles theme switching and user preferences.
   Status: PHASE 3 - Extracted from inline script
*/

// Bridge to the main theme engine in app.js
window.setThemeFromSettings = function(mode) {
  if (window.setTheme) {
    window.setTheme(mode);
    
    // Visual feedback
    const modeNames = {
      auto: 'System',
      light: 'Daylight',
      dark: 'Midnight',
      starwalker: 'Starwalker Mode'
    };
    
    const msg = modeNames[mode] + ' atmosphere applied.';
    const toastType = mode === 'starwalker' ? 'starwalker' : 'success';
    
    // Check if toast exists (it should be in app.js)
    if (typeof window.showToast === 'function') {
      window.showToast(msg, toastType);
    } else {
      console.log(msg);
    }
  }
};