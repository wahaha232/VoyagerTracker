/**
 * FaqPage — /faq.html  (EN / 繁中)
 */

import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, useZh } from '../components/content';

interface QA {
  q: { en: string; zh: string };
  a: { en: string; zh: string };
}

const FAQ_ITEMS: QA[] = [
  { q: bi('What is Voyager 1?', '航海家一號是什麼？'), a: bi('A NASA spacecraft launched on 5 September 1977. It flew past Jupiter and Saturn and, in 2012, became the first human-made object to enter interstellar space.', '1977 年 9 月 5 日發射的 NASA 太空船。它飛掠過木星與土星，並於 2012 年成為第一個進入星際空間的人造物體。') },
  { q: bi('What is Voyager 2?', '航海家二號是什麼？'), a: bi('Voyager 1\u2019s twin, launched on 20 August 1977. It is the only spacecraft to have visited Uranus and Neptune, and it entered interstellar space in 2018.', '航海家一號的孿生探測器，1977 年 8 月 20 日發射。它是唯一造訪過天王星與海王星的太空船，並於 2018 年進入星際空間。') },
  { q: bi('When were the Voyager spacecraft launched?', '航海家號何時發射？'), a: bi('Voyager 2 launched first on 20 August 1977, followed by Voyager 1 on 5 September 1977, both from Cape Canaveral, Florida.', '1977 年 8 月 20 日航海家二號先行發射，9 月 5 日航海家一號跟進，兩者皆從美國佛羅里達州卡納維爾角升空。') },
  { q: bi('Which Voyager is farther from Earth?', '哪一艘航海家離地球比較遠？'), a: bi('Voyager 1. It was placed on a faster trajectory and has been pulling steadily ahead of Voyager 2 for decades.', '航海家一號。它被送入較快的軌道，數十年來已穩定超越航海家二號。') },
  { q: bi('Which Voyager entered interstellar space first?', '哪一艘先進入星際空間？'), a: bi('Voyager 1 crossed the heliopause in 2012; Voyager 2 followed in 2018.', '航海家一號於 2012 年穿越日球層頂；航海家二號則於 2018 年跟進。') },
  { q: bi('How fast are the Voyager spacecraft traveling?', '航海家號的飛行速度多快？'), a: bi('Relative to the Sun, about 17 km/s for Voyager 1 and about 15 km/s for Voyager 2 — roughly 61,000 and 54,000 km/h.', '相對於太陽，航海家一號約 17 公里/秒，二號約 15 公里/秒——分別約為每小時 61,000 與 54,000 公里。') },
  { q: bi('Where are Voyager 1 and Voyager 2 now?', '航海家一號與二號現在在哪裡？'), a: bi('Both are in interstellar space, travelling in different directions: Voyager 1 toward the north of the solar system\u2019s plane and Voyager 2 toward the south.', '兩者都在星際空間中，朝不同方向前進：航海家一號往太陽系軌道面北方，航海家二號往南方。') },
  { q: bi('How far away are the Voyager spacecraft?', '航海家號離我們多遠？'), a: bi('It changes daily. See the live tracker on the home page or the Voyager 1 and Voyager 2 pages for the current estimated distance from Earth and the Sun.', '這個數字每天都在變。請到首頁或航海家一號／二號頁面的即時追蹤器，查看目前與地球、太陽的估計距離。') },
  { q: bi('Are the Voyager spacecraft still communicating with Earth?', '航海家號還在與地球通訊嗎？'), a: bi('Yes. Both still return data through NASA\u2019s Deep Space Network, although instruments are powered down over time to manage declining power.', '是的。兩者仍透過 NASA 的深空網路回傳資料，只是會隨著電力下降而逐步關閉儀器。') },
  { q: bi('What is interstellar space?', '什麼是星際空間？'), a: bi('The region beyond the heliosphere where the Sun\u2019s influence fades and the material between the stars dominates.', '日球層以外的區域：太陽的影響逐漸消失，恆星之間的物質開始主導。') },
  { q: bi('What is the heliosphere?', '什麼是日球層？'), a: bi('A bubble of solar wind and magnetic field carved out around the Sun. Its outer edge — the heliopause — is where interstellar space begins.', '太陽風與磁場在太陽周圍形成的氣泡。其外緣「日球層頂」即星際空間的起點。') },
  { q: bi('What is the Golden Record?', '什麼是金唱片？'), a: bi('A gold-plated phonograph record carried by both Voyagers with images, sounds, music and greetings representing Earth to any civilization that finds it.', '搭載於兩艘航海家號上的鍍金唱片，收錄了影像、聲音、音樂與問候，向任何發現它的文明介紹地球。') },
  { q: bi('Why did the two Voyagers take different paths?', '為什麼兩艘航海家號的路線不同？'), a: bi('Voyager 1\u2019s close flyby of Saturn\u2019s moon Titan bent its path north, out of the planets\u2019 plane. Voyager 2 kept a path that allowed Uranus and Neptune flybys.', '航海家一號近距離飛掠土星衛星泰坦後，軌道被甩向北方、離開行星軌道面；航海家二號則沿著能繼續造訪天王星與海王星的路線前進。') },
  { q: bi('How does Voyager Tracker calculate distance?', '航海家號追蹤器如何計算距離？'), a: bi('It takes a published NASA/JPL baseline distance and speed, then projects the distance forward using the elapsed time. Full details are on the How It Works page.', '採用 NASA/JPL 公布的基準距離與速度，再依經過時間向前推估。完整說明見「資料與計算方法」頁。') },
  { q: bi('Is Voyager Tracker an official NASA website?', '航海家號追蹤器是 NASA 官方網站嗎？'), a: bi('No. Voyager Tracker is an independent educational project and is not affiliated with or endorsed by NASA or JPL.', '不是。「航海家號追蹤器」是獨立的教育專案，與 NASA 或 JPL 無關，也未獲其背書。') },
  { q: bi('How often is the information updated?', '資訊多久更新一次？'), a: bi('The interpolated counters update about ten times per second in your browser. The underlying data baseline is refreshed whenever new official figures are published.', '插值計數器會在你的瀏覽器內每秒更新約十次。底層資料基準則會在新官方數字公布時更新。') },
  { q: bi('Can I share or reuse the content?', '我可以分享或重用這些內容嗎？'), a: bi('Yes — this site exists for education. Please link back to it and do not present the figures as official NASA live telemetry.', '可以——本站以教育為目的。請附上本站連結，並不要把數字偽裝成 NASA 官方即時遙測。') },
];

export default function FaqPage() {
  const zh = useZh();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="faq"
        title={bi('Voyager FAQ', '航海家號常見問題')}
        intro={bi(
          'Seventeen honest, plain-language answers about Voyager 1 and Voyager 2 — what they are, where they are now, and how this website gets its numbers.',
          '十七個關於航海家一號與二號的誠實、白話解答——它們是什麼、現在在哪裡，以及本站的數字從何而來。',
        )}
      />

      <BiSection id="questions" kicker={bi('Questions & answers', '問題與解答')} title={bi('Everything people ask us', '大家常問的問題')}>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <details key={item.q.en} className="group rounded-xl border border-slate-800 bg-space-900/40 open:border-cyan-500/40">
              <summary className="cursor-pointer list-none p-4 font-medium text-slate-100 transition-colors hover:text-cyan-300">
                <span className="mr-2 font-mono text-xs font-bold text-cyan-400">{String(i + 1).padStart(2, '0')}</span>
                {zh ? item.q.zh : item.q.en}
              </summary>
              <p className="border-t border-slate-800 px-4 py-3 text-sm leading-relaxed text-slate-400">
                {zh ? item.a.zh : item.a.en}
              </p>
            </details>
          ))}
        </div>
      </BiSection>

      <div className="my-6 rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-5 text-sm leading-relaxed text-emerald-100">
        <p className="mb-1.5 font-semibold text-white">{zh ? '還有疑問嗎？' : 'Still curious?'}</p>
        <p>
          {zh ? (
            <>
              想了解更詳細的資料說明，請見{' '}
              <a href={pageUrl('how-it-works')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">
                資料與計算方法
              </a>
              頁；本站使用的每份官方參考，都列在{' '}
              <a href={pageUrl('sources')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">
                資料來源
              </a>
              頁。
            </>
          ) : (
            <>
              The{' '}
              <a href={pageUrl('how-it-works')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">
                How It Works page
              </a>{' '}
              explains the data in more detail, and the{' '}
              <a href={pageUrl('sources')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">
                Sources page
              </a>{' '}
              lists every official reference used by this site.
            </>
          )}
        </p>
      </div>

      <RelatedLinks items={['voyager-1', 'voyager-2', 'how-it-works', 'about', 'sources']} />
    </div>
  );
}

