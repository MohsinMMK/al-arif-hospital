# Verification — 22 September 2026

Created three local React/Vite/shadcn landing-page directions and a workbook assessment with simple website, reception and education options. The source workbook remains unchanged, and all its nonempty cell values are available in the local review explorer.

## Commands

Executed from `preview/`:

```sh
npm test
npm run lint
npm run build
```

- Tests: 4 passed.
- Lint: clean after removing unused generated component exports.
- Build: strict TypeScript and Vite passed. Non-blocking warning: one 536.68 kB client chunk because this private review bundle embeds the report and workbook.

Executed from project root:

```sh
/Users/mohsinkhan/.agents/skills/impeccable/scripts/impeccable detect --json preview/src/App.tsx preview/src/App.css preview/src/index.css
```

Detector output: `[]`. Original XLSX re-read with bundled Python/openpyxl and compared against the JSON extraction: every cell matched.

Google-format document validation:

```sh
npx --yes @google/design.md lint DESIGN.md
```

Result: zero errors, nine warnings. Eight warn about documented color tokens not referenced in the component token subset. One evaluates transparent outline-button backgrounds as transparent black rather than compositing the actual cream surface; the screenshot review checked the rendered colors. The document records the implemented transparent styling instead of inventing a different token to suppress the warning.

## Browser evidence

Playwright CLI session `alaarif` exercised all three options at 1440×1000 and 390×844. No document horizontal overflow at either width; final CTA text color is rgb(255,253,245) on dark green. Full-page screenshots are `.impeccable/review/option-{1,2,3}-{desktop,mobile}.png`; hero captures and report captures are under `output/playwright/`.

Passed interactions: department selection with tailored Hijama guidance; mobile navigation open/close and anchor destination; doctor search by specialty; no-results recovery; FAQ disclosure; 18-sheet inventory; source search for example records; retained example wording; source no-results state. The fresh report browser console reported zero errors/warnings after adding the favicon.

Independent Impeccable finish review: **SHIP for local design selection**, no open material UI findings. See `.impeccable/review/finish-review.md` for coverage and limits. This does not certify publication readiness, full accessibility conformance, Urdu/Telugu content, hospital claims or backend operations.

## Environment and delivery

No new environment variables. No backend or database. No messages sent to hospital staff, no patient/applicant records collected, and no deployment performed. External call, WhatsApp and map links require a user click. The private report/source explorer must be removed before a public deployment.

## Selected multi-page preview — 22 September 2026

- New `/site` preview with 23 catalogue destinations plus `/site/preview`, a not-found route, 8 service details and 5 doctor profiles.
- `npm --prefix preview test`: 6 tests pass (source integrity plus cross-page associations and permitted request-state transitions).
- `npm --prefix preview run lint`: clean.
- `npm --prefix preview run build`: TypeScript and Vite pass, no chunk-size or eval warnings. Lottie light player is lazy-loaded; original report/study loads separately.
- Playwright: all 23 destination pages rendered at 1440 and 390 px with no horizontal overflow and no uncaught page errors.
- Both service filters settled to 4 results each. Search empty state and reset exercised.
- Service → inquiry preserved the service; local summary appeared without submission; changing time cleared the summary; browser Back returned to the service.
- Sample request DEMO-101 moved to Contacted. Architecture panel opened. No backend or persistence is represented as implemented.
- Lottie SVG loaded and its frame advanced to 53 after scrolling; OS reduced motion disabled the motion control. Mobile menu navigated to doctors and closed.
- Representative captures: `.impeccable/review/multipage-{home,general-medicine,tauheed,education,system}-{desktop,mobile}.png`. Motion off for captures; full-page phone screenshots show the fixed action bar at viewport bottom.
- One detector pass: profile-facts border warning is inapplicable because that component has square corners. Fresh finish review and documentation are tracked in `.impeccable/review/multipage-*.md`.
- No environment variables, deployment, patient intake, live admissions, authenticated CMS or operational database added.
- Private source workbook remains in the local comparison bundle. Do not publish this artifact; production must exclude report/source/reviewer pages and use verified public content.

## Interaction refinement — 22 September 2026

- Motion added for shared selection, content transitions and reading orientation; GSAP remains for chapter arrival and Lottie for the home journey.
- Desktop 1440 and mobile 390: selecting Unani → Hijama updates the service panel; doctor/service links retain real routes.
- Search Naima returns one matching profile; result navigation reaches `/site/doctors/naima`. Empty search offers service-directory recovery. Escape closes the dialog and restores trigger focus at both widths.
- Visit checklist checked all three items and announced 3/3, then unchecked one and returned to 2/3. Decorative checkbox spans no longer intercept clicks; controls have scroll margins for the sticky header and mobile action bar.
- OS reduced motion maps the app to `data-motion=off`; manual motion toggle works. Browser batch reported no uncaught page errors or horizontal overflow on inspected home/search/visit surfaces.
- Six current captures: `.impeccable/review/interactions-{home,search,visit}-{1440,390}.png`. Search captures at viewport size; home/visit full-page. Visit recaptured after checkbox correction.
- Library research/provenance: `research/interaction-libraries.md`. Original adaptations, no verbatim third-party components. Only new runtime dependency is `motion`; no environment variables added.
- Build, lint and six local tests pass. No backend, deployment or live bookings added.

## Homepage story correction — 22 September 2026

The user rejected the previous care-explorer composition as too application-like. `HomeStory.tsx` now provides a longer sequence: welcome, hospital, general care, Unani care, doctors, education, research and visiting. Eight services are visible without a selector; five doctor links and the other principal detail routes appear in their corresponding sections. Home content contains no button controls.

- Browser: no horizontal overflow at 1440, 1024 or 390 px. Tablet nav correctly collapses and opens; Research is directly available in navigation.
- GSAP: scrolling to the second general-care feature marks General surgery current; line scale observed at 0.1757. Desktop care intro is sticky. Reduced motion sets washes to no clipping and the line to no transform.
- Clicking the General surgery feature reached its detail URL. Browser Back restored the homepage route; main Research navigation reached `/site/research`.
- Final captures: `story-home-{1440,1024,390}.png` and `story-{general,unani}-{1440,390}.png` under `.impeccable/review`. Two initially blank Unani viewport captures were replaced after waiting for compositor frames; all final files inspected.
- CSS import ordering corrected before final captures to preserve intended heading sizes and tablet menu behavior.
- One detector pass on new homepage files: no findings. Local suite: six tests pass; lint and TypeScript/Vite build pass.
- Existing detailed pages, source records, search, checklist and preview-only intake boundaries preserved. No environment variables added.

## Mirrored Unani and centered doctors

- Desktop: Unani feature column x=140; introduction x=770. General-care structure unchanged. Phone: both columns x=24, introduction remains above features.
- Doctors heading, text, cards, directory link and note centered. Five profiles present, 3+2 arrangement desktop and one centered column at 390px.
- React Bits SpotlightCard adapted with license retained. Pointer movement updates local spotlight coordinates; keyboard focus visible and Enter opens `/site/doctors/tauheed`. Reduced-motion monogram transform is `none`.
- No horizontal overflow at 1440/390. Isolated section screenshots `centered-{unani,doctors}-{1440,390}.png` suppress fixed overlays solely during capture, without changing component layout.
- Detector: no findings. Six tests, lint and build pass. No new dependencies or environment variables.

## Shared care line axis

- General and Unani line centers both measured 720px at a 1440px viewport, and 512px at 1024px. At 390px both remain beside cards at 25px. No horizontal overflow at these widths.
- Desktop connectors and row markers mirror around the shared section axis. Existing scroll animation and mobile stacking preserved.
- Settled section captures: `.impeccable/review/axis-{general,unani}-{1440,390}.png`; fixed overlays hidden only for capture. CSS detector returned no findings.
- Verification: `npm --prefix preview test` (six tests), `npm --prefix preview run lint`, `npm --prefix preview run build` all passed. No new dependencies or environment variables.

## Accepted website cleanup

- Removed preview chrome, design selector, report access and management demos from public routes; root and former review routes lead to the hospital homepage.
- Archived former designs, removed unused care explorer and associated CSS, and removed react-markdown (81 packages).
- Browser checked all 22 public catalog routes at 1440px and 390px: headings present, no horizontal overflow or review banners, no uncaught page errors. Mobile navigation and local inquiry preparation passed.
- Six tests, lint and production build passed. No environment variables added. No deployment or booking backend was introduced.
