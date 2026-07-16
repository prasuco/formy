---
name: Lumina Form Core
colors:
  surface: "#fcf9f8"
  surface-dim: "#dcd9d9"
  surface-bright: "#fcf9f8"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f6f3f2"
  surface-container: "#f0edec"
  surface-container-high: "#ebe7e7"
  surface-container-highest: "#e5e2e1"
  on-surface: "#1c1b1b"
  on-surface-variant: "#4f4634"
  inverse-surface: "#313030"
  inverse-on-surface: "#f3f0ef"
  outline: "#817661"
  outline-variant: "#d3c5ad"
  surface-tint: "#795900"
  primary: "#795900"
  on-primary: "#ffffff"
  primary-container: "#ffc437"
  on-primary-container: "#705200"
  inverse-primary: "#f8bd30"
  secondary: "#4f5f79"
  on-secondary: "#ffffff"
  secondary-container: "#d0e0ff"
  on-secondary-container: "#53637d"
  tertiary: "#006877"
  on-tertiary: "#ffffff"
  tertiary-container: "#2ce0fe"
  on-tertiary-container: "#00606e"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#ffdea0"
  primary-fixed-dim: "#f8bd30"
  on-primary-fixed: "#261a00"
  on-primary-fixed-variant: "#5c4300"
  secondary-fixed: "#d4e3ff"
  secondary-fixed-dim: "#b7c7e5"
  on-secondary-fixed: "#0a1c32"
  on-secondary-fixed-variant: "#384760"
  tertiary-fixed: "#a5eeff"
  tertiary-fixed-dim: "#1ad9f7"
  on-tertiary-fixed: "#001f25"
  on-tertiary-fixed-variant: "#004e5a"
  background: "#fcf9f8"
  on-background: "#1c1b1b"
  surface-variant: "#e5e2e1"
  destructive: "#EA4335"
  surface-subtle: "#F9FAFB"
  border-muted: "#E5E7EB"
  border-strong: "#111111"
  accent-teal: "#00A4A6"
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.2"
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: "600"
    lineHeight: "1.4"
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: "400"
    lineHeight: "1.5"
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: "450"
    lineHeight: "1.6"
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "450"
    lineHeight: "1.4"
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: "600"
    lineHeight: "1"
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered for the modern developer who values efficiency, reliability, and a touch of "magic." The brand personality bridges the gap between a high-utility CLI tool and a premium SaaS platform. It evokes a sense of "Invisible Infrastructure"—tools that work so well they feel like magic.

The design style is **Minimalist with a Technical Edge**. It utilizes heavy whitespace, a sophisticated monochromatic foundation, and high-energy accents to guide the user's attention. The aesthetic is clean and high-end, avoiding unnecessary fluff in favor of precision and clarity. Elements are grounded in a structured grid, reflecting the logical nature of the backend services it supports.

## Colors

The palette is anchored by a high-contrast relationship between a deep, near-black neutral and a vibrant Primary Gold.

- **Primary Gold (#FFC437):** Reserved exclusively for primary actions, success states, and the "magic" moments of the user journey.
- **Destructive Red (#EA4335):** Used for critical alerts, "Soon" badges (to indicate upcoming features), and irreversible actions like deleting form endpoints.
- **Neutral Grays:** A range of grays provides depth. Use `#111111` for high-contrast text and primary borders, while lighter shades handle background nesting and subtle UI dividers.
- **Accent Teal (#00A4A6):** Derived from the brand history, this is used sparingly for secondary data visualizations or status indicators.

## Typography

This design system uses a dual-font strategy to differentiate between interface guidance and technical data.

- **Primary UI (Geist):** Used for all headings, body copy, and navigation elements. It offers a clean, geometric sans-serif look that feels contemporary and legible.
- **Technical UI (JetBrains Mono):** Used for code blocks, API endpoints, form IDs, slugs, and system labels. The monospaced nature emphasizes the developer-first utility.

Maintain a strict vertical rhythm. Use `label-caps` for table headers and small metadata categories to create a distinct visual hierarchy compared to standard body text.

## Layout & Spacing

The layout follows a **Fixed Grid** model for the dashboard to ensure data density remains manageable, and a **Fluid Grid** for marketing pages to maximize impact.

- **Grid:** Use a 12-column grid for desktop with 24px gutters.
- **Spacing Rhythm:** All spacing should be multiples of the 4px base unit.
- **Margins:** Desktop views should maintain a 40px outer margin, while mobile views compress to 16px.
- **Developer Density:** Within the app dashboard, use tighter padding (8px-12px) for list items and data tables, while using generous padding (32px-48px) for landing page sections to convey the "premium" feel.

## Elevation & Depth

Hierarchy is achieved through a combination of **Tonal Layering** and **Minimalist Shadows**.

- **Surface Tiers:** The main background is pure White (#FFFFFF). Secondary containers or sidebars use Surface-Subtle (#F9FAFB).
- **Shadows:** Use a single, consistent shadow style for floating elements like dropdowns and cards. This should be a highly diffused, low-opacity gray shadow (e.g., `0 4px 12px rgba(0,0,0,0.05)`) to avoid a "heavy" look.
- **Borders:** Instead of heavy shadows, use 1px borders in Neutral Gray (#E5E7EB). For active states or focused inputs, transition the border to the Primary Gold or a 2px strong border.

## Shapes

The shape language is **Soft** and precise. A 4px (0.25rem) corner radius is the standard for most UI components (buttons, inputs, cards). This small radius maintains a professional, "engineered" look while removing the harshness of sharp corners.

- **Buttons/Inputs:** 4px radius.
- **Large Cards/Modals:** 8px (0.5rem) radius for a slightly more approachable feel on larger surfaces.
- **Status Badges:** Use a full pill shape (100px) to distinguish them from interactive buttons.

## Components

- **Buttons:**
  - _Primary:_ Solid Primary Gold background, #111111 text, no border.
  - _Secondary:_ Transparent background, #111111 border (1px), #111111 text.
- **Inputs:** Use a white background with a subtle border. On focus, apply a 2px "ring" or border transition to Primary Gold. Placeholder text should be in a muted gray JetBrains Mono.
- **Chips & Badges:** Use for "Soon" tags (Destructive Red background, white text) or status indicators (e.g., "Active", "Pending").
- **Cards:** Minimal borders (#E5E7EB) with no background fill unless they are interactive. Interactive cards should have a subtle hover lift using the ambient shadow.
- **Code Blocks:** Use a deep background (#111111), white or light gray JetBrains Mono text, and Lucide "Copy" icon in the top right.
- **Lists:** Clean rows with 1px bottom borders. Use Monospace for ID columns.
- **Iconography:** Use Lucide icons with a 1.5pt stroke weight to match the Geist typography weight.
