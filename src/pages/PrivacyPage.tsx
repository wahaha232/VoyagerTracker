/**
 * PrivacyPage — /privacy.html  (EN / 繁中)
 */

import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, Paragraph, useZh } from '../components/content';

export default function PrivacyPage() {
  const zh = useZh();
  const gh = (
    <a
      href="https://github.com/wahaha232/VoyagerTracker/issues"
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200"
    >
      GitHub
    </a>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="privacy"
        title={bi('Privacy Policy', '隱私政策')}
        intro={bi(
          'This page describes what Voyager Tracker does — and does not — collect. The short version: this site is served as static pages, stores nothing on our servers, and does not operate its own analytics.',
          '本頁說明「航海家號追蹤器」會與不會蒐集哪些資料。簡短版：本站以靜態網頁提供服務，伺服器端不儲存任何資料，也未運行自己的分析工具。',
        )}
      />

      <BiSection
        id="overview"
        kicker={bi('Overview', '總覽')}
        title={bi('What this site collects', '本站蒐集哪些資料')}
      >
        <Paragraph
          value={bi(
            'Voyager Tracker is hosted as a static website on GitHub Pages. It has no login, no accounts, no comment system and no contact-form backend. We do not run our own tracking scripts, and we do not sell or share personal data because we do not collect any personal data.',
            '「航海家號追蹤器」是以 GitHub Pages 提供的靜態網站。它沒有登入、帳號、留言系統，也沒有表單後端。本站未運行自己的追蹤腳本，也不會販售或分享個人資料——因為本站根本不會蒐集個人資料。',
          )}
        />
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'Like any web server, the hosting provider (GitHub) may keep routine server logs. Please refer to GitHub\u2019s privacy policy for details about its handling of those logs.',
            '與任何網站伺服器相同，主機服務商（GitHub）可能保留例行伺服器紀錄。關於這些紀錄的處理方式，請參考 GitHub 的隱私政策。',
          )}
        />
      </BiSection>

      <BiSection
        id="cookies"
        kicker={bi('Cookies', 'Cookie')}
        title={bi('Cookies', 'Cookie')}
      >
        <Paragraph
          value={bi(
            'This website does not set its own cookies. If advertising or third-party embeds are added in the future, those services may set cookies, and this policy will be updated before they are enabled.',
            '本站不會自行設定 Cookie。若未來加入廣告或第三方嵌入內容，該服務可能設定 Cookie，而本站會先更新本政策後才啟用。',
          )}
        />
      </BiSection>

      <BiSection
        id="storage"
        kicker={bi('Browser storage', '瀏覽器儲存')}
        title={bi('Local storage & session data', '本機儲存與工作階段資料')}
      >
        <Paragraph
          value={bi(
            'The only thing the site stores in your browser is your chosen language (a small flag in localStorage) so the site can stay in English or Traditional Chinese as you browse. No other data is written to local storage or sent anywhere.',
            '本站唯一會寫入您瀏覽器的資料，是您選擇的顯示語言（一個存在 localStorage 的小旗標），以便您在瀏覽各頁時維持英文或繁體中文。除此之外不會寫入或傳送其他任何資料。',
          )}
        />
      </BiSection>

      <BiSection
        id="third-party"
        kicker={bi('Third parties', '第三方服務')}
        title={bi('Third-party services', '第三方服務')}
      >
        <Paragraph
          value={bi(
            'The pages load fonts from Google Fonts. When your browser requests those fonts, Google receives the standard request information your browser sends. Some pages link to NASA and GitHub websites; opening those links takes you to third-party services governed by their own privacy policies.',
            '頁面會從 Google Fonts 載入字型。您的瀏覽器請求這些字型時，Google 會收到瀏覽器自動傳送的標準請求資訊。部分頁面會連結到 NASA 與 GitHub 網站；開啟這些連結將前往受其各自隱私政策規範的第三方服務。',
          )}
        />
      </BiSection>

      <BiSection
        id="ads"
        kicker={bi('Advertising', '廣告')}
        title={bi('Advertising (AdSense)', '廣告（AdSense）')}
      >
        <Paragraph
          value={bi(
            'At the time of writing this page, the site does not display Google AdSense or any other advertising. If advertising is added, ad cookies and personalised-ad settings would be governed by Google\u2019s policies, and this page would be updated to say so clearly.',
            '截至本頁撰寫時，本站未顯示 Google AdSense 或任何其他廣告。若未來加入廣告，廣告 Cookie 與個人化廣告設定將受 Google 政策規範，本頁也會明確更新說明。',
          )}
        />
      </BiSection>

      <BiSection
        id="contact"
        kicker={bi('Questions', '問題')}
        title={bi('Privacy questions', '隱私相關問題')}
      >
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh ? (
            <>
              若您對本政策有任何疑問，可透過 {gh} 的 Issue 追蹤器與本站聯繫。
            </>
          ) : (
            <>
              If you have a question about this policy, you can reach the project through the{' '}
              {gh} issue tracker.
            </>
          )}
        </p>
      </BiSection>

      <RelatedLinks items={['about', 'contact', 'faq', 'sources']} />
    </div>
  );
}
