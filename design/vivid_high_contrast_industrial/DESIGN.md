---
name: Vivid High-Contrast Industrial
colors:
  surface: "#131313"
  surface-dim: "#131313"
  surface-bright: "#3a3939"
  surface-container-lowest: "#0e0e0e"
  surface-container-low: "#1c1b1b"
  surface-container: "#201f1f"
  surface-container-high: "#2a2a2a"
  surface-container-highest: "#353534"
  on-surface: "#e5e2e1"
  on-surface-variant: "#cac8aa"
  inverse-surface: "#e5e2e1"
  inverse-on-surface: "#313030"
  outline: "#939277"
  outline-variant: "#484831"
  surface-tint: "#cdcd00"
  primary: "#ffffff"
  on-primary: "#323200"
  primary-container: "#eaea00"
  on-primary-container: "#686800"
  inverse-primary: "#626200"
  secondary: "#c8c6c5"
  on-secondary: "#313030"
  secondary-container: "#474746"
  on-secondary-container: "#b7b5b4"
  tertiary: "#ffffff"
  on-tertiary: "#2f3131"
  tertiary-container: "#e2e2e2"
  on-tertiary-container: "#636565"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#eaea00"
  primary-fixed-dim: "#cdcd00"
  on-primary-fixed: "#1d1d00"
  on-primary-fixed-variant: "#494900"
  secondary-fixed: "#e5e2e1"
  secondary-fixed-dim: "#c8c6c5"
  on-secondary-fixed: "#1c1b1b"
  on-secondary-fixed-variant: "#474746"
  tertiary-fixed: "#e2e2e2"
  tertiary-fixed-dim: "#c6c6c7"
  on-tertiary-fixed: "#1a1c1c"
  on-tertiary-fixed-variant: "#454747"
  background: "#131313"
  on-background: "#e5e2e1"
  surface-variant: "#353534"
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.05em
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1440px
---

## Brand & Style

This design system is built on a high-energy, industrial-modern aesthetic. It targets a bold, tech-forward audience that values efficiency, precision, and unapologetic visibility. The emotional response is one of urgency, clarity, and mechanical reliability.

The design style is a hybrid of **Modern Minimalism** and **Functional Brutalism**. It utilizes heavy whitespace to allow the vibrant primary color to command attention, paired with structural rigidity and razor-sharp clarity. The interface feels like a high-performance tool: stripped of excess, but visually arresting.

## Colors

The palette is centered around a "Hard Yellow" (#FFFF00) primary color, engineered for maximum impact against a deep, technical dark mode.

- **Primary:** Used exclusively for high-priority actions, active states, and critical information.
- **Surface:** A tiered dark scale (neutral and secondary) provides the foundation, ensuring the yellow accents achieve a 4.5:1 contrast ratio or higher for readability.
- **Accents:** White is used for secondary information and high-readability body text to maintain the clean, technical aesthetic.

## Typography

The typography system uses a mix of geometric and monospaced fonts to reinforce the technical nature of the brand.

- **Headlines:** Space Grotesk provides a futuristic, geometric edge. Large headings should use tight letter spacing for a "blocky," impactful look.
- **Body:** Geist offers a clean, developer-centric legibility for long-form content.
- **Data & Labels:** JetBrains Mono is utilized for metadata, tags, and small labels to provide a precise, monospaced rhythm.

## Layout & Spacing

The design system employs a **Fluid-to-Fixed Grid** hybrid. Layouts utilize a 12-column grid on desktop that transitions to a 4-column grid on mobile.

Spacing is strictly based on a 4px baseline grid. Elements should align to "hard" edges. Gutters are kept wide (24px) to ensure that the vibrant yellow accents do not bleed into adjacent content, maintaining a high sense of structural order. Large sections of content are separated by significant vertical padding to emphasize the minimal aesthetic.

## Elevation & Depth

Depth is communicated through **Tonal Layering** and **Bold Outlines** rather than soft shadows.

- **Surfaces:** Higher elevation levels are represented by lighter shades of dark grey (e.g., transitioning from #0F0F0F to #1A1A1A).
- **Outlines:** Focused or active elements use a 2px solid border in the primary yellow (#FFFF00).
- **Shadows:** If used, shadows must be "Hard" (0 blur) with a slight offset (e.g., 4px 4px), treated as a graphic element rather than a realistic lighting effect.

## Shapes

The shape language is strictly **Sharp**. To maintain the industrial and brutalist influence, all buttons, cards, and input fields feature 0px border radii. This reinforces the "hard" nature of the brand and ensures a consistent, architectural aesthetic across all UI components.

## Components

- **Buttons:** Primary buttons are solid #FFFF00 with #0F0F0F text. Hover states should invert or use a black-to-yellow "ghost" effect. Secondary buttons are outlined in white or yellow.
- **Navigation:** Active states in the sidebar or navbar are indicated by a 4px left-aligned or bottom-aligned #FFFF00 bar.
- **Chips:** Monospaced text inside sharp-edged boxes. Use yellow backgrounds only for "Active" or "Warning" statuses.
- **Input Fields:** Heavy 2px bottom borders. When focused, the entire border turns primary yellow.
- **Cards:** No shadows. Use a 1px border (#1A1A1A) to define the container, and a 4px yellow "accent header" for high-priority cards.
- **Lists:** Separated by thin, low-contrast lines. Hovering over a list item should trigger a subtle primary-colored glyph or text color shift.
