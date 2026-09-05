/**
 * Voyager1Page — /voyager-1.html  (EN / 繁中)
 */

import { INSTRUMENT_ZH, SPACECRAFT_META } from '../constants/voyagerData';
import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, FactGrid, useZh } from '../components/content';
import TrackerSection from '../components/TrackerSection';

const META = SPACECRAFT_META['voyager1'];

const FACTS: { term: { en: string; zh: string }; detail: { en: string; zh: string } }[] = [
  { term: bi('Launch', '發射'), detail: bi('5 September 1977, Cape Canaveral, Florida, USA (Titan IIIE-Centaur).', '1977 年 9 月 5 日，美國佛羅里達州卡納維爾角（泰坦三號E-半人馬火箭）。') },
  { term: bi('Mission start', '任務開始'), detail: bi('Initially a four-year mission to explore Jupiter and Saturn.', '最初是一項為期四年、探索木星與土星的任務。') },
  { term: bi('Jupiter flyby', '木星飛掠'), detail: bi('5 March 1979 — discovered the first active volcanoes beyond Earth, on Io.', '1979 年 3 月 5 日——在木衛一上發現地球以外首座活火山。') },
  { term: bi('Saturn flyby', '土星飛掠'), detail: bi('12 November 1980 — flew past Saturn and its moon Titan.', '1980 年 11 月 12 日——飛掠土星及其衛星泰坦。') },
  { term: bi('Interstellar space', '進入星際空間'), detail: bi('Crossed the heliopause on 25 August 2012, at about 121 AU from the Sun.', '2012 年 8 月 25 日、距離太陽約 121 AU 處穿越日球層頂。') },
  { term: bi('Today', '今日'), detail: bi('Still active, returning data from interstellar space through NASA\u2019s Deep Space Network.', '仍然活躍，持續透過 NASA 深空網路回傳星際空間的資料。') },
];

const JOURNEY: { title: { en: string; zh: string }; date: string; text: { en: string; zh: string } }[] = [
  { date: '5 Mar 1979', title: bi('Jupiter', '木星'), text: bi('Voyager 1 returned thousands of images of Jupiter and its moons. The most famous discovery: erupting volcanoes on Io — the first active volcanoes seen beyond Earth.', '航海家一號回傳了數千張木星與其衛星的影像。最著名的發現是木衛一上噴發的火山——地球以外首度看到的活火山。') },
  { date: '12 Nov 1980', title: bi('Saturn & Titan', '土星與泰坦'), text: bi('The rings were revealed as thousands of ringlets, and the Titan flyby bent the spacecraft\u2019s trajectory steeply northward — the reason it left the solar system faster than its twin.', '土星環被證實由數千道細環組成；泰坦飛掠讓太空船軌道急轉向北——這正是它比孿生探測器更快離開太陽系的原因。') },
  { date: '14 Feb 1990', title: bi('The Pale Blue Dot', '蒼藍小點'), text: bi('From about 6 billion km away, Voyager 1 photographed Earth — a pale blue dot smaller than a pixel.', '從約 60 億公里外，航海家一號拍下了地球——一個比畫素還小的蒼藍小點。') },
  { date: '25 Aug 2012', title: bi('Interstellar space', '星際空間'), text: bi('At about 121 AU, Voyager 1 crossed the heliopause. Instruments measured the interstellar plasma and the drop in solar particles — the first direct evidence a spacecraft had left the heliosphere.', '在約 121 AU 處，航海家一號穿越日球層頂。儀器量測到星際電漿與太陽粒子減少——這是太空船離開日球層的首個直接證據。') },
];

export default function Voyager1Page() {
  const zh = useZh();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="voyager-1"
        title={bi('Voyager 1 — Mission, Distance and Current Status', '航海家一號——任務、距離與目前狀態')}
        intro={bi(
          'Voyager 1 is NASA\u2019s most distant spacecraft and the first human-made object to reach interstellar space. Launched in 1977, it explored Jupiter and Saturn before heading out of the solar system — and it is still talking to Earth today.',
          '航海家一號是 NASA 距離最遠的太空船，也是第一個進入星際空間的人造物體。它於 1977 年發射，探索木星與土星後便朝向太陽系外飛去——至今仍持續與地球通訊。',
        )}
      />

      <TrackerSection
        ids={['voyager1']}
        title={zh ? '航海家一號即時追蹤器' : 'Voyager 1 Live Tracker'}
        intro={
          zh
            ? '航海家一號與地球、太陽的估計距離、巡航速度與任務現況。這些數值以 NASA/JPL 參考基準計算，並非官方即時遙測。'
            : 'Estimated distance from Earth and the Sun, cruising speed and mission status for Voyager 1. Values are calculated from a NASA/JPL-referenced baseline, not live official telemetry.'
        }
        showMap
        showModel
      />

      <BiSection id="what-is-voyager-1" kicker={bi('Profile', '介紹')} title={bi('What is Voyager 1?', '航海家一號是什麼？')}>
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh
            ? '航海家一號是 NASA 噴射推進實驗室為航海家計畫打造、兩艘近乎相同的探測器之一。它原本的任務是趁行星罕見排列之機探索外太陽系——而它做的遠比那更多。'
            : 'Voyager 1 is one of two nearly identical probes built by NASA\u2019s Jet Propulsion Laboratory for the Voyager program. It was designed to take advantage of a rare planetary alignment to explore the outer solar system — and it did far more than that.'}
        </p>
        <p className="mt-3 max-w-4xl leading-relaxed text-slate-300">
          {zh
            ? '完成木星與土星的既定任務後，航海家一號被導向行星軌道面的北方。它持續運作、持續量測，並於 2012 年成為第一艘穿越日球層頂的太空船——那是太陽影響力讓位給星際空間的邊界。'
            : 'After completing its planned encounters with Jupiter and Saturn, Voyager 1 was redirected north, out of the plane in which the planets orbit. It kept operating, kept taking measurements, and in 2012 became the first spacecraft to cross the heliopause.'}
        </p>
      </BiSection>

      <BiSection id="facts" kicker={bi('Facts', '重點資料')} title={bi('Voyager 1 at a glance', '航海家一號速覽')}>
        <FactGrid items={FACTS} />
      </BiSection>

      <BiSection id="journey" kicker={bi('Journey', '旅程')} title={bi('Voyager 1\u2019s path through the solar system', '航海家一號穿越太陽系的路徑')}>
        <div className="space-y-5">
          {JOURNEY.map((step) => (
            <div key={step.date}>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">{step.date}</p>
              <h3 className="mb-1 text-lg font-semibold text-white">{zh ? step.title.zh : step.title.en}</h3>
              <p className="leading-relaxed text-slate-300">{zh ? step.text.zh : step.text.en}</p>
            </div>
          ))}
        </div>
      </BiSection>

      <BiSection id="instruments" kicker={bi('Hardware', '硬體')} title={bi('Science instruments', '科學儀器')}>
        <p className="mb-4 max-w-4xl leading-relaxed text-slate-300">
          {zh
            ? '航海家一號原本搭載十一項科學儀器。為了節省電力，其中數項已被關閉；目前任務聚焦於研究星際空間中的粒子、磁場與電漿的儀器：'
            : 'Voyager 1 originally carried eleven science instruments. Several have been switched off to save power; the mission today focuses on instruments that study particles, fields and plasma in interstellar space:'}
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {META.instruments.map((inst) => {
            const zhInst = INSTRUMENT_ZH[inst.code];
            return (
              <li key={inst.code} className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
                <p className="font-mono text-xs font-bold text-cyan-300">{inst.code}</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-200">
                  {zh ? (zhInst ? zhInst.name : inst.name) : inst.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  {zh ? (zhInst ? zhInst.description : inst.description) : inst.description}
                </p>
              </li>
            );
          })}
        </ul>
      </BiSection>

      <BiSection id="golden-record" kicker={bi('Message in a bottle', '瓶中訊息')} title={bi('The Golden Record aboard Voyager 1', '航海家一號上的金唱片')}>
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh ? (
            <>
              兩艘航海家號都攜帶一張金唱片——內含影像、音樂、自然之聲與五十五種語言問候的鍍金唱片。若未來某個文明發現航海家一號，這張唱片將告訴他們：打造這艘太空船的是誰，地球又在哪裡。{' '}
              <a href={pageUrl('golden-record')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
                閱讀金唱片的故事 →
              </a>
            </>
          ) : (
            <>
              Both Voyagers carry a copy of the Golden Record — a gold-plated copper phonograph
              record with images, music, natural sounds and greetings in 55 languages. If another
              civilization ever finds Voyager 1, the record tells them who made the spacecraft and
              where Earth is.{' '}
              <a href={pageUrl('golden-record')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
                Read about the Golden Record →
              </a>
            </>
          )}
        </p>
      </BiSection>

      <BiSection id="significance" kicker={bi('Why it matters', '為什麼重要')} title={bi('Voyager 1\u2019s historical significance', '航海家一號的歷史意義')}>
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh
            ? '航海家一號是深空探索的標竿：第一個近距離造訪木星與土星的探測器、第一個拍到地球以外活火山的探測器、第一個離開日球層的探測器，也是目前人類建造過最遙遠、移動最快的物體。'
            : 'Voyager 1 is the benchmark for deep-space exploration: the first to visit Jupiter and Saturn in detail, the first to photograph an erupting volcano beyond Earth, the first to leave the heliosphere, and the most distant and fastest-moving object ever built by human hands.'}
        </p>
        <div className="my-4 rounded-xl border border-amber-400/40 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-100">
          <p className="mb-1.5 font-semibold text-white">
            {zh ? '距離查詢' : 'Distance check'}
          </p>
          <p>
            {zh
              ? '想立刻知道航海家一號在哪裡嗎？本頁頂端的即時追蹤器會顯示它目前與地球、太陽的估計距離。'
              : 'Curious how far Voyager 1 is right now? The live tracker at the top of this page shows its current estimated distance from Earth and the Sun.'}
          </p>
        </div>
      </BiSection>

      <RelatedLinks items={['home', 'voyager-2', 'timeline', 'discoveries', 'how-it-works']} />
    </div>
  );
}


