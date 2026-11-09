# Portfolio

Personal portfolio of Tamilarasan Selvakumar, Associate Software Engineer working on Rails and Node services and React interfaces.

Built with Next.js 16, React 19, Tailwind CSS 4 and Lenis.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All copy lives in [`lib/data.ts`](lib/data.ts): profile, experience, skills, coding agents and profile links. Components read from it, so most updates don't touch the UI code.

The resume button links to `/resume.pdf`. Put the file at `public/resume.pdf`.
