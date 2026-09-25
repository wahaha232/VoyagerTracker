# AdSense Value Report — Voyager Tracker V2

Date: 2026-09-25 · Companion documents: `PROJECT_AUDIT_V2.md`, `ADSENSE_VALUE_AUDIT_V2.md`, `CALCULATION_ENGINE_AUDIT.md`

> The site has been strengthened against the identified "low value content" issues, but Google makes the final AdSense approval decision.

## 1. Executive summary

**Before V2:** a validated live tracker, a 50-year chart, a comparison page and four calculators — but past dates showed only the distance from the Sun, "why the distance changes" was text only, and official vs calculated values were not labelled where they appeared.

**After V2:** any date from 1977 to 2034 can be explored with distance from Earth and the Sun, signal delay, speed, mission age and nearby sourced events; two dates can be compared; distances can be placed on a scale ruler; a message can be "sent" to see the real delay; an interactive diagram shows why the Earth distance rises and falls; each flyby's measured effect on speed is shown; every value is labelled Official, Calculated, Hypothetical or Educational; and all accuracy claims are backed by published validation tables. No new URLs were created — value was added to existing pages.

## 2. Unique value

- **Original calculations:** live position model; historical reconstruction of distance from Earth for any date; separation and angle between the probes; milestone dates; two-date differences; average rates.
- **Original visualizations:** 1977–2035 distance/speed chart; ecliptic map; Earth-orbit geometry diagram with a year-long sparkline; log-scale ruler; message-in-flight progress bar.
- **Original comparisons:** Voyager 1 vs 2 live table; route explorer with JPL speed change at each flyby; human-scale references.
- **Original tools:** Date Explorer, Compare two dates, Scale explorer, Communication delay, Light time, Converter, Travel time.
- **Original educational explanations:** before/after framing for each world; why the twins differ (six questions); why the Earth distance shrinks for part of each year.

## 3. Content quality

| Measure | Result |
| --- | --- |
| Thin pages | None with placeholder text; shortest is Contact (275 words), expected for its purpose |
| Duplicate pages | None; no near-identical pages or doorway pages |
| Duplicate content | Only navigation descriptions and disclaimers repeat; the home/FAQ duplicate was removed |
| Source-derived content | Rewritten in the site's own words with a link at the point of use |
| Calculated content | Produced by the engine and labelled |

## 4. User value

Track (live estimates) → Compare (twins, routes, dates) → Calculate (seven tools) → Explore (timeline, date explorer, scale) → Learn (science, Golden Record, why it matters) → Understand (how it works, validation, labels).

## 5. Returning-user value

Values recalculate continuously; milestone countdowns; "since your last visit" (a timestamp stored only in the browser); Compare two dates for chosen dates; dated Updates with reasons; methodology changelog.

## 6. Data transparency

| Label | Used for |
| --- | --- |
| Official source | Launch/encounter dates, instrument status, events (NASA/JPL, linked) |
| Calculated | Current and historical distances, speeds, light times, milestone dates |
| Hypothetical | Travel time at everyday speeds |
| Educational | Not-to-scale diagrams, reference distances on the ruler |

Sources table lists the reference behind each part of the site with a real "last checked" date (every link requested on 2026-09-25).

## 7. Technical quality

| Area | Result |
| --- | --- |
| Mobile | 19 pages × 7 widths (320, 375, 390, 414, 768, 1024, 1440) without horizontal overflow; Spanish checked at 320 px |
| Accessibility | One H1 per page, no heading skips, no duplicate IDs, all controls labelled, SVGs labelled, chart table fallback |
| Performance | 3D model lazy-loaded; ephemeris chunk 89 KB (34 KB gzip) including 1977–2034 vectors |
| Console | No errors on any page in the preview |
| Links | 29 external + all internal links OK |
| SEO / structured data | Unique metadata per page; JSON-LD matches visible content; FAQPage 20 = 20 visible questions |

## 8. AdSense risk audit

| Risk | Status | Evidence | Action |
| --- | --- | --- | --- |
| Thin content | Low | 460–2,068 words on content pages, no placeholders | — |
| Duplicate content | Low | `content-audit.mjs` | Home/FAQ duplicate removed |
| Auto-generated content | Low | Text written for the site; only numbers are computed, and labelled | — |
| Poor navigation | Low | Header, footer, breadcrumbs, related links, in-context links | Added "explore these numbers" links |
| Missing source transparency | Low | Sources map + last checked; links at point of use | Added column |
| Stale dynamic content | Low | Live values client-side; build-date figures labelled with their date | — |
| Fake claims | Low | Accuracy claims backed by generated tables | Removed an unverifiable Golden Record detail |
| SEO stuffing | Low | Natural titles/descriptions | — |

## 9. Remaining issues

| Item | Status | Note |
| --- | --- | --- |
| AdSense code / consent banner | Not done (by design) | Add after content review; the old commit `aaae1a6` contains the owner's publisher ID |
| `ads.txt` | Blocked | GitHub Pages project sites cannot serve files at the domain root; needs a user site (`wahaha232.github.io` repo) or a custom domain |
| Open Graph share image | Not done | No image asset exists; would need a 1200×630 PNG |
| Instrument status and events | Manual | Must be updated by hand when NASA publishes news |
| Model validity | Partially limited | Live model validated 2024–2031; refresh data with `npm run data` + `npm run validate` before then |
| Historical accuracy near 1977–1989 flybys | Disclosed | Up to a few million km because of monthly sampling |
