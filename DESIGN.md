---
version: alpha
name: Al-Arif — Community welcome
description: Accepted visual and motion system for the public hospital website.
colors:
  primary: "#254c3d"
  primary-hover: "#37604c"
  on-primary: "#fffdf5"
  neutral: "#f7f4eb"
  secondary: "#e2ebd9"
  muted-text: "#4c6151"
  emphasis: "#59744b"
  focus: "#527649"
  input: "#94a686"
  general-care: "#eee9db"
  unani-care: "#dce7cf"
  learning: "#e8e3d3"
  doctor-card: "#f2f0e4"
typography:
  display:
    fontFamily: "Bitter, serif"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontWeight: 400
    lineHeight: 1.8
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 600
rounded:
  control: "7px"
  card: "14px"
spacing:
  compact: "12px"
  standard: "20px"
  gutter: "40px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
    typography: "{typography.button}"
    padding: "12px 22px"
  doctor-card:
    backgroundColor: "{colors.doctor-card}"
    textColor: "{colors.primary}"
    rounded: "{rounded.card}"
---

# Al-Arif — Community welcome

## Direction

A welcoming reception: warm paper, pastel sage, editorial Bitter headings and clear Manrope controls. General hospital and Unani care have equal prominence. Preserve the selected identity, page content and section-by-section hierarchy. The current source is `preview/src/`; historical design studies are available in Git history, not active source.

## Layout

The homepage flows through welcome, hospital introduction, general care, mirrored Unani care, centered doctors, education, research and visiting. The opening fills at least the viewport below the header. Content containers are generally 1,240px wide with 40px desktop gutters; mobile gutters are 20–24px.

At widths above 1,100px and heights of at least 800px, each care section fills the available screen below the header. General care puts its introduction left and four services right; Unani reverses them. The progress line stays on the shared center axis. At widths up to 800px, each section presents its heading, one directory link and four compact rows with arrows. Copy remains scrollable if the viewport is too short; never clip content to force a fit.

The clinician gallery is centered: three plus two cards on desktop, two columns up to 800px and one column up to 480px. Cards have a subtle cream surface, 14px corners and no decorative border. Initials are wayfinding marks, not fabricated portraits.

## Type and surfaces

Bitter 400 supplies headings, with italic olive phrases for emphasis. Manrope supplies body text and controls. Fonts are self-hosted with swap behavior; the three critical body/hero faces are preloaded. Main headings scale responsively up to 96px in the hero, while mobile care headings use 30px titles and 24px italic lines.

Use tonal backgrounds and spacing for hierarchy. Decorative horizontal separators, link underlines and card borders are removed. Keep form outlines, clear focus indicators and the care connector diagram. Focus uses a visible 3px olive outline and 4px offset.

## Shared navigation

The sticky header has no bottom rule. A soft shadow appears after scrolling. Search is an icon-only 44px control with an accessible name. Navigation collapses at 1,050px; the open menu softens the background while floating call and visit buttons remain visible. Route changes reset scroll, focus the new heading and update the document title.

QuickFind uses Radix Dialog for focus containment, Escape dismissal and restoration to the search trigger. Ctrl/Cmd+K also opens it. Directories expose labeled search, pressed filter states and useful empty results. All content links lead to real routes.

## Motion

One shared Lenis instance feeds GSAP's ticker on every route. Wheel scrolling takes 750ms with quartic easing. Touch follows the finger directly; release inertia uses `syncTouchLerp: 0.1` and `touchInertiaExponent: 1.5`. Pinch gestures and their releases, search results and native controls bypass smoothing.

Homepage sections alone use proximity settling: 35% threshold, 420ms pause and 900ms sine ease-in/out. Settling applies to fitting desktop chapters and compact layouts up to 800px. A new touch interrupts it, and held touches or taps never start it. Detail pages remain freely scrollable. Native CSS snap is disabled while Lenis is active.

Both care timelines run from section `top 85%` to the header offset and complete their line/washes at the stop. Mobile service rows move up 18px with a short stagger. Page transitions use a 10px shift, opacity 0.72–1 and 480ms sine easing. The reading-progress line uses GSAP with a 180ms scrub, reusing the existing animation engine.

Fine-pointer doctor hover follows a sage spotlight, lifts the monogram 4px and moves the arrow 3px. Keyboard focus provides equivalent feedback. Touch does not depend on hover.

The visit journey has three static steps and a reserved 120px SVG area. Its Lottie light player downloads only within 400px of the viewport; ScrollTrigger controls frames 0–90 without autoplay or looping. A static completed SVG remains available while loading, on failure and with motion disabled.

The footer motion switch and OS reduced-motion preference disable smoothing and spatial animations. Reading progress becomes immediate; care content and the static journey remain visible. Observers, players, snap instances and triggers are disposed when their owning components or preferences change.

## Components and content

Use the existing shadcn buttons, inputs, labels and Radix accordions. Phone and WhatsApp links use matched icon/number/arrow rows. Preserve click targets, keyboard focus and descriptive names. The inquiry planner never presents a saved request or confirmed appointment. Source uncertainty and programme availability remain explicit.

Keep authentic hospital assets separate from design approval. Do not invent photographs, credentials, reviews, clinical claims or live systems. Keep the workbook, research and planning documents outside the public build.

## Attribution

DoctorSpotlight adapts React Bits SpotlightCard; its MIT + Commons Clause license is retained in source and the public third-party directory. The WhatsApp mark uses Bootstrap Icons with its shipped license. Motion implementation references: [GSAP](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [Lenis](https://github.com/darkroomengineering/lenis), and [Lottie](https://github.com/airbnb/lottie-web).
