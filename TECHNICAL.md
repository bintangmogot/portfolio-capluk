# Technical Documentation

This document provides a technical overview of the architecture and design systems used in the Capluk Portfolio.

## 🎨 Design System

The project uses a theme-aware design system controlled through CSS variables in `src/app/globals.css`.

### Core Colors

| Token            | Light Mode                  | Cinematic Mode        |
| ---------------- | --------------------------- | --------------------- |
| `--bg-premium`   | `#FFFFFF`                   | `#0A0A0A`             |
| `--text-main`    | `#000000`                   | `#FFFFFF`             |
| `--theme-accent` | `#FFDE00`                   | `#FFFFFF`             |
| `--glass-bg`     | `rgba(255, 255, 255, 0.15)` | `rgba(0, 0, 0, 0.45)` |

### Typography Scale

- **Display**: `Thunder` (Variable Weight) - Used for massive headings.
- **Heading**: `Space Grotesk` / `Nohemi` - Used for section titles.
- **Body**: `General Sans` - Optimized for readability.

---

## ⚡ Animation Strategy (GSAP)

animations are handled via [GSAP](https://greensock.com/gsap/) and the `@gsap/react` hook.

### Key Implementation Patterns:

- **Responsive Layouts**: Animations check `window.innerWidth` to adjust scale and radius dynamically.
- **Micro-interactions**: Hover effects on cards and buttons use `power3.out` eases for a "snappy" feel.
- **Layered Parallax**: The background image moves inversely to the mouse position using a filtered `requestAnimationFrame` loop.

---

## 🧊 Component Architecture

### `Liquid Glass` (Glassmorphism)

The `.solid-hover` component is a central design element. It transitions from a blurred glass state to a high-contrast solid state on hover, reflecting a premium "glossy" aesthetic.

### `Custom Cursor`

- **Follower Logic**: Uses `gsap.ticker` for high-frequency updates on the outer ring.
- **Interactive State**: Detects `button`, `a`, and `role="button"` elements to trigger scale and rotation animations.
- **Desktop Only**: Automatically disables itself on mobile/tablet to ensure native touch performance.

---

## 🌓 Theme Management

The project uses `next-themes` for theme switching. The system is split into:

1. **Light Mode**: Vibrant, "solid blocking" style with high contrast.
2. **Cinematic Mode**: Noir-inspired grayscale with a single orange accent color (`#FF8C00`).

---

## 🛠️ Performance Optimizations

- **Font Loading**: Local woff2 files with `font-display: swap`.
- **Image Optimization**: Cloudflare/Cloudinary integration for responsive assets.
- **Animation Overhead**: All complex animations are tied to parent lifecycle hooks to ensure proper cleanup and prevent memory leaks.
