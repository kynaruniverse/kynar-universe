# Kynar Universe (v2.2)
**One Universe. Infinite Solutions.**

The source code for [www.kynaruniverse.co.uk](https://www.kynaruniverse.co.uk).

## 🪐 The Grand Vision
Kynar Universe is a centralized digital department store designed to eliminate digital filler. It operates with a modular component architecture using vanilla JavaScript ES6 modules and a Supabase backend.

## 🏛️ Departments
1. **Tools:** Python automation, business intelligence, dev workflows.
2. **Living:** High-performance planners, finance trackers, wellness systems.
3. **Home:** Educational bundles, family management, creative assets.
4. **Hub:** Knowledge library with verified guides and protocols.

## 📁 File Structure
kynaruniverse/
├── assets/              # Images, icons, and media
│   ├── logo.svg         # Main logo
│   ├── favicon.ico      # Browser favicon
│   └── android-chrome* # PWA Icons
│
├── css/                 # Styling system
│   ├── tokens.css       # Design tokens (colors, spacing, typography)
│   ├── global.css       # Base styles, layout, and glassmorphism
│   └── components.css   # Reusable UI components
│
├── js/                  # JavaScript modules
│   ├── app.js           # Core engine (themes, animations, toasts)
│   ├── data.js          # Product catalog and content data
│   ├── loader.js        # Dynamic content loader
│   ├── search.js        # Search overlay functionality
│   ├── header.js        # Glass navigation bar
│   ├── footer.js        # Universal footer
│   ├── breadcrumb.js    # Auto-generated breadcrumbs
│   ├── components/      # Structured Data & Utilities
│   │   └── structured-data.js 
│   └── pages/           # Page-specific logic
│       ├── settings.js   # Settings page logic
│       └── onboarding.js # Onboarding wizard logic
│
├── pages/               # All site pages
│   ├── tools/           # Developer tools department
│   ├── living/          # High-performance living
│   ├── home/            # Family & household
│   ├── hub/             # Knowledge library
│   ├── about/           # Mission & vision
│   ├── support/         # Help center
│   ├── account/         # Login & Inventory (Supabase Auth)
│   ├── settings/        # User preferences
│   ├── legal/           # Privacy & terms
│   ├── onboarding/      # First-time setup
│   ├── checkout/        # Purchase confirmation
│   ├── product.html     # Dynamic Product Template (Master)
│   ├── guide.html       # Dynamic Guide Template (Master)
│   └── shortcuts.html   # Keyboard Shortcuts reference
│
├── .well-known/         # Security & verification
├── index.html           # Homepage
├── 404.html             # Error page
├── sitemap.xml          # SEO sitemap
├── robots.txt           # Crawler instructions
├── site.webmanifest     # PWA manifest
└── sw.js                # Service Worker (Offline capabilities)

## 🛠️ Tech Stack
* **Core:** Semantic HTML5, CSS3 Custom Properties, Vanilla ES6 Modules
* **Backend:** Supabase (Auth & Database)
* **Icons:** Remix Icons (via CDN)
* **PWA:** Service Worker + Web Manifest
* **Hosting:** GitHub Pages / Netlify / Vercel ready

## 🎨 Design System
- **Themes:** Light, Dark, and secret "Starwalker" mode.
- **Colors:** Department-specific palettes (Blue/Tools, Green/Living, Gold/Home, Purple/Hub).
- **Typography:** Inter (UI), Lora (Editorial), Fira Code (Technical).
- **Spacing:** 4px base scale with CSS custom properties.

## 🚀 Development

### Local Development
```bash
# Clone repository
git clone [https://github.com/yourusername/kynaruniverse.git](https://github.com/yourusername/kynaruniverse.git)

# Serve locally (Python)
python3 -m http.server 8000

# Or use Node.js
npx http-server -p 8000
