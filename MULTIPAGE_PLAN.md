# Al-Arif — selected website preview

Option 2, Community welcome, is the selected direction. This expanded prototype demonstrates the pages, motion and proposed management flow before production implementation.

## Review the pages

Open http://127.0.0.1:5187/site/preview for the complete clickable catalogue.

| Area | Page design and purpose |
| --- | --- |
| Home | Section-by-section welcome, hospital story, separate general/Unani care chapters, doctors, education, research and visit guidance |
| Care & services | Searchable directory with general/Unani filters |
| Eight service pages | Overview, consultation topics, preparation, FAQs, associated clinicians and service-specific inquiry |
| Doctors | Searchable directory plus five individual profiles; unverified credentials and schedules remain explicitly pending |
| About | Hospital identity, community narrative and links into care and learning |
| Education | Proposed programme overview; separate clinical observation prospectus with scope, eligibility and intake fields |
| Research | Research themes and a publication archive awaiting actual verified records |
| Visit | Address, map, contact channels, interactive preparation checklist and conflicting hours explained |
| Inquiry | Interactive department/time preview; collects no identifying or clinical information and submits nothing |
| Management walkthrough | Synthetic reception requests with status changes; content approval, education and architecture panels |

There are 23 catalogue destinations plus the page guide and an unknown-route fallback. Every service and clinician page has a real URL; refreshing and Back work in the local Vite server. Production hosting will need route fallback or pre-rendered routes.

## What the website can simplify

- Patients can find care descriptions and associated clinicians without searching one long page.
- The chosen service carries into the inquiry, reducing repeated explanations.
- Reception contact, directions and preparation are grouped on the visit page.
- Students have a separate education path; proposed programmes do not masquerade as open admissions.
- Hospital staff can understand the request and publishing workflow in a small interactive demo before committing to software.

## Motion

GSAP provides a 380 ms page arrival: a small horizontal movement and opacity transition inside a persistent navigation shell. There is no scroll hijacking or delayed access to content. ScrollTrigger advances a locally authored SVG Lottie journey as the visitor scrolls. A visible motion toggle and operating-system reduced-motion preference stop these effects; readable step text remains present. Lottie loads on the home journey surface. GSAP adds scroll-led feature highlighting in the two care chapters; Motion provides reading progress; the Visit page uses an interactive preparation checklist. Quick search reaches services, doctors, education, research and visit information. The light player excludes the expression engine.

Implementation follows [GSAP React lifecycle guidance](https://gsap.com/resources/React/), [ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [Lottie-web usage](https://github.com/airbnb/lottie-web/wiki/Usage) and [React Router routing](https://reactrouter.com/start/declarative/routing).

## Proposed management system

**Phase 1: approved information website.** Vite + React + shadcn/ui, with approved public content and pre-rendered pages for production. Vite is the development/build tool; a production host serves its built output. A database is unnecessary for information-only pages.

**Phase 2: reception inbox.** Proposed Fastify API and PostgreSQL storage. Minimum patient contact fields and preferred service, server validation, spam protection, consent text and a saved request identifier. Reception follows New → Contacted → Confirmed → Closed. A request is not a confirmed appointment. Notifications run after successful storage and support retries. Staff authentication, role permissions, history, backups and retention must be implemented and tested before real intake.

**Content ownership.** Department owners draft; HR verifies doctor details; the medical lead approves care descriptions; an administrator publishes. Each record should have a source, verification date, owner and approval status. Education coordinators manage programme information separately. Education permissions do not grant access to patient inquiries.

**Phase 3: justified additions.** Education application intake, schedules and queues only when named staff will maintain them. Check the hospital's existing HMS/LIS before introducing clinical records, laboratory reports, payments or a learning platform. These integrations are not built in this preview.

## Information still needed for launch

The confirmed brand spelling is Al-Arif. The workbook is a content source, not blanket verification of every claim. Confirm the legal institutional name, current contact numbers, Sunday hours, service availability, clinician roster/credentials/fees, real images, research references and active programme details. Keep internal workbook material and review controls outside the public release.

## Validation

Six tests, lint and TypeScript/Vite build pass. All 23 catalogue destinations load at 1440 and 390 px without horizontal overflow or page errors. Representative desktop/mobile captures cover home, service detail, clinician profile, education and management. Interaction checks cover filters, service inquiry context, Back, sample status updates, mobile navigation and motion preferences. See VALIDATION.md and .impeccable/review/ for evidence.

No environment variables, external deployment or backend were added.

Library research and adaptation choices: research/interaction-libraries.md. Component patterns were implemented specifically for Al-Arif; Motion is the only dependency added in this refinement.

Current homepage direction: research/home-story-brief.md supersedes the earlier care-selector composition. The homepage presents all eight services visibly in two equal care chapters; detailed pages retain their independent routes.
