# 🏗️ Implementation Plan — Portfolio Capluk

> **Strategy:** Module-by-module, simplest → complex
> **Each module is self-contained and testable**
> **Timeline:** 10 days (~55-70 hours estimated)

---

## Build Order Overview

```
Module 1: Foundation (Day 1-2)
    ↓
Module 2: Layout Shell (Day 2)
    ↓
Module 3: Hero Section (Day 2-3)
    ↓
Module 4: About Section (Day 3)
    ↓
Module 5: Expertise Section (Day 3-4)
    ↓
Module 6: Connect Section (Day 4)
    ↓
Module 7: Journey Section (Day 4-5)
    ↓
Module 8: Portfolio Section (Day 5-6)
    ↓
Module 9: Horizontal Navigation + GSAP (Day 6-7)
    ↓
Module 10: Theme System (Day 7)
    ↓
Module 11: Animations Polish (Day 7-8)
    ↓
Module 12: i18n Multi-language (Day 8)
    ↓
Module 13: Responsive Adaptation (Day 8-9)
    ↓
Module 14: SEO + PWA + Performance (Day 9)
    ↓
Module 15: Final Polish + Deploy (Day 9-10)
```

---

## Module Details

### Module 1: Foundation ⬜
**Priority:** 🔴 Critical | **Est:** 3-4h | **Day:** 1-2

**What to build:**
- Initialize Next.js 15 project with TypeScript
- Install all dependencies (TailwindCSS 4, GSAP, next-intl, etc.)
- Set up folder structure (as defined in `04-tech-stack.md`)
- Configure TailwindCSS with custom theme tokens
- Set up CSS custom properties for both themes
- Self-host Thunder font (download, subset, @font-face)
- Configure Google Fonts via `next/font`
- Create base layout (`layout.tsx`) with font loading
- Set up `globals.css` with design tokens
- Create `constants.ts` with all data

**Dependencies:** None
**Test:** Project runs with `npm run dev`, fonts load correctly

---

### Module 2: Layout Shell ⬜
**Priority:** 🔴 Critical | **Est:** 2-3h | **Day:** 2

**What to build:**
- `Navbar.tsx` — Bottom-centered navigation bar with 5 tabs
- `ThemeToggle.tsx` — toggle theme in liquid glass (light, cinematic)
- `CollabBadge.tsx` — "Open for Collaboration" badge in top-right
- `CustomCursor.tsx` — Custom cursor component
- `BackgroundText.tsx` — Large section name text component
- Basic page layout in `page.tsx` — sections stacked (vertical for now)

**Dependencies:** Module 1
**Test:** All layout elements render, nav tabs clickable, cursor works

---

### Module 3: Hero Section ⬜
**Priority:** 🔴 Critical | **Est:** 3-4h | **Day:** 2-3

**What to build:**
- `HeroSection.tsx` — Initial landing state
- Hero photo placement (full-bleed, centered)
- Glass card with profile photo and name
- Role titles with GSAP stagger animation
- Tagline text below nav (Bruno Ace font)
- Bio text paragraph

**Dependencies:** Module 2
**Test:** Hero renders with photo, text animates in, glass card visible

---

### Module 4: About Section ⬜
**Priority:** 🔴 Critical | **Est:** 1-2h | **Day:** 3

**What to build:**
- `AboutSection.tsx` — Bio section
- Tagline: "Analog Roots. Digital Future." (Bruno Ace)
- Full bio text paragraph
- Background text: "ABOUT"

**Dependencies:** Module 2
**Test:** About section renders, background text visible behind photo

---

### Module 5: Expertise Section ⬜
**Priority:** 🔴 Critical | **Est:** 3-4h | **Day:** 3-4

**What to build:**
- `ExpertiseSection.tsx` — Skills breakdown
- 3-column layout: Multimedia, Motion/VFX, Technical Tools
- Skills listed under each category heading
- Description paragraph below nav
- Background text: "EXPERTISE"

**Dependencies:** Module 2
**Test:** 3-column layout renders, all skills listed, responsive columns

---

### Module 6: Connect Section ⬜
**Priority:** 🔴 Critical | **Est:** 3-4h | **Day:** 4

**What to build:**
- `ConnectSection.tsx` — Contact form + social links
- Contact form with React Hook Form (Name, Email, Subject, Message)
- Form validation
- API route `/api/contact` (email sending via Resend or simple webhook)
- Social media buttons (LinkedIn, Instagram, YouTube, Behance)
- WhatsApp direct link button
- Resume/CV download button (dummy PDF)
- Background text: "CONNECT"

**Dependencies:** Module 2
**Test:** Form submits, validation works, social links open correctly

---

### Module 7: Journey Section ⬜
**Priority:** 🔴 Critical | **Est:** 4-5h | **Day:** 4-5

**What to build:**
- `JourneySection.tsx` — Career timeline
- `TimelineCard.tsx` — Glassmorphism timeline cards
- `GlassCard.tsx` — Reusable glass card component
- 4 timeline cards: Binus → Starvision → Freelance → Mataque
- 5 Feature Films grid with poster thumbnails
- Awards/nominations section
- Tilt effect on glass cards (Vanilla Tilt or custom)
- Background text: "JOURNEY"

**Dependencies:** Module 2
**Test:** Timeline cards render with glass effect, tilt works on hover

---

### Module 8: Portfolio Section ⬜
**Priority:** 🔴 Critical | **Est:** 6-8h | **Day:** 5-6

**What to build:**
- `PortfolioSection.tsx` — Video showcase
- `VideoCard.tsx` — Glass video card with play icon
- Category filter buttons (Intro Animation, Social Media Ads, Title Design, Visual FX)
- YouTube embed via `lite-youtube-embed`
- `Modal.tsx` — Reusable modal component
- Video modal with full player + project details
- Hover behavior (video preview + sound)
- Background text: "PORTFOLIO"

**Dependencies:** Module 2, Module 7 (GlassCard)
**Test:** Videos embed, filter works, modal opens/closes, hover preview plays

---

### Module 9: Horizontal Navigation + GSAP ⬜
**Priority:** 🔴 Critical | **Est:** 6-8h | **Day:** 6-7

**What to build:**
- Convert vertical stack to horizontal panel layout
- GSAP ScrollTrigger horizontal scroll hijacking
- Scroll down = slide left, scroll up = slide right
- Tab click = animate to target section
- `useActiveSection.ts` hook — track current section
- Active tab highlight animation
- Nav bar reveal animation (initial state → expanded)
- Hero photo parallax/shift on section change
- Background text transition on section change
- `useGSAP.ts` hook — GSAP lifecycle management

**Dependencies:** Modules 3-8 (all sections built)
**Test:** Horizontal scroll works on desktop, tabs trigger transitions, background text updates

---

### Module 10: Theme System ⬜
**Priority:** 🟡 High | **Est:** 4-5h | **Day:** 7

**What to build:**
- `useTheme.ts` hook — theme state management
- CSS custom properties for Warm Cinematic theme
- CSS custom properties for Grayscale theme
- "C" monogram toggle animation (GSAP)
- Theme transition: cross-fade, color morph
- Hero photo grayscale filter on theme change
- Background text opacity/color adjustment per theme
- LocalStorage persistence for theme preference

**Dependencies:** Module 2, Module 9
**Test:** Toggle switches themes, all elements update, preference persists

---

### Module 11: Animations Polish ⬜
**Priority:** 🟡 High | **Est:** 4-5h | **Day:** 7-8

**What to build:**
- `IntroAnimation.tsx` — Loading sequence (logo reveal → text → hero fade-in)
- `TextReveal.tsx` — Reusable text animation component
- Section transition refinements (easing, timing)
- Glass card entrance animations
- Portfolio video card hover animations
- "Open for Collaboration" pulse animation
- Modal open/close animations (scale + fade)
- `prefers-reduced-motion` — disable/simplify all animations

**Dependencies:** Module 9, Module 10
**Test:** Intro plays on load, all transitions smooth at 60fps, reduced-motion works

---

### Module 12: i18n Multi-language ⬜
**Priority:** 🟡 High | **Est:** 4-5h | **Day:** 8

**What to build:**
- `LanguageToggle.tsx` — EN/ID switcher
- `en.json` — All English text content
- `id.json` — All Indonesian text content
- next-intl provider setup
- Dynamic text swap animation on language change
- SEO meta tags update on language change
- Cookie/localStorage persistence for language preference

**Dependencies:** All sections built
**Test:** Toggle switches all text, no hardcoded strings remain, SEO updates

---

### Module 13: Responsive Adaptation ⬜
**Priority:** 🔴 Critical | **Est:** 6-8h | **Day:** 8-9

**What to build:**
- Mobile layout (375px) — vertical content within sections, swipe between
- Tablet layout (768px) — adjusted grid, smaller nav
- Desktop verified (1440px)
- Touch gestures for mobile horizontal navigation
- Mobile navigation adaptation (scrollable tabs or compact menu)
- Mobile custom cursor disabled
- Background text size scaling (mobile: 10vw, tablet: 12vw, desktop: 20vw)
- Test on real devices / device emulation

**Dependencies:** All modules
**Test:** All breakpoints render correctly, touch gestures work, no horizontal overflow

---

### Module 14: SEO + PWA + Performance ⬜
**Priority:** 🟡 High | **Est:** 5-6h | **Day:** 9

**What to build:**
- Dynamic meta tags per section (title, description, OG image)
- JSON-LD Person schema for Capluk
- Open Graph images (generate or design)
- `sitemap.xml` auto-generation
- `robots.txt`
- PWA manifest.json
- Service Worker setup via next-pwa
- Image optimization verification (Cloudinary transforms)
- Lazy loading verification
- Lighthouse audit and fixes
- Font subsetting verification

**Dependencies:** All modules
**Test:** Lighthouse 90+ all categories, PWA installable, OG preview works

---

### Module 15: Final Polish + Deploy ⬜
**Priority:** 🔴 Critical | **Est:** 3-4h | **Day:** 9-10

**What to build:**
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Final animation timing adjustments
- Copy/content review
- Error handling (404, form errors, video load failures)
- Analytics setup (Vercel Analytics + Google Analytics)
- Deploy to Vercel
- Domain connection (capluk.com via Namecheap)
- SSL verification
- Final Lighthouse audit
- Client handover

**Dependencies:** All modules
**Test:** Live site works, domain resolves, SSL green, analytics tracking

---

## Time Estimate Summary

| Module | Est. Hours | Day |
|--------|-----------|-----|
| M1: Foundation | 3-4h | 1-2 |
| M2: Layout Shell | 2-3h | 2 |
| M3: Hero Section | 3-4h | 2-3 |
| M4: About Section | 1-2h | 3 |
| M5: Expertise Section | 3-4h | 3-4 |
| M6: Connect Section | 3-4h | 4 |
| M7: Journey Section | 4-5h | 4-5 |
| M8: Portfolio Section | 6-8h | 5-6 |
| M9: Horizontal Nav + GSAP | 6-8h | 6-7 |
| M10: Theme System | 4-5h | 7 |
| M11: Animations Polish | 4-5h | 7-8 |
| M12: i18n Multi-language | 4-5h | 8 |
| M13: Responsive | 6-8h | 8-9 |
| M14: SEO + PWA + Perf | 5-6h | 9 |
| M15: Final Polish + Deploy | 3-4h | 9-10 |
| **TOTAL** | **~58-75h** | **10 days** |

---
