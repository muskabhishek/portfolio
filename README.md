# Abhishek Tripathi — Portfolio

Personal portfolio built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and Motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Editing content

- All text, stats, skills, projects and education live in `src/data/profile.ts`.
- Images live in `public/images/`.
- The "Download CV" button serves `public/resume.pdf` (downloaded as Abhishek_Tripathi_Resume.pdf) — replace that file to update the CV.
- Theme colours (light = ocean blue/white, dark = navy/cyan) are CSS variables at the top of `src/app/globals.css`.

## Deploy (Vercel)

Push to GitHub, import the repo at vercel.com/new, and accept the defaults. The site deploys to `<project>.vercel.app`.
