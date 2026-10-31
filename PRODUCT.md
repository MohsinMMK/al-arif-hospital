# Al-Arif Hospital

<!-- impeccable:product-schema 1 -->

## Platform
web

## Current scope
The accepted Community welcome design is a public, English-language informational website deployed to Hostinger (alarifgeneralhospital.com) from the public GitHub repository. It has a long editorial homepage and separate service, doctor, about, education, research, visit and inquiry pages. The user authorized automatic deployment from `main`.

## Visitors and tasks
Patients and families need to understand the two care wings, find a clinician, prepare for a visit and contact reception. Education and research visitors need clear information about proposed programmes and available records. General hospital and Unani care receive equal prominence.

## Stack
React, strict TypeScript, Vite and shadcn/ui; no Next.js. GSAP and Lenis coordinate desktop and touch motion. The homepage visit journey uses a deferred Lottie light player and a static SVG fallback. No runtime environment variables are required.

## Brand
Display name: Al-Arif. Preserve warm cream, pastel sage, olive text, Bitter headings and Manrope body text. The homepage presents one readable section at a time, with four service rows per mobile care section and centered, borderless doctor cards. Preserve the approved scrolling, responsive layout and accessible interaction patterns in DESIGN.md.

## Source and content boundaries
The 18-sheet workbook extraction in `research/workbook.json` is the source record. Source labels such as Verified or Approved are assertions, not independent verification. Keep source conflicts and planning evidence private. Do not fabricate clinician qualifications, portraits, outcomes, testimonials, emergency capabilities or live availability.

## Implemented behavior
Search runs locally. Care & services keeps General hospital and Unani care visible as two sections, each with four services followed by its associated team. General hospital shows four clinicians and Unani shows two; one clinician belongs to both through the existing service associations. Service and doctor search results appear above the sections without hiding either wing, with direct detail/profile links, a clear-search control and guidance when nothing matches.

Service-detail teams follow the overview, preparation and FAQs on desktop and mobile. Diagnostics & pharmacy retains department guidance. Homepage wing links, service breadcrumbs and existing wing query links lead to the corresponding care section. Mobile service descriptions stay visible and team profiles use compact horizontal rows.

The visit checklist and inquiry preferences reset when their pages unmount. Call, WhatsApp and map links require visitor action. The inquiry planner stores no patient information and sends no request; reception confirms visits.

## Not implemented
Booking, patient accounts, payments, clinical records, staff administration, programme admissions, publication management, Urdu RTL and Telugu translations. Historical architecture proposals in `docs/planning/` do not imply these systems exist.

## Pending hospital input
Approved clinical roster and credentials, current hours and service availability, emergency contact, fees, authentic brand assets, content-review ownership, a custom domain and reviewed translations. Search indexing was approved on 31 October 2026 for alarifgeneralhospital.com.
