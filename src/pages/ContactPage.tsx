/**
 * ContactPage — /contact.html
 *
 * There is intentionally no fake contact e-mail or company. Because this is an
 * open, independent project, feedback goes through the public GitHub issue
 * tracker. The form below builds a pre-filled issue link — it does not send
 * data to any server, which is stated clearly on the page.
 */

import { useState } from 'react';
import { ArticleHeader, Callout, RelatedLinks, Section } from '../components/ui';
import { ExternalLinkIcon } from '../components/icons';

const REPO_URL = 'https://github.com/wahaha232/VoyagerTracker';
const ISSUES_URL = `${REPO_URL}/issues/new`;

export default function ContactPage() {
  const [category, setCategory] = useState('feedback');
  const [message, setMessage] = useState('');

  const title =
    category === 'feedback'
      ? '[Voyager Tracker] Website feedback'
      : category === 'correction'
        ? '[Voyager Tracker] Data correction request'
        : '[Voyager Tracker] Technical issue report';

  const issueUrl = `${ISSUES_URL}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(
    `**Category:** ${category}\n\n${message}\n\n---\n_(Submitted from the Voyager Tracker contact page.)_`,
  )}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <ArticleHeader
        current="contact"
        title="Contact & Feedback"
        intro="Found an error in a figure or date? Spot a broken link or layout problem? Have a suggestion? This project has no corporate office or dedicated support e-mail — the fastest way to reach us is through the public GitHub issue tracker."
      />

      <Callout tone="amber" title="How feedback works">
        This website does not run a contact-form backend, so the form below cannot &ldquo;send&rdquo;
        anything by itself. Instead, it prepares a message and opens a new issue on GitHub, where
        the project is developed in the open. Your message will be public.
      </Callout>

      <Section id="ways" kicker="Options" title="Ways to reach the project">
        <ul className="max-w-4xl list-disc space-y-2 pl-5 text-slate-300">
          <li>
            <strong className="text-white">Report a data problem</strong> — wrong distance, date or
            factual statement (please include the source that disagrees, if you have one).
          </li>
          <li>
            <strong className="text-white">Report a technical issue</strong> — broken link, layout
            problem on mobile or desktop, or JavaScript error.
          </li>
          <li>
            <strong className="text-white">Give feedback</strong> — suggestions for new content or
            improvements to the tracker.
          </li>
          <li>
            <strong className="text-white">Corrections about this site</strong> — if something in the{' '}
            <a href="privacy.html" className="text-cyan-300 hover:text-cyan-200">privacy policy</a>{' '}
            or the{' '}
            <a href="about.html" className="text-cyan-300 hover:text-cyan-200">about page</a> is
            inaccurate.
          </li>
        </ul>
      </Section>

      {/* Issue form */}
      <Section id="form" kicker="Form" title="Open an issue">
        <div className="hud-panel rounded-2xl p-6">
          <p className="mb-5 font-mono text-xs leading-relaxed text-slate-400">
            Status: <span className="text-amber-300">this form opens GitHub in a new tab</span> —
            it does not send data to a server. If the new tab does not open, use the
            &ldquo;Open the issue page&rdquo; button below.
          </p>

          <div className="mb-4">
            <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-slate-200">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-space-950 px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-cyan-400 sm:max-w-xs"
            >
              <option value="feedback">Website feedback</option>
              <option value="correction">Data correction request</option>
              <option value="technical">Technical issue report</option>
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-200">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the issue or suggestion. For data corrections, please include the page URL and, if possible, a reference."
              className="w-full rounded-lg border border-slate-700 bg-space-950 px-3 py-2.5 text-sm leading-relaxed text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <a
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 text-sm font-bold text-space-950 shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.02]"
          >
            Continue on GitHub <ExternalLinkIcon className="h-4 w-4" />
          </a>
          <a
            href={ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400/60"
          >
            Open the issue page
          </a>
        </div>
      </Section>

      <RelatedLinks items={['about', 'sources', 'updates', 'privacy', 'faq']} />
    </div>
  );
}



