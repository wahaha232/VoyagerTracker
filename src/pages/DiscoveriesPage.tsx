/**
 * DiscoveriesPage — /discoveries.html  (EN / 繁中)
 */

import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, useZh } from '../components/content';

interface Discovery {
  title: { en: string; zh: string };
  text: { en: string; zh: string };
}

const DISCOVERIES: { planet: string; kicker: string; items: Discovery[] }[] = [
  {
    planet: 'Jupiter',
    kicker: '1979',
    items: [
      { title: bi('Volcanoes on Io', '木衛一（伊奧）上的火山'), text: bi('Voyager 1 imaged plumes erupting from Io — the first active volcanoes seen beyond Earth. Tidal heating from Jupiter drives them.', '航海家一號拍到木衛一噴發的羽流——這是首度在地球以外發現的活火山，由木星潮汐加熱驅動。') },
      { title: bi('The Great Red Spot', '大紅斑'), text: bi('The spacecraft showed the Great Red Spot is a colossal storm and revealed enormous complexity in the planet\u2019s weather.', '探測器證實大紅斑是一場巨型風暴，並揭露了木星天氣系統的高度複雜性。') },
      { title: bi('Rings and new moons', '光環與新衛星'), text: bi('Jupiter was found to have faint rings, and several small new moons were discovered.', '木星被發現擁有暗弱的光環，同時發現了數顆小型新衛星。') },
    ],
  },
  {
    planet: 'Saturn',
    kicker: '1980–1981',
    items: [
      { title: bi('The rings, in detail', '細節驚人的土星環'), text: bi('Voyager revealed the rings as thousands of individual ringlets shaped by small shepherding moons.', '航海家號發現土星環其實由數以千計的細環組成，並受小型「牧羊犬衛星」塑造。') },
      { title: bi('Titan\u2019s hazy atmosphere', '泰坦濃霧籠罩的大氣'), text: bi('Voyager 1 found Titan wrapped in a thick, opaque orange haze of nitrogen and organic compounds.', '航海家一號發現泰坦被氮氣與有機化合物形成的濃厚橘色煙霧包覆。') },
      { title: bi('New moons', '新衛星'), text: bi('Several new satellites of Saturn were discovered, and images of Enceladus hinted at a young, active surface.', '發現了數顆土星的新衛星，而恩克拉多斯的影像暗示其表面相當年輕且活躍。') },
    ],
  },
  {
    planet: 'Uranus',
    kicker: '1986',
    items: [
      { title: bi('A lopsided magnetic field', '歪斜的磁場'), text: bi('Voyager 2 found Uranus\u2019s magnetic field tilted about 60° from its spin axis and offset from the planet\u2019s centre.', '航海家二號發現天王星的磁場與自轉軸傾斜約 60 度，且偏離行星中心——前所未見。') },
      { title: bi('Rings, moons and Miranda', '光環、衛星與米蘭達'), text: bi('The spacecraft imaged thin dark rings, discovered ten new moons, and found the moon Miranda scarred with bizarre terrain.', '探測器拍到細薄的暗環、發現十顆新衛星，並在衛星米蘭達上發現奇特的地形。') },
    ],
  },
  {
    planet: 'Neptune',
    kicker: '1989',
    items: [
      { title: bi('The Great Dark Spot and supersonic winds', '大暗斑與超音速風'), text: bi('Voyager 2 photographed the Great Dark Spot and clocked winds exceeding 2,000 km/h — the fastest measured on any planet.', '航海家二號拍到「大暗斑」，並測得超過每小時 2,000 公里的風速——太陽系中最快的行星風。') },
      { title: bi('Rings and arcs', '光環與弧'), text: bi('Neptune turned out to have faint rings with bright, clumpy arcs — a structure still not fully understood.', '海王星竟然擁有暗弱的光環與明亮的團塊狀弧——至今仍未被完全理解。') },
      { title: bi('Triton\u2019s geysers', '崔頓的噴泉'), text: bi('Neptune\u2019s giant moon Triton showed nitrogen geysers erupting through its thin atmosphere.', '海王星的巨大衛星崔頓，其稀薄大氣中有氮噴泉噴發。') },
    ],
  },
  {
    planet: 'Interstellar space',
    kicker: '2012 & 2018',
    items: [
      { title: bi('Crossing the heliopause', '穿越日球層頂'), text: bi('Voyager 1 (2012) and Voyager 2 (2018) became the first spacecraft to leave the heliosphere.', '航海家一號（2012）與二號（2018）成為最早離開日球層的太空船。') },
      { title: bi('Interstellar plasma and cosmic rays', '星際電漿與宇宙射線'), text: bi('The probes measured the density of interstellar plasma, the local magnetic field and cosmic rays — data no spacecraft had gathered before.', '探測器量測了星際電漿密度、當地磁場與宇宙射線——這是過去任何太空船都不曾取得的資料。') },
      { title: bi('A second vantage point', '第二個觀測點'), text: bi('Because the two Voyagers left in different directions, they let scientists probe the 3D shape of the heliosphere.', '由於兩艘航海家號朝不同方向離開，科學家得以探測日球層的三維形狀。') },
    ],
  },
];

export default function DiscoveriesPage() {
  const zh = useZh();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="discoveries"
        title={bi('Voyager Scientific Discoveries', '航海家號的科學發現')}
        intro={bi(
          'From erupting volcanoes on Io to the first direct measurements of the space between the stars, the Voyager spacecraft transformed our understanding of the solar system — and of the galaxy around it.',
          '從木衛一上噴發的火山，到首度直接量測星與星之間的太空，航海家號徹底改變了我們對太陽系——以及對銀河的理解。',
        )}
      />

      {DISCOVERIES.map((group) => (
        <BiSection
          key={group.planet}
          id={group.planet.toLowerCase().replace(/\s+/g, '-')}
          kicker={bi(group.kicker, group.kicker)}
          title={bi(group.planet, planetZh(group.planet))}
        >
          <ul className="space-y-3">
            {group.items.map((item) => (
              <li key={item.title.en} className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
                <p className="font-semibold text-white">{zh ? item.title.zh : item.title.en}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  {zh ? item.text.zh : item.text.en}
                </p>
              </li>
            ))}
          </ul>
        </BiSection>
      ))}

      <div className="my-6 rounded-xl border border-cyan-500/40 bg-cyan-500/5 p-5 text-sm leading-relaxed text-cyan-100">
        <p className="mb-1.5 font-semibold text-white">
          {zh ? '延伸閱讀' : 'More reading'}
        </p>
        <p>
          {zh ? (
            <>
              上述每項成果皆有 NASA/JPL 的官方紀錄。請見{' '}
              <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
                資料來源
              </a>{' '}
              頁。
            </>
          ) : (
            <>
              Each of these results is documented by NASA/JPL. See the{' '}
              <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
                Sources page
              </a>{' '}
              for official links.
            </>
          )}
        </p>
      </div>

      <RelatedLinks items={['mission', 'timeline', 'voyager-1', 'voyager-2', 'golden-record']} />
    </div>
  );
}

function planetZh(planet: string): string {
  const map: Record<string, string> = {
    Jupiter: '木星',
    Saturn: '土星',
    Uranus: '天王星',
    Neptune: '海王星',
    'Interstellar space': '星際空間',
  };
  return map[planet] ?? planet;
}

