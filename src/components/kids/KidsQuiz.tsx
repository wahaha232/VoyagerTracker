/**
 * KidsQuiz — a real, playable five-question space quiz.
 *
 * One question at a time, large answer buttons, instant feedback, a hint
 * when wrong, a star burst when right, cumulative stars, an achievement
 * badge at the end, and a local-only best record. No login, no names and
 * no personal data: the best score is the only thing stored, and storage
 * failures are ignored.
 */

import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../i18n/context';
import { AchievementBadge, CheckMark, CrossMark, Star } from './Art';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });
const pick = (value: Tri, locale: string) => (locale === 'zh-TW' ? value.zh : locale === 'es' ? value.es : value.en);

interface Question {
  q: Tri;
  options: Tri[];
  correct: number;
  hint: Tri;
  explanation: Tri;
}

const QUESTIONS: Question[] = [
  {
    q: T(
      'Which spacecraft visited Uranus and Neptune?',
      '哪一艘太空船造訪了天王星與海王星？',
      '¿Qué nave visitó Urano y Neptuno?',
    ),
    options: [
      T('Voyager 1', '航海家一號', 'Voyager 1'),
      T('Voyager 2', '航海家二號', 'Voyager 2'),
      T('Both of them', '兩艘都去過', 'Las dos'),
    ],
    correct: 1,
    hint: T(
      'One spacecraft made the grand tour of all four giant planets.',
      '其中一艘完成了四顆巨行星的大旅行。',
      'Una nave hizo el gran recorrido por los cuatro planetas gigantes.',
    ),
    explanation: T(
      'Voyager 2 visited Jupiter, Saturn, Uranus and Neptune. Voyager 1 went to Jupiter and Saturn.',
      '航海家二號造訪了木星、土星、天王星與海王星；航海家一號則去了木星與土星。',
      'La Voyager 2 visitó Júpiter, Saturno, Urano y Neptuno. La Voyager 1 fue a Júpiter y Saturno.',
    ),
  },
  {
    q: T(
      'What did Voyager 1 discover on Jupiter’s moon Io?',
      '航海家一號在木星的衛星木衛一上發現了什麼？',
      '¿Qué descubrió la Voyager 1 en Ío, una luna de Júpiter?',
    ),
    options: [
      T('Active volcanoes', '活火山', 'Volcanes activos'),
      T('A big ocean', '一片大海洋', 'Un gran océano'),
      T('A giant ring', '一個巨大光環', 'Un anillo gigante'),
    ],
    correct: 0,
    hint: T(
      'Look for the moon with erupting mountains.',
      '找找那顆有噴發山脈的衛星。',
      'Busca la luna con montañas en erupción.',
    ),
    explanation: T(
      'Voyager 1 saw volcanoes erupting on Io — the first active volcanoes found beyond Earth.',
      '航海家一號看到木衛一上有火山噴發——這是地球以外首次發現的活火山。',
      'La Voyager 1 vio volcanes en erupción en Ío: los primeros volcanes activos hallados fuera de la Tierra.',
    ),
  },
  {
    q: T(
      'In November 2026, how long does a radio signal take to reach Voyager 1 one way?',
      '2026 年 11 月，無線電訊號單程要多久才能抵達航海家一號？',
      'En noviembre de 2026, ¿cuánto tarda una señal de radio en llegar a la Voyager 1?',
    ),
    options: [
      T('About 24 seconds', '約 24 秒', 'Unos 24 segundos'),
      T('About 24 minutes', '約 24 分鐘', 'Unos 24 minutos'),
      T('About 24 hours', '約 24 小時', 'Unas 24 horas'),
    ],
    correct: 2,
    hint: T(
      'One light-day means 24 hours of light travel.',
      '一光日就是光走 24 小時的距離。',
      'Un día-luz son 24 horas de viaje de la luz.',
    ),
    explanation: T(
      'Voyager 1 is about one light-day away, so a signal takes about 24 hours one way — and about 48 hours for a reply.',
      '航海家一號約在一光日外，所以訊號單程約 24 小時，來回約 48 小時。',
      'La Voyager 1 está a unas 24 horas-luz, así que una señal tarda unas 24 horas de ida y unas 48 horas para una respuesta.',
    ),
  },
  {
    q: T(
      'What is on the Golden Record?',
      '金唱片裡有什麼？',
      '¿Qué hay en el Disco de Oro?',
    ),
    options: [
      T('Music, greetings and Earth sounds', '音樂、問候與地球的聲音', 'Música, saludos y sonidos de la Tierra'),
      T('A map of the Moon', '一張月球地圖', 'Un mapa de la Luna'),
      T('Only photos', '只有照片', 'Solo fotos'),
    ],
    correct: 0,
    hint: T(
      'It is a message for possible alien friends.',
      '它是給可能的外星朋友的一則訊息。',
      'Es un mensaje para posibles amigos extraterrestres.',
    ),
    explanation: T(
      'The record carries music, greetings in 55 languages, and sounds of Earth such as thunder, birds and a heartbeat.',
      '唱片收錄音樂、55 種語言的問候，以及雷聲、鳥鳴、心跳等地球聲音。',
      'El disco lleva música, saludos en 55 idiomas y sonidos de la Tierra como truenos, pájaros y un latido.',
    ),
  },
  {
    q: T(
      'Which spacecraft entered interstellar space first?',
      '哪一艘太空船先進入星際空間？',
      '¿Qué nave entró primero en el espacio interestelar?',
    ),
    options: [
      T('Voyager 1', '航海家一號', 'Voyager 1'),
      T('Voyager 2', '航海家二號', 'Voyager 2'),
      T('They arrived together', '兩艘同時抵達', 'Llegaron juntas'),
    ],
    correct: 0,
    hint: T(
      'One crossed the boundary in 2012; the other in 2018.',
      '一艘在 2012 年越過邊界，另一艘在 2018 年。',
      'Una cruzó la frontera en 2012; la otra en 2018.',
    ),
    explanation: T(
      'Voyager 1 entered interstellar space in 2012. Voyager 2 followed in 2018.',
      '航海家一號在 2012 年進入星際空間，航海家二號在 2018 年跟進。',
      'La Voyager 1 entró en el espacio interestelar en 2012. La Voyager 2 la siguió en 2018.',
    ),
  },
];

const ACHIEVEMENTS: {
  min: number;
  key: 'rookie' | 'planet' | 'star' | 'cosmic';
  name: Tri;
  message: Tri;
}[] = [
  {
    min: 5,
    key: 'cosmic',
    name: T('Cosmic Adventurer', '宇宙大冒險家', 'Aventurero cósmico'),
    message: T(
      'You know the Voyager story by heart. The whole universe is yours to explore!',
      '你已經把航海家的故事記在心裡了。整個宇宙都是你的探險樂園！',
      'Te sabes la historia de las Voyager de memoria. ¡Todo el universo es tuyo para explorar!',
    ),
  },
  {
    min: 4,
    key: 'star',
    name: T('Star Expert', '星際知識王', 'Experto estelar'),
    message: T(
      'Amazing! You are almost a cosmic expert.',
      '太厲害了！你幾乎是宇宙專家了。',
      '¡Increíble! Ya casi eres un experto cósmico.',
    ),
  },
  {
    min: 3,
    key: 'planet',
    name: T('Planet Explorer', '行星探索家', 'Explorador de planetas'),
    message: T(
      'Great job! Keep exploring the stars.',
      '做得好！繼續探索星星吧。',
      '¡Buen trabajo! Sigue explorando las estrellas.',
    ),
  },
  {
    min: 0,
    key: 'rookie',
    name: T('Space Rookie', '太空新手', 'Novato espacial'),
    message: T(
      'Every space explorer starts somewhere. Try again and collect more stars!',
      '每位太空探險家都是從這裡開始的。再試一次，收集更多星星！',
      'Todo explorador empieza en algún lugar. ¡Inténtalo otra vez y consigue más estrellas!',
    ),
  },
];

const STORAGE_KEY = 'vt-kids-quiz-best-v1';

interface BestRecord {
  bestStars: number;
  plays: number;
}

function readBest(): BestRecord | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<BestRecord>;
    if (typeof value.bestStars !== 'number' || typeof value.plays !== 'number') return null;
    if (!Number.isFinite(value.bestStars) || !Number.isFinite(value.plays)) return null;
    return {
      bestStars: Math.min(QUESTIONS.length, Math.max(0, Math.round(value.bestStars))),
      plays: Math.max(0, Math.round(value.plays)),
    };
  } catch {
    return null;
  }
}

function writeBest(record: BestRecord) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Private mode, storage disabled or full: the quiz still works.
  }
}

function achievementFor(stars: number) {
  return ACHIEVEMENTS.find((item) => stars >= item.min) ?? ACHIEVEMENTS[ACHIEVEMENTS.length - 1];
}

function StarsRow({
  stars,
  total,
  className,
  label,
}: {
  stars: number;
  total: number;
  className?: string;
  label: string;
}) {
  return (
    <span className={className} role="img" aria-label={label}>
      {Array.from({ length: total }, (_, index) => (
        <Star key={index} className={`kids-star ${index < stars ? 'is-filled' : 'is-empty'}`} />
      ))}
    </span>
  );
}

export default function KidsQuiz() {
  const { locale } = useI18n();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [stars, setStars] = useState(0);
  const [finished, setFinished] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [best, setBest] = useState<BestRecord | null>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setBest(readBest());
  }, []);

  useEffect(() => {
    if (selected !== null && !finished) {
      const timer = window.setTimeout(() => nextRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    }
  }, [selected, finished]);

  const question = QUESTIONS[index];
  const selectedCorrect = selected === question.correct;
  const progress = ((index + (selected !== null ? 1 : 0)) / QUESTIONS.length) * 100;
  const achievement = achievementFor(stars);
  const bestAchievement = best ? achievementFor(best.bestStars) : null;

  const choose = (option: number) => {
    if (selected !== null || finished) return;
    setSelected(option);
    if (option === question.correct) {
      setStars((value) => value + 1);
      setBurstKey((value) => value + 1);
    }
  };

  const next = () => {
    if (index < QUESTIONS.length - 1) {
      setIndex((value) => value + 1);
      setSelected(null);
      window.requestAnimationFrame(() => questionRef.current?.focus());
      return;
    }

    const previous = best ?? readBest();
    const nextBest: BestRecord = {
      bestStars: Math.max(previous?.bestStars ?? 0, stars),
      plays: (previous?.plays ?? 0) + 1,
    };
    setBest(nextBest);
    writeBest(nextBest);
    setFinished(true);
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setStars(0);
    setFinished(false);
    setBurstKey(0);
    window.requestAnimationFrame(() => questionRef.current?.focus());
  };

  const starLabel = (count: number, total: number) =>
    pick(
      T(`${count} of ${total} stars`, `${count} / ${total} 顆星`, `${count} de ${total} estrellas`),
      locale,
    );

  if (finished) {
    return (
      <div className="kids-quiz">
        <div className="kids-quiz-result">
          <AchievementBadge kind={achievement.key} className="kids-result-badge" />
          <p className="kids-result-kicker">{pick(T('Your space rank', '你的太空等級', 'Tu rango espacial'), locale)}</p>
          <h3 ref={resultRef} tabIndex={-1} className="kids-result-title">
            {pick(achievement.name, locale)}
          </h3>
          <p className="kids-result-message">{pick(achievement.message, locale)}</p>
          <StarsRow
            stars={stars}
            total={QUESTIONS.length}
            className="kids-result-stars"
            label={starLabel(stars, QUESTIONS.length)}
          />
          <p className="kids-result-score">
            {stars} / {QUESTIONS.length}
          </p>
          {best && bestAchievement && (
            <p className="kids-result-best">
              {pick(T('Best record', '最佳紀錄', 'Mejor marca'), locale)}: {best.bestStars} / {QUESTIONS.length}
              {' · '}
              {pick(bestAchievement.name, locale)}
            </p>
          )}
          {stars === QUESTIONS.length && (
            <p className="kids-result-perfect">
              {pick(
                T(
                  'Perfect score! You collected every star.',
                  '滿分！你收集了每一顆星星。',
                  '¡Puntuación perfecta! Has conseguido todas las estrellas.',
                ),
                locale,
              )}
            </p>
          )}
          <button type="button" onClick={restart} className="kids-button kids-button-primary">
            {pick(T('Play again', '再玩一次', 'Jugar otra vez'), locale)}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="kids-quiz">
      <div className="kids-quiz-top">
        <p className="kids-quiz-progress-text">
          {pick(T('Question', '第', 'Pregunta'), locale)} {index + 1} / {QUESTIONS.length}
        </p>
        <div className="kids-quiz-stars">
          <StarsRow stars={stars} total={QUESTIONS.length} label={starLabel(stars, QUESTIONS.length)} />
          <span aria-hidden="true">{stars}</span>
        </div>
      </div>

      <div
        className="kids-quiz-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={QUESTIONS.length}
        aria-valuenow={index + (selected !== null ? 1 : 0)}
        aria-label={pick(T('Quiz progress', '測驗進度', 'Progreso del cuestionario'), locale)}
      >
        <span style={{ width: `${progress}%` }} />
      </div>

      <div ref={questionRef} tabIndex={-1} className="kids-quiz-question" aria-live="polite">
        <span className="kids-quiz-number">Q{index + 1}</span>
        <h3>{pick(question.q, locale)}</h3>
      </div>

      <div className="kids-quiz-options">
        {question.options.map((option, optionIndex) => {
          const state =
            selected === null
              ? 'idle'
              : optionIndex === question.correct
                ? 'correct'
                : optionIndex === selected
                  ? 'wrong'
                  : 'muted';
          return (
            <button
              key={option.en}
              type="button"
              onClick={() => choose(optionIndex)}
              disabled={selected !== null}
              className={`kids-quiz-option is-${state}`}
            >
              <span className="kids-option-letter" aria-hidden="true">
                {String.fromCharCode(65 + optionIndex)}
              </span>
              <span className="kids-option-text">{pick(option, locale)}</span>
              {state === 'correct' && <CheckMark className="kids-option-mark" />}
              {state === 'wrong' && <CrossMark className="kids-option-mark" />}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div
          className={`kids-quiz-feedback ${selectedCorrect ? 'is-correct' : 'is-wrong'}`}
          role="status"
          aria-live="polite"
        >
          {selectedCorrect && (
            <span key={burstKey} className="kids-star-burst" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((ray) => (
                <span key={ray} className="kids-burst-ray" style={{ transform: `rotate(${ray * 60}deg)` }}>
                  <Star className="kids-burst-star" />
                </span>
              ))}
            </span>
          )}
          <p className="kids-feedback-title">
            {selectedCorrect ? (
              <>
                <Star className="kids-feedback-icon" />
                {pick(T('Bingo!', '答對了！', '¡Bingo!'), locale)}
              </>
            ) : (
              <>
                <CrossMark className="kids-feedback-icon" />
                {pick(T('Not quite!', '差一點！', '¡Casi!'), locale)}
              </>
            )}
          </p>
          <p className="kids-feedback-text">
            {pick(selectedCorrect ? question.explanation : question.hint, locale)}
          </p>
          {!selectedCorrect && (
            <p className="kids-feedback-answer">
              {pick(T('Correct answer', '正確答案', 'Respuesta correcta'), locale)}:{' '}
              <strong>{pick(question.options[question.correct], locale)}</strong>
            </p>
          )}
          <div className="kids-feedback-actions">
            <span className="kids-feedback-star">
              {selectedCorrect
                ? pick(T('+1 star', '+1 顆星', '+1 estrella'), locale)
                : pick(T('No star this time', '這次沒有星星', 'Esta vez no hay estrella'), locale)}
            </span>
            <button ref={nextRef} type="button" onClick={next} className="kids-button kids-button-primary">
              {index < QUESTIONS.length - 1
                ? pick(T('Next question', '下一題', 'Siguiente pregunta'), locale)
                : pick(T('See my result', '看看結果', 'Ver mi resultado'), locale)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
