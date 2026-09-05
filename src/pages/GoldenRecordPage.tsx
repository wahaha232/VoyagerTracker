/**
 * GoldenRecordPage — /golden-record.html
 */

import { pageUrl } from '../constants/site';
import { ArticleHeader, Callout, RelatedLinks, Section } from '../components/ui';

export default function GoldenRecordPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <ArticleHeader
        current="golden-record"
        title="The Voyager Golden Record"
        intro="Attached to each Voyager spacecraft is a gold-plated phonograph record — a time capsule of sounds, music, greetings and images intended to tell another civilization who made the spacecraft and where Earth is."
      />

      <Section id="why" kicker="Why it exists" title="Why was the Golden Record created?">
        <div className="space-y-4">
          <p className="max-w-4xl leading-relaxed text-slate-300">
            The Voyagers are on trajectories that will carry them among the stars for millions of
            years — long after they fall silent. A committee led by Carl Sagan designed the Golden
            Record so that, if another civilization ever finds a Voyager, they will have a portrait
            of the world that built it.
          </p>
          <p className="max-w-4xl leading-relaxed text-slate-300">
            The record is a 30-centimetre copper disk plated with gold, with a cartridge and needle
            included, plus instructions (encoded in scientific notation and pictographs) for playing
            it. Copies flew on both Voyager 1 and Voyager 2.
          </p>
        </div>
      </Section>

      <Section id="contents" kicker="What is on it" title="What the record contains">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ['Greetings', 'Spoken greetings in 55 human languages, plus greetings from whales.'],
            ['Sounds of Earth', 'Natural sounds such as wind, thunder, surf, birds, and the sounds of human activity — from footsteps to machines.'],
            ['Music', 'Around 90 minutes of music from many cultures and eras, including Bach, Beethoven and Chuck Berry.'],
            ['Images', '115 analogue-encoded images showing mathematics, science, human anatomy, daily life, art and places on Earth.'],
            ['Scientific information', 'An encoded map of pulsars pointing back to the Sun, and a drawing of the hydrogen atom — the cosmic \u201caddress\u201d of Earth.'],
            ['How to play it', 'An engraved diagram explains the record\u2019s playback speed and how to decode the images and audio.'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
              <h3 className="mb-2 font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="symbolism" kicker="Why it matters" title="The record\u2019s meaning">
        <div className="space-y-4">
          <p className="max-w-4xl leading-relaxed text-slate-300">
            The Golden Record is the most ambitious message ever sent from Earth into space. Its
            content is a deliberate exercise in optimism: it assumes that whoever finds it will be
            able — and willing — to decode it, and that they will find the contents worth decoding.
          </p>
          <p className="max-w-4xl leading-relaxed text-slate-300">
            For people on Earth, the record also works as a mirror. Choosing what to include forced
            a global conversation about what represents humanity — and the finished record is now
            studied as both an engineering artefact and a cultural document.
          </p>
        </div>
        <Callout tone="amber" title="A realistic note">
          The chance that any Voyager will be found is extremely small. The record is as much a
          statement about the present as it is a message to the future.
        </Callout>
      </Section>

      <Section id="listen" kicker="Try it" title="Want to know more?">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          NASA has published the full contents of the record, including the complete image set and
          audio. Links are listed on the{' '}
          <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
            Sources page
          </a>
          , along with the original article explaining how the record was designed.
        </p>
      </Section>

      <RelatedLinks items={['voyager-1', 'voyager-2', 'mission', 'discoveries', 'about']} />
    </div>
  );
}

