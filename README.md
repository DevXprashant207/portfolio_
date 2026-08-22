# Prashant Thakur — personal brand site

React + TypeScript + Vite + Tailwind v4. Motion via framer-motion. The 3D system
graph and the process animation are hand-written canvas renderers, not three.js.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Before you publish — in order

**1 · Activate the contact form.** Submissions POST to FormSubmit, which relays
them to `contact.email`. The FIRST submission ever sent triggers a one-time
confirmation email to `prashant.thakur.work@gmail.com`. **Until you click that
link, every enquiry is silently discarded.** Deploy, submit the form yourself,
click the link. Then swap in the hashed endpoint FormSubmit emails you
(`https://formsubmit.co/ajax/<hash>`) so your address is not sitting in the JS
bundle for scrapers.

**2 · Set the real domain.** `prashantthakur.dev` is a placeholder in three
files: `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD),
`public/robots.txt`, `public/sitemap.xml`. Absolute URLs are required for OG —
relative ones will not preview on LinkedIn.

**3 · Confirm the pricing.** `engagements` in `src/data/site.ts` states "$5,000
to $20,000" for a fixed-scope build and a fee-credited discovery sprint. Those
are commercial decisions, not facts about you — read them and make them true, or
change them.

**4 · Replace the headshot.** `src/assets/portrait.png` is 201×219 and is being
displayed at 228px, so it is already upscaled. It is the softest asset on an
otherwise sharp page. 1000px+ on the long edge would fix it.

**5 · Get a real testimonial.** See `TESTIMONIAL-REQUEST.md`. The section is
built and renders nothing until `testimonials` has an entry.

## Still missing

- **NebulaHost screenshot.** The other two case studies show the live product;
  this one only has its diagram. No public URL exists to capture, so either add
  the image to `src/assets/` or run it locally and say which port.
- **Analytics.** Nothing is installed. Plausible or Umami is a one-line script.

## Honesty rules this site follows

Nothing here claims a metric, an award, or a client relationship that is not
public and verifiable:

- Case studies link to something live, or say plainly that they do not.
- `client` fields name only real, publicly-attributable clients.
- Screenshots are of the real sites, captured from production.
- Tech claims match demonstrable work — Java was removed for having no evidence
  behind it, and Go stays only in the skills list, not in a delivery claim.
- `testimonials` is empty and must stay empty until a real person sends words.

## Content

All copy is in `src/data/site.ts`. Sections in `src/sections/`, reusable pieces
in `src/components/`, canvas work in `src/three/`.

The contact form falls back to a prefilled `mailto:` if the relay fails, and a
hidden `_honey` field catches bots.
