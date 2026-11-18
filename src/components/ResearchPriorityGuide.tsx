import React, { useState } from "react";
import {
  Microscope,
  Hammer,
  Sprout,
  Trophy,
  Shield,
  Truck,
  Target,
  Copy,
  Check,
  AlertTriangle,
  Crown,
  ArrowRight,
  ArrowDown,
  FlaskConical,
  Route,
  ScrollText,
  Swords,
} from "lucide-react";

const FULL_RESEARCH_MAIL = `🔬 ПРИОРИТЕТЫ ИССЛЕДОВАНИЙ В ЛАБОРАТОРИИ (1–6)

⚡ ПО ВОЗМОЖНОСТИ:
• Вторая Лаборатория: добавляет параллельный слот исследований навсегда (х2 темп развития).

📌 1. РАЗВИТИЕ — ГЛАВНЫЙ ФУНДАМЕНТ:
Начинайте игру именно с этой ветки. Каждый процент ускорения здесь экономит дни и недели ожидания на поздних этапах игры.
• Мастер строительства и Ускорение исследований — приоритет №1 при каждом апе Лаборатории.
• Вместимость и Скорость тренировки — увеличивает лимит тренировки в казармах (это не размер отряда в бою) и ускоряет найм.
• Узел «Полное развитие» — критически важный узел для среднего и позднего этапов (снижение безвозвратных потерь в PvP / Fatality Rate).

🌱 2. ЭКОНОМИКА — БАЗА РЕСУРСОВ:
Ресурсов (особенно Травы и Зерна) всегда не хватает:
• Дополнительные слоты под Цветник (Трава) → Скорость сбора с плиток на карте.
• Внутреннее производство базы не в приоритете — сбор с плиток на карте даёт в разы больше ресурсов.
• Грузоподъёмность полезна для ферм и ночного сбора.

🏆 3. ДУЭЛЬ АЛЬЯНСОВ — ГЛАВНЫЙ ИСТОЧНИК НАГРАД:
Открывается на 10-м уровне Лаборатории, требует Свитки обучения и 15+ уровень здания для средних сундуков.
• Главная цель — узлы «Уровень супер-награды 1» (ящики 4–6) и «Уровень супер-награды 2» (ящики 7–9).
• Дополнительные очки и расширенные сундуки многократно окупают вложенные свитки за счёт ускорителей, алмазов и фрагментов.

⚔️ 4. СОЛДАТ И ОТРЯД 1 — ОСНОВА БОЕВОЙ МОЩИ:
Даёт универсальный прирост всей армии независимо от героев.
• Ветка «Солдат»: качаем Атаку, Защиту и HP («Загрузка солдата» берётся только как проходной узел).
• Ветка «Отряд 1»: закрываем в максимум (атака и размер отряда).
• Отряды 2–4: прокачиваем по остаточному принципу под сбор ресурсов.

🎖️ 5. ЭЛИТНЫЕ ВОЙСКА — ПУТЬ К Т10:
• Открывается на высоких уровнях Лаборатории и даёт главный скачок силы — войска 10-го уровня (Т10).
• Заблаговременное накопление сотен миллионов ресурсов и Свитков обучения обязательно задолго до финальных узлов ветки.

🚚 6. КАРАВАН — ПОЗДНЯЯ ИГРА:
• Прокачивается в перерывах между основными боевыми исследованиями или после закрытия базовых веток Солдат, Отряда 1 и Т10 (вместе с поздними ветками Тактики на 25+ ур. Лаборатории).

💡 СОВЕТ АЛЬЯНСА: перед запуском долгой технологии обязательно возьмите должность Министра Развития (+50% к скорости)!`;

const SHORT_RESEARCH_CHAT = `🔬 ПРИОРИТЕТ ИССЛЕДОВАНИЙ: 1) Развитие (Мастер строительства и Ускорение исследований №1 при каждом апе Лабы; Вместимость/Скорость тренировки = лимит казарм; «Полное развитие» = снижение потерь PvP / Fatality Rate) → 2) Экономика (доп. слоты Цветник (Трава) → Скорость сбора с плиток; внутреннее производство не в приоритете) → 3) Дуэль альянсов (с 10 ур. Лабы, Свитки обучения + 15+ ур. для средних сундуков; цель — Уровень супер-награды 1 [ящики 4–6] и 2 [ящики 7–9]) → 4) Солдат и Отряд 1 (универсальный рост армии: в «Солдат» Атака/Защита/HP, «Загрузка солдата» только как проходная; Отряд 1 в макс; Отряды 2–4 под сбор) → 5) Элитные войска Т10 (копим заранее сотни млн ресов и Свитки обучения) → 6) Караван (поздняя игра: в перерывах или после Солдат, Отряда 1 и Т10).`;

type StageFilter = "all" | "base" | "combat" | "late";

interface ResearchPriorityGuideProps {
  onOpenMinisters?: () => void;
}

const ROUTE_MILESTONES = [
  {
    step: 1,
    title: "Развитие",
    subtitle: "Мастер строительства, Ускорение, Полное развитие",
    icon: Hammer,
    tone: "bg-amber-100 text-amber-800 border-amber-200",
  },
  {
    step: 2,
    title: "Экономика",
    subtitle: "Цветник (Трава) → Скорость сбора с плиток",
    icon: Sprout,
    tone: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    step: 3,
    title: "Дуэль альянсов",
    subtitle: "Лаб. 10+ / 15+, Свитки обучения → ящики 4–6 и 7–9",
    icon: Trophy,
    tone: "bg-sky-100 text-sky-800 border-sky-200",
  },
  {
    step: 4,
    title: "Солдат и Отряд 1",
    subtitle: "Универсальный рост; Отряд 1 в макс, Отряды 2–4 сбор",
    icon: Shield,
    tone: "bg-rose-100 text-rose-800 border-rose-200",
  },
  {
    step: 5,
    title: "Элитные войска (Т10)",
    subtitle: "Заранее копим сотни млн ресурсов и Свитки обучения",
    icon: Target,
    tone: "bg-amber-100 text-amber-900 border-amber-300",
  },
  {
    step: 6,
    title: "Караван",
    subtitle: "В перерывах или после Солдат, Отряда 1 и Т10",
    icon: Truck,
    tone: "bg-slate-200 text-slate-800 border-slate-300",
  },
];

export const ResearchPriorityGuide: React.FC<ResearchPriorityGuideProps> = ({
  onOpenMinisters,
}) => {
  const [copiedMail, setCopiedMail] = useState(false);
  const [copiedChat, setCopiedChat] = useState(false);
  const [stageFilter, setStageFilter] = useState<StageFilter>("all");

  const handleCopyMail = () => {
    navigator.clipboard.writeText(FULL_RESEARCH_MAIL);
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 2500);
  };

  const handleCopyChat = () => {
    navigator.clipboard.writeText(SHORT_RESEARCH_CHAT);
    setCopiedChat(true);
    setTimeout(() => setCopiedChat(false), 2500);
  };

  const showBase = stageFilter === "all" || stageFilter === "base";
  const showCombat = stageFilter === "all" || stageFilter === "combat";
  const showLate = stageFilter === "all" || stageFilter === "late";

  return (
    <div id="research-priority-guide-container" className="space-y-6">
      {/* Top Hero Header */}
      <div className="rounded-2xl bg-white border border-sky-200 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-sky-50 via-white to-indigo-50/70 border-b border-sky-200/80 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-sky-600 text-white shadow-sm flex-shrink-0">
                <Microscope className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-900 border border-sky-300">
                    ЛАБОРАТОРИЯ • ПРИОРИТЕТЫ 1–6
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                    ОТ ФУНДАМЕНТА ДО Т10 И КАРАВАНА
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                    РЕСУРСЫ + СВИТКИ ОБУЧЕНИЯ
                  </span>
                </div>
                <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
                  Приоритет исследований в Лаборатории
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
                  Чёткий порядок прокачки: Развитие как фундамент, Цветник (Трава) и сбор в Экономике, супер-награды Дуэли альянсов, универсальная мощь Солдат и Отряда 1, подготовка к Т10 и Караван.
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

        {/* 4 Key Pillars Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-slate-50/70">
          <div className="p-3.5 sm:p-4 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700 border border-amber-200 flex-shrink-0">
              <Hammer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                1. Развитие → 2. Экономика
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Мастер строительства/Ускорение, потери PvP, Цветник (Трава) и сбор.
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-100 text-sky-700 border border-sky-200 flex-shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                3. Дуэль альянсов (Лаб. 10+ / 15+)
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Свитки обучения → «Уровень супер-награды 1» (4–6) и 2 (7–9).
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700 border border-rose-200 flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                4. Солдат и Отряд 1
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Универсальный прирост всей армии; Отряд 1 — макс, Отряды 2–4 — сбор.
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 flex-shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                5. Т10 → 6. Караван
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Заранее копим Свитки обучения на Т10; Караван — в перерывах или после базы.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-2xs">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-0.5 sm:pb-0">
          {[
            { id: "all", label: "Все ветки (1–6)" },
            { id: "base", label: "1–2: Развитие и Экономика" },
            { id: "combat", label: "3–4: Дуэль, Солдат и Отряд 1" },
            { id: "late", label: "5–6: Т10 и Караван" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStageFilter(tab.id as StageFilter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                stageFilter === tab.id
                  ? "bg-sky-600 text-white shadow-2xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-medium text-slate-500 shrink-0">
          Вторая Лаборатория удваивает темп прокачки
        </span>
      </div>

      {/* Main 2-Column Content: Left Steps (2 cols) + Right Summary Sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        <div className="lg:col-span-2 space-y-5">
          {/* Second Lab Note */}
          {showBase && (
            <div className="rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-sky-50 border border-indigo-200 p-4 flex items-start gap-3 shadow-2xs">
              <div className="p-2 rounded-xl bg-indigo-600 text-white flex-shrink-0">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-indigo-950">
                  Вторая Лаборатория (полезное раннее вложение):
                </strong>{" "}
                открывает второй постоянный слот исследований, позволяя параллельно закрывать экономику/развитие и боевые ветки.
              </div>
            </div>
          )}

          {/* STEPS 1 & 2: DEVELOPMENT & ECONOMY */}
          {showBase && (
            <div className="space-y-4">
              {/* STEP 1: Development */}
              <div className="rounded-2xl bg-white border-2 border-amber-300 p-5 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between gap-2 flex-wrap border-b border-amber-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-mono font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-extrabold uppercase text-amber-800 block">
                        ГЛАВНЫЙ ФУНДАМЕНТ
                      </span>
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                        Развитие
                      </h2>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                    НАЧИНАЙТЕ ИГРУ С ЭТОЙ ВЕТКИ
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Начинайте игру именно с этой ветки. Каждый процент ускорения здесь экономит дни и недели ожидания на поздних этапах игры.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                    <div className="font-extrabold text-slate-900">
                      1. Мастер строительства и Ускорение исследований
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Приоритет №1</strong> при каждом апе Лаборатории. Экономит максимум времени на всей дистанции.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                    <div className="font-extrabold text-slate-900">
                      2. Вместимость и Скорость тренировки
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Увеличивает <strong>лимит казарм</strong> на один найм (это не размер отряда в бою) и ускоряет обучение войск.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1">
                    <div className="font-extrabold text-rose-950">
                      3. Узел «Полное развитие»
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Снижает безвозвратные потери солдат в PvP (<strong>Fatality Rate</strong>) — критически важен для сохранения армии в среднем и позднем этапах.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 2: Economy */}
              <div className="rounded-2xl bg-white border-2 border-emerald-300 p-5 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between gap-2 flex-wrap border-b border-emerald-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-mono font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-extrabold uppercase text-emerald-800 block">
                        БАЗА РЕСУРСОВ
                      </span>
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                        Экономика
                      </h2>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                    ЦВЕТНИК (ТРАВА) + СБОР С ПЛИТОК
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                    <div className="font-extrabold text-emerald-950">
                      1. Дополнительные слоты под Цветник (Трава)
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Трава всегда в дефиците — в первую очередь открывайте все доступные слоты под <strong>Цветник (Трава)</strong> внутри базы.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                    <div className="font-extrabold text-emerald-950">
                      2. Скорость сбора с плиток на карте
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Качайте сразу после слотов Цветника: сбор ресурсов <strong>с плиток на карте</strong> даёт в разы больше добычи, а <strong>внутреннее производство базы не в приоритете</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEPS 3, 4 & 5: ALLIANCE DUEL, SOLDIERS+SQUAD 1, HEROES */}
          {showCombat && (
            <div className="space-y-4">
              {/* STEP 3: Alliance Duel */}
              <div className="rounded-2xl bg-white border-2 border-sky-300 p-5 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between gap-2 flex-wrap border-b border-sky-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-sky-600 text-white font-mono font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-extrabold uppercase text-sky-800 block">
                        ГЛАВНЫЙ ИСТОЧНИК НАГРАД
                      </span>
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                        Дуэль альянсов
                      </h2>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-300">
                    ЛАБ. 10+ • 15+ ДЛЯ СРЕДНИХ СУНДУКОВ
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Открывается на <strong>10-м уровне Лаборатории</strong>, требует <strong>Свитки обучения</strong> и <strong>15+ уровень здания</strong> для средних сундуков.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200 space-y-1">
                    <div className="font-extrabold text-sky-950 flex items-center gap-1.5 text-xs">
                      <Target className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>Главная цель в ветке</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Как можно быстрее открыть узлы{" "}
                      <strong>«Уровень супер-награды 1»</strong> (ящики <strong>4–6</strong>) и{" "}
                      <strong>«Уровень супер-награды 2»</strong> (ящики <strong>7–9</strong>).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                    <div className="font-extrabold text-emerald-950 flex items-center gap-1.5 text-xs">
                      <ScrollText className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Окупаемость Свитков обучения</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Дополнительные очки в Дуэли и расширенные сундуки многократно окупают вложенные свитки за счёт ускорителей, алмазов и фрагментов.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 4: Soldiers & Squad 1 */}
              <div className="rounded-2xl bg-white border-2 border-rose-300 p-5 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between gap-2 flex-wrap border-b border-rose-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-600 text-white font-mono font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-extrabold uppercase text-rose-800 block">
                        ОСНОВА БОЕВОЙ МОЩИ
                      </span>
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                        Солдат и Отряд 1
                      </h2>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300">
                    ПРИРОСТ ВСЕЙ АРМИИ
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200 text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                  Даёт <strong>универсальный прирост всей армии</strong> независимо от героев, которых вы поставите в строй.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Ветка «Солдат»</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Качаем <strong>Атаку, Защиту и HP</strong>. Узел{" "}
                      <strong>«Загрузка солдата»</strong> берётся только как проходной узел.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Swords className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Ветка «Отряд 1»</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Закрываем <strong>в максимум</strong> — ключевой упор на{" "}
                      <strong>атаку и размер отряда</strong> основного боевого похода.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-slate-600 shrink-0" />
                      <span>Отряды 2–4</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Прокачиваем <strong>по остаточному принципу</strong> — достаточно под сбор ресурсов с плиток.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEPS 5 & 6: ELITE TROOPS (T10) & CARAVAN */}
          {showLate && (
            <div className="space-y-4">
              {/* STEP 5: Elite Troops (T10) */}
              <div className="rounded-2xl bg-white border-2 border-amber-400 p-5 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between gap-2 flex-wrap border-b border-amber-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-mono font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                      5
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-extrabold uppercase text-amber-800 block">
                        ПУТЬ К Т10
                      </span>
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                        Элитные войска (Т10)
                      </h2>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-300">
                    ВОЙСКА 10-ГО УРОВНЯ
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Главная цель ветки — открытие войск <strong>10-го уровня (Т10)</strong>, дающих ключевой боевой скачок на позднем этапе.
                </p>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5 leading-relaxed">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Заблаговременная подготовка:</strong> для открытия Т10 требуется заранее копить <strong>сотни миллионов ресурсов</strong> и большой запас <strong>Свитков обучения</strong> задолго до финальных узлов ветки.
                  </span>
                </div>
              </div>

              {/* STEP 6: Caravan */}
              <div className="rounded-2xl bg-white border-2 border-slate-300 p-5 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between gap-2 flex-wrap border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 text-white font-mono font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                      6
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-extrabold uppercase text-slate-500 block">
                        ПОЗДНЯЯ ИГРА
                      </span>
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                        Караван
                      </h2>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
                    СРЕДНИЙ ПРИОРИТЕТ / ПОСЛЕ Т10
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Прокачивается <strong>в перерывах между основными боевыми исследованиями</strong> или уже{" "}
                  <strong>после закрытия базовых веток Солдат, Отряда 1 и Т10</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Final Priority Route 1-6 */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-white border-2 border-slate-300 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
              <div className="p-2 rounded-xl bg-slate-900 text-amber-400 flex-shrink-0">
                <Route className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase text-slate-500 block">
                  ОЧЕРЁДНОСТЬ ПО ШАГАМ
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Порядок приоритетов
                </h2>
              </div>
            </div>

            <div className="flex flex-col items-stretch">
              {ROUTE_MILESTONES.map((item, index) => {
                const Icon = item.icon;
                return (
                  <React.Fragment key={item.title}>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl border flex-shrink-0 ${item.tone}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                          {item.step}. {item.title}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    {index < ROUTE_MILESTONES.length - 1 && (
                      <div className="flex justify-center py-1 text-slate-400">
                        <ArrowDown className="w-4 h-4" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Alliance Synergy Reminder (Minister + Wednesday Duel) */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-50 via-white to-sky-50 border border-amber-300 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-200 text-amber-700 flex-shrink-0">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">
              Совет альянса: Министр Развития (+50%)
            </h4>
            <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
              Перед запуском долгой технологии обязательно возьмите должность{" "}
              <strong>Министра Развития (+50% к скорости)</strong>
            </p>
          </div>
        </div>
        {onOpenMinisters && (
          <button
            type="button"
            onClick={onOpenMinisters}
            className="w-full sm:w-auto justify-center px-4 py-2.5 sm:py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
          >
            <span>Гайд по Министрам</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
