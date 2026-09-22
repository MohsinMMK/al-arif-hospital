# Care & services

Mode: Read. Scope: `/site/services` and the associated-doctor section of `/site/services/:slug`.

## User direction

Replace the mixed directory and All / General / Unani filter buttons with two clear sections. Each wing shows its services and associated doctors. Clicking a service or clinician opens that exact page. Service-detail pages put their doctors after the main information on desktop and mobile. Preserve the selected landing-page design language and search clarity.

## Composition and behavior

- Inherit DESIGN.md: warm cream and sage, Bitter headings with olive italic emphasis, Manrope copy, borderless doctor cards and no decorative horizontal rules.
- Reading order: introduction/search → General hospital services and team → Unani services and team → reception guidance.
- Use broad tonal sections and mirrored desktop introductions. Keep one column in the DOM reading order on phones; service descriptions remain visible.
- Each service links directly to its detail and displays linked clinician names from the existing content associations. Each wing then presents its team in the shared spotlight component; on phones these become compact horizontal profile rows.
- Search returns services and doctors above the two sections; it does not hide either care wing. Include an announced result count, direct results, empty recovery and a labeled clear control.
- Homepage wing links and service breadcrumbs point to the appropriate section. Existing `?wing=general` / `?wing=unani` bookmarks still work and show both wings.
- Detail-page doctor profiles follow the overview, preparation and FAQ content. Diagnostics/pharmacy retains its department guidance without invented clinician profiles.
- Keep shared Lenis/page motion and spotlight interaction; add no animation dependency or forced section snapping to the directory.

## Boundaries and acceptance

No new clinical facts, credentials, availability, portraits, patient intake or backend. General hospital has four services and four associated clinicians; Unani has four services and two clinicians. One clinician appears in both because the existing service associations cross wings.

Verify layouts at 1440, 1024, 390 and 375px, keyboard and touch navigation, doctor/service search, empty recovery, legacy links, reduced motion, and every service-detail team's position below the reading content. Keep the homepage's approved compact layout unchanged.
