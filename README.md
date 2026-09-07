# deadpine.xyz

Personal portfolio — print-inspired project catalog.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui patterns

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Desktop layout is the primary target (`min-width: 1200px`).

## Content

Projects live in `content/projects/*.md` (frontmatter + optional body description).

```yaml
---
slug: flashbots-website
title: "Flashbots Website"
date: 2022-05-01
tags: ["Branding", "Frontend", "UI"]
link: https://www.flashbots.net/
images:
  - /img/work/flashbots-website.jpg
---

Description paragraphs…
```

Images are served from `public/img/work/`. Projects without images show a placeholder.

Legacy static site files are preserved under `_archive/`.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com) — defaults work (framework: Next.js).
3. Set the production domain to `deadpine.xyz` when ready.

```bash
npm run build   # verify locally
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |
