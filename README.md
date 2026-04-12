# Capluk. — Creative Visionary Portfolio

<a href="https://res.cloudinary.com/workstation-/video/upload/v1775986574/capluk-portfolio/demo-capluk-portfolio-website.mp4">
  <img src="https://res.cloudinary.com/workstation-/image/upload/q_auto,f_auto/l_text:arial_200_bold:%E2%96%B6,co_white,o_80,g_center/v1775753416/capluk-portfolio/Profile_BG_Wide_Dark.webp" alt="▶ Watch Portfolio Demo" width="100%" />
</a>

<p align="center">
  <a href="https://www.linkedin.com/in/contact-bintangsurya/">
    <img src="https://img.shields.io/badge/LinkedIn-Profile-blue?style=for-the-badge&logo=linkedin" alt="LinkedIn" />
  </a>
  <a href="https://bintang-profile.vercel.app/">
    <img src="https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
  <a href="./TECHNICAL.md">
    <img src="https://img.shields.io/badge/Docs-Technical-orange?style=for-the-badge&logo=read-the-docs" alt="Documentation" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</p>

---

**Capluk Portfolio** is a high-end, motion-driven digital residence built for Creative Directors and VFX Artists. A privacy-first, performance-optimized alternative to generic portfolio templates.

Built with **Next.js 15**, **GSAP**, and **Tailwind CSS 4**.

> [!TIP]
> This portfolio uses a "Liquid UI" system — a custom design language featuring real-time backdrop filtering and kinetic typography.

---

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   git clone https://github.com/bintangmogot/portfolio-capluk.git
   cd portfolio-capluk
   npm install
   ```

2. **Launch Development**
   ```bash
   npm run dev
   ```
   Open [localhost:3000](http://localhost:3000) to see the magic.

---

## ✨ Features

| Feature | Description | Status |
| :--- | :--- | :--- |
| **Cinematic UI** | Liquid glassmorphism and real-time backdrop blur. | ✅ Live |
| **Dynamic Hero** | GSAP-powered interactive background that reacts to mouse. | ✅ Live |
| **Custom Cursor** | Frame-aware kinetic cursor with state management. | ✅ Live |
| **Media Engine** | Support for local 4K video, images, and YouTube embeds. | ✅ Live |
| **Theme System** | Seamless Dark/Light mode transitions with glow effects. | ✅ Live |
| **Responsiveness** | Mobile-first architecture with native-feel scrolling. | ✅ Live |

---

## 📂 Architecture

The project is structured as a modular Next.js application, separating logic from visual components.

```text
src/
├── app/              # Next.js App Router & Global Lighting system
├── components/
│   ├── layout/       # Navigation, Theme, and Background controllers
│   ├── sections/     # Modular site sections (About, Portfolio, Connect)
│   └── ui/           # Reusable interactive components (Marquee, Cursor, Glass)
├── fonts/            # Premium typography (Thunder, Nohemi)
└── lib/              # GSAP utilities and shared logic
```

---

## 🖼️ Media Management

Manage your assets directly in `src/components/sections/PortfolioSection.tsx`.

### Local Asset Configuration
```typescript
{
  id: 'vfx-reel',
  type: 'video', // or 'image'
  thumbnail: '/assets/thumb.jpg',
  videoUrl: '/assets/reel.mp4',
  imageUrl: '/assets/full-res.jpg'
}
```

> [!NOTE]
> Check out [ASSET_MANAGEMENT.md](./docs/ASSET_MANAGEMENT.md) for the full guide on asset replacement.

---

## 📊 How it Compares

| Feature | **Capluk Portfolio** | Standard Website |
| :--- | :--- | :--- |
| **Transitions** | Fluid GSAP Timelines | Hard Page Changes |
| **UI Polish** | `liquid-glass` System | Basic CSS |
| **Performance** | Next.js partial hydration | Full page reloads |
| **Aesthetics** | Premium Dark Mode | Standard presets |
| **Interactivity** | Kinetic Custom Cursor | Default Browser Cursor |

---

## 👤 Author

**Herdanius Larobu (Capluk)**
Creative Director & Motion Designer

Built with ⚡ by [Bintang Aprilian](https://github.com/bintangmogot)
