/**
 * TimelinePage — /timeline.html  (EN / 繁中)
 */

import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import {
  BiArticleHeader,
  BiSection,
  bi,
  EventList,
  useZh,
} from '../components/content';

interface TimelineEvent {
  date: string;
  label: { en: string; zh: string };
  text: { en: string; zh: string };
}

const EVENTS: TimelineEvent[] = [
  { date: '1977 · Aug 20', label: bi('Voyager 2', '航海家二號'), text: bi('Launch from Cape Canaveral, Florida.', '從美國佛羅里達州卡納維爾角發射。') },
  { date: '1977 · Sep 5', label: bi('Voyager 1', '航海家一號'), text: bi('Launch — although launched later, Voyager 1 takes a faster trajectory.', '發射——雖然較晚升空，但航海家一號走的是更快的軌道。') },
  { date: '1979 · Mar 5', label: bi('Voyager 1', '航海家一號'), text: bi('Jupiter closest approach; active volcanoes discovered on Io.', '最接近木星；在木衛一（伊奧）上發現活火山。') },
  { date: '1979 · Jul 9', label: bi('Voyager 2', '航海家二號'), text: bi('Jupiter closest approach.', '最接近木星。') },
  { date: '1980 · Nov 12', label: bi('Voyager 1', '航海家一號'), text: bi('Saturn and Titan flyby; trajectory bends north out of the ecliptic.', '飛掠土星與泰坦；軌道轉向北方、離開黃道面。') },
  { date: '1981 · Aug', label: bi('Voyager 2', '航海家二號'), text: bi('Saturn flyby; mission continues toward Uranus.', '飛掠土星；任務繼續前往天王星。') },
  { date: '1986 · Jan 24', label: bi('Voyager 2', '航海家二號'), text: bi('Uranus flyby — the only close encounter with Uranus to date.', '飛掠天王星——迄今唯一一次近距離造訪天王星。') },
  { date: '1989 · Aug 25', label: bi('Voyager 2', '航海家二號'), text: bi('Neptune flyby — completes the Grand Tour.', '飛掠海王星——完成「大旅行」。') },
  { date: '1990 · Feb 14', label: bi('Voyager 1', '航海家一號'), text: bi('Pale Blue Dot photograph of Earth from about 6 billion km.', '從約 60 億公里外拍攝地球的「蒼藍小點」照片。') },
  { date: '1990', label: bi('Both', '兩艘探測器'), text: bi('Both spacecraft begin the Voyager Interstellar Mission phase.', '兩艘探測器開始進入「航海家星際任務」階段。') },
  { date: '2012 · Aug 25', label: bi('Voyager 1', '航海家一號'), text: bi('Crosses the heliopause and enters interstellar space (~121 AU).', '穿越日球層頂，進入星際空間（約 121 AU）。') },
  { date: '2018 · Nov 5', label: bi('Voyager 2', '航海家二號'), text: bi('Crosses the heliopause and enters interstellar space (~119 AU).', '穿越日球層頂，進入星際空間（約 119 AU）。') },
  { date: '2023–2026', label: bi('Program', '任務計畫'), text: bi('Deep-space operations continue; NASA manages the remaining power and instruments of both probes.', '深空任務持續進行；NASA 持續管理兩艘探測器剩餘的電力與儀器。') },
];

export default function TimelinePage() {
  const zh = useZh();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="timeline"
        title={bi('Voyager Mission Timeline', '航海家任務時間軸')}
        intro={bi(
          'The key moments of the Voyager mission, in chronological order, based on NASA/JPL mission records — nothing here is invented or speculative.',
          '以時間順序列出航海家任務的關鍵時刻。內容依據 NASA/JPL 任務紀錄——沒有任何虛構或臆測。',
        )}
      />

      <BiSection id="timeline" kicker={bi('1977 → today', '1977 → 今日')} title={bi('Key mission events', '任務重要事件')}>
        <EventList events={EVENTS} />
      </BiSection>

      <BiSection id="accuracy" kicker={bi('Accuracy', '準確性')} title={bi('A note on these dates', '關於日期的說明')}>
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh ? (
            <>
              最接近日期皆以 UTC 表示，並遵循 NASA/JPL 任務紀錄。最新的任務狀態請參考官方{' '}
              <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
                NASA 任務頁面
              </a>
              ，由任務團隊持續更新。
            </>
          ) : (
            <>
              Closest-approach dates are given in UTC and follow NASA/JPL mission records. For the
              most recent operational status, refer to the official{' '}
              <a href={pageUrl('sources')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
                NASA mission pages
              </a>
              , which are updated by the mission team.
            </>
          )}
        </p>
      </BiSection>

      <div className="my-6 rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-5 text-sm leading-relaxed text-emerald-100">
        <p className="mb-1.5 font-semibold text-white">
          {zh ? '對科學感興趣嗎？' : 'Interested in the science?'}
        </p>
        <p>
          {zh ? (
            <>
              這些相遇事件所帶來的發現，整理在{' '}
              <a href={pageUrl('discoveries')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">
                科學發現
              </a>
              頁。
            </>
          ) : (
            <>
              The discoveries made at each encounter are summarised on the{' '}
              <a href={pageUrl('discoveries')} className="text-emerald-300 underline decoration-emerald-500/40 underline-offset-2 hover:text-emerald-200">
                Scientific Discoveries page
              </a>
              .
            </>
          )}
        </p>
      </div>

      <RelatedLinks items={['mission', 'voyager-1', 'voyager-2', 'discoveries', 'updates']} />
    </div>
  );
}

