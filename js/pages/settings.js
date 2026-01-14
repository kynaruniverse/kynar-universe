/* KYNAR SETTINGS PAGE LOGIC (js/pages/settings.js)
   Status: EVOLVED MASTER (UI Synchronization + Haptic Feedback)
*/

document.addEventListener('DOMContentLoaded', () => {
  syncActiveThemeButton();
  initSettingsListeners();
});

/**
 * 1. SYNC UI STATE
 * Highlights the button corresponding to the current active theme.
 */
function syncActiveThemeButton() {
  const currentMode = document.documentElement.getAttribute('data-mode') || 'dark';
  
  // Remove active class from all theme buttons
  document.querySelectorAll('.theme-opt').forEach(btn => {
    btn.classList.remove('is-active');
    // If button matches current mode, highlight it
    if (btn.getAttribute('data-set-theme') === currentMode) {
      btn.classList.add('is-active');
    }
  });
}

/**
 * 2. ATTACH LISTENERS
 * Uses event delegation for cleaner HTML.
 */
function initSettingsListeners() {
  const container = document.querySelector('.settings-container');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const themeBtn = e.target.closest('[data-set-theme]');
    
    if (themeBtn) {
      const mode = themeBtn.getAttribute('data-set-theme');
      applyThemeSetting(mode);
    }
  });
}

/**
 * 3. APPLY SETTING
 * Bridge to app.js with added UI polish.
 */
function applyThemeSetting(mode) {
  if (window.setTheme) {
    // A. Trigger Core Engine (Handles Toast & LocalStorage)
    window.setTheme(mode);
    
    // B. Visual Feedback on Settings Page
    syncActiveThemeButton();
    
    // C. Haptic Feedback (Mobile Only - 10ms vibration)
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }

    console.log(`[Settings] Universe Atmosphere: ${mode.toUpperCase()}`);
    
  } else {
    console.warn("[Settings] Core Engine Offline.");
    if (window.showToast) window.showToast("System Engine Offline", "error");
  }
}

// Keep the global bridge for legacy HTML compatibility
window.setThemeFromSettings = applyThemeSetting;
