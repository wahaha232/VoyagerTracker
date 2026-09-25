/**
 * GoldenRecordExplorer — the record's contents by category.
 *
 * Counts and examples follow NASA's "Golden Record Contents" pages. No
 * recordings or images are reproduced. Native <details> keeps every
 * category's text in the HTML; the chips open and scroll to a category.
 */

import { useRef } from 'react';
import { txt, useLang } from './content';
import SourceBadge from './SourceBadge';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });

interface Category {
  id: string;
  name: Tri;
  count: Tri;
  what: Tri;
  how: Tri;
  why: Tri;
}

const CATEGORIES: Category[] = [
  {
    id: 'greetings',
    name: T('Greetings', '問候語', 'Saludos'),
    count: T('55 languages', '55 種語言', '55 idiomas'),
    what: T('Short spoken greetings, beginning with Akkadian — spoken in Sumer about 6,000 years ago — and ending with Wu, a modern Chinese language.', '簡短的口說問候，從約 6,000 年前通行於蘇美地區的阿卡德語開始，最後是現代漢語的吳語。', 'Saludos hablados breves, desde el acadio —hablado en Sumer hace unos 6000 años— hasta el wu, una lengua china moderna.'),
    how: T('Recorded as ordinary audio on the record’s grooves.', '以一般音訊的形式錄製在唱片的音軌上。', 'Grabados como audio normal en los surcos del disco.'),
    why: T('To show that Earth has many peoples and languages, not one voice.', '用來說明地球上有許多民族與語言，而不是單一的聲音。', 'Para mostrar que la Tierra tiene muchos pueblos y lenguas, no una sola voz.'),
  },
  {
    id: 'sounds',
    name: T('Sounds of Earth', '地球之聲', 'Sonidos de la Tierra'),
    count: T('A sequence of natural and human sounds', '一段自然與人類聲音的序列', 'Una secuencia de sonidos naturales y humanos'),
    what: T('Surf, wind, thunder, birds and whales, followed by sounds of human life and technology.', '海浪、風、雷聲、鳥鳴與鯨歌，接著是人類生活與科技的聲音。', 'Olas, viento, truenos, aves y ballenas, seguidos de sonidos de la vida humana y la tecnología.'),
    how: T('Assembled as an audio sequence on the record.', '以音訊序列的形式編排在唱片上。', 'Montados como una secuencia de audio en el disco.'),
    why: T('A portrait of the planet as it sounds — its weather, its animals and ourselves.', '描繪地球「聽起來」的樣子——它的天氣、它的動物，以及我們自己。', 'Un retrato de cómo suena el planeta: su clima, sus animales y nosotros.'),
  },
  {
    id: 'music',
    name: T('Music', '音樂', 'Música'),
    count: T('About 90 minutes', '約 90 分鐘', 'Unos 90 minutos'),
    what: T('Eastern and Western classical works and music from many cultures, from Bach and Beethoven to Chuck Berry.', '東西方的古典作品與多元文化的音樂，從巴哈、貝多芬到查克．貝里。', 'Obras clásicas orientales y occidentales y música de muchas culturas, de Bach y Beethoven a Chuck Berry.'),
    how: T('The longest part of the record, recorded as audio.', '唱片中最長的部分，以音訊形式錄製。', 'La parte más larga del disco, grabada como audio.'),
    why: T('Music was seen as one of the most expressive things humans make.', '音樂被視為人類所創造最具表現力的事物之一。', 'La música se consideró una de las creaciones humanas más expresivas.'),
  },
  {
    id: 'images',
    name: T('Images', '影像', 'Imágenes'),
    count: T('115 images', '115 張影像', '115 imágenes'),
    what: T('Mathematics and physics, the solar system, human anatomy, people, daily life, landscapes, animals and architecture.', '數學與物理、太陽系、人體構造、人物、日常生活、自然景觀、動物與建築。', 'Matemáticas y física, el sistema solar, anatomía humana, personas, vida cotidiana, paisajes, animales y arquitectura.'),
    how: T('Encoded in analogue form as signals on the record, to be rebuilt line by line into pictures; a calibration circle helps check the decoding.', '以類比形式編碼成唱片上的訊號，須逐行重建成圖片；另有一個校準圓圈可用來檢查解碼是否正確。', 'Codificadas de forma analógica como señales en el disco, para reconstruirlas línea a línea; un círculo de calibración ayuda a comprobar la decodificación.'),
    why: T('Pictures can explain things that sounds cannot — how we look, where we live and what we know.', '圖片能說明聲音無法表達的事——我們的樣貌、居住的地方，以及我們所知道的知識。', 'Las imágenes explican lo que los sonidos no pueden: cómo somos, dónde vivimos y qué sabemos.'),
  },
  {
    id: 'instructions',
    name: T('Instructions and science', '使用說明與科學資訊', 'Instrucciones y ciencia'),
    count: T('Engraved on the cover', '刻在外殼上', 'Grabadas en la cubierta'),
    what: T('How to play the record at 16⅔ revolutions per minute, how to turn the signals into pictures, a map locating the Sun among 14 pulsars, and a tiny uranium-238 sample that works as a clock.', '如何以每分鐘 16⅔ 轉播放唱片、如何把訊號轉成圖片、一張以 14 顆脈衝星標示太陽位置的地圖，以及一小塊可當作時鐘的鈾－238 樣本。', 'Cómo reproducir el disco a 16⅔ revoluciones por minuto, cómo convertir las señales en imágenes, un mapa que sitúa el Sol entre 14 púlsares y una pequeña muestra de uranio-238 que hace de reloj.'),
    how: T('Drawn as diagrams using a unit of time taken from the hydrogen atom, which any scientific civilization could recognize.', '以示意圖呈現，並採用取自氫原子的時間單位——任何具科學能力的文明都能辨識。', 'Dibujadas como diagramas con una unidad de tiempo tomada del átomo de hidrógeno, reconocible por cualquier civilización científica.'),
    why: T('Without instructions nobody could use the record; with them, a finder could also work out where and roughly when it came from.', '沒有說明就無人能使用這張唱片；有了說明，發現者還能推算出它從哪裡來、大約是什麼時候製作的。', 'Sin instrucciones nadie podría usar el disco; con ellas, quien lo encuentre podría deducir además de dónde viene y aproximadamente cuándo.'),
  },
];

export default function GoldenRecordExplorer() {
  const locale = useLang();
  const refs = useRef<Record<string, HTMLDetailsElement | null>>({});
  const open = (id: string) => {
    const el = refs.current[id];
    if (!el) return;
    el.open = true;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => (
          <button key={c.id} type="button" onClick={() => open(c.id)} className="min-h-[36px] rounded-full border border-slate-600 px-3 text-xs font-medium text-slate-200 hover:border-cyan-400 hover:text-white">
            {txt(c.name, locale)} · <span className="text-slate-400">{txt(c.count, locale)}</span>
          </button>
        ))}
        <SourceBadge kind="official" note="NASA" />
      </div>
      <div className="space-y-3">
        {CATEGORIES.map((c, i) => (
          <details
            key={c.id}
            id={`gr-${c.id}`}
            open={i === 0}
            ref={(el) => {
              refs.current[c.id] = el;
            }}
            className="scroll-mt-24 rounded-xl border border-slate-800 bg-space-900/40 open:border-amber-400/40"
          >
            <summary className="cursor-pointer p-4">
              <span className="font-semibold text-white">{txt(c.name, locale)}</span>{' '}
              <span className="font-mono text-xs text-amber-200">{txt(c.count, locale)}</span>
            </summary>
            <dl className="grid gap-3 border-t border-slate-800 p-4 text-sm leading-relaxed sm:grid-cols-[150px_1fr]">
              <dt className="font-mono text-xs uppercase tracking-wider text-amber-200">{txt(T('What is on it', '收錄了什麼', 'Qué contiene'), locale)}</dt>
              <dd className="text-slate-300">{txt(c.what, locale)}</dd>
              <dt className="font-mono text-xs uppercase tracking-wider text-amber-200">{txt(T('How it is stored', '如何儲存', 'Cómo se guarda'), locale)}</dt>
              <dd className="text-slate-300">{txt(c.how, locale)}</dd>
              <dt className="font-mono text-xs uppercase tracking-wider text-amber-200">{txt(T('Why it was included', '為何收錄', 'Por qué se incluyó'), locale)}</dt>
              <dd className="text-slate-300">{txt(c.why, locale)}</dd>
            </dl>
          </details>
        ))}
      </div>
    </div>
  );
}
