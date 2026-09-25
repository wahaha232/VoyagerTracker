# AdSense Value Audit — Voyager Tracker V2

Question asked of every page: *why would a visitor use this page instead of going straight to NASA?*
Word counts are English text inside `<main>` of the prerendered HTML after V2 (`scripts/content-audit.mjs`).

| Page | Main user question | Existing value (start of V2) | Original value | Thin-content risk | V2 improvement |
| --- | --- | --- | --- | --- | --- |
| Home (1,228 words) | Where are the Voyagers now, and what is this site? | High: live estimates, context | High: own calculation, validated | Low | "Why Voyager Tracker?" + what the site adds; interactive Earth-distance diagram; removed duplicated FAQ answers |
| Voyager 1 (1,370) | What has Voyager 1 done and what state is it in? | Medium-high | Medium: 2023–26 events, instrument status, Pale Blue Dot | Low | Source labels on tracker; signal-arrival time; links to explanations |
| Voyager 2 (1,039) | Same for Voyager 2 | Medium-high | Medium | Low–medium (shares instrument footnotes with V1) | Same as V1; page-specific Q&A kept distinct |
| Compare (926 + live table) | Why are the twins so different today? | High | High: derived separation/angle, 50-year chart | Low | Route explorer with JPL speed changes per flyby; two more "why" answers |
| Timeline (2,068) | How did Voyager get here? | High: sourced events | Medium: context + distance on each date | Low | Events moved to shared data used by Date Explorer and Updates |
| Science (1,215) | What did Voyager actually discover? | Medium | Medium | Medium → low | "Before Voyager" / "After Voyager" framing per world |
| Tools (1,149 + interactive) | What can I calculate or explore? | High | High | Low | 3 new tools (Date Explorer rebuilt, Compare dates, Scale, Communication delay); input validation |
| How It Works (1,539) | How are the numbers calculated and how good are they? | High | High: validation results | Low | Spot-check table, historical accuracy table, changelog, Educational label |
| Sources (678) | Where does each number come from? | High | Medium | Low | "Last checked" column with real date |
| FAQ (1,465) | Common questions | Medium | Medium: build-date figures | Low | +4 questions (communication, tools); anchors for linking |
| Golden Record (968) | What is on the record and why? | Medium | Medium | Medium → low | Category explorer (NASA-verified counts) |
| Why It Matters (1,159) | Why does a 1977 mission still matter? | Medium-high | Medium: original synthesis | Low | Unchanged (kept) |
| Mission (633) | How did the programme begin? | Medium | Low–medium | Medium | Kept short; cross-links to Timeline/Compare instead of duplicating them |
| Updates (876) | What changed recently? | Medium | Medium | Low | Reason / affected-feature fields; V2 entry |
| About (543) | Who runs this and why? | Medium | Medium | Low | Unchanged |
| Contact (275), Privacy (645), Terms (460) | Legal / support | Adequate | n/a | Expected to be short | Unchanged |

## Duplicate content (after V2)

32 repeated sentences remain; all are navigation card descriptions, the independence disclaimer and the instrument/source footnotes shared by the two spacecraft pages. The only content duplicate found (home repeating FAQ answers) was removed.

## Anti-thin-content checks

No placeholder, "coming soon", "under construction", TODO or lorem ipsum text in any page (`content-audit.mjs`). No doorway or keyword pages were added; no new URLs were created in V2 — value was added to existing pages.

## Honesty checks

- No "live NASA telemetry" claims; tracker values labelled *Calculated*, dates and instrument status *Official source*, travel times *Hypothetical*, diagrams *Educational*.
- Accuracy claims are backed by `scripts/validate-model.ts` output published on How It Works (2024–2031 max 36,176 km; historical reconstruction ≤ ~35,000 km after 1990, up to 4.25 million km near 1977–1989 flybys, disclosed).
- The one-light-day date (18 Nov 2026) is attributed to NASA's page and shown next to the model's own result.
- Uncertain detail removed: Golden Record page no longer states which of the Carter/Waldheim messages were spoken or printed.
