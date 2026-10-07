# CV Builder rules

## Stack (do not add other dependencies without asking)
Vite + React + TypeScript, Tailwind CSS, Zustand (persist middleware),
dnd-kit, html-to-image, jsPDF, lucide-react, Zod.

## Constraints
- No backend, database, login, or analytics. All data stays in the browser.
- Must deploy on Vercel's free plan as a static Vite build.
- Build only what the current step asks for. No extra features, no speculative abstractions.

## Design
- Minimal and flat: white background, thin dividers, generous whitespace, one accent color.
- No gradients, glow, shadows, or glassmorphism.

## CV preview
- Fixed A4 page (794x1123px). Exports must match the preview exactly.
- Use plain hex colors, inline styles or simple CSS values, and system or bundled fonts
  inside the preview so exports render correctly.

## Code
- Small components: Editor, Preview, SkillBar, SectionList, ExportButtons, SettingsPanel.
- All CV data lives in one typed object in src/types/cv.ts. Show schema changes before applying.
- After each task: run `npm run build` and `npm run lint`, fix errors, then summarize what changed and what to test.
- Never delete files or run destructive commands without asking.
