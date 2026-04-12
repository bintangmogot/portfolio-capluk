# Capluk. — Creative Visionary Portfolio

<!-- PROJECT HEADER / COVER -->
<a href="https://res.cloudinary.com/workstation-/video/upload/v1775986574/capluk-portfolio/demo-capluk-portfolio-website.mp4">
  <img src="https://res.cloudinary.com/workstation-/image/upload/q_auto/f_auto/v1775753416/capluk-portfolio/Profile_BG_Wide_Dark.webp" alt="▶ Watch Portfolio Demo" width="100%" />
</a>

## 🎨 Overview

The digital residence of **Herdanius Larobu** (popularly known as **Capluk**), a Creative Director, Motion Designer, and VFX Artist based in Indonesia. This portfolio is built to reflect high-end artistic sensibilities through modern web technologies, featuring cinematic transitions, liquid typography, and a refined design system.

---

## ✨ Features

- **Cinematic Experience**: Immersive dark and light modes with seamless transition animations.
- **Liquid UI System**: Custom glassmorphism components (`liquid-glass`) with real-time backdrop blur and frost effects.
- **Motion-Driven Navigation**: GSAP-powered interactive layout that expands and collapses based on user context.
- **Dynamic Backgrounds**: Responsive image system that adapts to section changes and mouse movements.
- **Custom Cursor**: A kinetic, frame-aware cursor system that reacts to interactive elements (Desktop only).
- **Responsive Hierarchy**: Mobile-first design architecture with native-feel scrolling on smaller devices.

---

## 🛠️ Tech Stack

- **Core**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation**: [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Curated mix of Thunder (Custom), Nohemi, and Space Grotesk.
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bintangmogot/portfolio-capluk.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```text
src/
├── app/              # Next.js App Router & Global CSS
├── components/
│   ├── layout/       # Navigation, Theme, and Background components
│   ├── sections/     # Modular site sections (About, Portfolio, etc.)
│   └── ui/           # Reusable interactive components (Marquee, Cursor, Glass)
├── fonts/            # Premium local fonts
└── lib/              # Utility functions and shared logic
```

---

## 🖼️ Media & Asset Management

To update your work, edit the `PORTFOLIO_ITEMS` array in `src/components/sections/PortfolioSection.tsx`. 

> [!NOTE]
> Re-apply the `type`, `thumbnail`, and `videoUrl` fields in the code to enable local asset support!

### 🎬 Option: Local Video
```typescript
{
  type: 'video',
  thumbnail: '/assets/portfolio/vfx-thumb.jpg',
  videoUrl: '/assets/portfolio/vfx-reel.mp4',
}
```

### 📸 Option: Local Image
```typescript
{
  type: 'image',
  thumbnail: '/assets/portfolio/thumb-1.jpg',
  imageUrl: '/assets/portfolio/full-1.jpg',
}
```

---

## 📽️ Customizing the README Header

To change the main cover image or video at the top of this README:

### 📸 Using an Image
Update the markdown image tag on **line 7** of `README.md`:
```markdown
![Capluk Portfolio Header](https://your-image-url.jpg)
```

### 🎬 Using a Video (Cinematic Header)
Replace the image tag with an HTML `<video>` tag:
```html
<video src="https://your-video-url.mp4" width="100%" autoplay muted loop></video>
```

---

## 📄 Documentation

For more detailed technical insights, see the [Technical Documentation](./TECHNICAL.md).

---

## 👤 Author

**Herdanius Larobu (Capluk)**
Creative Director & Motion Designer

- LinkedIn: [contact-bintangsurya](https://www.linkedin.com/in/contact-bintangsurya/)
- Portfolio: [bintang-profile.vercel.app](https://bintang-profile.vercel.app/)

Built with ⚡ by [Bintang Aprilian](https://github.com/bintangmogot)
