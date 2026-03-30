# 🎨 Design Tokens — Portfolio Capluk

> **Status:** 🔒 LOCKED (v2 — Liquid Glass Revision)
> **Last Updated:** March 30, 2026
> **Approach:** CSS Custom Properties + TailwindCSS 4
> **Design Direction:** Liquid Glass — thick, clear glassmorphism with heavy blur

---

## 0. Design Philosophy — "Liquid Glass"

The client wants glassmorphism that feels **thick and clear** — not the subtle, barely-visible glass from earlier iterations. Think of it as looking through a block of refractive glass or ice. The background behind the glass should be **heavily blurred** but still faintly visible, creating genuine depth.

### Two Themes:
1. **Light Theme ("Liquid Gold & Glass")** — Almost entirely white/cream with gold/amber accents. Clean, luminous, and premium.
2. **Dark Theme ("Nocturnal Ember")** — Almost entirely black with orange/ember highlights. Cinematic, deep, and intense.

### Inspirations:
- **Magnetto Agency** — Strong orange/white contrast, bento grid, oversized typography, editorial feel
- **Futuristic Dashboard** — Heavy glassmorphism over portrait photography, timeline navigation nodes, warm cinematic glow

---

## 1. Color System

### 1.1 Light Theme — "Liquid Gold & Glass" (Default)

```css
:root, [data-theme="light"] {
  /* === SURFACE & BACKGROUND === */
  --color-bg: #f7f6f5;
  --color-bg-alt: #f1f1f0;
  --color-surface: #ffffff;
  --color-surface-dim: #e8e8e7;
  --color-surface-container: #e2e2e1;
  --color-surface-container-high: #dcdddc;

  /* === TEXT === */
  --color-text-primary: #2e2f2f;
  --color-text-secondary: #5b5c5b;
  --color-text-tertiary: #767776;
  --color-text-muted: #adadac;

  /* === ACCENT — GOLD/AMBER === */
  --color-accent: #FFB300;              /* Primary gold */
  --color-accent-container: #feb300;
  --color-accent-dim: #6b4900;
  --color-accent-on: #523700;           /* Text on accent */
  --color-accent-warm: #FF6D00;         /* Secondary warm orange */
  --color-accent-warm-container: #ffc5aa;

  /* === GLASSMORPHISM — LIQUID GLASS (LIGHT) === */
  --glass-bg: rgba(255, 255, 255, 0.65);
  --glass-bg-hover: rgba(255, 255, 255, 0.80);
  --glass-border: rgba(255, 255, 255, 0.90);
  --glass-border-subtle: rgba(0, 0, 0, 0.06);
  --glass-blur: 40px;
  --glass-saturate: 180%;
  --glass-shadow: 0 20px 50px rgba(123, 84, 0, 0.08);

  /* === STATUS === */
  --color-status-green: #22c55e;
  --color-status-green-glow: rgba(34, 197, 94, 0.3);

  /* === NAVIGATION === */
  --nav-bg: rgba(255, 255, 255, 0.70);
  --nav-border: rgba(0, 0, 0, 0.08);
  --nav-tab-active-bg: var(--color-accent);
  --nav-tab-active-text: #ffffff;
  --nav-tab-hover-bg: rgba(0, 0, 0, 0.04);

  /* === BACKGROUND TEXT === */
  --bg-text-color: rgba(0, 0, 0, 0.04);

  /* === HERO PHOTO === */
  --hero-filter: none;
  --hero-overlay: linear-gradient(135deg, rgba(255,179,0,0.1) 0%, transparent 60%);

  /* === INTERACTIVE === */
  --color-focus-ring: rgba(255, 179, 0, 0.4);
  --color-error: #b02500;
}
```

### 1.2 Dark Theme — "Nocturnal Ember"

```css
[data-theme="dark"] {
  /* === SURFACE & BACKGROUND === */
  --color-bg: #131313;
  --color-bg-alt: #1c1b1b;
  --color-surface: #201f1f;
  --color-surface-dim: #0e0e0e;
  --color-surface-container: #2a2a2a;
  --color-surface-container-high: #353534;

  /* === TEXT === */
  --color-text-primary: #e5e2e1;
  --color-text-secondary: #a98a80;
  --color-text-tertiary: #5a4139;
  --color-text-muted: rgba(229, 226, 225, 0.3);

  /* === ACCENT — EMBER ORANGE === */
  --color-accent: #ff6731;
  --color-accent-container: #ff6731;
  --color-accent-dim: #842600;
  --color-accent-on: #5d1800;
  --color-accent-warm: #ffb59d;
  --color-accent-warm-container: #783119;

  /* === GLASSMORPHISM — LIQUID GLASS (DARK) === */
  --glass-bg: rgba(255, 255, 255, 0.06);
  --glass-bg-hover: rgba(255, 255, 255, 0.10);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-border-subtle: rgba(255, 255, 255, 0.06);
  --glass-blur: 40px;
  --glass-saturate: 150%;
  --glass-shadow: 0 20px 60px rgba(14, 14, 14, 0.5);

  /* === STATUS === */
  --color-status-green: #4ae176;
  --color-status-green-glow: rgba(74, 225, 118, 0.3);

  /* === NAVIGATION === */
  --nav-bg: rgba(32, 31, 31, 0.60);
  --nav-border: rgba(255, 255, 255, 0.08);
  --nav-tab-active-bg: var(--color-accent);
  --nav-tab-active-text: #5d1800;
  --nav-tab-hover-bg: rgba(255, 255, 255, 0.05);

  /* === BACKGROUND TEXT === */
  --bg-text-color: rgba(255, 255, 255, 0.03);

  /* === HERO PHOTO === */
  --hero-filter: none;
  --hero-overlay: radial-gradient(ellipse at center, rgba(255,103,49,0.15) 0%, transparent 70%);

  /* === INTERACTIVE === */
  --color-focus-ring: rgba(255, 103, 49, 0.4);
  --color-error: #ffb4ab;
}
```

---

## 2. Typography

### 2.1 Font Stack

```css
:root {
  /* === FONT FAMILIES === */
  --font-display: 'Thunder', sans-serif;        /* Display / Background text */
  --font-heading: 'Epilogue', sans-serif;        /* Headings / UI headlines */
  --font-body: 'Space Grotesk', sans-serif;      /* Body text / technical feel */
  --font-accent: 'Bebas Neue', sans-serif;       /* Nav tabs / accent labels */
  --font-tagline: 'Bruno Ace', sans-serif;       /* Tagline special */

  /* === FONT WEIGHTS === */
  --fw-light: 300;
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;
  --fw-extrabold: 800;
}
```

### 2.2 Type Scale

| Token | Size | Line Height | Weight | Font | Usage |
|-------|------|-------------|--------|------|-------|
| `--text-bg` | 15–25vw | 0.9 | 800 | Thunder | Background section text |
| `--text-display` | 56px / 3.5rem | 1 | 700 | Epilogue | Hero role titles, large headings |
| `--text-h1` | 40px / 2.5rem | 1.1 | 700 | Epilogue | Section main titles |
| `--text-h2` | 32px / 2rem | 1.2 | 600 | Epilogue | Sub-section titles |
| `--text-h3` | 24px / 1.5rem | 1.3 | 600 | Space Grotesk | Card titles |
| `--text-h4` | 20px / 1.25rem | 1.3 | 500 | Space Grotesk | Small headings |
| `--text-nav` | 14px / 0.875rem | 1 | 400 | Bebas Neue | Navigation tabs |
| `--text-tagline` | 18px / 1.125rem | 1.4 | 400 | Bruno Ace | Tagline text |
| `--text-body` | 16px / 1rem | 1.6 | 400 | Space Grotesk | Body text |
| `--text-body-sm` | 14px / 0.875rem | 1.5 | 400 | Space Grotesk | Small body text |
| `--text-label` | 12px / 0.75rem | 1.4 | 500 | Space Grotesk | Labels, metadata, tech data |

### 2.3 Responsive Type Scale

```css
@media (max-width: 767px) {
  :root {
    --text-bg: 14vw;
    --text-display: 32px;
    --text-h1: 28px;
    --text-h2: 22px;
    --text-nav: 11px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  :root {
    --text-bg: 16vw;
    --text-display: 44px;
    --text-h1: 36px;
  }
}

@media (min-width: 1024px) {
  :root {
    --text-bg: 22vw;
    --text-display: 56px;
    --text-h1: 40px;
  }
}
```

---

## 3. Spacing System (4px Grid)

```css
:root {
  --space-1: 4px;     /* 0.25rem */
  --space-2: 8px;     /* 0.5rem */
  --space-3: 12px;    /* 0.75rem */
  --space-4: 16px;    /* 1rem */
  --space-5: 20px;    /* 1.25rem */
  --space-6: 24px;    /* 1.5rem */
  --space-8: 32px;    /* 2rem */
  --space-10: 40px;   /* 2.5rem */
  --space-12: 48px;   /* 3rem */
  --space-16: 64px;   /* 4rem */
  --space-20: 80px;   /* 5rem */
  --space-24: 96px;   /* 6rem */
  --space-32: 128px;  /* 8rem */
}
```

---

## 4. Border Radius

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-3xl: 32px;
  --radius-full: 9999px;

  /* Specific */
  --radius-card: var(--radius-xl);         /* 16px — glass cards */
  --radius-button: var(--radius-full);      /* pill shape */
  --radius-nav: var(--radius-3xl);          /* 32px — nav bar */
  --radius-modal: var(--radius-2xl);        /* 24px — modals */
  --radius-badge: var(--radius-full);       /* pill — collab badge */
  --radius-input: var(--radius-lg);         /* 12px — form inputs */
}
```

---

## 5. Shadows & Effects

```css
:root {
  /* === AMBIENT SHADOWS (not drop shadows) === */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 24px 60px rgba(0, 0, 0, 0.10);
  --shadow-glow: 0 0 24px var(--color-status-green-glow);
  --shadow-accent-glow: 0 0 40px rgba(255, 103, 49, 0.15);

  /* === BACKDROP FILTER === */
  --backdrop-glass: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  --backdrop-modal: blur(20px) saturate(120%);

  /* === TRANSITIONS === */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 500ms ease;
  --transition-theme: 800ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 6. Z-Index Scale

```css
:root {
  --z-bg-text: -1;
  --z-hero-photo: 0;
  --z-content: 10;
  --z-ui-elements: 20;     /* C logo, collab badge, lang toggle */
  --z-nav: 30;
  --z-modal-backdrop: 40;
  --z-modal: 50;
  --z-cursor: 100;
}
```

---

## 7. Layout Constants

```css
:root {
  --max-width: 1440px;
  --content-padding: var(--space-8);        /* 32px */
  --content-padding-mobile: var(--space-4); /* 16px */

  /* Navigation */
  --nav-height: 56px;
  --nav-bottom-offset: 24px;
  --nav-width: clamp(560px, 65vw, 820px);

  /* Hero photo */
  --hero-photo-width: clamp(300px, 50vw, 700px);

  /* Glass cards */
  --card-padding: var(--space-6);
  --card-gap: var(--space-4);
}
```

---

## 8. Animation Tokens

```css
:root {
  /* === DURATIONS === */
  --anim-intro: 2500ms;
  --anim-section-transition: 800ms;
  --anim-bg-text: 600ms;
  --anim-theme-toggle: 800ms;
  --anim-modal: 400ms;
  --anim-hover: 200ms;

  /* === EASINGS === */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* GSAP-specific (ref only, used in JS):
     intro.duration = 2.5, ease "power3.out"
     section.duration = 0.8, ease "power3.out"
     bgText.duration = 0.6, ease "power2.inOut"
     theme.duration = 0.8, ease "power2.inOut"
  */
}
```

---

## 9. Breakpoints

```css
/* TailwindCSS 4 — direct @media usage */
@custom-media --mobile (max-width: 767px);
@custom-media --tablet (min-width: 768px) and (max-width: 1023px);
@custom-media --desktop (min-width: 1024px);
@custom-media --wide (min-width: 1440px);
```

---

## 10. Component Tokens

### Liquid Glass Card

```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--backdrop-glass);
  -webkit-backdrop-filter: var(--backdrop-glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-card);
  padding: var(--card-padding);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}
.glass-card:hover {
  background: var(--glass-bg-hover);
  box-shadow: var(--shadow-lg);
}
```

### Navigation Bar

```css
.navbar {
  background: var(--nav-bg);
  backdrop-filter: var(--backdrop-glass);
  border: 1px solid var(--nav-border);
  border-radius: var(--radius-nav);
  height: var(--nav-height);
  width: var(--nav-width);
  box-shadow: var(--shadow-lg);
}
```

### Background Text

```css
.bg-text {
  font-family: var(--font-display);
  font-size: var(--text-bg);
  font-weight: var(--fw-extrabold);
  color: var(--bg-text-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 0.9;
  z-index: var(--z-bg-text);
  position: absolute;
  user-select: none;
  pointer-events: none;
}
```

### Custom Cursor

```css
.custom-cursor {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-text-primary);
  border-radius: var(--radius-full);
  z-index: var(--z-cursor);
  pointer-events: none;
  mix-blend-mode: difference;
}
```

### Pill Button (Primary)

```css
.btn-primary {
  background: var(--color-accent);
  color: var(--color-accent-on);
  border: none;
  border-radius: var(--radius-full);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-label);
  font-weight: var(--fw-bold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all var(--transition-base);
}
.btn-primary:hover {
  box-shadow: var(--shadow-accent-glow);
  transform: translateY(-1px);
}
```

### Glass Pill Badge

```css
.badge-collab {
  background: var(--glass-bg);
  backdrop-filter: var(--backdrop-glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-label);
  color: var(--color-text-primary);
}
.badge-collab .dot {
  width: 8px;
  height: 8px;
  background: var(--color-status-green);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-glow);
  animation: pulse 2s ease-in-out infinite;
}
```

---

## 11. Accessibility

```css
/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus Styles */
:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

/* Min Touch Target */
button, a, [role="button"] {
  min-width: 44px;
  min-height: 44px;
}

/* Contrast: Both themes maintain WCAG AA (4.5:1) for body text */
```

---

## 12. Design Rules (from Stitch Design System)

### DO ✅
- Use **40px+ backdrop-blur** on all glass elements — the glass should feel **thick and refractive**
- Use `Epilogue` display text that overlaps glass containers for editorial depth
- Use massive spacing (`space-16` to `space-24`) between sections — premium design needs breathing room
- Let the hero portrait bleed behind glass panels
- Use the accent color (`#FFB300` light / `#ff6731` dark) **sparingly** — it's a spotlight, not a floodlight
- Use `Space Grotesk` labels for metadata to create a "tech-forward" feel
- Use ambient shadows (warm-tinted, high-blur) instead of standard drop shadows

### DON'T ❌
- Never use pure `#000000` or `#FFFFFF` — use the tinted neutrals from the palette
- Never use standard 1px solid borders for sections — use tonal shifts or ghost borders
- Never use standard Material Design shadows — they look "software-like"
- Don't crowd the layout — motion portfolios need negative space
- Don't use generic/default icons — use thin-stroke (1.5px) icons only

---

*Generated by Antigravity AI — Phase 1 Planning (v2 — Liquid Glass Revision)*
