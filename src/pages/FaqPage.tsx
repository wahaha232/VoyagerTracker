/**
 * FaqPage — /faq.html
 */

import { pageUrl } from '../constants/site';
import { ArticleHeader, Callout, RelatedLinks, Section } from '../components/ui';

interface QA {
  q: string;
  a: string;
}

const FAQ_ITEMS: QA[] = [
  { q: 'What is Voyager 1?', a: 'A NASA spacecraft launched on 5 September 1977. It flew past Jupiter and Saturn and, in 2012, became the first human-made object to enter interstellar space.' },
  { q: 'What is Voyager 2?', a: 'Voyager 1\u2019s twin, launched on 20 August 1977. It is the only spacecraft to have visited Uranus and Neptune, and it entered interstellar space in 2018.' },
  { q: 'When were the Voyager spacecraft launched?', a: 'Voyager 2 launched first on 20 August 1977, followed by Voyager 1 on 5 September 1977, both from Cape Canaveral, Florida.' },
  { q: 'Which Voyager is farther from Earth?', a: 'Voyager 1. It was placed on a faster trajectory and has been pulling steadily ahead of Voyager 2 for decades.' },
  { q: 'Which Voyager entered interstellar space first?', a: 'Voyager 1 crossed the heliopause in 2012; Voyager 2 followed in 2018.' },
  { q: 'How fast are the Voyager spacecraft traveling?', a: 'Relative to the Sun, about 17 km/s for Voyager 1 and about 15 km/s for Voyager 2 — roughly 61,000 and 54,000 km/h.' },
  { q: 'Where are Voyager 1 and Voyager 2 now?', a: 'Both are in interstellar space, travelling in different directions: Voyager 1 toward the north of the solar system\u2019s plane and Voyager 2 toward the south.' },
  { q: 'How far away are the Voyager spacecraft?', a: 'It changes daily. See the live tracker on the home page or the Voyager 1 and Voyager 2 pages for the current estimated distance from Earth and the Sun.' },
  { q: 'Are the Voyager spacecraft still communicating with Earth?', a: 'Yes. Both still return data through NASA\u2019s Deep Space Network, although instruments are powered down over time to manage declining power.' },
  { q: 'What is interstellar space?', a: 'The region beyond the heliosphere where the Sun\u2019s influence fades and the material between the stars dominates.' },
  { q: 'What is the heliosphere?', a: 'A bubble of solar wind and magnetic field carved out around the Sun. Its outer edge — the heliopause — is where interstellar space begins.' },
  { q: 'What is the Golden Record?', a: 'A gold-plated phonograph record carried by both Voyagers with images, sounds, music and greetings representing Earth to any civilization that finds it.' },
  { q: 'Why did the two Voyagers take different paths?', a: 'Voyager 1\u2019s close flyby of Saturn\u2019s moon Titan bent its path north and out of the planets\u2019 plane. Voyager 2 kept to a path that allowed Uranus and Neptune flybys.' },
  { q: 'How does Voyager Tracker calculate distance?', a: 'It takes a published NASA/JPL baseline distance and speed, then projects the distance forward using the elapsed time. Full details are on the How It Works page.' },
  { q: 'Is Voyager Tracker an official NASA website?', a: 'No. Voyager Tracker is an independent educational project and is not affiliated with or endorsed by NASA or JPL.' },
  { q: 'How often is the information updated?', a: 'The interpolated counters update about ten times per second in your browser. The underlying data baseline is refreshed whenever new official figures are published.' },
  { q: 'Can I share or reuse the content?', a: 'Yes — this site exists for education. Please link back to it and do not present the figures as official NASA live telemetry.' },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <ArticleHeader
        current="faq"
        title="Voyager FAQ"
        intro="Seventeen honest, plain-language answers about Voyager 1 and Voyager 2 — what they are, where they are now, and how this website gets its numbers."
      />

      <Section id="questions" kicker="Questions & answers" title="Everything people ask us">
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <details key={item.q} className="group rounded-xl border border-slate-800 bg-space-900/40 open:border-cyan-500/40">
              <summary className="cursor-pointer list-none p-4 font-medium text-slate-100 transition-colors hover:text-cyan-300">
                <span className="mr-2 font-mono text-xs font-bold text-cyan-400">{String(i + 1).padStart(2, '0')}</span>
                {item.q}
              </summary>
              <p className="border-t border-slate-800 px-4 py-3 text-sm leading-relaxed text-slate-400">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Callout tone="emerald" title="Still curious?">
        The{' '}
        <a href={pageUrl('how-it-works')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">
          How It Works page
        </a>{' '}
        explains the data in more detail, and the{' '}
        <a href={pageUrl('sources')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">
          Sources page
        </a>{' '}
        lists every official reference used by this site.
      </Callout>

      <RelatedLinks items={['voyager-1', 'voyager-2', 'how-it-works', 'about', 'sources']} />
    </div>
  );
}
