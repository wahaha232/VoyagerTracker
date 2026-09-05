/**
 * DiscoveriesPage — /discoveries.html
 */

import { pageUrl } from '../constants/site';
import { ArticleHeader, Callout, RelatedLinks, Section } from '../components/ui';

export default function DiscoveriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <ArticleHeader
        current="discoveries"
        title="Voyager Scientific Discoveries"
        intro="From erupting volcanoes on Io to the first direct measurements of the space between the stars, the Voyager spacecraft transformed our understanding of the solar system — and of the galaxy around it."
      />

      <Section id="jupiter" kicker="1979" title="Jupiter">
        <ul className="space-y-3">
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">Volcanoes on Io</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Voyager 1 imaged plumes erupting from Jupiter&rsquo;s moon Io — the first active
              volcanoes ever seen beyond Earth. Tidal heating from Jupiter&rsquo;s gravity drives
              Io&rsquo;s eruptions.
            </p>
          </li>
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">The Great Red Spot and Jupiter&rsquo;s weather</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              The spacecraft showed that the Great Red Spot is a colossal storm and revealed
              enormous complexity in the planet&rsquo;s belts, zones and lightning.
            </p>
          </li>
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">Rings and new moons</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Jupiter was found to have faint rings, and several small new moons were discovered
              around the planet.
            </p>
          </li>
        </ul>
      </Section>

      <Section id="saturn" kicker="1980–1981" title="Saturn">
        <ul className="space-y-3">
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">The rings, in extraordinary detail</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Voyager revealed Saturn&rsquo;s rings as thousands of individual ringlets, shaped by
              small &ldquo;shepherding&rdquo; moons — a level of complexity nobody had imagined.
            </p>
          </li>
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">Titan&rsquo;s hazy atmosphere</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Voyager 1 found Titan wrapped in a thick, opaque orange haze of nitrogen and organic
              compounds, with surface pressure about 50% higher than Earth&rsquo;s.
            </p>
          </li>
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">New moons and ring moons</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Several new satellites of Saturn were discovered, and images of Enceladus hinted at a
              surprisingly young, active surface.
            </p>
          </li>
        </ul>
      </Section>

      <Section id="uranus" kicker="1986" title="Uranus">
        <ul className="space-y-3">
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">A lopsided magnetic field</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Voyager 2 found Uranus&rsquo;s magnetic field tilted about 60° from its spin axis and
              offset from the planet&rsquo;s centre — unlike any magnetic field seen before.
            </p>
          </li>
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">Rings, moons and Miranda</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              The spacecraft imaged Uranus&rsquo;s thin, dark rings, discovered ten new moons, and
              found the moon Miranda scarred with enormous cliffs and bizarre chevron-shaped
              terrains.
            </p>
          </li>
        </ul>
      </Section>

      <Section id="neptune" kicker="1989" title="Neptune">
        <ul className="space-y-3">
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">The Great Dark Spot and supersonic winds</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Voyager 2 photographed the Great Dark Spot, a storm system larger than Earth, and
              clocked winds exceeding 2,000 km/h — the fastest measured on any planet.
            </p>
          </li>
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">Rings and arcs</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Neptune turned out to have faint rings with bright, clumpy arcs — a structure still
              not fully understood.
            </p>
          </li>
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">Triton&rsquo;s geysers</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Neptune&rsquo;s giant moon Triton — which orbits backwards — showed nitrogen geysers
              erupting through its thin atmosphere, at one of the coldest surfaces measured in the
              solar system.
            </p>
          </li>
        </ul>
      </Section>

      <Section id="interstellar" kicker="2012 & 2018" title="Interstellar space">
        <ul className="space-y-3">
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">Crossing the heliopause</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Voyager 1 (2012) and Voyager 2 (2018) became the first spacecraft to leave the
              heliosphere, marking the boundary of the Sun&rsquo;s influence.
            </p>
          </li>
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">Interstellar plasma, fields and cosmic rays</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              The probes measured the density and temperature of interstellar plasma, the direction
              of the local magnetic field, and the intensity of galactic cosmic rays — data no
              spacecraft had ever gathered.
            </p>
          </li>
          <li className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            <p className="font-semibold text-white">A second vantage point</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Because the two Voyagers left in different directions, together they let scientists
              probe the three-dimensional shape of the heliosphere rather than infer it from a
              single point.
            </p>
          </li>
        </ul>
      </Section>

      <Callout tone="cyan" title="More reading">
        Each of these results is documented by NASA/JPL. See the{' '}
        <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
          Sources page
        </a>{' '}
        for official links.
      </Callout>

      <RelatedLinks items={['mission', 'timeline', 'voyager-1', 'voyager-2', 'golden-record']} />
    </div>
  );
}

