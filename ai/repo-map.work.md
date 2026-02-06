# REPO MAP & TECH LEDGER (KYNAR UNIVERSE)

## APP OVERVIEW
* Modular web application built with Next.js, combining a digital marketplace with content-driven "worlds" and educational guides.
* Centralized logic for state management, authentication, external payments, and database connectivity.

---

## CORE DOMAINS & SUBSYSTEMS

### MARKETPLACE

#### Discovery & Catalog
* Marketplace Hub (Store):
  * Curated Discovery: Responsive grid presenting "Permanent Acquisitions." Implements Next.js 15 searchParams as an async Promise to ensure stable builds on Netlify. ✅ Done
  * Sector-Based Filtering: Server-side filtration that validates URL parameters against the WORLDS constant before executing Supabase queries, ensuring runtime safety and preventing invalid enum injections. ✅ Done
  * Enum Mapping Logic: Server-side logic explicitly transforms UI World strings (e.g., "Home") to lowercase database enum values (e.g., "home") to maintain compatibility with Postgres world_type enums. ✅ Done
  * Sticky Discovery Controls: Persistent FilterBar with backdrop-blur during scrolling. ✅ Done
  * Async Param Resolution: Resolves search parameters asynchronously to ensure stable builds. ✅ Done
  * The Hub Architecture: The Store acts as the central aggregator for all "Worlds." It maps the world URL slug directly to the database world column, allowing the same UI to serve as a specialized storefront for Home, Lifestyle, or Tools sectors. ✅ Done
* Product Specification (Detail Page):
  * Technical Architecture: Individual units utilize a "Dual-Action" layout—the visual stage (Narrative Exploration) handles route navigation via slugs, while the acquisition zone (Transactional Trigger) remains decoupled to manage state without accidental navigation. ✅ Done
  * Dual-State Transactional Logic:
    * Acquisition Path: Orchestrates the transition from discovery to selection via useCartActions. It employs a 400ms "Syncing" delay to provide narrative weight to the digital acquisition process. ✅ Done
    * Vault Verification: Implements multi-stage feedback using hapticFeedback ("light" on click, "success" on completion) and a transient "Syncing..." state to provide a grounded, high-fidelity selection experience. ✅ Done
    * Hydration-Aware UI: Uses a mounted state guard to prevent flickering between server-rendered skeletons and client-side auth states (Owned vs. Selected).
    * Tactical Gating: Prevents duplicate acquisitions by explicitly disabling interactions once a product is detected in the user_library (Vault) or the current active selection (Cart). ✅ Done
  * Contextual Breadcrumbs: Hierarchical navigation back to the Hub or specific sectors. ✅ Done
* Discovery UX & Feedback:
  * Layout Shift Mitigation: High-fidelity skeleton loaders mirror ProductCard anatomy. ✅ Done
  * Performance & Visual Continuity: Implements aspect-[4/5] container constraints and next/image lazy loading with responsive sizes to prevent layout shift and optimize LCP (Largest Contentful Paint) across the product grid. ✅ Done
  * Viewport Persistence: The FilterBar uses a sticky positioning strategy (top-14 mobile / top-20 desktop) with backdrop-blur-md to maintain navigational context during deep scrolls. ✅ Done
  * Dynamic Response States:
    * Sector Empty: Feedback when no results for a selected world filter. ✅ Done
    * Connection Fallback: "Connection Interrupted" messaging for failed queries. ✅ Done

#### Transaction Lifecycle
* Selection Terminal (Cart):
  * State Orchestration: Synchronizes useCartStore for data and useUIStore for visibility. openSelection is triggered by global navigation, while internal actions within the overlay handle closure. ✅ Done
  * Hydration Guarding: Implements a mounted state check and isHydrated flag to prevent Next.js hydration mismatches between server-rendered HTML and local storage data. ✅ Done
  * Global Portal Injection: Injected at the root level via OverlayWrapper to ensure the selection interface maintains a consistent z-index and lifecycle independent of the current route's page content. ✅ Done
  * UX Interactions: Utilizes hapticFeedback and lockScroll utilities to manage tactile response and prevent background bleed during overlay interaction. ✅ Done
  * Real-time Pricing Engine: useCartItems hook dynamically calculates "Total Commitment" by mapping price_id to values via the pricing.ts utility. ✅ Done
  * Grounded Valuation: Pricing is resolved at the card level via the getPriceFromId engine, supporting "Complimentary" labeling for 0 value assets and standardized GBP formatting. ✅ Done
* Checkout Bridge:
  * Server-Side Verification: Re-fetches product data to prevent price tampering and confirm availability. ✅ Done
  * Identity Guarding: Requires authenticated sessions; maintains return-path persistence. ✅ Done
  * Gateway Integration: Dynamically generates Lemon Squeezy Hosted Checkout URLs via the REST API (v1). It injects user_id and a comma-separated list of product_ids into the checkout_data.custom object for webhook reconciliation. ✅ Done
  * Dynamic Redirect Logic: Supports custom success redirects, defaulting to ${SITE_URL}/checkout/success, with environment-aware URL resolution supporting both Netlify (process.env.URL) and standard public URLs. ✅ Done
  * Security Perimeter: Implements a crypto.timingSafeEqual HMAC SHA256 signature check. This ensures the request originates from Lemon Squeezy, neutralizing replay attacks and unauthorized spoofing attempts. ✅ Done
  * Fulfillment Logic: Automatically injects verified acquisitions into the user_library table with the unique order_id to ensure idempotency and permanent ownership records. ✅ Done
* Handoff & Loading (Calm Bridge):
  * Reassured State: "Calm Bridge" UI during external handoffs; PCI-DSS security indicators maintain trust. ✅ Done
  * Narrative Continuity: Frames technical wait as "Securing Connection" phase. ✅ Done
* Acquisition Recovery (Error):
  * Grounded Recovery: Ensures selections remain persistent in the vault. ✅ Done
  * Tactical Actions: Options to refresh connection or return to selection terminal. ✅ Done
* Acquisition Completion (Success):
* Secure Fulfillment: Verifies x-signature using crypto.timingSafeEqual before processing; prevents price spoofing by validating the total attribute (converted from cents) against internal product price IDs. ✅ Done
  * Vault Synchronization: Registers assets in the vault, framing as "Vault Opening." ✅ Done
  * Celebration & Direction: Triggers confetti and directs users to the User Library. ✅ Done

*Payment Processing (High-Level Placeholder):*  
* Lemon Squeezy Integration: Serves as the authoritative listener for one-time acquisitions (order_created). It validates the incoming variant_id against the pricing.ts internal registry to prevent total-amount tampering before fulfilling the asset. ✅ Done

---

### CONTENT & WORLDS (Intelligence System)
* Intelligence Briefings Archive:
  * Central Repository: Implements an indexed archive using server-side queries to aggregate technical frameworks and operational records. It uses staggered CSS animations for entry and provides narrative-aligned empty states ("Archive Indexing"). ✅ Done
  * Taxonomy & Metadata: Organized by category, showing read times and chronological indexing. ✅ Done
  * Narrative Consistency: Compass iconography and neutral gradients differentiate editorial content from commercial assets. ✅ Done
  * Reassured Empty State: "Archive Indexing" message maintains immersion for empty content. ✅ Done
* The Guide Vessel (Reading Experience):
  * Premium Consumption: Distraction-free interface using Tailwind Typography for legibility. ✅ Done
  * Authority & Verification: "Authority Anchors" and "Verified Intelligence Source" badges for credibility. ✅ Done
  * Consumption Feedback: ReadingProgressBar provides real-time progress tracking. ✅ Done
  * Contextual Persistence: Sticky navigation and async breadcrumbs maintain seamless flow. ✅ Done
  * Dynamic Resolution: Leverages Next.js 15 asynchronous parameter resolution for slug-based briefing retrieval and automated SEO metadata generation. ✅ Done
  * Markdown Render Layer: Employs a customized Tailwind Typography (prose) implementation for legibility, featuring world-specific blockquotes and rounded asset previews. ✅ Done
* Editorial UX & State Logic:
  * Partial Prerendering (PPR) Skeletons: GuideLoading mirrors metadata chips, authority bar, and content blocks to eliminate layout shift. ✅ Done
  * Dynamic Resolution: Async Next.js 15 slug handling and SEO metadata generation. ✅ Done

*World Sections (Specialized Hubs):*  
* Home World Immersion (/home): A specialized landing sector focused on domestic order and sanctuary management. It utilizes direct SSR queries via createClient for rapid, pre-filtered catalog delivery, bypassing the overhead of the global hub's dynamic searchParams logic. ✅ Done
* Lifestyle World Immersion (/lifestyle): A specialized sector focused on digital rituals, focus, and aesthetic utility. It utilizes a direct server-side query targeting the Lifestyle enum to deliver a high-fidelity "harmonized" collection. ✅ Done
* Tools World Immersion (/tools): A high-performance technical sector designed for professionals requiring architectural stability. It utilizes asynchronous SSR to index and retrieve assets from the Tools repository. ✅ Done
* Technical Identity (Tools): Features a utilitarian, high-contrast UI using kyn-slate-900 backgrounds and an animated Cpu core icon with a Zap performance indicator. ✅ Done 
* Standards Verification: Implements a "Standards Footer" utilizing ShieldCheck iconography to emphasize baseline performance and user autonomy. ✅ Done
* Visual Identity (Lifestyle): Employs a unique kyn-caramel color palette and thematic iconography (Wind, Sun, Coffee) to differentiate the atmosphere from other sectors. ✅ Done
* Editorial Theming: Features italicized brand typography and an integrated philosophy footer centered on "digital removal" and "permanent utility". ✅ Done
* Narrative Anchors: The Home World implements unique editorial components, including a "World Philosophy" footer with ShieldCheck indicators and a themed hero section (HomeIcon + Leaf accents) to establish sector-specific trust. ✅ Done
* Sector Context: Features integrated Breadcrumbs for hierarchical navigation and a live "Collection Counter" to validate the inventory of the Home sector at a glance. ✅ Done
---

### IDENTITY & ACCESS
* Account Settings / Profile Management:
  * Identity Registry: Implements a server-guarded settings interface that hydrates from getUserProfile(). It allows users to manage their "Full Identity" (display names) with direct synchronization to the Supabase profiles table. ✅ Done
  * Client-Side Synchronization: Utilizes SettingsForm for real-time profile updates, employing react-hot-toast for success/failure feedback and a PKCE-secured session for all mutations. ✅ Done
  * Autonomy Support: Provides a dedicated "Digital Autonomy" sector with direct mailto links for permanent account closure or data migration requests, emphasizing user-centric data control. ✅ Done
* Authentication Flows:
  * Login Flow: Server-side action via signInWithPassword; redirects to /library on success or appends ?error= on failure. ✅ Done
  * Signup Flow: Initiates registration via signUp with emailRedirectTo configured to the /auth/callback route via NEXT_PUBLIC_SITE_URL. ✅ Done
  * Logout Flow: Terminates session and redirects cleanly. ✅ Done
  * Post-Auth Redirection: Successful logins default to /library; signups trigger a message state prompting email verification. ✅ Done
  * Persistent Return-Path: Middleware injects return_to query parameters when redirecting unauthenticated users from protected routes to login. ✅ Done
* Callback & Session Exchange:
  * Identity Resolution: GET handler (/auth/callback) exchanges PKCE codes for persistent sessions. ✅ Done
  * URL Resolution Logic: Dynamic origin detection (local, preview, production) for reliable redirection. ✅ Done
  * Flow Control: 303 redirects guide users to /library or back to login with context-specific error codes. ✅ Done
* Client vs. Server Implementation:
  * Server-Side: Implements @supabase/ssr with Next.js 15 cookies() headers; uses getAll and setAll patterns with try-catch guards to handle Server Component cookie-setting restrictions. ✅ Done
  * Browser-Side: Implements createBrowserClient with a strictly enforced PKCE flow. Manages automatic session persistence and token refreshing within the browser context, enabling real-time UI updates and client-side auth state detection. ✅ Done
* Type & Schema Responsibilities:
  * Maps Supabase schema to TypeScript interfaces (Product, Profile, Guide, Purchase). ✅ Done
  * Domain Constants: Enforces strict typing via as const arrays for WORLDS (Home, Lifestyle, Tools) and FILE_TYPES (PDF, Notion, ZIP, etc.), acting as the single source of truth for the frontend. ✅ Done
  * Supports complex relational objects, e.g., UserLibrary with optional Product data. ✅ Done
  * Profile Resolution: Uses maybeSingle() queries to safely fetch profile metadata, preventing 406/404 errors during initial account creation or session hydration. ✅ Done
  * Relational Hydration: Defines UserLibrary as an intersected type that includes optional nested Product data, supporting complex join queries in the Vault. ✅ Done

---

### USER LIBRARY (The Vault)
* Permanent Archive Management:
  * The Vault Interface: High-security repository for user's collection; "Permanent Acquisitions" verified for life. ✅ Done
  * Asset Ownership Resolution: Relational queries synchronize library with product catalog, adding visual metadata and slugs. ✅ Done
  * Identity-Gated Access: Strict server-side auth with redirect logic; maintains deep-link persistence. ✅ Done
  * Technical Fulfillment: Implements a gated retrieval system using transient signed URLs (60-second TTL). Access is strictly restricted to authenticated users with a verified entry in the user_library table, preventing direct asset URL leakage. ✅ Done
  * Relational Fulfillment: Webhook inserts successful acquisitions into the user_library table with order_id and source metadata, marking status as active. ✅ Done
  * Local Cache Synchronization: Uses useVaultStore (Zustand) to maintain a client-side cache of owned assets, reducing the need for redundant Supabase queries during a session. ✅ Done
* Library Environment & Navigation (Layout):
  * Security Handrail: Sticky nav bar with backdrop-blur and "Secure Vault Access" status indicator. ✅ Done
  * Presence Awareness: PresenceBar shows authenticated session status. ✅ Done
  * Atmospheric Immersion: Fixed-position SVG fractal noise filter and pt-safe-top / pb-24 padding strategy ensures content remains legible and interactive across mobile and desktop viewports. ✅ Done
  * Visual Path Tracking: Implements usePathname for real-time active link indicators (icon color shifts and active-bar underlines). ✅ Done
* Library UX & Feedback:
  * The Quiet Vault (Empty State): High-contrast Shield iconography; "Explore Hub" CTA for new users. ✅ Done
  * Chronological Indexing: Tracks acquisition timestamps for every asset to show progression. ✅ Done
  * Valuation Logic: The useVault hook calculates the totalValue of the user's library by aggregating the historical price values of all stored products. ✅ Done

---

## 🛠️ Core Tech Stack (Reconnaissance Layer)
- **Framework:** Next.js (App Router) ✅ Done
- **Styling:** Tailwind CSS ✅ Done
- **Database/Auth:** Supabase ✅ Done
- **Payments:** Lemon Squeezy ✅ Done (needs verification for subscriptions)  
- **State Management:** Zustand implementation utilizing a hybrid persistence strategy:
  - persistent: cart and vault stores utilize localStorage to maintain user state across sessions.
  - volatile: ui store manages transient application states (e.g., isSelectionOpen) that reset upon page refresh to ensure a clean UX entry point. ✅ Done
  - Utilities: Uses clsx and tailwind-merge for dynamic styling; standardizes Intl.NumberFormat for multi-currency readiness (defaulting to GBP). ✅ Done
---

## 📂 Module Breakdown

### 🔐 Authentication & Security
- **Middleware (`/middleware.ts`):** Active session orchestrator that refreshes tokens via getUser(). It enforces route guarding for /library and /account while bypasssing /api/webhooks to minimize overhead. ✅ Done
- **Auth Actions (`app/auth/actions.ts`):** Implements use server actions for login, signup, and logout. Uses direct formData extraction and handles flow control via Next.js redirect with encoded URL parameters for feedback. ✅ Done

### 🛒 Marketplace & Payments
- **Flow:** `(marketplace)` routes handle the UI. ✅ Done
- **Integration (`lib/lemon-squeezy`):** Uses the /v1/checkouts endpoint for acquisitions. Webhook (/api/webhooks/lemon-squeezy) processes order_created events with HMAC SHA256 signature verification and cross-references external payment amounts against internal pricing.ts definitions. ✅ Done
- **Cart Logic (`lib/cart`):** Persisted via localStorage. Separated from Vault Logic (lib/store/vault.ts) which uses a independent persistence key (kynar-vault-storage) to track permanent acquisitions. ✅ Done

### 🗄️ Data Layer (`lib/supabase`)
- **Client vs Server:** Dual-client strategy. server.ts handles cookie-based RSC/SSR data fetching, while browser.ts provides the interactive client for hooks, real-time subscriptions, and local auth management. ✅ Done
- * Server Client: createServerClient implementation using the Next.js 15 asynchronous cookies() store for SSR/RSC session management.
- Browser Client: Singleton-pattern client factory for "use client" components. Configured with detectSessionInUrl: true to support PKCE callback processing and persistSession: true for local storage-backed auth state. ✅ Done
- Helpers: Canonical data-access layer providing typed abstractions for profile resolution (getUserProfile), server-side ownership validation (checkOwnership), and filtered discovery queries (getFilteredProducts). ✅ Done
- **Types:** Canonical Type System (v2.3) containing generated Supabase schema definitions for guides, products, profiles, purchases, and user_library. Includes domain-specific enums for WORLDS and FILE_TYPES to ensure UI/Database parity. ✅ Done

---

## 📝 File-by-File Ledger
| File Path | Primary Responsibility | Key Hooks/Methods |
| :--- | :--- | :--- |
| `app/(marketplace)/store/page.tsx` | Marketplace Hub | Primary async entry point for discovery; handles server-side filtering and search param resolution. ✅ Done |
| `app/(worlds)/home/page.tsx` | Home Sector Hub | Specialized SSR entry point for the Home World; implements narrative-driven headers and filtered product matrices. ✅ Done |
| `app/(worlds)/lifestyle/page.tsx ` | Lifestyle Sector Hub | SSR immersion page for the Lifestyle world; features refined thematic styling and direct Supabase filtering. ✅ Done |
| `app/(worlds)/tools/page.tsx` | Tools Sector Hub | SSR-driven technical repository for the Tools world; employs high-contrast utilitarian styling and direct database indexing. ✅ Done |
| `app/guides/page.tsx` | Briefings Archive | Central server-side repository for all world intelligence and operational frameworks. ✅ Done |
| `app/guides/[slug]/page.tsx` | Guide Vessel | Premium reading experience featuring authority verification and reading progress tracking. ✅ Done |
| `app/api/download/[id]/route.ts` | Fulfillment Gate | Validates asset ownership and generates time-limited signed URLs for secure downloads. ✅ Done |
| `app/api/webhooks/lemon-squeezy/route.ts` | Fulfillment Engine | Authoritative listener for secure payment events; performs signature validation, price verification, and database fulfillment. ✅ Done |
| `app/account/settings/page.tsx` | Identity Hub | Server-side entry for profile management; handles auth guarding and profile hydration. ✅ Done |
| `components/account/SettingsForm.tsx` | Profile Interface | Client-side form for updating user identity; features immediate feedback and validation logic. ✅ Done |
| `app/layout.tsx` | Root Architecture | Hydrates global UI; contains the OverlayWrapper for global portal management. ✅ Done
| `components/marketplace/OverlayWrapper.tsx` | Portal Orchestrator | Decouples the SelectionOverlay view from the layout structure using Zustand-driven state. ✅ Done |
| `lib/supabase/helpers.ts` | Server Data Access | Authenticated data fetching, ownership checks, and DB enum mapping. ✅ Done |
| `lib/supabase/browser.ts` | Client Interface | Auth state management, PKCE detection, and client-side database queries. ✅ Done |
| `lib/utils.ts` | Shared Core Utilities | Provides CSS class merging (Tailwind-safe), GBP currency formatting, browser-level haptic feedback, and viewport scroll-locking logic. ✅ Done |
| `components/layout/Navigation.tsx` | Global Navigation | Dual-axis (Mobile bottom/Desktop top) persistent bar. Manages route state and triggers the Selection portal. ✅ Done |
| `components/marketplace/AddToCartButton.tsx` | State Toggle | Manages the logic gate between "Select", "Selected", and "In Vault" states using shared stores. ✅ Done |
| `app/api/webhooks/lemon-squeezy/route.ts` | Fulfillment & Security | HMAC verification, Price validation, Supabase insertion. ✅ Done |

---

## 🚦 Integration Checklist for AI
- [x] Determine if the project uses Zustand or React Context for the cart (Confirmed: Zustand). ✅ Done
- [x] Map the relationship between `(worlds)` and `(marketplace)`. ✅ Done 

---

### PRESENTATION LAYER
* Global Layout: Navigation, Breadcrumbs, User Menus. ✅ Done
* Responsive Positioning: Adaptive UI logic that anchors navigation to the viewport bottom on mobile (pb-safe-bottom) and the viewport top on desktop via md:top-0.
* Selection Trigger: Integrated ShoppingBag button that utilizes useUIStore to toggle the global selection portal and useCartItems to display a live-count badge. ✅ Done
* Server-to-Client Hydration: getUserProfile() fetches session data at the root server level; results are serialized and passed as initialProfile to client components (PresenceBar, Navigation) to eliminate flicker. ✅ Done
* Engagement: Presence indicators, celebration (confetti), global theme implementation. ✅ Done
* Sensory Consistency: Implements a global Toaster configuration and a fixed-position SVG fractal noise texture (0.015 opacity) to maintain a tactile, "premium paper" atmosphere. ✅ Done
* Tactical Haptics: Integrated navigator.vibrate patterns for "light", "medium", and "success" states to reinforce UI interactions (Cart additions, successful logins). ✅ Done
* Viewport Portal Control: Centralized UI state machine via useUIStore orchestrates the entry and exit of the SelectionOverlay without prop-drilling through the layout tree. ✅ Done
* Clean UI Decoupling: Uses a dedicated wrapper component to prevent unnecessary re-renders of the entire RootLayout when toggling the selection portal. ✅ Done

---

### API & MIDDLEWARE
* Secure Downloads: Protected routes for file access. ✅ Done
* Routing Logic: Request-level authentication and path guarding. Protections active for /library and /account; auto-redirection to /library for authenticated users attempting to access /auth routes. ✅ Done
* Edge Optimization: Single-response mutation for cookie setting, optimized for Netlify Edge environments. ✅ Done
* Secure Asset Handoff: Uses NextResponse.redirect with a 303 See Other status to transition users from the internal API route to the protected Supabase Storage bucket, ensuring the transaction remains hidden from browser history. ✅ Done
---

### DEPLOYMENT & TOOLING
* Platform: Netlify deployment via netlify.toml. ✅ Done
* Testing: Webhook simulation scripts for integration testing. ✅ Done
* Environment: Env variable management, TypeScript, ESLint configuration. ✅ Done
* 




