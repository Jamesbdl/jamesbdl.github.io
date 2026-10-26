# James B. Delgado Lozano — Portfolio

Cinematic, video-led portfolio built with React, TypeScript, Vite, Tailwind CSS v4 and GSAP.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

## Where to edit things

| What | File |
|---|---|
| All text, numbers, roles, education | `src/data/content.ts` |
| Colors and fonts | `src/index.css` (`@theme`) |
| Videos | `public/video/hero.mp4`, `about.mp4`, `contact.mp4` |
| Photos | `public/img/*.webp` |
| Favicon / social image | `public/favicon.png`, `public/og.png` |

## Deploy

The build is static (`dist/`) and uses relative paths, so it works on any static host:

- **GitHub Pages / Vercel / Cloudflare Pages / Netlify**: publish the `dist/` folder, or connect the repository
  with build command `npm run build` and output directory `dist`.

Before going public, set the absolute `og:image` URL in `index.html` to the final domain.
