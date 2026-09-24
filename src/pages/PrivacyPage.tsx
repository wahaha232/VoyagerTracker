/**
 * PrivacyPage — /privacy.html  (EN / 繁中 / Español)
 */

import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, Paragraph, useEs, useZh } from '../components/content';

export default function PrivacyPage() {
  const zh = useZh();
  const es = useEs();
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
        title={bi('Privacy Policy', '隱私政策', 'Política de privacidad')}
        intro={bi(
          'This page describes what Voyager Tracker does — and does not — collect. The short version: this site is served as static pages, stores nothing on our servers, and does not operate its own analytics.',
          '本頁說明「航海家號追蹤器」會與不會蒐集哪些資料。簡短版：本站以靜態網頁提供服務，伺服器端不儲存任何資料，也未運行自己的分析工具。',
          'Esta página explica qué recopila — y qué no recopila — el Rastreador Voyager. En resumen: este sitio se sirve como páginas estáticas, no guarda nada en nuestros servidores y no ejecuta sus propias analíticas.',
        )}
      />

      <BiSection
        id="overview"
        kicker={bi('Overview', '總覽', 'Resumen')}
        title={bi('What this site collects', '本站蒐集哪些資料', 'Qué recopila este sitio')}
      >
        <Paragraph
          value={bi(
            'Voyager Tracker is hosted as a static website on GitHub Pages. It has no login, no accounts, no comment system and no contact-form backend. We do not run our own tracking scripts, and we do not sell or share personal data because we do not collect any personal data.',
            '「航海家號追蹤器」是以 GitHub Pages 提供的靜態網站。它沒有登入、帳號、留言系統，也沒有表單後端。本站未運行自己的追蹤腳本，也不會販售或分享個人資料——因為本站根本不會蒐集個人資料。',
            'El Rastreador Voyager está alojado como sitio estático en GitHub Pages. No tiene inicio de sesión, cuentas, sistema de comentarios ni backend de formularios. No ejecutamos scripts de seguimiento propios y no vendemos ni compartimos datos personales porque no recopilamos datos personales.',
          )}
        />
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'Like any web server, the hosting provider (GitHub) may keep routine server logs. Please refer to GitHub\u2019s privacy policy for details about its handling of those logs.',
            '與任何網站伺服器相同，主機服務商（GitHub）可能保留例行伺服器紀錄。關於這些紀錄的處理方式，請參考 GitHub 的隱私政策。',
            'Como cualquier servidor web, el proveedor de alojamiento (GitHub) puede conservar registros de servidor rutinarios. Consulta la política de privacidad de GitHub para más detalles.',
          )}
        />
      </BiSection>

      <BiSection
        id="cookies"
        kicker={bi('Cookies', 'Cookie', 'Cookies')}
        title={bi('Cookies', 'Cookie', 'Cookies')}
      >
        <Paragraph
          value={bi(
            'This website does not set its own cookies. If advertising or third-party embeds are added in the future, those services may set cookies, and this policy will be updated before they are enabled.',
            '本站不會自行設定 Cookie。若未來加入廣告或第三方嵌入內容，該服務可能設定 Cookie，而本站會先更新本政策後才啟用。',
            'Este sitio no establece cookies propias. Si en el futuro se añaden anuncios o contenidos incrustados de terceros, esos servicios podrían establecer cookies y esta política se actualizará antes de activarlos.',
          )}
        />
      </BiSection>

      <BiSection
        id="storage"
        kicker={bi('Browser storage', '瀏覽器儲存', 'Almacenamiento del navegador')}
        title={bi('Local storage & session data', '本機儲存與工作階段資料', 'Almacenamiento local y datos de sesión')}
      >
        <Paragraph
          value={bi(
            'The site stores two small items in your browser’s local storage: your chosen language (vt-locale), so pages stay in English, Traditional Chinese or Spanish, and the time of your last visit (vt-last-visit), used only to show how far the Voyagers travelled since you were last here. A copy of the previous visit time is kept in session storage (vt-prev-visit) while the tab is open. These values never leave your device, are not linked to any identity, and are not used for tracking or advertising.',
            '本站會在您瀏覽器的本機儲存空間中存放兩個小項目：您選擇的語言（vt-locale），讓頁面維持英文、繁體中文或西班牙文；以及您上次造訪的時間（vt-last-visit），僅用來顯示自您上次來訪後航海家號又飛了多遠。分頁開啟期間，前一次造訪時間的副本會存放在工作階段儲存空間（vt-prev-visit）。這些數值從不離開您的裝置、不與任何身分連結，也不會用於追蹤或廣告。',
            'El sitio guarda dos pequeños datos en el almacenamiento local de tu navegador: el idioma elegido (vt-locale), para mantener las páginas en inglés, chino tradicional o español, y la hora de tu última visita (vt-last-visit), usada solo para mostrar cuánto viajaron las Voyager desde entonces. Mientras la pestaña está abierta se guarda una copia de la visita anterior en el almacenamiento de sesión (vt-prev-visit). Estos valores nunca salen de tu dispositivo, no se vinculan a ninguna identidad y no se usan para seguimiento ni publicidad.',
          )}
        />
      </BiSection>

      <BiSection
        id="third-party"
        kicker={bi('Third parties', '第三方服務', 'Terceros')}
        title={bi('Third-party services', '第三方服務', 'Servicios de terceros')}
      >
        <Paragraph
          value={bi(
            'The pages load fonts from Google Fonts. When your browser requests those fonts, Google receives the standard request information your browser sends. Some pages link to NASA and GitHub websites; opening those links takes you to third-party services governed by their own privacy policies.',
            '頁面會從 Google Fonts 載入字型。您的瀏覽器請求這些字型時，Google 會收到瀏覽器自動傳送的標準請求資訊。部分頁面會連結到 NASA 與 GitHub 網站；開啟這些連結將前往受其各自隱私政策規範的第三方服務。',
            'Las páginas cargan fuentes de Google Fonts. Cuando tu navegador solicita esas fuentes, Google recibe la información estándar que envía tu navegador. Algunas páginas enlazan a NASA y GitHub; al abrirlos vas a servicios de terceros regidos por sus propias políticas.',
          )}
        />
      </BiSection>

      <BiSection
        id="ads"
        kicker={bi('Advertising', '廣告', 'Publicidad')}
        title={bi('Advertising (AdSense)', '廣告（AdSense）', 'Publicidad (AdSense)')}
      >
        <Paragraph
          value={bi(
            'At the time of writing this page, the site does not display Google AdSense or any other advertising. If advertising is added, ad cookies and personalised-ad settings would be governed by Google\u2019s policies, and this page would be updated to say so clearly.',
            '截至本頁撰寫時，本站未顯示 Google AdSense 或任何其他廣告。若未來加入廣告，廣告 Cookie 與個人化廣告設定將受 Google 政策規範，本頁也會明確更新說明。',
            'Mientras se redacta esta página, el sitio no muestra Google AdSense ni ninguna otra publicidad. Si se añade publicidad, las cookies de anuncios y la personalización se regirán por las políticas de Google y esta página se actualizará para decirlo con claridad.',
          )}
        />
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'If Google AdSense is enabled in the future, the following will apply and this section will be updated to confirm it: third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this and other websites; Google’s advertising cookies enable it and its partners to serve ads based on those visits; and you can opt out of personalised advertising in Google’s Ads Settings. Visitors in regions that require it would be asked for consent before such cookies are used.',
            '若未來啟用 Google AdSense，將適用以下說明，屆時本節也會更新確認：包括 Google 在內的第三方供應商會使用 Cookie，依使用者先前造訪本站或其他網站的紀錄放送廣告；Google 的廣告 Cookie 讓 Google 及其合作夥伴能依這些造訪紀錄放送廣告；您可以在 Google 的「廣告設定」中停用個人化廣告。在法規要求的地區，使用這類 Cookie 之前會先徵求訪客同意。',
            'Si en el futuro se activa Google AdSense, se aplicará lo siguiente y esta sección se actualizará para confirmarlo: proveedores externos, incluido Google, usan cookies para mostrar anuncios según las visitas previas del usuario a este y otros sitios; las cookies publicitarias de Google les permiten a Google y a sus socios mostrar anuncios basados en esas visitas; y puedes desactivar la publicidad personalizada en la Configuración de anuncios de Google. En las regiones que lo exigen, se pediría consentimiento antes de usar esas cookies.',
          )}
        />
        <p className="mt-3 text-sm">
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline underline-offset-2">
            Google — How Google uses cookies in advertising
          </a>
          <span className="mx-2 text-slate-600">·</span>
          <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline underline-offset-2">
            Google Ads Settings
          </a>
        </p>
      </BiSection>

      <BiSection id="rights" title={bi('Your choices', '您的選擇', 'Tus opciones')}>
        <Paragraph
          value={bi(
            'Because nothing is collected on a server, there is no personal data held about you to access, correct or delete. You can remove the items described above at any time by clearing this site’s data in your browser settings; the site keeps working without them (it simply returns to English and forgets your last visit).',
            '由於伺服器端不蒐集任何資料，本站並未持有任何可供您查閱、更正或刪除的個人資料。您可以隨時在瀏覽器設定中清除本站資料，以移除上述項目；即使沒有它們，網站仍能正常運作（只是會回到英文並忘記您上次的造訪）。',
            'Como no se recopila nada en ningún servidor, no hay datos personales tuyos que consultar, corregir o eliminar. Puedes borrar en cualquier momento los datos de este sitio desde la configuración del navegador; el sitio sigue funcionando sin ellos (vuelve al inglés y olvida tu última visita).',
          )}
        />
      </BiSection>

      <BiSection id="external-links" title={bi('External links', '外部連結', 'Enlaces externos')}>
        <Paragraph
          value={bi(
            'Pages link to NASA, JPL, the U.S. Naval Observatory, GitHub and other external sites. Following a link takes you to a site with its own privacy policy, which this site does not control.',
            '頁面會連結到 NASA、JPL、美國海軍天文台、GitHub 與其他外部網站。點選連結後，您將前往擁有各自隱私政策的網站，本站無法控制這些網站。',
            'Las páginas enlazan a la NASA, JPL, el Observatorio Naval de EE. UU., GitHub y otros sitios externos. Al seguir un enlace llegas a un sitio con su propia política de privacidad, que este sitio no controla.',
          )}
        />
      </BiSection>

      <BiSection id="changes" title={bi('Changes to this policy', '本政策的變更', 'Cambios en esta política')}>
        <Paragraph
          value={bi(
            'This policy will be updated before any new third-party service, such as advertising, is enabled, and the change will be recorded on the Updates page. The date below is when the site, including this page, was last updated.',
            '在啟用任何新的第三方服務（例如廣告）之前，本政策會先行更新，並記錄於更新紀錄頁。下方日期為本站（包含本頁）最後更新的時間。',
            'Esta política se actualizará antes de activar cualquier nuevo servicio de terceros, como publicidad, y el cambio se registrará en Novedades. La fecha de abajo indica la última actualización del sitio, incluida esta página.',
          )}
        />
        <p className="mt-3 font-mono text-xs text-slate-400">
          Last updated / 最後更新 / Última actualización: <time dateTime={__BUILD_DATE__}>{__BUILD_DATE__}</time>
        </p>
      </BiSection>

      <BiSection
        id="contact"
        kicker={bi('Questions', '問題', 'Preguntas')}
        title={bi('Privacy questions', '隱私相關問題', 'Preguntas sobre privacidad')}
      >
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh ? (
            <>若您對本政策有任何疑問，可透過 {gh} 的 Issue 追蹤器與本站聯繫。</>
          ) : es ? (
            <>
              Si tiene alguna pregunta sobre esta política, puede contactar con el proyecto a
              través del rastreador de incidencias de {gh}.
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

