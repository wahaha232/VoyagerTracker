/**
 * Voyager1Page — /voyager-1.html
 */

import { SPACECRAFT_META } from '../constants/voyagerData';
import { pageUrl } from '../constants/site';
import TrackerSection from '../components/TrackerSection';
import { ArticleHeader, Callout, RelatedLinks, Section } from '../components/ui';

const meta = SPACECRAFT_META['voyager1'];

const KEY_FACTS: [string, string][] = [
  ['Launch', '5 September 1977, from Cape Canaveral, Florida, USA (Titan IIIE-Centaur).'],
  ['Mission start', 'Initially a four-year mission to explore Jupiter and Saturn.'],
  ['Jupiter flyby', '5 March 1979 — discovered the first active volcanoes beyond Earth, on Io.'],
  ['Saturn flyby', '12 November 1980 — flew past Saturn and its moon Titan.'],
  ['Interstellar space', 'Crossed the heliopause on 25 August 2012, at about 121 AU from the Sun.'],
  ['Today', 'Still active, returning data from interstellar space through NASA\u2019s Deep Space Network.'],
];

export default function Voyager1Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <ArticleHeader
        current="voyager-1"
        title="Voyager 1 — Mission, Distance and Current Status"
        intro="Voyager 1 is NASA\u2019s most distant spacecraft and the first human-made object to reach interstellar space. Launched in 1977, it explored Jupiter and Saturn before heading out of the solar system — and it is still talking to Earth today."
      />

      <TrackerSection
        ids={['voyager1']}
        title="Voyager 1 Live Tracker"
        intro="Estimated distance from Earth and the Sun, cruising speed and mission status for Voyager 1. Values are calculated from a NASA/JPL-referenced baseline, not live official telemetry."
        showMap
        showModel
      />

      {/* What is Voyager 1 */}
      <Section id="what-is-voyager-1" kicker="Profile" title="What is Voyager 1?">
        <div className="space-y-4">
          <p className="max-w-4xl leading-relaxed text-slate-300">
            Voyager 1 is one of two nearly identical robotic probes built by NASA&rsquo;s Jet
            Propulsion Laboratory for the Voyager program. It was designed to take advantage of a
            rare planetary alignment to explore the outer solar system — and it did far more than
            that.
          </p>
          <p className="max-w-4xl leading-relaxed text-slate-300">
            After completing its planned encounters with Jupiter and Saturn, Voyager 1 was
            redirected north, out of the plane in which the planets orbit. It kept operating, kept
            taking measurements, and in 2012 became the first spacecraft to cross the heliopause —
            the boundary where the Sun&rsquo;s influence gives way to the space between the stars.
          </p>
        </div>
      </Section>

      {/* Key facts */}
      <Section id="facts" kicker="Facts" title="Voyager 1 at a glance">
        <dl className="grid gap-3 md:grid-cols-2">
          {KEY_FACTS.map(([term, detail]) => (
            <div key={term} className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
              <dt className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                {term}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-slate-300">{detail}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Journey */}
      <Section id="journey" kicker="Journey" title="Voyager 1\u2019s path through the solar system">
        <div className="space-y-5">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Jupiter — 5 March 1979</h3>
            <p className="leading-relaxed text-slate-300">
              Voyager 1 returned thousands of images of Jupiter, its Great Red Spot and its moons.
              The most famous discovery came from its images of Io: erupting volcanoes, powered by
              tidal heating — the first active volcanoes seen anywhere beyond Earth.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Saturn and Titan — 12 November 1980</h3>
            <p className="leading-relaxed text-slate-300">
              At Saturn, Voyager 1 revealed the rings to be made of thousands of individual
              ringlets and studied the smoggy atmosphere of Titan. That Titan flyby bent the
              spacecraft&rsquo;s trajectory steeply northward — the reason Voyager 1 never visited
              Uranus or Neptune, and the reason it left the solar system faster than its twin.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">The Pale Blue Dot — 14 February 1990</h3>
            <p className="leading-relaxed text-slate-300">
              From about 6 billion kilometres away, Voyager 1 turned back and photographed Earth —
              a pale blue dot smaller than a pixel. The image became one of the most powerful
              symbols of our place in the cosmos.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Interstellar space — 25 August 2012</h3>
            <p className="leading-relaxed text-slate-300">
              At a distance of about 121 AU from the Sun, Voyager 1 crossed the heliopause. Its
              instruments measured a sudden rise in the density of interstellar plasma and a drop in
              the particles coming from the Sun — the first direct evidence that a spacecraft had
              left the heliosphere.
            </p>
          </div>
        </div>
      </Section>

      {/* Instruments */}
      <Section id="instruments" kicker="Hardware" title="Science instruments">
        <p className="mb-4 max-w-4xl leading-relaxed text-slate-300">
          Voyager 1 originally carried eleven science instruments. Several have been switched off
          to save power; the mission today focuses on the instruments that study particles, fields
          and plasma in interstellar space:
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {meta.instruments.map((inst) => (
            <li key={inst.code} className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
              <p className="font-mono text-xs font-bold text-cyan-300">{inst.code}</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-200">{inst.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{inst.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Golden Record */}
      <Section id="golden-record" kicker="Message in a bottle" title="The Golden Record aboard Voyager 1">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          Both Voyagers carry a copy of the Golden Record — a gold-plated copper phonograph record
          with images, music, natural sounds and greetings in 55 languages. If another civilization
          ever finds Voyager 1, the record is designed to tell them who made the spacecraft and
          where Earth is.{' '}
          <a href={pageUrl('golden-record')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
            Read about the Golden Record →
          </a>
        </p>
      </Section>

      {/* Significance */}
      <Section id="significance" kicker="Why it matters" title="Voyager 1\u2019s historical significance">
        <p className="mb-4 max-w-4xl leading-relaxed text-slate-300">
          Voyager 1 is the benchmark for deep-space exploration. It was the first spacecraft to
          visit Jupiter and Saturn in detail, the first to photograph an erupting volcano beyond
          Earth, the first to leave the heliosphere, and — at the time of writing — the most
          distant and fastest-moving object ever built by human hands.
        </p>
        <Callout tone="amber" title="Distance check">
          Curious how far Voyager 1 is right now? The live tracker at the top of this page shows its
          current estimated distance from Earth and the Sun. Because Voyager 1 moves about 3.6 AU
          per year, the number grows by roughly 1.6 million kilometres every day.
        </Callout>
      </Section>

      <RelatedLinks items={['home', 'voyager-2', 'timeline', 'discoveries', 'how-it-works']} />
    </div>
  );
}


