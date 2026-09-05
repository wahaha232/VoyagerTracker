/**
 * SourcesPage — /sources.html
 */

import { pageUrl } from '../constants/site';
import { ArticleHeader, Callout, RelatedLinks, Section } from '../components/ui';
import { ExternalLinkIcon } from '../components/icons';

interface Source {
  name: string;
  provides: string;
  url: string;
}

const SOURCES: Source[] = [
  {
    name: 'NASA Science — Voyager Mission',
    provides: 'Mission overview, spacecraft facts, encounter history and news.',
    url: 'https://science.nasa.gov/mission/voyager/',
  },
  {
    name: 'NASA — Where Are Voyager 1 and Voyager 2 Now?',
    provides: 'Current official distances from Earth and the Sun for both spacecraft.',
    url: 'https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/',
  },
  {
    name: 'NASA Science — Voyager 1',
    provides: 'Voyager 1 mission profile, instruments and status.',
    url: 'https://science.nasa.gov/mission/voyager/voyager-1/',
  },
  {
    name: 'NASA Science — Voyager 2',
    provides: 'Voyager 2 mission profile, instruments and status.',
    url: 'https://science.nasa.gov/mission/voyager/voyager-2/',
  },
  {
    name: 'NASA — Voyager Golden Record',
    provides: 'History and full contents of the Golden Record.',
    url: 'https://science.nasa.gov/mission/voyager/golden-record-overview/',
  },
  {
    name: 'JPL — Voyager, The Interstellar Mission',
    provides: 'Official mission news and the interstellar mission phase details.',
    url: 'https://voyager.jpl.nasa.gov/',
  },
  {
    name: 'NASA Eyes on the Solar System',
    provides: 'An interactive visualisation of the spacecraft positions (great for cross-checking).',
    url: 'https://eyes.nasa.gov/apps/solar-system/#/home',
  },
  {
    name: 'NASA — Voyager Frequently Asked Questions',
    provides: 'Official answers used as a factual cross-check for this site\u2019s FAQ.',
    url: 'https://voyager.jpl.nasa.gov/frequently-asked-questions/',
  },
];

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <ArticleHeader
        current="sources"
        title="Sources & References"
        intro="Every figure on this website can be traced to a public reference. Historical facts and mission status come from NASA and JPL; distance and speed figures are derived from their published baselines and labelled as estimates."
      />

      <Section id="official" kicker="Primary references" title="NASA / JPL sources">
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-space-900/70 font-mono text-xs uppercase tracking-wider text-slate-400">
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">What it provides</th>
                <th className="px-4 py-3">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {SOURCES.map((s) => (
                <tr key={s.url} className="align-top">
                  <td className="px-4 py-3 font-medium text-slate-100">{s.name}</td>
                  <td className="px-4 py-3 leading-relaxed text-slate-400">{s.provides}</td>
                  <td className="px-4 py-3">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-cyan-300 hover:text-cyan-200"
                    >
                      Visit <ExternalLinkIcon className="h-3.5 w-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="methodology" kicker="Methodology" title="How we use these sources">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          We do not copy NASA pages. Historical events are re-written in our own words and
          cross-checked against the references above. Distances shown on the live trackers use the
          NASA/JPL baseline values and the probes&rsquo; published speeds, projected forward — the
          exact formula is documented on the{' '}
          <a href={pageUrl('how-it-works')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
            How It Works
          </a>{' '}
          page.
        </p>
      </Section>

      <Callout tone="cyan" title="Image credit">
        NASA/JPL-Caltech imagery used anywhere on this site is credited at the point of use and
        hotlinked only from official NASA image sources.
      </Callout>

      <RelatedLinks items={['about', 'how-it-works', 'faq', 'updates', 'contact']} />
    </div>
  );
}

