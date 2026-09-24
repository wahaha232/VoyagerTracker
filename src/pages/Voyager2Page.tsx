/**
 * Voyager2Page — /voyager-2.html  (EN / 繁中 / Español)
 */

import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, FactGrid, useEs, useZh } from '../components/content';
import TrackerSection from '../components/TrackerSection';
import { InstrumentStatusList, PageQA, SourcesNote } from '../components/MissionExtras';


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

const QA = [
  {
    q: { en: 'Why is Voyager 2 closer to Earth than Voyager 1?', zh: '為什麼航海家二號比一號離地球近？', es: '¿Por qué la Voyager 2 está más cerca que la Voyager 1?' },
    a: {
      en: 'It launched on a slower trajectory chosen to reach Uranus and Neptune, and its Neptune flyby bent its path south and reduced its speed. It now travels at about 15 km/s compared with Voyager 1’s 17 km/s, so the gap grows by roughly 0.4 AU every year.',
      zh: '它發射時就採用較慢、能抵達天王星與海王星的軌道，而海王星飛掠又把它甩向南方並使其減速。它現在的速度約 15 公里/秒，一號約 17 公里/秒，因此兩者差距每年增加約 0.4 AU。',
      es: 'Despegó en una trayectoria más lenta elegida para llegar a Urano y Neptuno, y el sobrevuelo de Neptuno la desvió al sur y la frenó. Hoy va a unos 15 km/s frente a los 17 km/s de la Voyager 1, así que la distancia entre ambas crece unas 0,4 UA al año.',
    },
  },
  {
    q: { en: 'Why can only one antenna send commands to Voyager 2?', zh: '為什麼只有一座天線能向航海家二號發送指令？', es: '¿Por qué solo una antena puede enviar órdenes a la Voyager 2?' },
    a: {
      en: 'Voyager 2 is far south of the planets’ plane, so it is only visible from the Southern Hemisphere. The one Deep Space Network dish there with a transmitter powerful and compatible enough is the 70-metre antenna near Canberra, Australia.',
      zh: '航海家二號遠在行星軌道面南方，只能從南半球看見。深空網路在南半球唯一具備足夠功率且相容的發射天線，是澳洲坎培拉附近的 70 公尺天線。',
      es: 'La Voyager 2 está muy al sur del plano de los planetas y solo es visible desde el hemisferio sur. La única antena de la Red de Espacio Profundo allí con un transmisor potente y compatible es la de 70 metros cerca de Canberra, Australia.',
    },
  },
  {
    q: { en: 'What did Voyager 2 measure at the heliopause that Voyager 1 could not?', zh: '航海家二號在日球層頂量測到哪些一號做不到的事？', es: '¿Qué midió la Voyager 2 en la heliopausa que la Voyager 1 no pudo?' },
    a: {
      en: 'Its plasma science instrument still worked, so it measured the speed, density and temperature of the solar wind dropping away and the colder, denser interstellar plasma beginning — a direct confirmation of the crossing. Voyager 1’s equivalent instrument had failed in 1980.',
      zh: '它的電漿科學儀仍在運作，因此量測到太陽風的速度、密度與溫度驟降，以及較冷、較密的星際電漿出現——直接證實了穿越事件。航海家一號的同型儀器在 1980 年就已故障。',
      es: 'Su instrumento de ciencia del plasma aún funcionaba, así que midió cómo caían la velocidad, densidad y temperatura del viento solar y empezaba el plasma interestelar, más frío y denso: una confirmación directa del cruce. El de la Voyager 1 había fallado en 1980.',
    },
  },
];

export default function Voyager2Page() {
  const zh = useZh();
  const es = useEs();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="voyager-2"
        title={bi('Voyager 2 — Distance, Speed & Mission Information', '航海家二號——距離、速度與任務資訊', 'Voyager 2: distancia, velocidad e información de la misión')}
        intro={bi(
          'Voyager 2 is the only spacecraft ever to visit Uranus and Neptune. Launched in 1977, it completed the “Grand Tour” of the four giant planets and then sailed on — becoming the second spacecraft to reach interstellar space, in 2018.',
          '航海家二號是唯一造訪過天王星與海王星的太空船。它於 1977 年發射，完成四顆巨行星的「大旅行」後繼續航行——並於 2018 年成為第二艘抵達星際空間的探測器。',
          'La Voyager 2 es la única nave que ha visitado Urano y Neptuno. Lanzada en 1977, completó el “Gran Tour” de los cuatro planetas gigantes y siguió navegando, hasta convertirse en 2018 en la segunda nave en llegar al espacio interestelar.',
        )}
      />

      <TrackerSection
        ids={['voyager2']}
        title={zh ? '航海家二號此刻的計算位置' : es ? 'Voyager 2: posición calculada ahora' : 'Voyager 2 — calculated position right now'}
        intro={
          zh
            ? '航海家二號與地球、太陽的估計距離、速度、訊號延遲與任務時間，以及 NASA 公布的儀器狀態。數值由本站依 JPL Horizons 參考資料計算，並非官方遙測。'
            : es
              ? 'Distancia estimada a la Tierra y al Sol, velocidad, retardo de señal y tiempo de misión de la Voyager 2, más el estado de sus instrumentos según la NASA. Calculado por este sitio con datos de JPL Horizons; no es telemetría oficial.'
              : 'Estimated distance from Earth and the Sun, speed, signal delay and mission time for Voyager 2, plus instrument status as reported by NASA. Calculated by this site from JPL Horizons reference data — not official telemetry.'
        }
        showMap
        showModel
        showGuide={false}
      />

      <BiSection id="what-is-voyager-2" title={bi('What is Voyager 2?', '航海家二號是什麼？', '¿Qué es la Voyager 2?')}>
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh
            ? '航海家二號是航海家一號的孿生探測器。雖然它早了十六天發射，卻走了一條更慢、風景更多的路線——一條能造訪四顆巨行星而不只兩顆的路線。這條路線利用了約每 175 年才出現一次的外行星排列。'
            : es
              ? 'La Voyager 2 es la gemela de la Voyager 1. Aunque despegó dieciséis días antes, tomó una ruta más lenta y pintoresca, que le permitió visitar cuatro planetas gigantes en lugar de dos. Esa ruta aprovechó una alineación de los planetas exteriores que ocurre aproximadamente cada 175 años.'
              : 'Voyager 2 is the twin of Voyager 1. Although it launched sixteen days earlier, it took a slower, more scenic route — one that let it visit four giant planets instead of two. That route exploited an alignment of the outer planets that occurs only about once every 175 years.'}
        </p>
        <p className="mt-3 max-w-4xl leading-relaxed text-slate-300">
          {zh
            ? '它對天王星與海王星的造訪，至今仍是人類對最外兩顆行星唯一的近距離探索。海王星之後，二號轉向太陽系南方，並於 2018 年 11 月 5 日進入星際空間。'
            : es
              ? 'Sus encuentros con Urano y Neptuno siguen siendo la única exploración cercana de los dos planetas más lejanos. Tras Neptuno, la Voyager 2 se dirigió al sur y, el 5 de noviembre de 2018, entró al espacio interestelar.'
              : 'Its encounters with Uranus and Neptune remain the only close-up exploration of the two outermost planets. After Neptune, Voyager 2 curved southward and, on 5 November 2018, crossed into interstellar space.'}
        </p>
      </BiSection>

      <BiSection id="facts" title={bi('Voyager 2 at a glance', '航海家二號速覽', 'Voyager 2 de un vistazo')}>
        <FactGrid items={FACTS} />
      </BiSection>

      <BiSection id="grand-tour" title={bi('Four planets, one spacecraft', '一艘太空船，四顆行星', 'Cuatro planetas, una nave')}>
        <div className="space-y-5">
          {GRAND_TOUR.map((step) => (
            <div key={step.date}>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-300">{step.date}</p>
              <h3 className="mb-1 text-lg font-semibold text-white">{zh ? step.title.zh : es ? step.title.es : step.title.en}</h3>
              <p className="leading-relaxed text-slate-300">{zh ? step.text.zh : es ? step.text.es : step.text.en}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-slate-300">
          <a href={pageUrl('discoveries')} className="text-emerald-300 underline underline-offset-2 hover:text-emerald-200">
            {zh ? '這些飛掠發現了什麼、為何重要 →' : es ? 'Qué descubrieron estos sobrevuelos y por qué importa →' : 'What these flybys discovered and why it mattered →'}
          </a>
        </p>
      </BiSection>

      <BiSection id="instruments" title={bi('Which instruments still work?', '哪些儀器仍在運作？', '¿Qué instrumentos siguen funcionando?')}>
        <p className="mb-4 max-w-4xl leading-relaxed text-slate-300">
          {zh
            ? '航海家二號與一號一樣搭載十項科學儀器。電力每年約減少 4 瓦，NASA 因此依事先議定的順序逐一關閉儀器。2024 年電漿科學儀關閉，2025 年低能量帶電粒子儀也跟著關閉；2026 年的節電改裝則讓剩下的儀器能多運作至少一年。'
            : es
              ? 'Como su gemela, la Voyager 2 lleva diez instrumentos científicos. Su energía cae unos 4 vatios al año, así que la NASA los apaga en un orden acordado de antemano. El de plasma se apagó en 2024 y el de partículas de baja energía en 2025; un cambio de ahorro energético en 2026 da a los restantes al menos un año más.'
              : 'Like its twin, Voyager 2 carries ten science instruments. Its power drops by about 4 watts a year, so NASA switches instruments off in an order agreed years in advance. The plasma instrument was turned off in 2024 and the low-energy particle instrument in 2025; a power-saving change in 2026 bought the remaining ones at least another year.'}
        </p>
        <InstrumentStatusList id="voyager2" />
      </BiSection>

      <BiSection id="golden-record" title={bi('The Golden Record aboard Voyager 2', '航海家二號上的金唱片', 'El Disco de Oro a bordo de la Voyager 2')}>
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh ? (
            <>
              航海家二號攜帶與一號相同的金唱片。由於二號朝不同方向前進，兩張唱片正飛向天空中不同的區域。{' '}
              <a href={pageUrl('golden-record')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">閱讀金唱片的故事 →</a>
            </>
          ) : es ? (
            <>
              La Voyager 2 lleva el mismo Disco de Oro que la 1. Como viaja en otra dirección, los dos discos se dirigen a regiones distintas del cielo.{' '}
              <a href={pageUrl('golden-record')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">Conoce el Disco de Oro →</a>
            </>
          ) : (
            <>
              Voyager 2 carries the same Golden Record as Voyager 1. Because it is heading in a different direction, the two records are travelling toward different parts of the sky.{' '}
              <a href={pageUrl('golden-record')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">Read about the Golden Record →</a>
            </>
          )}
        </p>
      </BiSection>

      <BiSection id="questions" title={bi('Questions about Voyager 2', '關於航海家二號的問題', 'Preguntas sobre la Voyager 2')}>
        <PageQA items={QA} />
      </BiSection>

      <SourcesNote
        links={[
          { label: 'NASA Science — Voyager 2', url: 'https://science.nasa.gov/mission/voyager/voyager-2/' },
          { label: 'NASA — Where are Voyager 1 and Voyager 2 now?', url: 'https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/' },
          { label: 'NASA — Voyager 2 enters interstellar space (2018)', url: 'https://www.nasa.gov/news-release/nasas-voyager-2-probe-enters-interstellar-space/' },
          { label: 'NASA — Engineers help prolong Voyager 2’s science mission (2026)', url: 'https://science.nasa.gov/blogs/voyager/2026/08/04/nasa-engineers-help-prolong-voyager-2s-science-mission/' },
          { label: 'JPL Horizons (trajectory data)', url: 'https://ssd.jpl.nasa.gov/horizons/' },
        ]}
      />

      <RelatedLinks items={['compare', 'voyager-1', 'discoveries', 'timeline', 'tools']} />
    </div>
  );
}
