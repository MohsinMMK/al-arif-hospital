# Al-Arif Hospital

A public informational website for Al-Arif General Hospital & Unani Research Institute: React, TypeScript, Vite and shadcn/ui. General hospital and Unani care have equal prominence across 22 public pages.

[Live website](https://al-arif-general-hospital.vercel.app/site) · [Private GitHub repository](https://github.com/MohsinMMK/al-arif-hospital)

## Local development

Use Node.js 22.12+ and npm. The application package lives in `preview/`.

```sh
npm --prefix preview ci
npm --prefix preview run dev
```

Open [localhost:5187](http://127.0.0.1:5187/site). No environment variables are required.

## Verify and build

```sh
npm --prefix preview test
npm --prefix preview run lint
npm --prefix preview run build
npm --prefix preview run preview -- --port 5188
```

The production output is `preview/dist`. The last command serves that output locally for testing.

## Deployment

Push an approved change to `main` in `MohsinMMK/al-arif-hospital`. The connected Vercel project, `al-arif-general-hospital`, installs from the lockfile, runs tests and lint, and builds automatically using `vercel.json`. Failed builds leave the previous production deployment active.

Only `preview/dist` is published. SPA rewrites support direct visits and refreshes on all page routes. Source workbooks, research, planning documents and local test artifacts are excluded from the public build.

Hashed files under `/assets/` use a one-year immutable browser cache. HTML keeps Vercel's revalidation policy so later deployments can reference fresh asset hashes. Keep unhashed public files outside `/assets/`.

## Structure

- `preview/src/multipage/Website.tsx`: shared shell, navigation and page routes.
- `HomeStory.tsx`, `Chapter.tsx`, `VisitJourney.tsx`, `useSiteScroll.ts`: homepage and GSAP/Lenis/Lottie motion.
- `data.ts`: services, clinicians, source references and the page catalog.
- `interactive.tsx`: reading progress, accessible search and the visit checklist.
- `preview/src/components/`: shadcn controls, doctor spotlight and WhatsApp icon.
- [PRODUCT.md](PRODUCT.md): current scope and content boundaries.
- [DESIGN.md](DESIGN.md): the accepted visual and motion system.
- [VALIDATION.md](VALIDATION.md): checks and measured performance.
- [research/README.md](research/README.md): private source evidence.
- `docs/planning/`: historical workbook report and expansion proposal.

## Operational scope

The inquiry page prepares service/time preferences and provides reception links. It does not collect patient details, transmit requests, confirm appointments or provide a staff system. Education applications and publication records are not available. No backend, patient database, payments or analytics are implemented.

The site retains `noindex` pending hospital content and domain approval. Clinical credentials, current hours, service availability and contact details need institutional review; design approval does not verify those facts. Third-party licenses ship under `preview/public/third-party/`.
