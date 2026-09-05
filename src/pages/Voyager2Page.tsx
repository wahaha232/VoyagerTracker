/**
 * Voyager2Page — /voyager-2.html  (EN / 繁中 / Español)
 */

import { INSTRUMENT_ES, INSTRUMENT_ZH, SPACECRAFT_META } from '../constants/voyagerData';
import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, FactGrid, useEs, useZh } from '../components/content';
import TrackerSection from '../components/TrackerSection';

const META = SPACECRAFT_META['voyager2'];

const FACTS: { term: { en: string; zh: string; es: string }; detail: { en: string; zh: string; es: string } }[] = [
  {
    term: { en: 'Launch', zh: '發射', es: 'Lanzamiento' },
    detail: { en: '20 August 1977, Cape Canaveral, Florida, USA (Titan IIIE-Centaur).', zh: '1977 年 8 月 20 日，美國佛羅里達州卡納維爾角（泰坦三號E-半人馬火箭）。', es: '20 de agosto de 1977, Cabo Cañaveral, Florida, EE. UU. (Titán IIIE-Centauro).' },
  },
  {
    term: { en: 'Grand Tour', zh: '大旅行', es: 'Gran Tour' },
    detail: { en: 'The only spacecraft to visit all four giant planets: Jupiter, Saturn, Uranus and Neptune.', zh: '唯一造訪全部四顆巨行星（木星、土星、天王星、海王星）的太空船。', es: 'La única nave que ha visitado los cuatro gigantes: Júpiter, Saturno, Urano y Neptuno.' },
  },
  {
    term: { en: 'Jupiter flyby', zh: '木星飛掠', es: 'Sobrevuelo de Júpiter' },
    detail: { en: '9 July 1979.', zh: '1979 年 7 月 9 日。', es: '9 de julio de 1979.' },
  },
  {
    term: { en: 'Saturn flyby', zh: '土星飛掠', es: 'Sobrevuelo de Saturno' },
    detail: { en: 'August 1981 — revealed new detail in the rings and studied Titan\u2019s atmosphere.', zh: '1981 年 8 月——揭露土星環更多細節，並研究泰坦的大氣。', es: 'Agosto de 1981 — reveló nuevos detalles de los anillos y estudió la atmósfera de Titán.' },
  },
  {
    term: { en: 'Uranus flyby', zh: '天王星飛掠', es: 'Sobrevuelo de Urano' },
    detail: { en: '24 January 1986 — still the only close look humanity has had of Uranus.', zh: '1986 年 1 月 24 日——至今人類唯一一次近距離觀測天王星。', es: '24 de enero de 1986 — sigue siendo la única mirada cercana de la humanidad a Urano.' },
  },
  {
    term: { en: 'Neptune flyby', zh: '海王星飛掠', es: 'Sobrevuelo de Neptuno' },
    detail: { en: '25 August 1989 — discovered the Great Dark Spot and Triton\u2019s geysers.', zh: '1989 年 8 月 25 日——發現大暗斑與崔頓的噴泉。', es: '25 de agosto de 1989 — descubrió la Gran Mancha Oscura y los géiseres de Tritón.' },
  },
  {
    term: { en: 'Interstellar space', zh: '進入星際空間', es: 'Espacio interestelar' },
    detail: { en: 'Crossed the heliopause on 5 November 2018.', zh: '2018 年 11 月 5 日穿越日球層頂。', es: 'Cruzó la heliopausa el 5 de noviembre de 2018.' },
  },
];

const GRAND_TOUR: { date: string; title: { en: string; zh: string; es: string }; text: { en: string; zh: string; es: string } }[] = [
  {
    date: '9 Jul 1979',
    title: { en: 'Jupiter', zh: '木星', es: 'Júpiter' },
    text: {
      en: 'Voyager 2 reached Jupiter about four months after Voyager 1, photographing the planet\u2019s turbulent atmosphere and adding detail to the picture its twin had painted.',
      zh: '航海家二號比一號晚了約四個月抵達木星，拍攝行星湍動的大氣，並為孿生探測器所描繪的畫面增添細節。',
      es: 'La Voyager 2 llegó a Júpiter unos cuatro meses después que la 1, fotografiando su turbulenta atmósfera y añadiendo detalle a la imagen de su gemela.',
    },
  },
  {
    date: 'Aug 1981',
    title: { en: 'Saturn', zh: '土星', es: 'Saturno' },
    text: {
      en: 'The flyby confirmed the astonishing complexity of the rings and returned close-up data on Titan\u2019s thick, hazy atmosphere.',
      zh: '這次飛掠證實土星環驚人的複雜性，並回傳了泰坦濃厚煙霧大氣的近距離資料。',
      es: 'El sobrevuelo confirmó la asombrosa complejidad de los anillos y devolvió datos cercanos de la densa atmósfera de Titán.',
    },
  },
  {
    date: '24 Jan 1986',
    title: { en: 'Uranus', zh: '天王星', es: 'Urano' },
    text: {
      en: 'The only close flyby of Uranus in history. It found a tilted magnetic field, discovered ten new moons and imaged Miranda\u2019s bizarre terrain.',
      zh: '史上唯一一次近距離飛掠天王星。它發現歪斜的磁場、找到十顆新衛星，並拍到米蘭達奇異的地形。',
      es: 'El único sobrevuelo cercano de Urano de la historia. Halló un campo magnético inclinado, descubrió diez lunas nuevas y fotografió el extraño terreno de Miranda.',
    },
  },
  {
    date: '25 Aug 1989',
    title: { en: 'Neptune', zh: '海王星', es: 'Neptuno' },
    text: {
      en: 'The final planetary stop: the Great Dark Spot, supersonic winds above 2,000 km/h, faint rings and geyser-like plumes on Triton.',
      zh: '最後一站：大暗斑、超過每小時 2,000 公里的超音速風、暗弱的光環，以及崔頓上的噴泉。',
      es: 'La última parada planetaria: la Gran Mancha Oscura, vientos supersónicos de más de 2 000 km/h, anillos tenues y géiseres en Tritón.',
    },
  },
  {
    date: '5 Nov 2018',
    title: { en: 'Interstellar space', zh: '星際空間', es: 'Espacio interestelar' },
    text: {
      en: 'Voyager 2 crossed the heliopause at about 119 AU. Unlike Voyager 1, its plasma instrument still worked, giving the first direct measurement of interstellar plasma.',
      zh: '航海家二號在約 119 AU 處穿越日球層頂。與一號不同，它的電漿儀仍在運作，因此取得了星際電漿的首份直接量測。',
      es: 'La Voyager 2 cruzó la heliopausa a ~119 UA. A diferencia de la 1, su instrumento de plasma seguía funcionando y dio la primera medición directa del plasma interestelar.',
    },
  },
];

export default function Voyager2Page() {
  const zh = useZh();
  const es = useEs();
  const instMap = zh ? INSTRUMENT_ZH : es ? INSTRUMENT_ES : undefined;
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="voyager-2"
        title={bi('Voyager 2 — Mission, Distance and Current Status', '航海家二號——任務、距離與目前狀態', 'Voyager 2 — misión, distancia y estado actual')}
        intro={bi(
          'Voyager 2 is the only spacecraft ever to visit Uranus and Neptune. Launched in 1977, it completed the \u201cGrand Tour\u201d and then sailed on — becoming the second spacecraft to reach interstellar space in 2018.',
          '航海家二號是唯一造訪過天王星與海王星的太空船。它於 1977 年發射，完成「大旅行」後繼續航行——並於 2018 年成為第二艘抵達星際空間的探測器。',
          'La Voyager 2 es la única nave que ha visitado Urano y Neptuno. Lanzada en 1977, completó el \u201cGran Tour\u201d y siguió navegando — convirtiéndose en 2018 en la segunda nave en llegar al espacio interestelar.',
        )}
      />

      <TrackerSection
        ids={['voyager2']}
        title={zh ? '航海家二號即時追蹤器' : es ? 'Rastreador en vivo de Voyager 2' : 'Voyager 2 Live Tracker'}
        intro={
          zh
            ? '航海家二號與地球、太陽的估計距離、巡航速度與任務現況。這些數值以 NASA/JPL 參考基準計算，並非官方即時遙測。'
            : es
              ? 'Distancia estimada a la Tierra y al Sol, velocidad de crucero y estado de la misión de Voyager 2. Valores calculados a partir de una línea base de referencia de NASA/JPL, no telemetría oficial.'
              : 'Estimated distance from Earth and the Sun, cruising speed and mission status for Voyager 2. Values are calculated from a NASA/JPL-referenced baseline, not live official telemetry.'
        }
        showMap
        showModel
      />

      <BiSection
        id="what-is-voyager-2"
        kicker={bi('Profile', '介紹', 'Perfil')}
        title={bi('What is Voyager 2?', '航海家二號是什麼？', '¿Qué es la Voyager 2?')}
      >
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh
            ? '航海家二號是航海家一號的孿生探測器。雖然它早了十六天發射，卻走了一條更慢、風景更多的路線——一條能造訪四顆巨行星的路線。'
            : es
              ? 'La Voyager 2 es la gemela de la Voyager 1. Aunque despegó dieciséis días antes, tomó una ruta más lenta y pintoresca — una que le permitió visitar cuatro gigantes gaseosos.'
              : 'Voyager 2 is the twin of Voyager 1. Although it launched sixteen days earlier, it took a slower, more scenic route through the solar system — one that let it visit four giant planets instead of two.'}
        </p>
        <p className="mt-3 max-w-4xl leading-relaxed text-slate-300">
          {zh
            ? '它對木星、土星、天王星與海王星的造訪，至今仍是人類對最外兩顆行星唯一的近距離探索。海王星之後，二號轉向太陽系南方，並於 2018 年 11 月 5 日進入星際空間。'
            : es
              ? 'Sus encuentros con Júpiter, Saturno, Urano y Neptuno siguen siendo la única exploración cercana de los dos planetas más lejanos. Tras Neptuno, la Voyager 2 se dirigió al sur y, el 5 de noviembre de 2018, entró al espacio interestelar.'
              : 'Its encounters with Jupiter, Saturn, Uranus and Neptune remain the only close-up exploration of the two outermost planets. After Neptune, Voyager 2 curved southward and, on 5 November 2018, crossed into interstellar space.'}
        </p>
      </BiSection>

      <BiSection
        id="facts"
        kicker={bi('Facts', '重點資料', 'Datos')}
        title={bi('Voyager 2 at a glance', '航海家二號速覽', 'Voyager 2 de un vistazo')}
      >
        <FactGrid items={FACTS} />
      </BiSection>

      <BiSection
        id="grand-tour"
        kicker={bi('The Grand Tour', '大旅行', 'El Gran Tour')}
        title={bi('Four planets, one spacecraft', '一艘太空船，四顆行星', 'Cuatro planetas, una nave')}
      >
        <div className="space-y-5">
          {GRAND_TOUR.map((step) => (
            <div key={step.date}>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">{step.date}</p>
              <h3 className="mb-1 text-lg font-semibold text-white">{zh ? step.title.zh : es ? step.title.es : step.title.en}</h3>
              <p className="leading-relaxed text-slate-300">{zh ? step.text.zh : es ? step.text.es : step.text.en}</p>
            </div>
          ))}
        </div>
      </BiSection>

      <BiSection
        id="instruments"
        kicker={bi('Hardware', '硬體', 'Equipo')}
        title={bi('Science instruments', '科學儀器', 'Instrumentos científicos')}
      >
        <p className="mb-4 max-w-4xl leading-relaxed text-slate-300">
          {zh
            ? '航海家二號搭載與一號相同的十一項儀器。在一號上早期故障的電漿儀，在二號上則持續運作，直接量測到了日球層的邊界：'
            : es
              ? 'La Voyager 2 llevaba la misma dotación de once instrumentos que su gemela. Su instrumento de plasma, que falló pronto en la 1, siguió funcionando y midió directamente el límite de la heliosfera:'
              : 'Voyager 2 carried the same suite of eleven instruments as its twin. Its plasma instrument, which failed early on Voyager 1, kept working long enough to measure the boundary of the heliosphere directly:'}
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {META.instruments.map((inst) => {
            const localInst = instMap ? instMap[inst.code] : undefined;
            return (
              <li key={inst.code} className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
                <p className="font-mono text-xs font-bold text-emerald-300">{inst.code}</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-200">
                  {localInst ? localInst.name : inst.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  {localInst ? localInst.description : inst.description}
                </p>
              </li>
            );
          })}
        </ul>
      </BiSection>

      <BiSection
        id="golden-record"
        kicker={bi('Message in a bottle', '瓶中訊息', 'Mensaje en una botella')}
        title={bi('The Golden Record aboard Voyager 2', '航海家二號上的金唱片', 'El Disco de Oro a bordo de la Voyager 2')}
      >
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh ? (
            <>
              航海家二號攜帶與一號相同的金唱片。由於二號朝不同方向前進，兩張唱片正飛向不同的恆星。{' '}
              <a href={pageUrl('golden-record')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">閱讀金唱片的故事 →</a>
            </>
          ) : es ? (
            <>
              La Voyager 2 lleva el mismo Disco de Oro que la 1. Como viaja en otra dirección, los dos discos se dirigen hacia estrellas distintas.{' '}
              <a href={pageUrl('golden-record')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">Conoce el Disco de Oro →</a>
            </>
          ) : (
            <>
              Voyager 2 carries the same Golden Record as Voyager 1. Because the spacecraft is heading in a different direction, the two records are travelling toward different stars.{' '}
              <a href={pageUrl('golden-record')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">Read about the Golden Record →</a>
            </>
          )}
        </p>
      </BiSection>

      <BiSection
        id="significance"
        kicker={bi('Why it matters', '為什麼重要', 'Por qué importa')}
        title={bi('Voyager 2\u2019s historical significance', '航海家二號的歷史意義', 'La importancia histórica de la Voyager 2')}
      >
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh
            ? '航海家二號是唯一造訪過天王星與海王星的太空船——我們對這兩顆行星的大部分認識，都來自 1980 年代的這次飛掠。而它在太陽系南方測量星際空間的第二幕，則提供了第二組關鍵資料點。'
            : es
              ? 'La Voyager 2 es la única nave que ha visitado Urano y Neptuno, así que gran parte de lo que sabemos de esos planetas viene de un único sobrevuelo en los años 80. Su segunda etapa — medir el espacio interestelar desde el sur — da un segundo punto de datos esencial.'
              : 'Voyager 2 is the only spacecraft to have visited Uranus and Neptune, so much of what we know about those two planets comes from a single flyby in the 1980s. Its second act — measuring interstellar space from a southern trajectory — gives scientists a second data point on the heliosphere.'}
        </p>
        <div className="my-4 rounded-xl border border-amber-400/40 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-100">
          <p className="mb-1.5 font-semibold text-white">
            {zh ? '距離查詢' : es ? 'Consulta de distancia' : 'Distance check'}
          </p>
          <p>
            {zh
              ? '本頁頂端的即時追蹤器會顯示航海家二號目前與地球、太陽的估計距離。'
              : es
                ? 'El rastreador en vivo de esta página muestra la distancia estimada actual de la Voyager 2 a la Tierra y al Sol.'
                : 'The live tracker at the top of this page shows Voyager 2\u2019s current estimated distance from Earth and the Sun.'}
          </p>
        </div>
      </BiSection>

      <RelatedLinks items={['home', 'voyager-1', 'mission', 'timeline', 'discoveries']} />
    </div>
  );
}


