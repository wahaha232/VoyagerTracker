/**
 * TimelinePage — /timeline.html  (EN / 繁中 / Español)
 *
 * Interactive mission timeline: filter by spacecraft, expand any event to
 * see what happened, the mission context, why it matters and its source.
 * Uses native <details> so every event's text is present in the HTML and
 * works without JavaScript; the filters are a progressive enhancement.
 */

import { useState } from 'react';
import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { ExternalLinkIcon } from '../components/icons';
import { BiArticleHeader, bi, txt, useLang } from '../components/content';
import { historicalSunAu } from '../lib/ephemeris';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });
type Craft = 'voyager1' | 'voyager2' | 'both';

interface TimelineEvent {
  date: string;
  craft: Craft;
  title: Tri;
  what: Tri;
  context: Tri;
  why: Tri;
  source: { label: string; url: string };
  upcoming?: boolean;
}

const NASA_V1 = { label: 'NASA Science — Voyager 1', url: 'https://science.nasa.gov/mission/voyager/voyager-1/' };
const NASA_V2 = { label: 'NASA Science — Voyager 2', url: 'https://science.nasa.gov/mission/voyager/voyager-2/' };
const NASA_MISSION = { label: 'NASA Science — Voyager mission', url: 'https://science.nasa.gov/mission/voyager/' };

export const EVENTS: TimelineEvent[] = [
  {
    date: '1977-08-20',
    craft: 'voyager2',
    title: T('Voyager 2 launches', '航海家二號發射', 'Despega la Voyager 2'),
    what: T('A Titan IIIE-Centaur rocket lifts Voyager 2 off from Cape Canaveral, Florida.', '泰坦 IIIE－半人馬座火箭從美國佛羅里達州卡納維爾角將航海家二號送上太空。', 'Un cohete Titán IIIE-Centauro lanza la Voyager 2 desde Cabo Cañaveral, Florida.'),
    context: T('It launches first but on the slower of the two trajectories — the one that keeps Uranus and Neptune within reach.', '它雖然先發射，走的卻是兩條軌道中較慢的一條——也就是保留前往天王星與海王星可能性的那條。', 'Despega primero, pero por la más lenta de las dos trayectorias: la que mantiene al alcance Urano y Neptuno.'),
    why: T('The launch window used a planetary alignment that recurs only about every 175 years.', '這個發射窗口利用了約每 175 年才出現一次的行星排列。', 'La ventana de lanzamiento aprovechó una alineación planetaria que se repite solo cada unos 175 años.'),
    source: NASA_V2,
  },
  {
    date: '1977-09-05',
    craft: 'voyager1',
    title: T('Voyager 1 launches', '航海家一號發射', 'Despega la Voyager 1'),
    what: T('Voyager 1 lifts off 16 days after its twin, on a faster, shorter path to Jupiter.', '航海家一號在孿生探測器之後 16 天升空，走一條更快、更短的路線前往木星。', 'La Voyager 1 despega 16 días después que su gemela, por una ruta más rápida y corta hacia Júpiter.'),
    context: T('Because it will arrive first, it is named Voyager 1. It overtakes Voyager 2 in distance from the Sun before the end of 1977.', '因為它會率先抵達，所以被命名為航海家一號。它在 1977 年底前就在與太陽的距離上超越了二號。', 'Como llegará primero, recibe el nombre de Voyager 1. Supera en distancia al Sol a la Voyager 2 antes de terminar 1977.'),
    why: T('Its faster route is why it is still the most distant spacecraft today.', '這條較快的路線，正是它至今仍是最遙遠太空船的原因。', 'Esa ruta más rápida explica por qué sigue siendo hoy la nave más lejana.'),
    source: NASA_V1,
  },
  {
    date: '1979-03-05',
    craft: 'voyager1',
    title: T('Voyager 1 at Jupiter', '航海家一號抵達木星', 'La Voyager 1 en Júpiter'),
    what: T('Closest approach to Jupiter. Images reveal erupting volcanoes on the moon Io and a faint ring around the planet.', '最接近木星。影像揭示衛星木衛一上噴發中的火山，以及環繞木星的暗弱光環。', 'Máximo acercamiento a Júpiter. Las imágenes revelan volcanes en erupción en Ío y un tenue anillo alrededor del planeta.'),
    context: T('Jupiter’s gravity raises the probe’s speed from about 14 to about 23 km/s relative to the Sun (JPL Horizons data).', '木星的重力讓探測器相對太陽的速度從約 14 公里/秒提升到約 23 公里/秒（JPL Horizons 資料）。', 'La gravedad de Júpiter eleva su velocidad de unos 14 a unos 23 km/s respecto al Sol (datos de JPL Horizons).'),
    why: T('Io was the first place beyond Earth seen to be volcanically active, showing that tidal heating can keep small worlds geologically alive.', '木衛一是人類首次在地球以外觀察到有火山活動的地方，證明潮汐加熱能讓小型天體維持地質活動。', 'Ío fue el primer lugar fuera de la Tierra visto con vulcanismo activo, prueba de que el calentamiento de marea puede mantener vivos mundos pequeños.'),
    source: NASA_V1,
  },
  {
    date: '1979-07-09',
    craft: 'voyager2',
    title: T('Voyager 2 at Jupiter', '航海家二號抵達木星', 'La Voyager 2 en Júpiter'),
    what: T('Voyager 2 flies past Jupiter four months after its twin, getting better views of the moon Europa and watching how Io’s volcanoes had changed.', '航海家二號在孿生探測器四個月後飛掠木星，更清楚地拍到衛星木衛二，並觀察木衛一火山的變化。', 'La Voyager 2 sobrevuela Júpiter cuatro meses después que su gemela, con mejores vistas de Europa y observando cómo habían cambiado los volcanes de Ío.'),
    context: T('Having two flybys months apart let scientists see a changing system rather than a single snapshot.', '相隔數月的兩次飛掠，讓科學家看到的是一個持續變化的系統，而非單一快照。', 'Dos sobrevuelos separados por meses permitieron ver un sistema cambiante y no una sola instantánea.'),
    why: T('Europa’s cracked, young-looking ice surface was an early hint of the ocean now thought to lie beneath it.', '木衛二龜裂、看似年輕的冰面，是其下方可能存在海洋的早期線索。', 'La superficie helada, agrietada y de aspecto joven de Europa fue un primer indicio del océano que hoy se cree que oculta.'),
    source: NASA_V2,
  },
  {
    date: '1980-11-12',
    craft: 'voyager1',
    title: T('Voyager 1 at Saturn and Titan', '航海家一號抵達土星與泰坦', 'La Voyager 1 en Saturno y Titán'),
    what: T('Voyager 1 passes Saturn and makes a close flyby of its largest moon, Titan, finding a thick nitrogen atmosphere hidden under orange haze.', '航海家一號飛掠土星，並近距離飛掠其最大衛星泰坦，發現橘色霧霾之下藏著濃厚的氮氣大氣。', 'La Voyager 1 pasa por Saturno y hace un sobrevuelo cercano de Titán, su mayor luna, hallando una densa atmósfera de nitrógeno bajo una neblina naranja.'),
    context: T('The Titan pass bends Voyager 1 out of the planets’ plane, ending its planetary tour.', '泰坦飛掠把航海家一號甩出行星軌道面，結束了它的行星之旅。', 'El paso por Titán saca a la Voyager 1 del plano de los planetas y termina su gira planetaria.'),
    why: T('A deliberate trade-off: scientists valued Titan over later planets — and Titan later became the target of the Huygens probe.', '這是刻意的取捨：科學家認為泰坦比後續行星更有價值——而泰坦後來也成為惠更斯號登陸器的目標。', 'Un intercambio deliberado: los científicos valoraron Titán por encima de otros planetas, y Titán sería después el destino de la sonda Huygens.'),
    source: NASA_V1,
  },
  {
    date: '1981-08-25',
    craft: 'voyager2',
    title: T('Voyager 2 at Saturn', '航海家二號抵達土星', 'La Voyager 2 en Saturno'),
    what: T('Voyager 2 studies Saturn’s rings and atmosphere; its route is chosen to keep Uranus reachable.', '航海家二號研究土星環與大氣；它的路線經過規劃，以保留前往天王星的可能。', 'La Voyager 2 estudia los anillos y la atmósfera de Saturno; su ruta se elige para mantener Urano al alcance.'),
    context: T('A jammed camera platform briefly interrupted observations after closest approach; engineers later worked around it.', '最接近土星後，相機平台一度卡住而中斷觀測；工程師後來找到繞過問題的方法。', 'Una plataforma de cámaras atascada interrumpió brevemente las observaciones tras el máximo acercamiento; los ingenieros lo solucionaron después.'),
    why: T('Saturn’s gravity assist set up the only visits ever made to Uranus and Neptune.', '土星的重力助推，為人類唯一一次造訪天王星與海王星鋪好了路。', 'La asistencia gravitatoria de Saturno preparó las únicas visitas hechas a Urano y Neptuno.'),
    source: NASA_V2,
  },
  {
    date: '1986-01-24',
    craft: 'voyager2',
    title: T('Voyager 2 at Uranus', '航海家二號抵達天王星', 'La Voyager 2 en Urano'),
    what: T('The first and only close flyby of Uranus: ten new moons, two new rings and a magnetic field tilted about 60° from the rotation axis.', '人類首次也是唯一一次近距離飛掠天王星：發現十顆新衛星、兩道新環，以及與自轉軸傾斜約 60° 的磁場。', 'El primer y único sobrevuelo cercano de Urano: diez lunas nuevas, dos anillos nuevos y un campo magnético inclinado unos 60° respecto al eje de rotación.'),
    context: T('Engineers had reprogrammed the spacecraft on the way so it could return data from much farther away.', '工程師在途中重新編寫了太空船程式，讓它能從遠得多的地方傳回資料。', 'Por el camino, los ingenieros reprogramaron la nave para que pudiera enviar datos desde mucho más lejos.'),
    why: T('Nearly everything we know about Uranus up close still comes from these few days.', '我們對天王星的近距離認識，幾乎全部仍來自這短短幾天。', 'Casi todo lo que sabemos de Urano de cerca procede aún de esos pocos días.'),
    source: NASA_V2,
  },
  {
    date: '1989-08-25',
    craft: 'voyager2',
    title: T('Voyager 2 at Neptune and Triton', '航海家二號抵達海王星與海衛一', 'La Voyager 2 en Neptuno y Tritón'),
    what: T('Voyager 2 finds the Great Dark Spot storm, the fastest winds measured on any planet, complete but faint rings, and plumes erupting on the moon Triton.', '航海家二號發現大暗斑風暴、行星上測得最快的風、完整但暗弱的環，以及衛星海衛一上的噴發羽流。', 'La Voyager 2 descubre la Gran Mancha Oscura, los vientos más rápidos medidos en un planeta, anillos completos pero tenues y penachos que brotan en Tritón.'),
    context: T('The encounter bends Voyager 2 south of the planets’ plane and slows it slightly relative to the Sun.', '這次飛掠把航海家二號甩向行星軌道面南方，並使它相對太陽的速度略為下降。', 'El encuentro desvía a la Voyager 2 al sur del plano de los planetas y la frena ligeramente respecto al Sol.'),
    why: T('It completed the reconnaissance of all four giant planets — 12 years after launch.', '它在發射 12 年後，完成了對全部四顆巨行星的初步偵察。', 'Completó el reconocimiento de los cuatro planetas gigantes, 12 años después del lanzamiento.'),
    source: NASA_V2,
  },
  {
    date: '1990-01-01',
    craft: 'both',
    title: T('The Voyager Interstellar Mission begins', '航海家星際任務展開', 'Empieza la Misión Interestelar Voyager'),
    what: T('NASA formally extends the mission with a new goal: to explore the outer heliosphere and reach interstellar space.', 'NASA 正式延長任務，並訂定新目標：探索日球層外圍並抵達星際空間。', 'La NASA amplía oficialmente la misión con un nuevo objetivo: explorar la heliosfera exterior y llegar al espacio interestelar.'),
    context: T('Cameras and planetary instruments were no longer needed; fields-and-particles instruments became the focus.', '相機與行星觀測儀器已不再需要，場與粒子儀器成為重點。', 'Las cámaras e instrumentos planetarios dejaron de ser necesarios; el foco pasó a los instrumentos de campos y partículas.'),
    why: T('It turned a planetary mission into a 35-year-plus journey to the edge of the Sun’s influence.', '它把一項行星任務，變成一段長達 35 年以上、前往太陽影響力邊緣的旅程。', 'Convirtió una misión planetaria en un viaje de más de 35 años hasta el límite de la influencia solar.'),
    source: NASA_MISSION,
  },
  {
    date: '1990-02-14',
    craft: 'voyager1',
    title: T('Family portrait and the Pale Blue Dot', '太陽系全家福與蒼藍小點', 'Retrato de familia y pálido punto azul'),
    what: T('Voyager 1 photographs six planets from about 40 AU, including Earth as a speck smaller than a pixel.', '航海家一號從約 40 AU 外拍下六顆行星，其中地球只是一粒比畫素還小的光點。', 'La Voyager 1 fotografía seis planetas desde unas 40 UA, incluida la Tierra como una mota menor que un píxel.'),
    context: T('These were the last images either Voyager would take; the cameras were switched off soon afterwards.', '這是兩艘航海家號最後拍攝的影像；相機不久後便關閉了。', 'Fueron las últimas imágenes de cualquiera de las Voyager; las cámaras se apagaron poco después.'),
    why: T('It became one of the most recognised images in science and a lasting symbol of Earth’s fragility.', '它成為科學史上最知名的影像之一，也是地球脆弱性的長久象徵。', 'Se convirtió en una de las imágenes científicas más reconocidas y en símbolo duradero de la fragilidad de la Tierra.'),
    source: { label: 'NASA Science — Voyager 1’s Pale Blue Dot', url: 'https://science.nasa.gov/resource/voyager-1s-pale-blue-dot/' },
  },
  {
    date: '1998-02-17',
    craft: 'voyager1',
    title: T('Voyager 1 becomes the most distant human-made object', '航海家一號成為最遙遠的人造物體', 'La Voyager 1 se convierte en el objeto humano más lejano'),
    what: T('At about 69 AU, Voyager 1 overtakes Pioneer 10.', '在約 69 AU 處，航海家一號超越先鋒十號。', 'A unas 69 UA, la Voyager 1 supera a la Pioneer 10.'),
    context: T('Pioneer 10 launched five years earlier but was slower; Voyager 1 has held the record ever since.', '先鋒十號早了五年發射，但速度較慢；此後航海家一號便一直保持這項紀錄。', 'La Pioneer 10 despegó cinco años antes pero era más lenta; la Voyager 1 mantiene el récord desde entonces.'),
    why: T('Every distance on this site’s tracker is, literally, a new human record being set in real time.', '本站追蹤器上的每一個距離數字，實際上都是正在即時刷新的人類紀錄。', 'Cada distancia del rastreador de este sitio es, literalmente, un récord humano que se bate en tiempo real.'),
    source: NASA_V1,
  },
  {
    date: '2004-12-16',
    craft: 'voyager1',
    title: T('Voyager 1 crosses the termination shock', '航海家一號通過終端激波', 'La Voyager 1 cruza el choque de terminación'),
    what: T('At about 94 AU the solar wind around Voyager 1 abruptly slows from supersonic to subsonic speed.', '在約 94 AU 處，航海家一號周圍的太陽風從超音速驟降為次音速。', 'A unas 94 UA, el viento solar alrededor de la Voyager 1 pasa bruscamente de supersónico a subsónico.'),
    context: T('This marks entry into the heliosheath, the turbulent outer layer of the heliosphere.', '這代表它進入了日鞘——日球層外圍的紊流層。', 'Marca la entrada en la heliofunda, la capa exterior turbulenta de la heliosfera.'),
    why: T('It was the first direct detection of the heliosphere’s inner boundary.', '這是首次直接偵測到日球層的內側邊界。', 'Fue la primera detección directa del límite interior de la heliosfera.'),
    source: NASA_V1,
  },
  {
    date: '2007-08-30',
    craft: 'voyager2',
    title: T('Voyager 2 crosses the termination shock', '航海家二號通過終端激波', 'La Voyager 2 cruza el choque de terminación'),
    what: T('Voyager 2 reaches the termination shock at about 84 AU — roughly 10 AU closer to the Sun than Voyager 1 did.', '航海家二號在約 84 AU 處抵達終端激波——比一號近了約 10 AU。', 'La Voyager 2 alcanza el choque de terminación a unas 84 UA, unas 10 UA más cerca del Sol que la Voyager 1.'),
    context: T('Its working plasma instrument measured the crossing directly — several times, as the shock moved back and forth.', '它仍在運作的電漿儀器直接量測到穿越過程——而且因為激波來回移動，量測到了好幾次。', 'Su instrumento de plasma, aún activo, midió el cruce directamente, varias veces, porque el choque se movía adelante y atrás.'),
    why: T('The different distances showed the heliosphere is asymmetric, pushed in on one side.', '兩次不同的距離顯示日球層並不對稱，其中一側被壓縮。', 'Las distancias distintas mostraron que la heliosfera es asimétrica, aplastada por un lado.'),
    source: NASA_V2,
  },
  {
    date: '2012-08-25',
    craft: 'voyager1',
    title: T('Voyager 1 enters interstellar space', '航海家一號進入星際空間', 'La Voyager 1 entra al espacio interestelar'),
    what: T('At about 121.6 AU, particles from the Sun drop sharply and galactic cosmic rays rise.', '在約 121.6 AU 處，來自太陽的粒子急遽減少，銀河宇宙射線增加。', 'A unas 121,6 UA caen bruscamente las partículas solares y aumentan los rayos cósmicos galácticos.'),
    context: T('Because its plasma instrument had failed, confirmation came only in 2013, when solar-storm-driven plasma waves revealed much denser surrounding gas.', '由於電漿儀器早已故障，直到 2013 年太陽風暴引發的電漿波顯示周圍氣體密度大增，才得以確認。', 'Como su instrumento de plasma había fallado, la confirmación llegó en 2013, cuando ondas de plasma causadas por una tormenta solar revelaron un gas mucho más denso.'),
    why: T('The first human-made object to leave the Sun’s protective bubble.', '第一個離開太陽保護泡泡的人造物體。', 'El primer objeto humano en salir de la burbuja protectora del Sol.'),
    source: NASA_V1,
  },
  {
    date: '2017-11-28',
    craft: 'voyager1',
    title: T('Thrusters fired after 37 years', '沉寂 37 年的推進器重新點火', 'Propulsores encendidos tras 37 años'),
    what: T('Engineers test Voyager 1’s trajectory-correction thrusters, unused since 1980, and use them for attitude control.', '工程師測試航海家一號自 1980 年就未使用的軌道修正推進器，並改用它們控制姿態。', 'Los ingenieros prueban los propulsores de corrección de trayectoria de la Voyager 1, sin uso desde 1980, y los usan para controlar su orientación.'),
    context: T('The attitude thrusters in use had degraded; the old set still worked after decades of cold.', '當時使用的姿態推進器已經劣化；而那組舊推進器在沉寂數十年後依然可用。', 'Los propulsores de orientación en uso se habían degradado; el juego antiguo seguía funcionando tras décadas de frío.'),
    why: T('It extended the mission by keeping the antenna pointed at Earth.', '它讓天線能持續對準地球，從而延長了任務壽命。', 'Prolongó la misión al mantener la antena apuntada a la Tierra.'),
    source: NASA_V1,
  },
  {
    date: '2018-11-05',
    craft: 'voyager2',
    title: T('Voyager 2 enters interstellar space', '航海家二號進入星際空間', 'La Voyager 2 entra al espacio interestelar'),
    what: T('At about 119 AU its plasma instrument sees the solar wind stop — a direct measurement of the heliopause.', '在約 119 AU 處，它的電漿儀器觀測到太陽風消失——這是對日球層頂的直接量測。', 'A unas 119 UA su instrumento de plasma ve detenerse el viento solar: una medición directa de la heliopausa.'),
    context: T('NASA announced the crossing in December 2018, after the data had been analysed.', 'NASA 在分析資料後，於 2018 年 12 月宣布了這次穿越。', 'La NASA anunció el cruce en diciembre de 2018, tras analizar los datos.'),
    why: T('A second crossing, in a different direction, turned one data point into a comparison.', '第二次、而且在不同方向的穿越，讓單一資料點變成了可以比較的兩個樣本。', 'Un segundo cruce, en otra dirección, convirtió un dato aislado en una comparación.'),
    source: { label: 'NASA — Voyager 2 enters interstellar space', url: 'https://www.nasa.gov/news-release/nasas-voyager-2-probe-enters-interstellar-space/' },
  },
  {
    date: '2024-06-13',
    craft: 'voyager1',
    title: T('Voyager 1 recovers from a memory fault', '航海家一號從記憶體故障中恢復', 'La Voyager 1 se recupera de un fallo de memoria'),
    what: T('After sending unreadable data since November 2023, Voyager 1 again returns science from all four instruments then operating.', '自 2023 年 11 月起傳回無法解讀的資料後，航海家一號恢復從當時運作中的四項儀器回傳科學資料。', 'Tras enviar datos ilegibles desde noviembre de 2023, la Voyager 1 vuelve a enviar ciencia de sus cuatro instrumentos activos.'),
    context: T('A failed chip had corrupted part of the flight data system’s memory; engineers moved the affected code elsewhere.', '一枚故障晶片損壞了飛行資料系統的部分記憶體；工程師把受影響的程式碼移到其他地方。', 'Un chip averiado había dañado parte de la memoria del sistema de datos de vuelo; los ingenieros trasladaron el código afectado.'),
    why: T('A software repair made from more than 24 billion km away, with a two-day command-and-reply cycle.', '這是在超過 240 億公里外、每次指令往返需要兩天的條件下完成的軟體修復。', 'Una reparación de software a más de 24 000 millones de km, con un ciclo orden-respuesta de dos días.'),
    source: { label: 'NASA — Voyager 1 returning science data from all four instruments', url: 'https://science.nasa.gov/blogs/voyager/2024/06/13/voyager-1-returning-science-data-from-all-four-instruments/' },
  },
  {
    date: '2024-10-01',
    craft: 'voyager2',
    title: T('Voyager 2’s plasma instrument switched off', '航海家二號關閉電漿儀器', 'Se apaga el instrumento de plasma de la Voyager 2'),
    what: T('NASA turns off Voyager 2’s plasma science instrument to save power.', 'NASA 關閉航海家二號的電漿科學儀以節省電力。', 'La NASA apaga el instrumento de ciencia del plasma de la Voyager 2 para ahorrar energía.'),
    context: T('The instrument had returned little data recently because of its orientation relative to the plasma flow.', '由於相對電漿流的方向，這項儀器近來回傳的資料已經很少。', 'El instrumento enviaba pocos datos por su orientación respecto al flujo de plasma.'),
    why: T('Part of a long-planned sequence to keep the spacecraft operating as power declines.', '這是長期規劃中的一步，目的是在電力下降時讓太空船持續運作。', 'Parte de una secuencia planificada hace tiempo para mantener la nave operativa mientras cae la energía.'),
    source: { label: 'NASA — Turns off science instrument to save Voyager 2 power', url: 'https://science.nasa.gov/blogs/voyager/2024/10/01/nasa-turns-off-science-instrument-to-save-voyager-2-power/' },
  },
  {
    date: '2025-02-25',
    craft: 'both',
    title: T('Two more instruments switched off', '再關閉兩項儀器', 'Se apagan dos instrumentos más'),
    what: T('Voyager 1’s cosmic ray subsystem is turned off on 25 February; Voyager 2’s low-energy charged particle instrument follows on 24 March.', '航海家一號的宇宙射線次系統於 2 月 25 日關閉；航海家二號的低能量帶電粒子儀於 3 月 24 日跟進。', 'El 25 de febrero se apaga el subsistema de rayos cósmicos de la Voyager 1; el 24 de marzo, el instrumento de partículas de baja energía de la Voyager 2.'),
    context: T('NASA said that without these steps the probes might have had only months of power left.', 'NASA 表示，若不採取這些措施，探測器的電力可能只剩幾個月。', 'La NASA dijo que sin estas medidas las sondas quizá solo tendrían energía para unos meses.'),
    why: T('Trading some science for time keeps both spacecraft returning data for longer.', '以部分科學換取時間，讓兩艘太空船能更久地持續回傳資料。', 'Cambiar algo de ciencia por tiempo permite que ambas naves sigan enviando datos durante más tiempo.'),
    source: { label: 'NASA — Turns off 2 Voyager science instruments', url: 'https://science.nasa.gov/blogs/voyager/2025/03/05/nasa-turns-off-2-voyager-science-instruments-to-extend-mission/' },
  },
  {
    date: '2025-03-20',
    craft: 'voyager1',
    title: T('Voyager 1’s primary roll thrusters revived', '航海家一號的主滾轉推進器復活', 'Reviven los propulsores de balanceo principales de la Voyager 1'),
    what: T('Thrusters out of use since their heaters lost power in 2004 are brought back as a fallback.', '自 2004 年加熱器斷電後就停用的推進器被重新啟用，作為後援。', 'Unos propulsores sin uso desde que sus calentadores perdieron energía en 2004 vuelven a funcionar como respaldo.'),
    context: T('The backup thrusters then in use were at risk of clogging; engineers suspected a switch had been flipped, and were right.', '當時使用中的備用推進器有堵塞風險；工程師懷疑是某個開關被切換到錯誤位置，結果猜對了。', 'Los propulsores de reserva en uso corrían riesgo de obstruirse; los ingenieros sospecharon de un interruptor mal colocado y acertaron.'),
    why: T('Losing attitude control would mean losing contact; this bought a margin of safety.', '失去姿態控制就等於失去聯繫；這次修復替任務爭取到安全餘裕。', 'Perder el control de orientación supondría perder el contacto; esto dio un margen de seguridad.'),
    source: { label: 'NASA — Voyager 1 revives backup thrusters before command pause', url: 'https://science.nasa.gov/blogs/voyager/2025/05/14/nasas-voyager-1-revives-backup-thrusters-before-command-pause/' },
  },
  {
    date: '2026-04-17',
    craft: 'voyager1',
    title: T('Voyager 1’s LECP switched off', '航海家一號關閉 LECP', 'Se apaga el LECP de la Voyager 1'),
    what: T('The low-energy charged particle instrument, operating almost continuously since 1977, is turned off.', '自 1977 年以來幾乎不間斷運作的低能量帶電粒子儀被關閉。', 'Se apaga el instrumento de partículas cargadas de baja energía, en funcionamiento casi continuo desde 1977.'),
    context: T('A small motor that rotates the sensor was left on, which could allow the instrument to be revived later.', '讓感測器旋轉的小馬達仍保持開啟，未來或許有機會重新啟用這項儀器。', 'Se dejó encendido un pequeño motor que gira el sensor, lo que podría permitir reactivarlo más adelante.'),
    why: T('Voyager 1 is left with its magnetometer and plasma wave instrument.', '航海家一號只剩磁力計與電漿波儀器。', 'La Voyager 1 queda con su magnetómetro y su instrumento de ondas de plasma.'),
    source: { label: 'NASA — Shuts off instrument on Voyager 1', url: 'https://science.nasa.gov/blogs/voyager/2026/04/17/nasa-shuts-off-instrument-on-voyager-1-to-keep-spacecraft-operating/' },
  },
  {
    date: '2026-08-04',
    craft: 'voyager2',
    title: T('Power-saving swap extends Voyager 2', '節電改裝延長航海家二號的壽命', 'Un cambio de ahorro energético prolonga la Voyager 2'),
    what: T('NASA reports that engineers replaced several power-hungry devices on Voyager 2 with lower-power alternatives in one coordinated change.', 'NASA 公布，工程師以一次協調好的更換，把航海家二號上數項耗電設備換成低功耗替代方案。', 'La NASA informa de que los ingenieros sustituyeron en un solo cambio coordinado varios equipos de alto consumo de la Voyager 2 por alternativas más eficientes.'),
    context: T('The same change is planned for Voyager 1 in the following months.', '同樣的改裝預計在接下來數個月內於航海家一號上執行。', 'Está previsto hacer el mismo cambio en la Voyager 1 en los meses siguientes.'),
    why: T('It keeps Voyager 2’s three remaining instruments running for at least another year.', '它讓航海家二號剩下的三項儀器至少能再運作一年。', 'Mantiene los tres instrumentos restantes de la Voyager 2 al menos un año más.'),
    source: { label: 'NASA — Engineers help prolong Voyager 2’s science mission', url: 'https://science.nasa.gov/blogs/voyager/2026/08/04/nasa-engineers-help-prolong-voyager-2s-science-mission/' },
  },
  {
    date: '2026-11-18',
    craft: 'voyager1',
    upcoming: true,
    title: T('Voyager 1 one light-day from Earth (upcoming)', '航海家一號距地球一光日（即將到來）', 'La Voyager 1 a un día-luz de la Tierra (próximamente)'),
    what: T('NASA projects that Voyager 1 will be about 25.9 billion km from Earth — the distance light travels in 24 hours.', 'NASA 預計航海家一號將距地球約 259 億公里——也就是光在 24 小時內行進的距離。', 'La NASA prevé que la Voyager 1 estará a unos 25 900 millones de km de la Tierra, la distancia que recorre la luz en 24 horas.'),
    context: T('This site’s model independently puts the crossing on the same date.', '本站的模型獨立推算，也得出同一天。', 'El modelo de este sitio sitúa de forma independiente el cruce en la misma fecha.'),
    why: T('No human-made object has ever been a full light-day away.', '從來沒有任何人造物體離我們整整一光日遠。', 'Ningún objeto humano ha estado nunca a un día-luz completo.'),
    source: { label: 'NASA — Where are Voyager 1 and Voyager 2 now?', url: 'https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/' },
  },
];

const CRAFT_LABEL: Record<Craft, Tri> = {
  voyager1: T('Voyager 1', '航海家一號', 'Voyager 1'),
  voyager2: T('Voyager 2', '航海家二號', 'Voyager 2'),
  both: T('Both spacecraft', '兩艘探測器', 'Ambas naves'),
};
const CRAFT_COLOR: Record<Craft, string> = { voyager1: 'bg-cyan-400', voyager2: 'bg-emerald-400', both: 'bg-violet-400' };

export default function TimelinePage() {
  const locale = useLang();
  const [filter, setFilter] = useState<'all' | 'voyager1' | 'voyager2'>('all');
  const shown = EVENTS.filter((e) => filter === 'all' || e.craft === filter || e.craft === 'both');
  const fmtDate = (d: string) =>
    new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(Date.parse(`${d}T00:00:00Z`));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="timeline"
        title={bi('Voyager mission timeline', '航海家任務時間軸', 'Cronología de la misión Voyager')}
        intro={bi(
          `${EVENTS.length} key moments from 1977 to today. Open any event to see what happened, the context around it, why it matters and where the information comes from. Where helpful, the spacecraft’s distance from the Sun on that date is shown from JPL Horizons data.`,
          `從 1977 年至今的 ${EVENTS.length} 個關鍵時刻。展開任一事件，即可看到發生了什麼、背景脈絡、為何重要以及資料出處；並依 JPL Horizons 資料標示探測器當天與太陽的距離。`,
          `${EVENTS.length} momentos clave desde 1977 hasta hoy. Abre cualquier evento para ver qué pasó, su contexto, por qué importa y de dónde procede la información; cuando procede, se muestra la distancia al Sol ese día según JPL Horizons.`,
        )}
      />

      <div role="group" aria-label={txt(T('Filter by spacecraft', '依探測器篩選', 'Filtrar por nave'), locale)} className="mb-6 flex flex-wrap gap-2">
        {(['all', 'voyager1', 'voyager2'] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`min-h-[40px] rounded-full border px-4 text-sm font-semibold transition-colors ${
              filter === f ? 'border-cyan-400 bg-cyan-500/15 text-cyan-200' : 'border-slate-600 text-slate-300 hover:border-cyan-400/60 hover:text-white'
            }`}
          >
            {f === 'all' ? txt(T('All events', '全部事件', 'Todos'), locale) : txt(CRAFT_LABEL[f], locale)}
          </button>
        ))}
        <span className="self-center text-sm text-slate-400" aria-live="polite">
          {shown.length} / {EVENTS.length}
        </span>
      </div>

      <ol className="relative space-y-3 border-l border-slate-700/70 pl-6">
        {shown.map((e, i) => {
          const craftForDistance = e.craft === 'both' ? 'voyager1' : e.craft;
          const au = e.upcoming ? null : historicalSunAu(craftForDistance, Date.parse(`${e.date}T12:00:00Z`));
          return (
            <li key={`${e.date}-${e.craft}`} className="relative">
              <span className={`absolute -left-[31px] top-5 h-3 w-3 rounded-full ring-4 ring-space-950 ${CRAFT_COLOR[e.craft]}`} aria-hidden="true" />
              <details open={i === 0} className="group rounded-xl border border-slate-800 bg-space-900/40 open:border-cyan-500/40">
                <summary className="cursor-pointer p-4">
                  <span className="block font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                    <time dateTime={e.date}>{fmtDate(e.date)}</time> · {txt(CRAFT_LABEL[e.craft], locale)}
                  </span>
                  <span className="mt-1 block font-semibold text-slate-100 group-hover:text-cyan-300">{txt(e.title, locale)}</span>
                </summary>
                <dl className="grid gap-3 border-t border-slate-800 p-4 text-sm leading-relaxed sm:grid-cols-[140px_1fr]">
                  <dt className="font-mono text-xs uppercase tracking-wider text-cyan-300">{txt(T('What happened', '發生了什麼', 'Qué pasó'), locale)}</dt>
                  <dd className="text-slate-300">{txt(e.what, locale)}</dd>
                  <dt className="font-mono text-xs uppercase tracking-wider text-cyan-300">{txt(T('Context', '背景脈絡', 'Contexto'), locale)}</dt>
                  <dd className="text-slate-300">{txt(e.context, locale)}</dd>
                  <dt className="font-mono text-xs uppercase tracking-wider text-cyan-300">{txt(T('Why it matters', '為何重要', 'Por qué importa'), locale)}</dt>
                  <dd className="text-slate-300">{txt(e.why, locale)}</dd>
                  {au !== null && (
                    <>
                      <dt className="font-mono text-xs uppercase tracking-wider text-cyan-300">{txt(T('Distance from Sun', '與太陽距離', 'Distancia al Sol'), locale)}</dt>
                      <dd className="font-mono text-slate-300">
                        ≈ {new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(au)} AU
                        {e.craft === 'both' ? ` (${txt(CRAFT_LABEL.voyager1, locale)})` : ''} · JPL Horizons
                      </dd>
                    </>
                  )}
                  <dt className="font-mono text-xs uppercase tracking-wider text-cyan-300">{txt(T('Source', '資料來源', 'Fuente'), locale)}</dt>
                  <dd>
                    <a href={e.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
                      {e.source.label} <ExternalLinkIcon className="h-3 w-3" />
                    </a>
                  </dd>
                </dl>
              </details>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 rounded-xl border border-amber-400/40 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-50">
        <p className="mb-1 font-semibold text-white">{txt(T('About these dates', '關於這些日期', 'Sobre estas fechas'), locale)}</p>
        <p>
          {txt(
            T(
              'Encounter dates are closest-approach dates in UTC. Interstellar crossings are dates later identified in the data, not the dates they were announced. Descriptions are written by this site from the linked NASA/JPL material. Distances are interpolated from monthly JPL samples and are approximate around flybys.',
              '飛掠日期為最接近日（UTC）。穿越星際空間的日期，是事後從資料中確認的日期，而非宣布日期。說明文字由本站依所附 NASA/JPL 資料撰寫。距離由 JPL 月度資料內插而得，在飛掠前後僅為近似值。',
              'Las fechas de encuentros son las de máximo acercamiento (UTC). Los cruces interestelares son las fechas identificadas después en los datos, no las de su anuncio. Los textos los redacta este sitio a partir del material enlazado de NASA/JPL. Las distancias se interpolan de muestras mensuales de JPL y son aproximadas cerca de los sobrevuelos.',
            ),
            locale,
          )}{' '}
          <a href={pageUrl('compare')} className="text-amber-200 underline underline-offset-2">
            {txt(T('See these events on the distance chart', '在距離圖表上查看這些事件', 'Ver estos eventos en el gráfico'), locale)}
          </a>
          .
        </p>
      </div>

      <RelatedLinks items={['mission', 'compare', 'voyager-1', 'voyager-2', 'discoveries']} />
    </div>
  );
}
