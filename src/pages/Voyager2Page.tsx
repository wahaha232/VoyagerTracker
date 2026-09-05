/**
 * Voyager2Page — /voyager-2.html
 */

import { SPACECRAFT_META } from '../constants/voyagerData';
import { pageUrl } from '../constants/site';
import TrackerSection from '../components/TrackerSection';
import { ArticleHeader, Callout, RelatedLinks, Section } from '../components/ui';

const meta = SPACECRAFT_META['voyager2'];

const KEY_FACTS: [string, string][] = [
  ['Launch', '20 August 1977, from Cape Canaveral, Florida, USA (Titan IIIE-Centaur).'],
  ['Grand Tour', 'The only spacecraft to visit all four giant planets: Jupiter, Saturn, Uranus and Neptune.'],
  ['Jupiter flyby', '9 July 1979.'],
  ['Saturn flyby', 'August 1981 — revealed new detail in the rings and studied Titan\u2019s atmosphere.'],
  ['Uranus flyby', '24 January 1986 — still the only close look humanity has had of Uranus.'],
  ['Neptune flyby', '25 August 1989 — discovered the Great Dark Spot and Triton\u2019s geysers.'],
  ['Interstellar space', 'Crossed the heliopause on 5 November 2018.'],
];

export default function Voyager2Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <ArticleHeader
        current="voyager-2"
        title="Voyager 2 — Mission, Distance and Current Status"
        intro="Voyager 2 is the only spacecraft ever to visit Uranus and Neptune. Launched in 1977, it completed the \u201cGrand Tour\u201d of the outer planets and then sailed on — becoming the second spacecraft to reach interstellar space in 2018."
      />

      <TrackerSection
        ids={['voyager2']}
        title="Voyager 2 Live Tracker"
        intro="Estimated distance from Earth and the Sun, cruising speed and mission status for Voyager 2. Values are calculated from a NASA/JPL-referenced baseline, not live official telemetry."
        showMap
        showModel
      />

      {/* What is Voyager 2 */}
      <Section id="what-is-voyager-2" kicker="Profile" title="What is Voyager 2?">
        <div className="space-y-4">
          <p className="max-w-4xl leading-relaxed text-slate-300">
            Voyager 2 is the twin of Voyager 1. Although it launched sixteen days earlier, it took a
            slower, more scenic route through the solar system — one that let it visit four giant
            planets instead of two.
          </p>
          <p className="max-w-4xl leading-relaxed text-slate-300">
            Its encounters with Jupiter, Saturn, Uranus and Neptune remain the only close-up
            exploration humanity has made of the two outermost planets. After Neptune, Voyager 2
            curved southward out of the solar system and, on 5 November 2018, crossed into
            interstellar space.
          </p>
        </div>
      </Section>

      {/* Key facts */}
      <Section id="facts" kicker="Facts" title="Voyager 2 at a glance">
        <dl className="grid gap-3 md:grid-cols-2">
          {KEY_FACTS.map(([term, detail]) => (
            <div key={term} className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
              <dt className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">
                {term}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-slate-300">{detail}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Grand tour */}
      <Section id="grand-tour" kicker="The Grand Tour" title="Four planets, one spacecraft">
        <div className="space-y-5">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Jupiter — 9 July 1979</h3>
            <p className="leading-relaxed text-slate-300">
              Voyager 2 reached Jupiter about four months after Voyager 1. It photographed the
              planet&rsquo;s turbulent atmosphere and its moons, adding new detail to the picture its
              twin had already painted.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Saturn — August 1981</h3>
            <p className="leading-relaxed text-slate-300">
              Voyager 2&rsquo;s Saturn flyby confirmed the astonishing complexity of the rings and
              returned the best close-up data of the mission on Titan&rsquo;s thick, hazy
              atmosphere. The spacecraft was then aimed at Uranus using a gravity assist.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Uranus — 24 January 1986</h3>
            <p className="leading-relaxed text-slate-300">
              Voyager 2 made the only close flyby of Uranus in history. It found a magnetic field
              tilted far from the planet&rsquo;s spin axis, discovered ten new moons, imaged a
              surprisingly bland blue-green atmosphere, and revealed that the moon Miranda has some
              of the strangest terrain in the solar system.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Neptune — 25 August 1989</h3>
            <p className="leading-relaxed text-slate-300">
              The final planetary stop. Voyager 2 found the Great Dark Spot, measured supersonic
              winds of more than 2,000 km/h, discovered that Neptune has rings, and photographed
              geyser-like plumes on its giant moon Triton.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Interstellar space — 5 November 2018</h3>
            <p className="leading-relaxed text-slate-300">
              Voyager 2 crossed the heliopause at about 119 AU from the Sun. Unlike Voyager 1,
              Voyager 2 was still carrying a working plasma instrument, so it provided the first
              direct measurement of the density and temperature of interstellar plasma.
            </p>
          </div>
        </div>
      </Section>

      {/* Instruments */}
      <Section id="instruments" kicker="Hardware" title="Science instruments">
        <p className="mb-4 max-w-4xl leading-relaxed text-slate-300">
          Voyager 2 carried the same suite of eleven instruments as its twin. Its plasma
          instrument, which failed early on Voyager 1, kept working long enough to measure the
          boundary of the heliosphere directly:
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {meta.instruments.map((inst) => (
            <li key={inst.code} className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
              <p className="font-mono text-xs font-bold text-emerald-300">{inst.code}</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-200">{inst.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{inst.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Golden record */}
      <Section id="golden-record" kicker="Message in a bottle" title="The Golden Record aboard Voyager 2">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          Voyager 2 carries the same Golden Record as Voyager 1 — images, music, sounds and
          greetings chosen to represent Earth to any civilization that finds the spacecraft. Because
          Voyager 2 is heading in a different direction from its twin, the two records are travelling
          toward different stars.{' '}
          <a href={pageUrl('golden-record')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">
            Read about the Golden Record →
          </a>
        </p>
      </Section>

      {/* Significance */}
      <Section id="significance" kicker="Why it matters" title="Voyager 2\u2019s historical significance">
        <p className="mb-4 max-w-4xl leading-relaxed text-slate-300">
          Voyager 2 is the only spacecraft to have visited Uranus and Neptune, which means a large
          share of everything we know about those two planets comes from a single flyby in the
          1980s. Its second act — measuring interstellar space from a southern trajectory — gives
          scientists a second data point on the heliosphere that Voyager 1 alone could not provide.
        </p>
        <Callout tone="amber" title="Distance check">
          The live tracker at the top of this page shows Voyager 2&rsquo;s current estimated
          distance from Earth and the Sun. Voyager 2 travels about 3.2 AU per year — slightly
          slower than its twin, so Voyager 1 is steadily pulling farther ahead.
        </Callout>
      </Section>

      <RelatedLinks items={['home', 'voyager-1', 'mission', 'timeline', 'discoveries']} />
    </div>
  );
}


