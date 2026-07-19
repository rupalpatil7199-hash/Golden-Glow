---
name: Golden Glow
colors:
  surface: '#14171d'
  surface-dim: '#0f1116'
  surface-bright: '#1f242e'
  surface-container-lowest: '#08090b'
  surface-container-low: '#0d0f12'
  surface-container: '#1e232e'
  surface-container-high: '#272d3a'
  surface-container-highest: '#303746'
  on-surface: '#f8f9fa'
  on-surface-variant: '#a2a7af'
  inverse-surface: '#f2f0f0'
  inverse-on-surface: '#08090b'
  outline: '#a2a7af'
  outline-variant: '#303746'
  surface-tint: '#c9b067'
  primary: '#c9b067'
  on-primary: '#08090b'
  primary-container: '#d4af37'
  on-primary-container: '#08090b'
  inverse-primary: '#ffd700'
  secondary: '#a2a7af'
  on-secondary: '#08090b'
  secondary-container: '#1e232e'
  on-secondary-container: '#f8f9fa'
  background: '#08090b'
  on-background: '#f8f9fa'
  surface-variant: '#14171d'
typography:
  display-lg:
    fontFamily: Tenor Sans
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: 0.1em
  display-lg-mobile:
    fontFamily: Tenor Sans
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: 0.08em
  headline-lg:
    fontFamily: Tenor Sans
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: 0.08em
  headline-lg-mobile:
    fontFamily: Tenor Sans
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 38px
    letterSpacing: 0.06em
  headline-md:
    fontFamily: Tenor Sans
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: 0.06em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.12em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
---

## Brand & Style

The design system embodies a synthesis of **Apple-inspired functional minimalism** and **modern high-jewelry precision**. It is designed for an affluent, discerning audience that values craftsmanship, geometric purity, and exclusivity.

The aesthetic follows a **Premium Minimalist Lookbook** direction, utilizing generous whitespace and a high-contrast dark space to allow product photography to glow. Key stylistic drivers include:
- **Atmospheric Depth:** Deep obsidian backgrounds with glowing liquid silver and gold gradients, layered with translucent dark glass plates.
- **Editorial Sophistication:** Wide geometric typography layouts that mimic modern art and fashion lookbooks.
- **Tactile Smoothness:** Interaction design focuses on organic eases and soft transitions to mirror the feeling of handling fine metals.

## Colors

The palette is anchored in desaturated precious metals and dark carbon neutrals to maintain a sense of prestige and structure.

- **Primary (Champagne Gold):** Used sparingly for active states, pricing highlights, and key brand marks. It represents a refined, desaturated glow.
- **Secondary (Titanium Grey):** Used for metadata, captions, secondary text, and subtle structural boundaries.
- **Background (Obsidian Black):** The primary canvas (`#08090b`) to maximize metallic shine and light reflections.
- **Surface (Slate Glass):** Translucent slate blue-black layers with backdrop blurs used for floating menus and dashboards.

## Typography

This design system uses a wide, geometric typographic hierarchy.

- **Tenor Sans:** Used for all expressive headings and product titles. Set with letter-spacing and uppercase styling to feel clean and architectural.
- **Inter:** Used for all body text, prices, labels, and specs tables to provide crisp geometric clarity.
- **Letter Spacing:** All heading tags, navigation labels, and call-to-actions utilize increased letter-spacing to evoke prestige brand marks.

## Layout & Spacing

The layout philosophy follows an **Asymmetric Fixed Grid** for desktop and a **Fluid Margin Grid** for mobile.

- **Rhythm:** An 8px base unit drives all spacing.
- **Desktop:** 12-column grid with a wide 80px outer margin to frame product showcases.
- **Mobile:** 4-column grid with 20px margins.
- **Whitespace:** Large paddings (80px–120px) separate sections to ensure visual clarity.

## Elevation & Depth

Depth is achieved through **Dark Glassmorphism** and **Soft Shadows** rather than solid borders.

- **Soft Elevation:** Low-opacity dark shadows (Color: #000000 at 50-70% alpha) with high blur radius (32px+) to create depth.
- **Glassmorphism:** Navigation bars and input panels use a background blur (24px) with a semi-transparent slate fill (72% opacity) and a 1px border.

## Shapes

- **Standard Radius:** 8px (0.5rem) for input fields and active button shapes.
- **Large Radius:** 16px (1rem) for image containers and card structures.
- **Extra Large Radius:** 24px (1.5rem) for major hero spotlights.