# 🗺️ Sitemap — Portfolio Capluk

> **Architecture:** Single-Page Application with horizontal section navigation
> **Route Strategy:** Single route `/` with hash-based section anchors

---

## 1. Page Structure

Since this is a single-page horizontal slide website, there are no traditional routes. Navigation is handled via GSAP-powered horizontal transitions between section panels.

```
capluk.com/
├── / (Main — Single Page)
│   ├── #hero          → Initial view (no tab active)
│   ├── #portfolio     → Tab 1: Video showcase
│   ├── #expertise     → Tab 2: Skills breakdown
│   ├── #about         → Tab 3: Bio & tagline
│   ├── #journey       → Tab 4: Career timeline
│   └── #connect       → Tab 5: Contact form
│
├── Overlays (Modals — no route change)
│   ├── Portfolio Video Modal
│   ├── Film Details Modal
│   └── Career Detail Modal (optional)
│
└── System
    ├── /manifest.json  → PWA manifest
    ├── /sitemap.xml    → Auto-generated
    ├── /robots.txt     → Standard
    └── /api/contact    → Form submission endpoint
```

---

## 2. Navigation Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│                          HERO STATE                              │
│                    (Initial landing view)                         │
│         Hero Photo + Role titles + Nav tabs only                 │
│                                                                  │
│                      ↓ Click tab / Scroll ↓                      │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  │PORTFOLIO │→ │EXPERTISE │→ │  ABOUT   │→ │ JOURNEY  │→ │ CONNECT  │
│  │          │  │          │  │          │  │          │  │          │
│  │ Videos   │  │ Skills   │  │ Bio +    │  │ Timeline │  │ Form +   │
│  │ Grid +   │  │ 3-col    │  │ Tagline  │  │ Glass    │  │ Socials  │
│  │ Filters  │  │ Layout   │  │ Photo    │  │ Cards    │  │ WhatsApp │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘
│       ←  ←  ← Scroll Up = Slide RIGHT  ←  ←  ←                  │
│       →  →  → Scroll Down = Slide LEFT  →  →  →                 │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. Z-Index Layer Stack

Understanding the visual stacking is critical for this design:

```
Layer 5 (Top)    → Custom Cursor
Layer 4          → Modals / Overlays
Layer 3          → Navigation Bar (bottom-center)
Layer 2          → UI Elements ("C" logo, "Open for Collaboration", lang toggle)
Layer 1          → Section Content (text, cards, videos)
Layer 0          → Hero Photo
Layer -1 (Back)  → Dynamic Background Text (PORTFOLIO, ABOUT, etc.)
Layer -2         → Gradient Background
```

---

## 4. Section Detail Map

### 4.1 Hero State (Default Landing)

| Element | Position | Behavior |
|---------|----------|----------|
| "C" Monogram | Top-left | Theme toggle. Click = switch warm ↔ grayscale |
| "Open for Collaboration" Badge | Top-right | Pulse animation. Dynamic via config |
| Hero Photo | Center full-bleed | Static, transitions when tab changes |
| Role Titles | Overlaid on photo | "Creative Director", "Motion Designer", "VFX Artist", "Video Production Specialist" — staggered animate-in |
| Glass Card (Name) | Top-left area | Small profile photo + "HERDANIUS LAROBU (CAPLUK)" |
| Navigation Bar | Bottom-center | 5 tabs: Portfolio, Expertise, About, Journey, Connect |
| Language Toggle | Near nav or header | EN/ID switch |

### 4.2 Portfolio Section (#portfolio)

| Element | Description |
|---------|-------------|
| Background Text | "PORTFOLIO" in Thunder font, oversized, low opacity |
| Category Filter Buttons | Intro Animation, Social Media Ads, Title Design Animation, Visual FX |
| Video Cards | Glassmorphism cards with play icon + category name |
| Interaction | Hover = video preview + sound. Click = open modal |
| Below-nav Text | Description paragraph about curated portfolio |

### 4.3 Expertise Section (#expertise)

| Element | Description |
|---------|-------------|
| Background Text | "EXPERTISE" in Thunder font |
| 3-Column Layout | Multimedia Production (left), Motion Graphics & VFX (center), Technical Tools (right) |
| Text Style | Category title in bold, items listed below |
| Below-nav Text | "Exploring new tech for visual." + description paragraph |

### 4.4 About Section (#about)

| Element | Description |
|---------|-------------|
| Background Text | "ABOUT" in Thunder font |
| Tagline | "Analog Roots. Digital Future." in Bruno Ace font |
| Bio Text | Full bio paragraph from mockup |
| Below-nav Text | Bio content with tagline |

### 4.5 Journey Section (#journey)

| Element | Description |
|---------|-------------|
| Background Text | "JOURNEY" in Thunder font |
| Timeline Cards | Glassmorphism cards arranged horizontally |
| Card 1 | Information Technology — Bachelor Degree — Binus University |
| Card 2 | Visual VFX Artist / Motion Designer — Starvision |
| Card 3 | Film Director — Freelance |
| Card 4 | Creative Director — Mataque Studio |
| Film Grid | 5 Feature Films with poster thumbnails |
| Awards Section | 3x Piala Citra nominations with icons |

### 4.6 Connect Section (#connect)

| Element | Description |
|---------|-------------|
| Background Text | "CONNECT" in Thunder font |
| Contact Form | Name, Email, Subject, Message fields |
| Social Links | LinkedIn, Instagram, YouTube, Behance |
| WhatsApp | Direct link/button |
| Email | Display + click-to-copy |
| Resume/CV | Download PDF button |

---

## 5. Modal Components

| Modal | Trigger | Content |
|-------|---------|---------|
| **Video Player Modal** | Click portfolio video card | YouTube player (large), project title, category, description, related videos |
| **Film Detail Modal** | Click film poster in Journey | Film poster, title, year, genre, cast, Capluk's role, trailer link |

---

## 6. SEO Mapping

| Section | Title Tag | Meta Description |
|---------|-----------|-----------------|
| Hero/Default | "Capluk — Creative Director & Motion Designer" | "Portfolio of Herdanius Larobu (Capluk) — Film Director, VFX Artist, and Motion Graphic Designer with 25+ years experience in Indonesian cinema." |
| Portfolio | "Portfolio — Capluk" | "Curated portfolio of cinematic storytelling, visual effects, and motion graphics." |
| Expertise | "Expertise — Capluk" | "Multimedia production, motion graphics, VFX, and technical tools expertise." |
| About | "About — Capluk" | "Analog Roots. Digital Future. 25+ years navigating the evolution of screen media." |
| Journey | "Journey — Capluk" | "Career timeline: Binus University to Creative Director at Mataque Studio. 5 feature films, 70+ VFX credits." |
| Connect | "Connect — Capluk" | "Get in touch with Capluk for collaboration, directing, or VFX work." |

---

