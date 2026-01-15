​🪐 KYNAR UNIVERSE (v2.2)
​One Universe. Infinite Digital Solutions.
​Official source code for www.kynaruniverse.co.uk.
Status: EVOLVED MASTER — PWA & Supabase Integrated
​🏛️ The Architecture
​Kynar Universe is a centralized digital department store designed to eliminate "digital filler" by providing only verified, high-utility assets. The system is built on a Modular Vanilla JS Engine—prioritizing performance, accessibility, and a premium "Glass" interface without the overhead of heavy frameworks.
​🌐 Core Departments
​Tools: Python automation, business intelligence, and developer blueprints.
​life: LifeOS planners, finance trackers, and wellness protocols.
​Home: Educational bundles, chore systems, and creative activity packs.
​Hub: The Knowledge Library—editorial guides for implementing your upgrades.
​📁 File Structure
​kynaruniverse/
├── assets/ # Logos, Department Icons, PWA Manifest Icons
├── css/ # Design System
│ ├── tokens.css # Source of Truth: Colors, Spacing, Typography
│ ├── global.css # Layout Physics & Glassmorphism (Skip-link removed)
│ └── components.css # Reusable UI (Cards, Buttons, Toasts)
├── js/ # Logic Spoke
│ ├── app.js # The Core Engine (Theme, Motion, Haptics)
│ ├── data.js # The Library: Product & Guide Catalog
│ ├── loader.js # Content Injection (Master Templates)
│ ├── search.js # Debounced Global Search & Keyboard Nav
│ ├── pages/ # Page-Specific Logic (Auth, Onboarding, Settings)
│ └── components/ # Structured Data & Analytics
├── pages/ # Functional Spokes (Category & Utility)
│ ├── tools/ # Tools Dept
│ ├── life/ # life Dept
│ ├── home/ # Home Dept
│ ├── hub/ # The Hub Dept
│ ├── about/ # Mission & Support
│ ├── account/ # Supabase Auth & Secure Inventory
│ ├── legal/ # Privacy & Compliance
│ ├── product.html # Master Product Template (Dynamic)
│ └── guide.html # Master Guide Template (Dynamic)
├── index.html # Gateway to the Universe
├── 404.html # "Sector Uncharted" Error Recovery
├── site.webmanifest # PWA Configuration
└── sitemap.xml # Search Engine Map
​🛠️ Tech Stack & Standards
​Frontend: HTML5 (Semantic), CSS3 (Custom Properties), Vanilla ES6 Modules.
​Backend: Supabase (Auth & Database).
​Icons: Remix Icon (CDN-based).
​Design System: High-fidelity Glassmorphism with 4 Theme Modes (Auto, Daylight, Midnight, Starwalker).
​SEO: JSON-LD Structured Data, OpenGraph metadata, and Google-safe crawling.
​🚀 Development & Deployment
​Local Calibration
​To run the Universe locally, use a local server to support ES6 Module imports and avoid CORS issues:
​Using Python
python3 -m http.server 8000
​Using Node.js
npx http-server
​Environment Configuration
​Ensure your js/pages/auth.js and js/pages/collections.js are configured with your Supabase credentials:
​SUPABASE_URL: Your project endpoint.
​SUPABASE_ANON_KEY: Your public anonymous key.
​Deployment Note
​The Kynar Universe is optimized for Root Directory Hosting. Because of absolute pathing used in the 404.html and site.webmanifest, ensure the site is hosted at the root (e.g., https://kynaruniverse.co.uk/) rather than a subdirectory to maintain asset integrity during error recovery.
​📜 The Kynar Protocol
​Utility First: If a tool doesn't save time or add tangible value, it is filler.
​Privacy is Currency: We collect only what is strictly necessary for digital delivery.
​One Universe: A unified, high-fidelity design language across all departments and devices.
​© 2026 Kynar Universe. One Universe. Infinite Solutions.