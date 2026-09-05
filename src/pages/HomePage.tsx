/**
 * HomePage — the front page.
 *
 * Structure follows the content plan:
 * Hero → Live tracker (both spacecraft) → What are Voyager 1 & 2?
 * → Why they matter → Current mission status → Timeline preview →
 * Discoveries preview → How it works → FAQ → Related information.
 */

import { SPACECRAFT_META } from '../constants/voyagerData';
import { pageUrl } from '../constants/site';
import { LinkArrow } from '../components/icons';
import TrackerSection from '../components/TrackerSection';
import Voyager3D from '../components/Voyager3D';
import { Callout, RelatedLinks, Section } from '../components/ui';

const v1 = SPACECRAFT_META['voyager1'];
const v2 = SPACECRAFT_META['voyager2'];

export default function HomePage() {
  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden border-b border-cyan-500/15">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-16">
          <div className="animate-fade-in">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Independent · Educational · Not affiliated with NASA
            </p>
            <h1 className="neon-text text-4xl font-black tracking-wide text-white sm:text-5xl lg:text-6xl">
              Voyager Tracker
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-200 sm:text-xl">
              Track NASA&rsquo;s Voyager 1 and Voyager 2 spacecraft as they continue their
              historic journeys through interstellar space.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-400">
              Launched by NASA in 1977, Voyager 1 and Voyager 2 are the longest-running
              deep-space missions in history and the only spacecraft operating beyond the
              heliosphere. This site follows their distance from Earth and the Sun, their
              speed and their interstellar status — and explains what the probes are doing,
              where they have been and why their mission matters. All figures are clearly
              labelled estimates built from published NASA/JPL data.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#live-tracker"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 text-sm font-bold text-space-950 shadow-lg shadow-cyan-500/25 transition-transform hover:scale-[1.02]"
              >
                Open live tracker
                <LinkArrow className="h-4 w-4" />
              </a>
              <a
                href={pageUrl('mission')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-space-900/70 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400/60 hover:text-white"
              >
                Learn about the mission
              </a>
            </div>
          </div>

          {/* 3D spacecraft */}
          <div className="animate-fade-in">
            <div className="hud-panel relative h-[340px] w-full overflow-hidden rounded-2xl sm:h-[430px]">
              <Voyager3D />
              <div className="pointer-events-none absolute bottom-3 left-4 rounded-md border border-cyan-500/20 bg-space-950/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-300/70 backdrop-blur-sm">
                Drag to rotate · interactive Voyager model
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Live tracker (both probes) ===== */}
      <div id="live-tracker" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6">
        <TrackerSection
          ids={['voyager1', 'voyager2']}
          title="Voyager 1 & Voyager 2 Live Tracker"
          intro="Distances, speeds and mission status for both interstellar probes. The numbers tick upward as the spacecraft continue outward at tens of kilometres per second — rotate the 3D model and explore the trajectory map to see where they are heading."
        />
      </div>

      {/* ===== What are Voyager 1 and Voyager 2? ===== */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <Section
          id="what-are-the-voyagers"
          kicker="Introduction"
          title="What are Voyager 1 and Voyager 2?"
          lead="Two nearly identical robotic spacecraft built for a four-year mission that is now in its fifth decade."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="hud-panel rounded-2xl p-6" style={{ borderColor: '#22d3ee40' }}>
              <p className="mb-2 text-xl font-bold" style={{ color: '#22d3ee' }}>{v1.name}</p>
              <p className="mb-3 text-sm leading-relaxed text-slate-400">
                Launched 5 September 1977 · Cape Canaveral, Florida
              </p>
              <p className="text-[15px] leading-relaxed text-slate-200">
                Voyager 1 was sent first to Jupiter and Saturn, then used Saturn&rsquo;s gravity
                to swing north, away from the planets. It flew past Jupiter in 1979 and Saturn in
                1980, photographed the famous Pale Blue Dot in 1990, and in 2012 became the first
                human-made object to reach interstellar space. It is still the most distant
                spacecraft ever built.
              </p>
              <p className="mt-4">
                <a href={pageUrl('voyager-1')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                  Voyager 1 mission page <LinkArrow className="h-4 w-4" />
                </a>
              </p>
            </div>
            <div className="hud-panel rounded-2xl p-6" style={{ borderColor: '#34d39940' }}>
              <p className="mb-2 text-xl font-bold" style={{ color: '#34d399' }}>{v2.name}</p>
              <p className="mb-3 text-sm leading-relaxed text-slate-400">
                Launched 20 August 1977 · Cape Canaveral, Florida
              </p>
              <p className="text-[15px] leading-relaxed text-slate-200">
                Voyager 2 is the only spacecraft ever to visit Uranus and Neptune, completing the
                &ldquo;Grand Tour&rdquo; of the outer planets. It flew past Jupiter in 1979, Saturn
                in 1981, Uranus in 1986 and Neptune in 1989, then continued south out of the solar
                system and entered interstellar space in 2018.
              </p>
              <p className="mt-4">
                <a href={pageUrl('voyager-2')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
                  Voyager 2 mission page <LinkArrow className="h-4 w-4" />
                </a>
              </p>
            </div>
          </div>
        </Section>

        {/* ===== Why the mission matters ===== */}
        <Section
          id="why-it-matters"
          kicker="Significance"
          title="Why Are the Voyager Missions Important?"
          lead="The Voyagers rewrote the textbooks on the outer solar system — and then kept going."
        >
          <p className="mb-4 max-w-4xl leading-relaxed text-slate-300">
            The Voyager program delivered the first close-up views of four giant planets, their
            rings and their moons, and in doing so it reshaped planetary science. Io&rsquo;s
            volcanoes, Neptune&rsquo;s supersonic winds and the intricate structure of
            Saturn&rsquo;s rings were revealed — or completely transformed — by these two
            spacecraft.
          </p>
          <p className="max-w-4xl leading-relaxed text-slate-300">
            Today the mission has a second life. Voyager 1 and Voyager 2 are the only probes
            sampling the space between the Sun&rsquo;s influence and the rest of the galaxy,
            returning the first direct measurements of interstellar plasma, magnetic fields and
            cosmic rays. Instruments are being powered down one by one to stretch the available
            power, and engineers expect at least one spacecraft to keep returning data well into
            the 2030s.
          </p>
          <Callout tone="cyan" title="Also aboard">
            Each Voyager carries a Golden Record — a phonograph record with sounds, music,
            greetings and images of Earth, designed as a message for any intelligence that finds
            the spacecraft.{' '}
            <a href={pageUrl('golden-record')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
              Learn more about the Golden Record →
            </a>
          </Callout>
        </Section>

        {/* ===== Current mission status ===== */}
        <Section
          id="current-status"
          kicker="Right now"
          title="Current Mission Status"
          lead="What both spacecraft are doing at this moment, in plain language."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="hud-panel rounded-2xl p-6" style={{ borderColor: '#22d3ee40' }}>
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">Voyager 1</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                <li>· In interstellar space since {v1.interstellarEntryDate}</li>
                <li>· Moving away from the Sun at about 17 km/s</li>
                <li>· Still returning data through NASA&rsquo;s Deep Space Network</li>
                <li>· Signal travel time to Earth: roughly a day</li>
              </ul>
              <a href={pageUrl('voyager-1')} className="mt-4 inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                Voyager 1 details →
              </a>
            </div>
            <div className="hud-panel rounded-2xl p-6" style={{ borderColor: '#34d39940' }}>
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">Voyager 2</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                <li>· In interstellar space since {v2.interstellarEntryDate}</li>
                <li>· Moving away from the Sun at about 15 km/s</li>
                <li>· Still returning data through NASA&rsquo;s Deep Space Network</li>
                <li>· The only spacecraft to have visited Uranus and Neptune</li>
              </ul>
              <a href={pageUrl('voyager-2')} className="mt-4 inline-block text-sm font-semibold text-emerald-300 hover:text-emerald-200">
                Voyager 2 details →
              </a>
            </div>
          </div>
          <p className="mt-4 font-mono text-[11px] text-slate-500">
            Status summarized from NASA/JPL mission records. Exact live distances are shown in the
            tracker above; signal travel time varies with Earth&rsquo;s orbital position.
          </p>
        </Section>

        {/* ===== Timeline preview ===== */}
        <Section
          id="timeline-preview"
          kicker="History"
          title="Voyager Mission Timeline"
          lead="The story so far, in six milestones."
        >
          <ol className="space-y-3">
            {[
              ['1977', 'Voyager 2 and Voyager 1 launch from Cape Canaveral (20 Aug & 5 Sep).'],
              ['1979', 'Both spacecraft fly past Jupiter; Voyager 1 discovers active volcanoes on Io.'],
              ['1980–1981', 'Saturn encounters: Voyager 1 (Nov 1980), then Voyager 2 (Aug 1981).'],
              ['1986 · 1989', 'Voyager 2 becomes the only spacecraft to visit Uranus and Neptune.'],
              ['2012 · 2018', 'Voyager 1, then Voyager 2, enter interstellar space.'],
              ['Today', 'Both probes continue to return data from beyond the heliosphere.'],
            ].map(([year, text]) => (
              <li key={year} className="flex gap-4 rounded-xl border border-slate-800 bg-space-900/40 p-4">
                <span className="shrink-0 font-mono text-sm font-bold text-cyan-300">{year}</span>
                <span className="text-sm leading-relaxed text-slate-300">{text}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4">
            <a href={pageUrl('timeline')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              View the full mission timeline <LinkArrow className="h-4 w-4" />
            </a>
          </p>
        </Section>

        {/* ===== Discoveries preview ===== */}
        <Section
          id="discoveries-preview"
          kicker="Science"
          title="Scientific Discoveries"
          lead="A few of the discoveries that changed planetary science forever."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Io\u2019s volcanoes', 'Voyager 1 photographed erupting volcanoes on Jupiter\u2019s moon Io in 1979 — the first active volcanoes found beyond Earth.'],
              ['Neptune\u2019s winds', 'Voyager 2 measured supersonic winds on Neptune, among the fastest in the solar system.'],
              ['Interstellar plasma', 'After 2012 and 2018, the Voyagers measured the density of plasma in the space between the stars.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
                <h3 className="mb-2 font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4">
            <a href={pageUrl('discoveries')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              Explore all discoveries <LinkArrow className="h-4 w-4" />
            </a>
          </p>
        </Section>

        {/* ===== How it works ===== */}
        <Section
          id="how-it-works-preview"
          kicker="Method"
          title="How Voyager Tracker Works"
          lead="The numbers you see are honest estimates — here is how they are made."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['1 · Data source', 'Official NASA/JPL mission references provide baseline distances and cruise speeds for both spacecraft.'],
              ['2 · Calculation', 'The site advances the baseline with the probes\u2019 velocities over elapsed time, then converts to AU, km and light-travel time.'],
              ['3 · Update cycle', 'Values are recalculated in your browser about ten times per second. Baselines are refreshed whenever new official data is published.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
                <h3 className="mb-2 font-mono text-sm font-bold text-cyan-300">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4">
            <a href={pageUrl('how-it-works')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              Read the full methodology <LinkArrow className="h-4 w-4" />
            </a>
          </p>
        </Section>

        {/* ===== FAQ preview ===== */}
        <Section
          id="faq-preview"
          kicker="Questions"
          title="Frequently Asked Questions"
          lead="Short answers to the questions people ask most."
        >
          <div className="space-y-3">
            {[
              ['Where are Voyager 1 and Voyager 2 now?', 'Both are in interstellar space. Voyager 1 crossed the heliopause in 2012 and Voyager 2 in 2018; they continue outward in different directions.'],
              ['How fast are the Voyagers traveling?', 'Voyager 1 recedes from the Sun at roughly 17 km/s and Voyager 2 at about 15 km/s — tens of thousands of kilometres per hour.'],
              ['Are the Voyagers still communicating with Earth?', 'Yes. NASA\u2019s Deep Space Network still receives data from both, though instruments are being shut down one by one to save power.'],
              ['Is Voyager Tracker an official NASA website?', 'No. It is an independent educational project and is not affiliated with or endorsed by NASA or JPL.'],
            ].map(([q, a]) => (
              <details key={q} className="group rounded-xl border border-slate-800 bg-space-900/40">
                <summary className="cursor-pointer list-none p-4 font-medium text-slate-100 transition-colors hover:text-cyan-300 marker:hidden">
                  <span className="mr-2 text-cyan-400">Q.</span>
                  {q}
                </summary>
                <p className="border-t border-slate-800 px-4 py-3 text-sm leading-relaxed text-slate-400">
                  <span className="mr-2 text-emerald-400">A.</span>
                  {a}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-4">
            <a href={pageUrl('faq')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              Browse all 17 questions <LinkArrow className="h-4 w-4" />
            </a>
          </p>
        </Section>
      </div>

      {/* ===== Related information ===== */}
      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <RelatedLinks
          items={['voyager-1', 'voyager-2', 'mission', 'timeline', 'discoveries', 'golden-record']}
        />
      </div>
    </div>
  );
}





