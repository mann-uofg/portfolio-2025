<h1 align="center">Mann's Portfolio</h1>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/clouds_night.png" />
    <img src="assets/clouds.png" alt="Cloud background used across the site" width="100%" />
  </picture>
</p>

<p align="center">
  This is my 2025 portfolio — built to feel like a polished product page, not a PDF with a navigation bar.
  <br />
  Lots of motion, lots of glass, and a few “wait… that’s interactive?” moments.
</p>

<p align="center">
  <a href="#the-vibe">The vibe</a> ·
  <a href="#whats-inside">What’s inside</a> ·
  <a href="#run-it-locally">Run it locally</a> ·
  <a href="#emailjs-setup">EmailJS setup</a> ·
  <a href="#project-map">Project map</a>
</p>

---

## The vibe

A soft, cloudy parallax background. Liquid-glass UI. Snappy motion that’s more “buttery” than “bouncy for no reason.”
Everything is designed to reward hovering, scrolling, and clicking around.

The background layers live in [`App.tsx`](App.tsx) and swap cleanly between light/dark using `assets/clouds.png` and `assets/clouds_night.png`.

---

## What’s inside

### Liquid / Chromatic Glass UI
- Core glass styles in [`index.css`](index.css) (`.glass`, `.chromatic-glass`, `.liquid-card`).
- Reusable “section enters like it has a pulse” wrapper: [`SectionWrapper`](components/ui/SectionWrapper.tsx) in [`components/ui/SectionWrapper.tsx`](components/ui/SectionWrapper.tsx).

### Motion-first layout
- Site-wide motion language powered by Framer Motion (you’ll see it everywhere).
- Smooth scrolling via Lenis RAF loop in [`App.tsx`](App.tsx).

### The dock + guided onboarding
- The bottom dock has that magnetic “macOS energy” when you move your cursor across it.
- First-time visitors get a spotlight walkthrough stored in `localStorage`, implemented in [`components/Navbar.tsx`](components/Navbar.tsx).

### Interactive hero mini‑game (yes, the hero)
- A 5×5 “toggle neighbors” puzzle with win confetti and an optional auto-solve.
- The whole thing lives in [`components/Hero.tsx`](components/Hero.tsx).

### Custom cursor system (the subtle flex)
- Global `.cur`/`.ani` cursor set wired in [`index.css`](index.css).
- Cursor assets live in [`assets/cursors/`](assets/cursors/).

### Contact form that actually sends
- EmailJS integration + success/error UX in [`components/Contact.tsx`](components/Contact.tsx).

### Resume viewer
- A “macOS window” style resume viewer with zoom controls in [`components/Resume.tsx`](components/Resume.tsx).

---

## Run it locally

```sh
npm install
npm run dev
```

Vite runs on **port 3000** (configured in [`vite.config.ts`](vite.config.ts)).

---

## EmailJS setup

Create `.env.local` in the repo root:

```ini
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

The form uses these values in [`components/Contact.tsx`](components/Contact.tsx).


---

## Project map

**App shell / orchestration**
- Parallax background + smooth scroll + intro gating: [`App.tsx`](App.tsx)
- Entry point: [`index.tsx`](index.tsx)

**Sections**
- Dock + spotlight guide: [`components/Navbar.tsx`](components/Navbar.tsx)
- Hero + mini-game: [`components/Hero.tsx`](components/Hero.tsx)
- Projects bento grid: [`components/Projects.tsx`](components/Projects.tsx)
- Experience timeline: [`components/Experience.tsx`](components/Experience.tsx)
- Resume window: [`components/Resume.tsx`](components/Resume.tsx)
- Email form: [`components/Contact.tsx`](components/Contact.tsx)
- Footer + back-to-top: [`components/Footer.tsx`](components/Footer.tsx)

**UI primitives**
- Tilt + glow card: [`GlowingCard`](components/ui/GlowingCard.tsx) in [`components/ui/GlowingCard.tsx`](components/ui/GlowingCard.tsx)
- CTA button: [`LiquidButton`](components/ui/LiquidButton.tsx) in [`components/ui/LiquidButton.tsx`](components/ui/LiquidButton.tsx)
- Hover scramble text: [`TextScramble`](components/ui/TextScramble.tsx) in [`components/ui/TextScramble.tsx`](components/ui/TextScramble.tsx)
- Parallax typography band: [`VelocityScroll`](components/ui/VelocityScroll.tsx) in [`components/ui/VelocityScroll.tsx`](components/ui/VelocityScroll.tsx)

Types live in [`types.ts`](types.ts) (ex: [`Project`](types.ts), [`ExperienceItem`](types.ts)).

---

## License / usage

This is my personal portfolio. If you borrow ideas (please do), swap out the branding, copy, and assets — and leave a little attribution somewhere.