/**
 * DiscoveriesPage — /discoveries.html  (EN / 繁中 / Español)
 *
 * Science explained by destination. For each world: which spacecraft,
 * what Voyager saw (by topic), why it mattered, the one idea worth
 * remembering, and the reference used.
 */

import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { ExternalLinkIcon } from '../components/icons';
import { BiArticleHeader, bi, txt, useLang } from '../components/content';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });

interface Topic {
  name: Tri;
  saw: Tri;
  why: Tri;
}
interface World {
  id: string;
  name: Tri;
  when: Tri;
  craft: Tri;
  /** What was known before Voyager arrived. */
  before: Tri;
  topics: Topic[];
  takeaway: Tri;
  source: { label: string; url: string };
}

const WORLDS: World[] = [
  {
    id: 'jupiter',
    name: T('Jupiter', '木星', 'Júpiter'),
    when: T('March and July 1979', '1979 年 3 月與 7 月', 'Marzo y julio de 1979'),
    craft: T('Voyager 1 and Voyager 2', '航海家一號與二號', 'Voyager 1 y Voyager 2'),
    before: T('Pioneer 10 and 11 had flown past in 1973–74, returning the first close images and dangerous radiation readings, but the large moons were still little more than blurry discs with known sizes and orbits.', '先鋒十號與十一號曾在 1973–74 年飛掠，傳回第一批近距離影像與危險的輻射讀數；但各大衛星除了大小與軌道外，仍只是模糊的圓盤。', 'Las Pioneer 10 y 11 habían pasado en 1973–74, con las primeras imágenes cercanas y lecturas de radiación peligrosas, pero las grandes lunas seguían siendo discos borrosos de tamaño y órbita conocidos.'),
    topics: [
      {
        name: T('Atmosphere and storms', '大氣與風暴', 'Atmósfera y tormentas'),
        saw: T('Time-lapse sequences showed the Great Red Spot as a vast storm rotating anticlockwise, with smaller storms and jet streams interacting around it.', '縮時影像顯示大紅斑是一個逆時針旋轉的巨大風暴，周圍還有較小的風暴與噴流彼此交互作用。', 'Secuencias a intervalos mostraron la Gran Mancha Roja como una enorme tormenta que gira en sentido antihorario, rodeada de tormentas menores y corrientes en chorro.'),
        why: T('It turned Jupiter’s weather from a static picture into a system that could be measured and modelled.', '它讓木星的天氣從一張靜態圖片，變成一個可以量測與建立模型的系統。', 'Convirtió el clima de Júpiter de una imagen estática en un sistema que podía medirse y modelarse.'),
      },
      {
        name: T('Moons', '衛星', 'Lunas'),
        saw: T('Io had active volcanoes; Europa a bright, cracked ice shell with few craters; Ganymede and Callisto very different, ancient surfaces.', '木衛一有活火山；木衛二有明亮、龜裂、坑洞極少的冰殼；木衛三與木衛四則各有截然不同的古老表面。', 'Ío tenía volcanes activos; Europa, una corteza de hielo brillante y agrietada con pocos cráteres; Ganímedes y Calisto, superficies antiguas muy distintas.'),
        why: T('Moons turned out to be geologically diverse worlds. Europa’s young surface pointed to a possible ocean underneath — the reason NASA’s Europa Clipper is now on its way.', '衛星原來是地質多樣的世界。木衛二年輕的表面暗示其下可能有海洋——這正是 NASA 歐羅巴快船如今正在前往的原因。', 'Las lunas resultaron ser mundos geológicamente diversos. La superficie joven de Europa apuntaba a un posible océano, razón por la que hoy viaja hacia allí Europa Clipper.'),
      },
      {
        name: T('Rings and magnetic environment', '光環與磁場環境', 'Anillos y entorno magnético'),
        saw: T('A faint, thin ring system was discovered, and the probes flew through an enormous magnetosphere filled with particles, including a doughnut of material from Io.', '發現了暗弱、纖細的環系統，探測器也飛越了充滿粒子的巨大磁層，其中包括由木衛一物質形成的甜甜圈狀環帶。', 'Se descubrió un sistema de anillos tenue y fino, y las sondas cruzaron una enorme magnetosfera llena de partículas, incluido un toro de material de Ío.'),
        why: T('It showed how a planet, its moons and its magnetic field form one connected system.', '它顯示了行星、衛星與磁場如何構成一個相互連結的系統。', 'Mostró cómo un planeta, sus lunas y su campo magnético forman un único sistema conectado.'),
      },
    ],
    takeaway: T('Jupiter’s moons are worlds in their own right — one volcanic, one possibly hiding an ocean.', '木星的衛星本身就是世界——一顆火山活躍，一顆可能藏著海洋。', 'Las lunas de Júpiter son mundos propios: una volcánica y otra que quizá oculta un océano.'),
    source: { label: 'NASA Science — Voyager mission', url: 'https://science.nasa.gov/mission/voyager/' },
  },
  {
    id: 'saturn',
    name: T('Saturn', '土星', 'Saturno'),
    when: T('November 1980 and August 1981', '1980 年 11 月與 1981 年 8 月', 'Noviembre de 1980 y agosto de 1981'),
    craft: T('Voyager 1 and Voyager 2', '航海家一號與二號', 'Voyager 1 y Voyager 2'),
    before: T('Pioneer 11 had passed in 1979 and found the thin F ring. From the ground, astronomers knew Titan had an atmosphere containing methane, but not how thick it was or what lay beneath.', '先鋒十一號曾於 1979 年飛過，發現了細窄的 F 環。從地面觀測，天文學家已知泰坦有含甲烷的大氣，但不知道它有多厚、底下有什麼。', 'La Pioneer 11 había pasado en 1979 y halló el delgado anillo F. Desde tierra se sabía que Titán tenía una atmósfera con metano, pero no su espesor ni qué había debajo.'),
    topics: [
      {
        name: T('Rings', '光環', 'Anillos'),
        saw: T('The broad rings seen from Earth resolved into thousands of narrow ringlets, with gaps, waves, a braided-looking F ring and small “shepherd” moons that confine it.', '從地球看起來寬闊的光環，被解析成數千道細窄的小環，其中有空隙、波紋、看似交織的 F 環，以及約束它的小型「牧羊犬衛星」。', 'Los amplios anillos vistos desde la Tierra se resolvieron en miles de anillos estrechos, con huecos, ondas, un anillo F de aspecto trenzado y pequeñas lunas «pastoras» que lo confinan.'),
        why: T('Rings became a natural laboratory for how gravity shapes discs of particles — physics that also applies to disks around young stars.', '光環成為研究重力如何塑造粒子盤的天然實驗室——這些物理原理同樣適用於年輕恆星周圍的盤面。', 'Los anillos se volvieron un laboratorio natural de cómo la gravedad modela discos de partículas, física que también se aplica a los discos de estrellas jóvenes.'),
      },
      {
        name: T('Titan', '泰坦', 'Titán'),
        saw: T('Voyager 1 found a thick atmosphere, mostly nitrogen, with a surface pressure higher than Earth’s, hidden beneath opaque orange haze.', '航海家一號發現一層以氮氣為主的濃厚大氣，表面氣壓比地球還高，藏在不透明的橘色霧霾之下。', 'La Voyager 1 halló una atmósfera densa, sobre todo de nitrógeno, con una presión en superficie mayor que la terrestre, bajo una neblina naranja opaca.'),
        why: T('Titan’s organic chemistry made it a top target; the Huygens probe landed there in 2005, and NASA’s Dragonfly rotorcraft is planned to follow.', '泰坦的有機化學使它成為首要目標；惠更斯號於 2005 年在那裡著陸，NASA 的蜻蜓號旋翼機也計畫前往。', 'Su química orgánica convirtió a Titán en un objetivo prioritario; la sonda Huygens aterrizó allí en 2005 y está previsto que le siga el helicóptero Dragonfly de la NASA.'),
      },
      {
        name: T('Atmosphere and other moons', '大氣與其他衛星', 'Atmósfera y otras lunas'),
        saw: T('Powerful equatorial winds were measured, and images of moons such as Enceladus showed surprisingly smooth, young terrain.', '量測到強勁的赤道風；恩克拉多斯等衛星的影像則顯示出意外平滑、年輕的地形。', 'Se midieron fuertes vientos ecuatoriales, y las imágenes de lunas como Encélado mostraron terrenos sorprendentemente lisos y jóvenes.'),
        why: T('Enceladus’s young surface was an early clue to the water plumes Cassini later found.', '恩克拉多斯年輕的表面，是卡西尼號後來發現水羽流的早期線索。', 'La superficie joven de Encélado fue una pista temprana de los penachos de agua que luego halló Cassini.'),
      },
    ],
    takeaway: T('Saturn’s rings are intricate and dynamic, and Titan is one of the most Earth-like atmospheres known.', '土星環錯綜複雜且不斷變化，而泰坦擁有已知最像地球的大氣之一。', 'Los anillos de Saturno son intrincados y dinámicos, y Titán tiene una de las atmósferas más parecidas a la terrestre.'),
    source: { label: 'NASA Science — Voyager 1', url: 'https://science.nasa.gov/mission/voyager/voyager-1/' },
  },
  {
    id: 'uranus',
    name: T('Uranus', '天王星', 'Urano'),
    when: T('24 January 1986', '1986 年 1 月 24 日', '24 de enero de 1986'),
    craft: T('Voyager 2 only', '僅航海家二號', 'Solo la Voyager 2'),
    before: T('Uranus was known only through telescopes: five moons, a strongly tilted spin axis, and narrow rings discovered in 1977 when they briefly dimmed a background star. Its day length and magnetic field were unknown.', '天王星只能透過望遠鏡了解：五顆衛星、極度傾斜的自轉軸，以及 1977 年因短暫遮蔽背景恆星而被發現的細窄光環。它一天有多長、有沒有磁場，都還是未知。', 'Urano solo se conocía por telescopio: cinco lunas, un eje muy inclinado y anillos estrechos descubiertos en 1977 al atenuar una estrella de fondo. Se desconocían la duración de su día y su campo magnético.'),
    topics: [
      {
        name: T('Unusual rotation', '特殊的自轉', 'Rotación inusual'),
        saw: T('Uranus spins on its side, tilted about 98°. Voyager 2 measured its rotation period, about 17 hours, from radio emissions.', '天王星側躺著自轉，傾斜約 98°。航海家二號透過無線電輻射量測出它的自轉週期約 17 小時。', 'Urano gira de lado, inclinado unos 98°. La Voyager 2 midió por sus emisiones de radio un periodo de rotación de unas 17 horas.'),
        why: T('A day length is basic data for any planet; for Uranus it could only be pinned down by visiting.', '一天有多長是任何行星的基本資料；對天王星來說，只有親自造訪才能確定。', 'La duración del día es un dato básico de cualquier planeta; en Urano solo pudo fijarse visitándolo.'),
      },
      {
        name: T('Magnetic field', '磁場', 'Campo magnético'),
        saw: T('The field is tilted about 60° from the rotation axis and offset from the planet’s centre, so the magnetosphere twists as the planet turns.', '磁場與自轉軸傾斜約 60°，且偏離行星中心，因此磁層會隨行星自轉而扭轉。', 'El campo está inclinado unos 60° respecto al eje y desplazado del centro, así que la magnetosfera se retuerce al girar el planeta.'),
        why: T('It overturned the idea that planetary magnetic fields are roughly aligned with their spin, and reshaped theories of how such fields are generated.', '它推翻了「行星磁場大致與自轉軸對齊」的想法，也改寫了磁場如何產生的理論。', 'Derribó la idea de que los campos magnéticos planetarios se alinean con la rotación y cambió las teorías sobre su origen.'),
      },
      {
        name: T('Atmosphere, rings and moons', '大氣、光環與衛星', 'Atmósfera, anillos y lunas'),
        saw: T('A hazy, almost featureless atmosphere; two new rings and ten new moons; and the moon Miranda, patched with cliffs and grooves.', '朦朧、幾乎沒有特徵的大氣；兩道新環與十顆新衛星；以及布滿斷崖與溝槽的衛星米蘭達。', 'Una atmósfera brumosa, casi sin rasgos; dos anillos y diez lunas nuevas; y la luna Miranda, llena de acantilados y surcos.'),
        why: T('Miranda’s jumbled surface suggested violent history — and many questions remain open because no probe has returned.', '米蘭達雜亂的地表暗示了激烈的歷史——而由於沒有探測器再次造訪，許多問題至今仍未解答。', 'La superficie caótica de Miranda sugería un pasado violento, y muchas preguntas siguen abiertas porque ninguna sonda ha vuelto.'),
      },
    ],
    takeaway: T('Uranus is a tipped-over world with a tipped-over magnetic field — and we have visited it only once.', '天王星是一個側躺的世界，連磁場也是歪的——而我們只造訪過它一次。', 'Urano es un mundo tumbado con un campo magnético también inclinado, y solo lo hemos visitado una vez.'),
    source: { label: 'NASA Science — Voyager 2', url: 'https://science.nasa.gov/mission/voyager/voyager-2/' },
  },
  {
    id: 'neptune',
    name: T('Neptune', '海王星', 'Neptuno'),
    when: T('25 August 1989', '1989 年 8 月 25 日', '25 de agosto de 1989'),
    craft: T('Voyager 2 only', '僅航海家二號', 'Solo la Voyager 2'),
    before: T('Two moons were known, Triton and Nereid, and observations of stars passing behind Neptune had hinted at partial ring arcs. Almost nothing was known about its weather.', '當時只知道兩顆衛星——海衛一與海衛二；觀測恆星從海王星後方經過時，曾暗示有不完整的環弧。對它的天氣幾乎一無所知。', 'Se conocían dos lunas, Tritón y Nereida, y las estrellas ocultadas por Neptuno sugerían arcos de anillos parciales. Casi nada se sabía de su clima.'),
    topics: [
      {
        name: T('Winds and atmosphere', '風與大氣', 'Vientos y atmósfera'),
        saw: T('Despite receiving little sunlight, Neptune has the fastest winds measured on any planet, over 2,000 km/h, and bright methane-ice clouds.', '儘管接收到的陽光很少，海王星卻有行星上測得最快的風，時速超過 2,000 公里，還有明亮的甲烷冰雲。', 'Pese a recibir poca luz solar, Neptuno tiene los vientos más rápidos medidos en un planeta, más de 2000 km/h, y brillantes nubes de hielo de metano.'),
        why: T('Such energetic weather so far from the Sun means Neptune must have a strong internal heat source.', '在離太陽這麼遠的地方仍有如此劇烈的天氣，代表海王星內部必有強大的熱源。', 'Un clima tan enérgico tan lejos del Sol implica que Neptuno tiene una potente fuente de calor interna.'),
      },
      {
        name: T('The Great Dark Spot', '大暗斑', 'La Gran Mancha Oscura'),
        saw: T('A dark storm roughly the size of Earth, which later telescope observations showed had disappeared within a few years.', '一個大小約與地球相當的黑暗風暴；後來的望遠鏡觀測顯示，它在幾年內就消失了。', 'Una tormenta oscura del tamaño aproximado de la Tierra que, según observaciones posteriores, desapareció en pocos años.'),
        why: T('It showed that Neptune’s storms come and go, unlike Jupiter’s long-lived Great Red Spot.', '它顯示海王星的風暴來去匆匆，不像木星的大紅斑那樣長壽。', 'Mostró que las tormentas de Neptuno aparecen y desaparecen, a diferencia de la longeva Gran Mancha Roja de Júpiter.'),
      },
      {
        name: T('Triton', '海衛一', 'Tritón'),
        saw: T('Neptune’s largest moon orbits backwards, has a young icy surface and showed dark plumes rising several kilometres above it.', '海王星最大的衛星逆向公轉，擁有年輕的冰質表面，還觀測到高達數公里的暗色羽流。', 'La mayor luna de Neptuno orbita al revés, tiene una superficie helada joven y mostró penachos oscuros de varios kilómetros de altura.'),
        why: T('Its backward orbit suggests Triton was captured from the Kuiper Belt, and its activity showed even very cold worlds can be active.', '逆向軌道暗示海衛一是從古柏帶被捕獲的，而它的活動也證明即使極冷的世界也能保持活躍。', 'Su órbita retrógrada sugiere que Tritón fue capturado del cinturón de Kuiper, y su actividad demostró que incluso mundos muy fríos pueden estar activos.'),
      },
    ],
    takeaway: T('The coldest giant planet has the wildest weather, and its big moon is probably a captured visitor.', '最冷的巨行星擁有最狂暴的天氣，而它的大衛星很可能是被捕獲的訪客。', 'El gigante más frío tiene el clima más salvaje, y su gran luna es probablemente una visitante capturada.'),
    source: { label: 'NASA Science — Voyager 2', url: 'https://science.nasa.gov/mission/voyager/voyager-2/' },
  },
  {
    id: 'interstellar',
    name: T('The heliosphere and interstellar space', '日球層與星際空間', 'La heliosfera y el espacio interestelar'),
    when: T('2004 onwards', '2004 年至今', 'Desde 2004'),
    craft: T('Voyager 1 and Voyager 2', '航海家一號與二號', 'Voyager 1 y Voyager 2'),
    before: T('Nobody knew how far the heliosphere extended; published estimates of the heliopause ranged from a few tens to well over a hundred AU, and its boundaries had never been measured directly.', '沒有人知道日球層延伸得多遠；已發表的日球層頂距離估計，從數十 AU 到遠超過一百 AU 都有，而它的邊界也從未被直接量測過。', 'Nadie sabía hasta dónde llegaba la heliosfera; las estimaciones publicadas de la heliopausa iban de unas decenas a más de cien UA, y sus límites nunca se habían medido directamente.'),
    topics: [
      {
        name: T('Termination shock', '終端激波', 'Choque de terminación'),
        saw: T('Voyager 1 (2004, ~94 AU) and Voyager 2 (2007, ~84 AU) detected where the solar wind abruptly slows.', '航海家一號（2004 年，約 94 AU）與二號（2007 年，約 84 AU）偵測到太陽風驟然減速的位置。', 'La Voyager 1 (2004, ~94 UA) y la Voyager 2 (2007, ~84 UA) detectaron dónde se frena bruscamente el viento solar.'),
        why: T('The 10 AU difference showed the heliosphere is lopsided, pushed by the interstellar medium.', '兩者相差 10 AU，顯示日球層受到星際介質推擠而不對稱。', 'La diferencia de 10 UA mostró que la heliosfera es asimétrica, empujada por el medio interestelar.'),
      },
      {
        name: T('The heliopause', '日球層頂', 'La heliopausa'),
        saw: T('At about 122 AU (2012) and 119 AU (2018), solar particles dropped away, galactic cosmic rays rose and plasma density jumped.', '在約 122 AU（2012 年）與 119 AU（2018 年）處，太陽粒子消失、銀河宇宙射線增加，電漿密度也大幅躍升。', 'A unas 122 UA (2012) y 119 UA (2018) desaparecieron las partículas solares, aumentaron los rayos cósmicos galácticos y saltó la densidad del plasma.'),
        why: T('These are the only direct measurements of the Sun’s outer boundary, and the two crossings let scientists compare it in two directions.', '這是對太陽外邊界唯一的直接量測，兩次穿越也讓科學家能比較兩個方向上的邊界。', 'Son las únicas mediciones directas del límite exterior del Sol, y los dos cruces permiten compararlo en dos direcciones.'),
      },
      {
        name: T('Beyond the boundary', '邊界之外', 'Más allá del límite'),
        saw: T('The interstellar plasma is still disturbed by pressure waves from solar activity, and the magnetic field direction changed less than many models expected.', '星際電漿仍會受到太陽活動引起的壓力波擾動，而磁場方向的變化比許多模型預期的小。', 'El plasma interestelar sigue perturbado por ondas de presión de la actividad solar, y la dirección del campo magnético cambió menos de lo que esperaban muchos modelos.'),
        why: T('The Sun’s influence does not simply end at a line; the region just outside is still shaped by it.', '太陽的影響並不是在一條線上戛然而止；邊界外側的區域仍受到它的塑造。', 'La influencia del Sol no termina en una línea: la región justo al otro lado sigue moldeada por él.'),
      },
    ],
    takeaway: T('Voyager is our only direct sample of where the Sun’s bubble ends and the galaxy begins.', '航海家是我們在「太陽泡泡的盡頭、銀河的起點」唯一的直接取樣。', 'Voyager es nuestra única muestra directa de dónde termina la burbuja del Sol y empieza la galaxia.'),
    source: { label: 'JPL — Voyager: The Interstellar Mission', url: 'https://voyager.jpl.nasa.gov/' },
  },
];

export default function DiscoveriesPage() {
  const locale = useLang();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="discoveries"
        title={bi('What Voyager discovered', '航海家的科學發現', 'Qué descubrió Voyager')}
        intro={bi(
          'Voyager’s results are often listed as facts. This page explains them: what the spacecraft actually saw at each world, why it mattered to scientists, and the one idea worth remembering.',
          '航海家的成果常被列成一串事實。本頁則加以解說：探測器在每個世界實際看到了什麼、這對科學家為何重要，以及最值得記住的一個重點。',
          'Los resultados de Voyager suelen listarse como datos. Esta página los explica: qué vieron realmente las naves en cada mundo, por qué importó a los científicos y la idea que merece recordarse.',
        )}
      />

      <nav aria-label={txt(T('Destinations', '目的地', 'Destinos'), locale)} className="mb-10 flex flex-wrap gap-2">
        {WORLDS.map((w) => (
          <a key={w.id} href={`#${w.id}`} className="inline-flex min-h-[36px] items-center rounded-full border border-slate-600 px-3 text-xs font-medium text-slate-200 hover:border-cyan-400 hover:text-white">
            {txt(w.name, locale)}
          </a>
        ))}
      </nav>

      {WORLDS.map((w) => (
        <section key={w.id} id={w.id} className="mb-14 scroll-mt-24">
          <h2 className="text-2xl font-bold tracking-wide text-white sm:text-3xl">{txt(w.name, locale)}</h2>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-cyan-300">
            {txt(w.when, locale)} · {txt(w.craft, locale)}
          </p>
          <div className="mt-4 rounded-xl border border-slate-700/60 bg-space-950/50 p-4 text-sm leading-relaxed">
            <p className="font-mono text-xs uppercase tracking-wider text-amber-200">{txt(T('Before Voyager', '航海家之前', 'Antes de Voyager'), locale)}</p>
            <p className="mt-1 text-slate-300">{txt(w.before, locale)}</p>
          </div>
          <div className="mt-4 space-y-4">
            {w.topics.map((tp) => (
              <article key={tp.name.en} className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
                <h3 className="mb-3 text-lg font-semibold text-white">{txt(tp.name, locale)}</h3>
                <dl className="grid gap-3 text-sm leading-relaxed sm:grid-cols-[150px_1fr]">
                  <dt className="font-mono text-xs uppercase tracking-wider text-cyan-300">{txt(T('What Voyager saw', '航海家看到了什麼', 'Qué vio Voyager'), locale)}</dt>
                  <dd className="text-slate-300">{txt(tp.saw, locale)}</dd>
                  <dt className="font-mono text-xs uppercase tracking-wider text-cyan-300">{txt(T('Why it matters', '為何重要', 'Por qué importa'), locale)}</dt>
                  <dd className="text-slate-300">{txt(tp.why, locale)}</dd>
                </dl>
              </article>
            ))}
          </div>
          <p className="mt-4 rounded-xl border-l-4 border-emerald-400/70 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-50">
            <span className="font-semibold">{txt(T('After Voyager — remember: ', '航海家之後——記住這點：', 'Después de Voyager, para recordar: '), locale)}</span>
            {txt(w.takeaway, locale)}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            {txt(T('Reference', '參考資料', 'Referencia'), locale)}:{' '}
            <a href={w.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-300 underline underline-offset-2">
              {w.source.label} <ExternalLinkIcon className="h-3 w-3" />
            </a>
          </p>
        </section>
      ))}

      <p className="text-sm text-slate-400">
        {txt(T('For how these results fit into today’s science, read', '想了解這些成果與當今科學的關聯，請閱讀', 'Para ver cómo encajan estos resultados en la ciencia actual, lee'), locale)}{' '}
        <a href={pageUrl('why-voyager-matters')} className="text-cyan-300 underline underline-offset-2">
          {txt(T('Why Voyager still matters', '航海家為何至今仍重要', 'Por qué Voyager sigue importando'), locale)}
        </a>
        .
      </p>

      <RelatedLinks items={['timeline', 'why-voyager-matters', 'voyager-2', 'mission', 'golden-record']} />
    </div>
  );
}
