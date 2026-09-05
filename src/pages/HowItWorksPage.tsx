/**
 * HowItWorksPage — /how-it-works.html  (EN / 繁中)
 */

import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, Bullets, Paragraph, useZh } from '../components/content';

export default function HowItWorksPage() {
  const zh = useZh();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="how-it-works"
        title={bi('How Voyager Tracker Works', '資料與計算方法')}
        intro={bi(
          'This page explains, as transparently as possible, where our figures come from, how they are calculated, and why the numbers may differ slightly from other trackers.',
          '本頁以最透明的方式說明：本站的數字從哪裡來、如何計算，以及為什麼可能與其他追蹤網站略有不同。',
        )}
      />

      <div className="my-6 rounded-xl border border-amber-400/40 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-100">
        <p className="mb-1.5 font-semibold text-white">
          {zh ? '一句話總結' : 'The short version'}
        </p>
        <p>
          {zh
            ? '本站顯示的太空船追蹤資料，是以可取得的任務與星曆資料為基礎，可能包含計算或估計值；這些數字絕不會被當成 NASA 即時遙測。'
            : 'Spacecraft tracking data shown on this site is based on available mission and ephemeris data and may include calculated or estimated values. We never present these figures as live NASA telemetry.'}
        </p>
      </div>

      <BiSection id="sources" kicker={bi('1 · Sources', '1 · 資料來源')} title={bi('Where the data comes from', '資料從哪裡來')}>
        <Paragraph
          value={bi(
            'Historical mission facts (launch dates, encounter dates, interstellar crossings) come from NASA/JPL public records. The baseline distances and cruising speeds are anchored to published NASA Voyager data.',
            '歷史任務事實（發射日、飛掠日、進入星際空間日）來自 NASA/JPL 公開紀錄。基準距離與巡航速度，則以 NASA 公布的航海家資料為錨點。',
          )}
        />
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'We re-express that information in our own words and clearly label everything. The full list of references is on the Sources page.',
            '本站以自己的文字重新表述這些資訊，並清楚標示所有來源。完整參考清單請見「資料來源」頁。',
          )}
        />
      </BiSection>

      <BiSection id="distance" kicker={bi('2 · Calculation', '2 · 計算方式')} title={bi('How distances are estimated', '距離如何估算')}>
        <Paragraph
          value={bi(
            'The Voyagers are so far away that no website receives a continuous, second-by-second \u201cGPS\u201d feed from them. Instead we use a simple physical model:',
            '航海家號距離遙遠，沒有任何網站能從它們身上收到每秒更新的「GPS」訊號。因此本站採用簡單的物理模型：',
          )}
        />
        <ol className="mt-3 max-w-4xl list-decimal space-y-2 pl-5 text-slate-300">
          {[
            bi('Start from a baseline distance and position from NASA/JPL mission data at a known date.', '從 NASA/JPL 任務資料中，取一個已知日期的基準距離與位置。'),
            bi('Advance that position using each spacecraft\u2019s known cruising velocity and the elapsed time since the baseline.', '以各探測器已知的巡航速度，與自基準日至今經過的時間，向前推進位置。'),
            bi('Convert the result into kilometres, astronomical units (AU) and one-way light-travel time.', '把結果換算成公里、天文單位（AU）與單程光行時間。'),
          ].map((item, i) => (
            <li key={i}>{zh ? item.zh : item.en}</li>
          ))}
        </ol>
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'Voyager 1 recedes from the Sun at about 17 km/s (≈3.6 AU per year) and Voyager 2 at about 15 km/s (≈3.2 AU per year), so this simple projection stays accurate for long periods. Baselines are refreshed whenever new official data is published.',
            '航海家一號以約 17 公里/秒（≈每年 3.6 AU）遠離太陽，二號約 15 公里/秒（≈每年 3.2 AU），因此這個簡單推估能長期保持準確。每當有新的官方資料公布，基準便會更新。',
          )}
        />
      </BiSection>

      <BiSection id="updates" kicker={bi('3 · Frequency', '3 · 更新頻率')} title={bi('How often the numbers update', '數字多久更新一次')}>
        <Paragraph
          value={bi(
            'Within a page, the distance counters are recomputed in your browser about ten times per second so the odometer ticks smoothly. That is an interpolation tick, not a new download from NASA. The underlying baseline is updated only when genuinely new official data exists.',
            '在頁面內，距離計數器約每秒在你的瀏覽器內重新計算十次，讓里程數字流暢跳動。那是「插值」更新，並非向 NASA 下載新資料。底層基準只會在出現真正的新官方資料時更新。',
          )}
        />
      </BiSection>

      <BiSection id="differences" kicker={bi('4 · Differences', '4 · 數字差異')} title={bi('Why our numbers may differ from other sites', '為什麼本站數字可能與其他網站不同')}>
        <Paragraph
          value={bi('You may see slightly different distances elsewhere. Possible reasons:', '您在其他地方可能看到略微不同的距離。可能原因如下：')}
        />
        <Bullets
          items={[
            bi('Different baseline dates (NASA updates its published values periodically).', '基準日期不同（NASA 會定期更新公布數值）。'),
            bi('Different definitions: distance from Earth vs. distance from the Sun.', '定義不同：與地球的距離，或是與太陽的距離。'),
            bi('Different velocity assumptions or whether light-travel time is included.', '速度假設不同，或是否計入光行時間。'),
            bi('Rounding and display conventions.', '四捨五入與顯示慣例不同。'),
          ]}
        />
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi('Differences of a few tenths of an AU are normal and are not an error on any particular site.', '相差零點幾個 AU 是正常現象，並不代表哪個網站出錯。')}
        />
      </BiSection>

      <BiSection id="labels" kicker={bi('5 · Labels', '5 · 標示')} title={bi('Official vs. estimated vs. historical', '官方、估計與歷史')}>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-space-900/70 font-mono text-xs uppercase tracking-wider text-slate-400">
                <th className="px-4 py-3">{zh ? '標示' : 'Label'}</th>
                <th className="px-4 py-3">{zh ? '意義' : 'Meaning'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="px-4 py-3 font-mono text-emerald-300">{zh ? '歷史' : 'Historical'}</td>
                <td className="px-4 py-3">{zh ? '來自 NASA 紀錄的固定任務事實（發射、飛掠等）。' : 'Fixed mission facts from NASA records (launch, encounters, etc.).'}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-cyan-300">{zh ? '估計／計算' : 'Estimated / calculated'}</td>
                <td className="px-4 py-3">{zh ? '以官方基準配合探測器速度推估而得。' : 'Derived from an official baseline by projecting with the spacecraft\u2019s velocity.'}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-amber-300">{zh ? '即時' : 'Live'}</td>
                <td className="px-4 py-3">{zh ? '在此介面中，「即時」代表「正在你的瀏覽器內重新計算」——絕不暗示官方即時遙測。' : 'In this interface \u201clive\u201d means \u201crecalculated in your browser right now\u201d — it never implies official real-time telemetry.'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </BiSection>

      <BiSection id="latency" kicker={bi('6 · Reality check', '6 · 實際情況')} title={bi('Latency and data availability', '延遲與資料可得性')}>
        <Paragraph
          value={bi(
            'Real communication with the Voyagers has a built-in delay: a signal takes roughly a day to travel one-way from Voyager 1 to Earth. If specific data is unavailable or cannot be verified, we mark it as \u201cData unavailable\u201d rather than guessing.',
            '與航海家號的真實通訊存在固有延遲：訊號從航海家一號單程傳回地球約需一天。若特定資料無法取得或無法驗證，本站會標示「資料不可得」，而不是胡亂猜測。',
          )}
        />
      </BiSection>

      <RelatedLinks items={['faq', 'sources', 'about', 'updates', 'voyager-1']} />
    </div>
  );
}

