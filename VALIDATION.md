# Verification — 22 September 2026

This record describes the current public website, the care-directory update and the earlier performance cleanup. Older design-selection and prototype logs are recoverable in Git history; they are not the current implementation.

## Local checks

Run from the repository root:

```sh
npm --prefix preview test
npm --prefix preview run lint
npm --prefix preview run build
```

Four tests pass: workbook preservation, conflicting source evidence, clinician/service associations and the public route catalog. Lint and strict TypeScript/Vite build pass. The production build has no oversized-chunk warnings.

Additional cleanup checks:

```sh
(cd preview && npx --yes knip --no-progress)
npx --yes @google/design.md lint DESIGN.md
git diff --check
```

Knip reports no unused files, dependencies, exports or types. Removed obsolete prototypes, the duplicate content module and unused helpers, three direct dependencies, and 39 obsolete/empty CSS rules. The remaining source was formatted; a comparison with formatted pre-cleanup source confirmed that unrelated components and scroll behavior were unchanged. Internal documentation links resolve.

Google DESIGN.md validation reports zero errors and nine warnings for palette tokens outside the two documented component examples. Those colors remain in use in the website and are retained as design documentation.

## Performance cleanup baseline

Three cold Chromium mobile runs per version against the production build on localhost: 390×844, 4× CPU slowdown, 150ms network latency, 200,000 bytes/s download and cache disabled. Baseline is commit `5f4eabe`, compared with cleanup release `9dbc5c9`; values below are medians. This is a controlled local comparison, not field Core Web Vitals or a Lighthouse score. These timings predate the care-directory layout update and were not rerun for that update.

| Measurement | Before | After |
| --- | ---: | ---: |
| Initial JavaScript transferred, compressed | 272,001 bytes | 181,278 bytes |
| Largest Contentful Paint | 2,108ms | 1,900ms |
| Cumulative Layout Shift | 0.009 | 0.000 |
| First Contentful Paint | 840ms | 1,900ms |
| Sum of long-task time above 50ms | 68ms | 156ms |

Initial JavaScript transfer is 33.4% smaller; median main-content paint is about 10% earlier. The old first paint was an intermediate loading message; the new first paint contains the website. Initial rendering is now consolidated, and the measured long-task overhead increased. These measurements do not establish an INP improvement or guarantee timings on physical phones.

The redundant Motion runtime was replaced with the existing GSAP engine. Lottie downloads only within 400px of its section. React and scroll libraries have separate hashed chunks for independent caching, and three critical local font faces are preloaded. Original workbook data and planning documents are absent from runtime imports and the public output.

Production initially returned `max-age=0` for hashed assets. `vercel.json` now sets `public, max-age=31536000, immutable` for `/assets/`, following [Vercel's header configuration](https://vercel.com/docs/project-configuration/vercel-json#headers). HTML continues to revalidate. This repeat-visit improvement is separate from the cold-cache measurements above.

Raw local evidence is in `output/playwright/performance-{baseline,after}.json` and `performance-{baseline,after}-assets.json`; generated test artifacts remain Git-ignored.

## Browser coverage

Production-build checks used Playwright Chromium:

- All 22 public catalog routes at 1440px and 390px: heading and title present, route focus correct, reading progress reset, no horizontal overflow, no failed responses or uncaught page errors.
- Real emulated touch gestures at 390×844 and 375×667: General and Unani sections settle within 0.5px of the header, with all four rows visible above the floating actions and animations complete. Reverse swipes, held-touch interruption and nested search scrolling pass. Desktop wheel settling remains intact.
- Service browsing, empty-state recovery, FAQ expansion, service-to-inquiry context, local inquiry summary, doctor search/navigation, mobile menu navigation and the preparation checklist pass.
- Reading progress reaches completion after expanded content and resets on route changes; a ResizeObserver updates its range when filters or accordions change page height.
- No Lottie request at first load; one request near the section; observed frames advance from 0 to 58. Manual motion switching disposes/restores the player. Reduced motion makes no player request. A deliberately blocked player download leaves the static diagram visible.
- Desktop welcome/journey and compact mobile care screenshots were visually reviewed. Approved colors, borderless doctor cards, typography, navigation and four-row service layout are preserved.

Local results and captures are `output/playwright/cleanup-*` and `mobile-motion-*`. Browser emulation does not replace physical iOS/Android testing or a complete accessibility audit.

### Care & services update

The directory now has separate General hospital and Unani care sections, each with four services, linked clinician names and a team below. The existing content associations produce four general clinicians and two Unani clinicians; Dr. Naima appears in both. Service-detail teams follow the main reading content. Diagnostics/pharmacy retains department guidance without an invented doctor profile.

- Checked the directory at 1440, 1024, 390 and 375px: both wings remain visible, descriptions remain readable, and there is no horizontal overflow. Desktop and 390px mobile captures include the directory, each care wing and the women's health detail page.
- Checked all eight service-detail pages on the production build at 1440 and 390px: associated profiles match the source data and sit below the overview, preparation, FAQs and visit panel; the sidebar contains no doctor links. No failed responses or uncaught page errors were observed.
- Service/doctor search, direct search-result navigation, empty recovery, clear-button focus, keyboard service navigation and reduced motion pass. Searching does not hide either wing.
- Homepage wing links, service breadcrumbs and legacy `?wing=general` / `?wing=unani` links lead to their section, aligned below the header within 0.25px at both desktop and mobile widths.
- Tests, lint, production build and Knip pass. No dependencies or new animation runtimes were added; retired filter/directory/sidebar rules were removed.

Local evidence: `output/playwright/care-{layout,interactions,production-checks}.txt` and `.impeccable/review/care-*.png`. The scoped mechanical design check reported no findings.

The independent Impeccable finish review returned **ship** for the supplied screenshots and changed source, with no material fixes in scope. Runtime interaction claims are covered by the separate browser checks above.

## Deployment and scope

The `Deploy to Hostinger` GitHub Actions workflow runs tests, lint and build after a push to `main`, then uploads `preview/dist` over FTPS. Verify the run for the pushed SHA succeeds and alarifgeneralhospital.com serves the new hashed assets; then check a direct route and a critical navigation flow.

No new environment variables, backend, patient intake, staff system, booking confirmation, analytics or externally submitted messages were introduced. Institutional content review and the existing `noindex` remain unchanged.
