/* KYNAR ONBOARDING PAGE LOGIC (js/pages/onboarding.js)
   Handles the multi-step onboarding wizard.
   Status: FINAL MASTER (Logic Only - No Visuals)
*/

let selectedCategory = null;

window.nextStep = function(stepNum) {
  // Hide all steps
  document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.dot').forEach(el => el.classList.remove('active'));
  
  // Show target step
  const targetStep = document.getElementById(`step-${stepNum}`);
  const targetDot = document.getElementById(`dot-${stepNum}`);
  
  if (targetStep) targetStep.classList.add('active');
  if (targetDot) targetDot.classList.add('active');
};

window.selectOption = function(btn, category) {
  // Deselect all
  document.querySelectorAll('.option-card').forEach(el => el.classList.remove('selected'));
  
  // Select clicked
  btn.classList.add('selected');
  selectedCategory = category;
  
  // Enable Next Button
  const nextBtn = document.getElementById('btn-step-2');
  if (nextBtn) {
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
  }
};

window.finishOnboarding = function() {
  // Save User Preference
  if (selectedCategory) {
    try {
      localStorage.setItem('kynar_user_path', selectedCategory);
    } catch (error) {
      console.error('[Universe] Failed to save preference:', error);
    }
  }
  // Redirect to Home
  window.location.href = '../../index.html';
};
