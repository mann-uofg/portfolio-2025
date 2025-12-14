# Portfolio 2025

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/clouds_night.png" />
    <img src="assets/clouds.png" alt="Cloud background from the site" width="100%" />
  </picture>
</p>

<p align="center">
  A motion-forward, liquid-glass portfolio built to feel like a product landing page — not a résumé.
  <br />
  <strong>Chromatic glass</strong> • <strong>custom cursors</strong> • <strong>guided onboarding</strong> • <strong>interactive mini-game</strong>
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#running-locally">Running Locally</a> ·
  <a href="#configuration">Configuration</a> ·
  <a href="#project-structure">Project Structure</a>
</p>

---

## Features

- **Liquid/Chromatic Glass UI**
  - Glass primitives and “watery” chromatic refraction styles (see [`index.css`](index.css)).
  - Reusable layout wrapper with springy entrance motion: [`components/ui/SectionWrapper.tsx`](components/ui/SectionWrapper.tsx).

- **Motion-first interactions**
  - Framer Motion-driven transitions across the site (ex: project bento cards in [`components/Projects.tsx`](components/Projects.tsx)).
  - Smooth scrolling via Lenis RAF loop in [`App.tsx`](App.tsx).

- **Guided onboarding**
  - A spotlight walkthrough overlay for first-time visitors (stored in `localStorage`) in [`components/Navbar.tsx`](components/Navbar.tsx).

- **Interactive hero mini-game**
  - A 5×5 “toggle neighbors” puzzle with win confetti + optional auto-solve in [`components/Hero.tsx`](components/Hero.tsx).

- **Custom cursor system**
  - OS-style `.cur`/`.ani` cursor set wired globally (see [`index.css`](index.css), assets in [`assets/cursors/`](assets/cursors/)).

- **Contact form with EmailJS**
  - Sends directly from the UI, with success/error feedback in [`components/Contact.tsx`](components/Contact.tsx).

---

## Tech Stack

- **React + TypeScript** (entry: [`index.tsx`](index.tsx))
- **Vite** (config: [`vite.config.ts`](vite.config.ts))
- **Framer Motion** for animation
- **Lenis** for smooth scrolling (see [`App.tsx`](App.tsx))
- **EmailJS** for the contact form (see [`components/Contact.tsx`](components/Contact.tsx))
- **Tailwind via CDN** (configured in [`index.html`](index.html))
- **use-sound** for UI sounds (see [`components/ui/LiquidButton.tsx`](components/ui/LiquidButton.tsx), [`components/Navbar.tsx`](components/Navbar.tsx))

---

## Running Locally

```sh
npm install
npm run dev
```

Vite dev server is configured to run on port **3000** (see [`vite.config.ts`](vite.config.ts)).

---

## Configuration

Create `.env.local` (already present in the repo root) with EmailJS credentials:

```ini
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

> Note: `vite.config.ts` also defines `process.env.GEMINI_API_KEY` / `process.env.API_KEY` from `GEMINI_API_KEY` (see [`vite.config.ts`](vite.config.ts)). Keep secrets out of commits.

---

## Project Structure

- **App shell & scroll/intro orchestration:** [`App.tsx`](App.tsx)
- **Top navigation + spotlight tutorial:** [`components/Navbar.tsx`](components/Navbar.tsx)
- **Hero section + mini-game:** [`components/Hero.tsx`](components/Hero.tsx)
- **Projects bento grid + modal UX:** [`components/Projects.tsx`](components/Projects.tsx)
- **Experience timeline:** [`components/Experience.tsx`](components/Experience.tsx)
- **Resume viewer:** [`components/Resume.tsx`](components/Resume.tsx)
- **Contact form:** [`components/Contact.tsx`](components/Contact.tsx)
- **UI primitives:**
  - Glass tilt + glow card: [`components/ui/GlowingCard.tsx`](components/ui/GlowingCard.tsx)
  - CTA button: [`components/ui/LiquidButton.tsx`](components/ui/LiquidButton.tsx)
  - Text effects: [`components/ui/TextScramble.tsx`](components/ui/TextScramble.tsx)
  - Parallax typography: [`components/ui/VelocityScroll.tsx`](components/ui/VelocityScroll.tsx)

---

## Visual Notes (for maintainers)

- Background imagery used here matches the parallax layers in [`App.tsx`](App.tsx):
  - `assets/clouds.png`
  - `assets/clouds_night.png`

- Cursor theming lives in [`index.css`](index.css) and is backed by [`assets/cursors/`](assets/cursors/).

---

## License / Usage

This is a personal portfolio. If you’re using it as inspiration, please keep attribution and replace assets, copy, and branding.

---