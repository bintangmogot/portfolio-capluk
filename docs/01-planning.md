# 📋 Planning — Portfolio Capluk

> **Project:** Portfolio Capluk
> **Client:** Herdanius Larobu (Capluk)
> **Developer:** Bintang Surya Aprilian Mogot
> **Created:** March 29, 2026
> **Status:** Phase 1 — Planning

---

## 1. Problem Statement

Herdanius Larobu (Capluk) is a veteran Indonesian film director, VFX artist, and motion graphic designer with 25+ years of experience and 70+ film credits. Despite his impressive portfolio, he lacks a professional online presence that reflects his cinematic expertise and creative caliber.

**Goal:** Build a high-end, single-page portfolio website that feels like a cinematic experience — not a typical portfolio template. The site will use horizontal navigation, heavy GSAP animations, and a warm cinematic visual language to match Capluk's brand identity.

---

## 2. Project Type

**Single-Page Application (SPA)** — Horizontal slide-based navigation with no vertical scrolling. Built with Next.js 15 for SSG/SSR SEO benefits.

---

## 3. Target Audience

| Audience | Needs |
|----------|-------|
| Film Production Houses | View directing reel, filmography, VFX credits |
| Advertising Agencies | See motion graphics capability, social media ads work |
| Creative Studios | Assess creative direction skills, collaboration potential |
| International Clients | English language support, professional portfolio |
| Indonesian Film Industry | Familiar names, Piala Citra nominations, local context |

---

## 4. MVP Scope (10-Day Sprint)

### Must Ship ✅
1. Horizontal slide navigation (GSAP ScrollTrigger)
2. 5 sections: Portfolio, Expertise, About, Journey, Connect
3. Hero section with animated role titles
4. Dynamic background text (section name as oversized backdrop)
5. Video portfolio with YouTube embeds + category filtering
6. Glassmorphism cards for Journey timeline
7. Theme toggle: Warm Cinematic ↔ Grayscale
8. Loading/intro animation sequence
9. Custom cursor
10. Responsive design (Mobile, Tablet, Desktop)
11. Multi-language EN/ID toggle
12. SEO optimization (structured data, meta tags, OG images)
13. Contact form + WhatsApp + social links
14. "Open for Collaboration" dynamic badge
15. PWA/offline support

### Post-MVP (Future)
- Case study modal pages
- Articles/Blog section
- Video GIF previews on category buttons
- Horizontal scroll progress indicator
- CMS integration (separate charge)

---

## 5. Development Phases

| Phase | Duration | Deliverables |
|-------|----------|-------------|
| **Phase 0** ✅ | Day 0 | Discovery & project knowledge |
| **Phase 1** ✅ | Day 0 | Planning docs (you are here) |
| **Phase 2** | Day 1 | Screen designs in Stitch (mobile + desktop) |
| **Phase 3** | Day 1–2 | Scaffolding: Next.js 15 + TailwindCSS 4 + GSAP + folder structure |
| **Phase 4** | Day 2–8 | Module-by-module development |
| **Phase 5** | Day 8–9 | Testing & QA (cross-browser, responsive, lighthouse) |
| **Phase 6** | Day 9–10 | Deploy to Vercel + domain setup |
| **Phase 7** | Day 10 | Domain connection (capluk.com) |
| **Phase 8** | Post-launch | SEO monitoring, analytics setup |
| **Phase 9** | Ongoing | Maintenance & iteration |

---

## 6. Tech Stack Summary

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js (App Router) | 15 |
| Language | TypeScript | Latest |
| Styling | TailwindCSS | 4 |
| Animation | GSAP (ScrollTrigger, Timeline, SplitText) | Latest |
| i18n | next-intl | Latest |
| Video | lite-youtube-embed | Latest |
| Icons | Lucide React | Latest |
| Forms | React Hook Form | Latest |
| Images | Cloudinary + Next/Image | - |
| Hosting | Vercel (Free) | - |
| Domain | Namecheap (capluk.com) | - |
| PWA | next-pwa | Latest |

> Full rationale in `04-tech-stack.md`

---

## 7. Constraints & Risks

| Constraint | Impact | Mitigation |
|-----------|--------|-----------|
| 10-day timeline | High | MVP-first approach, cut post-MVP features |
| $70 budget | Medium | No premium tooling, free-tier services only |
| Heavy animations + YT embeds | Medium | lite-youtube-embed, lazy load, prefers-reduced-motion |
| No CMS | Low | JSON/MDX content files for easy manual updates |
| Thunder font (non-Google) | Low | Self-host, subset characters |
| Content pending (photos, email) | Medium | Placeholder content, swap when ready |

---

## 8. Success Criteria

- [ ] Lighthouse Performance 90+
- [ ] Lighthouse Accessibility 90+
- [ ] Lighthouse Best Practices 90+
- [ ] Lighthouse SEO 90+
- [ ] FCP < 1.5s
- [ ] LCP < 2.5s
- [ ] Smooth 60fps animations on desktop
- [ ] Functional horizontal navigation on all devices
- [ ] All 5 sections fully functional
- [ ] Theme toggle works correctly
- [ ] Language switch works correctly
- [ ] Contact form submits successfully
- [ ] All YouTube embeds load correctly
- [ ] PWA installable and works offline

---

