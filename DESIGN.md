---
version: alpha
name: Al-Arif — Community welcome
description: Selected Community welcome system for the Al-Arif hospital website.
colors:
  primary: "#254c3d"
  primary-hover: "#37604c"
  secondary: "#e2ebd9"
  secondary-hover: "#d5e2ca"
  tertiary: "#eee6d3"
  neutral: "#f7f4eb"
  on-primary: "#fffdf5"
  muted-surface: "#ede8d9"
  muted-text: "#536254"
  border: "#becbb4"
  input: "#94a686"
  focus: "#527649"
  welcome-emphasis: "#53764d"
  planner-emphasis: "#577b4d"
  chapter-line: "#bdc9b5"
  chapter-text: "#4c6151"
  chapter-emphasis: "#59744b"
  story-general: "#eee9db"
  story-unani: "#dce7cf"
  story-learning: "#e8e3d3"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontWeight: 550
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  welcome-display:
    fontFamily: "Bitter, serif"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  chapter-display:
    fontFamily: "Bitter, serif"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontWeight: 550
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.8
  hero-body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.8
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 600
  navigation:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 600
  text-link:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 650
rounded:
  comparison: "6px"
  control: "7px"
  compact-panel: "12px"
  panel: "14px"
spacing:
  small: "12px"
  medium: "20px"
  large: "40px"
  section-desktop: "95px"
  section-mobile: "55px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
    typography: "{typography.button}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    typography: "{typography.button}"
  care-panel-general:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.panel}"
    padding: "30px 25px"
  care-panel-unani:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.panel}"
    padding: "30px 25px"
  department-select:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    padding: "12px"
---

# Design System: Al-Arif — Community welcome

## Overview

**Creative North Star: “A welcoming reception.”** Warm paper, pastel sage, editorial Bitter headings and clear Manrope controls introduce general hospital and Unani care with equal prominence. The user selected Option 2, Community welcome, and the display spelling Al-Arif. Legal identity, clinical claims, logo and photography still require source approval.

This documents the selected Vite, React, TypeScript and shadcn/ui multi-page preview before production implementation. The original three-option study remains available for reference; its implemented tokens are preserved rather than redefined. PRODUCT.md holds the product constraints and research/home-story-brief.md is the latest homepage authority, superseding the compact care-explorer composition; research/multipage-brief.md retains the wider page contract. Extraction sources are preview/src/multipage/HomeStory.tsx and home-story.css (loaded after website.css), plus preview/src/multipage/Website.tsx, website.css, motion.tsx, interactive.tsx, interaction-context.ts and data.ts, plus the original App.tsx, App.css and index.css.

**Key characteristics:** cream foundation; sage destinations; olive typography; editorial reading layouts; persistent institutional context across real page routes. Frontmatter owns reusable values; responsive clamps and motion live in prose and the extension sidecar.

## Colors

### Primary
Deep olive (`primary`) carries text, solid actions, the review toolbar and footer. The lighter olive hover is reserved for solid actions. Cream-white (`on-primary`) is the inverse foreground.

### Secondary
Pastel sage (`secondary`) identifies general care destinations, the Unani section and visit guidance. Its hover shade belongs to linked care panels. Welcome and planner emphasis greens are separate observed headline treatments, not semantic success indicators.

### Tertiary
Warm sand (`tertiary`) differentiates the Unani destination in the paired option-one opening without implying lower importance.

### Neutral
The homepage alternates warm paper (`story-general`), sage (`story-unani`) and learning paper (`story-learning`) as chapter backgrounds, preserving equal care prominence.
Warm cream (`neutral`) is the page foundation. Muted paper supports the preview notice; muted olive supports descriptions. Border, input and focus colors serve distinct control roles.

**The Shared Palette Rule.** Extend the selected cream and pastel-green world. The multi-page chapter tokens record its observed rule, paragraph and emphasis treatments without overwriting the original alternatives. Color alone must not communicate selection: filters expose pressed state, and navigation exposes its active page.

## Typography

The active homepage story overrides section headings with Bitter at (`clamp(34px,3.9vw,57px)`), tracking (-0.035em), line height (1.15). Its hero uses (`clamp(52px,6.9vw,96px)`) and line height (1.1), becoming (`clamp(48px,9vw,70px)`) on mobile. Service feature titles are (29px), becoming (25px), with tracking (-0.025em); body copy is (16px/1.85), becoming (15px), while feature descriptions are (14px), becoming (13px). These are scoped story overrides, preserving the detail-page type system below.

Manrope supplies body copy and controls throughout the selected preview, as well as the direct voice of the retained options one and three. Bitter supplies option two's editorial introduction and section headings. Fonts are bundled through Fontsource, with sans-serif and serif fallbacks respectively. Imported Manrope weights are 400, 500, 600 and 700; CSS requests 550 and 650 in places, which resolve to available faces. Bitter imports are 400 regular and italic; option-two section headings request 450. These are implemented requests, not claims that those intermediate font files exist.

The selected multi-page headings use the chapter-display role. Page titles use (`clamp(44px,5.8vw,84px)`); the home display uses (`clamp(50px,6.8vw,96px)`) and becomes (48px) at (430px). Section headings use (`clamp(30px,3vw,44px)`). Service detail titles use (`clamp(44px,5.2vw,72px)`); clinician titles use (64px), becoming (46px) at (800px). These sizes share tracking (-0.04em), not the older option-two line-height.

In the retained comparison study, the shared display is fluid (`clamp(48px,5.1vw,74px)`) and becomes (50px) at the mobile breakpoint. Section headlines use (`clamp(30px,3vw,43px)`) and become (33px). Welcome uses (`clamp(50px,5.6vw,82px)`), then (46px) with line height (1.15) on mobile. Planner uses (74px), (60px) at the intermediate breakpoint and (53px) on mobile. Welcome section headings request weight (450). These fluid and responsive overrides intentionally remain prose rather than invalid alpha dimension tokens.

Shared section body uses the frontmatter body role; it becomes (13px) on mobile. Hero paragraphs in options one and three become (14px). Contextual labels range from (9px–13px) in the current prototype and require further readability review before production; this is not a minimum-size recommendation.

## Layout

**The Chapter Continuity Rule.** Keep the institutional header outside page-entry animation. The selected preview uses actual routes under `/site`, with a full editorial home story, directories, detail pages, visit information and secondary education/research routes. Breadcrumbs link to the appropriate parent. Service pages pair a reading column with a quiet visit summary; directories use open ruled lists rather than a repeated card grid.

For the retained detail-page system, page/section containers max out at (1240px). Pages use padding (30px 40px 90px), sections (80px 40px), with the former compact home introduction retained in CSS but superseded by the story layout below. Service reading columns use (minmax(0,1fr) 320px) with gap (85px), narrowing at (1100px) to a (285px) aside and gap (40px). At (800px), navigation collapses, reading layouts stack, page gutters become (24px), section padding becomes (50px 24px), and the fixed two-action contact bar appears. At (430px), journey steps stack and the home heading becomes (48px).

**Current homepage story.** The user explicitly requested a full landing page with distinct sections, meaningful summaries and clear links rather than button-based feature browsing. The order is welcome, hospital/community, equal general and Unani chapters, all five clinicians, education/proposed programme, research themes, then the Lottie visit journey and direction/inquiry links. Each care chapter exposes all four service summaries without requiring a selection. Detailed pages, search and the Visit checklist remain available. Research is now a main navigation destination.

Story sections use a (1240px) maximum width and padding (110px 40px); the centered hero uses (1320px) and (85px 40px 0). Care bands use (100px) vertical padding with equal columns and gap (100px). On desktop (801px and wider), Unani mirrors general care: its introduction is in the right column, feature rows in the left. Both care chapters share a center axis: the line anchors at (50%) of the positioned full care container, with mirrored row dots and horizontal connectors. Desktop feature wrappers are static so the line positions against that full container. The column gap is (100px), becoming (55px) from (801px–1100px). Both introductions stay at top (135px) on desktop while feature rows remain in normal document flow; there is no pinned scroll. At (800px), sections become (65px 24px), the hero (50px 24px 0), care bands (60px 0), and introductions become static above the rows, preserving heading-first order for both care chapters; the line remains beside the stacked feature rows on mobile. The navigation also collapses in the (801px–1050px) tablet range, extending the existing mobile collapse. Story anchors use scroll margin top (115px).

**Retained comparison layouts.** The earlier study remains a local reference; Option 2 is selected:

1. **Care pathways:** a left introduction and two equally sized right destinations; desktop columns (1fr 1.15fr), gap (48px), minimum hero height (570px). The destination pair stays two columns on mobile. Services start in four columns.
2. **Community welcome:** centered serif opening and three-column horizontal destination index; the index stacks on mobile. Services form two editorial columns, with each entry dividing title and description; mobile has one outer column. Doctors form two desktop columns.
3. **Visit planner:** introduction beside an active department guidance selector; equal desktop columns and gap (110px). The stacked mobile opening retains the selector and inquiry explanation. Services use two desktop columns and one mobile column.

In the retained comparison study, header and hero containers max out at (1320px), with desktop horizontal padding (40px); shared content sections max out at (1240px). Hero padding is (64px 40px 72px). Section vertical spacing follows the frontmatter desktop/mobile values. At (1320px) and below, ordinary sections receive (40px) side margins. At (1050px) and below, navigation becomes a menu and option one's opening stacks. At (700px) and below, content gutters become (20px), the comparison toolbar becomes a two-column grid, and a fixed two-action contact bar appears. Full-width Unani and visit bands use (25px) mobile gutters. Above (1600px), their padding aligns to the centered content width.

## Elevation & Depth

Tonal fields, rules and spacing carry hierarchy. Panels have no ambient elevation. QuickFind is the modal exception, using shadow (`0 22px 60px #18312633`) above an olive translucent scrim (`#18312680`). The selected multi-page mobile navigation uses a shallow menu shadow (`0 12px 20px #254c3d15`). The fixed mobile action bar is the explicit custom shadow exception (`0 -3px 15px #254c3d18`). shadcn outline buttons retain the Tailwind extra-small shadow (`0 1px 2px 0 rgb(0 0 0 / 0.05)`); doctor search explicitly suppresses its input shadow. Focus uses a visible outline (3px) with offset (4px); shadcn controls additionally retain their focus ring.

## Shapes

The selected preview uses asymmetric sage arches: the story hero ground (100px 100px 0 0), becoming (60px 60px 0 0) on mobile, the home journey (80px 0 0 0), and visit summary (60px 0 0 0). On mobile the journey becomes (55px 0 0 0). Wing selection uses an (8px) indicator inside a (12px) rounded track. The former paired home destinations and care explorer CSS remain retained implementation values, not the active homepage composition. Controls have modest rounded corners, while large care/guidance panels use the panel radius. Mobile care panels and the planner use the compact-panel radius. The welcome index rounds only its top corners. Circular brand and doctor markers use (50%) radius; these are visual placeholders and wayfinding marks, not approved identity assets.

## Components

**Buttons.** Solid olive actions use the frontmatter tokens, minimum height (46px), and contextual mobile sizing. Outline actions remain transparent with local muted borders. Text links reveal an underline on hover, offset (5px). Preserve visible focus, disabled behavior from shadcn, and meaningful link destinations.

**Selected navigation and actions.** The shared shell stays mounted while the chapter changes. Its header is sticky at the viewport top, with (18px) vertical padding, reduced to (14px) at (800px). Focusable links and controls use scroll margins (120px 80px) to remain visible between the header and mobile actions. Main links use active underlines; the mobile menu exposes expanded state. On pathname changes, the page scrolls to the top, focuses its heading and updates the document title. Breadcrumbs point to Home, Care & services, Our doctors, Education, or Page guide as appropriate. Action wraps the existing Button with a router Link and uses its default/outline variants; do not replace the shared variant helper with a second button system. Service inquiry links carry the service slug into the request preview.

**Care chapter reading motion.** GSAP advances a thin connecting line with `scrub:0.3` from feature-list `top 65%` to `bottom 65%`. Each row’s decorative tonal wash uncovers using clip-path over (550ms); general care starts at `inset(0 100% 0 0)`, while Unani reverses the reveal from `inset(0 0 0 100%)`, `power3.out`, triggered at `top 72%` and reversed when scrolling back. A current-row marker toggles from `top 60%` to `bottom 60%`. Text is always visible. Scoped useGSAP reverts on preference changes; reduced/manual-disabled motion shows the complete line and wash without these triggers. Story links move their arrow (3px, -3px) over (250ms), using `cubic-bezier(.16,1,.3,1)`; mobile chapter links have a minimum height of (44px).

**Centered clinician gallery.** The heading, introduction, five profile cards, directory link and verification note are centered. The desktop gallery wraps into three cards then two, max width (920px), gap (22px). At (800px), it uses two columns with max width (580px), gap (16px); at (480px), one column with max width (300px), gap (18px). Cards use (14px) corners, a warm paper surface (`#f2f0e4`) and initials in sage circles rather than fabricated portraits. Desktop names use Bitter (25px/1.25), with tracking (-0.025em).

DoctorSpotlight adapts the actual React Bits SpotlightCard source into semantic profile links. Fine-pointer hover tracks a sage radial field (240px, `#cbdcbb` to transparent at 75%); touch is excluded. Keyboard focus uses a flat sage field, visible outline and the same monogram/icon feedback. The monogram lifts (4px) over (300ms), while the arrow shifts (3px, -3px) over (250ms); the field fades over (280ms). Shared disabled/reduced motion uses the flat field and removes positional movement. Attribution and MIT + Commons Clause terms remain in preview/src/components/react-bits/LICENSE.md and the shipped preview/public/third-party/react-bits-LICENSE.md. This component specifically supersedes the earlier no-vendor-source statement; it adds no dependency.

**Chapter arrival and visit journey.** GSAP animates only the chapter from (14px) horizontal offset and opacity (0.6) to its final position/opacity over (380ms), using `power3.out`; scoped useGSAP cleanup reverts on path/preference updates. Home mounts a locally authored geometric Lottie path with three fixed steps and an advancing marker. The SVG light player is dynamically imported, with autoplay and looping disabled. ScrollTrigger maps scroll progress from `top 85%` to `bottom 35%` onto frames (0–90); teardown kills the trigger and destroys the player. Motion off or OS reduced motion skips chapter movement and holds the journey at completed frame (90). Step text always remains readable, including if the player fails. Motion preference is local component state, not persisted storage.

**Dormant care explorer.** This component remains in source but is no longer mounted on the homepage. The user rejected its web-app-like composition; do not restore it as the homepage pattern. Its retained implementation is documented here for reference only. Two equal wing controls expose pressed state; service choices lead to a short detail, associated clinician links and the existing service route. This is directory navigation, never symptom triage. Desktop uses columns (1fr 1.1fr) with gap (60px), narrowing to (35px) at (1100px); at (800px) it stacks, with a two-column service selector. The sage detail has padding (32px 38px) and minimum height (342px), becoming (28px) and (320px) on mobile. Motion LayoutGroup moves the wing indicator over (250ms); AnimatePresence changes detail content over (180ms), entering from opacity (0.55) and horizontal offset (12px). With movement disabled, these durations are zero and initial travel is omitted.

**QuickFind.** The header search and Ctrl/Cmd+K open an existing Radix Dialog, with initial input focus, contained keyboard navigation and Escape dismissal. Case-insensitive title/description matching covers service details, clinician profiles, education, patient information and research entries. Results link to real routes and show an explicit empty state. The cream dialog is at most (620px) wide with (26px) padding, (12px) corners and height capped at (80dvh); mobile uses (20px) padding and (87dvh). This is page discovery, not a clinical search or new patient intake.

**Reading orientation and preparation.** A fixed, noninteractive (3px) olive reading line uses Motion useScroll and a spring with stiffness (180), damping (35). With movement disabled it follows direct scroll progress. Visit now shows three local preparation checkboxes instead of a duplicate Lottie sequence. Completion has a polite status and a (4px) progress track; checklist state resets when its page unmounts. Native checkbox inputs stay above the decorative (24px) boxes; decorations ignore pointer events, and keyboard focus outlines the visible box.

**Interaction feedback.** Existing Action arrows travel (3px, -3px) over (220ms) with `cubic-bezier(.16,1,.3,1)` on hover/focus; ordinary linked arrows use (200ms), and buttons press to scale (0.98). Radix accordions open over (230ms) with height/opacity and close over (180ms); the checklist track updates over (250ms). Shared InteractionMotion and MotionConfig follow the existing user/OS preference; disabled motion removes CSS transitions/animations and selected transform feedback while keeping search, selection, disclosure and checkboxes usable. The hospital-specific patterns are original implementations informed by the sources in research/interaction-libraries.md; Motion is the added runtime dependency. No vendor templates or stock assets were copied. The later clinician gallery is the explicit source-adaptation exception described below.

**Selected filters and inquiry.** Directories have labeled search, pressed-state care filters and empty results. The request preview demonstrates service/time choices without collecting identifying or clinical data. The management walkthrough changes synthetic in-memory statuses only. Preserve visible uncertainty labels and keep source/review controls local.

**Comparison navigation.** Four labeled controls switch the three local options and report. Selected controls use sage with olive text; unselected controls use inverse text and a muted border. Minimum height is (36px). This is study navigation, not intended hospital navigation.

**Care destinations and service lists.** Two linked panels in option one share size and typography. Service lists rely on top or bottom rules and spacing; they are not uniformly elevated cards. Care-panel hover changes background over (0.2s).

**Inputs and planner.** Search is a real client-side doctor filter. The native department select is a guidance control, followed by a polite live region; it makes no reservation. The planner panel uses padding (36px), changing to (26px) on mobile. Its guidance area minimum height changes from (152px) to (140px). No patient input form is implemented.

**Accordions and mobile menu.** shadcn/Radix accordions disclose supporting information. Triggers use padding (20px 0), body text and olive rules. The mobile menu exposes its expanded state; the menu panel is positioned beneath the header. Reduced-motion preference disables transitions, animations and smooth scrolling.

## Do's and Don'ts

- Do preserve equal prominence for general hospital and Unani care across all alternatives.
- Do retain the visible local-preview notice and honest uncertainty labels while comparing designs.
- Do keep keyboard focus and descriptive control labels when extending the study.
- Do carry forward the selected Option 2 and display spelling Al-Arif; keep logo, legal identity and institutional claims separate from that design approval.
- Do keep the workbook, report and review controls local; they are not approved public release content.
- Don't fabricate hospital photography, clinician portraits, testimonials, credentials, clinical outcomes or live availability.
- Don't treat the provisional leaf mark or geometric SVG favicon as an official logo. No raster assets or stock images are used. Authentic logo and photography remain required inputs for a production identity.
- Don't infer dark mode, Urdu RTL or Telugu support from this English, light-theme prototype. Those require separate implementation and reviewed content.

## Accepted website cleanup — 22 September 2026
This supersedes earlier preview-shell guidance: remove review strips and draft notices, review footer links, design selector and management routes. Keep the established identity, public page hierarchy and motion; the motion toggle lives in the footer. The mobile menu softens the background and preserves floating contact actions. Contact rows pair matching icons, numbers and arrows. Source and planning documents stay outside the public bundle.

## Desktop scroll refinement
The desktop homepage uses Lenis with lenis/snap on the GSAP ticker, replacing competing native snap motion. Settling waits 420ms after input and takes 900ms with sine ease-in/out, allowing momentum to subside before a gentle correction; normal scroll smoothing takes 750ms. Both care chapters complete their line and card reveals at the header offset. Cleanup stops the snap and scrolling instances before destruction. Mobile keeps four compact single-column rows and native whole-section settling. Reduced-motion and the manual motion preference bypass smoothing. Decorative horizontal separators and link underlines are removed; form boundaries, focus indicators and the care connector diagram remain.
