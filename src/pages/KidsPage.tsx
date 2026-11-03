/**
 * KidsPage — a warm, illustrated space-adventure storybook.
 *
 * The page keeps every scientific fact from the earlier kids edition but
 * turns it into a story: two friendly Voyager characters, a stop-by-stop
 * journey, colourful discovery cards, the Golden Record, a space dictionary
 * and a real playable quiz with stars and achievements.
 *
 * All theme styles are scoped to #root[data-page="kids"] in kids-theme.css.
 * No external images, no new framework and no changes to the science engine.
 */

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { pageLabel, pageUrl } from '../constants/site';
import { txt, useLang } from '../components/content';
import { LinkArrow } from '../components/icons';
import { RelatedLinks } from '../components/ui';
import KidsQuiz from '../components/kids/KidsQuiz';
import {
  BookIcon,
  GoldenRecordArt,
  HeroScene,
  PlanetEarth,
  PlanetJupiter,
  PlanetNeptune,
  PlanetSaturn,
  PlanetUranus,
  RecordIcon,
  Rocket,
  Sparkle,
  Star,
  Sun,
  VoyagerCharacter,
} from '../components/kids/Art';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });

const HERO = {
  kicker: T('Voyager Tracker · Kids', '航海家號追蹤器 · 兒童版', 'Voyager Tracker · Niños'),
  title: T('Little Space Explorers!', '小小太空探險家！', '¡Pequeños exploradores espaciales!'),
  subtitle: T(
    'Join Voyager 1 and Voyager 2 on a journey to the farthest reaches of space!',
    '跟著航海家一號和航海家二號，一起飛向宇宙最遠的地方！',
    '¡Acompaña a la Voyager 1 y la Voyager 2 hasta los confines del espacio!',
  ),
  intro: T(
    'They left Earth in 1977. They are still flying and sending messages home. Are you ready to explore with them?',
    '它們在 1977 年離開地球，至今仍在飛行、仍在傳訊息回家。你準備好跟她們一起探索了嗎？',
    'Salieron de la Tierra en 1977. Siguen volando y enviando mensajes a casa. ¿Te apetece explorar con ellas?',
  ),
  cta: T('Start the space adventure', '開始太空冒險', 'Empezar la aventura'),
  quiz: T('Play the quiz', '玩小測驗', 'Jugar al cuestionario'),
  badge: T('2 spacecraft · launched in 1977', '2 艘太空船 · 1977 年出發', '2 naves · lanzadas en 1977'),
  age: T('Ages 8–12', '8–12 歲', '8–12 años'),
  scroll: T('Scroll to explore', '往下滑，開始探索', 'Desplázate para explorar'),
  artLabel: T(
    'Cartoon Voyager 1 and Voyager 2 flying past Earth, Jupiter and Saturn',
    '卡通造型的航海家一號與二號飛過地球、木星與土星',
    'La Voyager 1 y la Voyager 2 de dibujos animados volando junto a la Tierra, Júpiter y Saturno',
  ),
};

const CHARACTERS: {
  variant: 'v1' | 'v2';
  name: string;
  title: Tri;
  teaser: Tri;
  details: Tri[];
  fun: Tri;
  tip: Tri;
}[] = [
  {
    variant: 'v1',
    name: 'Voyager 1',
    title: T('The trailblazer', '先鋒探險家', 'La pionera'),
    teaser: T(
      'The first spacecraft to reach interstellar space.',
      '第一艘進入星際空間的太空船。',
      'La primera nave en llegar al espacio interestelar.',
    ),
    details: [
      T('Launched on 5 September 1977.', '1977 年 9 月 5 日發射。', 'Lanzada el 5 de septiembre de 1977.'),
      T(
        'Flew past Jupiter in 1979 and Saturn in 1980.',
        '1979 年飛掠木星，1980 年飛掠土星。',
        'Pasó junto a Júpiter en 1979 y Saturno en 1980.',
      ),
      T('Entered interstellar space in 2012.', '2012 年進入星際空間。', 'Entró en el espacio interestelar en 2012.'),
      T(
        'In November 2026 it is one light-day from Earth.',
        '2026 年 11 月，它距地球一光日。',
        'En noviembre de 2026 está a un día-luz de la Tierra.',
      ),
    ],
    fun: T(
      'It discovered volcanoes erupting on Jupiter’s moon Io.',
      '它發現木星衛星木衛一上有火山正在噴發。',
      'Descubrió volcanes en erupción en Ío, una luna de Júpiter.',
    ),
    tip: T('Tap to meet Voyager 1', '點一下認識航海家一號', 'Toca para conocer a la Voyager 1'),
  },
  {
    variant: 'v2',
    name: 'Voyager 2',
    title: T('The grand tourist', '行星大旅行家', 'La gran viajera'),
    teaser: T(
      'The only spacecraft to visit Uranus and Neptune.',
      '唯一造訪天王星與海王星的太空船。',
      'La única nave que visitó Urano y Neptuno.',
    ),
    details: [
      T('Launched on 20 August 1977.', '1977 年 8 月 20 日發射。', 'Lanzada el 20 de agosto de 1977.'),
      T(
        'Visited Jupiter, Saturn, Uranus and Neptune.',
        '造訪了木星、土星、天王星與海王星。',
        'Visitó Júpiter, Saturno, Urano y Neptuno.',
      ),
      T('Entered interstellar space in 2018.', '2018 年進入星際空間。', 'Entró en el espacio interestelar en 2018.'),
      T(
        'It is now flying south of the planets.',
        '它現在朝行星軌道面的南方飛行。',
        'Ahora vuela al sur de los planetas.',
      ),
    ],
    fun: T(
      'It found geysers on Neptune’s moon Triton.',
      '它發現海王星衛星海衛一上有間歇泉。',
      'Encontró géiseres en Tritón, una luna de Neptuno.',
    ),
    tip: T('Tap to meet Voyager 2', '點一下認識航海家二號', 'Toca para conocer a la Voyager 2'),
  },
];

type JourneyArtKind = 'rocket' | 'jupiter' | 'saturn' | 'ice' | 'earth' | 'stars' | 'light';
type FactArtKind = 'sound' | 'rocket' | 'sun' | 'record' | 'signal';

const JOURNEY: {
  tone: string;
  year: Tri;
  title: Tri;
  teaser: Tri;
  story: Tri;
  fact: Tri;
  art: JourneyArtKind;
}[] = [
  {
    tone: 'sky',
    year: T('1977', '1977', '1977'),
    title: T('Blast off!', '出發！', '¡Despegue!'),
    teaser: T('Two spacecraft leave Earth.', '兩艘太空船離開地球。', 'Dos naves salen de la Tierra.'),
    story: T(
      'Voyager 2 launches on 20 August 1977. Voyager 1 follows on 5 September. Voyager 1 takes a faster path and reaches Jupiter first.',
      '航海家二號在 1977 年 8 月 20 日發射，航海家一號在 9 月 5 日跟進。航海家一號走得更快，先抵達木星。',
      'La Voyager 2 despega el 20 de agosto de 1977. La Voyager 1 la sigue el 5 de septiembre. La Voyager 1 toma un camino más rápido y llega antes a Júpiter.',
    ),
    fact: T(
      'Both carry a Golden Record and a nuclear power source.',
      '兩艘都帶著金唱片與核能電池。',
      'Ambas llevan un Disco de Oro y una fuente de energía nuclear.',
    ),
    art: 'rocket',
  },
  {
    tone: 'amber',
    year: T('1979', '1979', '1979'),
    title: T('Hello, Jupiter!', '遇見木星！', '¡Hola, Júpiter!'),
    teaser: T('The first giant planet.', '第一顆巨行星。', 'El primer planeta gigante.'),
    story: T(
      'Both spacecraft fly past Jupiter. Voyager 1 spots volcanoes erupting on the moon Io.',
      '兩艘太空船都飛掠木星。航海家一號看到衛星木衛一上有火山正在噴發。',
      'Las dos naves pasan junto a Júpiter. La Voyager 1 ve volcanes en erupción en la luna Ío.',
    ),
    fact: T(
      'Io’s volcanoes were the first active volcanoes found beyond Earth.',
      '木衛一的火山是地球以外首次發現的活火山。',
      'Los volcanes de Ío fueron los primeros volcanes activos hallados fuera de la Tierra.',
    ),
    art: 'jupiter',
  },
  {
    tone: 'gold',
    year: T('1980–1981', '1980–1981', '1980–1981'),
    title: T('The ringed planet', '土星環的秘密', 'El planeta de los anillos'),
    teaser: T('Saturn’s beautiful rings.', '土星美麗的光環。', 'Los hermosos anillos de Saturno.'),
    story: T(
      'Voyager 1 reaches Saturn in 1980. Voyager 2 arrives in 1981. They study the rings and Titan.',
      '航海家一號在 1980 年抵達土星，航海家二號在 1981 年到達。它們研究土星環與土衛六。',
      'La Voyager 1 llega a Saturno en 1980. La Voyager 2 llega en 1981. Estudian los anillos y Titán.',
    ),
    fact: T(
      'The rings are thousands of narrow ringlets, not one solid ring.',
      '土星環由數千道細窄的小環組成，不是一個實心圓環。',
      'Los anillos son miles de anillos estrechos, no uno solo y macizo.',
    ),
    art: 'saturn',
  },
  {
    tone: 'mint',
    year: T('1986–1989', '1986–1989', '1986–1989'),
    title: T('The ice giants', '冰巨行星', 'Los gigantes de hielo'),
    teaser: T('Only Voyager 2 goes on.', '只有航海家二號繼續前進。', 'Solo la Voyager 2 sigue adelante.'),
    story: T(
      'Voyager 2 visits Uranus in 1986 and Neptune in 1989. No other spacecraft has been back since.',
      '航海家二號在 1986 年造訪天王星，1989 年造訪海王星。之後再也沒有其他太空船去過。',
      'La Voyager 2 visita Urano en 1986 y Neptuno en 1989. Ninguna otra nave ha vuelto desde entonces.',
    ),
    fact: T(
      'Voyager 2 is the only spacecraft ever to visit Uranus and Neptune.',
      '航海家二號是史上唯一造訪天王星與海王星的太空船。',
      'La Voyager 2 es la única nave que ha visitado Urano y Neptuno.',
    ),
    art: 'ice',
  },
  {
    tone: 'blue',
    year: T('1990', '1990', '1990'),
    title: T('Look back home', '回頭看看家', 'Mira hacia casa'),
    teaser: T('The Pale Blue Dot photo.', '蒼藍小點的照片。', 'La foto del pálido punto azul.'),
    story: T(
      'Voyager 1 turns its camera back toward Earth and takes a photo from far away.',
      '航海家一號把相機轉回地球，從很遠的地方拍下一張照片。',
      'La Voyager 1 gira su cámara hacia la Tierra y toma una foto desde muy lejos.',
    ),
    fact: T(
      'Our whole world looked like a tiny blue dot.',
      '我們整個世界看起來就像一粒小小的藍點。',
      'Todo nuestro mundo parecía un pequeño punto azul.',
    ),
    art: 'earth',
  },
  {
    tone: 'purple',
    year: T('2012 / 2018', '2012 / 2018', '2012 / 2018'),
    title: T('Into interstellar space', '飛進星際空間', 'Hacia el espacio interestelar'),
    teaser: T('Beyond the Sun’s bubble.', '飛出太陽泡泡。', 'Más allá de la burbuja del Sol.'),
    story: T(
      'Voyager 1 enters interstellar space in 2012. Voyager 2 follows in 2018.',
      '航海家一號在 2012 年進入星際空間，航海家二號在 2018 年跟進。',
      'La Voyager 1 entra en el espacio interestelar en 2012. La Voyager 2 la sigue en 2018.',
    ),
    fact: T(
      'They are now flying through the space between the stars.',
      '它們現在正飛越星星之間的空間。',
      'Ahora vuelan por el espacio entre las estrellas.',
    ),
    art: 'stars',
  },
  {
    tone: 'coral',
    year: T('2026', '2026', '2026'),
    title: T('One light-day!', '抵達一光日！', '¡Un día-luz!'),
    teaser: T('The farthest milestone yet.', '目前最遠的里程碑。', 'El hito más lejano hasta ahora.'),
    story: T(
      'On 18 November 2026, Voyager 1 is one light-day from Earth.',
      '2026 年 11 月 18 日，航海家一號距地球一光日。',
      'El 18 de noviembre de 2026, la Voyager 1 está a un día-luz de la Tierra.',
    ),
    fact: T(
      'That is 25.9 billion km. Light takes 24 hours to travel that far.',
      '那是 259 億公里。光要走 24 小時才能到那麼遠。',
      'Son 25 900 millones de km. La luz tarda 24 horas en recorrer esa distancia.',
    ),
    art: 'light',
  },
];

const FACTS: { tone: string; q: Tri; a: Tri; art: FactArtKind }[] = [
  {
    tone: 'sky',
    q: T('Is there sound in space?', '太空中有聲音嗎？', '¿Hay sonido en el espacio?'),
    a: T(
      'Not like on Earth. Space is mostly empty. Voyager can sense plasma waves, and scientists turn them into sounds we can hear.',
      '不像在地球上。太空幾乎是空的。航海家可以感測電漿波，科學家再把它們轉成我們聽得見的聲音。',
      'No como en la Tierra. El espacio está casi vacío. La Voyager detecta ondas de plasma y los científicos las convierten en sonidos que podemos oír.',
    ),
    art: 'sound',
  },
  {
    tone: 'amber',
    q: T('Why do they keep flying outward?', '它們為什麼一直往外飛？', '¿Por qué siguen volando hacia fuera?'),
    a: T(
      'They used the planets’ gravity to speed up and change direction. They do not have enough fuel to turn around.',
      '它們利用行星的重力加速與改變方向。它們沒有足夠的燃料可以掉頭。',
      'Usaron la gravedad de los planetas para acelerar y cambiar de dirección. No tienen suficiente combustible para dar la vuelta.',
    ),
    art: 'rocket',
  },
  {
    tone: 'gold',
    q: T('How far is one light-day?', '一光日有多遠？', '¿Cuánto es un día-luz?'),
    a: T(
      '25.9 billion km — the distance light travels in 24 hours. Walking 5 km a day, it would take about 14 million years.',
      '259 億公里——光在 24 小時內走的距離。如果每天走 5 公里，要走約 1400 萬年。',
      '25 900 millones de km: la distancia que recorre la luz en 24 horas. Si caminaras 5 km al día, tardarías unos 14 millones de años.',
    ),
    art: 'sun',
  },
  {
    tone: 'pink',
    q: T('What do they carry for the stars?', '它們帶了什麼給星星？', '¿Qué llevan para las estrellas?'),
    a: T(
      'A Golden Record with music, greetings in 55 languages and sounds of Earth.',
      '一張金唱片，裡面有音樂、55 種語言的問候，以及地球的聲音。',
      'Un Disco de Oro con música, saludos en 55 idiomas y sonidos de la Tierra.',
    ),
    art: 'record',
  },
  {
    tone: 'blue',
    q: T('How fast is light?', '光有多快？', '¿Qué tan rápida es la luz?'),
    a: T(
      'Light travels about 300,000 km in one second — nothing in the universe travels faster. It takes 1.3 seconds to reach the Moon and about 8 minutes 20 seconds to reach the Sun.',
      '光在一秒內約走 30 萬公里——宇宙中沒有比光更快的東西。到月球只需 1.3 秒，到太陽約需 8 分 20 秒。',
      'La luz recorre unos 300 000 km en un segundo; nada en el universo viaja más rápido. Tarda 1,3 segundos en llegar a la Luna y unos 8 minutos 20 segundos en llegar al Sol.',
    ),
    art: 'sun',
  },
  {
    tone: 'mint',
    q: T('How long does a signal take to Voyager 1?', '訊號到航海家一號要多久？', '¿Cuánto tarda una señal en llegar a la Voyager 1?'),
    a: T(
      'About 24 hours one way in November 2026 — and about 48 hours for a reply.',
      '2026 年 11 月，訊號單程約需 24 小時——來回約 48 小時。',
      'En noviembre de 2026, unas 24 horas de ida y unas 48 horas para una respuesta.',
    ),
    art: 'signal',
  },
];

const RECORD_CONTENTS: Tri[] = [
  T('Music from Earth', '地球的音樂', 'Música de la Tierra'),
  T('Greetings in 55 languages', '55 種語言的問候', 'Saludos en 55 idiomas'),
  T('Sounds of Earth: thunder, birds, a heartbeat', '地球的聲音：雷聲、鳥鳴、心跳', 'Sonidos de la Tierra: truenos, pájaros, un latido'),
  T(
    'A cover with picture instructions for playing it',
    '用圖畫說明怎麼播放的封套',
    'Una cubierta con instrucciones en dibujos para reproducirlo',
  ),
];

const GLOSSARY: { term: Tri; meaning: Tri }[] = [
  {
    term: T('Spacecraft', '太空船', 'Nave espacial'),
    meaning: T('A machine that travels in space.', '在太空旅行的機器。', 'Una máquina que viaja por el espacio.'),
  },
  {
    term: T('Light-day', '光日', 'Día-luz'),
    meaning: T(
      'The distance light travels in 24 hours — about 25.9 billion km.',
      '光在 24 小時內走的距離，約 259 億公里。',
      'La distancia que recorre la luz en 24 horas: unos 25 900 millones de km.',
    ),
  },
  {
    term: T('Interstellar space', '星際空間', 'Espacio interestelar'),
    meaning: T('The space between the stars.', '星星之間的空間。', 'El espacio entre las estrellas.'),
  },
  {
    term: T('Heliosphere', '日球層', 'Heliosfera'),
    meaning: T(
      'A giant bubble made by the Sun’s particles and magnetic field.',
      '太陽粒子與磁場形成的巨大泡泡。',
      'Una burbuja gigante formada por las partículas y el campo magnético del Sol.',
    ),
  },
  {
    term: T('AU', '天文單位（AU）', 'UA'),
    meaning: T(
      'The average distance from Earth to the Sun — about 150 million km.',
      '地球到太陽的平均距離，約 1.5 億公里。',
      'La distancia media de la Tierra al Sol: unos 150 millones de km.',
    ),
  },
  {
    term: T('Golden Record', '金唱片', 'Disco de Oro'),
    meaning: T(
      'A gold-plated record with sounds and greetings from Earth.',
      '鍍金唱片，收錄地球的聲音與問候。',
      'Un disco chapado en oro con sonidos y saludos de la Tierra.',
    ),
  },
];

function KidsHeading({
  kicker,
  title,
  lead,
  icon,
}: {
  kicker: string;
  title: string;
  lead?: string;
  icon: ReactNode;
}) {
  return (
    <div className="kids-heading">
      <p className="kids-kicker">{kicker}</p>
      <h2 className="kids-h2">
        <span className="kids-heading-icon" aria-hidden="true">
          {icon}
        </span>
        {title}
      </h2>
      {lead && <p className="kids-lead">{lead}</p>}
    </div>
  );
}

function JourneyArt({ kind }: { kind: JourneyArtKind }) {
  switch (kind) {
    case 'rocket':
      return <Rocket className="kids-art-svg" />;
    case 'jupiter':
      return <PlanetJupiter className="kids-art-svg" />;
    case 'saturn':
      return <PlanetSaturn className="kids-art-svg" />;
    case 'ice':
      return (
        <span className="kids-ice-pair">
          <PlanetUranus className="kids-art-svg" />
          <PlanetNeptune className="kids-art-svg" />
        </span>
      );
    case 'earth':
      return <PlanetEarth className="kids-art-svg" />;
    case 'stars':
      return (
        <span className="kids-star-cluster">
          <Star className="kids-art-svg kids-star-main" />
          <Sparkle className="kids-art-svg kids-star-small" />
        </span>
      );
    case 'light':
      return <Sun className="kids-art-svg" />;
  }
}

function FactArt({ kind }: { kind: FactArtKind }) {
  switch (kind) {
    case 'sound':
      return <Sparkle className="kids-art-svg" />;
    case 'rocket':
      return <Rocket className="kids-art-svg" />;
    case 'sun':
      return <Sun className="kids-art-svg" />;
    case 'record':
      return <RecordIcon className="kids-art-svg" />;
    case 'signal':
      return <Star className="kids-art-svg" />;
  }
}

function ExploreArt({ kind }: { kind: 'earth' | 'message' | 'story' }) {
  switch (kind) {
    case 'earth':
      return <PlanetEarth className="kids-art-svg" />;
    case 'message':
      return <Sparkle className="kids-art-svg" />;
    case 'story':
      return <VoyagerCharacter variant="v1" />;
  }
}

export default function KidsPage() {
  const locale = useLang();
  const [recordOpen, setRecordOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('kids-body');
    return () => document.body.classList.remove('kids-body');
  }, []);

  const explore = [
    {
      title: T('See where they are now', '看看它們現在在哪裡', 'Mira dónde están ahora'),
      text: T('Watch the distance numbers move.', '看著距離數字跳動。', 'Observa cómo cambian las distancias.'),
      href: `${pageUrl('home')}#live-tracker`,
      art: 'earth' as const,
    },
    {
      title: T('Send a pretend message', '送出一則假裝的訊息', 'Envía un mensaje imaginario'),
      text: T('See how long the reply would take.', '看看回覆要等多久。', 'Comprueba cuánto tardaría la respuesta.'),
      href: `${pageUrl('tools')}#communication`,
      art: 'message' as const,
    },
    {
      title: T('Read the full story', '讀完整的故事', 'Lee la historia completa'),
      text: T('The longer Voyager 1 article.', '更完整的航海家一號文章。', 'El artículo completo de la Voyager 1.'),
      href: pageUrl('voyager-1'),
      art: 'story' as const,
    },
  ];

  return (
    <div className="kids-page mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="kids-breadcrumb">
        <a href={pageUrl('home')}>{pageLabel('home', locale)}</a>
        <span aria-hidden="true">/</span>
        <span>{pageLabel('kids', locale)}</span>
      </nav>

      <section className="kids-hero">
        <div className="kids-hero-copy">
          <p className="kids-kicker">{txt(HERO.kicker, locale)}</p>
          <h1 className="kids-title">{txt(HERO.title, locale)}</h1>
          <p className="kids-subtitle">{txt(HERO.subtitle, locale)}</p>
          <p className="kids-intro">{txt(HERO.intro, locale)}</p>
          <div className="kids-hero-actions">
            <a href="#meet" className="kids-button kids-button-primary">
              {txt(HERO.cta, locale)}
              <LinkArrow className="kids-button-arrow" />
            </a>
            <a href="#quiz" className="kids-button kids-button-secondary">
              {txt(HERO.quiz, locale)}
            </a>
          </div>
          <div className="kids-hero-badges">
            <p className="kids-hero-badge">
              <Sparkle className="kids-badge-sparkle" />
              {txt(HERO.badge, locale)}
            </p>
            <p className="kids-hero-badge">
              <Star className="kids-badge-sparkle" />
              {txt(HERO.age, locale)}
            </p>
          </div>
        </div>
        <div className="kids-hero-art">
          <HeroScene className="kids-hero-svg" label={txt(HERO.artLabel, locale)} />
        </div>
      </section>

      <p className="kids-scroll-cue" aria-hidden="true">
        {txt(HERO.scroll, locale)} <span>↓</span>
      </p>

      <section id="meet" className="kids-section">
        <KidsHeading
          kicker={txt(T('Chapter 1', '第 1 章', 'Capítulo 1'), locale)}
          title={txt(T('Meet the two explorers', '認識兩位探險家', 'Conoce a los dos exploradores'), locale)}
          lead={txt(
            T(
              'Two spacecraft, two very different adventures.',
              '兩艘太空船，兩段很不一樣的冒險。',
              'Dos naves, dos aventuras muy diferentes.',
            ),
            locale,
          )}
          icon={<Rocket className="kids-heading-svg" />}
        />
        <div className="kids-character-grid">
          {CHARACTERS.map((craft) => (
            <details key={craft.name} className={`kids-character kids-character-${craft.variant}`}>
              <summary>
                <span className="kids-character-art" aria-hidden="true">
                  <VoyagerCharacter variant={craft.variant} />
                </span>
                <span className="kids-character-copy">
                  <span className="kids-character-tag">{craft.name}</span>
                  <span className="kids-character-title">{txt(craft.title, locale)}</span>
                  <span className="kids-character-teaser">{txt(craft.teaser, locale)}</span>
                  <span className="kids-character-tip">{txt(craft.tip, locale)}</span>
                </span>
                <span className="kids-disclosure" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="kids-character-body">
                <ul className="kids-character-list">
                  {craft.details.map((detail) => (
                    <li key={detail.en}>{txt(detail, locale)}</li>
                  ))}
                </ul>
                <div className="kids-mini-fact">
                  <Sparkle className="kids-mini-icon" />
                  <p>{txt(craft.fun, locale)}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="journey" className="kids-section">
        <KidsHeading
          kicker={txt(T('Chapter 2', '第 2 章', 'Capítulo 2'), locale)}
          title={txt(T('The grand space adventure', '太空大冒險旅程', 'La gran aventura espacial'), locale)}
          lead={txt(
            T(
              'Follow the journey stop by stop. Tap each stop to open its adventure log.',
              '沿著旅程一站一站前進。點開每一站，看看探險日誌。',
              'Sigue el viaje parada a parada. Toca cada parada para abrir su diario de aventuras.',
            ),
            locale,
          )}
          icon={<PlanetSaturn className="kids-heading-svg" />}
        />
        <div className="kids-journey">
          {JOURNEY.map((stop) => (
            <details key={stop.title.en} className="kids-journey-stop" data-tone={stop.tone}>
              <summary>
                <span className="kids-journey-art" aria-hidden="true">
                  <JourneyArt kind={stop.art} />
                </span>
                <span className="kids-journey-copy">
                  <span className="kids-journey-year">{txt(stop.year, locale)}</span>
                  <span className="kids-journey-title">{txt(stop.title, locale)}</span>
                  <span className="kids-journey-teaser">{txt(stop.teaser, locale)}</span>
                </span>
                <span className="kids-disclosure" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="kids-journey-body">
                <p>{txt(stop.story, locale)}</p>
                <div className="kids-mini-fact">
                  <Sparkle className="kids-mini-icon" />
                  <p>{txt(stop.fact, locale)}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="facts" className="kids-section">
        <KidsHeading
          kicker={txt(T('Chapter 3', '第 3 章', 'Capítulo 3'), locale)}
          title={txt(T('Wow! Space facts', '哇！太空知識', '¡Guau! Datos del espacio'), locale)}
          lead={txt(T('Tap a card to reveal the answer.', '點開卡片看看答案。', 'Toca una tarjeta para descubrir la respuesta.'), locale)}
          icon={<Sparkle className="kids-heading-svg" />}
        />
        <div className="kids-fact-grid">
          {FACTS.map((fact) => (
            <details key={fact.q.en} className="kids-fact-card" data-tone={fact.tone}>
              <summary>
                <span className="kids-fact-art" aria-hidden="true">
                  <FactArt kind={fact.art} />
                </span>
                <span className="kids-fact-question">{txt(fact.q, locale)}</span>
                <span className="kids-disclosure" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="kids-fact-body">
                <p>{txt(fact.a, locale)}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="golden-record" className="kids-section">
        <div className="kids-record-panel">
          <div className="kids-record-art" aria-hidden="true">
            <GoldenRecordArt className="kids-record-svg" spinning={recordOpen} />
          </div>
          <div className="kids-record-copy">
            <KidsHeading
              kicker={txt(T('Chapter 4', '第 4 章', 'Capítulo 4'), locale)}
              title={txt(T('A message for the stars', '給星星的訊息', 'Un mensaje para las estrellas'), locale)}
              icon={<RecordIcon className="kids-heading-svg" />}
            />
            <p className="kids-record-lead">
              {txt(
                T(
                  'If alien friends ever find Voyager, they can meet Earth through this record.',
                  '如果有一天外星朋友找到 Voyager，他們就能透過這張唱片認識地球！',
                  'Si algún día unos amigos extraterrestres encuentran la Voyager, podrán conocer la Tierra gracias a este disco.',
                ),
                locale,
              )}
            </p>
            <p>
              {txt(
                T(
                  'It carries music, greetings in 55 languages, and sounds from Earth — thunder, birds, a heartbeat.',
                  '唱片裡有音樂、55 種語言的問候，以及地球的聲音——雷聲、鳥鳴、心跳。',
                  'Lleva música, saludos en 55 idiomas y sonidos de la Tierra: truenos, pájaros, un latido.',
                ),
                locale,
              )}
            </p>
            <button
              type="button"
              className="kids-button kids-button-gold"
              aria-expanded={recordOpen}
              onClick={() => setRecordOpen((value) => !value)}
            >
              {recordOpen
                ? txt(T('Stop the record', '停止轉動', 'Parar el disco'), locale)
                : txt(T('Spin the record', '轉動唱片', 'Girar el disco'), locale)}
            </button>
            {recordOpen && (
              <ul className="kids-record-list">
                {RECORD_CONTENTS.map((item) => (
                  <li key={item.en}>
                    <Star className="kids-list-star" />
                    {txt(item, locale)}
                  </li>
                ))}
              </ul>
            )}
            <a href={pageUrl('golden-record')} className="kids-link">
              {txt(T('More about the Golden Record', '更多金唱片的故事', 'Más sobre el Disco de Oro'), locale)}
              <LinkArrow className="kids-link-arrow" />
            </a>
          </div>
        </div>
      </section>

      <section id="words" className="kids-section">
        <KidsHeading
          kicker={txt(T('Chapter 5', '第 5 章', 'Capítulo 5'), locale)}
          title={txt(T('Space dictionary', '太空小字典', 'Diccionario espacial'), locale)}
          lead={txt(T('Six space words to take with you.', '帶走六個太空小詞彙。', 'Seis palabras espaciales para llevar contigo.'), locale)}
          icon={<BookIcon className="kids-heading-svg" />}
        />
        <dl className="kids-word-grid">
          {GLOSSARY.map((item) => (
            <div key={item.term.en} className="kids-word-card">
              <dt>{txt(item.term, locale)}</dt>
              <dd>{txt(item.meaning, locale)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="quiz" className="kids-section">
        <KidsHeading
          kicker={txt(T('Chapter 6', '第 6 章', 'Capítulo 6'), locale)}
          title={txt(T('Space quiz challenge', '太空問答挑戰', 'Reto de preguntas espaciales'), locale)}
          lead={txt(
            T(
              'Answer 5 questions, collect stars and earn a space badge. No login, no names!',
              '回答 5 個問題、收集星星，還能得到太空徽章。不用登入、不用寫名字！',
              'Responde 5 preguntas, consigue estrellas y gana una insignia espacial. ¡Sin registro y sin nombres!',
            ),
            locale,
          )}
          icon={<Star className="kids-heading-svg" />}
        />
        <KidsQuiz />
      </section>

      <section id="explore" className="kids-section">
        <KidsHeading
          kicker={txt(T('Chapter 7', '第 7 章', 'Capítulo 7'), locale)}
          title={txt(T('Keep exploring', '繼續探索', 'Sigue explorando'), locale)}
          lead={txt(
            T(
              'Three more ways to travel with Voyager.',
              '還有三種方式可以跟航海家一起旅行。',
              'Tres formas más de viajar con las Voyager.',
            ),
            locale,
          )}
          icon={<Sparkle className="kids-heading-svg" />}
        />
        <div className="kids-explore-grid">
          {explore.map((item) => (
            <a key={item.href} href={item.href} className="kids-explore-card">
              <span className="kids-explore-art" aria-hidden="true">
                <ExploreArt kind={item.art} />
              </span>
              <span className="kids-explore-copy">
                <span className="kids-explore-title">{txt(item.title, locale)}</span>
                <span className="kids-explore-text">{txt(item.text, locale)}</span>
              </span>
              <LinkArrow className="kids-explore-arrow" />
            </a>
          ))}
        </div>
      </section>

      <details className="kids-grownups">
        <summary>{txt(T('For grown-ups', '給家長與老師', 'Para adultos'), locale)}</summary>
        <p>
          {txt(
            T(
              'This page is written for readers around 8–12. It uses short sentences, explains difficult words and keeps the science accurate. There are no ads, no login and no personal data. The quiz stores only the best star count in this browser.',
              '本頁為約 8 至 12 歲的讀者撰寫：句子簡短、困難詞彙有解釋，科學內容保持正確。頁面沒有廣告、不用登入，也不蒐集個人資料。測驗只會在此瀏覽器儲存最佳星星數。',
              'Esta página está escrita para lectores de unos 8 a 12 años: frases cortas, palabras difíciles explicadas y ciencia rigurosa. No hay anuncios, ni registro, ni datos personales. El cuestionario solo guarda la mejor puntuación de estrellas en este navegador.',
            ),
            locale,
          )}
        </p>
      </details>

      <RelatedLinks items={['voyager-1', 'voyager-2', 'golden-record', 'timeline', 'tools', 'faq']} />
    </div>
  );
}
