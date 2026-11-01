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

The homepage is six screens: the hero (promise, two ways in and four figures), General care, mirrored Unani care, centered doctors, one card deck (story, first visit, education, research, stories and guides) and the shared Reach us section as its last screen. Each section is exactly one screen tall: it runs under the see-through header, pads past it, and centres its content; the hero sits below the header. Short screens tighten type and hide secondary lines rather than clip, and phones keep the bottom 104px clear of the contact dock. Content containers are generally 1,240px wide with 40px desktop gutters; mobile gutters are 20–24px.

At widths above 1,100px and heights of at least 800px, each care section fills the available screen below the header. General care puts its introduction left and four services right; Unani reverses them. The progress line stays on the shared center axis. At widths up to 800px, each section presents its heading, one directory link and four compact rows with arrows. Copy remains scrollable if the viewport is too short; never clip content to force a fit.

The clinician gallery is centered: three plus two cards on desktop, two columns up to 800px and one column up to 480px. Cards have a subtle cream surface, 14px corners and no decorative border. Initials are wayfinding marks, not fabricated portraits.

## Type and surfaces

Bitter 400 supplies headings, with italic olive phrases for emphasis. Manrope supplies body text and controls. Fonts are self-hosted with swap behavior; the three critical body/hero faces are preloaded. Main headings scale responsively up to 96px in the hero, while mobile care headings use 30px titles and 24px italic lines.

Use tonal backgrounds and spacing for hierarchy. Sections never meet on a hard edge. Each light band (`data-band`) names its colour in `--band-tone`. Once the page script runs, the page paints one colour that averages the tones across the middle 60% of the screen. As you scroll, the colour shifts from one section to the next with no line between them. A section at rest shows its own tone exactly. The footer keeps the tone of whatever sits above it. Dark bands and the footer keep their forest colour but fade in from the page colour through a 40–96px gradient edge. Without script, each band paints its own colour. Decorative horizontal separators, link underlines and card borders are removed. Keep form outlines, clear focus indicators and the care connector diagram. Focus uses a visible 3px olive outline and 4px offset.

## Shared navigation

The sticky header has no bottom rule. A soft shadow appears after scrolling. Search is an icon-only 44px control with an accessible name. Navigation collapses at 1,050px; the open menu softens the background while floating call and visit buttons remain visible. Route changes reset scroll, focus the new heading and update the document title.

QuickFind uses Radix Dialog for focus containment, Escape dismissal and restoration to the search trigger. Ctrl/Cmd+K also opens it. Directories expose labeled search, pressed filter states and useful empty results. All content links lead to real routes.

## Motion

With a mouse or trackpad (`hover: hover` and `pointer: fine`), one shared Lenis instance feeds GSAP's ticker on every route. It eases towards the target each frame (`lerp: 0.16`) rather than running a fixed-length glide: a fast flick stays fast, a slow scroll stays slow, the page coasts to a soft stop once the hand lets go, and a fresh wheel step simply retargets. Touch screens are left fully native, keeping the browser's own momentum. Navigation menus, select lists and text areas scroll natively.

Homepage sections settle lightly, never forcing a stop. With Lenis, once the page has come to rest (160ms with no movement), a stop within 16% of the screen short of the next section edge, in the direction of travel, eases on to it; a stop within 5% past an edge eases back. Anywhere else it stays put, so a slow reader is never pulled back. The settle is an unhurried 1.1s sine ease, and any wheel or trackpad input takes over at once; pinch-zoom and nested controls never start it. On touch screens the finger and the browser's own momentum carry the page, so a flick runs as far as it wants; once both have stopped (150ms with no movement and no finger down) the same rule eases the page with the same 1.1s glide, and a fresh touch stops it where it is. Pinch-zoom, a zoomed-in page and text entry never start it. With motion off, CSS proximity snap does the settling instead. Each section settles at its top (the hero below the header) and the footer at its end. Detail pages remain freely scrollable.

Both care timelines run from section `top 85%` to the header offset and complete their line/washes at the stop. Mobile service rows move up 18px with a short stagger. Page transitions use a 10px shift, opacity 0.72–1 and 480ms sine easing. The reading-progress line uses GSAP with a 180ms scrub, reusing the existing animation engine.

Fine-pointer doctor hover follows a sage spotlight, lifts the monogram 4px and moves the arrow 3px. Keyboard focus provides equivalent feedback. Touch does not depend on hover.

The homepage doctor row rolls on by itself, taking its first step about a second after it comes into view, whether or not a pointer rests on it. Only a drag, a click or tap, or keyboard browsing holds it, for 3 seconds; a finger that merely scrolls the page past it does not. Vertical swipes on the row scroll the page; horizontal ones move the row.

The visit journey has three static steps and a reserved 120px SVG area. Its Lottie light player downloads only within 400px of the viewport; ScrollTrigger controls frames 0–90 without autoplay or looping. A static completed SVG remains available while loading, on failure and with motion disabled.

There is no motion switch on the page; the OS reduced-motion preference alone disables smoothing, turn in-page jumps instant and disable spatial animations. Reading progress becomes immediate; care content and the static journey remain visible. Observers, players, settle timers and triggers are disposed when their owning components or preferences change.

## Components and content

Use the existing shadcn buttons, inputs, labels and Radix accordions. Phone and WhatsApp links use matched icon/number/arrow rows.

Reach us sits above the footer on every page except Visit, which keeps its own request beside its three steps. It holds the visit request (care, day and time dropdowns that compose a WhatsApp message to reception), the 24-hour emergency number, and four direct lines: call, WhatsApp call, WhatsApp message and directions. A link cannot start a WhatsApp call, so that tile opens the chat and says to tap call. On a service page the request preselects that service. Up to 800px everything stacks, day and time share a row and the four lines become icon tiles. Preserve click targets, keyboard focus and descriptive names. The inquiry planner never presents a saved request or confirmed appointment. Source uncertainty and programme availability remain explicit.

The footer's last row carries the copyright and the credit "Made by Khanect AI", linking to khanect.com in a new tab. Khanect's K mark opens out beside the words on hover or keyboard focus and always shows on touch screens. The row is split left and right on tablet and desktop and stacks, centred, below 600px.

Keep authentic hospital assets separate from design approval. Do not invent photographs, credentials, reviews, clinical claims or live systems. Keep the workbook, research and planning documents outside the public build.

## Attribution

DoctorSpotlight adapts React Bits SpotlightCard; its MIT + Commons Clause license is retained in source and the public third-party directory. The WhatsApp mark uses Bootstrap Icons with its shipped license. The K mark in the footer credit is Khanect AI's own logo, used for their credit. Motion implementation references: [GSAP](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [Lenis](https://github.com/darkroomengineering/lenis), and [Lottie](https://github.com/airbnb/lottie-web).
