/**
 * FaqPage — /faq.html  (EN / 繁中 / Español)
 *
 * FAQ_ITEMS is also used for the home-page preview and, in English, for
 * the FAQPage JSON-LD (see entry-server.tsx), so the structured data is
 * always identical to the visible answers. Answers that quote numbers are
 * computed from the model at the build date, not at view time, so the
 * static text never pretends to be live.
 */

import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, txt, useLang } from '../components/content';
import type { Bi } from '../components/content';
import { AU_KM, estimate } from '../lib/ephemeris';
import { INSTRUMENT_STATUS_AS_OF } from '../constants/voyagerData';

interface QA {
  q: Bi;
  a: Bi;
}

const AS_OF = __BUILD_DATE__;
const AT = Date.parse(`${AS_OF}T00:00:00Z`);
const v1 = estimate('voyager1', AT);
const v2 = estimate('voyager2', AT);

const n = (value: number, locale: string, digits: number) =>
  new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
/** A figure formatted for each language. */
const f = (value: number, digits: number) => ({ en: n(value, 'en-US', digits), zh: n(value, 'zh-TW', digits), es: n(value, 'es', digits) });

const d1 = { au: f(v1.earthKm / AU_KM, 1), bn: f(v1.earthKm / 1e9, 1), yi: f(v1.earthKm / 1e8, 0), lh: f(v1.lightTimeS / 3600, 1), sun: f(v1.sunKm / AU_KM, 1), v: f(v1.speedSunKmS, 1) };
const d2 = { au: f(v2.earthKm / AU_KM, 1), bn: f(v2.earthKm / 1e9, 1), yi: f(v2.earthKm / 1e8, 0), lh: f(v2.lightTimeS / 3600, 1), sun: f(v2.sunKm / AU_KM, 1), v: f(v2.speedSunKmS, 1) };

export const FAQ_ITEMS: QA[] = [
  {
    q: bi('How far away is Voyager 1?', '航海家一號離我們多遠？', '¿A qué distancia está la Voyager 1?'),
    a: bi(
      `On ${AS_OF}, this site’s model placed Voyager 1 about ${d1.au.en} AU (${d1.bn.en} billion km) from Earth and ${d1.sun.en} AU from the Sun — so far that its radio signals take about ${d1.lh.en} hours to reach us. It moves outward by roughly 3.6 AU a year. NASA expects it to pass one light-day from Earth on 18 November 2026. The tracker on the home page shows the current estimate.`,
      `依本站模型，${AS_OF} 當天航海家一號距地球約 ${d1.au.zh} AU（約 ${d1.yi.zh} 億公里），距太陽約 ${d1.sun.zh} AU——遠到它的無線電訊號要約 ${d1.lh.zh} 小時才能傳到地球。它每年向外移動約 3.6 AU。NASA 預計它將於 2026 年 11 月 18 日來到距地球一光日處。首頁追蹤器會顯示目前的估計值。`,
      `El ${AS_OF}, el modelo de este sitio situaba a la Voyager 1 a unas ${d1.au.es} UA (${d1.bn.es} mil millones de km) de la Tierra y a ${d1.sun.es} UA del Sol: tan lejos que sus señales tardan unas ${d1.lh.es} horas en llegar. Se aleja unas 3,6 UA por año. La NASA prevé que pase a un día-luz de la Tierra el 18 de noviembre de 2026. El rastreador de la portada muestra la estimación actual.`,
    ),
  },
  {
    q: bi('How far away is Voyager 2?', '航海家二號離我們多遠？', '¿A qué distancia está la Voyager 2?'),
    a: bi(
      `On ${AS_OF}, the model placed Voyager 2 about ${d2.au.en} AU (${d2.bn.en} billion km) from Earth and ${d2.sun.en} AU from the Sun, with a one-way signal time of about ${d2.lh.en} hours. It is closer than Voyager 1 because it launched on a slower path to visit four planets, and it recedes by about 3.2 AU a year.`,
      `依本站模型，${AS_OF} 當天航海家二號距地球約 ${d2.au.zh} AU（約 ${d2.yi.zh} 億公里），距太陽約 ${d2.sun.zh} AU，單程訊號時間約 ${d2.lh.zh} 小時。它比航海家一號近，因為它走較慢的路線以造訪四顆行星；它每年遠離約 3.2 AU。`,
      `El ${AS_OF}, el modelo situaba a la Voyager 2 a unas ${d2.au.es} UA (${d2.bn.es} mil millones de km) de la Tierra y a ${d2.sun.es} UA del Sol, con una señal que tarda unas ${d2.lh.es} horas. Está más cerca que la Voyager 1 porque siguió una ruta más lenta para visitar cuatro planetas; se aleja unas 3,2 UA por año.`,
    ),
  },
  {
    q: bi('Are the distances on this site official NASA measurements?', '本站的距離是 NASA 官方量測值嗎？', '¿Las distancias de este sitio son mediciones oficiales de la NASA?'),
    a: bi(
      'No. They are estimates calculated in your browser. The starting point is official — a position and velocity published by NASA/JPL’s Horizons ephemeris service — but the moment-by-moment values are this site’s own calculation, not telemetry received from the spacecraft or a NASA data feed.',
      '不是。它們是在您的瀏覽器中計算出的估計值。起始資料是官方的——NASA/JPL Horizons 星曆服務公布的位置與速度——但每一刻的數值是本站自行計算的結果，而非從探測器接收的遙測或 NASA 的資料串流。',
      'No. Son estimaciones calculadas en tu navegador. El punto de partida es oficial —una posición y velocidad publicadas por el servicio de efemérides Horizons de NASA/JPL—, pero los valores de cada instante son un cálculo propio del sitio, no telemetría de la nave ni un flujo de datos de la NASA.',
    ),
  },
  {
    q: bi('Why does the distance from Earth sometimes get smaller?', '為什麼與地球的距離有時會變小？', '¿Por qué a veces disminuye la distancia a la Tierra?'),
    a: bi(
      'Because Earth moves too. Earth orbits the Sun at about 30 km/s, faster than either Voyager travels. For roughly three months each year Earth’s orbit carries it toward the probes quickly enough that the gap closes a little, even though the probes never stop moving away from the Sun. The distance from the Sun only ever grows.',
      '因為地球也在移動。地球以約 30 公里/秒繞太陽公轉，比兩艘航海家號都快。每年大約有三個月，地球的公轉會以足夠快的速度朝探測器靠近，使兩者距離略為縮小——即使探測器從未停止遠離太陽。與太陽的距離則只會持續增加。',
      'Porque la Tierra también se mueve. Orbita el Sol a unos 30 km/s, más rápido que cualquiera de las Voyager. Durante unos tres meses al año, su órbita la acerca a las sondas lo bastante rápido como para acortar un poco la distancia, aunque las sondas nunca dejan de alejarse del Sol. La distancia al Sol solo crece.',
    ),
  },
  {
    q: bi('How does Voyager Tracker calculate the distances?', '航海家號追蹤器如何計算距離？', '¿Cómo calcula las distancias el Rastreador Voyager?'),
    a: bi(
      'It starts from the position and velocity of each probe on 1 September 2026 as published by JPL Horizons, and projects them forward using the elapsed time and the (very weak) pull of the Sun and planets. Earth’s position comes from a standard astronomical formula. The distance is the straight line between the two positions; light time is that distance divided by the speed of light.',
      '它以 JPL Horizons 公布的 2026 年 9 月 1 日探測器位置與速度為起點，依經過的時間及太陽與行星（非常微弱）的引力向前推算。地球位置則來自標準天文公式。距離是兩個位置之間的直線距離；光行時間則是該距離除以光速。',
      'Parte de la posición y la velocidad de cada sonda el 1 de septiembre de 2026, publicadas por JPL Horizons, y las proyecta con el tiempo transcurrido y la (muy débil) atracción del Sol y los planetas. La posición de la Tierra procede de una fórmula astronómica estándar. La distancia es la línea recta entre ambas posiciones; el tiempo de luz es esa distancia dividida por la velocidad de la luz.',
    ),
  },
  {
    q: bi('Why do the displayed values keep changing?', '為什麼顯示的數值一直在變？', '¿Por qué cambian continuamente los valores?'),
    a: bi(
      'The probes really are moving — Voyager 1 covers about 17 km every second — so the calculation is repeated about ten times per second to show that motion. The page is not downloading new data each time; it is re-running the same calculation for the new moment.',
      '探測器確實在移動——航海家一號每秒前進約 17 公里——因此計算大約每秒重複十次，以呈現這個運動。頁面並不是每次都在下載新資料，而是針對新的時間點重新執行同一個計算。',
      'Las sondas se mueven de verdad —la Voyager 1 recorre unos 17 km por segundo—, así que el cálculo se repite unas diez veces por segundo para mostrarlo. La página no descarga datos nuevos cada vez: vuelve a ejecutar el mismo cálculo para el nuevo instante.',
    ),
  },
  {
    q: bi('How accurate are the estimates?', '估計值有多準確？', '¿Qué precisión tienen las estimaciones?'),
    a: bi(
      'Checked against JPL’s own predicted distances every five days from 2024 to 2031, the Earth distance stays within about 40,000 km — less than 0.0003 AU, or about a tenth of a light-second. That is far smaller than the rounding shown in AU. JPL’s predictions themselves are forecasts for the future, and the model has not been validated outside that period.',
      '與 JPL 自己預測的距離（2024 至 2031 年每五天一筆）比對，地球距離的誤差都在約 4 萬公里以內——不到 0.0003 AU，約十分之一光秒，遠小於以 AU 顯示時的四捨五入程度。JPL 對未來的數值本身也是預測，而本模型在該期間以外尚未驗證。',
      'Comparada con las distancias previstas por JPL cada cinco días entre 2024 y 2031, la distancia a la Tierra se mantiene dentro de unos 40 000 km: menos de 0,0003 UA, alrededor de una décima de segundo-luz, muy por debajo del redondeo en UA. Las predicciones de JPL para el futuro son a su vez pronósticos, y el modelo no se ha validado fuera de ese periodo.',
    ),
  },
  {
    q: bi('Why can the numbers differ from other websites?', '為什麼數字可能和其他網站不同？', '¿Por qué las cifras pueden diferir de otros sitios?'),
    a: bi(
      'Sites may show distance from Earth or from the Sun (they differ by up to about 1 AU), use an older starting date, ignore Earth’s orbital motion, round differently, or measure time slightly differently. A site that simply adds a fixed speed to an old figure can drift by millions of kilometres. Differences of a few hundredths of an AU usually just reflect these choices.',
      '不同網站可能顯示的是與地球或與太陽的距離（兩者最多相差約 1 AU）、採用較舊的起始日期、忽略地球的公轉、四捨五入方式不同，或時間基準略有差異。只把固定速度加到舊數字上的網站，可能累積數百萬公里的偏差。相差百分之幾 AU 通常只反映了這些選擇。',
      'Un sitio puede mostrar la distancia a la Tierra o al Sol (difieren hasta 1 UA), usar una fecha de partida antigua, ignorar el movimiento orbital de la Tierra, redondear distinto o medir el tiempo de otra forma. Uno que solo suma una velocidad fija a una cifra antigua puede desviarse millones de km. Diferencias de unas centésimas de UA suelen reflejar esas elecciones.',
    ),
  },
  {
    q: bi('Are Voyager 1 and Voyager 2 still operating?', '航海家一號與二號還在運作嗎？', '¿Siguen funcionando la Voyager 1 y la Voyager 2?'),
    a: bi(
      `Yes. Both still send data to NASA’s Deep Space Network. Their nuclear power sources lose about 4 watts a year, so NASA has been switching instruments off one by one. According to NASA’s status reports up to ${INSTRUMENT_STATUS_AS_OF}, Voyager 1 still runs its magnetometer and plasma wave instrument, and Voyager 2 runs those two plus its cosmic ray instrument. NASA hopes to keep at least one instrument working into the 2030s.`,
      `是的。兩者都仍在向 NASA 深空網路傳送資料。它們的核能電源每年約減少 4 瓦，因此 NASA 正逐一關閉儀器。根據 NASA 截至 ${INSTRUMENT_STATUS_AS_OF} 的狀態報告，航海家一號仍在運作磁力計與電漿波儀器，航海家二號則還多了宇宙射線儀器。NASA 希望至少讓一項儀器運作到 2030 年代。`,
      `Sí. Ambas siguen enviando datos a la Red de Espacio Profundo de la NASA. Sus fuentes nucleares pierden unos 4 vatios al año, por lo que la NASA apaga instrumentos uno a uno. Según los informes de la NASA hasta el ${INSTRUMENT_STATUS_AS_OF}, la Voyager 1 mantiene su magnetómetro y su instrumento de ondas de plasma, y la Voyager 2 esos dos más el de rayos cósmicos. La NASA espera mantener al menos un instrumento hasta los años 2030.`,
    ),
  },
  {
    q: bi('How fast are the Voyagers travelling?', '航海家號飛得多快？', '¿A qué velocidad viajan las Voyager?'),
    a: bi(
      `Relative to the Sun, about ${d1.v.en} km/s for Voyager 1 and ${d2.v.en} km/s for Voyager 2 (on ${AS_OF}) — roughly 61,000 and 55,000 km/h. No engine is pushing them; they coast on speed gained at launch and from planetary gravity assists, and the Sun slows them by only a few metres per second per year.`,
      `相對太陽，航海家一號約 ${d1.v.zh} 公里/秒，二號約 ${d2.v.zh} 公里/秒（${AS_OF}）——約每小時 61,000 與 55,000 公里。沒有引擎在推動它們；它們靠發射時與行星重力助推獲得的速度滑行，太陽每年只讓它們減速幾公尺/秒。`,
      `Respecto al Sol, unos ${d1.v.es} km/s la Voyager 1 y ${d2.v.es} km/s la Voyager 2 (el ${AS_OF}): unos 61 000 y 55 000 km/h. Ningún motor las empuja; viajan por inercia con la velocidad ganada en el lanzamiento y en asistencias gravitatorias, y el Sol las frena solo unos metros por segundo cada año.`,
    ),
  },
  {
    q: bi('What is interstellar space?', '什麼是星際空間？', '¿Qué es el espacio interestelar?'),
    a: bi(
      'The Sun blows a wind of charged particles that carves a bubble, the heliosphere, in the thin gas between the stars. Its outer boundary is the heliopause. Beyond it, the surrounding plasma comes mostly from other stars rather than the Sun — that region is interstellar space. Voyager 1 crossed at about 122 AU in 2012 and Voyager 2 at about 119 AU in 2018. Both are still well inside the Oort Cloud, the distant shell of icy bodies bound to the Sun.',
      '太陽吹出由帶電粒子組成的太陽風，在恆星之間稀薄的氣體中吹出一個泡泡——日球層。它的外緣叫做日球層頂。越過它之後，周圍的電漿主要來自其他恆星而非太陽——那就是星際空間。航海家一號於 2012 年在約 122 AU 處穿越，二號於 2018 年在約 119 AU 處穿越。兩者仍遠在歐特雲之內，也就是受太陽引力束縛、由冰體構成的遙遠外殼。',
      'El Sol sopla un viento de partículas cargadas que abre una burbuja, la heliosfera, en el gas tenue entre las estrellas. Su borde exterior es la heliopausa. Más allá, el plasma circundante procede sobre todo de otras estrellas: eso es el espacio interestelar. La Voyager 1 lo cruzó a unas 122 UA en 2012 y la Voyager 2 a unas 119 UA en 2018. Ambas siguen muy dentro de la nube de Oort, la lejana capa de cuerpos helados ligados al Sol.',
    ),
  },
  {
    q: bi('Why didn’t Voyager 1 visit Uranus and Neptune?', '為什麼航海家一號沒有造訪天王星與海王星？', '¿Por qué la Voyager 1 no visitó Urano y Neptuno?'),
    a: bi(
      'Scientists chose a close pass of Saturn’s moon Titan, which has a thick atmosphere, over continuing the tour. That flyby bent Voyager 1’s path sharply north out of the planets’ plane, so no further planet was reachable. Voyager 2 kept a trajectory that allowed Uranus and Neptune.',
      '科學家選擇讓它近距離飛掠擁有濃厚大氣的土星衛星泰坦，而放棄繼續行星之旅。那次飛掠把航海家一號的路徑大幅甩向行星軌道面北方，之後再也無法抵達其他行星。航海家二號則保留了能前往天王星與海王星的軌道。',
      'Los científicos prefirieron un paso cercano por Titán, la luna de Saturno con atmósfera densa, en lugar de continuar la gira. Ese sobrevuelo desvió a la Voyager 1 bruscamente al norte del plano de los planetas, y ningún otro planeta quedó a su alcance. La Voyager 2 mantuvo una trayectoria que le permitió Urano y Neptuno.',
    ),
  },
  {
    q: bi('What is the Golden Record?', '什麼是金唱片？', '¿Qué es el Disco de Oro?'),
    a: bi(
      'A 30 cm gold-plated copper phonograph record attached to each Voyager. It holds 115 images, natural sounds, music from many cultures and spoken greetings in 55 languages, plus engraved instructions for playing it — a message about Earth for anyone who might one day find the spacecraft.',
      '固定在每艘航海家號上、直徑 30 公分的鍍金銅質唱片。它收錄 115 張影像、自然聲音、多元文化的音樂與 55 種語言的問候，並刻有播放說明——這是一份關於地球的訊息，留給未來可能發現太空船的任何人。',
      'Un disco fonográfico de cobre chapado en oro, de 30 cm, fijado a cada Voyager. Contiene 115 imágenes, sonidos naturales, música de muchas culturas y saludos en 55 idiomas, además de instrucciones grabadas para reproducirlo: un mensaje sobre la Tierra para quien algún día encuentre la nave.',
    ),
  },
  {
    q: bi('Will the Voyagers ever reach another star?', '航海家號會抵達其他恆星嗎？', '¿Llegarán las Voyager a otra estrella?'),
    a: bi(
      'They are not aimed at any star. NASA estimates that in about 40,000 years Voyager 1 will pass within about 1.6 light-years of the star Gliese 445, and Voyager 2 within about 1.7 light-years of Ross 248 — still enormous distances. After that they will circle the centre of the Milky Way, essentially forever.',
      '它們並非朝向任何恆星飛行。NASA 估計約 4 萬年後，航海家一號將在約 1.6 光年的距離內經過恆星 Gliese 445，航海家二號則在約 1.7 光年內經過 Ross 248——仍是極遠的距離。此後它們將繞著銀河系中心運行，幾乎永遠持續下去。',
      'No se dirigen a ninguna estrella. La NASA estima que dentro de unos 40 000 años la Voyager 1 pasará a unos 1,6 años luz de la estrella Gliese 445, y la Voyager 2 a unos 1,7 años luz de Ross 248: distancias aún enormes. Después orbitarán el centro de la Vía Láctea prácticamente para siempre.',
    ),
  },
  {
    q: bi('Is Voyager Tracker affiliated with NASA?', '航海家號追蹤器與 NASA 有關係嗎？', '¿El Rastreador Voyager está afiliado a la NASA?'),
    a: bi(
      'No. Voyager Tracker is an independent, unofficial educational project. It is not affiliated with, endorsed by, or sponsored by NASA or the Jet Propulsion Laboratory. It uses NASA/JPL’s public data and credits it on every page that relies on it.',
      '沒有。「航海家號追蹤器」是獨立、非官方的教育專案，與 NASA 或噴射推進實驗室沒有任何關聯，也未獲其背書或贊助。本站使用 NASA/JPL 的公開資料，並在每個引用的頁面註明來源。',
      'No. El Rastreador Voyager es un proyecto educativo independiente y no oficial. No está afiliado, respaldado ni patrocinado por la NASA ni por el Jet Propulsion Laboratory. Usa datos públicos de NASA/JPL y los acredita en cada página que se basa en ellos.',
    ),
  },
  {
    q: bi('Where does Voyager Tracker get its information?', '航海家號追蹤器的資訊從哪裡來？', '¿De dónde obtiene su información el Rastreador Voyager?'),
    a: bi(
      'Positions and velocities come from the JPL Horizons system. Mission history, encounter dates and instrument status come from NASA Science and JPL mission pages and the NASA Voyager blog. The Sources page lists which reference supports which part of the site, and the How It Works page documents the calculation.',
      '位置與速度來自 JPL Horizons 系統。任務歷史、飛掠日期與儀器狀態則來自 NASA Science、JPL 的任務頁面與 NASA 航海家部落格。「資料來源」頁列出各部分內容依據哪份資料，「運作原理」頁則記錄計算方式。',
      'Las posiciones y velocidades proceden del sistema Horizons de JPL. La historia, las fechas de encuentros y el estado de los instrumentos, de las páginas de misión de NASA Science y JPL y del blog Voyager de la NASA. La página de Fuentes indica qué referencia respalda cada parte, y Cómo funciona documenta el cálculo.',
    ),
  },
];

export default function FaqPage() {
  const locale = useLang();
  const zh = locale === 'zh-TW';
  const es = locale === 'es';
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="faq"
        title={bi('Voyager Tracker FAQ', '航海家號追蹤器常見問題', 'Preguntas frecuentes')}
        intro={bi(
          `${FAQ_ITEMS.length} questions about the Voyager spacecraft and about how this site’s numbers are produced. Figures quoted in answers were calculated on ${AS_OF}; the trackers show today’s values.`,
          `關於航海家太空船，以及本站數字如何產生的 ${FAQ_ITEMS.length} 個問題。答案中引用的數字計算於 ${AS_OF}；追蹤器則會顯示今天的數值。`,
          `${FAQ_ITEMS.length} preguntas sobre las naves Voyager y sobre cómo se obtienen las cifras de este sitio. Las cifras de las respuestas se calcularon el ${AS_OF}; los rastreadores muestran los valores de hoy.`,
        )}
      />

      <BiSection id="questions" title={bi('Questions and answers', '問題與解答', 'Preguntas y respuestas')}>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <details key={item.q.en} className="group rounded-xl border border-slate-800 bg-space-900/40 open:border-cyan-500/40">
              <summary className="cursor-pointer p-4 font-medium text-slate-100 transition-colors hover:text-cyan-300">
                <span className="mr-2 font-mono text-xs font-bold text-cyan-300">{String(i + 1).padStart(2, '0')}</span>
                {txt(item.q, locale)}
              </summary>
              <p className="border-t border-slate-800 px-4 py-3 text-sm leading-relaxed text-slate-300">{txt(item.a, locale)}</p>
            </details>
          ))}
        </div>
      </BiSection>

      <div className="my-6 rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-5 text-sm leading-relaxed text-emerald-50">
        <p className="mb-1.5 font-semibold text-white">{zh ? '想深入了解？' : es ? '¿Quieres profundizar?' : 'Want the details?'}</p>
        <p>
          {zh ? '計算方式與驗證結果見' : es ? 'El cálculo y su validación están en' : 'The calculation and its validation are on'}{' '}
          <a href={pageUrl('how-it-works')} className="text-emerald-300 underline underline-offset-2 hover:text-emerald-200">
            {zh ? '運作原理' : es ? 'Cómo funciona' : 'How It Works'}
          </a>
          {zh ? '；每份參考資料列於' : es ? '; todas las referencias están en' : '; every reference is listed on'}{' '}
          <a href={pageUrl('sources')} className="text-emerald-300 underline underline-offset-2 hover:text-emerald-200">
            {zh ? '資料來源' : es ? 'Fuentes' : 'Sources'}
          </a>
          {zh ? '；關於本站是誰在經營，請見' : es ? '; y quién está detrás del sitio, en' : '; and who runs this site is explained on'}{' '}
          <a href={pageUrl('about')} className="text-emerald-300 underline underline-offset-2 hover:text-emerald-200">
            {zh ? '關於本站' : es ? 'Acerca de' : 'About'}
          </a>
          {zh ? '。' : '.'}
        </p>
      </div>

      <RelatedLinks items={['tools', 'compare', 'how-it-works', 'sources', 'about']} />
    </div>
  );
}
