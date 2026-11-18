import React, { useState } from "react";
import {
  Gem,
  MapPin,
  Pickaxe,
  Swords,
  ArrowDown,
  Star,
  Timer,
  AlertTriangle,
  Copy,
  Check,
  Route,
  BookOpen,
  Home,
  ShieldCheck,
  Clock,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";

const FULL_CRYSTAL_VALLEY_MAIL = `💎 ГАЙД ПО ДОЛИНЕ КРИСТАЛЬНЫХ СКОПЛЕНИЙ (30 МИН + 2 МИН ПОДГОТОВКИ)

🛡️ ВАЖНО О ПОТЕРЯХ И ПРАВИЛАХ:
• Потери войск внутри Долины НЕ влияют на вашу основную армию! На города нападать нельзя — бои только за плитки.
• Лечение идёт за ускорения лечения / универсальные, поэтому не лезьте в бессмысленные драки.
• Событие ИНДИВИДУАЛЬНОЕ (каждый играет на свои очки).

📍 1. СТАРТ И ТЕЛЕПОРТЫ (00:00 – 02:00 ПОДГОТОВКА):
• При входе осмотрите карту (не прыгайте в центр к китам, если не готовы воевать за трон):
  - Для максимума очков (сильный аккаунт): ТП к шахтам III уровня, возле которых минимум 2–3 крысы.
  - Для F2P / среднего аккаунта: лучше выбрать спокойную зону у плиток II уровня рядом с крысами.
• Бесплатный телепорт откатывается каждые 6 минут. Если прыгать, не дожидаясь отката, тратятся предметы «Прямое перемещение» (из сумки): 1-й = 1 шт., 2-й = 2 шт., 3-й = 3 шт., 4-й = 4 шт., 5-й и далее = по 5 шт.!

⚔️ 2. РАСПРЕДЕЛЕНИЕ ОТРЯДОВ И КРЫСЫ:
• На старте крысы дают опыт для навыков события (чем выше уровень крысы — тем больше опыта).
• Первый отряд: постоянно бьёт крыс и выбивает слабых/зазевавшихся игроков с плиток.
• Остальные отряды: постоянно добывают кристаллы (при 3–4 отрядах в первые минуты можно пустить 1 на сбор и 2–3 на крыс, чтобы мгновенно открыть 3-й навык).

📖 3. НАВЫКИ СОБЫТИЯ (СБРАСЫВАЮТСЯ ПОСЛЕ ИВЕНТА):
1. ➡️ Право (+1500 кристаллов за крысу) — ИЛИ ⬅️ Лево (1080 кристаллов пассивно, если крыс мало/конкуренция).
2. ➡️ Право (+25% к скорости похода) — решает больше всего! (Лево: +50 воинов).
3. ⬅️ Лево (+5000 кристаллов за захват плитки, КД 60 сек) — ГЛАВНАЯ ЦЕЛЬ: открыть 3-й навык как можно быстрее!
4. ⬅️ Лево (+15% к скорости сбора с плиток) — под фарм (Право: быстрее снятие ослабления).
5. ➡️ Право (активный, КД 5 мин: +50% сбор на 60 сек) — ИЛИ ⬅️ Лево (+100% статов героев на 60 сек), если атакуете пещеру/трон!

⏱️ 4. МИНУТНЫЕ АТАКИ И РАССЫПАННЫЕ КРИСТАЛЛЫ:
• За само убийство солдат очки НЕ дают! Цель PvP — занять плитку ради +5000 очков от 3-го навыка (строго 1 раз в 60 секунд!) и подобрать рассыпанные вокруг кристаллы.

⏰ 5. КЛЮЧЕВЫЕ ТАЙМИНГИ КАРТЫ:
• 10, 11, 12-я и 20, 21, 22-я минуты: появляются МГНОВЕННЫЕ КРИСТАЛЛЫ — заранее освободите часть отрядов (можно снять с обычной плитки) и заберите их!
• 23–30 минута: открывается битва за Трон / Пещеру на 7 минут (пока топы дерутся в центре, по краям спокойно фармим).

🏆 6. РЕЗУЛЬТАТ И ФИНИШ:
• 3 отряда ≈ 350 000+ кристаллов | 4 отряда ≈ 450 000+ кристаллов (без доп. бонусов).
⚠️ ВАЖНО: до окончания события обязательно верните все отряды в замок!`;

const SHORT_CRYSTAL_VALLEY_CHAT = `💎 ДОЛИНА КРИСТАЛЛОВ (30 мин): Основная армия НЕ теряется! В 2 мин подготовки встаём у плиток 3 ур. (F2P лучше 2 ур.) рядом с 2–3 крысами. Бесплатный ТП раз в 6 мин (без отката: «Прямые перемещения» из сумки 1-2-3-4-5 шт.). Отряды: 1-й бьёт крыс/игроков, остальные копают (в начале можно 2–3 на крыс ради быстрого 3-го навыка). Навыки: Право (или Лево) → Право → Лево (+5000 за захват раз в 60с) → Лево → Право (+50% сбор, или Лево +100% бой на пещеру). Мгновенные кристаллы: 10–12 и 20–22 мин! Трон на 23 мин. Итог: 350–450K+. ⚠️ До конца верните отряды в замок!`;

type PlayStyle = "f2p" | "strong";

interface SkillPair {
  level: number;
  title: string;
  isActive?: boolean;
  left: {
    name: string;
    detail: string;
    pickFor?: "all" | "f2p" | "cave";
  };
  right: {
    name: string;
    detail: string;
    pickFor?: "all" | "strong";
  };
  tip: string;
}

const SKILL_BRANCH_PAIRS: SkillPair[] = [
  {
    level: 1,
    title: "Старт экономики",
    left: {
      name: "1080 кристаллов периодически",
      detail: "Стабильный пассивный доход без добычи — не зависит от конкуренции.",
      pickFor: "f2p",
    },
    right: {
      name: "+1500 кристаллов за каждую убитую крысу",
      detail: "Огромный буст, если рядом есть 2–3 крысы и 1-й отряд постоянно их чистит.",
      pickFor: "strong",
    },
    tip: "Если крыс вокруг много — берите Право; если их быстро разбирают другие — берите Лево.",
  },
  {
    level: 2,
    title: "Темп карты",
    left: {
      name: "+50 воинов в поход",
      detail: "Небольшой плюс к силе отряда в стычках.",
    },
    right: {
      name: "+25% к скорости похода",
      detail: "Быстрее добегаете до крыс, мгновенных и рассыпанных кристаллов, меньше простоя.",
      pickFor: "all",
    },
    tip: "В событии на 30 минут скорость похода почти всегда важнее вместимости.",
  },
  {
    level: 3,
    title: "Главный источник очков (раз в 60 сек)",
    left: {
      name: "+5000 кристаллов за успешный захват плитки",
      detail: "Работает не чаще 1 раза в минуту. Берём ВСЕГДА как можно быстрее!",
      pickFor: "all",
    },
    right: {
      name: "+5000 кристаллов при поражении на плитке",
      detail: "Нужно специально разбивать отряд — тратит время и ускорения лечения.",
    },
    tip: "Главная цель старта: открыть 3-й левый навык и захватывать/отбивать плитку строго 1 раз в минуту!",
  },
  {
    level: 4,
    title: "Середина забега",
    left: {
      name: "+15% к скорости сбора кристаллов с плиток",
      detail: "Стабильно ускоряет добычу для всех собирающих отрядов.",
      pickFor: "all",
    },
    right: {
      name: "Ускоренное снятие ослабления у разбитых героев",
      detail: "Полезно только при постоянных тяжёлых боях за центр и трон.",
    },
    tip: "Для фарма и стабильного результата почти всегда выбирается Лево.",
  },
  {
    level: 5,
    title: "Активный навык (прожимается вручную, КД 5 мин)",
    isActive: true,
    left: {
      name: "+100% к характеристикам героев на 60 сек",
      detail: "Выбирайте, если идёте в атаку на пещеру / трон на 23-й минуте.",
      pickFor: "cave",
    },
    right: {
      name: "+50% к скорости сбора с плиток на 60 сек",
      detail: "Лучший выбор для максимального фарма кристаллов — прожимайте во время волн сбора!",
      pickFor: "strong",
    },
    tip: "Не нажимайте впустую: активируйте перед важным сбором или боем (перезарядка 5 минут).",
  },
];

const TIMELINE_EVENTS = [
  {
    time: "00:00 – 02:00",
    title: "Подготовка и оценка карты",
    desc: "Не прыгайте вслепую в центр! Оцените позицию: 1) плитки 2–3 ур. рядом, 2) есть крысы, 3) мало топов, 4) короткий бег отрядам, 5) есть место для манёвра.",
    badge: "СТАРТ",
    tone: "bg-sky-50 border-sky-200 text-sky-900",
  },
  {
    time: "02:00 – 09:30",
    title: "Охота на крыс → быстрый 3-й навык",
    desc: "Крысы дают опыт для навыков (чем выше уровень крысы — тем больше опыта). Отправьте 1 отряд на сбор, а 1–3 на крыс, чтобы как можно быстрее открыть 3-й навык.",
    badge: "РАЗГОН",
    tone: "bg-amber-50 border-amber-200 text-amber-950",
  },
  {
    time: "10:00 – 12:00",
    title: "1-я волна мгновенных кристаллов",
    desc: "На 10, 11 и 12-й минутах появляются мгновенные точки! Держите отряды поближе или временно снимите отряд с обычной плитки ради быстрого прироста очков.",
    badge: "ВАЖНО",
    tone: "bg-purple-50 border-purple-300 text-purple-950",
  },
  {
    time: "13:00 – 19:30",
    title: "Минутный ритм и бесплатный ТП",
    desc: "Отряды не простаивают. Захватывайте слабую/свободную плитку раз в 60 сек (+5000) и собирайте рассыпанные кристаллы. Бесплатный ТП откатывается раз в 6 минут.",
    badge: "ТЕМП",
    tone: "bg-slate-50 border-slate-200 text-slate-900",
  },
  {
    time: "20:00 – 22:00",
    title: "2-я волна мгновенных кристаллов",
    desc: "Снова волны мгновенных кристаллов на 20, 21 и 22-й минутах — не отправляйте походы далеко от базы перед этой минутой!",
    badge: "ВАЖНО",
    tone: "bg-purple-50 border-purple-300 text-purple-950",
  },
  {
    time: "23:00 – 30:00",
    title: "Трон / Пещера (7 мин) и возврат домой",
    desc: "Открывается битва за Трон (идёт 7 минут). Пока топы воюют в центре, обычные игроки спокойно дофармливают. Перед 30:00 верните все отряды в замок!",
    badge: "ФИНАЛ",
    tone: "bg-rose-50 border-rose-300 text-rose-950",
  },
];

const ROUTE_STEPS = [
  {
    title: "Позиция на старте",
    subtitle: "Плитки III ур. (или II для F2P) у 2–3 крыс",
    icon: Gem,
    tone: "bg-sky-100 text-sky-700 border-sky-200",
  },
  {
    title: "1 отряд → Крысы / Игроки",
    subtitle: "Опыт на навыки + рассыпанные кристаллы",
    icon: Swords,
    tone: "bg-rose-100 text-rose-700 border-rose-200",
  },
  {
    title: "Остальные → Добыча кристаллов",
    subtitle: "Без простоя; на 10–12 и 20–22 мин на мгновенные",
    icon: Pickaxe,
    tone: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    title: "3-й навык (Лево: +5000)",
    subtitle: "Право/Лево → Право → Лево → Лево → Право/Лево",
    icon: BookOpen,
    tone: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  {
    title: "Захват плитки каждые 60 сек",
    subtitle: "Строго 1 раз в минуту (+5000) + Трон на 23-й мин",
    icon: Timer,
    tone: "bg-purple-100 text-purple-700 border-purple-200",
  },
  {
    title: "350K–450K+ кристаллов",
    subtitle: "До конца вернуть все отряды в замок!",
    icon: Star,
    tone: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
];

export const CrystalValleyGuide: React.FC = () => {
  const [copiedMail, setCopiedMail] = useState(false);
  const [copiedChat, setCopiedChat] = useState(false);
  const [playStyle, setPlayStyle] = useState<PlayStyle>("f2p");

  const handleCopyMail = () => {
    navigator.clipboard.writeText(FULL_CRYSTAL_VALLEY_MAIL);
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 2500);
  };

  const handleCopyChat = () => {
    navigator.clipboard.writeText(SHORT_CRYSTAL_VALLEY_CHAT);
    setCopiedChat(true);
    setTimeout(() => setCopiedChat(false), 2500);
  };

  return (
    <div id="crystal-valley-guide-container" className="space-y-6">
      {/* Top Hero Header */}
      <div className="rounded-2xl bg-white border border-sky-200 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-sky-50 via-white to-indigo-50/70 border-b border-sky-200/80 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-sky-600 text-white shadow-sm flex-shrink-0">
                <Gem className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-900 border border-sky-300">
                    СОБЫТИЕ • 30 МИН + 2 МИН ПОДГОТОВКИ
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                    ОСНОВНАЯ АРМИЯ НЕ ТЕРЯЕТСЯ
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                    Индивидуальный зачёт
                  </span>
                </div>
                <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
                  Гайд по Долине кристальных скоплений
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
                  Удобная пошаговая шпаргалка: выбор тактики под силу аккаунта, расписание по минутам (0–30 мин), сравнение ветки навыков Лево/Право и правила без лишних потерь.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:flex sm:items-center gap-2 shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={handleCopyMail}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 sm:py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                {copiedMail ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Гайд скопирован!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Скопировать для почты</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyChat}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 sm:py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 transition-colors shadow-2xs cursor-pointer"
              >
                {copiedChat ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">В чат скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Коротко в чат</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Key Numbers Quick Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-slate-50/70">
          <div className="p-3.5 sm:p-4 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                Основная армия цела
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Бои только за плитки (города не атакуются). Лечение — за ускорения лечения/универсальные.
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                Мгновенные кристаллы
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                На <strong>10, 11, 12</strong> и <strong>20, 21, 22</strong> минутах! Трон — на 23-й минуте (идёт 7 мин).
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700 border border-rose-200 flex-shrink-0">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                Захват раз в 60 секунд
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                3-й левый навык даёт <strong>+5000</strong> за захват плитки (откат 1 минута).
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700 border border-amber-200 flex-shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                350K–450K+ кристаллов
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                3 отряда ≈ 350K+, 4 отряда ≈ 450K+ (и до конца вернуть отряды в замок!).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION A: Interactive Playstyle Selector (F2P / Medium vs Strong / Max) */}
      <div className="rounded-2xl bg-white border-2 border-sky-300 p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
          <div>
            <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-200">
              ШАГ 1 • ВЫБЕРИТЕ СВОЙ ПЛАН НА ИГРУ
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
              Тактика зависит от силы вашего аккаунта
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setPlayStyle("f2p")}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                playStyle === "f2p"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-white/70"
              }`}
            >
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>Обычный / F2P</span>
            </button>
            <button
              type="button"
              onClick={() => setPlayStyle("strong")}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                playStyle === "strong"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-white/70"
              }`}
            >
              <Swords className="w-3.5 h-3.5 shrink-0" />
              <span>Сильный (350K–450K+)</span>
            </button>
          </div>
        </div>

        {playStyle === "f2p" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
              <div className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Куда вставать (0–2 мин)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Не прыгайте к центру и трону!</strong> Выберите спокойное место рядом с{" "}
                <strong>плитками II уровня</strong> и крысами, где нет сильных конкурентов.
                Стабильный фарм 30 минут на 2 уровне даёт больше очков, чем постоянные выбивания с 3-го.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 space-y-1.5">
              <div className="text-xs font-extrabold text-sky-950 flex items-center gap-1.5">
                <Pickaxe className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Отряды и навыки</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>1 отряд</strong> ставьте на плитку, остальные <strong>2–3 отправляйте на крыс</strong> для быстрых навыков.
                Если крыс мало — на 1 ур. берите <strong>Лево (1080 пассивно)</strong>, далее:{" "}
                <strong>Право → Лево → Лево → Право</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
              <div className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Главный фокус</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Ловите <strong>мгновенные кристаллы</strong> на 10–12 и 20–22 мин, подбирайте <strong>рассыпанные кристаллы</strong> возле чужих боёв. На 23-й мин, пока топы дерутся в центре за трон, спокойно фармите!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1.5">
              <div className="text-xs font-extrabold text-rose-950 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Куда вставать (0–2 мин)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Сразу телепортируйтесь ближе к центру — строго к{" "}
                <strong>шахтам III уровня</strong>, возле которых есть минимум{" "}
                <strong>2–3 крысы</strong>. На шахты 1–2 уровня время не тратьте.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
              <div className="text-xs font-extrabold text-indigo-950 flex items-center gap-1.5">
                <Swords className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Отряды и навыки</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>1-й отряд</strong> постоянно атакует крыс и выбивает игроков (строго 1 захват в 60 сек после 3-го навыка!),{" "}
                <strong>остальные</strong> копают III ур. Схема: <strong>Право → Право → Лево → Лево → Право</strong>{" "}
                <em>(или Лево под атаку на пещеру/трон)</em>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
              <div className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Результат и финал</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>3 отряда ≈ 350 000+</strong>, <strong>4 отряда ≈ 450 000+ кристаллов</strong>. Не пропускайте волны мгновенных кристаллов (10–12, 20–22 мин). Перед концом события верните все отряды в замок!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SECTION B: Visual Minute-by-Minute Timeline */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3.5">
        <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-extrabold uppercase text-purple-700 block">
              КАК ДЕЙСТВОВАТЬ ВО ВРЕМЯ ЗАБЕГА
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Хронология 30 минут: шпаргалка по минутам
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TIMELINE_EVENTS.map((ev) => (
            <div
              key={ev.time}
              className={`p-3.5 rounded-xl border ${ev.tone} space-y-1.5`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-extrabold text-xs px-2 py-0.5 rounded bg-white/90 border border-current/20">
                  ⏱️ {ev.time}
                </span>
                <span className="text-[10px] font-mono font-extrabold uppercase opacity-80">
                  {ev.badge}
                </span>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                {ev.title}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {ev.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION C: Main Layout — Skills Comparison Table & Core Mechanics + Route */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        <div className="lg:col-span-2 space-y-5">
          {/* 5-Level Skill Branch Visual Table (Left vs Right) */}
          <div className="rounded-2xl bg-white border-2 border-indigo-300 p-4 sm:p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap border-b border-indigo-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-600 text-white flex-shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-extrabold uppercase text-indigo-700 block">
                    РАБОТАЮТ ТОЛЬКО ВНУТРИ СОБЫТИЯ (СБРАСЫВАЮТСЯ ПОСЛЕ)
                  </span>
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                    Ветка 5 навыков: что выбрать — Лево или Право
                  </h2>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                Ур. 1–4 пассивные • Ур. 5 активный (КД 5 мин)
              </span>
            </div>

            <div className="space-y-3">
              {SKILL_BRANCH_PAIRS.map((pair) => (
                <div
                  key={pair.level}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white text-[11px] font-mono font-extrabold">
                        УРОВЕНЬ {pair.level}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                        {pair.title}
                      </span>
                    </div>
                    {pair.isActive && (
                      <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">
                        НАЖИМАТЬ ВРУЧНУЮ (КД 5 МИН)
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* LEFT OPTION */}
                    <div
                      className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                        pair.left.pickFor
                          ? "bg-emerald-50/90 border-emerald-300"
                          : "bg-white border-slate-200 opacity-85"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5 flex-wrap">
                        <span className="font-mono font-extrabold text-[11px] text-rose-700">
                          ⬅️ ЛЕВО
                        </span>
                        {pair.left.pickFor === "all" && (
                          <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                            ★ РЕКОМЕНДУЕМ
                          </span>
                        )}
                        {pair.left.pickFor === "f2p" && (
                          <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                            ЕСЛИ МАЛО КРЫС / F2P
                          </span>
                        )}
                        {pair.left.pickFor === "cave" && (
                          <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300">
                            ЕСЛИ БЬЁТЕ ПЕЩЕРУ / ТРОН
                          </span>
                        )}
                      </div>
                      <div className="font-extrabold text-slate-900">
                        {pair.left.name}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {pair.left.detail}
                      </p>
                    </div>

                    {/* RIGHT OPTION */}
                    <div
                      className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                        pair.right.pickFor
                          ? "bg-sky-50/90 border-sky-300"
                          : "bg-white border-slate-200 opacity-85"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5 flex-wrap">
                        <span className="font-mono font-extrabold text-[11px] text-sky-700">
                          ➡️ ПРАВО
                        </span>
                        {pair.right.pickFor === "all" && (
                          <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-sky-600 text-white">
                            ★ РЕКОМЕНДУЕМ
                          </span>
                        )}
                        {pair.right.pickFor === "strong" && (
                          <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-300">
                            ★ ТОП ПОД ФАРМ / КРЫС
                          </span>
                        )}
                      </div>
                      <div className="font-extrabold text-slate-900">
                        {pair.right.name}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        {pair.right.detail}
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] text-amber-900 bg-amber-50/80 border border-amber-200/80 rounded-lg px-2.5 py-1.5">
                    💡 {pair.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mechanics Cards: Teleports, PvP + Scattered Crystals, Troops + Healing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Teleports */}
            <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-sky-800 font-extrabold text-sm">
                <Zap className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Телепорты: бесплатный КД и цена из сумки</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <li>
                  • <strong>Бесплатный телепорт</strong> обновляется <strong>каждые 6 минут</strong>. Перемещайтесь им, если вокруг пропали крысы или пришли топы.
                </li>
                <li>
                  • <strong>Платный ТП (без ожидания отката)</strong> тратит предмет{" "}
                  <strong>«Прямое перемещение» из сумки</strong>: 1-й прыжок = 1 шт., 2-й = 2 шт., 3-й = 3 шт., 4-й = 4 шт., 5-й и далее ={" "}
                  <strong>по 5 шт.</strong>
                </li>
                <li>
                  • Не прыгайте просто «на удачу» — пока вы прыгаете, другие уже копают кристаллы.
                </li>
              </ul>
            </div>

            {/* PvP + Scattered Crystals */}
            <div className="rounded-2xl bg-white border border-rose-200 p-4 sm:p-5 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm">
                <Swords className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Смысл PvP, рассыпанные кристаллы и минутный ритм</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <li>
                  • <strong>За убийство солдат очки НЕ дают!</strong> И на города нападать нельзя.
                </li>
                <li>
                  • Зачем атаковать: выбить игрока ради <strong>+5000 от 3-го навыка</strong> (работает ровно <strong>1 раз в 60 секунд</strong>), занять плитку и подобрать <strong>рассыпанные кристаллы</strong> (можно собирать и просто возле чужих боёв!).
                </li>
                <li>
                  • Если на вас напали или плитку не удержать — не упирайтесь, сразу меняйте точку!
                </li>
              </ul>
            </div>

            {/* Troops & Healing */}
            <div className="rounded-2xl bg-white border border-emerald-200 p-4 sm:p-5 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Армия, тир войск и лечение</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                <li>
                  • Число войск в походе зависит от <strong>вместимости казарм</strong>, а тир солдат — максимальный из открытых вами.
                </li>
                <li>
                  • <strong>Потери внутри Долины не ломают вашу основную армию!</strong>
                </li>
                <li>
                  • <strong className="text-amber-800">Осторожно с лечением:</strong> лечить войска можно только за <strong>ускорения лечения или универсальные ускорения</strong> — не сливайте их в лишних драках.
                </li>
              </ul>
            </div>

            {/* Result & Return to Castle */}
            <div className="rounded-2xl bg-white border-2 border-emerald-300 p-4 sm:p-5 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                <span>Итоговый результат и важное правило финала</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                  <span className="font-bold text-slate-800">3 отряда (по тактике)</span>
                  <span className="font-mono font-extrabold text-emerald-900">≈ 350 000+ кристаллов</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-300 text-xs">
                  <span className="font-bold text-slate-900">4 отряда (по тактике)</span>
                  <span className="font-mono font-extrabold text-emerald-900">≈ 450 000+ кристаллов</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-950 text-xs flex items-start gap-2">
                <Home className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Обязательно:</strong> до окончания события{" "}
                  <strong className="underline">верните все отряды в замок!</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Route Scheme + Common Mistakes */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-white border-2 border-slate-300 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
              <div className="p-2 rounded-xl bg-slate-900 text-amber-400 flex-shrink-0">
                <Route className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase text-slate-500 block">
                  ШПАРГАЛКА ПО ШАГАМ
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Схема маршрута
                </h2>
              </div>
            </div>

            <div className="flex flex-col items-stretch">
              {ROUTE_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.title}>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl border flex-shrink-0 ${step.tone}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                          {step.title}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          {step.subtitle}
                        </div>
                      </div>
                    </div>
                    {index < ROUTE_STEPS.length - 1 && (
                      <div className="flex justify-center py-1 text-slate-400">
                        <ArrowDown className="w-4 h-4" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Where Points Are Lost */}
          <div className="rounded-2xl bg-rose-50/70 border border-rose-200 p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 text-rose-900 font-extrabold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Где чаще всего теряются очки:</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
              <li>• Слишком долгий выбор места на старте или прыжок в центр к китам без шансов удержаться.</li>
              <li>• Отправка отряда к далёкой крысе (долго идёт, а её уже забрали).</li>
              <li>• Отряды простаивают на базе или копают шахты 1 уровня.</li>
              <li>• Пропуск мгновенных кристаллов на <strong>10–12</strong> и <strong>20–22</strong> минутах.</li>
              <li>• Упорство на спорной плитке, откуда постоянно выбивают (простой + слив ускорений лечения).</li>
              <li>• Бессмысленная трата предметов «Прямое перемещение» из сумки (цена растёт: 1→2→3→4→5 шт. за прыжок).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
