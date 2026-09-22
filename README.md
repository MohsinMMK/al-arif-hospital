# Al-Arif Hospital

The selected hospital website: React, TypeScript, Vite and shadcn/ui, with warm cream and sage styling. General hospital and Unani care receive equal prominence. GSAP, Motion and a local Lottie animation support the reading experience; reduced motion is respected.

## Run locally

```sh
npm --prefix preview ci
npm --prefix preview run dev -- --host 127.0.0.1 --port 5187
```

Open http://127.0.0.1:5187/. The root opens the hospital homepage at `/site`; service, doctor, education, research, visit and request pages have individual routes.

## Validate and build

```sh
npm --prefix preview test
npm --prefix preview run lint
npm --prefix preview run build
```

Build output: `preview/dist`. A future host must serve `index.html` for application routes. No environment variables are required.

## Public site and private project records

The public bundle contains only the selected website. Preview banners, design-option selection, workbook report access and management demos have been removed. Historical designs are retained in `archive/design-study`; source records remain in `research` and planning documents. These directories are private project records, not deployable website assets.

The request page helps visitors prepare preferences and contact reception. It does not transmit or store requests, collect patient information, or confirm appointments. Programmes have no open applications; unavailable publication records are labelled. Content approval, credentials, contact details and hours still require hospital review before deployment. The HTML retains `noindex` until a real domain and publication are approved. This cleanup does not deploy the site.

Third-party icon/component licenses are included under `preview/public/third-party` and ship with the build.
