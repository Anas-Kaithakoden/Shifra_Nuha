# Shifra Nuha Technologies — Website

> **Start. Build. Grow. Automate.**

Marketing website for Shifra Nuha Technologies. Built from
[`Shifra_Nuha_Technologies_Startup_Brief.md`](./Shifra_Nuha_Technologies_Startup_Brief.md).

The goal of the site is **lead generation**: a visitor should understand what the
company does, who it serves, the four service areas, why the company is
different, and how to make contact — within a few seconds.

---

## Stack

| | |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 6 |
| Runtime dependencies | 3 (`react`, `react-dom`, `react-router-dom`) |

No UI kit, no state library, no animation library. The design system is a small
set of components plus a custom colour theme in `src/index.css`.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build locally
npm run test       # typecheck + render smoke test + accessibility checks
```

---

## Editing the content

**All website copy lives in one file: [`src/content/site.ts`](./src/content/site.ts).**

Change text there and every page updates. No component should need editing for
a wording change. The file is grouped as:

| Export | Controls |
|---|---|
| `site` | Company name, wordmark, tagline, description, domain |
| `brand` | Paths to the logo, mark, favicon and share image |
| `contact` | Phone, WhatsApp, email, address, hours, service areas |
| `social` | LinkedIn / Facebook / Instagram / X profile URLs |
| `nav` | Header navigation items |
| `services` | The four service areas, their copy, capabilities and outcomes |
| `whyUs` | "Why Shifra Nuha Technologies?" points |
| `process` | The four process steps |
| `audience` | Audience pills and typical situations |
| `cta` | Closing call-to-action band |
| `enquiryNeeds` / `businessTypes` | Form dropdown options |
| `contactPage`, `aboutPage`, `footer`, `notFound` | Copy for the individual pages |

### Colours and other design tokens

Defined as CSS custom properties under `@theme` in
[`src/index.css`](./src/index.css):

- `ink-50 … ink-950` — near-black navy neutrals
- `brand-50 … brand-950` — the deep ocean-teal accent
- The four service cards additionally use muted `blue`, `amber` and `violet`
  accents so they read as visually distinct without looking decorative.

The logo ink is navy `#000818` and teal `#00b8d0`. Those sit close to `ink-950`
and `brand-500` but are not identical — worth aligning if the logo is meant to
define the palette.

---

## Brand assets

The web-ready derivatives below are checked in and are the only logo files the
site references. The master artwork they were generated from is **not** stored in
this repository, so a brand change means starting again from a new source file.

| File | Size | Used for |
|---|---|---|
| `public/brand/logo.png` | 640 × 189 | Header and footer lockup |
| `public/brand/logo-white.png` | 640 × 189 | The `tone="dark"` variant |
| `public/brand/mark.png` | 256 × 256 | The monogram on its own |
| `public/brand/favicon-32.png` | 32 × 32 | Raster favicon fallback |
| `public/brand/apple-touch-icon.png` | 180 × 180 | iOS home screen icon |
| `public/brand/og-image.png` | 1200 × 630 | Social share card |
| `public/favicon.svg` | 4.9 KB | Vector favicon, traced from the mark |

Regenerating these needs a **vector** source (for `favicon.svg`) and a **white
knockout** of the lockup (for `logo-white.png`, used by `tone="dark"` on dark
backgrounds) — neither can be derived reliably from a flattened raster.

---

## Project structure

```text
public/
├── brand/                  Generated web-ready derivatives
├── favicon.svg             Vector favicon, traced from the mark
├── robots.txt
└── _redirects              SPA rewrite for Netlify / Cloudflare Pages
src/
├── components/
│   ├── Audience.tsx        Who we help
│   ├── Button.tsx          Button / ButtonLink / ButtonAnchor
│   ├── ContactForm.tsx     Lead form
│   ├── CtaBand.tsx         Closing CTA
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Logo.tsx            Brand lockup image + dark-tone variant
│   ├── Navbar.tsx          Sticky nav with mobile menu
│   ├── Process.tsx         How it works
│   ├── Reveal.tsx          Scroll reveal wrapper (respects reduced motion)
│   ├── Section.tsx         Section shell + heading block
│   ├── ServiceCard.tsx
│   ├── Services.tsx        Service card grid
│   ├── WhyUs.tsx
│   └── icons.tsx           Inline SVG icons
├── content/
│   └── site.ts             ← all copy lives here
├── lib/
│   ├── enquiry.ts          Form submission (placeholder — see below)
│   └── seo.ts              Title / description / Open Graph handling
├── pages/
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── PrivacyPolicy.tsx
│   ├── NotFound.tsx
│   └── PageShell.tsx       Shared page frame + intro header
├── App.tsx                 Routes, skip link, scroll restoration
├── main.tsx
└── index.css               Tailwind theme + base styles
```

---

## What is still a placeholder

These were **not** provided, so nothing has been invented. Each is empty in
`src/content/site.ts`, and the UI renders a clearly labelled placeholder instead
of fake information.

| Item | Where | How to finish it |
|---|---|---|
| Phone / WhatsApp / email / address / hours | `contact` | Fill in the values — the footer, contact page and CTA band pick them up automatically. |
| Social profile URLs | `social` | Fill in; empty links stay hidden. |
| Real domain | `site.url` | Set it and canonical, `og:url` and the absolute `og:image` are emitted. |
| Enquiry delivery | `src/lib/enquiry.ts` | Replace the function body with a `fetch` to a form service, your own API, or a CRM/automation webhook. The form needs no other changes. |
| Privacy Policy text | `src/pages/PrivacyPolicy.tsx` | A starting template, marked as a draft on the page. |

Deliberately **not** included, per the brief: pricing, testimonials, customer
logos, statistics, reviews, awards or certifications.

---

## Deploying

`npm run build` outputs a static site in `dist/`.

Because this is a single-page app, the host must rewrite unknown paths to
`index.html` so `/services`, `/about`, `/contact` and `/privacy` resolve on a
hard refresh.

- **Netlify / Cloudflare Pages** — `public/_redirects` is already included
  (`/* /index.html 200`).
- **Vercel** — add a rewrite, or add `vercel.json`.
- **Nginx** — `try_files $uri $uri/ /index.html;`

If you deploy to a subdirectory, set `base` in `vite.config.ts`.

---

## Adding things later

The architecture is deliberately kept flat and component-driven so the
following can be added without restructuring:

blog, case studies, portfolio, testimonials, pricing, WhatsApp integration,
CRM integration, appointment booking, client portal, per-service landing pages,
lead tracking, analytics, Meta Pixel, Google Analytics, SEO landing pages.
