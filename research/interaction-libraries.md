# Component and motion choices — Al-Arif

The user asked for a livelier, clearer hospital site, informed by component libraries. This refinement preserves the selected cream/sage visual system and all detailed routes.

## Reviewed sources and implementation decisions

| Source | Useful pattern | Al-Arif use |
| --- | --- | --- |
| [Magic UI Interactive Hover Button](https://magicui.design/docs/components/interactive-hover-button) | Clear button response | Original directional-arrow feedback on the existing shadcn Button; no duplicated labels or branded gradients |
| [Magic UI Scroll Progress](https://magicui.design/docs/components/scroll-progress) | Reading orientation | Original olive progress line using Motion useScroll/useSpring; direct progress with motion disabled |
| [React Bits Stepper](https://reactbits.dev/components/stepper) | Guided state changes | Original care explorer: choose a wing, select a service, follow the detail/doctor route |
| [21st.dev community](https://21st.dev/community/components) | Search and navigation component discovery | Reviewed as a catalogue; no marketplace component installed or copied |
| [Animate UI Accordion](https://animate-ui.com/docs/components/radix/accordion) | Animated progressive disclosure | Existing Radix/shadcn accordion gains a short height/opacity transition and keeps keyboard behavior |
| [Motion React](https://motion.dev/docs/react-motion-component) | Shared layout and content transitions | Installed `motion`; LayoutGroup, AnimatePresence, motion and MotionConfig power the care selection |
| [Motion reduced motion](https://motion.dev/docs/react-use-reduced-motion) | Respect movement preferences | Existing app preference/OS query controls MotionConfig and CSS; effects leave content intact |
| [Anime.js](https://animejs.com/documentation/) | Alternative general animation engine | Evaluated; not added because GSAP already handles page/scroll sequences |

These are original hospital-specific implementations of the reviewed interaction patterns, not verbatim vendor source. No paid templates, third-party images, or marketplace code was downloaded. GSAP and Lottie remain installed. Motion is the only new runtime dependency; Radix Dialog was already available.

## Delivered interactions

- **Small:** directional link feedback, button press state, checkbox completion, clear active navigation.
- **Medium:** care-wing selection travels between positions; service detail changes on selection; questions expand; reading progress tracks location.
- **Deeper:** full-site search with focus containment, keyboard shortcut, empty results and route navigation; service explorer connects care to a clinician and detail page; preparation checklist updates completion locally.

No diagnosis, auto-recommended treatment, confirmed appointment or live availability is implied. The care explorer is a directory. The checklist stores no patient data and resets when its page unmounts. Detailed service content remains available; mobile directory descriptions are condensed. Search, selection, checklist and navigation work with movement disabled.

## Centered clinician follow-up
The later doctor-gallery change adapts the actual [React Bits SpotlightCard source](https://github.com/DavidHDev/react-bits/blob/main/src/ts-default/Components/SpotlightCard/SpotlightCard.tsx), replacing the wrapper with a semantic profile link and adding touch/reduced-motion and keyboard behavior. This supersedes the earlier no-vendor-source statement for this component only. Copyright and MIT + Commons Clause license are retained in `preview/src/components/react-bits/LICENSE.md` and shipped as `preview/public/third-party/react-bits-LICENSE.md`. No new package was installed. Monograms are initials, not portraits.
