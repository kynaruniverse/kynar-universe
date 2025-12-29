# 🏺 Kynar Universe – Digital Marketplace V1.0

Kynar Universe is a boutique digital marketplace engineered for high-performance delivery of creator-owned products. The platform blends institutional-grade design with a mobile-first, zero-friction shopping experience.

---

## 1. Brand Vision & Identity

**Kynar Digital** positions itself as a curated, high-end ecosystem for digital systems, tools, and assets owned and operated by a single creator.

- **Brand Theme:** Institutional Luxury – structured, confident, and precise.
- **Core Palette:** Emerald (value, depth), Gold (prestige, highlight), Paper (tactile neutrality).
- **Typography Stack:**
  - **Display:** Bantayog – for logos, headings, and key brand statements.
  - **Body:** Glacial Indifference – for running text and UI labels.
- **Design Principle:** Visual perfection through disciplined multi-line formatting, consistent spacing, and strict layout hierarchy across all components.

---

## 2. Technical Architecture

Kynar Universe is implemented as a **SPA-lite** experience: a multi-page structure with dynamic component injection to keep navigation fluid and performant.

- **Frontend Stack:**
  - HTML5 for semantic structure.
  - CSS3 with custom properties (CSS variables) for theme and layout tokens.
  - Vanilla JavaScript for routing, component lifecycle, and state handling.
- **Identity & Security:**
  - Firebase Authentication for user identity, sign-in, and session management.
- **Data Layer:**
  - Firebase Firestore for merchant and product records.
- **Client-Side Persistence:**
  - `localStorage` for lightweight state:
    - `kynar_vault` – digital asset access and delivery metadata.
    - `kynar_cart_v1` – cart state and session continuity.
- **User Experience:**
  - Haptic feedback integration on supported mobile devices to reinforce key interactions (add-to-cart, checkout milestones, and critical actions).

---

## 3. Codebase Overview

The project is organized into focused, responsibility-driven modules to keep the marketplace maintainable and extensible.

| File        | Role Description                                                                |
|------------|----------------------------------------------------------------------------------|
| `core.js`  | Application shell, component loader, and navigation controller.                 |
| `styles.css` | Global design system: layout rules, physics, brand palette, and typography tokens. |
| `shop.js`  | Product gallery logic, listing rendering, loading skeletons, and state transitions. |
| `cart.js`  | Commerce engine: cart state, totals, validation, and checkout flow orchestration. |
| `vault.js` | Digital asset delivery and entitlement logic for purchased products.            |
| `auth.js`  | Authentication flows, session handling, and secure identity management.         |

---

## 4. Deployment & Optimization

Kynar Universe is designed to be lightweight, secure, and search-aware while protecting internal components.

1. **Firebase Project**
   - Create and configure a Firebase project named `kynar-universe-official`.
   - Enable Authentication and Firestore as required by the app.

2. **Robots & Security**
   - Configure `robots.txt` to disallow crawling of internal implementation paths:
     - `Disallow: /components/`
     - `Disallow: /vault.js`

3. **Asset Optimization**
   - Store all visual assets under `/images/` using `.webp` format where possible.
   - Target **< 100KB per asset** to support fast mobile loading and smooth transitions.

4. **Performance Focus**
   - Prioritize mobile-first responsiveness and Lighthouse-friendly practices.
   - Keep dependencies minimal to preserve a fast, SPA-lite experience.

---

## 5. Roadmap (Planned Enhancements)

- Multi-step checkout flows with richer status feedback.
- Extended analytics around cart behavior and product performance.
- Additional visual themes and seasonal brand modes while preserving core identity.