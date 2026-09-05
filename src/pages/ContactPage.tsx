/**
 * ContactPage — /contact.html  (EN / 繁中 / Español)
 *
 * No fake e-mail: feedback goes through the public GitHub issue tracker.
 */

import { useState } from 'react';
import { RelatedLinks } from '../components/ui';
import { ExternalLinkIcon } from '../components/icons';
import { BiArticleHeader, bi, useEs, useZh } from '../components/content';

const REPO_URL = 'https://github.com/wahaha232/VoyagerTracker';
const ISSUES_URL = `${REPO_URL}/issues/new`;

const ISSUE_TITLE_ZH: Record<string, string> = {
  feedback: '網站意見回饋',
  correction: '資料更正請求',
  technical: '技術問題回報',
};
const ISSUE_TITLE_ES: Record<string, string> = {
  feedback: 'Comentarios sobre el sitio',
  correction: 'Solicitud de corrección de datos',
  technical: 'Informe de problema técnico',
};

const CATEGORY_LABELS: Record<string, { en: string; zh: string; es: string }> = {
  feedback: { en: 'Website feedback', zh: '網站意見回饋', es: 'Comentarios sobre el sitio' },
  correction: { en: 'Data correction request', zh: '資料更正請求', es: 'Solicitud de corrección de datos' },
  technical: { en: 'Technical issue report', zh: '技術問題回報', es: 'Informe de problema técnico' },
};

export default function ContactPage() {
  const zh = useZh();
  const es = useEs();
  const [category, setCategory] = useState('feedback');
  const [message, setMessage] = useState('');

  const prefix = zh ? '[航海家號追蹤器]' : es ? '[Rastreador Voyager]' : '[Voyager Tracker]';
  const catTitle = zh ? ISSUE_TITLE_ZH[category] : es ? ISSUE_TITLE_ES[category] : category;
  const title = `${prefix} ${catTitle}`;

  const categoryLabel = CATEGORY_LABELS[category];
  const catLabel = zh ? categoryLabel.zh : es ? categoryLabel.es : categoryLabel.en;

  const issueUrl = `${ISSUES_URL}?title=${encodeURIComponent(title)}&body=${encodeURIComponent(
    `${zh ? '分類：' : es ? 'Categoría: ' : '**Category:**'} ${catLabel}\n\n${message}\n\n---\n_(${zh ? '由航海家號追蹤器的聯絡頁送出。' : es ? 'Enviado desde la página de contacto del Rastreador Voyager.' : 'Submitted from the Voyager Tracker contact page.'})_`,
  )}`;

  const howTitle = zh ? '意見回饋的運作方式' : es ? 'Cómo funcionan los comentarios' : 'How feedback works';
  const howBody = zh
    ? '本站沒有表單後端，因此下方表單本身無法「送出」資料。它會幫您準備好訊息，並開啟一個新的 GitHub Issue（公開可見）。'
    : es
      ? 'Este sitio no tiene backend de formularios, por lo que el formulario no puede \u201cenviar\u201d nada por sí solo. Prepara tu mensaje y abre una nueva incidencia en GitHub (visible públicamente).'
      : 'This website has no form backend, so the form below cannot \u201csend\u201d anything by itself. It prepares a message and opens a new — publicly visible — issue on GitHub.';

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="contact"
        title={bi('Contact & Feedback', '聯絡與意見回饋', 'Contacto y comentarios')}
        intro={bi(
          'Found an error in a figure or date? Have a suggestion? This project has no corporate office or support e-mail — the fastest way to reach us is the public GitHub issue tracker.',
          '發現數字或日期有誤？有任何建議？本專案沒有公司辦公室或客服信箱——最快的聯絡方式，是透過公開的 GitHub Issue 追蹤器。',
          '¿Encontraste un error en una cifra o fecha? ¿Tienes una sugerencia? Este proyecto no tiene oficina ni correo de soporte — la vía más rápida es el rastreador público de incidencias de GitHub.',
        )}
      />

      <div className="my-6 rounded-xl border border-amber-400/40 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-100">
        <p className="mb-1.5 font-semibold text-white">{howTitle}</p>
        <p>{howBody}</p>
      </div>

      <div className="mb-12">
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90">
          {zh ? '選項' : es ? 'Opciones' : 'Options'}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
          {zh ? '如何與本專案聯繫' : es ? 'Formas de contactar' : 'Ways to reach the project'}
        </h2>
        <ul className="max-w-4xl list-disc space-y-2 pl-5 text-slate-300">
          {(
            [
              bi('Report a data problem — wrong distance, date or fact.', '回報資料錯誤——距離、日期或事實有誤。', 'Reporta un problema de datos: distancia, fecha o hecho incorrectos.'),
              bi('Report a technical issue — broken link, layout problem or JavaScript error.', '回報技術問題——壞掉的連結、版面問題或 JavaScript 錯誤。', 'Informa de un problema técnico: enlace roto, problema de diseño o error de JavaScript.'),
              bi('Give feedback — suggestions for new content or tracker improvements.', '提供意見——對新內容或追蹤器改進的建議。', 'Da tu opinión: sugerencias de contenido o mejoras del rastreador.'),
              bi('Corrections about this site.', '關於本站本身的更正。', 'Correcciones sobre este propio sitio.'),
            ]
          ).map((item) => (
            <li key={item.en}>{zh ? item.zh : es ? item.es : item.en}</li>
          ))}
        </ul>
      </div>

      <div className="mb-12">
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90">
          {zh ? '表單' : es ? 'Formulario' : 'Form'}
        </p>
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
          {zh ? '開啟 Issue' : es ? 'Abrir una incidencia' : 'Open an issue'}
        </h2>
        <div className="hud-panel rounded-2xl p-6">
          <p className="mb-5 font-mono text-xs leading-relaxed text-slate-400">
            {zh ? (
              <>
                狀態：<span className="text-amber-300">此表單會在新分頁開啟 GitHub</span>，不會把資料傳送到伺服器。
              </>
            ) : es ? (
              <>
                Estado: <span className="text-amber-300">este formulario abre GitHub en una pestaña nueva</span> — no envía datos a ningún servidor.
              </>
            ) : (
              <>
                Status: <span className="text-amber-300">this form opens GitHub in a new tab</span> — it does not send data to a server.
              </>
            )}
          </p>

          <div className="mb-4">
            <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-slate-200">
              {zh ? '類別' : es ? 'Categoría' : 'Category'}
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-space-950 px-3 py-2.5 text-sm text-slate-100 outline-none transition-colors focus:border-cyan-400 sm:max-w-xs"
            >
              <option value="feedback">{CATEGORY_LABELS.feedback[zh ? 'zh' : es ? 'es' : 'en']}</option>
              <option value="correction">{CATEGORY_LABELS.correction[zh ? 'zh' : es ? 'es' : 'en']}</option>
              <option value="technical">{CATEGORY_LABELS.technical[zh ? 'zh' : es ? 'es' : 'en']}</option>
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-200">
              {zh ? '訊息內容' : es ? 'Mensaje' : 'Message'}
            </label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                zh
                  ? '請描述問題或建議。若是資料更正，請附上頁面網址與參考來源。'
                  : es
                    ? 'Describe el problema o la sugerencia. Para correcciones de datos, incluye la URL de la página y, si es posible, una referencia.'
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
            {zh ? '前往 GitHub 繼續' : es ? 'Continuar en GitHub' : 'Continue on GitHub'}{' '}
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
          <a
            href={ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400/60"
          >
            {zh ? '開啟 Issue 頁面' : es ? 'Abrir la página de incidencias' : 'Open the issue page'}
          </a>
        </div>
      </div>

      <RelatedLinks items={['about', 'sources', 'updates', 'privacy', 'faq']} />
    </div>
  );
}



