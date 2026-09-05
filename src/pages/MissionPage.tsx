/**
 * MissionPage — /mission.html
 */

import { pageUrl } from '../constants/site';
import { LinkArrow } from '../components/icons';
import { ArticleHeader, Callout, RelatedLinks, Section } from '../components/ui';

const PHASES: [string, string, string][] = [
  ['Jupiter', '1979', 'Both spacecraft revealed Jupiter\u2019s turbulent atmosphere in detail and discovered active volcanoes on its moon Io.'],
  ['Saturn', '1980–1981', 'Voyager 1 and Voyager 2 revealed a ring system of extraordinary complexity and studied Titan\u2019s atmosphere.'],
  ['Uranus', '1986', 'Voyager 2 made the only close flyby of Uranus, finding a lopsided magnetic field and ten new moons.'],
  ['Neptune', '1989', 'Voyager 2 discovered the Great Dark Spot, supersonic winds and geysers on Triton.'],
];

export default function MissionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <ArticleHeader
        current="mission"
        parent="home"
        title="The Voyager Mission"
        intro="A two-spacecraft NASA mission that began as a four-year trip to Jupiter and Saturn and became a fifty-year journey through the outer solar system and into interstellar space."
      />

      {/* Origins */}
      <Section id="origins" kicker="Origins" title="How the mission began">
        <div className="space-y-4">
          <p className="max-w-4xl leading-relaxed text-slate-300">
            In the 1960s, planetary scientists noticed that the outer planets were about to line up
            in a way that would allow a single spacecraft to visit several of them using gravity
            assists. This rare alignment — roughly once every 176 years — made the &ldquo;Grand
            Tour&rdquo; possible.
          </p>
          <p className="max-w-4xl leading-relaxed text-slate-300">
            The Voyager program was approved to explore Jupiter and Saturn with two spacecraft,
            with the option to continue to Uranus and Neptune if all went well. NASA&rsquo;s Jet
            Propulsion Laboratory built the twin probes to survive the harsh environment of the
            outer solar system and, if fortune allowed, to keep going far beyond it.
          </p>
        </div>
      </Section>

      {/* 1977 launches */}
      <Section id="launch" kicker="Launch" title="The 1977 launches">
        <p className="mb-4 max-w-4xl leading-relaxed text-slate-300">
          Voyager 2 lifted off first, on 20 August 1977, on a slower trajectory that would keep
          the planetary alignment open. Voyager 1 followed on 5 September 1977 on a faster path
          that would let it reach Jupiter and Saturn earlier. Both launched from Cape Canaveral,
          Florida, aboard Titan IIIE-Centaur rockets.
        </p>
        <p className="max-w-4xl leading-relaxed text-slate-300">
          Each spacecraft carries eleven science instruments, a 3.7-metre antenna, three
          radioisotope thermoelectric generators for power, and a Golden Record greeting from
          Earth.
        </p>
      </Section>

      {/* Grand tour */}
      <Section id="grand-tour" kicker="Grand Tour" title="Four planets, one alignment">
        <div className="grid gap-4 sm:grid-cols-2">
          {PHASES.map(([planet, when, text]) => (
            <div key={planet} className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                {planet} · {when}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-4xl leading-relaxed text-slate-300">
          Voyager 1 could not continue to Uranus and Neptune: its close flyby of Saturn&rsquo;s
          moon Titan bent its path steeply north, out of the plane of the planets. That choice was
          deliberate — the Titan data was considered worth sacrificing the Grand Tour. Voyager 2,
          following a different trajectory, went on to become the only spacecraft to visit Uranus
          and Neptune.
        </p>
      </Section>

      {/* Heliosphere & interstellar */}
      <Section id="interstellar" kicker="Beyond the planets" title="From the heliosphere to interstellar space">
        <div className="space-y-4">
          <p className="max-w-4xl leading-relaxed text-slate-300">
            Around the Sun, the solar wind carves out a bubble called the heliosphere. Its outer
            boundary is the heliopause — the place where the pressure of the solar wind meets the
            plasma of the galaxy. For decades, no spacecraft had been there to measure it.
          </p>
          <p className="max-w-4xl leading-relaxed text-slate-300">
            Voyager 1 crossed the heliopause on 25 August 2012 at about 121 AU from the Sun;
            Voyager 2 followed on 5 November 2018 at about 119 AU. The two spacecraft are now
            sampling interstellar space from two different directions, giving scientists their first
            direct look at the medium between the stars.
          </p>
        </div>
      </Section>

      {/* Extension & goals */}
      <Section id="extension" kicker="The extended mission" title="Mission extension and long-term goals">
        <div className="space-y-4">
          <p className="max-w-4xl leading-relaxed text-slate-300">
            The Voyagers&rsquo; primary planetary mission ended in 1989, but the spacecraft kept
            working, and NASA has extended the mission several times. The Voyager Interstellar
            Mission (VIM) is now the operational phase: both probes study cosmic rays, magnetic
            fields and plasma in interstellar space while engineers carefully ration the shrinking
            power from the radioisotope generators.
          </p>
          <p className="max-w-4xl leading-relaxed text-slate-300">
            Long-term objectives include mapping the shape and nature of the heliosphere, measuring
            the properties of the interstellar medium, and — in the far future — continuing to carry
            the Golden Record toward the stars long after the spacecraft fall silent.
          </p>
        </div>
        <Callout tone="cyan" title="A note on power">
          Since the mid-2010s NASA has periodically switched off spacecraft heaters and instruments
          to keep the probes alive. The exact list of operating instruments changes over time and is
          published by NASA/JPL (see the Sources page).
        </Callout>
      </Section>

      {/* Timeline summary */}
      <Section id="timeline-summary" kicker="In order" title="The mission in one line">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          1977 launches → Jupiter 1979 → Saturn 1980–81 → Uranus 1986 → Neptune 1989 → Pale Blue
          Dot 1990 → Voyager 1 in interstellar space 2012 → Voyager 2 in interstellar space 2018 →
          interstellar operations continue today.{' '}
          <a href={pageUrl('timeline')} className="inline-flex items-center gap-1.5 font-semibold text-cyan-300 hover:text-cyan-200">
            Explore the full timeline <LinkArrow className="h-4 w-4" />
          </a>
        </p>
      </Section>

      <RelatedLinks
        items={['voyager-1', 'voyager-2', 'timeline', 'discoveries', 'sources']}
      />
    </div>
  );
}

