/**
 * UpdatesPage — /updates.html
 */

import { ArticleHeader, Callout, RelatedLinks, Section } from '../components/ui';

interface UpdateEntry {
  date: string;
  title: string;
  detail: string;
  kind: 'Mission' | 'Website';
}

const UPDATES: UpdateEntry[] = [
  {
    date: '2024 · Jun',
    title: 'Voyager 1 returns to normal science operations',
    detail:
      'After a flight-data-system problem first reported in November 2023, NASA confirmed Voyager 1 had resumed returning science data from all four of its operating instruments. Source: NASA/JPL public statements.',
    kind: 'Mission',
  },
  {
    date: '2026 · Aug',
    title: 'Tracker baseline verified against NASA values',
    detail:
      'The ephemeris baseline used by the live trackers was checked against NASA\u2019s published &ldquo;Where are the Voyagers&rdquo; distances and the spacecraft\u2019s published cruise speeds.',
    kind: 'Website',
  },
  {
    date: 'Ongoing',
    title: 'Power management continues on both spacecraft',
    detail:
      'NASA continues its long-running programme of switching off heaters and non-essential instruments to extend the Voyagers\u2019 operating life. We reflect the published status on the mission pages when NASA announces changes.',
    kind: 'Mission',
  },
];

export default function UpdatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <ArticleHeader
        current="updates"
        title="Mission & Website Updates"
        intro="A record of genuine Voyager mission developments and real changes to this website. We add entries only when there is actual content to report — never as a search-engine gimmick."
      />

      <Callout tone="amber" title="About this page">
        Mission items here are summaries of announcements published by NASA/JPL; follow the links
        on the Sources page to read the originals. Website items document what has actually changed
        in this project.
      </Callout>

      <Section id="mission-updates" kicker="Mission" title="Mission updates">
        <div className="space-y-4">
          {UPDATES.filter((u) => u.kind === 'Mission').map((item) => (
            <UpdateCard key={item.title} item={item} />
          ))}
        </div>
      </Section>

      <Section id="website-updates" kicker="Website" title="Website updates">
        <div className="space-y-4">
          {UPDATES.filter((u) => u.kind === 'Website').map((item) => (
            <UpdateCard key={item.title} item={item} />
          ))}
        </div>
        <p className="mt-4 max-w-4xl leading-relaxed text-slate-300">
          Want to propose a change? Please open an issue in the{' '}
          <a
            href="https://github.com/wahaha232/VoyagerTracker/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200"
          >
            GitHub repository
          </a>
          .
        </p>
      </Section>

      <RelatedLinks items={['timeline', 'how-it-works', 'sources', 'about', 'contact']} />
    </div>
  );
}

function UpdateCard({ item }: { item: UpdateEntry }) {
  return (
    <article className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
        {item.date} · {item.kind}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{item.detail}</p>
    </article>
  );
}
