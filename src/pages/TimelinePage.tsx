/**
 * TimelinePage — /timeline.html  (EN / 繁中 / Español)
 */

import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, EventList, useEs, useZh } from '../components/content';
import type { Bi } from '../components/content';

const EVENTS: { date: string; label: Bi; text: Bi }[] = [
  { date: '1977 · Aug 20', label: bi('Voyager 2', '航海家二號', 'Voyager 2'), text: bi('Launch from Cape Canaveral, Florida.', '從美國佛羅里達州卡納維爾角發射。', 'Lanzamiento desde Cabo Cañaveral, Florida.') },
  { date: '1977 · Sep 5', label: bi('Voyager 1', '航海家一號', 'Voyager 1'), text: bi('Launch — although launched later, Voyager 1 takes a faster trajectory.', '發射——雖然較晚升空，但航海家一號走的是更快的軌道。', 'Lanzamiento: aunque despegó después, la Voyager 1 sigue una trayectoria más rápida.') },
  { date: '1979 · Mar 5', label: bi('Voyager 1', '航海家一號', 'Voyager 1'), text: bi('Jupiter closest approach; active volcanoes discovered on Io.', '最接近木星；在木衛一（伊奧）上發現活火山。', 'Máximo acercamiento a Júpiter; se descubren volcanes activos en Ío.') },
  { date: '1979 · Jul 9', label: bi('Voyager 2', '航海家二號', 'Voyager 2'), text: bi('Jupiter closest approach.', '最接近木星。', 'Máximo acercamiento a Júpiter.') },
  { date: '1980 · Nov 12', label: bi('Voyager 1', '航海家一號', 'Voyager 1'), text: bi('Saturn and Titan flyby; trajectory bends north out of the ecliptic.', '飛掠土星與泰坦；軌道轉向北方、離開黃道面。', 'Sobrevuelo de Saturno y Titán; la trayectoria se desvía al norte, fuera de la eclíptica.') },
  { date: '1981 · Aug', label: bi('Voyager 2', '航海家二號', 'Voyager 2'), text: bi('Saturn flyby; mission continues toward Uranus.', '飛掠土星；任務繼續前往天王星。', 'Sobrevuelo de Saturno; la misión continúa hacia Urano.') },
  { date: '1986 · Jan 24', label: bi('Voyager 2', '航海家二號', 'Voyager 2'), text: bi('Uranus flyby — the only close encounter with Uranus to date.', '飛掠天王星——迄今唯一一次近距離造訪天王星。', 'Sobrevuelo de Urano — el único encuentro cercano con Urano hasta la fecha.') },
  { date: '1989 · Aug 25', label: bi('Voyager 2', '航海家二號', 'Voyager 2'), text: bi('Neptune flyby — completes the Grand Tour.', '飛掠海王星——完成「大旅行」。', 'Sobrevuelo de Neptuno — completa el Gran Tour.') },
  { date: '1990 · Feb 14', label: bi('Voyager 1', '航海家一號', 'Voyager 1'), text: bi('Pale Blue Dot photograph of Earth from about 6 billion km.', '從約 60 億公里外拍攝地球的「蒼藍小點」照片。', 'Fotografía del \u201cpálido punto azul\u201d de la Tierra desde unos 6 000 millones de km.') },
  { date: '1990', label: bi('Both', '兩艘探測器', 'Ambas'), text: bi('Both spacecraft begin the Voyager Interstellar Mission phase.', '兩艘探測器開始進入「航海家星際任務」階段。', 'Ambas naves inician la fase de la Misión Interestelar Voyager.') },
  { date: '2012 · Aug 25', label: bi('Voyager 1', '航海家一號', 'Voyager 1'), text: bi('Crosses the heliopause and enters interstellar space (~121 AU).', '穿越日球層頂，進入星際空間（約 121 AU）。', 'Cruza la heliopausa y entra al espacio interestelar (~121 UA).') },
  { date: '2018 · Nov 5', label: bi('Voyager 2', '航海家二號', 'Voyager 2'), text: bi('Crosses the heliopause and enters interstellar space (~119 AU).', '穿越日球層頂，進入星際空間（約 119 AU）。', 'Cruza la heliopausa y entra al espacio interestelar (~119 UA).') },
  { date: '2023–2026', label: bi('Program', '任務計畫', 'Programa'), text: bi('Deep-space operations continue; NASA manages the remaining power and instruments of both probes.', '深空任務持續進行；NASA 持續管理兩艘探測器剩餘的電力與儀器。', 'Continúan las operaciones de espacio profundo; la NASA gestiona la energía y los instrumentos restantes.') },
];

export default function TimelinePage() {
  const zh = useZh();
  const es = useEs();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="timeline"
        title={bi('Voyager Mission Timeline', '航海家任務時間軸', 'Cronología de la misión Voyager')}
        intro={bi(
          'The key moments of the Voyager mission, in chronological order, based on NASA/JPL mission records.',
          '以時間順序列出航海家任務的關鍵時刻。內容依據 NASA/JPL 任務紀錄。',
          'Los momentos clave de la misión Voyager, en orden cronológico, según los registros de la misión de NASA/JPL.',
        )}
      />

      <BiSection
        id="timeline"
        kicker={bi('1977 → today', '1977 → 今日', '1977 → hoy')}
        title={bi('Key mission events', '任務重要事件', 'Eventos clave de la misión')}
      >
        <EventList events={EVENTS} />
      </BiSection>

      <BiSection
        id="accuracy"
        kicker={bi('Accuracy', '準確性', 'Precisión')}
        title={bi('A note on these dates', '關於日期的說明', 'Una nota sobre estas fechas')}
      >
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh ? (
            <>
              最接近日期皆以 UTC 表示，並遵循 NASA/JPL 任務紀錄。最新的任務狀態請參考官方{' '}
              <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">NASA 任務頁面</a>。
            </>
          ) : es ? (
            <>
              Las fechas de máximo acercamiento se dan en UTC y siguen los registros de la misión
              de NASA/JPL. Para el estado operativo más reciente, consulta las{' '}
              <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">páginas oficiales de la NASA</a>.
            </>
          ) : (
            <>
              Closest-approach dates are given in UTC and follow NASA/JPL mission records. For the
              most recent operational status, refer to the official{' '}
              <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">NASA mission pages</a>.
            </>
          )}
        </p>
      </BiSection>

      <div className="my-6 rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-5 text-sm leading-relaxed text-emerald-100">
        <p className="mb-1.5 font-semibold text-white">
          {zh ? '對科學感興趣嗎？' : es ? '¿Te interesa la ciencia?' : 'Interested in the science?'}
        </p>
        <p>
          {zh ? (
            <>
              這些相遇事件所帶來的發現，整理在{' '}
              <a href={pageUrl('discoveries')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">科學發現</a>頁。
            </>
          ) : es ? (
            <>
              Los descubrimientos de cada encuentro se resumen en la página de{' '}
              <a href={pageUrl('discoveries')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">Descubrimientos</a>.
            </>
          ) : (
            <>
              The discoveries made at each encounter are summarised on the{' '}
              <a href={pageUrl('discoveries')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">Scientific Discoveries page</a>.
            </>
          )}
        </p>
      </div>

      <RelatedLinks items={['mission', 'voyager-1', 'voyager-2', 'discoveries', 'updates']} />
    </div>
  );
}

