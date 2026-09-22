# Al Aarif Hospital — website and system options

Prepared 22 September 2026 from the supplied 18-sheet master workbook. This is a decision report and local design study, not a production launch or a verification of the hospital’s claims.

## Recommendation

Start with a useful hospital website and a simple, staff-confirmed appointment inquiry. Give general hospital and Unani care equal prominence, as you confirmed. Add a modest Education & Research area only for programmes the hospital verifies. Choose the visual direction separately from the operational features: all three designs can use the same backend.

The most valuable first change is making the right information easy to find: who to see, which service to ask about, when to come, where to go, and how reception confirms a request. A landing page can reduce uncertainty and repetitive questions. It cannot, by itself, eliminate queues, coordinate therapists, authorize medicine refills or maintain clinical records.

Use React + TypeScript + Vite + shadcn/ui for the local prototypes. For production, my preferred evolution is React Router Framework Mode using Vite, pre-rendered public pages, and a small Fastify API with PostgreSQL when saved requests and staff workflows are approved. No Next.js is needed. Vite is the development/build tool; production serves the build through a web server/CDN and runs the API separately.

## What the workbook contains

There are 18 worksheets, 295 nonempty rows and 1,530 nonempty cells, with no formulas. It is a combined research brief, website copy bank, discovery questionnaire and implementation proposal—not a clean clinical database. I found 43 response cells containing bracketed placeholders in sheets 10–16; that mechanical count is not a count of all unresolved decisions.

The workbook describes a community general hospital and Unani research institute in Bandlaguda/Chandrayangutta, Hyderabad. It names five clinicians in the earlier doctor list, seven clinical service groups, five operational pain points and six proposed software modules. The master index calls the module list five modules, but the actual sheet includes a sixth WhatsApp assistant.

The source spells the hospital “Al Arif”; you use “Al Aarif”. The preview uses your display spelling. Confirm the registered/legal spelling, signage, domain and Google Business Profile before launch. Source labels such as “Verified”, “Approved” and “100%” are assertions within the workbook, not evidence that we independently verified them or that you approved them now.

## Which problems can the website actually solve?

### OPD crowding and repeated reception questions

Simplest option: publish an approved doctor roster, visit instructions, call button and appointment inquiry route. Reception confirms the day/time. This helps patients arrive better prepared but does not reserve capacity or remove walk-in queues. Start with this.

Small system option: save requests in a reception inbox with New, Contacted, Confirmed, Cancelled and Closed states. Give each request an owner and show overdue follow-up. Distinguish preferred dates from booked slots. This addresses missed requests more directly than a large chatbot.

Later option: digital token queue and capacity-based scheduling. It only helps if reception and clinicians update the queue consistently. Public displays use anonymous tokens, not patient names or conditions. Track actual waiting time before claiming an improvement; the workbook’s promised 70% crowding reduction is unsupported.

### Hijama scheduling, therapist preferences and room conflicts

Simplest option: a clear Hijama information page with an inquiry action, preference for a male/female practitioner where offered, and a statement that staff confirm suitability, availability and preparation. Do not turn the workbook’s fasting suggestions into blanket patient instructions.

Small system option: reception assigns a therapist and room, with procedure duration and preparation/cleanup buffers. Confirmation follows clinical screening. Later self-booking needs actual capacity, shift exceptions, cancellation rules and database-level conflict protection. A date picker alone cannot prevent double-booking.

### Outstation medicine repeat inquiries getting lost

Simplest option: a “Medicine refill inquiry” route with a clear explanation that existing prescriptions require pharmacy review. At first it can tell patients how to contact the pharmacy. Do not launch a generic herbal shop or promise international shipping.

Small system option: a private request inbox, prescription validation by authorized staff, quotation, payment link after approval, and dispatch tracking. Prescription uploads require authenticated access, private storage and file scanning. E-commerce, inventory and courier automation belong later, after licensed dispensing and shipping scope are confirmed.

### Lost records for infertility and chronic care

The landing page cannot fix this. At launch, publish what records patients should bring and how to contact the team. Prefer integration with the hospital’s existing HMS/LIS before building a new record system.

A clinical portal is a separate project: identity verification, role-limited access, audit trails, secure files, retention rules and clinical governance. Do not use a public CMS, WhatsApp transcript or ordinary inquiry table as a patient health record.

### Weak digital presence and unclear institutional identity

This is the strongest landing-page opportunity. Clearly distinguish general hospital and Unani care; provide doctors, service descriptions, authentic photographs, accurate directions, language support and a consistent contact route. Add dedicated service pages when the content is verified, rather than cramming every procedure into the homepage.

Use useful local titles, canonical URLs, a sitemap and appropriate structured data. Do not publish “best” claims, manufactured ratings or a promise of top-three search rankings. Structured data helps describe content; it does not guarantee ratings or rich results.

## Three levels of scope to choose from

### A. Clear information and contact — recommended starting point

Include a patient-facing homepage, General Hospital, Unani & Hijama, doctor directory, visit/contact information, FAQs and a small About/Research section. A single “Request a visit” action routes to a clearly described contact process. Include verified timings and fees only after staff approval. Provide English first during design review, then reviewed Urdu and Telugu content for launch if selected.

This is the easiest to operate. It solves findability, confidence and routine questions. Staff still manage requests manually. No patient login, live queue, payments, symptom quiz, medicine checkout or learning management system is necessary.

### B. Website plus reception desk

Add a saved inquiry form, staff inbox, assignment/status changes, follow-up reminders and a configurable doctor/service roster. Notifications are triggered only after the request is stored successfully. WhatsApp is an optional handoff, not proof that a request reached reception. Start without free-text symptoms or prescription uploads to minimize sensitive data.

This is worthwhile if requests are currently being lost. It requires someone at reception to own the inbox daily, a response-time policy, authenticated staff access and reliable backups. Measure missed requests, response time and request-to-confirmation rates before adding more automation.

### C. Hospital operations platform — separate later decision

Add real slot/room/therapist allocation, anonymous live queues, secure reports, pharmacy approval/payment/dispatch, teleconsultation and integrations only as individually approved modules. Clinical records and education administration have different users, permissions and governance; they should not be squeezed into the landing-page project.

My suggested sequence is A, then B if the hospital has a named reception owner. Move to C only when actual usage demonstrates the need. The workbook’s 30-day plan is plausible only as a conditional goal for a narrow public site, not a promise to deliver every proposed module.

## Education, internships and research: useful options without a large portal

### Education option 1: Information and interest — simplest

Add one Education & Research page describing only confirmed observerships, internships, workshops or academic visits. Each programme should state who it is for, eligibility, duration, location, supervisor, intake dates, fees if any, selection process and contact person. Use “Enquire about opportunities” until an intake is confirmed.

This adds a clear route for students without distracting patients. Place it under About/Research or in secondary navigation, rather than alongside emergency contact. The workbook mentions students, researchers and AYUSH collaborators at 09!C9 and a publications archive at 12!F18:F19, but it does not establish an active internship, affiliation, recognized qualification or admissions calendar.

### Education option 2: Applications and shortlisting

If there is regular intake, add a programme catalog, application window, minimum applicant details, private CV upload, staff shortlisting and status notifications. Applications belong in a separate education inbox, not the patient queue. Add a programme coordinator and a deletion/retention policy. Only collect documents needed at that stage.

### Education option 3: Learning portal — only if teaching operations justify it

Attendance, timetables, learning materials, supervised assessments and verifiable certificates are a later module or an existing LMS integration. Do not imply accreditation or recognized certification without documentary approval. Intern access to patient records must never follow automatically from being admitted to an educational programme.

Recommended choice now: include a small Education & Research preview in the content plan and reserve a page route. Publish opportunities only after programme owners supply details. No course payments, admissions promises or student accounts are needed for the first website.

## Three landing-page directions

### Option 1 — Care pathways

Two equally prominent care destinations form the opening view: General Hospital and Unani & Research. A large humanist headline, cream background and sage panels lead directly to services and doctors. Patient path: choose a wing → understand a service → find a clinician → request a visit. Education remains a secondary destination.

Best for first-time visitors who are unsure which part of the institution they need. The main risk is asking users to understand the two care categories too early; the shared service list and reception help route address that. My recommendation for the main website.

### Option 2 — Community welcome

A warm editorial introduction leads into an open service directory, institution story and doctor list. A serif display face and quiet cream/green blocks emphasize approachability without invented trust badges. Patient path: recognize a local institution → browse care → meet the team → plan a visit.

Best if authentic heritage, building photography and community work are the main strengths. Education and research can sit naturally alongside the institutional story. The risk is slower access to the appointment action, so a visible navigation CTA remains essential.

### Option 3 — Visit planner

The opening view gives visitors a simple department selector and a plain-language next-step explanation beside the hospital introduction. It emphasizes task completion and reception guidance. Patient path: choose the need → see what to do → contact reception. Both wings remain equally available in the selector and service index.

Best if the hospital prioritizes reducing routine reception questions and later chooses the staff inbox. It can evolve into request intake without changing the visual system. The risk is appearing more like a booking tool than a full institution; the following sections preserve doctors, services, heritage, education and research.

All three are locally runnable front-end studies, using the same source-derived content and shadcn/ui components. They have no production backend and collect no patient/applicant data. The preview’s design selector, report and workbook explorer are reviewer tools, to be removed from a public release.

## Proposed sitemap and homepage content

Keep primary navigation to Care & Services, Doctors, About, and Visit, plus Request a Visit. Care & Services exposes both General Hospital and Unani & Research. Add Education & Research as a secondary link, promoting it only if there are confirmed programmes and demand. This reduces the workbook’s competing five/six/eight-link header proposals to a small usable structure.

Homepage sections: identity and dual care routes; clinical services; Unani approach and Hijama; doctor directory; facilities and institutional background; Education & Research; appointment/contact guidance; FAQs; address and directions; legal/footer information. No content topic is lost, but detailed procedures, publications, programme requirements and policies live on dedicated pages.

General care content: medicine, surgery, women’s health and infertility, diagnostic tests and pharmacy. Unani content: consultations, dietary guidance, prescribed formulations, regimental therapy, joint concerns and rehabilitation. Pediatrics, ICU/NICU, orthopedics/trauma, imaging, additional visiting specialties and health packages are questionnaire topics, not confirmed capabilities. Do not advertise them as available until approved.

## Frontend and backend alternatives

### Recommended for the full direction: Vite + React Router + Fastify + PostgreSQL

Use React Router’s Vite-based Framework Mode for pre-rendered public routes and interactive React/shadcn components. Keep staff tools behind authentication. Fastify supplies a small typed API when the staff inbox is selected; PostgreSQL owns requests, status changes and resource allocation. Use a shared validation schema at API boundaries and database constraints for scheduling correctness.

Advantages: one React component system, no Next.js, clear control over patient data and a straightforward route from public site to operational tools. Trade-off: someone must maintain the API, database, access controls and backups. For scope A, omit the operational backend entirely and edit reviewed content in files or a content-only CMS.

### Better if the first release stays mostly informational: Astro + React/shadcn islands

Astro is built with Vite and can ship mostly static HTML while hydrating selected React components. It is a strong alternative for service pages, multilingual content and a small education catalog. Use the same independent backend if forms are later approved. Trade-off: interactive app-like areas introduce an additional island/routing model; the staff portal may be a separate React app.

### Faster managed operations option: Vite frontend + Supabase

Supabase can provide managed PostgreSQL, authentication and private storage. It is reasonable for a small operations team if row-level security, server-side workflows, backup/restore, hosting region and access boundaries are explicitly reviewed. Never place privileged service keys in VITE-prefixed variables or rely only on hidden UI buttons for access control. Managed services do not automatically make healthcare workflows compliant.

NestJS is an alternative to Fastify’s lightweight structure when a larger backend team needs enforced modules and dependency injection. I would not add that structure for an initial brochure and request inbox. An existing hospital HMS/LIS with supported APIs may be a better operational backend than either custom approach; verify the vendor first.

### Data and workflow outline for scope B

Public content: Institution, Department, Service, Doctor, Schedule, Facility, FAQ, Publication and Programme. Every publishable record gets a source, owner, verification date, draft/approved status and language variants. Operations: Inquiry, InquiryStatusEvent, StaffUser, Role and NotificationAttempt. Education applications are separate records with separate staff permissions.

API boundary: public read endpoints expose approved content only; POST inquiry validates and stores minimum contact/preference data; authenticated reception endpoints assign and change status; notification jobs retry with idempotency keys. Future appointment tables distinguish requested, confirmed, checked-in, completed and cancelled; future slots model clinician, room and therapist resources, buffers and leave dates. No schedule inferred from the workbook becomes a production calendar.

Deployment: pre-rendered HTML/assets on CDN or a configured web server; API behind HTTPS reverse proxy; PostgreSQL and private file storage outside the public web root. Use secure staff sessions, authorization on every read/write, rate limiting, anti-spam, redacted logs, encrypted transport, tested restores and failure alerts. Public analytics must exclude request contents and health information.

Before storing personal data, have the hospital approve the notice, purposes, retention periods, processors, access rules and deletion/contact process. Check the applicable DPDP Act/Rules commencement dates with legal counsel; a privacy page or “SSL 256-bit” badge is not compliance. Clinical and education records require their own retention and access decisions.

## Content corrections before publication

Name: user “Al Aarif” versus source “Al Arif”; confirm display/legal names. Doctor identity: Tauheed/Touheed variants in 03!A4, and example entries such as Dr. Vaheed in 13!B7; do not merge them into a verified roster. Qualifications, registrations and years of experience in sheet 13 contain examples and XXXXX identifiers.

Hours: 02!B13 and 08!D65 say Mon–Sat, while 10!F19 says Mon–Sun. Doctor schedules in sheets 03 and 13 also differ. The blueprint offers an afternoon window while the overview suggests a break. A single approved roster must own public availability.

Emergency: reception/WhatsApp numbers appear in sheet 00, but the dedicated emergency number is still a placeholder in 10!F17. Do not relabel reception as a verified emergency hotline. Confirm capabilities, staffing and escalation before advertising round-the-clock emergency care.

Trust: 25+ years, ₹100 starting fees, Google/Justdial ratings and patient quotations need dated evidence and appropriate publication rights/consent. Do not treat source testimonials as clinical proof. Remove claims of “side-effect-free”, guaranteed purity, cure, replacement for surgery/IVF, or research-backed efficacy unless approved and substantiated. The preview deliberately avoids those promises.

Facilities/research: no actual photos, logos, certificates, bed counts, publication PDFs or trial identifiers were supplied. Questionnaire prompts for leech therapy, NICU, accreditation and affiliations are not facts. Email addresses in 10!F18 may be intended addresses; domain ownership remains unresolved in 14!F12.

Technology: replace Next.js in 00!D35, 06!E4, 14!F13 and 17!C8/E22 with the chosen Vite architecture. Remove unconditional security, uptime, conversion, wait-time and search-ranking guarantees. Clarify that WhatsApp redirect, WhatsApp Business API and a stored hospital request are three different things.

## Full workbook-to-website and system map

00 Executive index → report overview and decision register; not homepage copy. Reconcile module counts and stack preference.

01 Outreach master → source profile, contact and proposed needs; keep business-development pitch and revenue claims internal.

02 Hospital overview → About, location, hours and facility content; verify history, fees, ratings and licenses.

03 Doctors → five-clinician draft directory and therapy team; confirm identity, role, qualifications and availability.

04 Clinical services → service index and dedicated detail pages; remove unsubstantiated benefit/cure claims.

05 Operational pain points → feature priority report and measurable reception workflows; not patient marketing copy.

06 Tech modules → staged backlog for website, queue, therapy scheduling, refills, records and messaging; six actual modules.

07 Reviews → private verification/consent queue, then approved testimonials if appropriate; no copied clinical proof claims.

08 Website blueprint → homepage structure, service topics, request journey and footer; replace false instant reservation semantics.

09 Questionnaire instructions → internal intake ownership, asset checklist and proposed audiences; education audience appears here.

10 Profile/brand → display/legal name, heritage, assets, languages and contacts; replace palette with your cream/pastel-green brief.

11 General services intake → clinical approval checklist; only active verified services become public pages.

12 Unani/research intake → Unani content, therapy/service confirmation, publications and pharmacy scope; reserve education/research routes.

13 Staff directory intake → authoritative future clinician records after HR validation; example entries remain unpublished.

14 Digital/technical intake → booking channel, HMS/LIS, domain, hosting, privacy and payment decisions; no automatic integration approval.

15 Sitemap/SEO → simplified navigation, service pages, local titles and structured data after content approval.

16 Media/trust/compliance → photography, consent, licenses, privacy and clinical review inputs; no accreditation badges without evidence.

17 Roadmap → phased delivery and named decision owners; revise milestones around the selected scope, not every proposed platform module.

The local source explorer preserves every nonempty row and cell with its original worksheet and coordinate. This is how all workbook information stays available without exposing internal planning on a public landing page.

## Practical rollout and acceptance

First decide the page direction, scope A/B/C and education option. Then administration verifies identity/contacts/hours, HR verifies clinicians, department leads verify services, trustees approve heritage, a research/education coordinator verifies publications/programmes, and IT identifies HMS/LIS and hosting ownership.

Build the public site after those inputs are ready. A reasonable planning allowance is 2–4 weeks for approved content and one selected public design; adding a reception inbox may take another 2–4 weeks depending on integration and review. These are estimates, not fixed delivery commitments. Translate and medically review Urdu/Telugu content; test Urdu RTL, font line height and phone/date directionality separately.

Before launch, verify desktop/mobile navigation, keyboard focus, contrast, click-to-call/maps, approved content parity, SEO HTML, no example credentials, and no false booking confirmation. For scope B also test invalid requests, duplicate submission, failed notifications, permissions, staff status updates and restore recovery. Do not deploy the private workbook explorer or source data with the public site.

Useful success measures: patients reaching the correct service/contact route; fewer repeated timing/location questions; reception response time; proportion of inquiries confirmed; no-shows; and later actual queue waiting times. Establish a baseline before promising percentages.

## Design and technical references checked

Google Labs DESIGN.md specification: https://github.com/google-labs-code/design.md/blob/main/docs/spec.md — YAML tokens plus prose sections. It is a design-system format, not a required Google visual style. Its current specification is alpha.

Aura layout guidance: https://www.aura.build/learn/prompt-for-layout — describe section structure, alignments and explicit mobile/tablet transformations.

Aura customization guidance: https://www.aura.build/learn/master-customizations — use deliberate typography, spacing and consistent component styling rather than default generated decoration.

Aura DESIGN.md workflow: https://www.aura.build/learn/ai-landing-pages-images-videos — adapt references to content and inspect the rendered result. No stock clinician photos or generated hospital evidence were used here.

Vite production deployment: https://vite.dev/guide/static-deploy.html — vite preview is local preview, not a production server.

shadcn/ui Vite installation: https://ui.shadcn.com/docs/installation/vite — compatible React/Vite setup; preview components were retrieved with the shadcn CLI.

React Router rendering: https://reactrouter.com/start/framework/rendering — static pre-rendering and server rendering options.

Astro React integration: https://docs.astro.build/en/guides/integrations-guide/react/ — React components and hydration within Astro.

Fastify: https://fastify.dev/docs/latest/ ; NestJS: https://docs.nestjs.com/ ; Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security

MeitY DPDP Rules and enforcement resources: https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?pageTitle=Digit
