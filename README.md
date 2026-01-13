# Kynar Universe (v2.1)
**One Universe. Infinite Solutions.**

The source code for [www.kynaruniverse.co.uk](https://www.kynaruniverse.co.uk).

## 🪐 The Grand Vision
Kynar Universe is a centralized digital department store designed to eliminate digital filler. It operates with a modular component architecture using vanilla JavaScript ES6 modules.

## 🏛️ Departments
1. **Tools:** Python automation, business intelligence, dev workflows.
2. **Living:** High-performance planners, finance trackers, wellness systems.
3. **Home:** Educational bundles, family management, creative assets.
4. **Hub:** Knowledge library with verified guides and protocols.

## 📁 File Structure
kynaruniverse/
├── assets/              # Images, icons, and media
│   ├── logo.svg         # Main logo (optimized)
│   ├── favicon.ico      # Browser favicon
│   └── share-preview.jpg # Social media preview
│
├── css/                 # Styling system
│   ├── tokens.css       # Design tokens (colors, spacing, typography)
│   ├── global.css       # Base styles and layout
│   └── components.css   # Reusable UI components
│
├── js/                  # JavaScript modules
│   ├── app.js           # Core engine (themes, animations, toasts)
│   ├── data.js          # Product catalog and content data
│   ├── loader.js        # Dynamic content loader
│   ├── search.js        # Search overlay functionality
│   ├── header.js        # Glass navigation bar
│   ├── components/      # Reusable components
│   │   ├── footer.js    # Universal footer
│   │   └── breadcrumb.js # Auto-generated breadcrumbs
│   └── pages/           # Page-specific logic
│       ├── inventory.js  # Inventory page
│       ├── settings.js   # Settings page
│       └── onboarding.js # Onboarding wizard
│
├── pages/               # All site pages
│   ├── tools/           # Developer tools department
│   ├── living/          # High-performance living
│   ├── home/            # Family & household
│   ├── hub/             # Knowledge library
│   ├── about/           # Mission & vision
│   ├── support/         # Help center
│   ├── account/         # User account & inventory
│   ├── settings/        # User preferences
│   ├── legal/           # Privacy & terms
│   ├── onboarding/      # First-time setup
│   ├── checkout/        # Purchase confirmation
│   ├── product/         # Dynamic product pages
│   └── guide/           # Dynamic guide pages
│
├── .well-known/         # Security & verification
│   └── security.txt
│
├── index.html           # Homepage
├── 404.html             # Error page
├── sitemap.xml          # SEO sitemap
├── robots.txt           # Crawler instructions
└── site.webmanifest     # PWA manifest
## 🛠️ Tech Stack
* **Core:** Semantic HTML5, CSS3 Custom Properties, Vanilla ES6 Modules
* **Architecture:** Component-based with centralized data layer
* **Styling:** Token-based design system with theme engine
* **Icons:** Phosphor Icons
* **Hosting:** GitHub Pages / Netlify / Vercel ready

## 🎨 Design System
- **Themes:** Light, Dark, and secret "Starwalker" mode
- **Colors:** Department-specific palettes (Blue/Tools, Green/Living, Gold/Home, Purple/Hub)
- **Typography:** Inter (UI), Lora (Editorial), Fira Code (Technical)
- **Spacing:** 4px base scale with CSS custom properties

## 🚀 Development

### Local Development
```bash
# Clone repository
git clone https://github.com/yourusername/kynaruniverse.git

# Serve locally (Python)
python -m http.server 8000

# Or use Node.js
npx http-server -p 8000
Adding New Products
Edit /js/data.js and add to the products array:
{
  id: "unique-id",
  category: "tools", // or "living", "home"
  title: "Product Name",
  price: 15.00,
  // ... see existing products for full schema
}
Adding New Guides
Edit /js/data.js and add to the guides array:
{
  id: "guide-slug",
  title: "Guide Title",
  category: "hub",
  content: `<h2>Section</h2><p>Content...</p>`
}
📊 Performance
Images: Optimized to <80KB each
CSS: 24KB total (minified)
JS: 33KB total (modular loading)
Lighthouse Score: 95+ across all metrics
🔒 Security
Content Security Policy (CSP) enforced
Subresource Integrity (SRI) on external scripts
No inline scripts or eval()
localStorage with error handling
🌟 Special Features
Starwalker Mode: Secret theme accessible via settings
The Lore System: Contextual wisdom quotes on every page
Smart Search: Universal search across products and guides
Inventory System: Persistent purchase tracking with localStorage
📝 License
© 2026 Kynar Universe. All Rights Reserved.
"One Universe. Infinite Solutions."
Look to the stars in your settings.