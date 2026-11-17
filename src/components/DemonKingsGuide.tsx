import React, { useState } from "react";
import {
  Crown,
  Swords,
  Crosshair,
  Wand2,
  ShieldOff,
  Sparkles,
  ScrollText,
  Trophy,
  AlertTriangle,
  Copy,
  Check,
  CheckCircle2,
  RotateCcw,
  Zap,
  Feather,
  Castle,
  FlaskConical,
  Flag,
  Target,
  Info,
  Repeat,
  ShieldPlus,
} from "lucide-react";

type BossId = "warrior" | "ranger" | "mage";

interface BossConfig {
  id: BossId;
  name: string;
  counterFaction: string;
  avoidFaction: string;
  accentBg: string;
  accentBorder: string;
  accentBadge: string;
  accentText: string;
  rewards: string[];
  bestSquad: {
    heroes: string[];
    gearPriority: string;
    roles: { hero: string; note: string }[];
  };
  backupSquad: {
    formula: string;
    notes: string;
  };
  epigraphTip: string;
  redSwordTip: string;
}

const DEMON_KINGS: Record<BossId, BossConfig> = {
  warrior: {
    id: "warrior",
    name: "Король-воин",
    counterFaction: "Рейнджеры (+50% урона)",
    avoidFaction: "Колдуны (невыгодная встреча) — избегайте без крайней необходимости",
    accentBg: "bg-emerald-50/70",
    accentBorder: "border-emerald-300",
    accentBadge: "bg-emerald-100 text-emerald-900 border-emerald-300",
    accentText: "text-emerald-800",
    rewards: [
      "Красные чертежи для 5-звёздочного снаряжения героев (главный приз!)",
      "Контрольные точки урона + 3 ежедневные награды за первые 3 удара",
    ],
    bestSquad: {
      heroes: ["Синтия", "Красная Леди", "Белл", "Харпер", "Эш"],
      gearPriority:
        "При равной прокачке лучшие атакующие вещи сначала отдаём Синтии (особенно сильно раскрывается после пробуждения), затем Красной Леди.",
      roles: [
        { hero: "Синтия", note: "Главный ДД №1 (рейнджер)" },
        { hero: "Красная Леди", note: "Главный ДД №2 (рейнджер)" },
        { hero: "Белл", note: "Усиливает героев с самой высокой атакой + помогает рейнджерам" },
        { hero: "Харпер", note: "Универсальный бонус атаки союзникам" },
        { hero: "Эш", note: "4-й навык «Фокус» — усиливает рейнджеров в PvE" },
      ],
    },
    backupSquad: {
      formula: "Марлена + Зоя + Клэр + Харпер + Белл",
      notes:
        "Если рейнджеры ещё слабы, можно бить Марленой и Зоей (бьют без штрафа). Важная ловушка: Эш в этом случае убираем — её бафф не работает на воинов — и ставим Клэр! Также можно тестировать Шэдоу (снижение защиты), а на раннем аккаунте — Артура или Селию.",
    },
    epigraphTip: "Правый и верхний эпиграфы Ворона ставим строго под Рейнджеров.",
    redSwordTip:
      "Красный меч с бонусом +10% по контрфракции обязательно надеваем на Синтию (а не оставляем на Марлене, иначе бонус +10% не сработает!).",
  },
  ranger: {
    id: "ranger",
    name: "Король-рейнджер",
    counterFaction: "Колдуны (+50% урона)",
    avoidFaction: "Воины — самая невыгодная фракционная встреча!",
    accentBg: "bg-sky-50/70",
    accentBorder: "border-sky-300",
    accentBadge: "bg-sky-100 text-sky-900 border-sky-300",
    accentText: "text-sky-800",
    rewards: [
      "Билеты призыва героев",
      "Универсальные фрагменты героев и медали навыков",
    ],
    bestSquad: {
      heroes: ["Анни", "Джокер", "Николь", "Белл", "Стеллар"],
      gearPriority:
        "При сопоставимой прокачке лучшие атакующие вещи в первую очередь отдаём Анни, затем Джокеру. Обязательно протестируйте замену Белл на Билли — на части аккаунтов Билли даёт больше урона!",
      roles: [
        { hero: "Анни", note: "Главный ДД №1 (колдун)" },
        { hero: "Джокер", note: "Главный ДД №2 (колдун)" },
        { hero: "Николь", note: "Усиливает колдунов и добавляет собственный урон" },
        { hero: "Белл / Билли", note: "Универсальный разгон атаки (проверьте тестом: Белл или Билли)" },
        { hero: "Стеллар", note: "3-й навык «Звезда желаний» + дебафф на входящий урон по боссу" },
      ],
    },
    backupSquad: {
      formula: "Синтия + Красная Леди + Эш + Харпер + Белл",
      notes:
        "Если колдуны пока слабые, временно берите сильных Синтию и Красную Леди. Но тогда Николь и Стеллар теряют смысл — их обязательно меняем на Эш, Харпера или Белл. Воинов сюда брать не стоит.",
    },
    epigraphTip: "Правый и верхний эпиграфы Ворона ставим строго под Колдунов.",
    redSwordTip:
      "Красный меч (+10% по контрфракции) переставляем на главного ДД-колдуна (Анни или Джокера).",
  },
  mage: {
    id: "mage",
    name: "Король-колдун",
    counterFaction: "Воины (+50% урона)",
    avoidFaction: "Рейнджеры — невыгодный фракционный матчап!",
    accentBg: "bg-rose-50/70",
    accentBorder: "border-rose-300",
    accentBadge: "bg-rose-100 text-rose-900 border-rose-300",
    accentText: "text-rose-800",
    rewards: [
      "Отлично подходит для пополнения запасов ресурсов",
      "Ежедневные призы за первые 3 атаки и шкала контрольных точек",
    ],
    bestSquad: {
      heroes: ["Марлена", "Зоя", "Харпер", "Белл", "Клэр"],
      gearPriority:
        "Лучшее атакующее снаряжение сначала отдаём Марлене, затем Зое. Харпер в этом составе особенно полезен, так как отлично сочетается с воинами.",
      roles: [
        { hero: "Марлена", note: "Главный ДД №1 (воин)" },
        { hero: "Зоя", note: "Главный ДД №2 (воин)" },
        { hero: "Харпер", note: "Синергия с воинами + бонус атаки союзникам" },
        { hero: "Белл", note: "Навык «Вдохновение» на Марлену и Зою" },
        { hero: "Клэр", note: "4-й навык «Зов храбрых» — усиливает урон воинов по монстрам" },
      ],
    },
    backupSquad: {
      formula: "Анни + Джокер + Николь + Белл + Стеллар",
      notes:
        "Если Марлена и Зоя ещё слабы, можно бить Анни и Джокером, но тогда Клэр обязательно меняем на Стеллар (нет смысла баффать колдунов навыком воинов). Селия подойдёт как временный PvE-саппорт за бонус против монстров.",
    },
    epigraphTip: "Правый и верхний эпиграфы Ворона ставим строго под Воинов.",
    redSwordTip:
      "Красный меч (+10% по контрфракции) отдаём Марлене (или Зое), чтобы бонус работал против Короля-колдуна.",
  },
};

const PRE_ATTACK_CHECKLIST = [
  { id: "counter", text: "Правильная ли контрфракция? Это бесплатные +50% урона (Рейнджеры → Воин, Колдуны → Рейнджер, Воины → Колдун)." },
  { id: "dd", text: "Основные ДД действительно лучшие для этого Короля? Смотрим не только на БМ, но и на звёзды, пробуждение, навыки и вещи." },
  { id: "supports", text: "Саппорты усиливают именно этих ДД? (Эш → рейнджеры, Клэр → воины, Стеллар → колдуны)." },
  { id: "swords", text: "Лучшие красные мечи переставлены на нужных ДД? Проверяем бонус +10% по контрфракции." },
  { id: "gloves", text: "Не забыли ли фиолетовые PvE-перчатки против монстров? (Часто сильнее красных PvP-перчаток; после босса верните обратно!)." },
  { id: "epigraphs", text: "Правильные ли эпиграфы стоят на Вороне? Проверяем правый и верхний слоты под фракцию текущих ДД." },
  { id: "vip", text: "Активирован ли VIP-статус?" },
  { id: "frenzy", text: "Включено ли Боевое безумие? (Разведка на Святилище на карте мира)." },
  { id: "lord", text: "Работают ли атакующие флаги и усиления специализации Лорда?" },
  { id: "skin", text: "Выбран ли скин Святилища с «уроном по монстрам» («Город фантазий», «Крепость Вороны»)? Не перепутан ли бонус «при наличии» с «при экипировке»." },
  { id: "leadership", text: "Максимум ли лидерства? Проверяем уровень героев, статуи, выжившую Элейн, реликвии («Светоч эпохи») и технологии." },
  { id: "tier", text: "Отправляется ли в поход максимальный доступный тир войск?" },
  { id: "hall", text: "Проверены ли доступные фракционные бонусы в Зале чести?" },
];

const FULL_DEMON_KINGS_MAIL = `👑 КОРОЛИ ДЕМОНОВ: ПОЛНЫЙ ГАЙД ПО МАКСИМАЛЬНОМУ УРОНУ

⚔️ 1. КОНТРФРАКЦИИ (+50% УРОНА) И НАГРАДЫ:
• Король-воин (даёт красные чертежи 5★) ➔ бьём РЕЙНДЖЕРАМИ.
• Король-рейнджер (билеты, фрагменты, медали) ➔ бьём КОЛДУНАМИ.
• Король-колдун (ресурсы) ➔ бьём ВОИНАМИ.
• Первые 3 атаки в день дают ежедневные награды — бейте обязательно! Оставшиеся из 10 попыток используйте для тестов (меняйте за 1 удар только 1 деталь!). Урон идёт в зачёт Войны королевств.

🛡️ 2. ТАНКИ НЕ НУЖНЫ:
Король не бьёт в ответ! Лечение и защита не работают на урон — ставим 2 главных ДД + 3 саппорта.
• Против Воина: Синтия + Красная Леди + Белл + Харпер + Эш (или Марлена + Зоя + Клэр + Харпер + Белл).
• Против Рейнджера: Анни + Джокер + Николь + Белл (протестируйте Билли вместо Белл!) + Стеллар.
• Против Колдуна: Марлена + Зоя + Харпер + Белл + Клэр.
⚠️ Фиолетовая троица Клэр (Воины), Эш (Рейнджеры), Стеллар (Колдуны) обязательна под своих ДД! Порядок расстановки одной и той же пятёрки стабильного прироста не даёт (рекорды от перестановок — это просто криты).

🧤 3. ЭКИПИРОВКА, ВОРОН И ЛИДЕРСТВО:
• Фиолетовые PvE-перчатки 30 ур. (урон по монстрам) часто сильнее красных — не разбирайте их и не забудьте вернуть обычные перед PvP!
• Красные мечи (+10% по контрфракции) переставляйте на профильного ДД под конкретного босса.
• На Вороне важны ПРАВЫЙ и ВЕРХНИЙ эпиграфы под фракцию ДД (фиолетовый 5★ часто сильнее золотого до 4★).
• Лидерство (размер похода -> боевой дух -> урон): уровень Святилища, фракционные статуи, Элейн, «Светоч эпохи», технологии, Зал чести.

🔥 4. ЧЕК-ЛИСТ ПЕРЕД УДАРОМ:
VIP + Боевое безумие (разведка) + атакующие флаги Лорда + скин с уроном по монстрам («Город фантазий» / «Крепость Вороны») + максимальный тир войск!`;

const SHORT_DEMON_KINGS_CHAT = `👑 КОРОЛИ ДЕМОНОВ: Танки НЕ нужны (босс не бьёт)! +50% урона по контрфракции: Воина бьют Рейнджеры (Синтия+Красная Леди+Белл+Харпер+Эш), Рейнджера — Колдуны (Анни+Джокер+Николь+Белл/Билли+Стеллар), Колдуна — Воины (Марлена+Зоя+Харпер+Белл+Клэр). Перед ударом: VIP + Боевое безумие + флаги Лорда + скин на монстров + правый/верхний эпиграф под ДД + фиол PvE-перчатки и переставьте красный меч на главного ДД!`;

export const DemonKingsGuide: React.FC = () => {
  const [selectedBoss, setSelectedBoss] = useState<BossId>("warrior");
  const [copiedMail, setCopiedMail] = useState(false);
  const [copiedChat, setCopiedChat] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const boss = DEMON_KINGS[selectedBoss];
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyMail = () => {
    navigator.clipboard.writeText(FULL_DEMON_KINGS_MAIL);
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 2500);
  };

  const handleCopyChat = () => {
    navigator.clipboard.writeText(SHORT_DEMON_KINGS_CHAT);
    setCopiedChat(true);
    setTimeout(() => setCopiedChat(false), 2500);
  };

  return (
    <div id="demon-kings-guide" className="space-y-6">
      {/* Top Hero Header */}
      <div className="rounded-2xl bg-white border border-amber-300 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-amber-50 via-white to-rose-50/70 border-b border-amber-200/80 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-amber-600 text-white shadow-sm flex-shrink-0">
                <Crown className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                    ПОЛНЫЙ ГАЙД • КОРОЛИ ДЕМОНОВ
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-900 border border-rose-300">
                    +50% КОНТРФРАКЦИЯ • 10 ПОПЫТОК
                  </span>
                </div>
                <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
                  Короли демонов в Last Asylum: лучшие отряды и разгон урона
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Подробный разбор трёх боссов, мета-пятёрки и замены, почему танки и расстановка почти не влияют, а также фиолетовые PvE-перчатки, красные мечи, эпиграфы Ворона, лидерство и чек-лист перед ударом.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:flex sm:items-center gap-2 shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={handleCopyMail}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 sm:py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                {copiedMail ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Гайд скопирован!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Скопировать в почту</span>
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

        {/* Core Mechanics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-slate-50/70">
          <div className="p-3.5 sm:p-4 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700 border border-rose-200 flex-shrink-0">
              <ShieldOff className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                Танки и лечение не нужны
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                Король демонов <strong>не бьёт ваш отряд в ответ</strong>. Нужны только 2 сильных ДД и саппорты на урон!
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700 border border-amber-200 flex-shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                10 попыток + Война королевств
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                Первые <strong>3 атаки в день</strong> дают отдельные призы. Урон идёт в общий зачёт Войны королевств!
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200 flex-shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                Контрфракция = +50% урона
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                Рейнджеры бьют Воина, Колдуны — Рейнджера, Воины — Колдуна. Но слабый герой без звёзд не всегда выгоднее сильного ДД!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: Interactive 3 Demon Kings Selector & Optimal Squads */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
              ВЫБОР БОССА И СОСТАВА
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
              1. Три Короля демонов: награды, лучшие пятёрки и замены
            </h2>
          </div>

          {/* Tabs for 3 Bosses */}
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedBoss("warrior")}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedBoss === "warrior"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              <Swords className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Воин</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedBoss("ranger")}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedBoss === "ranger"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              <Crosshair className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Рейнджер</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedBoss("mage")}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedBoss === "mage"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Колдун</span>
            </button>
          </div>
        </div>

        {/* Active Boss Details Card */}
        <div className={`rounded-2xl border-2 p-4 sm:p-5 space-y-5 ${boss.accentBg} ${boss.accentBorder}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200/80 pb-3.5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {boss.name}
                </h3>
                <span className={`text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-md border ${boss.accentBadge}`}>
                  Бьют: {boss.counterFaction}
                </span>
              </div>
              <p className="text-xs text-rose-800 font-semibold mt-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Не брать: {boss.avoidFaction}</span>
              </p>
            </div>

            <div className="bg-white/90 border border-slate-200 rounded-xl p-2.5 sm:max-w-xs space-y-1">
              <div className="text-[10px] font-mono font-extrabold uppercase text-amber-800">
                Ценные награды:
              </div>
              {boss.rewards.map((r, i) => (
                <div key={i} className="text-[11px] text-slate-700 font-medium leading-snug">
                  • {r}
                </div>
              ))}
            </div>
          </div>

          {/* Best Squad Formula */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Лучший состав (пятёрка):
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
                {boss.bestSquad.heroes.join(" + ")}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {boss.bestSquad.roles.map((r, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      СЛОТ #{idx + 1}
                    </span>
                    <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {r.hero}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">
                    {r.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white/90 rounded-xl border border-slate-200 p-3 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Приоритет вещей:</strong> {boss.bestSquad.gearPriority}
              </div>
            </div>
          </div>

          {/* Backup Squad & Specific Gear/Epigraph Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
            <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-1.5">
              <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <Repeat className="w-4 h-4 text-indigo-600" />
                <span>Запасной состав и замены:</span>
              </div>
              <div className="text-xs font-bold text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 inline-block">
                {boss.backupSquad.formula}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {boss.backupSquad.notes}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-2">
              <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <Feather className="w-4 h-4 text-purple-600" />
                <span>Эпиграфы и красный меч под этого босса:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                • <strong>Ворон:</strong> {boss.epigraphTip}
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                • <strong>Красный меч (+10%):</strong> {boss.redSwordTip}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Key Supports & Skill Priorities + Formation Myth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Trio Claire, Ash, Stellar + Bella */}
        <div className="rounded-2xl bg-white border border-purple-200 p-5 shadow-xs space-y-4">
          <div className="flex items-start gap-3 border-b border-purple-100 pb-3.5">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 shrink-0">
              <ShieldPlus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200">
                КЛЭР • ЭШ • СТЕЛЛАР • БЕЛЛ
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                2. Недооценённые фиолетовые саппорты и порядок навыков
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Не меняйте <strong>Клэр, Эш и Стеллар</strong> автоматически на более редкого героя только из-за цвета рамки и БМ — их специализированный PvE-бафф против монстров даёт больше реального урона!
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200">
              <strong className="text-rose-950">Клэр (под Воинов):</strong> 4-й навык <strong>«Зов храбрых»</strong> — усиливает урон воинов по монстрам (Марлена + Зоя).
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <strong className="text-emerald-950">Эш (под Рейнджеров):</strong> 4-й навык <strong>«Фокус»</strong> — усиливает рейнджеров в PvE (Синтия + Красная Леди).
            </div>
            <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-200">
              <strong className="text-sky-950">Стеллар (под Колдунов):</strong> 3-й навык <strong>«Звезда желаний»</strong> + эффект получения боссом повышенного урона (достаточно открыть и качать звёзды).
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200">
              <strong className="text-purple-950">Белл (универсал):</strong> навык <strong>«Вдохновение»</strong> усиливает 2 главных ДД с самой высокой атакой.
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
            <strong>Порядок медалей:</strong> 1) Атакующие/высшие навыки главных ДД → 2) Ключевые PvE-навыки саппортов → 3) Всё остальное.
          </div>
        </div>

        {/* Formation Myth & 10 Attempts Testing */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start gap-3 border-b border-slate-100 pb-3.5">
              <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 border border-indigo-200 shrink-0">
                <Repeat className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-indigo-200">
                  ТЕСТЫ И РАССТАНОВКА
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                  3. Важна ли расстановка и как тратить 10 попыток
                </h2>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
              <p>
                • <strong>Порядок клеток почти не влияет:</strong> при одинаковом составе и вещах перестановка пятёрки по позициям не даёт стабильного прироста урона. Если после перестановки вылетел рекорд — это просто удачные криты!
              </p>
              <p>
                • <strong>Не тратьте 10 атак впустую:</strong> не бейте 10 раз одним и тем же составом. За одну попытку меняйте <strong>строго 1 вещь</strong>:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-200 font-semibold text-indigo-950">
                1. Белл ⇄ Билли (для колдунов)
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-200 font-semibold text-indigo-950">
                2. Перчатки (фиол PvE ⇄ красные)
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-200 font-semibold text-indigo-950">
                3. Правый эпиграф или саппорт
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
            💡 Так за несколько дней вы найдёте лучшую связку именно под прокачку вашего аккаунта, а не просто «картинку из гайда».
          </div>
        </div>
      </div>

      {/* SECTION 3: Gear Secrets & Raven Epigraphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl bg-white border border-amber-200 p-5 shadow-xs space-y-3.5">
          <div className="flex items-start gap-3 border-b border-amber-100 pb-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 border border-amber-200 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                ЭКИПИРОВКА • ПЕРЧАТКИ И МЕЧИ
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                4. Фиолетовые PvE-перчатки и перестановка красных мечей
              </h2>
            </div>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200">
              <strong className="text-purple-950">🧤 Фиолетовые перчатки 30 ур. лучше красных:</strong> Король демонов считается монстром, поэтому перчатки с бонусом <em>«урон по монстрам»</em> часто дают основному ДД больше урона, чем редкая красная экипировка. Держите 2 пары PvE-перчаток и <strong>не разбирайте старые фиолетовые вещи!</strong>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs font-medium">
              ⚠️ <strong>Не забудьте после Короля:</strong> верните обычные PvP-перчатки обратно, иначе проиграете бой на карте или арене!
            </div>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
              <strong className="text-amber-950">⚔️ Красные мечи (+10% по контрфракции):</strong> этот бонус работает ТОЛЬКО когда герой бьёт свою контрфракцию. Против Короля-воина обязательно переставьте красный меч на Синтию — на Марлене дополнительные +10% не сработают!
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-sky-200 p-5 shadow-xs space-y-3.5">
          <div className="flex items-start gap-3 border-b border-sky-100 pb-3">
            <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700 border border-sky-200 shrink-0">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-200">
                ВОРОН И ЭПИГРАФЫ
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                5. Какие эпиграфы ставить на Короля демонов
              </h2>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-sky-600 font-bold mt-0.5">•</span>
              <span>
                <strong>Важны только ПРАВЫЙ и ВЕРХНИЙ эпиграфы:</strong> защитные характеристики здесь бесполезны, так как босс вообще не атакует ваш отряд.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 font-bold mt-0.5">•</span>
              <span>
                <strong>Фиолетовый 5★ часто сильнее золотого:</strong> на правом слоте фиолетовый эпиграф 5★ даёт больше урона, чем золотой, пока золотой не прокачан хотя бы примерно до 4★. Сравнивайте реальные цифры!
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 font-bold mt-0.5">•</span>
              <span>
                <strong>Меняйте под фракцию ДД:</strong> подготовьте правые эпиграфы для всех трёх фракций и перед атакой проверяйте, что правый и верхний слоты стоят под текущую контрфракцию.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* SECTION 4: Leadership, Sanctuary Skins, Buffs & Hall of Honor */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
            СКРЫТЫЕ ИСТОЧНИКИ УРОНА
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
            6. Лидерство, тир войск, скины Святилища и баффы
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-extrabold text-slate-900 flex items-center gap-2">
              <Flag className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Лидерство и тир войск</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Выше <strong>тир войск</strong> → сильнее каждый боец. Выше <strong>лидерство</strong> → больше войск в походе → выше <strong>боевой дух</strong> и множитель урона!
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Откуда брать: уровень героев/Святилища, <strong>фракционные статуи</strong>, выжившая <strong>Элейн</strong> (даёт лидерство всем фракциям!), реликвия <strong>«Светоч эпохи»</strong>, технологии мастерства в лаборатории и фракционные бонусы <strong>Зала чести</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-extrabold text-slate-900 flex items-center gap-2">
              <Castle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Скины Святилища</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Ищите характеристику <strong>«урон по монстрам»</strong> — особенно выделяются <strong>«Город фантазий»</strong> и <strong>«Крепость Вороны»</strong>.
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Важный нюанс: бонус <em>«при наличии»</em> работает всегда после открытия, а бонус <em>«при экипировке»</em> — только у надетого сейчас скина!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-extrabold text-slate-900 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-rose-600 shrink-0" />
              <span>VIP, Безумие и Лорд</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Бесплатные проценты, о которых чаще всего забывают: активированный <strong>VIP</strong>, <strong>Боевое безумие</strong> (разведка на Святилище на мировой карте) и атакующие <strong>флаги / ветка Лорда</strong>!
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: Interactive 13-Point Pre-Attack Checklist */}
      <div className="rounded-2xl bg-white border-2 border-emerald-300 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-3.5">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200 shrink-0">
              <ScrollText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                ЧЕК-ЛИСТ ПЕРЕД АТАКОЙ
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                7. Проверь 13 мелочей перед тем, как бить на рекорд
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span
              className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border ${
                checkedCount === PRE_ATTACK_CHECKLIST.length
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-emerald-50 text-emerald-900 border-emerald-200"
              }`}
            >
              Готово: {checkedCount} / {PRE_ATTACK_CHECKLIST.length}
            </span>
            {checkedCount > 0 && (
              <button
                type="button"
                onClick={() => setCheckedItems({})}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer"
                title="Сбросить чек-лист"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {PRE_ATTACK_CHECKLIST.map((item, idx) => {
            const isDone = !!checkedItems[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleCheck(item.id)}
                className={`text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 cursor-pointer ${
                  isDone
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                    : "bg-slate-50/70 hover:bg-slate-100/80 border-slate-200 text-slate-800"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                    isDone
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "bg-white border-slate-300 text-slate-400"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
                  )}
                </div>
                <span className={`text-xs leading-relaxed ${isDone ? "line-through opacity-75" : "font-medium"}`}>
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Главный вывод:</strong> Король демонов наказывает не за слабый аккаунт, а за забытую мелочь — не тот красный меч, не тот эпиграф, выключенный VIP или PvP-перчатки вместо PvE.
          </span>
        </div>
      </div>
    </div>
  );
};
