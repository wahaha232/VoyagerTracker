/**
 * KidsPage — /kids.html  (EN / 繁中 / Español)
 *
 * A short, friendly guide for younger readers: short sentences, explained
 * words, big numbers and a small quiz. Advertising is deliberately not
 * loaded on this page (see scripts/gen-html.mjs).
 *
 * The warm storybook theme lives in src/kids-theme.css and is scoped to
 * #root[data-page="kids"] so no other page is affected.
 */

import { useEffect } from 'react';
import { pageUrl } from '../constants/site';
import { BiArticleHeader, BiSection, bi, txt, useLang } from '../components/content';
import { Callout, RelatedLinks } from '../components/ui';
import { LinkArrow, SatelliteIcon } from '../components/icons';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });

const EXPLORERS: { name: string; accent: string; ring: string; lines: Tri[]; fact: Tri }[] = [
  {
    name: 'Voyager 1',
    accent: 'text-cyan-300',
    ring: 'border-cyan-500/40 bg-cyan-500/5',
    lines: [
      T('Launched on 5 September 1977.', '1977 年 9 月 5 日發射。', 'Lanzada el 5 de septiembre de 1977.'),
      T(
        'It flew past Jupiter in 1979 and Saturn in 1980.',
        '它在 1979 年飛掠木星，1980 年飛掠土星。',
        'Pasó junto a Júpiter en 1979 y Saturno en 1980.',
      ),
      T(
        'It is now in interstellar space and is the farthest human-made object. In November 2026 its radio message takes about 24 hours to reach Earth.',
        '它現在位於星際空間，是人類造過最遙遠的物體。2026 年 11 月，它的無線電訊息要約 24 小時才能抵達地球。',
        'Ahora está en el espacio interestelar y es el objeto humano más lejano. En noviembre de 2026 su mensaje de radio tarda unas 24 horas en llegar a la Tierra.',
      ),
    ],
    fact: T(
      'Cool fact: it discovered volcanoes erupting on Jupiter’s moon Io.',
      '酷事實：它發現木星衛星木衛一上有火山正在噴發。',
      'Dato curioso: descubrió volcanes en erupción en Ío, una luna de Júpiter.',
    ),
  },
  {
    name: 'Voyager 2',
    accent: 'text-emerald-300',
    ring: 'border-emerald-500/40 bg-emerald-500/5',
    lines: [
      T('Launched on 20 August 1977.', '1977 年 8 月 20 日發射。', 'Lanzada el 20 de agosto de 1977.'),
      T(
        'It visited Jupiter (1979), Saturn (1981), Uranus (1986) and Neptune (1989).',
        '它造訪了木星（1979）、土星（1981）、天王星（1986）與海王星（1989）。',
        'Visitó Júpiter (1979), Saturno (1981), Urano (1986) y Neptuno (1989).',
      ),
      T(
        'It is now in interstellar space, flying south of the planets.',
        '它現在位於星際空間，朝行星軌道面的南方飛行。',
        'Ahora está en el espacio interestelar, volando al sur de los planetas.',
      ),
    ],
    fact: T(
      'Cool fact: it is the only spacecraft that has ever visited Uranus and Neptune.',
      '酷事實：它是唯一造訪過天王星與海王星的太空船。',
      'Dato curioso: es la única nave que ha visitado Urano y Neptuno.',
    ),
  },
];

const LIGHT_CARDS: { title: Tri; text: Tri }[] = [
  {
    title: T('Light is fast', '光很快', 'La luz es rápida'),
    text: T(
      'Light travels about 300,000 km in one second. Nothing in the universe is faster.',
      '光在一秒內約走 30 萬公里。宇宙中沒有比光更快的東西。',
      'La luz recorre unos 300 000 km en un segundo. Nada en el universo es más rápido.',
    ),
  },
  {
    title: T('To the Moon', '到月球', 'A la Luna'),
    text: T(
      'Light takes 1.3 seconds to travel from Earth to the Moon.',
      '光從地球到月球只需 1.3 秒。',
      'La luz tarda 1,3 segundos en ir de la Tierra a la Luna.',
    ),
  },
  {
    title: T('To the Sun', '到太陽', 'Al Sol'),
    text: T(
      'Sunlight takes about 8 minutes and 20 seconds to reach Earth.',
      '陽光約需 8 分 20 秒抵達地球。',
      'La luz del Sol tarda unos 8 minutos y 20 segundos en llegar a la Tierra.',
    ),
  },
  {
    title: T('To Voyager 1', '到航海家一號', 'A la Voyager 1'),
    text: T(
      'In November 2026 it is about 25.9 billion km away. A radio message needs about 24 hours to get there.',
      '2026 年 11 月，它距地球約 259 億公里。無線電訊息要約 24 小時才能送達。',
      'En noviembre de 2026 está a unos 25 900 millones de km. Un mensaje de radio tarda unas 24 horas en llegar.',
    ),
  },
];

const FOUND: { title: Tri; text: Tri; badge: string }[] = [
  {
    title: T('Volcanoes on Io', '木衛一的火山', 'Volcanes en Ío'),
    text: T(
      'Voyager 1 saw volcanoes erupting on Jupiter’s moon Io — the first active volcanoes found beyond Earth.',
      '航海家一號看到木星衛星木衛一上有火山正在噴發——這是地球以外首次發現的活火山。',
      'La Voyager 1 vio volcanes en erupción en Ío, una luna de Júpiter: los primeros volcanes activos hallados fuera de la Tierra.',
    ),
    badge: '🌋',
  },
  {
    title: T('Saturn’s rings', '土星環', 'Los anillos de Saturno'),
    text: T(
      'The rings are made of thousands of narrow ringlets, not one solid ring.',
      '土星環由數千道細窄的小環組成，並不是一個實心的圓環。',
      'Los anillos están formados por miles de anillos estrechos, no por uno solo y macizo.',
    ),
    badge: '🪐',
  },
  {
    title: T('The ice giants', '冰巨行星', 'Los gigantes de hielo'),
    text: T(
      'Voyager 2 is the only spacecraft ever to visit Uranus and Neptune.',
      '航海家二號是史上唯一造訪天王星與海王星的太空船。',
      'La Voyager 2 es la única nave que ha visitado Urano y Neptuno.',
    ),
    badge: '🧊',
  },
  {
    title: T('The Pale Blue Dot', '蒼藍小點', 'El pálido punto azul'),
    text: T(
      'In 1990 Voyager 1 looked back and photographed Earth from far away. Our whole world looked like a tiny blue dot.',
      '1990 年，航海家一號回頭從很遠的地方拍下地球。我們整個世界看起來就像一粒小小的藍點。',
      'En 1990 la Voyager 1 miró hacia atrás y fotografió la Tierra desde muy lejos. Todo nuestro mundo parecía un pequeño punto azul.',
    ),
    badge: '🌍',
  },
];

const GLOSSARY: { term: Tri; meaning: Tri }[] = [
  {
    term: T('Spacecraft', '太空船', 'Nave espacial'),
    meaning: T('A machine that travels in space.', '在太空旅行的機器。', 'Una máquina que viaja por el espacio.'),
  },
  {
    term: T('Light-day', '光日', 'Día-luz'),
    meaning: T(
      'The distance light travels in one day — about 25.9 billion km.',
      '光在一天內走的距離，約 259 億公里。',
      'La distancia que recorre la luz en un día: unos 25 900 millones de km.',
    ),
  },
  {
    term: T('Interstellar space', '星際空間', 'Espacio interestelar'),
    meaning: T(
      'The space between the stars, outside our Sun’s bubble.',
      '星星之間的空間，在太陽泡泡之外。',
      'El espacio entre las estrellas, fuera de la burbuja del Sol.',
    ),
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

const QUIZ: { q: Tri; a: Tri }[] = [
  {
    q: T('Which spacecraft visited Uranus and Neptune?', '哪一艘太空船造訪了天王星與海王星？', '¿Qué nave visitó Urano y Neptuno?'),
    a: T('Voyager 2.', '航海家二號。', 'La Voyager 2.'),
  },
  {
    q: T('What did Voyager 1 see on Jupiter’s moon Io?', '航海家一號在木星衛星木衛一上看到了什麼？', '¿Qué vio la Voyager 1 en Ío, una luna de Júpiter?'),
    a: T(
      'Volcanoes erupting — the first active volcanoes found beyond Earth.',
      '正在噴發的火山——地球以外首次發現的活火山。',
      'Volcanes en erupción: los primeros volcanes activos hallados fuera de la Tierra.',
    ),
  },
  {
    q: T('About how long does a radio message take to reach Voyager 1 in November 2026?', '2026 年 11 月，無線電訊息約需多久才能送達航海家一號？', '¿Cuánto tarda un mensaje de radio en llegar a la Voyager 1 en noviembre de 2026?'),
    a: T(
      'About 24 hours one way, so about 48 hours for a reply.',
      '單程約 24 小時，來回約 48 小時。',
      'Unas 24 horas de ida, así que unas 48 horas para una respuesta.',
    ),
  },
];

export default function KidsPage() {
  const locale = useLang();

  useEffect(() => {
    document.body.classList.add('kids-body');
    return () => document.body.classList.remove('kids-body');
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="kids"
        title={bi('Voyager for Kids', '給孩子的航海家號', 'Voyager para niños')}
        intro={bi(
          'Two robot explorers left Earth in 1977. They are still flying and still sending messages home. This page tells their story in short, simple pieces.',
          '1977 年，兩艘機器人探測器離開地球。它們至今仍在飛行，仍在傳訊息回家。這一頁用簡短、簡單的段落說它們的故事。',
          'Dos robots exploradores salieron de la Tierra en 1977. Siguen volando y enviando mensajes a casa. Esta página cuenta su historia en partes cortas y sencillas.',
        )}
      />

      <p
        data-kids-age
        className="mb-10 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300"
      >
        <SatelliteIcon className="h-4 w-4" />
        {txt(
          T('Ages 8–12 · about 4 minutes', '8–12 歲 · 約 4 分鐘', '8–12 años · unos 4 minutos'),
          locale,
        )}
      </p>

      <BiSection
        id="meet"
        icon="🚀"
        title={bi('Meet the two explorers', '認識兩位探險家', 'Conoce a los dos exploradores')}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {EXPLORERS.map((craft, index) => (
            <article
              key={craft.name}
              data-kids-craft={index === 0 ? 'v1' : 'v2'}
              className={`rounded-2xl border p-5 ${craft.ring}`}
            >
              <h3 className={`text-2xl font-black tracking-wide ${craft.accent}`}>{craft.name}</h3>
              <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-200">
                {craft.lines.map((line) => (
                  <li key={line.en} className="border-l-2 border-slate-600/60 pl-3">
                    {txt(line, locale)}
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-xl bg-space-950/50 p-3 text-sm leading-relaxed text-slate-200">
                {txt(craft.fact, locale)}
              </p>
            </article>
          ))}
        </div>
      </BiSection>

      <BiSection
        id="distance"
        icon="📏"
        title={bi('How far away are they?', '它們有多遠？', '¿A qué distancia están?')}
      >
        <p className="mb-5 max-w-3xl text-lg leading-relaxed text-slate-300">
          {txt(
            T(
              'Space is really, really big. We measure it with light. Light is the fastest thing in the universe.',
              '太空非常、非常大。我們用光來測量距離。光是宇宙中最快的東西。',
              'El espacio es enorme, de verdad. Lo medimos con luz. La luz es lo más rápido del universo.',
            ),
            locale,
          )}
        </p>

        <div
          id="one-light-day-kids"
          className="mb-5 rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 to-emerald-500/5 p-6 text-center"
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
            {txt(T('One light-day', '一光日', 'Un día-luz'), locale)}
          </p>
          <p className="kids-big-number mt-2 text-3xl font-black text-white sm:text-4xl">
            {txt(T('25.9 billion km', '259 億公里', '25 900 millones de km'), locale)}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-200">
            {txt(
              T(
                'On 18 November 2026, Voyager 1 will be one light-day from Earth: the distance light travels in one whole day. If you walked 5 km every day, it would take you about 14 million years to walk that far.',
                '2026 年 11 月 18 日，航海家一號將距地球一光日：光走整整一天才到的距離。如果你每天走 5 公里，要走約 1400 萬年才能走完。',
                'El 18 de noviembre de 2026, la Voyager 1 estará a un día-luz de la Tierra: la distancia que recorre la luz en un día entero. Si caminaras 5 km cada día, tardarías unos 14 millones de años en recorrerla.',
              ),
              locale,
            )}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LIGHT_CARDS.map((card) => (
            <div
              key={card.title.en}
              data-kids-light
              className="rounded-xl border border-slate-800 bg-space-900/40 p-4"
            >
              <p className="font-semibold text-white">{txt(card.title, locale)}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{txt(card.text, locale)}</p>
            </div>
          ))}
        </div>
      </BiSection>

      <BiSection
        id="found"
        icon="🔭"
        title={bi('Cool things Voyager found', '航海家的酷發現', 'Cosas geniales que encontró Voyager')}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {FOUND.map((item, index) => (
            <div
              key={item.title.en}
              data-kids-found={index}
              className="rounded-2xl border border-slate-700/60 bg-space-900/40 p-5"
            >
              <span className="kids-badge" aria-hidden="true">
                {item.badge}
              </span>
              <h3 className="text-lg font-bold text-white">{txt(item.title, locale)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{txt(item.text, locale)}</p>
            </div>
          ))}
        </div>
      </BiSection>

      <BiSection
        id="golden-record"
        icon="💿"
        title={bi('A message for the stars', '給星星的訊息', 'Un mensaje para las estrellas')}
      >
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <p className="text-lg leading-relaxed text-slate-300">
            {txt(
              T(
                'Each Voyager carries a Golden Record. It is a gold-plated copper record with music, greetings in 55 languages, and sounds from Earth — thunder, birds and a heartbeat. It is like a postcard for anyone who might find the spacecraft one day.',
                '每艘航海家號都帶著一張金唱片。它是鍍金銅唱片，收錄音樂、55 種語言的問候，以及地球的聲音——雷聲、鳥鳴與心跳。它就像一張明信片，留給有一天可能發現探測器的任何人。',
                'Cada Voyager lleva un Disco de Oro. Es un disco de cobre chapado en oro con música, saludos en 55 idiomas y sonidos de la Tierra: truenos, pájaros y un latido. Es como una postal para cualquiera que algún día encuentre la nave.',
              ),
              locale,
            )}
          </p>
          <div data-kids-fact className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-5">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-amber-300">
              {txt(T('Did you know?', '你知道嗎？', '¿Lo sabías?'), locale)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-amber-50">
              {txt(
                T(
                  'The record comes with a cover that shows how to play it — using pictures, not words.',
                  '唱片的封套用圖畫、而不是文字，說明要怎麼播放它。',
                  'El disco incluye una cubierta que explica cómo reproducirlo con dibujos, no con palabras.',
                ),
                locale,
              )}
            </p>
            <a
              href={pageUrl('golden-record')}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
            >
              {txt(T('See the Golden Record', '看看金唱片', 'Ver el Disco de Oro'), locale)}
              <LinkArrow className="h-4 w-4" />
            </a>
          </div>
        </div>
      </BiSection>

      <BiSection
        id="words"
        icon="📖"
        title={bi('Words to know', '認識這些詞', 'Palabras que debes saber')}
      >
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GLOSSARY.map((item) => (
            <div
              key={item.term.en}
              data-kids-word
              className="rounded-xl border border-slate-800 bg-space-900/40 p-4"
            >
              <dt className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-300">{txt(item.term, locale)}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-slate-300">{txt(item.meaning, locale)}</dd>
            </div>
          ))}
        </dl>
      </BiSection>

      <BiSection id="quiz" icon="🎯" title={bi('Quick quiz', '小測驗', 'Prueba rápida')}>
        <p className="mb-4 max-w-3xl text-slate-300">
          {txt(
            T(
              'Read the question, say your answer, then open it to check.',
              '先讀題目、說出答案，再打開看看對不對。',
              'Lee la pregunta, di tu respuesta y ábrela para comprobarla.',
            ),
            locale,
          )}
        </p>
        <div className="space-y-3">
          {QUIZ.map((item, index) => (
            <details key={item.q.en} className="rounded-xl border border-slate-800 bg-space-900/40">
              <summary className="cursor-pointer p-4 text-base font-semibold text-slate-100 hover:text-cyan-300">
                <span className="kids-question-badge">
                  <span aria-hidden="true">❓</span>
                  {txt(T('Question', '第', 'Pregunta'), locale)} {index + 1}
                </span>
                <span>{txt(item.q, locale)}</span>
              </summary>
              <div className="kids-answer border-t border-slate-800 px-4 py-3">
                <p className="kids-bingo">
                  <span aria-hidden="true">🎉</span>
                  {txt(T('Bingo!', '答對了！', '¡Bingo!'), locale)}
                  <span className="kids-answer-label">{txt(T('Answer', '答案', 'Respuesta'), locale)}:</span>
                </p>
                <p className="mt-1 text-[15px] leading-relaxed text-cyan-100">{txt(item.a, locale)}</p>
              </div>
            </details>
          ))}
        </div>
      </BiSection>

      <BiSection id="try" icon="🎮" title={bi('Try it yourself', '自己試試看', 'Pruébalo tú')}>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              href: `${pageUrl('home')}#live-tracker`,
              title: T('See where they are now', '看看它們現在在哪裡', 'Mira dónde están ahora'),
              text: T('Watch the distance numbers move.', '看著距離數字跳動。', 'Observa cómo cambian las distancias.'),
            },
            {
              href: `${pageUrl('tools')}#communication`,
              title: T('Send a pretend message', '送出一則假裝的訊息', 'Envía un mensaje imaginario'),
              text: T('See how long the reply would take.', '看看回覆要等多久。', 'Comprueba cuánto tardaría la respuesta.'),
            },
            {
              href: pageUrl('voyager-1'),
              title: T('Read the full story', '讀完整的故事', 'Lee la historia completa'),
              text: T('The longer Voyager 1 article.', '更完整的航海家一號文章。', 'El artículo completo de la Voyager 1.'),
            },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-kids-try
              className="group rounded-2xl border border-slate-700/60 bg-space-900/40 p-5 transition-colors hover:border-cyan-400/50"
            >
              <span className="flex items-start justify-between gap-2 font-semibold text-white group-hover:text-cyan-300">
                {txt(link.title, locale)}
                <LinkArrow className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-400">{txt(link.text, locale)}</span>
            </a>
          ))}
        </div>
      </BiSection>

      <div data-kids-grownups>
        <Callout tone="emerald" title={txt(T('For grown-ups', '給家長與老師', 'Para adultos'), locale)}>
          {txt(
            T(
              'This page is written for readers around 8–12 years old: sentences are short and difficult words are explained. The full articles are linked below. This page deliberately loads no advertising script.',
              '本頁為約 8 至 12 歲的讀者撰寫：句子較短，困難的詞彙都有解釋。下方連結到完整文章。本頁刻意不載入廣告程式碼。',
              'Esta página está escrita para lectores de unos 8 a 12 años: las frases son cortas y las palabras difíciles se explican. Los artículos completos están enlazados abajo. Esta página no carga el script de publicidad a propósito.',
            ),
            locale,
          )}
        </Callout>
      </div>

      <RelatedLinks items={['voyager-1', 'voyager-2', 'golden-record', 'timeline', 'tools', 'faq']} />
    </div>
  );
}
