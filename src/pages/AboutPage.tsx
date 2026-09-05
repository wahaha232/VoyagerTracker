/**
 * AboutPage — /about.html
 */

import { pageUrl } from '../constants/site';
import { ArticleHeader, Callout, RelatedLinks, Section } from '../components/ui';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <ArticleHeader
        current="about"
        title="About Voyager Tracker"
        intro="Voyager Tracker is a small, independent website that combines a live (estimated) spacecraft tracker with educational writing about the Voyager mission. This page explains what the site is — and, just as importantly, what it is not."
      />

      <Section id="purpose" kicker="Purpose" title="Why this site exists">
        <div className="space-y-4">
          <p className="max-w-4xl leading-relaxed text-slate-300">
            The Voyager mission is easy to reduce to a single number: &ldquo;24 billion
            kilometres away.&rdquo; This site exists to put that number in context — to help a
            first-time visitor understand what Voyager 1 and Voyager 2 are, where they have been,
            what they have discovered, and what the distances and speeds on a dashboard actually
            mean.
          </p>
          <p className="max-w-4xl leading-relaxed text-slate-300">
            The project is intentionally built for science education and information display. It is
            free to use, contains no fabricated mission news, and tries to be honest whenever data
            is an estimate rather than an official measurement.
          </p>
        </div>
      </Section>

      <Section id="features" kicker="Features" title="What the site offers">
        <ul className="grid max-w-4xl list-none gap-3 sm:grid-cols-2">
          {[
            'Live (estimated) distance, speed and status trackers for both spacecraft',
            'An interactive 3D model of the Voyager spacecraft',
            'A 2D heliocentric trajectory map of the solar system',
            'Mission history pages for Voyager 1 and Voyager 2',
            'A fact-based mission timeline and discoveries overview',
            'A transparent methodology page explaining every figure',
            'A Golden Record introduction and FAQ',
          ].map((item) => (
            <li key={item} className="rounded-xl border border-slate-800 bg-space-900/40 p-4 text-sm leading-relaxed text-slate-300">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="data" kicker="Data" title="Where the data comes from">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          Historical facts come from NASA/JPL public mission records. Distance and speed baselines
          are taken from NASA&rsquo;s published Voyager data and projected forward with each
          probe&rsquo;s velocity. This site is a third-party presentation of that information — all
          figures on interactive trackers are labelled estimates, and we do not receive telemetry
          directly from the spacecraft.
        </p>
      </Section>

      <Section id="not-nasa" kicker="Honesty" title="This is not a NASA website">
        <Callout tone="amber" title="Read this">
          Voyager Tracker is an independent educational project and is not affiliated with or
          endorsed by NASA or JPL. We do not claim any official status, we do not invent NASA
          partnerships, and if we cannot verify a piece of information we do not publish it.
        </Callout>
      </Section>

      <Section id="philosophy" kicker="Approach" title="Development philosophy">
        <ul className="max-w-4xl list-disc space-y-2 pl-5 text-slate-300">
          <li>Preserve and improve the interactive tracker — never break the core tool.</li>
          <li>Add content only when it has real educational value.</li>
          <li>Attribute sources and label estimates clearly.</li>
          <li>Keep the site fast, accessible and readable on mobile devices.</li>
          <li>Never fabricate news, missions, authors or scientific results.</li>
        </ul>
      </Section>

      <Section id="contact" kicker="Get in touch" title="Questions or corrections">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          Found an error, or have a suggestion? This is an open project — reports and feedback go
          through the{' '}
          <a
            href="https://github.com/wahaha232/VoyagerTracker/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200"
          >
            GitHub issue tracker
          </a>
          , or use the{' '}
          <a href={pageUrl('contact')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
            Contact page
          </a>
          .
        </p>
      </Section>

      <RelatedLinks items={['how-it-works', 'faq', 'sources', 'contact', 'privacy']} />
    </div>
  );
}

