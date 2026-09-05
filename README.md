# Voyager Tracker

An independent, educational website that tracks NASA's Voyager 1 and Voyager 2 spacecraft and
explains their mission, science and history. The site combines a live (estimated) tracker —
distance from Earth and the Sun, speed, one-way light time and interstellar status — with
original articles about the Voyager mission, a fact-based timeline, key scientific discoveries,
the Golden Record, an FAQ, a transparent methodology page and source references.

**This is not an official NASA website.** All interactive figures are calculated estimates based
on published NASA/JPL mission data and are labelled as such.

Live site: https://wahaha232.github.io/VoyagerTracker/

## Pages

The site is a multi-page React + Vite application. Each page is a real `.html` URL so search
engines can crawl every page independently:

- `/` — home (hero, live tracker, mission overview)
- `/voyager-1.html` — Voyager 1 mission, distance and status (+ tracker)
- `/voyager-2.html` — Voyager 2 mission, distance and status (+ tracker)
- `/mission.html` — the Voyager mission overview
- `/timeline.html` — fact-based mission timeline
- `/discoveries.html` — scientific discoveries
- `/golden-record.html` — the Golden Record
- `/how-it-works.html` — data sources and methodology
- `/faq.html` — frequently asked questions
- `/about.html`, `/sources.html`, `/updates.html`, `/privacy.html`, `/contact.html`

## Data methodology

- **Historical** — fixed mission facts (launch, flybys, interstellar crossings) from NASA/JPL records.
- **Estimated / calculated** — a published NASA/JPL baseline distance advanced by each
  spacecraft's cruising velocity over elapsed time, then converted to AU, km and light-travel
  time. Values tick smoothly in the browser (~10 Hz) from a fixed baseline; they are never
  presented as live NASA telemetry.
- The full methodology is explained on the site's `/how-it-works.html` page, and references are
  listed on `/sources.html`.

## Tech stack

- React 19 + TypeScript
- Vite (multi-page build — see `vite.config.ts` for the page inputs)
- Tailwind CSS
- Three.js / @react-three/fiber for the interactive 3D spacecraft model

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build
```

## Deploying to GitHub Pages

The site is published to the `gh-pages` branch. The build is configured with
`base: '/VoyagerTracker/'` for project-page hosting.

```bash
npm run build
npm run deploy   # gh-pages -d dist
```

## Attribution

- Mission data: NASA Science / JPL (see `/sources.html` for the full list of links)
- This project is not affiliated with or endorsed by NASA or JPL.
