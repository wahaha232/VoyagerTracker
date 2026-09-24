/**
 * NotFoundPage — /404.html (served by GitHub Pages for unknown URLs).
 * Uses absolute links (pageUrl) because it can be served from any path.
 */

import { pageLabel, pageUrl, type PageKey } from '../constants/site';
import { txt, useLang } from '../components/content';

const LINKS: PageKey[] = ['home', 'voyager-1', 'voyager-2', 'compare', 'mission', 'discoveries', 'tools', 'faq'];

export default function NotFoundPage() {
  const locale = useLang();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-300">404</p>
      <h1 className="neon-text mt-3 text-3xl font-black text-white sm:text-4xl">
        {txt({ en: 'Page not found', zh: '找不到這個頁面', es: 'Página no encontrada' }, locale)}
      </h1>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-300">
        {txt(
          {
            en: 'This address does not exist on Voyager Tracker. It may have been mistyped or moved. Like a signal sent to the wrong part of the sky, it has nowhere to land — but these pages do:',
            zh: '本站沒有這個網址，可能是輸入錯誤或頁面已移動。就像發往錯誤天區的訊號無處可去——不過以下頁面都在：',
            es: 'Esta dirección no existe en el Rastreador Voyager; quizá se escribió mal o se movió. Como una señal enviada a la parte equivocada del cielo, no tiene dónde llegar, pero estas páginas sí:',
          },
          locale,
        )}
      </p>
      <ul className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
        {LINKS.map((key) => (
          <li key={key}>
            <a
              href={pageUrl(key)}
              className="block rounded-xl border border-slate-700/60 bg-space-900/50 px-4 py-3 font-semibold text-slate-100 transition-colors hover:border-cyan-400/60 hover:text-cyan-300"
            >
              {pageLabel(key, locale)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
