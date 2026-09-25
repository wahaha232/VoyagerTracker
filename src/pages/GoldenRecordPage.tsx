/**
 * GoldenRecordPage — /golden-record.html  (EN / 繁中 / Español)
 */

import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, Paragraph, useEs, useZh } from '../components/content';
import GoldenRecordExplorer from '../components/GoldenRecordExplorer';


export default function GoldenRecordPage() {
  const zh = useZh();
  const es = useEs();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="golden-record"
        title={bi('The Voyager Golden Record — history, contents and purpose', '航海家金唱片——歷史、內容與目的', 'El Disco de Oro de Voyager: historia, contenido y propósito')}
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
        <GoldenRecordExplorer />
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

      <BiSection id="who" title={bi('Who chose what went on it', '誰決定了唱片內容', 'Quién eligió su contenido')}>
        <Paragraph
          value={bi(
            'NASA asked astronomer Carl Sagan of Cornell University to lead the selection. A small team — including Frank Drake, Ann Druyan, Timothy Ferris, Jon Lomberg and Linda Salzman Sagan — chose the sounds, music and images in 1977, working to a tight deadline before the launches. They aimed for a broad portrait of Earth and its cultures rather than a single nation’s view.',
            'NASA 邀請康乃爾大學的天文學家卡爾．薩根主持內容選擇。一個小團隊——包括法蘭克．德雷克、安．德魯彥、提摩西．費里斯、瓊．隆伯格與琳達．薩爾茲曼．薩根——在 1977 年、趕在發射前的緊迫期限內，挑選了聲音、音樂與影像。他們希望呈現的是地球與各種文化的廣泛面貌，而非單一國家的觀點。',
            'La NASA pidió al astrónomo Carl Sagan, de la Universidad Cornell, que dirigiera la selección. Un pequeño equipo —con Frank Drake, Ann Druyan, Timothy Ferris, Jon Lomberg y Linda Salzman Sagan— eligió en 1977 los sonidos, la música y las imágenes con un plazo muy ajustado antes de los lanzamientos. Buscaban un retrato amplio de la Tierra y sus culturas, no la visión de un solo país.',
          )}
        />
      </BiSection>

      <BiSection id="voices" title={bi('Greetings and languages', '問候與語言', 'Saludos e idiomas')}>
        <Paragraph
          value={bi(
            'The spoken greetings range from ancient Akkadian, spoken in Sumer about 6,000 years ago, to modern ones spoken by billions, with many regional languages in between. They are short and simple — most amount to “hello” or “greetings from Earth”. The record also carries messages from United Nations Secretary-General Kurt Waldheim and U.S. President Jimmy Carter.',
            '口說問候涵蓋了約 6,000 年前通行於蘇美地區的古代阿卡德語，到如今有數十億人使用的現代語言，中間還包括許多地方語言。這些問候簡短樸實——大多相當於「你好」或「來自地球的問候」。唱片也收錄了聯合國秘書長庫爾特．華德翰與美國總統吉米．卡特的訊息。',
            'Los saludos hablados van desde el antiguo acadio, hablado en Sumer hace unos 6000 años, hasta idiomas modernos que hablan miles de millones de personas, con muchas lenguas regionales entre medias. Son breves y sencillos: casi todos equivalen a «hola» o «saludos desde la Tierra». El disco lleva también mensajes del secretario general de la ONU, Kurt Waldheim, y del presidente estadounidense Jimmy Carter.',
          )}
        />
      </BiSection>

      <BiSection id="on-the-spacecraft" title={bi('How it travels on the spacecraft', '它如何隨太空船旅行', 'Cómo viaja en la nave')}>
        <Paragraph
          value={bi(
            'Each record is mounted on the outside of the spacecraft’s main body, protected by an aluminium cover. The cover is engraved with instructions: how to play the record at 16⅔ revolutions per minute, how to turn the signals into pictures, and a map locating the Sun relative to 14 pulsars. A tiny sample of uranium-238 on the cover acts as a clock, so a finder could work out how long ago the record was made.',
            '每張唱片都固定在太空船主體外側，並以鋁製外殼保護。外殼上刻有說明：如何以每分鐘 16⅔ 轉播放唱片、如何把訊號轉換成影像，以及一張以 14 顆脈衝星標示太陽位置的地圖。外殼上還有一小塊鈾－238 樣本作為時鐘，讓發現者能推算出唱片是多久以前製作的。',
            'Cada disco va montado en el exterior del cuerpo principal de la nave, protegido por una cubierta de aluminio. La cubierta lleva grabadas instrucciones: cómo reproducirlo a 16⅔ revoluciones por minuto, cómo convertir las señales en imágenes y un mapa que sitúa el Sol respecto a 14 púlsares. Una pequeña muestra de uranio-238 en la cubierta hace de reloj, para que quien lo encuentre pueda calcular cuándo se hizo.',
          )}
        />
      </BiSection>

      <BiSection id="significance" title={bi('Historical significance', '歷史意義', 'Importancia histórica')}>
        <Paragraph
          value={bi(
            'The record followed the simpler engraved plaques carried by Pioneer 10 and 11, and it remains the most detailed message humanity has sent beyond the solar system. Its lasting impact has been on Earth: it prompted discussion about how humanity should represent itself, what was included and what was left out, and it has inspired exhibitions, books and a public reissue of its audio decades later.',
            '這張唱片承襲了先鋒十號與十一號所攜帶、較簡單的蝕刻金屬板，至今仍是人類送出太陽系、內容最詳盡的訊息。它最深遠的影響其實在地球上：它引發了人類該如何介紹自己的討論——包括收錄了什麼、又遺漏了什麼——並在數十年後啟發了展覽、書籍，以及音訊內容的公開再版。',
            'El disco siguió a las placas grabadas, más sencillas, de las Pioneer 10 y 11, y sigue siendo el mensaje más detallado que la humanidad ha enviado fuera del sistema solar. Su impacto más duradero ha sido en la Tierra: provocó debates sobre cómo debería representarse la humanidad, qué se incluyó y qué se dejó fuera, e inspiró exposiciones, libros y una reedición pública de su audio décadas después.',
          )}
        />
      </BiSection>

      <BiSection id="sources" title={bi('Explore the original', '探索原始內容', 'Explora el original')}>
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh
            ? '本頁以本站文字整理，未重製唱片中受著作權保護的錄音或影像。NASA 提供唱片的官方介紹與內容清單：'
            : es
              ? 'Esta página es un resumen propio y no reproduce grabaciones ni imágenes protegidas del disco. La NASA ofrece la presentación oficial y la lista de contenidos:'
              : 'This page is a summary written for this site and does not reproduce any of the record’s copyrighted recordings or images. NASA provides the official overview and contents list:'}{' '}
          <a href="https://science.nasa.gov/mission/voyager/voyager-golden-record-overview/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
            NASA Science — The Golden Record
          </a>
          .
        </p>
      </BiSection>

      <RelatedLinks items={['why-voyager-matters', 'voyager-1', 'voyager-2', 'timeline', 'faq']} />
    </div>
  );
}

