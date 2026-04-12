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

**Capluk Portfolio** is a cinematic, single-page presentation website built for Herdanius Larobu (Capluk) — an Indonesian Creative Director, Motion Designer, and VFX Artist with 25+ years in the film industry. Designed as a "cinematic slide deck," users navigate horizontally across sections without vertical scrolling.

*Analog Roots. Digital Future.*

Built with **Next.js 15**, **GSAP**, and **Tailwind CSS 4**.

> [!TIP]
> The portfolio ditches the traditional scroll and uses GSAP to create seamless horizontal slide transitions. It features a custom "Liquid UI" system heavily relying on glassmorphism and real-time backdrop blurring.

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
| **Cinematic Slide Deck** | Unique horizontal navigation architecture (no vertical scrolling). | ✅ Live |
| **Theme System** | Mood toggle between Warm Cinematic (default) and Grayscale. | ✅ Live |
| **Interactive Portfolio** | Fast YouTube embeds with hover previews and modal project details. | ✅ Live |
| **GSAP Animations** | Intro sequences, text animations, and 3D glassmorphism tilt cards. | ✅ Live |
| **Custom Cursor** | Creative kinetic cursor with interactive hover states. | ✅ Live |
| **PWA Ready** | Configured with service workers for offline access. | ✅ Live |

---

## 📂 Architecture

The project is structured as a modular Next.js application, separating logic from visual components.

```text
src/
├── app/              # Next.js App Router (EN/ID localization setup)
├── components/
│   ├── layout/       # Navigation, Theme, and Background Text controllers
│   ├── sections/     # Core sections (Portfolio, Expertise, About, Journey, Connect)
│   └── ui/           # Reusable interactive components (Cursor, Glass Cards, Modal)
├── fonts/            # Premium typography (Thunder, Urbanist, Bebas Neue, Bruno Ace)
└── lib/              # GSAP utilities, i18n logic, and shared utilities
```

---

## 🖼️ Media Management

Portfolio content uses performant YouTube embeddings instead of serving large local video files.

### Feature Films / Video Integration

To maintain high performance (90+ on Lighthouse), videos are integrated using `lite-youtube-embed`:

1.  **Thumbnail Source:** Extracted from YouTube (auto-generated) or custom WebP thumbnails.
2.  **Display Behavior:** Hovering a portfolio item plays a short, muted preview. Clicking opens a full-screen modal equipped with the YouTube iframe.
3.  **Project Content:** Content details are managed modularly.

> [!NOTE]
> For a full breakdown of the project requirements, refer to the [Project Knowledge](./docs/00-project-knowledge.md).

---

## 📊 How it Compares

| Feature | **Capluk Portfolio** | Standard Website |
| :--- | :--- | :--- |
| **Navigation** | Horizontal Slide Deck via GSAP | Vertical Scrolling & Hard Pages |
| **UI Polish** | Liquid Glassmorphism & Parallax | Basic CSS & Flat cards |
| **Video Performance** | Lazy-loaded `lite-youtube-embed` | Heavy standard iframes |
| **Aesthetics** | Warm Cinematic ↔ Grayscale | Standard Light ↔ Dark presets |
| **Interactivity** | Kinetic Custom Cursor & 3D Tilt | Default Browser Cursor |

---

## 👤 Author

**Herdanius Larobu (Capluk)**
Creative Director & Motion Designer

Built by [Bintang Aprilian](https://github.com/bintangmogot)
