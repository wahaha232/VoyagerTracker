/**
 * FaqPage — /faq.html  (EN / 繁中 / Español)
 */

import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, useEs, useZh } from '../components/content';
import type { Bi } from '../components/content';

interface QA {
  q: Bi;
  a: Bi;
}

const Q = (en: string, zh: string, es: string) => bi(en, zh, es);
const A = (en: string, zh: string, es: string) => bi(en, zh, es);

const FAQ_ITEMS: QA[] = [
  {
    q: Q('What is Voyager 1?', '航海家一號是什麼？', '¿Qué es la Voyager 1?'),
    a: A('A NASA spacecraft launched on 5 September 1977. It flew past Jupiter and Saturn and, in 2012, became the first human-made object to enter interstellar space.', '1977 年 9 月 5 日發射的 NASA 太空船。它飛掠過木星與土星，並於 2012 年成為第一個進入星際空間的人造物體。', 'Una nave de la NASA lanzada el 5 de septiembre de 1977. Sobrevoló Júpiter y Saturno y, en 2012, se convirtió en el primer objeto hecho por el ser humano en llegar al espacio interestelar.'),
  },
  {
    q: Q('What is Voyager 2?', '航海家二號是什麼？', '¿Qué es la Voyager 2?'),
    a: A('Voyager 1\u2019s twin, launched on 20 August 1977. It is the only spacecraft to have visited Uranus and Neptune, and it entered interstellar space in 2018.', '航海家一號的孿生探測器，1977 年 8 月 20 日發射。它是唯一造訪過天王星與海王星的太空船，並於 2018 年進入星際空間。', 'La gemela de la Voyager 1, lanzada el 20 de agosto de 1977. Es la única nave que ha visitado Urano y Neptuno, y entró al espacio interestelar en 2018.'),
  },
  {
    q: Q('When were the Voyager spacecraft launched?', '航海家號何時發射？', '¿Cuándo se lanzaron las sondas Voyager?'),
    a: A('Voyager 2 launched first on 20 August 1977, followed by Voyager 1 on 5 September 1977, both from Cape Canaveral, Florida.', '1977 年 8 月 20 日航海家二號先行發射，9 月 5 日航海家一號跟進，兩者皆從美國佛羅里達州卡納維爾角升空。', 'La Voyager 2 despegó primero, el 20 de agosto de 1977; la Voyager 1 le siguió el 5 de septiembre de 1977, ambas desde Cabo Cañaveral, Florida.'),
  },
  {
    q: Q('Which Voyager is farther from Earth?', '哪一艘航海家離地球比較遠？', '¿Cuál Voyager está más lejos de la Tierra?'),
    a: A('Voyager 1. It was placed on a faster trajectory and has been pulling steadily ahead of Voyager 2 for decades.', '航海家一號。它被送入較快的軌道，數十年來已穩定超越航海家二號。', 'La Voyager 1. Siguió una trayectoria más rápida y lleva décadas alejándose más que la Voyager 2.'),
  },
  {
    q: Q('Which Voyager entered interstellar space first?', '哪一艘先進入星際空間？', '¿Cuál Voyager llegó primero al espacio interestelar?'),
    a: A('Voyager 1 crossed the heliopause in 2012; Voyager 2 followed in 2018.', '航海家一號於 2012 年穿越日球層頂；航海家二號則於 2018 年跟進。', 'La Voyager 1 cruzó la heliopausa en 2012; la Voyager 2 lo hizo en 2018.'),
  },
  {
    q: Q('How fast are the Voyager spacecraft traveling?', '航海家號的飛行速度多快？', '¿A qué velocidad viajan las Voyager?'),
    a: A('Relative to the Sun, about 17 km/s for Voyager 1 and about 15 km/s for Voyager 2.', '相對於太陽，航海家一號約 17 公里/秒，二號約 15 公里/秒。', 'Respecto al Sol, unos 17 km/s la Voyager 1 y unos 15 km/s la Voyager 2.'),
  },
  {
    q: Q('Where are Voyager 1 and Voyager 2 now?', '航海家一號與二號現在在哪裡？', '¿Dónde están ahora la Voyager 1 y la 2?'),
    a: A('Both are in interstellar space, travelling in different directions: Voyager 1 toward the north of the solar system\u2019s plane and Voyager 2 toward the south.', '兩者都在星際空間中，朝不同方向前進：航海家一號往太陽系軌道面北方，航海家二號往南方。', 'Ambas están en el espacio interestelar, en direcciones distintas: la Voyager 1 hacia el norte del plano del sistema solar y la Voyager 2 hacia el sur.'),
  },
  {
    q: Q('How far away are the Voyager spacecraft?', '航海家號離我們多遠？', '¿A qué distancia están las Voyager?'),
    a: A('It changes daily. See the live tracker on the home page for the current estimated distance from Earth and the Sun.', '這個數字每天都在變。請到首頁即時追蹤器查看目前與地球、太陽的估計距離。', 'Cambia cada día. Consulta el rastreador en vivo de la portada para ver la distancia estimada actual a la Tierra y al Sol.'),
  },
  {
    q: Q('Are the Voyager spacecraft still communicating with Earth?', '航海家號還在與地球通訊嗎？', '¿Las Voyager siguen comunicándose con la Tierra?'),
    a: A('Yes. Both still return data through NASA\u2019s Deep Space Network, although instruments are powered down over time to manage declining power.', '是的。兩者仍透過 NASA 的深空網路回傳資料，只是會隨著電力下降而逐步關閉儀器。', 'Sí. Ambas siguen enviando datos a través de la Red de Espacio Profundo de la NASA, aunque con el tiempo se apagan instrumentos para gestionar la energía.'),
  },
  {
    q: Q('What is interstellar space?', '什麼是星際空間？', '¿Qué es el espacio interestelar?'),
    a: A('The region beyond the heliosphere where the Sun\u2019s influence fades and the material between the stars dominates.', '日球層以外的區域：太陽的影響逐漸消失，恆星之間的物質開始主導。', 'La región más allá de la heliosfera, donde la influencia del Sol se desvanece y domina la materia entre las estrellas.'),
  },
  {
    q: Q('What is the heliosphere?', '什麼是日球層？', '¿Qué es la heliosfera?'),
    a: A('A bubble of solar wind and magnetic field carved out around the Sun. Its outer edge — the heliopause — is where interstellar space begins.', '太陽風與磁場在太陽周圍形成的氣泡。其外緣「日球層頂」即星際空間的起點。', 'Una burbuja de viento solar y campo magnético alrededor del Sol. Su borde exterior — la heliopausa — es donde comienza el espacio interestelar.'),
  },
  {
    q: Q('What is the Golden Record?', '什麼是金唱片？', '¿Qué es el Disco de Oro?'),
    a: A('A gold-plated phonograph record carried by both Voyagers with images, sounds, music and greetings representing Earth.', '搭載於兩艘航海家號上的鍍金唱片，收錄影像、聲音、音樂與問候，代表地球。', 'Un disco fonográfico chapado en oro que llevan ambas Voyager, con imágenes, sonidos, música y saludos que representan a la Tierra.'),
  },
  {
    q: Q('Why did the two Voyagers take different paths?', '為什麼兩艘航海家號的路線不同？', '¿Por qué tomaron caminos distintos las dos Voyager?'),
    a: A('Voyager 1\u2019s close flyby of Saturn\u2019s moon Titan bent its path north, out of the planets\u2019 plane.', '航海家一號近距離飛掠土星衛星泰坦後，軌道被甩向北方、離開行星軌道面。', 'El sobrevuelo cercano de Titán, luna de Saturno, desvió a la Voyager 1 hacia el norte, fuera del plano de los planetas.'),
  },
  {
    q: Q('How does Voyager Tracker calculate distance?', '航海家號追蹤器如何計算距離？', '¿Cómo calcula las distancias el Rastreador Voyager?'),
    a: A('It takes a published NASA/JPL baseline distance and speed, then projects the distance forward using the elapsed time.', '採用 NASA/JPL 公布的基準距離與速度，再依經過時間向前推估。', 'Toma una distancia y velocidad base publicadas por NASA/JPL y proyecta la distancia con el tiempo transcurrido.'),
  },
  {
    q: Q('Is Voyager Tracker an official NASA website?', '航海家號追蹤器是 NASA 官方網站嗎？', '¿Es el Rastreador Voyager un sitio oficial de la NASA?'),
    a: A('No. Voyager Tracker is an independent educational project and is not affiliated with or endorsed by NASA or JPL.', '不是。它是獨立的教育專案，與 NASA 或 JPL 無關，也未獲其背書。', 'No. El Rastreador Voyager es un proyecto educativo independiente y no está afiliado ni respaldado por NASA o JPL.'),
  },
  {
    q: Q('How often is the information updated?', '資訊多久更新一次？', '¿Cada cuánto se actualiza la información?'),
    a: A('The interpolated counters update about ten times per second in your browser. The baseline is refreshed whenever new official figures are published.', '插值計數器會在你的瀏覽器內每秒更新約十次。底層基準則會在新官方數字公布時更新。', 'Los contadores interpolados se actualizan unas diez veces por segundo en tu navegador. La línea base se renueva cuando se publican nuevas cifras oficiales.'),
  },
  {
    q: Q('Can I share or reuse the content?', '我可以分享或重用這些內容嗎？', '¿Puedo compartir o reutilizar el contenido?'),
    a: A('Yes — this site exists for education. Please link back to it and do not present the figures as official NASA telemetry.', '可以——本站以教育為目的。請附上本站連結，並不要把數字偽裝成 NASA 官方即時遙測。', 'Sí — este sitio existe con fines educativos. Enlaza al sitio y no presentes las cifras como telemetría oficial de la NASA.'),
  },
];

export default function FaqPage() {
  const zh = useZh();
  const es = useEs();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="faq"
        title={bi('Voyager FAQ', '航海家號常見問題', 'Preguntas frecuentes de Voyager')}
        intro={bi(
          'Seventeen honest, plain-language answers about Voyager 1 and Voyager 2.',
          '十七個關於航海家一號與二號的誠實、白話解答。',
          'Diecisiete respuestas honestas y en lenguaje sencillo sobre la Voyager 1 y la Voyager 2.',
        )}
      />

      <BiSection
        id="questions"
        kicker={bi('Questions & answers', '問題與解答', 'Preguntas y respuestas')}
        title={bi('Everything people ask us', '大家常問的問題', 'Lo que la gente nos pregunta')}
      >
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <details key={item.q.en} className="group rounded-xl border border-slate-800 bg-space-900/40 open:border-cyan-500/40">
              <summary className="cursor-pointer list-none p-4 font-medium text-slate-100 transition-colors hover:text-cyan-300">
                <span className="mr-2 font-mono text-xs font-bold text-cyan-400">{String(i + 1).padStart(2, '0')}</span>
                {zh ? item.q.zh : es ? item.q.es : item.q.en}
              </summary>
              <p className="border-t border-slate-800 px-4 py-3 text-sm leading-relaxed text-slate-400">
                {zh ? item.a.zh : es ? item.a.es : item.a.en}
              </p>
            </details>
          ))}
        </div>
      </BiSection>

      <div className="my-6 rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-5 text-sm leading-relaxed text-emerald-100">
        <p className="mb-1.5 font-semibold text-white">
          {zh ? '還有疑問嗎？' : es ? '¿Sigues con dudas?' : 'Still curious?'}
        </p>
        <p>
          {zh ? (
            <>
              想了解更詳細的資料說明，請見{' '}
              <a href={pageUrl('how-it-works')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">資料與計算方法</a>
              頁；本站使用的每份官方參考，都列在{' '}
              <a href={pageUrl('sources')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">資料來源</a>
              頁。
            </>
          ) : es ? (
            <>
              La página de{' '}
              <a href={pageUrl('how-it-works')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">datos y metodología</a>{' '}
              explica los datos con más detalle, y la página de{' '}
              <a href={pageUrl('sources')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">Fuentes</a>{' '}
              enumera todas las referencias oficiales.
            </>
          ) : (
            <>
              The{' '}
              <a href={pageUrl('how-it-works')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">How It Works page</a>{' '}
              explains the data in more detail, and the{' '}
              <a href={pageUrl('sources')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">Sources page</a>{' '}
              lists every official reference used by this site.
            </>
          )}
        </p>
      </div>

      <RelatedLinks items={['voyager-1', 'voyager-2', 'how-it-works', 'about', 'sources']} />
    </div>
  );
}


