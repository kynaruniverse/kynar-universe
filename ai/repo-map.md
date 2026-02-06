# REPO MAP & TECH LEDGER (KYNAR UNIVERSE)

## APP OVERVIEW
* Modular web application built with Next.js, combining a digital marketplace with content-driven "worlds" and educational guides.
* Centralized logic for state management, authentication, external payments, and database connectivity.

---

## CORE DOMAINS & SUBSYSTEMS

### MARKETPLACE

#### Discovery & Catalog
* Marketplace Hub (Store):
  * Curated Discovery: Responsive grid presenting "Permanent Acquisitions" via high-fidelity visual cards. ✅ Done
  * Sector-Based Filtering: Dynamic server-side filtering using UI "World" selections (Home, Lifestyle, Tools) mapped to database enums. ✅ Done
  * Sticky Discovery Controls: Persistent FilterBar with backdrop-blur during scrolling. ✅ Done
  * Async Param Resolution: Resolves search parameters asynchronously to ensure stable builds. ✅ Done
* Product Specification (Detail Page):
  * Technical Architecture: Renders asset deep-dives, including descriptions, visual previews, and format markers (PDF, Notion, ZIP). ✅ Done
  * Dual-State Transactional Logic:
    * Acquisition Path: AddToCartButton integrates with pricing engine for unowned assets. ✅ Done
    * Vault Verification: Checks server-side ownership; transforms UI to "In Your Vault" if already owned. ✅ Done
  * Contextual Breadcrumbs: Hierarchical navigation back to the Hub or specific sectors. ✅ Done
* Discovery UX & Feedback:
  * Layout Shift Mitigation: High-fidelity skeleton loaders mirror ProductCard anatomy. ✅ Done
  * Dynamic Response States:
    * Sector Empty: Feedback when no results for a selected world filter. ✅ Done
    * Connection Fallback: "Connection Interrupted" messaging for failed queries. ✅ Done

#### Transaction Lifecycle
* Selection Terminal (Cart):
  * State Orchestration: Manages real-time "Total Commitment" and unit counts; mounting guards prevent SSR pricing mismatches. ✅ Done
  * UX Interactions: Haptic-guided removal and clearing actions; dynamic empty states guide users back to discovery. ✅ Done
* Checkout Bridge:
  * Server-Side Verification: Re-fetches product data to prevent price tampering and confirm availability. ✅ Done
  * Identity Guarding: Requires authenticated sessions; maintains return-path persistence. ✅ Done
  * Gateway Integration: Generates unique Lemon Squeezy checkout URLs with encrypted identity metadata. ✅ Done
* Handoff & Loading (Calm Bridge):
  * Reassured State: "Calm Bridge" UI during external handoffs; PCI-DSS security indicators maintain trust. ✅ Done
  * Narrative Continuity: Frames technical wait as "Securing Connection" phase. ✅ Done
* Acquisition Recovery (Error):
  * Grounded Recovery: Ensures selections remain persistent in the vault. ✅ Done
  * Tactical Actions: Options to refresh connection or return to selection terminal. ✅ Done
* Acquisition Completion (Success):
  * Vault Synchronization: Registers assets in the vault, framing as "Vault Opening." ✅ Done
  * Celebration & Direction: Triggers confetti and directs users to the User Library. ✅ Done

*Payment Processing (High-Level Placeholder):*  
* [PLACEHOLDER: Confirm if Lemon Squeezy handles subscriptions, one-time payments, and webhook sync.] ❌ Pending

---

### CONTENT & WORLDS (Intelligence System)
* Intelligence Briefings Archive:
  * Central Repository: Hub for technical frameworks and world-building records with staggered-animation grid. ✅ Done
  * Taxonomy & Metadata: Organized by category, showing read times and chronological indexing. ✅ Done
  * Narrative Consistency: Compass iconography and neutral gradients differentiate editorial content from commercial assets. ✅ Done
  * Reassured Empty State: "Archive Indexing" message maintains immersion for empty content. ✅ Done
* The Guide Vessel (Reading Experience):
  * Premium Consumption: Distraction-free interface using Tailwind Typography for legibility. ✅ Done
  * Authority & Verification: "Authority Anchors" and "Verified Intelligence Source" badges for credibility. ✅ Done
  * Consumption Feedback: ReadingProgressBar provides real-time progress tracking. ✅ Done
  * Contextual Persistence: Sticky navigation and async breadcrumbs maintain seamless flow. ✅ Done
* Editorial UX & State Logic:
  * Partial Prerendering (PPR) Skeletons: GuideLoading mirrors metadata chips, authority bar, and content blocks to eliminate layout shift. ✅ Done
  * Dynamic Resolution: Async Next.js 15 slug handling and SEO metadata generation. ✅ Done

*World Sections (High-Level Placeholder):*  
* Home, Lifestyle, and Tools. ✅ Done (basic)  
* [PLACEHOLDER: Are there additional sub-pages or feature flags per world?] ❌ Pending

---

### IDENTITY & ACCESS
* Authentication Flows:
  * Login Flow: Server-side login via signInWithPassword; UI state via useFormStatus and URL-driven feedback. ✅ Done
  * Signup Flow: Initiates registration with explicit emailRedirectTo for PKCE; post-registration UX via query params. ✅ Done
  * Logout Flow: Terminates session and redirects cleanly. ✅ Done
* Callback & Session Exchange:
  * Identity Resolution: GET handler (/auth/callback) exchanges PKCE codes for persistent sessions. ✅ Done
  * URL Resolution Logic: Dynamic origin detection (local, preview, production) for reliable redirection. ✅ Done
  * Flow Control: 303 redirects guide users to /library or back to login with context-specific error codes. ✅ Done
* Client vs. Server Implementation:
  * Server-Side: Cookie integration bridges headers with Supabase state; getAll/setAll with defensive SSR guards. ✅ Done
  * Browser-Side: Automatic token refresh, session persistence, URL detection; enforces PKCE flow and environment validation. ✅ Done
* Type & Schema Responsibilities:
  * Maps Supabase schema to TypeScript interfaces (Product, Profile, Guide, Purchase). ✅ Done
  * Defines strict domain constants (WORLDS, FILE_TYPES, GuideCategory) for UI/Database parity. ✅ Done
  * Supports complex relational objects, e.g., UserLibrary with optional Product data. ✅ Done
  * Profile resolution safely fetches authenticated metadata. ✅ Done

---

### USER LIBRARY (The Vault)
* Permanent Archive Management:
  * The Vault Interface: High-security repository for user's collection; "Permanent Acquisitions" verified for life. ✅ Done
  * Asset Ownership Resolution: Relational queries synchronize library with product catalog, adding visual metadata and slugs. ✅ Done
  * Identity-Gated Access: Strict server-side auth with redirect logic; maintains deep-link persistence. ✅ Done
  * Technical Fulfillment: Direct entry for secure downloads and integrated technical guides. ✅ Done
* Library Environment & Navigation (Layout):
  * Security Handrail: Sticky nav bar with backdrop-blur and "Secure Vault Access" status indicator. ✅ Done
  * Presence Awareness: PresenceBar shows authenticated session status. ✅ Done
  * Atmospheric Immersion: Subtle fixed SVG background and safe-bottom-padding for premium feel. ✅ Done
* Library UX & Feedback:
  * The Quiet Vault (Empty State): High-contrast Shield iconography; "Explore Hub" CTA for new users. ✅ Done
  * Chronological Indexing: Tracks acquisition timestamps for every asset to show progression. ✅ Done

---

## 🛠️ Core Tech Stack (Reconnaissance Layer)
- **Framework:** Next.js (App Router) ✅ Done
- **Styling:** Tailwind CSS ✅ Done
- **Database/Auth:** Supabase ✅ Done
- **Payments:** Lemon Squeezy ✅ Done (needs verification for subscriptions)  
- **State Management:** [PLACEHOLDER: Check `lib/cart/store.ts` for Zustand vs Context.] ❌ Pending

---

## 📂 Module Breakdown

### 🔐 Authentication & Security
- **Middleware (`/middleware.ts`):** [PLACEHOLDER: Confirm if routes are protected or session-sync only.] ❌ Pending
- **Auth Actions (`app/auth/actions.ts`):** [PLACEHOLDER: Identify if using Server Actions for Login/Signup.] ❌ Pending

### 🛒 Marketplace & Payments
- **Flow:** `(marketplace)` routes handle the UI. ✅ Done
- **Integration (`lib/lemon-squeezy`):** [PLACEHOLDER: Confirm subs vs one-time payments handling.] ❌ Pending
- **Cart Logic (`lib/cart`):** [PLACEHOLDER: Check if state persisted to LocalStorage or DB.] ❌ Pending

### 🗄️ Data Layer (`lib/supabase`)
- **Client vs Server:** [PLACEHOLDER: Check `server.ts` for `createServerClient` usage.] ❌ Pending
- **Types:** [PLACEHOLDER: Check `types.ts` for DB schema structure.] ❌ Pending

---

## 📝 File-by-File Ledger
| File Path | Primary Responsibility | Key Hooks/Methods |
| :--- | :--- | :--- |
| `app/layout.tsx` | Root Layout / Providers | [PLACEHOLDER] ❌ Pending |
| `lib/utils.ts` | Shared Helper Functions | [PLACEHOLDER] ❌ Pending |
| `components/layout/Navigation.tsx` | Main Nav Logic | [PLACEHOLDER] ❌ Pending |
| `app/api/webhooks/lemon-squeezy/route.ts` | Payment Verification | [PLACEHOLDER] ❌ Pending |

---

## 🚦 Integration Checklist for AI
- [ ] Determine if the project uses **Zustand** or **React Context** for the cart. ❌ Pending
- [ ] Map the relationship between `(worlds)` and `(marketplace)`. ❌ Pending
- [ ] Confirm the Supabase Auth strategy (PKCE vs Implicit). ❌ Pending

---

### PRESENTATION LAYER
* Global Layout: Navigation, Breadcrumbs, User Menus. ✅ Done
* Engagement: Presence indicators, celebration (confetti), global theme implementation. ✅ Done

---

### API & MIDDLEWARE
* Secure Downloads: Protected routes for file access. ✅ Done
* Routing Logic: Request-level authentication and path guarding via Next.js middleware. ✅ Done

---

### DEPLOYMENT & TOOLING
* Platform: Netlify deployment via netlify.toml. ✅ Done
* Testing: Webhook simulation scripts for integration testing. ✅ Done
* Environment: Env variable management, TypeScript, ESLint configuration. ✅ Done