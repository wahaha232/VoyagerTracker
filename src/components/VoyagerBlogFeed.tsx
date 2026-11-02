/**
 * VoyagerBlogFeed — the official NASA "Voyager" blog, fetched live.
 *
 * NASA publishes an RSS feed with permissive CORS headers, so the browser
 * can read it directly: whenever NASA posts something new, the next visit
 * (or a refresh / return to the tab) shows it without rebuilding the site.
 * The last response is cached for the browser session so it can be shown
 * instantly while a fresh copy is checked in the background.
 */

import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/context';
import ClientOnly from './ClientOnly';
import { ExternalLinkIcon } from './icons';

export const VOYAGER_BLOG_URL = 'https://science.nasa.gov/blogs/voyager/';
const FEED_URL = 'https://science.nasa.gov/blogs/voyager/feed/';
const CACHE_KEY = 'vt-voyager-blog-v1';
const MAX_POSTS = 5;

type Tri = { en: string; zh: string; es: string };
const pick = (v: Tri, locale: string) => (locale === 'zh-TW' ? v.zh : locale === 'es' ? v.es : v.en);

interface Post {
  title: string;
  link: string;
  date: string;
  summary: string;
}

interface CachedFeed {
  fetchedAt: number;
  posts: Post[];
}

function plainText(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const text = (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
  return text.replace(/\s*The post .*? appeared first on .*?$/i, '').trim();
}

function parseFeed(xmlText: string): Post[] {
  const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('Could not parse the NASA feed');
  return Array.from(doc.querySelectorAll('item'))
    .slice(0, MAX_POSTS)
    .map((item) => {
      const title = item.querySelector('title')?.textContent?.trim() ?? '';
      const link = item.querySelector('link')?.textContent?.trim() ?? '';
      const date = item.querySelector('pubDate')?.textContent?.trim() ?? '';
      const summary = plainText(item.querySelector('description')?.textContent ?? '');
      return {
        title,
        link,
        date,
        summary: summary.length > 260 ? `${summary.slice(0, 257).trimEnd()}…` : summary,
      };
    })
    .filter((post) => post.title && post.link);
}

function readCache(): CachedFeed | null {
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as CachedFeed;
    if (!Array.isArray(value.posts) || value.posts.length === 0) return null;
    return value;
  } catch {
    return null;
  }
}

function writeCache(posts: Post[]) {
  try {
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), posts }));
  } catch {
    // Ignore storage failures (private mode etc.).
  }
}

function formatDate(value: string, locale: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeZone: 'UTC' }).format(date);
}

function Feed() {
  const { locale } = useI18n();
  const [cached] = useState(readCache);
  const [posts, setPosts] = useState<Post[]>(cached?.posts ?? []);
  const [fetchedAt, setFetchedAt] = useState<number | null>(cached?.fetchedAt ?? null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    async function load() {
      setLoading(true);
      setFailed(false);
      try {
        const response = await fetch(FEED_URL, {
          signal: controller.signal,
          cache: reloadKey === 0 ? 'default' : 'no-store',
        });
        if (!response.ok) throw new Error(`NASA feed returned ${response.status}`);
        const next = parseFeed(await response.text());
        if (next.length === 0) throw new Error('NASA feed was empty');
        if (!alive) return;
        setPosts(next);
        setFetchedAt(Date.now());
        writeCache(next);
      } catch (error) {
        if (!alive || (error instanceof Error && error.name === 'AbortError')) return;
        setFailed(true);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
      controller.abort();
    };
  }, [reloadKey]);

  // Returning to the tab checks again when the cached copy is more than 15 minutes old.
  useEffect(() => {
    const onVisible = () => {
      if (!document.hidden && fetchedAt !== null && Date.now() - fetchedAt > 15 * 60 * 1000) {
        setReloadKey((key) => key + 1);
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [fetchedAt]);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
          {fetchedAt
            ? `${pick({ en: 'Checked', zh: '已檢查', es: 'Comprobado' }, locale)} ${new Intl.DateTimeFormat(locale, {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(fetchedAt)}`
            : pick({ en: 'Live NASA feed', zh: 'NASA 即時饋送', es: 'Fuente en vivo de la NASA' }, locale)}
        </p>
        <button
          type="button"
          onClick={() => setReloadKey((key) => key + 1)}
          disabled={loading}
          className="min-h-[36px] rounded-lg border border-cyan-500/30 bg-space-900/70 px-3 text-xs font-semibold text-cyan-200 transition-colors hover:border-cyan-400/60 hover:text-white disabled:cursor-wait disabled:opacity-60"
        >
          {loading
            ? pick({ en: 'Checking…', zh: '檢查中…', es: 'Comprobando…' }, locale)
            : pick({ en: 'Check for new posts', zh: '檢查新文章', es: 'Buscar novedades' }, locale)}
        </button>
      </div>

      {posts.length === 0 && loading && (
        <ul className="space-y-3" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <li key={i} className="animate-pulse rounded-xl border border-slate-800 bg-space-900/40 p-4">
              <div className="h-3 w-24 rounded bg-slate-700/70" />
              <div className="mt-3 h-4 w-3/4 rounded bg-slate-700/70" />
              <div className="mt-2 h-3 w-full rounded bg-slate-800" />
            </li>
          ))}
        </ul>
      )}

      {posts.length === 0 && !loading && failed && (
        <p className="rounded-xl border border-amber-400/40 bg-amber-400/5 p-4 text-sm leading-relaxed text-amber-100">
          {pick(
            {
              en: 'NASA’s feed could not be reached from this browser right now. You can still read the blog directly:',
              zh: '目前無法從這個瀏覽器取得 NASA 的饋送。您仍可直接閱讀官方部落格：',
              es: 'Ahora mismo este navegador no puede acceder a la fuente de la NASA. Puedes leer el blog directamente:',
            },
            locale,
          )}{' '}
          <a href={VOYAGER_BLOG_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline underline-offset-2">
            science.nasa.gov/blogs/voyager
          </a>
        </p>
      )}

      {posts.length > 0 && (
        <ol className="space-y-3">
          {posts.map((post) => (
            <li key={post.link} className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
              <time dateTime={post.date} className="font-mono text-[11px] font-bold uppercase tracking-widest text-cyan-400">
                {formatDate(post.date, locale)} · UTC
              </time>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-start gap-2 text-base font-semibold leading-snug text-slate-100 hover:text-cyan-300"
              >
                {post.title} <ExternalLinkIcon className="mt-1 h-3.5 w-3.5 shrink-0" />
              </a>
              {post.summary && <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{post.summary}</p>}
            </li>
          ))}
        </ol>
      )}

      {posts.length > 0 && failed && (
        <p className="mt-3 text-xs leading-relaxed text-amber-200">
          {pick(
            {
              en: 'Could not refresh just now; showing the last copy this tab fetched.',
              zh: '剛才無法重新整理，顯示此分頁最後取得的版本。',
              es: 'No se pudo actualizar ahora; se muestra la última copia obtenida por esta pestaña.',
            },
            locale,
          )}
        </p>
      )}

      <p className="mt-3 text-xs leading-relaxed text-slate-400">
        {pick(
          {
            en: 'Fetched live from NASA’s Voyager RSS feed. NASA publishes these posts in English.',
            zh: '即時取自 NASA 航海家 RSS 饋送。NASA 以英文發布這些文章。',
            es: 'Obtenido en vivo de la fuente RSS de Voyager de la NASA. La NASA publica estas entradas en inglés.',
          },
          locale,
        )}{' '}
        <a href={VOYAGER_BLOG_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline underline-offset-2">
          {pick({ en: 'Open the NASA blog', zh: '開啟 NASA 部落格', es: 'Abrir el blog de la NASA' }, locale)}
        </a>
      </p>
    </div>
  );
}

export default function VoyagerBlogFeed() {
  const { locale } = useI18n();
  return (
    <ClientOnly
      fallback={
        <p className="rounded-xl border border-slate-800 bg-space-900/40 p-4 text-sm leading-relaxed text-slate-400">
          {pick(
            {
              en: 'The latest NASA Voyager blog posts load in your browser. You can also read them at',
              zh: 'NASA 航海家官方部落格的最新文章會在您的瀏覽器中載入。您也可以直接前往',
              es: 'Las últimas entradas del blog de Voyager de la NASA se cargan en tu navegador. También puedes leerlas en',
            },
            locale,
          )}{' '}
          <a href={VOYAGER_BLOG_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline underline-offset-2">
            science.nasa.gov/blogs/voyager
          </a>
          .
        </p>
      }
    >
      <Feed />
    </ClientOnly>
  );
}
