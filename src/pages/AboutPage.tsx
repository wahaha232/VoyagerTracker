/**
 * AboutPage — /about.html  (EN / 繁中)
 */

import { RelatedLinks } from '../components/ui';
import {
  BiArticleHeader,
  BiSection,
  bi,
  BiText,
  Bullets,
  Paragraph,
} from '../components/content';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="about"
        title={bi('About Voyager Tracker', '關於航海家號追蹤器')}
        intro={bi(
          'Voyager Tracker is a small, independent website that combines a live (estimated) spacecraft tracker with educational writing about the Voyager mission. This page explains what the site is — and what it is not.',
          '「航海家號追蹤器」是一個結合「即時（估計）太空船追蹤」與「航海家任務教育文章」的小型獨立網站。本頁說明這個網站是什麼——以及它不是什麼。',
        )}
      />

      <BiSection id="purpose" kicker={bi('Purpose', '宗旨')} title={bi('Why this site exists', '本站為何存在')}>
        <Paragraph
          value={bi(
            'The Voyager mission is easy to reduce to a single number — "24 billion kilometres away". This site puts that number in context: what Voyager 1 and Voyager 2 are, where they have been, what they discovered, and what the distances and speeds on a dashboard actually mean.',
            '航海家任務很容易被簡化成一個數字：「兩百多億公里遠」。本站把這個數字放回脈絡中：航海家一號與二號是什麼、去過哪裡、發現了什麼，以及儀表板上的距離與速度究竟代表什麼。',
          )}
        />
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'The project is built for science education and information display. It is free, contains no fabricated mission news, and is honest whenever a figure is an estimate rather than an official measurement.',
            '本站以科學教育與資訊展示為目的。它免費、沒有虛構的任務新聞，並且在數字屬於「估計值」而非官方量測時誠實標示。',
          )}
        />
      </BiSection>

      <BiSection id="features" kicker={bi('Features', '功能')} title={bi('What the site offers', '本站提供什麼')}>
        <Bullets
          items={[
            bi(
              'Live (estimated) distance, speed and status trackers for both spacecraft',
              '兩艘探測器的即時（估計）距離、速度與狀態追蹤器',
            ),
            bi('An interactive 3D model of the Voyager spacecraft', '可互動的航海家太空船 3D 模型'),
            bi('A 2D heliocentric trajectory map', '日心軌跡 2D 示意圖'),
            bi('Mission history pages for Voyager 1 and Voyager 2', '航海家一號與二號的任務歷史頁面'),
            bi('A fact-based mission timeline and discoveries overview', '以事實為基礎的任務時間軸與發現總覽'),
            bi('A transparent methodology page explaining every figure', '透明說明每個數字如何得出的方法頁'),
            bi('Golden Record introduction, FAQ and source references', '金唱片介紹、常見問題與資料來源'),
          ]}
        />
      </BiSection>

      <BiSection id="data" kicker={bi('Data', '資料')} title={bi('Where the data comes from', '資料從哪裡來')}>
        <Paragraph
          value={bi(
            'Historical facts come from NASA/JPL public mission records. Distance and speed baselines use NASA\u2019s published Voyager data, projected forward by each probe\u2019s velocity. The site does not receive telemetry directly from the spacecraft, and every interactive figure is labelled as an estimate.',
            '歷史事實取自 NASA/JPL 的公開任務紀錄。距離與速度基準採用 NASA 公布的航海家資料，再依各探測器速度向前推估。本站不會直接接收太空船的遙測，所有互動數字也都標示為估計值。',
          )}
        />
      </BiSection>

      <BiSection id="not-nasa" kicker={bi('Honesty', '誠實說明')} title={bi('This is not a NASA website', '這不是 NASA 官方網站')}>
        <div className="my-2 rounded-xl border border-amber-400/40 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-100">
          <p className="mb-1.5 font-semibold text-white">
            <BiText value={bi('Read this', '請先閱讀')} />
          </p>
          <p>
            <BiText
              value={bi(
                'Voyager Tracker is an independent educational project and is not affiliated with or endorsed by NASA or JPL. We claim no official status, invent no partnerships, and do not publish information we cannot verify.',
                '「航海家號追蹤器」是獨立的教學專案，與 NASA 或 JPL 並無關聯，也未獲其背書。本站不宣稱任何官方身分、不虛構合作關係，也不會刊登無法查證的資訊。',
              )}
            />
          </p>
        </div>
      </BiSection>

      <BiSection id="philosophy" kicker={bi('Approach', '開發理念')} title={bi('Development philosophy', '開發理念')}>
        <Bullets
          items={[
            bi('Keep improving the interactive tracker — never break the core tool.', '持續改進互動追蹤器——絕不破壞核心工具。'),
            bi('Add content only when it has real educational value.', '只有在內容真正具有教育價值時才新增文字。'),
            bi('Attribute sources and label estimates clearly.', '清楚標示來源與估計值。'),
            bi('Keep the site fast, accessible and readable on mobile.', '維持網站快速、易於使用，並在手機上容易閱讀。'),
            bi('Never fabricate news, missions, authors or scientific results.', '絕不虛構新聞、任務、作者或科學成果。'),
          ]}
        />
      </BiSection>

      <RelatedLinks items={['how-it-works', 'faq', 'sources', 'contact', 'privacy']} />
    </div>
  );
}
