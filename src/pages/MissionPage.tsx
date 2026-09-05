/**
 * MissionPage — /mission.html  (EN / 繁中)
 */

import { pageUrl } from '../constants/site';
import { LinkArrow } from '../components/icons';
import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, Paragraph, useZh } from '../components/content';

const PHASES: { planet: { en: string; zh: string }; when: string; text: { en: string; zh: string } }[] = [
  {
    planet: bi('Jupiter', '木星'),
    when: '1979',
    text: bi(
      'Both spacecraft revealed Jupiter\u2019s turbulent atmosphere in detail and discovered active volcanoes on its moon Io.',
      '兩艘探測器詳細揭露了木星湍動的大氣，並發現其衛星「木衛一（伊奧）」上有活火山。',
    ),
  },
  {
    planet: bi('Saturn', '土星'),
    when: '1980–1981',
    text: bi(
      'Voyager 1 and Voyager 2 revealed a ring system of extraordinary complexity and studied Titan\u2019s atmosphere.',
      '航海家一號與二號發現了極其複雜的環系統，並研究了泰坦的大氣。',
    ),
  },
  {
    planet: bi('Uranus', '天王星'),
    when: '1986',
    text: bi(
      'Voyager 2 made the only close flyby of Uranus, finding a lopsided magnetic field and ten new moons.',
      '航海家二號是唯一近距離飛掠天王星的探測器，發現了歪斜的磁場與十顆新衛星。',
    ),
  },
  {
    planet: bi('Neptune', '海王星'),
    when: '1989',
    text: bi(
      'Voyager 2 discovered the Great Dark Spot, supersonic winds and geysers on Triton.',
      '航海家二號發現大暗斑、超音速風與崔頓上的噴泉。',
    ),
  },
];

export default function MissionPage() {
  const zh = useZh();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="mission"
        parent="home"
        title={bi('The Voyager Mission', '航海家任務')}
        intro={bi(
          'A two-spacecraft NASA mission that began as a four-year trip to Jupiter and Saturn and became a fifty-year journey through the outer solar system and into interstellar space.',
          '一項由兩艘太空船組成的 NASA 任務：起初只是前往木星與土星的四年前往計畫，最後卻成為穿越外太陽系、進入星際空間的五十多年旅程。',
        )}
      />

      <BiSection id="origins" kicker={bi('Origins', '起源')} title={bi('How the mission began', '任務如何開始')}>
        <Paragraph
          value={bi(
            'In the 1960s, planetary scientists noticed that the outer planets were about to line up in a way that would allow a single spacecraft to visit several of them using gravity assists. This rare alignment — roughly once every 176 years — made the \u201cGrand Tour\u201d possible.',
            '1960 年代，行星科學家發現外行星即將出現一種排列方式，讓單一太空船能藉由「重力助推」連續造訪多顆行星。這種約每 176 年才出現一次的罕見排列，使「大旅行」成為可能。',
          )}
        />
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'NASA\u2019s Jet Propulsion Laboratory built two nearly identical probes designed to survive the harsh environment of the outer solar system — and, if fortune allowed, to keep going far beyond it.',
            'NASA 的噴射推進實驗室（JPL）打造了兩艘近乎相同的探測器，設計上足以承受外太陽系的嚴酷環境——若運氣夠好，還能繼續飛向更遠的地方。',
          )}
        />
      </BiSection>

      <BiSection id="launch" kicker={bi('Launch', '發射')} title={bi('The 1977 launches', '1977 年的發射')}>
        <Paragraph
          value={bi(
            'Voyager 2 lifted off first on 20 August 1977 on a slower trajectory that kept the planetary alignment open. Voyager 1 followed on 5 September 1977 on a faster path. Both launched from Cape Canaveral, Florida.',
            '1977 年 8 月 20 日，航海家二號先行升空，走較慢的軌道以維持行星排列的可行性；9 月 5 日航海家一號以較快的路線隨後發射。兩者皆從美國佛羅里達州卡納維爾角升空。',
          )}
        />
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'Each spacecraft carried eleven science instruments, a 3.7-metre antenna, radioisotope power generators and a Golden Record greeting from Earth.',
            '每艘太空船搭載十一項科學儀器、一座 3.7 公尺的天線、放射性同位素發電機，以及一張來自地球的金唱片問候。',
          )}
        />
      </BiSection>

      <BiSection id="grand-tour" kicker={bi('Grand Tour', '大旅行')} title={bi('Four planets, one alignment', '四大行星，一次排列')}>
        <div className="grid gap-4 sm:grid-cols-2">
          {PHASES.map((p) => (
            <div key={p.when} className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
                {zh ? p.planet.zh : p.planet.en} · {p.when}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {zh ? p.text.zh : p.text.en}
              </p>
            </div>
          ))}
        </div>
        <Paragraph
          className="mt-4 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'Voyager 1\u2019s close flyby of Saturn\u2019s moon Titan bent its path north, ending its Grand Tour — a deliberate trade for Titan data. Voyager 2 went on to become the only spacecraft to visit Uranus and Neptune.',
            '航海家一號為了近距離飛掠土星衛星泰坦，軌道被甩向北方而結束大旅行——這是為了泰坦資料所做的取捨。航海家二號則繼續前進，成為唯一造訪天王星與海王星的太空船。',
          )}
        />
      </BiSection>

      <BiSection id="interstellar" kicker={bi('Beyond the planets', '行星之外')} title={bi('From the heliosphere to interstellar space', '從日球層到星際空間')}>
        <Paragraph
          value={bi(
            'Around the Sun, the solar wind carves out a bubble called the heliosphere. Its outer boundary is the heliopause — where the pressure of the solar wind meets the plasma of the galaxy. For decades no spacecraft had been there to measure it.',
            '太陽風在太陽周圍吹出一個稱為「日球層」的氣泡。其外緣是「日球層頂」——太陽風壓力與銀河電漿交會之處。幾十年來，一直沒有太空船能到那裡實地測量。',
          )}
        />
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'Voyager 1 crossed the heliopause on 25 August 2012 at about 121 AU from the Sun; Voyager 2 followed on 5 November 2018 at about 119 AU. The two spacecraft now sample interstellar space from two different directions.',
            '航海家一號於 2012 年 8 月 25 日、距離太陽約 121 AU 處穿越日球層頂；航海家二號則於 2018 年 11 月 5 日在約 119 AU 處跟進。如今兩艘探測器正從兩個不同方向取樣星際空間。',
          )}
        />
      </BiSection>

      <BiSection id="extension" kicker={bi('The extended mission', '延長任務')} title={bi('Mission extension and long-term goals', '任務延長與長期目標')}>
        <Paragraph
          value={bi(
            'The planetary mission ended in 1989, but the spacecraft kept working and NASA extended the mission several times. In the Voyager Interstellar Mission phase, both probes study cosmic rays, magnetic fields and plasma while engineers ration the shrinking power from the radioisotope generators.',
            '行星任務於 1989 年結束，但太空船仍持續運作，NASA 也多次延長任務。在「航海家星際任務」階段，兩艘探測器持續研究宇宙射線、磁場與電漿，而工程師則需精打細算分配放射性同位素發電機日益衰減的電力。',
          )}
        />
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'Long-term objectives include mapping the shape of the heliosphere, measuring the interstellar medium, and — in the far future — continuing to carry the Golden Record toward the stars.',
            '長期目標包括描繪日球層的形狀、量測星際介質，以及在遙遠的未來繼續帶著金唱片航向群星。',
          )}
        />
        <div className="my-4 rounded-xl border border-cyan-500/40 bg-cyan-500/5 p-5 text-sm leading-relaxed text-cyan-100">
          <p className="mb-1.5 font-semibold text-white">
            {zh ? '關於電力的一點說明' : 'A note on power'}
          </p>
          <p>
            {zh
              ? '自 2010 年代中期起，NASA 會定期關閉探測器的加熱器與儀器以延長壽命。實際仍在運作的儀器清單會隨時間改變，並由 NASA/JPL 公布（見「資料來源」頁）。'
              : 'Since the mid-2010s NASA has periodically switched off heaters and instruments to keep the probes alive. The exact operating-instrument list changes over time and is published by NASA/JPL (see the Sources page).'}
          </p>
        </div>
      </BiSection>

      <BiSection id="timeline-summary" kicker={bi('In order', '依序排列')} title={bi('The mission in one line', '一句話看完任務')}>
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh ? (
            <>
              1977 發射 → 木星 1979 → 土星 1980–81 → 天王星 1986 → 海王星 1989 → 蒼藍小點 1990 →
              航海家一號進入星際空間 2012 → 航海家二號進入星際空間 2018 → 星際任務持續至今。{' '}
              <a href={pageUrl('timeline')} className="inline-flex items-center gap-1.5 font-semibold text-cyan-300 hover:text-cyan-200">
                查看完整時間軸 <LinkArrow className="h-4 w-4" />
              </a>
            </>
          ) : (
            <>
              1977 launches → Jupiter 1979 → Saturn 1980–81 → Uranus 1986 → Neptune 1989 → Pale Blue
              Dot 1990 → Voyager 1 in interstellar space 2012 → Voyager 2 in interstellar space 2018 →
              interstellar operations continue today.{' '}
              <a href={pageUrl('timeline')} className="inline-flex items-center gap-1.5 font-semibold text-cyan-300 hover:text-cyan-200">
                Explore the full timeline <LinkArrow className="h-4 w-4" />
              </a>
            </>
          )}
        </p>
      </BiSection>

      <RelatedLinks items={['voyager-1', 'voyager-2', 'timeline', 'discoveries', 'sources']} />
    </div>
  );
}


