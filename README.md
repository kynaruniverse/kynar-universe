# 🏛 KYNAR OPERATIONS | V10.0 SYSTEM ARCHITECTURE

Kynar Operations is a high-performance, modular digital asset library engineered for the creative elite. This repository contains the **V10.0 Architecture**, featuring a "No-Build" HTML generation engine and industrial-grade protocols.

---

## 💎 The V10.0 Constitution
Unlike traditional e-commerce stores, Kynar operates as a **System Interface**.
* **System > Product:** Items are classified as "Systems" (Architectures) or "Tools" (Single-Use).
* **Spec Sheets:** Product pages are rendered dynamically from `vault.js` to resemble technical blueprints.
* **Vault-Sync:** A real-time data brain that powers the entire site without database queries.

### **Key Technical Features**
* **The Vault:** A single JS file (`vault.js`) controls all product data, pricing, and links.
* **Wireless Bridge:** `checkout.js` manages the connection to Lemon Squeezy via secure overlays.
* **Haptic Engine:** `ui-core.js` provides tactile feedback for "industrial" interactions.
* **Signal Protection:** Custom 404 and Success states handle "Signal Lost" and "Signal Verified" scenarios.

---

## ⚙️ System Schematics (File Tree)

```text
├── assets/
│   ├── downloads/          # 🔒 Protected Asset Archive
│   ├── images/             # High-Fidelity WebP Visuals
│   └── fonts/              # Typography (Bantayog/Glacial)
│
├── src/
│   ├── core/
│   │   ├── events.js       # The Nervous System (Pub/Sub)
│   │   └── logger.js       # Production Silence Protocol
│   ├── modules/
│   │   ├── cart.js         # Requisition Logic
│   │   └── checkout.js     # Lemon Squeezy Bridge
│
├── components/
│   ├── header.html         # Command Center
│   ├── footer.html         # Status & Legal
│   └── overlays.html       # Cart Sidebar & Nav
│
├── ui-core.js              # The Main Engine
├── vault.js                # 📦 The Database (EDIT THIS TO ADD PRODUCTS)
├── styles.css              # Industrial Design System v9.2
│
├── index.html              # Operations (Home)
├── shop.html               # The Library (Archive)
├── product.html            # Spec Sheet (Dynamic Template)
├── newsletter.html         # Dashboard (Community)
├── contact.html            # Connect Protocol
├── starter.html            # Initiation Kit (Lead Magnet)
├── retrieval.html          # Asset Retrieval Gateway
├── success.html            # Signal Verified
├── legal.html              # Operational Framework
├── 404.html                # Signal Lost
│
├── sw.js                   # Service Worker v10.0
├── robots.txt              # Indexing Shield
└── sitemap.xml             # Temporal Map
