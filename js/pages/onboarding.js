/* KYNAR ONBOARDING PAGE LOGIC (js/pages/onboarding.js)
   Status: EVOLVED MASTER (Auto-Progression + Choice Validation)
*/

(function() {
  'use strict';

  let selectedPath = null;

  document.addEventListener('DOMContentLoaded', () => {
    initOnboarding();
  });

  function initOnboarding() {
    const container = document.querySelector('.onboarding-container');
    if (!container) return;

    // 1. Delegate Option Selection
    container.addEventListener('click', (e) => {
      const optionBtn = e.target.closest('.option-card');
      if (optionBtn) {
        handleSelection(optionBtn);
      }
    });

    // 2. Navigation Listeners (Manual Next/Finish)
    container.addEventListener('click', (e) => {
      if (e.target.matches('[data-next-step]')) {
        const step = e.target.getAttribute('data-next-step');
        goToStep(step);
      }
      
      if (e.target.matches('#btn-finish')) {
        completeProtocol();
      }
    });
  }

  /**
   * Selection Logic with Auto-Advance
   */
  function handleSelection(element) {
    // UI Update
    document.querySelectorAll('.option-card').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');

    // Data Update
    selectedPath = element.getAttribute('data-category');

    // Visual Feedback (Haptic)
    if ('vibrate' in navigator) navigator.vibrate(15);

    // Auto-Advance to Step 2 after a brief "acknowledgment" pause
    setTimeout(() => goToStep(2), 500);
  }

  /**
   * Navigation Logic
   */
  function goToStep(stepNum) {
    const targetStep = document.getElementById(`step-${stepNum}`);
    const targetDot = document.getElementById(`dot-${stepNum}`);
    
    if (!targetStep) return;

    // Hide current, show next
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(el => el.classList.remove('active'));
    
    targetStep.classList.add('active');
    if (targetDot) targetDot.classList.add('active');
    
    // Smooth scroll to top of wizard
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Finalize and Redirect
   */
  function completeProtocol() {
    if (!selectedPath) {
      if (window.showToast) window.showToast('Please select a path to continue.', 'error');
      return;
    }

    try {
      localStorage.setItem('kynar_user_path', selectedPath);
      
      // Personalized Toast on exit
      if (window.showToast) {
        window.showToast(`Path Established: ${selectedPath.toUpperCase()}`, 'starwalker');
      }

      // Redirect with slight delay for the toast to be seen
      setTimeout(() => {
        window.location.href = '../../index.html';
      }, 1000);
      
    } catch (e) {
      console.error('Data Sync Error', e);
      window.location.href = '../../index.html';
    }
  }

  // Backwards compatibility for inline HTML calls
  window.nextStep = goToStep;
  window.selectOption = (btn, cat) => handleSelection(btn);
  window.finishOnboarding = completeProtocol;

})();
