/**
 * TrackerSection — the calculated-position tracker block.
 *
 * Per-spacecraft cards, the "what these numbers mean" guide, the
 * since-last-visit panel, upcoming milestones, the ecliptic map and
 * (optionally) the 3D model. Live values render only in the browser, so
 * the prerendered HTML never shows stale "frozen" figures.
 */

import { Suspense, lazy } from 'react';
import type { SpacecraftId } from '../types/voyager';
import { SPACECRAFT_META, TRANSLATIONS } from '../constants/voyagerData';
import { useVoyagerLive } from '../hooks/useVoyagerLive';
import { useI18n } from '../i18n/context';
import { pageUrl } from '../constants/site';
import ClientOnly from './ClientOnly';
import Milestones from './Milestones';
import SinceLastVisit from './SinceLastVisit';
import TrackerCard from './TrackerCard';
import VoyagerCanvas from './VoyagerCanvas';

const Voyager3D = lazy(() => import('./Voyager3D'));

interface TrackerSectionProps {
  /** Which spacecraft to show: both (home) or a single probe (voyager pages). */
  ids: SpacecraftId[];
  /** Large heading shown above the tracker. */
  title: string;
  /** Short paragraph under the heading. */
  intro: string;
  /** Show the 2D ecliptic map. */
  showMap?: boolean;
  /** Show the interactive 3D model beside the map. */
  showModel?: boolean;
  /** Show the "what these numbers mean" guide. */
  showGuide?: boolean;
}

type Tri = { en: string; zh: string; es: string };

const GUIDE: { term: Tri; detail: Tri }[] = [
  {
    term: { en: 'Distance from Earth', zh: '與地球的距離', es: 'Distancia a la Tierra' },
    detail: {
      en: 'The straight-line distance between the spacecraft and Earth, calculated from both positions. Because Earth circles the Sun, this number swings by up to about ±0.8 AU over a year — for a few months each year it even shrinks, while Earth moves toward the probe faster than the probe moves away.',
      zh: '探測器與地球之間的直線距離，由兩者的位置計算而得。因為地球繞著太陽轉，這個數字在一年中會有約 ±0.8 AU 的起伏——每年有幾個月甚至會縮小，因為那段期間地球朝探測器移動的速度比探測器遠離的速度更快。',
      es: 'La distancia en línea recta entre la nave y la Tierra, calculada a partir de ambas posiciones. Como la Tierra gira alrededor del Sol, esta cifra oscila hasta unas ±0,8 UA a lo largo del año; durante algunos meses incluso disminuye, porque la Tierra se acerca a la sonda más rápido de lo que la sonda se aleja.',
    },
  },
  {
    term: { en: 'Distance from the Sun', zh: '與太陽的距離', es: 'Distancia al Sol' },
    detail: {
      en: 'The steadier number: it only ever grows. This is the figure scientists use when they talk about the heliosphere and interstellar space.',
      zh: '較穩定的數字：只會持續增加。科學家討論日球層與星際空間時，使用的就是這個距離。',
      es: 'La cifra más estable: solo crece. Es la que usan los científicos al hablar de la heliosfera y el espacio interestelar.',
    },
  },
  {
    term: { en: 'One-way light time', zh: '單程光行時間', es: 'Tiempo de luz (ida)' },
    detail: {
      en: 'How long a radio signal, travelling at the speed of light, needs to cover the Earth distance. A command and its reply take twice as long, which is why the mission team plans every action days in advance.',
      zh: '以光速傳遞的無線電訊號跨越這段地球距離所需的時間。一道指令加上回覆需要兩倍時間，這就是任務團隊必須提前數天規劃每個動作的原因。',
      es: 'Lo que tarda una señal de radio, a la velocidad de la luz, en cubrir la distancia a la Tierra. Una orden y su respuesta tardan el doble; por eso el equipo planifica cada acción con días de antelación.',
    },
  },
  {
    term: { en: 'Speed', zh: '速度', es: 'Velocidad' },
    detail: {
      en: 'Speed relative to the Sun. No engine is pushing: both probes coast on momentum gained at launch and from planetary gravity assists, and the Sun’s pull slows them by only a few metres per second each year. The second line shows how fast the Earth distance is changing today, which includes Earth’s own orbital motion.',
      zh: '相對太陽的速度。沒有引擎在推進：兩艘探測器都靠發射時與行星重力助推獲得的動量滑行，太陽的引力每年只讓它們減速幾公尺/秒。第二行顯示今天與地球距離的變化速率，其中包含地球本身的公轉運動。',
      es: 'Velocidad respecto al Sol. Ningún motor empuja: ambas sondas viajan por inercia gracias al lanzamiento y a las asistencias gravitatorias, y la atracción solar las frena solo unos metros por segundo cada año. La segunda línea muestra cuán rápido cambia hoy la distancia a la Tierra, lo que incluye el propio movimiento orbital terrestre.',
    },
  },
  {
    term: { en: 'Scale', zh: '尺度比較', es: 'Escala' },
    detail: {
      en: 'Neptune, the outermost planet, orbits about 30 AU from the Sun. Comparing with it gives a feel for how far beyond the planets the Voyagers now are.',
      zh: '最外側的行星海王星距太陽約 30 AU。和它比較，可以感受航海家號如今已遠遠飛出行星區域多少。',
      es: 'Neptuno, el planeta más exterior, orbita a unas 30 UA del Sol. Compararse con él da una idea de lo lejos que están ya las Voyager de los planetas.',
    },
  },
  {
    term: { en: 'Where the numbers come from', zh: '數字的來源', es: 'De dónde salen las cifras' },
    detail: {
      en: 'Your browser propagates a NASA/JPL Horizons state vector forward in time about ten times per second. Checked against JPL’s own predictions, the Earth distance agrees to within a few tens of thousands of kilometres — but it is still an estimate, not a measurement received from the spacecraft.',
      zh: '您的瀏覽器以每秒約十次的頻率，將 NASA/JPL Horizons 的狀態向量往前推算。與 JPL 自己的預測比對，地球距離的誤差在數萬公里以內——但這仍是估計值，並非從探測器收到的量測資料。',
      es: 'Tu navegador propaga hacia adelante, unas diez veces por segundo, un vector de estado de NASA/JPL Horizons. Comparada con las predicciones de JPL, la distancia a la Tierra coincide con un margen de unas decenas de miles de km; aun así es una estimación, no una medición enviada por la nave.',
    },
  },
];

const pick = (v: Tri, zh: boolean, es: boolean) => (zh ? v.zh : es ? v.es : v.en);

export default function TrackerSection({
  ids,
  title,
  intro,
  showMap = true,
  showModel = false,
  showGuide = true,
}: TrackerSectionProps) {
  const { locale } = useI18n();
  const zh = locale === 'zh-TW';
  const es = locale === 'es';

  return (
    <section aria-label={title} className="mb-14">
      <div className="mb-5">
        <p className="mb-1 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {zh ? '即時計算 · 估計值' : es ? 'Calculado en tiempo real · estimaciones' : 'Calculated in real time · estimates'}
        </p>
        <h2 className="neon-text text-2xl font-bold tracking-wide text-white sm:text-3xl">{title}</h2>
      </div>
      <p className="mb-6 max-w-4xl leading-relaxed text-slate-300">{intro}</p>

      <ClientOnly
        fallback={
          <div className="hud-panel flex min-h-[360px] items-center justify-center rounded-2xl p-6 text-center">
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              {zh
                ? '正在您的瀏覽器中計算目前位置…（需要啟用 JavaScript）'
                : es
                  ? 'Calculando la posición actual en tu navegador… (requiere JavaScript)'
                  : 'Calculating the current position in your browser… (requires JavaScript)'}
            </p>
          </div>
        }
      >
        <LiveBlock ids={ids} showMap={showMap} showModel={showModel} />
      </ClientOnly>

      {showGuide && (
        <div className="hud-panel mt-8 rounded-2xl p-5 sm:p-6">
          <h3 className="mb-1 text-lg font-bold tracking-wide text-white">
            {zh ? '這些數字代表什麼' : es ? 'Qué significan estas cifras' : 'What these numbers mean'}
          </h3>
          <p className="mb-4 text-sm text-slate-400">
            {zh
              ? '每個數值量測什麼、為什麼會變動，以及該如何解讀。'
              : es
                ? 'Qué mide cada valor, por qué cambia y cómo leerlo.'
                : 'What each value measures, why it changes, and how to read it.'}
          </p>
          <dl className="grid gap-x-6 gap-y-4 md:grid-cols-2">
            {GUIDE.map((item) => (
              <div key={item.term.en} className="border-l-2 border-cyan-500/40 pl-3">
                <dt className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-300">
                  {pick(item.term, zh, es)}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-300">{pick(item.detail, zh, es)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <nav aria-label={zh ? '深入了解這些數字' : es ? 'Explora estas cifras' : 'Explore these numbers'} className="mt-6 flex flex-wrap gap-2">
        {[
          { href: `${pageUrl('tools')}#communication`, label: zh ? '訊號延遲代表什麼？' : es ? '¿Qué significa el retardo de señal?' : 'What does the signal delay mean?' },
          { href: `${pageUrl('compare')}#why-different`, label: zh ? '為什麼一號比較遠？' : es ? '¿Por qué la Voyager 1 está más lejos?' : 'Why is Voyager 1 farther away?' },
          { href: `${pageUrl('tools')}#on-this-date`, label: zh ? '其他日期它們在哪裡？' : es ? '¿Dónde estaban en otra fecha?' : 'Where were they on another date?' },
          { href: `${pageUrl('how-it-works')}#calculation`, label: zh ? '這些數字如何計算？' : es ? '¿Cómo se calculan?' : 'How are these calculated?' },
        ].map((l) => (
          <a key={l.href} href={l.href} className="inline-flex min-h-[36px] items-center rounded-full border border-slate-600 px-3 text-xs font-medium text-slate-200 hover:border-cyan-400 hover:text-white">
            {l.label} →
          </a>
        ))}
      </nav>

      <p className="mt-5 font-mono text-[11px] leading-relaxed tracking-wide text-slate-400">
        {zh ? (
          <>
            本站為獨立專案，數值為計算估計值，並非 NASA 官方遙測。模型、驗證結果與限制請見{' '}
            <a href={pageUrl('how-it-works')} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
              運作原理
            </a>
            。
          </>
        ) : es ? (
          <>
            Proyecto independiente: las cifras son estimaciones calculadas, no telemetría oficial de la NASA. El
            modelo, su validación y sus límites se explican en{' '}
            <a href={pageUrl('how-it-works')} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
              Cómo funciona
            </a>
            .
          </>
        ) : (
          <>
            Independent project: figures are calculated estimates, not official NASA telemetry. The model, its
            validation and its limits are explained on{' '}
            <a href={pageUrl('how-it-works')} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
              How It Works
            </a>
            .
          </>
        )}
      </p>
    </section>
  );
}

/** Everything that depends on the visitor's clock (client-only). */
function LiveBlock({ ids, showMap, showModel }: { ids: SpacecraftId[]; showMap: boolean; showModel: boolean }) {
  const { locale } = useI18n();
  const telemetry = useVoyagerLive();
  const t = TRANSLATIONS[locale];
  const single = ids.length === 1 ? ids[0] : undefined;

  return (
    <>
      <div className={`grid gap-6 ${ids.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {ids.map((id) => (
          <TrackerCard key={id} meta={SPACECRAFT_META[id]} telemetry={telemetry[id]} locale={locale} t={t} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SinceLastVisit />
        <Milestones only={single} />
      </div>

      {showMap && (
        <div className={`mt-8 ${showModel ? 'grid gap-6 lg:grid-cols-2' : ''}`}>
          <div className="min-w-0">
            <h3 className="mb-1 text-lg font-semibold tracking-wide text-white">{t.canvas.title}</h3>
            <p className="mb-3 font-mono text-xs text-slate-400">{t.canvas.subtitle}</p>
            <VoyagerCanvas telemetry={telemetry} locale={locale} t={t} />
          </div>
          {showModel && (
            <div className="min-w-0">
              <h3 className="mb-1 text-lg font-semibold tracking-wide text-white">{t.model.title}</h3>
              <p className="mb-3 font-mono text-xs text-slate-400">{t.model.subtitle}</p>
              <div className="hud-panel relative h-[320px] w-full overflow-hidden rounded-2xl lg:h-[480px]">
                <Suspense fallback={null}>
                  <Voyager3D />
                </Suspense>
                <div className="pointer-events-none absolute bottom-3 left-4 rounded-md border border-cyan-500/20 bg-space-950/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">
                  {t.model.dragHint}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
