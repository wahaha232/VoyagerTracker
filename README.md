# Voyager Tracker

An independent educational website about NASA's Voyager 1 and Voyager 2. It continuously
calculates where both probes are — distance from Earth and the Sun, speed, signal delay — and
explains what those numbers mean, how the twins compare, what they discovered and why the
mission still matters.

**This is not an official NASA website.** All live figures are calculated estimates, validated
against NASA/JPL Horizons and labelled as such. They are not NASA telemetry.

Live site: https://wahaha232.github.io/VoyagerTracker/

## What the site offers

| Page | What it is for |
| --- | --- |
| `/` | Where both probes are now, with context, milestones and "since your last visit" |
| `voyager-1.html`, `voyager-2.html` | Per-spacecraft tracker, history, instrument status, recent events |
| `compare.html` | Voyager 1 vs 2: live comparison, 1977–2035 distance/speed chart, why they differ |
| `timeline.html` | Interactive, filterable timeline; every event has context and a source |
| `discoveries.html` | Science by destination: what Voyager saw and why it matters |
| `tools.html` | Communication delay, Date Explorer, compare two dates, scale explorer, light time, converter, travel time |
| `mission.html`, `golden-record.html`, `why-voyager-matters.html` | Background articles |
| `how-it-works.html` | The calculation model, validation table and limitations |
| `sources.html` | Which reference supports which part of the site |
| `faq.html`, `about.html`, `updates.html`, `contact.html`, `privacy.html`, `terms.html` | Supporting pages |

Content is available in English, Traditional Chinese and Spanish (language switcher in the header).

## How the numbers are calculated

`src/lib/ephemeris.ts` holds the whole model:

1. Barycentric state vectors (position + velocity) for both probes from JPL Horizons at a fixed
   epoch, propagated with a third-order Taylor series under solar-system gravity.
2. The Sun's offset from the barycentre, interpolated from a monthly JPL table.
3. Earth's position from the Astronomical Almanac low-precision solar formula.
4. Distances are straight-line distances between those positions; light time = distance / c.

Checked against JPL's own geocentric distances every 5 days for 2024–2031, the Earth distance
stays within about 40,000 km. The model also reproduces NASA's date for Voyager 1 reaching one
light-day from Earth (18 Nov 2026).

## Data pipeline

```bash
npm run data       # re-download reference data from JPL Horizons (scripts/fetch-horizons.mjs)
npm run validate   # compare the model with JPL; writes src/data/validation-summary.generated.ts
```

Generated files (`src/data/*.generated.ts`, `scripts/validation.generated.json`) are committed so
the build never depends on network access. Instrument status and mission events are maintained
by hand from NASA publications (`src/constants/voyagerData.ts`, `src/pages/TimelinePage.tsx`).

## Build

The site is a Vite + React + TypeScript multi-page app, prerendered to static HTML:

- `scripts/pages.mjs` — single list of pages (titles, descriptions, schema type, sitemap hints)
- `scripts/gen-html.mjs` — writes the per-page HTML entry files from that list
- `scripts/prerender.mjs` — after `vite build`, renders every page with the SSR bundle, injects
  the HTML, JSON-LD (FAQ schema generated from the FAQ data) and writes `sitemap.xml`
- `scripts/check-site.mjs` — checks metadata, canonicals, headings, JSON-LD, internal links;
  `--external` also requests every external link

```bash
npm install
npm run dev        # development server
npm run build      # gen-html → type-check → client build → SSR build → prerender
npm run check      # static checks on dist/ (add -- --external for link checks)
npm test           # calculation-engine and input-handling tests
npm run preview    # serve dist/ at http://localhost:4173/VoyagerTracker/
npm run deploy     # build and publish dist/ to the gh-pages branch
```

## Audit documents

`docs/PROJECT_AUDIT_V2.md`, `docs/ADSENSE_VALUE_AUDIT_V2.md`, `docs/CALCULATION_ENGINE_AUDIT.md` and
`docs/ADSENSE_VALUE_REPORT_V2.md` record what was measured, changed and verified in the V2 work.

## Attribution

Mission data: NASA Science, NASA/JPL and the JPL Horizons System (see `sources.html`).
This project is not affiliated with, endorsed by, or sponsored by NASA or JPL.
