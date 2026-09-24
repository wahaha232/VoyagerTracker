/**
 * AboutPage — /about.html  (EN / 繁中 / Español)
 *
 * Who runs the site, why it exists, how it works, what data it uses, its
 * limits, its independence from NASA/JPL and how to get in touch.
 */

import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { ExternalLinkIcon } from '../components/icons';
import { BiArticleHeader, BiSection, Bullets, Paragraph, bi, txt, useLang } from '../components/content';

export default function AboutPage() {
  const locale = useLang();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="about"
        title={bi('About Voyager Tracker', '關於航海家號追蹤器', 'Acerca del Rastreador Voyager')}
        intro={bi(
          'An independent educational website about NASA’s two Voyager spacecraft: where they are, how we know, and why the mission still matters.',
          '一個關於 NASA 兩艘航海家太空船的獨立教育網站：它們在哪裡、我們如何得知，以及這項任務為何至今仍重要。',
          'Un sitio educativo independiente sobre las dos naves Voyager de la NASA: dónde están, cómo lo sabemos y por qué la misión sigue importando.',
        )}
      />

      <BiSection id="who" title={bi('Who runs this site?', '誰在經營本站？', '¿Quién lleva este sitio?')}>
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {txt(
            bi(
              'Voyager Tracker is a non-commercial side project built and maintained by an independent developer, published through the public GitHub account',
              '「航海家號追蹤器」是一位獨立開發者製作與維護的非商業業餘專案，透過公開的 GitHub 帳號',
              'El Rastreador Voyager es un proyecto personal no comercial, creado y mantenido por un desarrollador independiente y publicado desde la cuenta pública de GitHub',
            ),
            locale,
          )}{' '}
          <a href="https://github.com/wahaha232" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-300 underline underline-offset-2">
            wahaha232 <ExternalLinkIcon className="h-3 w-3" />
          </a>
          {txt(
            bi(
              '. It is not run by a company, a space agency or a university. All of the site’s code, including the calculation model, is public so anyone can check how it works.',
              '發布。本站並非由公司、太空機構或大學經營。網站的所有程式碼（包括計算模型）都是公開的，任何人都能檢查它如何運作。',
              '. No lo gestiona ninguna empresa, agencia espacial ni universidad. Todo el código, incluido el modelo de cálculo, es público para que cualquiera pueda comprobar cómo funciona.',
            ),
            locale,
          )}
        </p>
      </BiSection>

      <BiSection id="why" title={bi('Why it was created — and what problem it solves', '為何建立本站——以及它解決什麼問題', 'Por qué se creó y qué problema resuelve')}>
        <Paragraph
          value={bi(
            'Searching “how far away is Voyager 1” usually returns a single large number. That number is hard to picture, it changes every second, it differs slightly from site to site, and it rarely comes with an explanation of where it came from or what it means.',
            '搜尋「航海家一號有多遠」，通常只會得到一個很大的數字。這個數字難以想像、每秒都在變、各網站之間略有差異，而且很少附上它從哪裡來、代表什麼意義的說明。',
            'Buscar «a qué distancia está la Voyager 1» suele devolver una sola cifra enorme. Es difícil de imaginar, cambia cada segundo, varía un poco entre sitios y casi nunca explica de dónde sale ni qué significa.',
          )}
        />
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'This site tries to answer the questions that come after the number: how that distance is calculated and how accurate it is, why the distance from Earth sometimes shrinks, how the two probes compare, what they discovered, and why a mission launched in 1977 is still scientifically important.',
            '本站試著回答看到數字之後的問題：這個距離如何計算、有多準確、為什麼與地球的距離有時會縮小、兩艘探測器有何差異、它們發現了什麼，以及一項 1977 年發射的任務為何至今仍具科學價值。',
            'Este sitio intenta responder a las preguntas que vienen después de la cifra: cómo se calcula esa distancia y qué precisión tiene, por qué a veces se reduce la distancia a la Tierra, cómo se comparan las dos sondas, qué descubrieron y por qué una misión de 1977 sigue siendo importante.',
          )}
        />
      </BiSection>

      <BiSection id="focus" title={bi('What Voyager Tracker focuses on', '航海家號追蹤器的重點', 'En qué se centra el Rastreador Voyager')}>
        <Bullets
          items={[
            bi('Continuously calculated distance estimates, validated against JPL’s own predictions and published with their error.', '持續計算的距離估計值，已與 JPL 自己的預測比對驗證，並公開其誤差。', 'Estimaciones de distancia calculadas continuamente, validadas con las predicciones de JPL y publicadas con su error.'),
            bi('Context for every number: light time, unit conversions, scale comparisons and milestones.', '替每個數字提供脈絡：光行時間、單位換算、尺度比較與里程碑。', 'Contexto para cada cifra: tiempo de luz, conversiones, comparaciones de escala e hitos.'),
            bi('A side-by-side Voyager 1 vs Voyager 2 comparison, with a 50-year chart built from JPL data.', '航海家一號與二號的並列比較，附上以 JPL 資料繪製的 50 年圖表。', 'Una comparación lado a lado de Voyager 1 y 2, con un gráfico de 50 años hecho con datos de JPL.'),
            bi('An interactive mission timeline in which every event has its context and source.', '互動式任務時間軸，每個事件都附有背景脈絡與資料來源。', 'Una cronología interactiva en la que cada evento tiene su contexto y su fuente.'),
            bi('Plain-language explanations of the science, written for this site.', '為本站撰寫、以淺白語言說明的科學解說。', 'Explicaciones científicas en lenguaje claro, escritas para este sitio.'),
            bi('Methodology transparency: the formulas, the data, the validation and the limitations are all published.', '方法透明：公式、資料、驗證與限制全部公開。', 'Transparencia metodológica: fórmulas, datos, validación y límites están publicados.'),
            bi('Three languages — English, Traditional Chinese and Spanish.', '三種語言——英文、繁體中文與西班牙文。', 'Tres idiomas: inglés, chino tradicional y español.'),
          ]}
        />
      </BiSection>

      <BiSection id="how" title={bi('How it works', '運作方式', 'Cómo funciona')}>
        <Paragraph
          value={bi(
            'Each page is a static web page. The trackers take the official position and velocity of each probe from NASA/JPL’s Horizons system and move them forward in time in your browser, together with Earth’s position on its orbit. Nothing is downloaded from NASA while you browse, and no account or server is involved.',
            '每個頁面都是靜態網頁。追蹤器從 NASA/JPL 的 Horizons 系統取得每艘探測器的官方位置與速度，並在您的瀏覽器中連同地球在軌道上的位置一起向前推算。瀏覽時不會向 NASA 下載任何資料，也不涉及任何帳號或伺服器。',
            'Cada página es una página web estática. Los rastreadores toman la posición y la velocidad oficiales de cada sonda del sistema Horizons de NASA/JPL y las avanzan en el tiempo en tu navegador, junto con la posición de la Tierra en su órbita. No se descarga nada de la NASA mientras navegas y no intervienen cuentas ni servidores.',
          )}
        />
        <p className="mt-3 text-sm">
          <a href={pageUrl('how-it-works')} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
            {txt(bi('Full methodology and validation →', '完整方法與驗證 →', 'Metodología y validación completas →'), locale)}
          </a>
          <span className="mx-2 text-slate-600">·</span>
          <a href={pageUrl('sources')} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
            {txt(bi('Data sources →', '資料來源 →', 'Fuentes de datos →'), locale)}
          </a>
        </p>
      </BiSection>

      <BiSection id="limits" title={bi('Limitations', '限制', 'Limitaciones')}>
        <Bullets
          items={[
            bi('Figures are estimates, not measurements received from the spacecraft.', '數字是估計值，而非從探測器接收的量測。', 'Las cifras son estimaciones, no mediciones enviadas por las naves.'),
            bi('They depend on your device clock being correct.', '它們取決於您裝置的時鐘是否準確。', 'Dependen de que el reloj de tu dispositivo sea correcto.'),
            bi('Mission news and instrument status are updated by hand and can lag behind NASA announcements.', '任務消息與儀器狀態由人工更新，可能落後於 NASA 的公告。', 'Las noticias y el estado de instrumentos se actualizan a mano y pueden ir por detrás de la NASA.'),
            bi('This is a small independent project; mistakes are possible and are corrected publicly on the Updates page.', '這是小型獨立專案，難免出錯；錯誤會在更新紀錄頁公開更正。', 'Es un proyecto independiente y pequeño; puede haber errores y se corrigen públicamente en Novedades.'),
          ]}
        />
      </BiSection>

      <BiSection id="not-nasa" title={bi('Not affiliated with NASA or JPL', '與 NASA 或 JPL 無關', 'Sin afiliación con la NASA ni JPL')}>
        <div className="rounded-xl border border-amber-400/40 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-50">
          {txt(
            bi(
              'Voyager Tracker is an independent, unofficial educational project. It is not affiliated with, endorsed by, or sponsored by NASA or the Jet Propulsion Laboratory (JPL). Displayed distance, velocity and other spacecraft information is calculated or estimated and should not be interpreted as official NASA mission telemetry. The site claims no official status and invents no partnerships.',
              '「航海家號追蹤器」是獨立、非官方的教育專案，與 NASA 或噴射推進實驗室（JPL）沒有任何關聯，也未獲其背書或贊助。本站顯示的距離、速度與其他太空船資訊為計算或估計值，不應被視為 NASA 官方任務遙測。本站不宣稱任何官方身分，也不虛構任何合作關係。',
              'El Rastreador Voyager es un proyecto educativo independiente y no oficial. No está afiliado, respaldado ni patrocinado por la NASA ni por el Jet Propulsion Laboratory (JPL). La distancia, la velocidad y demás datos mostrados son calculados o estimados y no deben interpretarse como telemetría oficial. El sitio no reclama ningún estatus oficial ni inventa alianzas.',
            ),
            locale,
          )}
        </div>
      </BiSection>

      <BiSection id="contact" title={bi('Contact', '聯絡方式', 'Contacto')}>
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {txt(bi('Corrections, suggestions and questions are welcome through the', '歡迎透過', 'Correcciones, sugerencias y preguntas son bienvenidas en la'), locale)}{' '}
          <a href={pageUrl('contact')} className="text-cyan-300 underline underline-offset-2">
            {txt(bi('Contact page', '聯絡我們頁面', 'página de Contacto'), locale)}
          </a>
          {txt(bi(', which opens a public issue on GitHub.', '提出更正、建議與問題；該頁面會在 GitHub 開啟一則公開的 Issue。', ', que abre una incidencia pública en GitHub.'), locale)}
        </p>
      </BiSection>

      <RelatedLinks items={['how-it-works', 'sources', 'updates', 'contact', 'privacy', 'terms']} />
    </div>
  );
}
