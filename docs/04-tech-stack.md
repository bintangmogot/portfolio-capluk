# 🔧 Tech Stack — Portfolio Capluk

> **Status:** 🔒 LOCKED — No changes without explicit approval
> **Last Updated:** March 29, 2026

---

## 1. Core Stack

| Layer | Technology | Version | Status |
|-------|-----------|---------|--------|
| **Framework** | Next.js (App Router) | 15 | 🔒 Locked |
| **Language** | TypeScript | Latest stable | 🔒 Locked |
| **Styling** | TailwindCSS | 4 | 🔒 Locked |
| **Animation** | GSAP | Latest | 🔒 Locked |

---

## 2. GSAP Plugins Required

| Plugin | Purpose | License |
|--------|---------|---------|
| **ScrollTrigger** | Horizontal section transitions, scroll-based animations | Free (Club GreenSock not required) |
| **Timeline** | Sequenced animations — intro, transitions, theme toggle | Free |
| **SplitText** | Text character/word splitting for background text animation | Club GreenSock (or use custom split) |

> [!NOTE]
> **SplitText Alternative:** If Club GreenSock is not available, implement a custom text splitting utility. The background text animation (section name) can use CSS-based character animation or a lightweight custom split function.

---

## 3. Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^15 | React framework with SSG/SSR |
| `react` | ^19 | UI library |
| `react-dom` | ^19 | DOM rendering |
| `gsap` | ^3 | Animation engine |
| `next-intl` | ^4 | Internationalization (EN/ID) |
| `@nicepkg/lite-youtube-embed` | Latest | Performant YouTube embeds |
| `lucide-react` | Latest | Icon library |
| `react-hook-form` | ^7 | Form handling |
| `next-pwa` | Latest | PWA/offline support |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5 | Type checking |
| `@types/react` | Latest | React type definitions |
| `@types/node` | Latest | Node type definitions |
| `tailwindcss` | ^4 | Utility-first CSS |
| `eslint` | Latest | Code linting |
| `eslint-config-next` | Latest | Next.js ESLint rules |
| `prettier` | Latest | Code formatting |

---

## 4. External Services

| Service | Purpose | Tier | Cost |
|---------|---------|------|------|
| **Vercel** | Hosting, CDN, SSL, serverless | Hobby (Free) | $0/mo |
| **Cloudinary** | Image CDN & optimization | Free | $0/mo (25GB storage, 25GB bandwidth) |
| **YouTube** | Video hosting | Free | $0 |
| **Google Fonts** | Urbanist, Bebas Neue, Bruno Ace | Free | $0 |
| **Google Analytics** | Traffic analytics | Free | $0 |
| **Namecheap** | Domain registration (capluk.com) | Annual | ~$9/yr |

---

## 5. Font Strategy

| Font | Source | Loading Strategy |
|------|--------|-----------------|
| **Thunder** | Self-hosted (Gumroad free download) | `@font-face` with subset, WOFF2 format, `font-display: swap` |
| **Urbanist** | Google Fonts | Next.js `next/font/google`, variable font |
| **Bebas Neue** | Google Fonts | Next.js `next/font/google` |
| **Bruno Ace** | Google Fonts | Next.js `next/font/google` |

> **Font Subsetting:** Thunder font will be subsetted to include only uppercase letters, numbers, and basic punctuation to minimize file size.

---

## 6. Architecture Decisions

### Why Next.js 15 (App Router)?
- **SSG** for portfolio pages = perfect SEO + fast loads
- **Image Optimization** via `next/image` + Cloudinary loader
- **App Router** for modern React patterns (Server Components, streaming)
- **API Routes** for contact form endpoint
- **PWA** support via `next-pwa`

### Why TailwindCSS 4?
- **CSS-first** configuration (no more `tailwind.config.js`)
- **Lightning CSS** engine for fast builds
- **Custom properties** natively supported = better theme system
- **Consistent** with developer's (Bintang's) standard stack

### Why GSAP over Framer Motion?
- **ScrollTrigger** provides horizontal scroll hijacking
- **Timeline** API gives precise multi-step animation control
- **Performance** — GSAP is optimized for 60fps complex animations
- **Community** — Well-documented for creative/portfolio sites
- **SplitText** capability for background text character animation

### Why next-intl over next-i18next?
- **App Router native** — designed for Next.js 15 App Router
- **Type-safe** — full TypeScript support
- **Lightweight** — smaller bundle than next-i18next
- **ICU message format** — industry standard

---

## 7. Image Strategy

```
Source Images → Cloudinary Upload → Cloudinary CDN → next/image
                                     ↓
                              f_auto (format)
                              q_auto (quality)
                              w_xxx (width)
                              dpr_2 (retina)
```

| Image Type | Cloudinary Transform | Sizes |
|-----------|---------------------|-------|
| Hero Photo | `f_auto,q_auto,w_1440` | 375, 768, 1024, 1440 |
| Film Posters | `f_auto,q_auto,w_300` | 150, 300 |
| OG Images | `f_auto,q_auto,w_1200,h_630,c_fill` | 1200x630 |
| Profile Photo | `f_auto,q_auto,w_200,ar_1:1,c_fill` | 100, 200 |

---

## 8. Video Strategy

```
YouTube Videos → lite-youtube-embed → Click → YouTube iframe
                      ↓
                Facade pattern:
                - Shows static thumbnail first
                - Loads iframe only on click/hover
                - Reduces initial page weight by ~500KB per embed
```

---

## 9. Folder Structure Preview

```
portfolio-capluk/
├── public/
│   ├── fonts/
│   │   └── thunder/          # Self-hosted Thunder font
│   ├── images/               # Static images (fallbacks)
│   ├── manifest.json         # PWA manifest
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (fonts, theme, metadata)
│   │   ├── page.tsx          # Main single-page entry
│   │   ├── globals.css       # TailwindCSS imports + custom properties
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts  # Contact form API
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── LanguageToggle.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── CollabBadge.tsx
│   │   │   └── BackgroundText.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── PortfolioSection.tsx
│   │   │   ├── ExpertiseSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── JourneySection.tsx
│   │   │   └── ConnectSection.tsx
│   │   ├── ui/
│   │   │   ├── GlassCard.tsx
│   │   │   ├── VideoCard.tsx
│   │   │   ├── TimelineCard.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Button.tsx
│   │   └── animations/
│   │       ├── IntroAnimation.tsx
│   │       ├── SectionTransition.tsx
│   │       └── TextReveal.tsx
│   ├── hooks/
│   │   ├── useGSAP.ts
│   │   ├── useTheme.ts
│   │   ├── useActiveSection.ts
│   │   └── useReducedMotion.ts
│   ├── lib/
│   │   ├── constants.ts       # Colors, breakpoints, section data
│   │   ├── cloudinary.ts      # Image URL builder
│   │   └── animations.ts      # Reusable GSAP timelines
│   ├── i18n/
│   │   ├── en.json            # English translations
│   │   └── id.json            # Indonesian translations
│   ├── data/
│   │   ├── portfolio.ts       # Video/project data
│   │   ├── expertise.ts       # Skills data
│   │   ├── journey.ts         # Timeline data
│   │   └── social.ts          # Social media links
│   └── types/
│       └── index.ts           # TypeScript interfaces
├── docs/                      # This documentation
├── .env.local                 # Environment variables
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # TailwindCSS configuration (if needed for v4)
├── tsconfig.json
└── package.json
```


