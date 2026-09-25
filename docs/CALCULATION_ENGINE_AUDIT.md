# Calculation Engine Audit — Voyager Tracker

All formulas live in `src/lib/ephemeris.ts` (positions) and `src/lib/context.ts` (units, comparisons). The calculators' input parsing lives in `src/components/tools/toolUi.tsx`. There is one implementation of each conversion; pages import it rather than re-implementing it. Verified by `npm test` (50 checks) and `npm run validate` (comparison with JPL Horizons).

## Constants

| Constant | Value | Source |
| --- | --- | --- |
| AU | 149,597,870.7 km | IAU 2012 Resolution B2 |
| Speed of light | 299,792.458 km/s | SI definition |
| Mile | 1.609344 km | international mile |
| Light-day / light-year | c × 86,400 s / c × 86,400 × 365.25 s | Julian year |
| GM (Sun + planets) | 1.32712440018e11 × 1.00134 km³/s² | solar GM plus planetary masses |
| TDB − UTC | 69.184 s | 32.184 s + 37 leap seconds |

## Functions

| Function | Formula / method | Input | Reference data | Output | Assumptions & limitations |
| --- | --- | --- | --- | --- | --- |
| `spacecraftState` | r = r₀ + v₀Δt + ½a₀Δt² + ⅙j₀Δt³; a₀ = −μr₀/\|r₀\|³; j₀ = da/dt | UTC ms | Barycentric state vector at 2026-09-01 TDB (JPL Horizons) | position km, velocity km/s | Point-mass gravity only; no thruster events; validated 2024–2031 |
| `sunBarycentric` | Linear interpolation, monthly table | UTC ms | Sun vs barycentre 2020–2040 (Horizons) | km vector | Clamped to nearest row outside 2020–2040 |
| `earthHeliocentric` | Astronomical Almanac low-precision solar formula, minus precession to J2000 | UTC ms | none | km vector | ~0.01° (~26,000 km); dominates the remaining model error |
| `estimate` | d = \|r − r_⊕\|; range rate = rel·(v − v_⊕)/d; t_light = d/c | UTC ms | the above | km, km/s, s | Geometric distance, no light-time correction |
| `historicalEstimate` | Linear interpolation of monthly heliocentric vectors; Earth as above | UTC ms | Monthly JPL vectors, launch–2034 | km, km/s, s | Poor near planetary flybys (monthly sampling) |
| `estimateAt` | Model inside 2024-01-01–2032-01-01, else history | UTC ms | both | + `method` flag | Null before launch / after 2034 |
| `whenDistanceReaches` | Weekly scan then 40-step bisection on `estimate` | id, metric, target, start | model | UTC ms | Null if already reached or beyond ~30 years |
| `convert`, `UNITS` | value × UNITS[from] / UNITS[to] | number, units | constants | number | Pure conversion |
| `travelYears` | km / (km/h) / 8,766 h | km, km/h | — | years | Hypothetical: straight line, constant speed |
| `elapsedYearsDays` | Calendar anniversaries in UTC | two UTC ms | — | years, days, total days | UTC calendar |
| `parseNonNegative`, `parseDate` | Reject empty, non-numeric, negative, impossible dates | strings | — | number or null | Dates parsed as 12:00 UTC |

## Validation results (from `src/data/validation-summary.generated.ts`)

- Live model vs JPL geocentric range, 5-day samples 2024–2031: max error per year 9,772–36,176 km.
- Historical reconstruction vs JPL, 10-day samples: after 1990 median 5,000–8,500 km, max ≤ 32,486 km; 1977–1989 median 15,306 km (V1) / 21,659 km (V2), max 3.11 / 4.25 million km near flybys.
- Model date for Voyager 1 at one light-day from Earth: 2026-11-18 10:26 UTC; NASA: 18 Nov 2026.

## Date and time handling

All calculations use UTC milliseconds. Date inputs are interpreted as 12:00 UTC. The communication tool shows both UTC and the visitor's local time; the tracker shows "Calculated at hh:mm:ss UTC".

## Tests (`npm test`)

Constants and conversions; light time of 1 AU (499.0 s); date arithmetic; invalid/empty/negative/huge/decimal inputs; impossible dates; the NASA one-light-day date; speeds; Earth−Sun difference bounded by ±1 AU every month; method selection; null before launch/after 2034; model–history agreement at the 2024 boundary; known distances at the Pale Blue Dot (40.3 AU) and both heliopause crossings (121.6 / 119.0 AU); monotonic Sun distance since 1990. Result: 50 passed, 0 failed.
