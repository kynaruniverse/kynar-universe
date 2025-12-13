/**
 * script.js
 * Handles the mobile menu toggle functionality.
 */

// 1. Get the necessary elements from the HTML
const menuIcon = document.querySelector('.menu-icon'); // The hamburger icon
const mainNav = document.querySelector('.main-nav');   // The navigation bar

// 2. Define the function that runs on click
function toggleMobileMenu() {
    // Toggles the CSS class 'active-menu' on the navigation bar.
    // If the class is present, it removes it (hides menu).
    // If the class is absent, it adds it (shows menu).
    mainNav.classList.toggle('active-menu');
}

// 3. Attach the function to the click event of the menu icon
menuIcon.addEventListener('click', toggleMobileMenu);

// Note: On desktop (min-width: 768px), the CSS automatically makes 
// the main-nav visible, so this script only affects the mobile view.
