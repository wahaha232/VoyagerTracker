/**
 * HowItWorksPage — /how-it-works.html
 */

import { pageUrl } from '../constants/site';
import { ArticleHeader, Callout, RelatedLinks, Section } from '../components/ui';

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <ArticleHeader
        current="how-it-works"
        title="How Voyager Tracker Works"
        intro="This page explains, as transparently as possible, where our figures come from, how they are calculated, and why the numbers on this site may differ slightly from other trackers."
      />

      <Callout tone="amber" title="The short version">
        Spacecraft tracking data shown on this site is based on available mission and ephemeris
        data and may include calculated or estimated values. We never present these figures as
        live NASA telemetry.
      </Callout>

      <Section id="sources" kicker="1 · Sources" title="Where the data comes from">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          Historical mission facts (launch dates, encounter dates, interstellar crossings) come
          from NASA/JPL public records. The baseline distances and cruising speeds are anchored to
          published NASA Voyager data — the same numbers used by NASA&rsquo;s own &ldquo;where are
          the Voyagers&rdquo; pages — rather than to a private database.
        </p>
        <p className="mt-3 max-w-4xl leading-relaxed text-slate-300">
          We re-express that information in our own words and clearly label everything. The full
          list of references is on the{' '}
          <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
            Sources page
          </a>
          .
        </p>
      </Section>

      <Section id="distance" kicker="2 · Calculation" title="How distances are estimated">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          The Voyagers are so far away that no website receives a continuous, second-by-second
          &ldquo;GPS&rdquo; feed from them. Instead, we use a simple physical model:
        </p>
        <ol className="mt-3 max-w-4xl list-decimal space-y-2 pl-5 text-slate-300">
          <li>Start from a baseline distance and position taken from NASA/JPL mission data at a known date.</li>
          <li>Advance that position using each spacecraft&rsquo;s known cruising velocity and the time elapsed since the baseline.</li>
          <li>Convert the result into kilometres, astronomical units (AU) and one-way light-travel time.</li>
        </ol>
        <p className="mt-3 max-w-4xl leading-relaxed text-slate-300">
          In practice, Voyager 1 moves away from the Sun at about 17 km/s (≈3.6 AU per year) and
          Voyager 2 at about 15 km/s (≈3.2 AU per year), so this simple projection stays accurate
          for long periods. The figures are recalculated whenever new official baselines are
          published.
        </p>
      </Section>

      <Section id="speed" kicker="3 · Velocity" title="How speeds are shown">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          The velocity shown is the spacecraft&rsquo;s speed relative to the Sun (heliocentric
          speed). It is essentially constant now because the probes are coasting — no engines are
          firing — although solar gravity slows them very gradually. We show it rounded to one
          decimal place.
        </p>
      </Section>

      <Section id="updates" kicker="4 · Frequency" title="How often the numbers update">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          Within a page, the distance counters are recomputed in your browser about ten times per
          second so the odometer ticks smoothly. That is an interpolation tick, not a new download
          from NASA. The underlying baseline is only updated when there is genuinely new official
          data — recorded on the{' '}
          <a href={pageUrl('updates')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
            Updates page
          </a>
          .
        </p>
      </Section>

      <Section id="differences" kicker="5 · Why numbers differ" title="Why our numbers may differ from other sites">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          You may see slightly different distances elsewhere. Possible reasons:
        </p>
        <ul className="mt-3 max-w-4xl list-disc space-y-2 pl-5 text-slate-300">
          <li>Different baseline dates (NASA updates its published values periodically).</li>
          <li>Different definitions: distance from Earth vs. distance from the Sun (Earth is ~1 AU from the Sun, so the two differ by up to ~2 AU across a year).</li>
          <li>Different velocity assumptions or whether light-travel time is included.</li>
          <li>Rounding and display conventions.</li>
        </ul>
        <p className="mt-3 max-w-4xl leading-relaxed text-slate-300">
          Differences of a few tenths of an AU are normal and are not an error on any particular
          site.
        </p>
      </Section>

      <Section id="official-vs-estimate" kicker="6 · Labels" title="Official vs. estimated vs. historical">
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-space-900/70 font-mono text-xs uppercase tracking-wider text-slate-400">
                <th className="px-4 py-3">Label</th>
                <th className="px-4 py-3">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="px-4 py-3 font-mono text-emerald-300">Historical</td>
                <td className="px-4 py-3">Fixed mission facts from NASA records (launch, encounters, etc.).</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-cyan-300">Estimated / calculated</td>
                <td className="px-4 py-3">Derived from an official baseline by projecting with the spacecraft&rsquo;s velocity.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-amber-300">Live</td>
                <td className="px-4 py-3">In this interface &ldquo;live&rdquo; means &ldquo;recalculated in your browser right now&rdquo; — it never implies official real-time telemetry.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="latency" kicker="7 · Reality check" title="Latency and data availability">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          Real communication with the Voyagers has a built-in delay: a signal takes roughly a day
          to travel one-way from Voyager 1 to Earth. If the mission team publishes a new distance
          today, it reflects the spacecraft&rsquo;s state about a day earlier — and a tracker that
          re-projects the numbers is, in that sense, no less accurate than a tracker showing a
          freshly received value.
        </p>
        <p className="mt-3 max-w-4xl leading-relaxed text-slate-300">
          If specific data is unavailable, unknown or cannot be verified, we mark it as
          &ldquo;Data unavailable&rdquo; rather than guessing.
        </p>
      </Section>

      <RelatedLinks items={['faq', 'sources', 'about', 'updates', 'voyager-1']} />
    </div>
  );
}

