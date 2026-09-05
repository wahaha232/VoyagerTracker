/**
 * TimelinePage — /timeline.html
 */

import { pageUrl } from '../constants/site';
import { ArticleHeader, Callout, RelatedLinks, Section } from '../components/ui';

interface Event {
  date: string;
  craft: 'Both' | 'Voyager 1' | 'Voyager 2' | 'Program';
  text: string;
}

const EVENTS: Event[] = [
  { date: '1977 · Aug 20', craft: 'Voyager 2', text: 'Launch from Cape Canaveral, Florida.' },
  { date: '1977 · Sep 5', craft: 'Voyager 1', text: 'Launch — although launched later, Voyager 1 travels on a faster trajectory.' },
  { date: '1979 · Mar 5', craft: 'Voyager 1', text: 'Jupiter closest approach; active volcanoes discovered on Io.' },
  { date: '1979 · Jul 9', craft: 'Voyager 2', text: 'Jupiter closest approach.' },
  { date: '1980 · Nov 12', craft: 'Voyager 1', text: 'Saturn and Titan flyby; trajectory bends north out of the ecliptic.' },
  { date: '1981 · Aug', craft: 'Voyager 2', text: 'Saturn flyby; mission continues toward Uranus.' },
  { date: '1986 · Jan 24', craft: 'Voyager 2', text: 'Uranus flyby — the only close encounter with Uranus to date.' },
  { date: '1989 · Aug 25', craft: 'Voyager 2', text: 'Neptune flyby — completes the Grand Tour.' },
  { date: '1990 · Feb 14', craft: 'Voyager 1', text: 'Pale Blue Dot photograph of Earth from about 6 billion km.' },
  { date: '1990', craft: 'Both', text: 'Both spacecraft begin the Voyager Interstellar Mission phase.' },
  { date: '2012 · Aug 25', craft: 'Voyager 1', text: 'Crosses the heliopause and enters interstellar space (~121 AU).' },
  { date: '2018 · Nov 5', craft: 'Voyager 2', text: 'Crosses the heliopause and enters interstellar space (~119 AU).' },
  { date: '2023–2026', craft: 'Program', text: 'Deep-space operations continue; NASA manages the remaining power and instruments of both probes.' },
];

export default function TimelinePage() {
  const craftColor = (craft: Event['craft']) =>
    craft === 'Voyager 1' ? '#22d3ee' : craft === 'Voyager 2' ? '#34d399' : '#fbbf24';

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <ArticleHeader
        current="timeline"
        title="Voyager Mission Timeline"
        intro="The key moments of the Voyager mission, in chronological order. This timeline is based on NASA/JPL mission records — nothing here is invented or speculative."
      />

      {/* Timeline list */}
      <Section id="timeline" kicker="1977 → today" title="Key mission events">
        <ol className="relative space-y-5 border-l border-slate-700/70 pl-6">
          {EVENTS.map((event) => (
            <li key={`${event.date}-${event.text}`} className="relative">
              <span
                className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-space-950"
                style={{ backgroundColor: craftColor(event.craft) }}
                aria-hidden="true"
              />
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                {event.date}
              </p>
              <p className="mt-0.5 font-semibold" style={{ color: craftColor(event.craft) }}>
                {event.craft}
              </p>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-300">{event.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="accuracy" kicker="Accuracy" title="A note on these dates">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          Closest-approach dates are given in UTC and follow NASA/JPL mission records. For the
          most recent operational status, refer to the official{' '}
          <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
            NASA mission pages
          </a>
          , which are updated by the mission team.
        </p>
      </Section>

      <Callout tone="emerald" title="Interested in the science?">
        The discoveries made at each of these encounters are summarised on the{' '}
        <a href={pageUrl('discoveries')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">
          Scientific Discoveries page
        </a>
        .
      </Callout>

      <RelatedLinks items={['mission', 'voyager-1', 'voyager-2', 'discoveries', 'updates']} />
    </div>
  );
}

