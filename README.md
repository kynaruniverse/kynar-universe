# Kynar Universe | Digital Systems Marketplace

![Project Status](https://img.shields.io/badge/Status-Operational-success)
![Version](https://img.shields.io/badge/Version-2.0.4-blue)
![License](https://img.shields.io/badge/License-Proprietary-orange)

**Kynar Universe** is a high-performance digital marketplace designed for creators and entrepreneurs. It features a custom "Glass & Grid" design system, a modular vanilla JavaScript architecture ("VisualForge"), and integrated Firebase authentication for secure member vaults.

---

## ⚡ Key Features

### 🎨 **VisualForge Design System**
* **Glassmorphism UI:** Frosted glass headers, modals, and sticky inputs.
* **Kinetic Physics:** Cards lift and glow on hover; inputs expand on focus.
* **Slipstream Drawers:** 60FPS CSS-driven navigation and cart sidebars.
* **Tactile Haptics:** Custom `haptics.js` engine provides vibration feedback on mobile interactions.

### 🛠 **Core Architecture**
* **Zero-Dependency:** Built on pure HTML5, CSS3, and ES6+ JavaScript. No bundlers required.
* **Centralized Logic:** `core.js` manages UI state to prevent DOM conflicts.
* **Commerce Engine:** `cart.js` handles local persistence, calculations, and badge updates.
* **Identity Layer:** `auth.js` manages Firebase V9 authentication (Login/Register/Logout).

---

## 📂 System Topography

```text
Kynaruniverse-site/
├── assets/                 # Static resources (PDFs, Fonts)
├── components/             # Reusable HTML fragments (Header/Footer)
├── images/                 # Product images and icons
│
├── styles.css              # Unified Design System (480 lines)
│
├── core.js                 # UI Master Controller (Drawers/Modals)
├── cart.js                 # Shopping Cart Data Engine
├── auth.js                 # Firebase Identity Service
├── haptics.js              # Tactile Feedback Engine
├── firebase-config.js      # Firebase API Configuration
│
├── index.html              # Homepage (Feed & Hero)
├── shop.html               # Marketplace (Matrix Grid)
├── product.html            # Dynamic Product Template
├── account.html            # Member Vault (Dashboard)
├── checkout.html           # Secure Payment Terminal
├── library.html            # Documentation Hub
├── newsletter.html         # Lead Generation Terminal
└── 404.html                # Error Handling
