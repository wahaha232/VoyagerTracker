/**
 * GoldenRecordPage — /golden-record.html  (EN / 繁中 / Español)
 */

import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, CardGrid, Paragraph, useEs, useZh } from '../components/content';

const CONTENTS: { title: { en: string; zh: string; es: string }; text: { en: string; zh: string; es: string } }[] = [
  { title: { en: 'Greetings', zh: '問候語', es: 'Saludos' }, text: { en: 'Spoken greetings in 55 human languages, plus a greeting from whales.', zh: '五十五種人類語言的問候，還有一段來自鯨魚的問候。', es: 'Saludos hablados en 55 idiomas humanos, además de un saludo de las ballenas.' } },
  { title: { en: 'Sounds of Earth', zh: '地球之聲', es: 'Sonidos de la Tierra' }, text: { en: 'Natural sounds — wind, thunder, surf, birds — and sounds of human activity.', zh: '自然之聲——風、雷、海浪、鳥鳴——以及人類活動的聲音。', es: 'Sonidos naturales — viento, truenos, olas, aves — y sonidos de la actividad humana.' } },
  { title: { en: 'Music', zh: '音樂', es: 'Música' }, text: { en: 'Around 90 minutes of music from many cultures and eras, including Bach, Beethoven and Chuck Berry.', zh: '約九十分鐘、來自多元文化與時代的音樂，包括巴哈、貝多芬與查克·貝里。', es: 'Unos 90 minutos de música de muchas culturas y épocas, incluidos Bach, Beethoven y Chuck Berry.' } },
  { title: { en: 'Images', zh: '影像', es: 'Imágenes' }, text: { en: '115 analogue-encoded images showing science, human anatomy, daily life, art and places on Earth.', zh: '一百一十五張以類比方式編碼的影像，涵蓋科學、人體、日常生活、藝術與地球各地。', es: '115 imágenes codificadas en analógico: ciencia, anatomía humana, vida diaria, arte y lugares de la Tierra.' } },
  { title: { en: 'Scientific information', zh: '科學資訊', es: 'Información científica' }, text: { en: 'A map of pulsars pointing back to the Sun and a drawing of the hydrogen atom — Earth\u2019s cosmic address.', zh: '一張能反推太陽位置的脈衝星地圖，以及氫原子的示意圖——地球在宇宙中的地址。', es: 'Un mapa de púlsares que apunta de vuelta al Sol y un dibujo del átomo de hidrógeno — la dirección cósmica de la Tierra.' } },
  { title: { en: 'How to play it', zh: '如何播放', es: 'Cómo reproducirlo' }, text: { en: 'An engraved diagram explains the playback speed and how to decode the images and audio.', zh: '唱片上的蝕刻圖示說明了播放速度，以及如何解讀影像與聲音。', es: 'Un diagrama grabado explica la velocidad de reproducción y cómo decodificar imágenes y audio.' } },
];

export default function GoldenRecordPage() {
  const zh = useZh();
  const es = useEs();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="golden-record"
        title={bi('The Voyager Golden Record', '航海家金唱片', 'El Disco de Oro de Voyager')}
        intro={bi(
          'Attached to each Voyager is a gold-plated phonograph record — a time capsule of sounds, music, greetings and images intended to tell another civilization who made the spacecraft and where Earth is.',
          '每艘航海家號上都裝有一張鍍金唱片——收錄聲音、音樂、問候與影像的時間膠囊，用意是告訴另一個文明：打造這艘太空船的是誰，地球又在哪裡。',
          'Cada Voyager lleva un disco fonográfico chapado en oro — una cápsula del tiempo con sonidos, música, saludos e imágenes para contar a otra civilización quién hizo la nave y dónde está la Tierra.',
        )}
      />

      <BiSection
        id="why"
        kicker={bi('Why it exists', '為何存在', 'Por qué existe')}
        title={bi('Why was the Golden Record created?', '金唱片為什麼會被創造？', '¿Por qué se creó el Disco de Oro?')}
      >
        <Paragraph
          value={bi(
            'The Voyagers are on trajectories that will carry them among the stars for millions of years. A committee led by Carl Sagan designed the record so that, if another civilization ever finds a Voyager, they will have a portrait of the world that built it.',
            '航海家號的軌道將讓它們在群星之間漂流數百萬年。由卡爾·薩根主持的委員會設計了這張唱片：若另一個文明真的找到航海家號，他們將能擁有一幅「打造它的世界」的肖像。',
            'Las Voyager viajan en trayectorias que las llevarán entre las estrellas durante millones de años. Un comité dirigido por Carl Sagan diseñó el disco para que, si otra civilización encuentra una Voyager, tenga un retrato del mundo que la construyó.',
          )}
        />
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'The record is a 30-centimetre copper disk plated with gold, with a cartridge and needle included, plus pictorial instructions for playing it. Copies flew on both Voyager 1 and Voyager 2.',
            '唱片是一張直徑約三十公分、鍍金的銅盤，隨附唱針與播放說明圖。航海家一號與二號各攜帶一張。',
            'El disco es un disco de cobre de ~30 cm chapado en oro, con aguja e instrucciones pictóricas para reproducirlo. Viajaron copias en la Voyager 1 y en la Voyager 2.',
          )}
        />
      </BiSection>

      <BiSection
        id="contents"
        kicker={bi('What is on it', '收錄內容', 'Qué contiene')}
        title={bi('What the record contains', '唱片裡有什麼', 'Qué contiene el disco')}
      >
        <CardGrid items={CONTENTS} />
      </BiSection>

      <BiSection
        id="symbolism"
        kicker={bi('Why it matters', '它的意義', 'Por qué importa')}
        title={bi('The record\u2019s meaning', '金唱片的象徵意義', 'El significado del disco')}
      >
        <Paragraph
          value={bi(
            'The Golden Record is the most ambitious message ever sent from Earth into space. It is a deliberate exercise in optimism: it assumes whoever finds it will be able — and willing — to decode it.',
            '金唱片是地球送往太空中最具企圖心的一則訊息，也是一次刻意的樂觀練習：它假設發現者有能力——也願意——解讀它。',
            'El Disco de Oro es el mensaje más ambicioso jamás enviado desde la Tierra al espacio. Es un ejercicio deliberado de optimismo: asume que quien lo encuentre podrá — y querrá — decodificarlo.',
          )}
        />
        <div className="my-4 rounded-xl border border-amber-400/40 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-100">
          <p className="mb-1.5 font-semibold text-white">
            {zh ? '一個務實的提醒' : es ? 'Una nota realista' : 'A realistic note'}
          </p>
          <p>
            {zh
              ? '被發現的機率微乎其微——與其說金唱片是寫給未來，不如說它是我們對現在的宣言。'
              : es
                ? 'La probabilidad de que alguien encuentre una Voyager es mínima. El disco es tanto una declaración sobre el presente como un mensaje al futuro.'
                : 'The chance that any Voyager will be found is extremely small. The record is as much a statement about the present as it is a message to the future.'}
          </p>
        </div>
      </BiSection>

      <BiSection
        id="listen"
        kicker={bi('Want to know more?', '想了解更多？', '¿Quieres saber más?')}
        title={bi('Explore the full contents', '探索完整內容', 'Explora el contenido completo')}
      >
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh ? (
            <>NASA 已公開唱片的完整內容，包括全部影像與音訊。連結請見 <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">資料來源</a>頁。</>
          ) : es ? (
            <>La NASA ha publicado el contenido completo del disco, incluidas las imágenes y el audio. Enlaces en la página de <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">Fuentes</a>.</>
          ) : (
            <>NASA has published the full contents of the record, including the complete image set and audio. Links are listed on the <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">Sources page</a>.</>
          )}
        </p>
      </BiSection>

      <RelatedLinks items={['voyager-1', 'voyager-2', 'mission', 'discoveries', 'about']} />
    </div>
  );
}

