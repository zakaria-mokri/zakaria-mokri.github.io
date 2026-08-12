# Dark-Luxury Engineering Portfolio

A single-page, recruiter-focused portfolio with a matte-black glassmorphic look, built so every piece of personal content lives in one editable data file.

## Content model (the file you'll edit)

`src/data/portfolioData.ts` exports one typed object containing:

- `profile` — name, headline, short bio, location, email, resume PDF path, availability status
- `degrees` — the two academic credentials shown as hero badges
- `socials` — GitHub, LinkedIn, Email (icon name + URL)
- `techMarquee` — technology names for the sliding ticker
- `experience[]` — title, company, date range, `category: "software" | "it"`, achievement bullets, tech tags
- `education[]` — degree, institution, years, highlights
- `certifications[]` — name, issuer, date, credential ID, `pdfUrl` (file in `public/certificates/`) or `verifyUrl`
- `skills` — three named groups (Full-Stack & Software Engineering; IT Systems, Infrastructure & Management; Developer Tools, Databases & DevOps), each an array of skill names

Every component maps over this data — adding a job, a cert PDF, or a skill needs no component edits. PDFs and the resume drop into `public/` and are referenced by path.

I'll seed it with realistic placeholder content (clearly marked) that you can overwrite with your real details.

## Sections

1. **Floating nav** — sticky frosted-glass pill bar, links to Overview / Experience / Education / Certifications / Skills / Contact, plus "Download Resume" and "Get in Touch" buttons. Collapses to a slide-down glass sheet on mobile.
2. **Hero** — oversized headline, dual-degree badges, CTAs (View Projects, Credentials Vault), social icon row, ambient cyan glow, and an infinite tech marquee at the bottom.
3. **Experience timeline** — vertical line with glowing nodes, expandable cards for achievements, tech-stack tags, and a Software / IT & Management / All filter with animated transitions.
4. **Education** — compact glass cards for the two degrees.
5. **Credentials vault** — responsive card grid; each card shows name, issuer, date, credential ID, and a button that opens the PDF in an in-app modal viewer (or the external verification link).
6. **Skills matrix** — tabbed by the three categories, badges with hover glow.
7. **Contact & footer** — Name / Email / Message form plus a one-click "Copy Email" button; footer with socials and copyright.

## Design system

Tokens in `src/styles.css`: near-black background, pitch-black card surfaces, white/near-white text, cyan-electric-blue accent, glass border and glow shadows, plus a display/mono type pairing so it doesn't read as a default template. No hardcoded colors in components.

## Technical notes

- TanStack Start route at `/` (replaces the placeholder index) with proper SEO head metadata; sections are anchor-scrolled on the single page as requested.
- Framer Motion (`motion`) for scroll reveals, timeline expansion, tab/filter transitions; `lucide-react` for icons.
- Marquee and glow effects in CSS for performance; motion respects `prefers-reduced-motion`.
- Contact form is client-side only (no backend): submitting opens a prefilled mail draft and shows a success toast, and Copy Email uses the clipboard API. Say the word if you'd rather store submissions in a database instead.
- Fully responsive: mobile, tablet, widescreen.
