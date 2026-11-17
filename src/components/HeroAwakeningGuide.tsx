import React, { useState } from "react";
import {
  Flame,
  Sparkles,
  Swords,
  Crosshair,
  Wand2,
  Calendar,
  AlertTriangle,
  Copy,
  Check,
  Info,
  ShoppingBag,
  ShieldPlus,
  Zap,
  Layers,
  Clock,
} from "lucide-react";

type AwakenedHeroId = "marlena" | "cynthia" | "annie";

interface AwakeningStage {
  level: number;
  title: string;
  effect: string;
}

interface AwakenedHeroConfig {
  id: AwakenedHeroId;
  name: string;
  faction: string;
  windowDays: string;
  mechanicName: string;
  accentBg: string;
  accentBorder: string;
  accentBadge: string;
  summary: string;
  synergyRule: string;
  squadAdvice: string;
  stages: AwakeningStage[];
}

const AWAKENED_HEROES: Record<AwakenedHeroId, AwakenedHeroConfig> = {
  marlena: {
    id: "marlena",
    name: "Марлена",
    faction: "Воины",
    windowDays: "Дни 1–7 Эры Возрождения",
    mechanicName: "Боевая воля",
    accentBg: "bg-rose-50/70",
    accentBorder: "border-rose-300",
    accentBadge: "bg-rose-100 text-rose-900 border-rose-300",
    summary:
      "Открывается первой с начала Эры Возрождения. С ростом уровня пробуждения превращается из просто сильного ДД в ядро полноценной пачки воинов.",
    synergyRule:
      "Максимум зарядов Боевой воли = 2 × число воинов в отряде. При 5 воинах накапливается до 10 зарядов (+10% к урону и +10% к снижению входящего урона).",
    squadAdvice:
      "Смешанные составы для пробуждённой Марлены менее выгодны — старайтесь собирать вокруг неё полноценную пятёрку Воинов.",
    stages: [
      {
        level: 1,
        title: "Заряды «Боевой воли»",
        effect:
          "Критический удар «Рассечения небес» даёт заряд Боевой воли (макс. 2 × число воинов, до 10 при 5 воинах). Каждый заряд даёт +1% к наносимому урону и +1% к снижению получаемого урона.",
      },
      {
        level: 10,
        title: "Усиление «Багрового цветения» (Ужас)",
        effect:
          "Если накоплено больше 5 зарядов Боевой воли, навык не только бьёт всех врагов, но и накладывает на них Ужас (-5% к урону противников). После 10-го уровня открываются +2 уровня обычных навыков!",
      },
      {
        level: 20,
        title: "Мощный старт боя",
        effect:
          "В самом начале схватки Марлена атакует 3 врагов с наибольшим HP, нанося 2500% энергетического урона от атаки, и сразу получает 3 заряда Боевой воли.",
      },
      {
        level: 30,
        title: "«Душа воина» (Бафф всей фракции)",
        effect:
          "Во время боя атака, здоровье и защита всех союзных героев-воинов увеличиваются на +8%.",
      },
      {
        level: 40,
        title: "Усиление «Бесподобного клинка»",
        effect:
          "Марлена выпускает ещё 5 вихревых мечей с уроном 60% от базового.",
      },
    ],
  },
  cynthia: {
    id: "cynthia",
    name: "Синтия",
    faction: "Рейнджеры",
    windowDays: "Дни 15–21 Эры Возрождения",
    mechanicName: "Лунный свет",
    accentBg: "bg-emerald-50/70",
    accentBorder: "border-emerald-300",
    accentBadge: "bg-emerald-100 text-emerald-900 border-emerald-300",
    summary:
      "Самая зависимая от фракции механика: чем больше рейнджеров в отряде, тем выше потолок зарядов Лунного света и её собственный урон.",
    synergyRule:
      "Максимум зарядов Лунного света = 4 × число рейнджеров (3 → 12, 4 → 16, 5 рейнджеров → 20 зарядов = до +20% к энергетическому урону Синтии).",
    squadAdvice:
      "Каждый не-рейнджер в пачке режет потолок на 4 заряда! В золотой состав заранее присматривайте Белл и Луи (временно можно закрыть слот Харпером). До 10★ сначала крутите обычные билеты призыва, и только остаток закрывайте сундуками выбора и универсалками.",
    stages: [
      {
        level: 1,
        title: "Набор «Лунного света»",
        effect:
          "Каждое применение «Лунного клинка» даёт 1 заряд Лунного света (макс. 4 × число рейнджеров, до 20 в полной пятёрке). Каждый заряд повышает энергетический урон Синтии на +1%.",
      },
      {
        level: 10,
        title: "Усиление «Лунной охоты»",
        effect:
          "Навык «Лунная охота» получает +20% дополнительного урона и сразу даёт 2 заряда Лунного света.",
      },
      {
        level: 20,
        title: "Взрывной «Танец лунопада»",
        effect:
          "«Танец лунопада» расходует до 10 зарядов Лунного света и наносит дополнительный энергетический урон: 60% атаки Синтии за каждый потраченный заряд.",
      },
      {
        level: 30,
        title: "«Душа рейнджера» (Бафф всей фракции)",
        effect:
          "Атака, здоровье и защита всех союзных рейнджеров в бою увеличиваются на +8%.",
      },
      {
        level: 40,
        title: "«Лунное благословение»",
        effect:
          "Когда Синтия наносит критический удар по цели, наносимый урон дополнительно увеличивается на +20%.",
      },
    ],
  },
  annie: {
    id: "annie",
    name: "Анни",
    faction: "Колдуны",
    windowDays: "Дни 29–35 Эры Возрождения",
    mechanicName: "Горение и Сжигание",
    accentBg: "bg-sky-50/70",
    accentBorder: "border-sky-300",
    accentBadge: "bg-sky-100 text-sky-900 border-sky-300",
    summary:
      "Вариант строго для тех, у кого Колдуны — основной или активно развиваемый отряд. В третью пачку со слабыми союзниками вкладывать в неё универсалки не стоит.",
    synergyRule:
      "Когда команда накладывает Горение, Анни добавляет на цель заряд Сжигания. Максимальное число зарядов зависит от количества союзных колдунов в отряде.",
    squadAdvice:
      "Идеально раскрывается только внутри сильной пачки Колдунов (вместе с другими колдунами, поддерживающими Горение).",
    stages: [
      {
        level: 1,
        title: "Горение и стаки «Сжигания»",
        effect:
          "«Конфета» получает 50% шанс наложить Горение на 2 сек (ежесекундный энергетический урон). При наложении Горения командой Анни вешает на цель заряд Сжигания (лимит зависит от числа колдунов).",
      },
      {
        level: 10,
        title: "Усиление «Подарка-сюрприза»",
        effect:
          "«Подарок-сюрприз» получает +15% урона, а каждый эффект Сжигания на цели добавляет ещё +4% урона.",
      },
      {
        level: 20,
        title: "Усиление «Банки сладостей»",
        effect:
          "Наносит дополнительный энергетический урон всем противникам со Сжиганием: 250% от атаки Анни × количество зарядов на цели.",
      },
      {
        level: 30,
        title: "«Душа колдуна» (Бафф всей фракции)",
        effect:
          "Даёт всем союзным колдунам +8% к атаке, здоровью и защите.",
      },
      {
        level: 40,
        title: "«Озорной проказник»",
        effect:
          "При срабатывании Горения от обычной атаки доп. Горение накладывается на случайного вражеского героя с высоким уроном. Длительность Сжигания увеличивается до 30 сек, а лимит зарядов = число колдунов + 3.",
      },
    ],
  },
};

const FULL_AWAKENING_MAIL = `🔥 ПРОБУЖДЕНИЕ ГЕРОЕВ: МАРЛЕНА, СИНТИЯ И АННИ (ГАЙД АЛЬЯНСА)

📅 1. ЖЁСТКОЕ РАСПИСАНИЕ ОКОН (ТОЛЬКО ПО 7 ДНЕЙ В ЭРЕ!):
• Марлена (Воины): дни 1–7 Эры Возрождения.
• Синтия (Рейнджеры): дни 15–21 Эры Возрождения.
• Анни (Колдуны): дни 29–35 Эры Возрождения.
⚠️ Если пропустить 7-дневное окно — следующего шанса придётся ждать до следующей Эры Возрождения!

⭐ 2. УСЛОВИЯ, ЦЕНА И ГДЕ БРАТЬ БЕЗ ДОНАТА:
• Герой обязан иметь 10★ (обычные фрагменты героя идут ТОЛЬКО на звёзды).
• Для старта нужно 50 ИНДИВИДУАЛЬНЫХ фрагментов пробуждения нужного героя.
• Дальше шкала 1–40 ур. качается индивидуальными или универсальными фрагментами (полный путь до 40 ур. = 2920 фрагментов, после 40 ур. открывается дорогой Прорыв). Сопротивление урону растёт с 1% до 5%.
• F2P без доната: после Эры появляется Торговец-отшельник с сундуками (можно постепенно собрать первые 50 фрагментов). Универсальные фрагменты также есть в Магазине Чести, Магазине Экспедиции, 6 и 9 сундуках Дуэли и событиях.

⛔ 3. ГЛАВНАЯ ОШИБКА И ПРАВИЛО ЧЕТВЕРГА:
• НЕ ДЕЛИТЕ универсальные фрагменты на троих! 1-й уровень со временем откроете всем, но универсалки вливайте строго в ОДНОГО героя вашей главной фракции (Воины ➔ Марлена, Рейнджеры ➔ Синтия, Колдуны ➔ Анни). Все трое раскрываются только в моно-фракционных пачках (на 30 ур. дают +8% атаки/HP/защиты всей фракции!).
• Тратьте фрагменты пробуждения В ЧЕТВЕРГ (день развития героев в Дуэли альянсов) — получите очки и доп. награды!
• Заранее копите ЗНАЧКИ НАВЫКОВ: пробуждение открывает новые уровни обычных навыков, которые нужно качать отдельно.`;

const SHORT_AWAKENING_CHAT = `🔥 ПРОБУЖДЕНИЕ ГЕРОЕВ: Окна по 7 дней — Марлена (дни 1-7), Синтия (15-21), Анни (29-35). Нужно 10★ + 50 инд. фрагментов пробуждения (F2P собирает у Торговца-отшельника после Эры). ГЛАВНОЕ: НЕ делите универсальные фрагменты на троих! Качайте ОДНОГО героя под свою основу (Воины→Марлена, Рейнджеры→Синтия, Колдуны→Анни) и тратьте фрагменты строго В ЧЕТВЕРГ в Дуэль альянсов (+ копите значки навыков под новые уровни)!`;

export const HeroAwakeningGuide: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState<AwakenedHeroId>("marlena");
  const [copiedMail, setCopiedMail] = useState(false);
  const [copiedChat, setCopiedChat] = useState(false);

  const hero = AWAKENED_HEROES[selectedHero];

  const handleCopyMail = () => {
    navigator.clipboard.writeText(FULL_AWAKENING_MAIL);
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 2500);
  };

  const handleCopyChat = () => {
    navigator.clipboard.writeText(SHORT_AWAKENING_CHAT);
    setCopiedChat(true);
    setTimeout(() => setCopiedChat(false), 2500);
  };

  return (
    <div id="hero-awakening-guide" className="space-y-6">
      {/* Top Hero Header */}
      <div className="rounded-2xl bg-white border border-rose-200 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-rose-50 via-white to-amber-50/70 border-b border-rose-200/80 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-sm flex-shrink-0">
                <Flame className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-900 border border-rose-300">
                    ПРОБУЖДЕНИЕ ГЕРОЕВ • ЭРА 56 ДНЕЙ
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                    10★ + 50 ФРАГМЕНТОВ • ТРАТИТЬ В ЧЕТВЕРГ
                  </span>
                </div>
                <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
                  Пробуждение героев: Марлена, Синтия или Анни
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Расписание 7-дневных окон, условия старта (10★ и 50 индивидуальных фрагментов), F2P-путь через Торговца-отшельника, полный разбор всех ступеней 1–40 и кого качать под вашу фракцию.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:flex sm:items-center gap-2 shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={handleCopyMail}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 sm:py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
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

        {/* 7-Day Window Timeline Strip */}
        <div className="p-4 sm:p-5 bg-slate-50/70 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-600" />
              <span>Жёсткое расписание окон пробуждения (каждое открыто ровно 7 дней!):</span>
            </div>
            <span className="text-[11px] font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded border border-rose-200">
              Пропустили окно — ждёте следующую Эру!
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-rose-200 flex items-center justify-between gap-3 shadow-2xs">
              <div>
                <div className="text-[10px] font-mono font-extrabold text-rose-700 uppercase">
                  ДНИ 1 – 7 ЭРЫ
                </div>
                <div className="text-sm font-extrabold text-slate-900">
                  Марлена (Воины)
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-900 text-xs font-mono font-bold">
                1-я неделя
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-emerald-200 flex items-center justify-between gap-3 shadow-2xs">
              <div>
                <div className="text-[10px] font-mono font-extrabold text-emerald-700 uppercase">
                  ДНИ 15 – 21 ЭРЫ
                </div>
                <div className="text-sm font-extrabold text-slate-900">
                  Синтия (Рейнджеры)
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-mono font-bold">
                3-я неделя
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-sky-200 flex items-center justify-between gap-3 shadow-2xs">
              <div>
                <div className="text-[10px] font-mono font-extrabold text-sky-700 uppercase">
                  ДНИ 29 – 35 ЭРЫ
                </div>
                <div className="text-sm font-extrabold text-slate-900">
                  Анни (Колдуны)
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-900 text-xs font-mono font-bold">
                5-я неделя
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: Requirements, Cost (2920), F2P Hermit Trader & Main Mistake */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-3.5">
          <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 border border-amber-200 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                УСЛОВИЯ, ЦЕНА И F2P БЕЗ ДОНАТА
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                1. Что нужно для открытия и где брать фрагменты
              </h2>
            </div>
          </div>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">•</span>
              <span>
                <strong>Обязательно 10★ у героя:</strong> пока десятая звезда не открыта, пробуждение активировать нельзя (обычные фрагменты героя идут только на звёзды).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">•</span>
              <span>
                <strong>Старт — 50 индивидуальных фрагментов пробуждения:</strong> Марлены для Марлены, Синтии для Синтии, Анни для Анни. Дальше шкала <strong>1–40 ур.</strong> качается индивидуальными или универсальными фрагментами.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">•</span>
              <span>
                <strong>Полная стоимость до 40 ур.:</strong> <strong>2 920 фрагментов</strong> (включая первые 50). Сопротивление урону растёт с 1% до <strong>5%</strong>, а после 40 ур. открывается ещё более дорогой <strong>Прорыв</strong> (атака, HP, защита).
              </span>
            </li>
          </ul>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <div className="font-extrabold flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Путь без доната (F2P):</span>
            </div>
            <p className="leading-relaxed">
              После Эры появляется <strong>Торговец-отшельник</strong> — через сундуки у него можно постепенно выбрать нужные индивидуальные фрагменты и собрать стартовые 50 без доната! А универсальные фрагменты теперь встречаются не только в <strong>Экспедиции</strong>, но и в <strong>магазине Чести</strong> и отдельных событиях.
            </p>
          </div>
        </div>

        {/* Main Mistake + Thursday Rule + Skill Badges */}
        <div className="rounded-2xl bg-white border-2 border-rose-300 p-5 shadow-xs space-y-3.5 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-start gap-3 border-b border-rose-100 pb-3">
              <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700 border border-rose-200 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-200">
                  ГЛАВНАЯ ОШИБКА ИГРОКОВ
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                  2. Не делите универсальные фрагменты на троих!
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Стратегия «немного Марлене, немного Синтии, немного Анни» оставит вас с тремя героями без главных усилений (10 / 20 / 30 / 40 ур.). <strong>1-й уровень</strong> со временем откройте всем троим, а универсальные фрагменты вливайте <strong>строго в одного героя вашей главной фракции</strong>:
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 font-bold text-rose-950">
                Воины → Марлена
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 font-bold text-emerald-950">
                Рейнджеры → Синтия
              </div>
              <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 font-bold text-sky-950">
                Колдуны → Анни
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Тратьте фрагменты в ЧЕТВЕРГ:</strong> расход фрагментов пробуждения даёт очки в фазе развития героев <strong>Дуэли альянсов</strong>. Накопили до нужной ступени → подождали четверга → забрали награды Дуэли!
              </span>
            </div>

            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 flex items-start gap-2">
              <Zap className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span>
                <strong>Копите значки навыков:</strong> пробуждение поднимает потолок обычных навыков (например, у Марлены на 10 ур. открываются +2 уровня навыков), но сами они не качаются — без запаса значков усиление придётся отложить.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Detailed 1-40 Stage Breakdown for Marlena / Cynthia / Annie */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-indigo-200">
              СТУПЕНИ ПРОБУЖДЕНИЯ 1 → 40
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
              3. Что даёт каждый уровень пробуждения и какой нужен отряд
            </h2>
          </div>

          {/* Tabs for Marlena / Cynthia / Annie */}
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedHero("marlena")}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedHero === "marlena"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              <Swords className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Марлена</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedHero("cynthia")}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedHero === "cynthia"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              <Crosshair className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Синтия</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedHero("annie")}
              className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedHero === "annie"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Анни</span>
            </button>
          </div>
        </div>

        {/* Selected Hero Details Card */}
        <div className={`rounded-2xl border-2 p-4 sm:p-5 space-y-4 ${hero.accentBg} ${hero.accentBorder}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200/80 pb-3.5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {hero.name} ({hero.faction})
                </h3>
                <span className={`text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-md border ${hero.accentBadge}`}>
                  Механика: {hero.mechanicName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                {hero.summary}
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 shrink-0 self-start md:self-center">
              🗓️ {hero.windowDays}
            </span>
          </div>

          {/* 5 Control Stages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {hero.stages.map((st) => (
              <div
                key={st.level}
                className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs flex flex-col justify-between space-y-2"
              >
                <div>
                  <span className="inline-block text-[11px] font-mono font-extrabold px-2 py-0.5 rounded bg-slate-900 text-amber-400">
                    УРОВЕНЬ {st.level}
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1.5 leading-snug">
                    {st.title}
                  </h4>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                  {st.effect}
                </p>
              </div>
            ))}
          </div>

          {/* Synergy & Squad Guidance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
            <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-1">
              <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Зависимость от фракции:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {hero.synergyRule}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-1">
              <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                <ShieldPlus className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Совет по составу и прокачке:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {hero.squadAdvice}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Tip */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <span>
            <strong>Итоговая формула экономии:</strong> выберите одну основную фракцию → дождитесь 7-дневного окна своего героя → доведите до 10★ (сначала призывом, потом выбором) → копите значки навыков → вливайте универсальные фрагменты пробуждения до конкретной ступени строго <strong>в четверг в Дуэли альянсов</strong>!
          </span>
        </div>
      </div>
    </div>
  );
};
