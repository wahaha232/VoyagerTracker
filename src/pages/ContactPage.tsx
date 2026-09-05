/**
 * ContactPage — /contact.html  (EN / 繁中)
 *
 * No fake e-mail or company: feedback goes through the public GitHub issue
 * tracker. The form builds a pre-filled issue link — it does not send data.
 */

import { useState } from 'react';
import { RelatedLinks } from '../components/ui';
import { ExternalLinkIcon } from '../components/icons';
import { BiArticleHeader, bi, useZh } from '../components/content';

const REPO_URL = 'https://github.com/wahaha232/VoyagerTracker';
const ISSUES_URL = `${REPO_URL}/issues/new`;

const ISSUE_TYPE_ZH = {
  feedback: '網站意見回饋',
  correction: '資料更正請求',
  technical: '技術問題回報',
};

const CATEGORY_LABELS = {
  feedback: bi('Website feedback', '網站意見回饋'),
  correction: bi('Data correction request', '資料更正請求'),
  technical: bi('Technical issue report', '技術問題回報'),
};

export default function ContactPage() {
  const zh = useZh();
  const [category, setCategory] = useState('feedback');
  const [message, setMessage] = useState('');

  const prefix = zh ? '[航海家號追蹤器]' : '[Voyager Tracker]';
  const title = `${prefix} ${ISSUE_TYPE_ZH[category as keyof typeof ISSUE_TYPE_ZH]}`;
  const issueUrl = `${ISSUES_URL}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(
    `${zh ? '分類：' : '**Category:**'} ${category}\n\n${message}\n\n---\n_(${zh ? '由航海家號追蹤器的聯絡頁送出。' : 'Submitted from the Voyager Tracker contact page.'})_`,
  )}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="contact"
        title={bi('Contact & Feedback', '聯絡與意見回饋')}
        intro={bi(
          'Found an error in a figure or date? Spot a broken link or layout problem? Have a suggestion? This project has no corporate office or support e-mail — the fastest way to reach us is the public GitHub issue tracker.',
          '發現數字或日期有誤？看到壞掉的連結或版面問題？有任何建議？本專案沒有公司辦公室或客服信箱——最快的聯絡方式，是透過公開的 GitHub Issue 追蹤器。',
        )}
      />

      <div className="my-6 rounded-xl border border-amber-400/40 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-100">
        <p className="mb-1.5 font-semibold text-white">
          {zh ? '意見回饋的運作方式' : 'How feedback works'}
        </p>
        <p>
          {zh
            ? '本站沒有表單後端，因此下方表單本身無法「送出」資料。它會幫您準備好訊息，並開啟一個新的 GitHub Issue（公開可見），供專案維護者查看。'
            : 'This website has no form backend, so the form below cannot \u201csend\u201d anything by itself. It prepares a message and opens a new — publicly visible — issue on GitHub.'}
        </p>
      </div>

      <div className="mb-12">
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90">
          {zh ? '選項' : 'Options'}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
          {zh ? '如何與本專案聯繫' : 'Ways to reach the project'}
        </h2>
        <ul className="max-w-4xl list-disc space-y-2 pl-5 text-slate-300">
          {[
            bi(
              'Report a data problem — wrong distance, date or fact (please include the disagreeing source if you have one).',
              '回報資料錯誤——距離、日期或事實有誤（如有不同意見的來源，請一併附上）。',
            ),
            bi(
              'Report a technical issue — broken link, mobile/desktop layout problem or JavaScript error.',
              '回報技術問題——壞掉的連結、手機／電腦版面問題或 JavaScript 錯誤。',
            ),
            bi(
              'Give feedback — suggestions for new content or tracker improvements.',
              '提供意見——對新內容或追蹤器改進的建議。',
            ),
            bi(
              'Corrections about this site — something inaccurate in the privacy policy or the about page.',
              '關於本站本身的更正——隱私政策或「關於本站」內容有誤。',
            ),
          ].map((item, i) => (
            <li key={i}>{zh ? item.zh : item.en}</li>
          ))}
        </ul>
      </div>

      {/* Issue form */}
      <div className="mb-12">
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90">
          {zh ? '表單' : 'Form'}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
          {zh ? '開啟 Issue' : 'Open an issue'}
        </h2>
        <div className="hud-panel rounded-2xl p-6">
          <p className="mb-5 font-mono text-xs leading-relaxed text-slate-400">
            {zh ? (
              <>
                狀態：<span className="text-amber-300">此表單會在新分頁開啟 GitHub</span>，不會把
                資料傳送到伺服器。若新分頁未開啟，請改用下方的「開啟 Issue 頁面」按鈕。
              </>
            ) : (
              <>
                Status: <span className="text-amber-300">this form opens GitHub in a new tab</span> —
                it does not send data to a server. If the new tab does not open, use the
                &ldquo;Open the issue page&rdquo; button below.
              </>
            )}
          </p>

          <div className="mb-4">
            <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-slate-200">
              {zh ? '類別' : 'Category'}
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-space-950 px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-cyan-400 sm:max-w-xs"
            >
              <option value="feedback">{zh ? CATEGORY_LABELS.feedback.zh : CATEGORY_LABELS.feedback.en}</option>
              <option value="correction">{zh ? CATEGORY_LABELS.correction.zh : CATEGORY_LABELS.correction.en}</option>
              <option value="technical">{zh ? CATEGORY_LABELS.technical.zh : CATEGORY_LABELS.technical.en}</option>
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-200">
              {zh ? '訊息內容' : 'Message'}
            </label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                zh
                  ? '請描述問題或建議。若是資料更正，請附上頁面網址，若有可能也請提供參考來源。'
                  : 'Describe the issue or suggestion. For data corrections, please include the page URL and, if possible, a reference.'
              }
              className="w-full rounded-lg border border-slate-700 bg-space-950 px-3 py-2.5 text-sm leading-relaxed text-slate-100 outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <a
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 text-sm font-bold text-space-950 shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.02]"
          >
            {zh ? '前往 GitHub 繼續' : 'Continue on GitHub'}{' '}
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
          <a
            href={ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400/60"
          >
            {zh ? '開啟 Issue 頁面' : 'Open the issue page'}
          </a>
        </div>
      </div>

      <RelatedLinks items={['about', 'sources', 'updates', 'privacy', 'faq']} />
    </div>
  );
}


