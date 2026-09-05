/**
 * PrivacyPage — /privacy.html
 */

import { ArticleHeader, RelatedLinks, Section } from '../components/ui';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <ArticleHeader
        current="privacy"
        title="Privacy Policy"
        intro="This page describes what Voyager Tracker does — and does not — collect. The short version: this site is served as static pages, stores nothing on our servers, and does not operate its own analytics."
      />

      <Section id="overview" kicker="Overview" title="What this site collects">
        <div className="space-y-4">
          <p className="max-w-4xl leading-relaxed text-slate-300">
            Voyager Tracker is hosted as a static website on GitHub Pages. It has no login, no
            accounts, no comment system and no contact-form backend. We do not run our own tracking
            scripts, and we do not sell or share personal data because we do not collect any
            personal data.
          </p>
          <p className="max-w-4xl leading-relaxed text-slate-300">
            Like any web server, the hosting provider (GitHub) may keep routine server logs. Please
            refer to GitHub&rsquo;s privacy policy for details about its handling of those logs.
          </p>
        </div>
      </Section>

      <Section id="cookies" kicker="Cookies" title="Cookies">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          This website does not set its own cookies. If advertising or third-party embeds are added
          in the future, those services may set cookies, and this policy will be updated before
          they are enabled.
        </p>
      </Section>

      <Section id="storage" kicker="Browser storage" title="Local storage & session data">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          The tracker runs entirely in your browser. We do not write your data to local storage or
          session storage. If you close the page, nothing about your visit is retained by the site.
        </p>
      </Section>

      <Section id="third-party" kicker="Third parties" title="Third-party services">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          The pages load fonts from Google Fonts. When your browser requests those fonts, Google
          receives the standard request information your browser sends. Some pages link to NASA and
          GitHub websites; opening those links takes you to third-party services governed by their
          own privacy policies.
        </p>
      </Section>

      <Section id="ads" kicker="Advertising" title="Advertising (AdSense)">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          At the time of writing this page, the site does not display Google AdSense or any other
          advertising. If advertising is added, ad cookies and personalised-ad settings would be
          governed by Google&rsquo;s policies, and this page would be updated to say so clearly.
        </p>
      </Section>

      <Section id="contact" kicker="Questions" title="Privacy questions">
        <p className="max-w-4xl leading-relaxed text-slate-300">
          If you have a question about this policy, you can reach the project through the{' '}
          <a
            href="https://github.com/wahaha232/VoyagerTracker/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200"
          >
            GitHub issue tracker
          </a>
          .
        </p>
      </Section>

      <RelatedLinks items={['about', 'contact', 'faq', 'sources']} />
    </div>
  );
}
