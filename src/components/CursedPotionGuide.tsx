import React, { useState } from "react";
import {
  FlaskConical,
  Shield,
  ShieldAlert,
  Swords,
  AlertTriangle,
  Copy,
  Check,
  MapPin,
  Bone,
  HeartPulse,
  Zap,
  Skull,
  Info,
  Timer,
} from "lucide-react";

const FULL_CURSED_POTION_MAIL = `🧪 ИВЕНТ «ПРОКЛЯТОЕ ЗЕЛЬЕ»: ТАКТИКА И ПРАВИЛА ВЫЖИВАНИЯ

📍 1. ТЕЛЕПОРТ И ЗОНЫ КАРТЫ:
• ТП на территорию ивента бесплатный, время перезарядки ТП — 5 минут.
• На карте есть 2 зоны: боевая и условно безопасная.
• Уровни 1–26: находитесь скраю в безопасной зоне ПОД ЩИТОМ и собирайте аптечки!
• Уровни 27–28: можете стоять БЕЗ ЩИТА в середине и собирать кости зверя (если костей рядом нет — берите и аптечки).
• ⛔ Близко к Королевскому замку НЕ становитесь — там топы вас сразу выжгут!

⚔️ 2. КАК СОБИРАТЬ И НЕ ТЕРЯТЬ ВОЙСКА (СОСТАВ ОТРЯДОВ):
Со сборов будут выбивать! Используйте правильную схему отрядов:
• 1-й отряд: делаем ПОЛНЫЙ — пусть враги об него убиваются (либо им можно выбивать со сборов более слабых).
• 2-й и 3-й отряды: ставим по 1 СИНЕМУ герою! Если выбьют — потеряете совсем немного солдат.

🦴 3. КОСТИ ЗВЕРЯ И УДЕРЖАНИЕ СВЯТИЛИЩА:
• Кости после сбора находятся в вашем святилище и приносят зелья.
• Их видно по надписи над святилищем (x1, x2 и т.д.). Чтобы их отбить, на ваше святилище будут нападать!

🚨 4. ЧТО ДЕЛАТЬ ПРИ АТАКЕ НА ВАС:
• Как только на вас пошла атака — БЫСТРО отзываете войска и делаете ТП на другое место!
• ⚠️ ВАЖНО: Пока войска не вернулись домой, игра НЕ дает сделать ТП!
• Если вас всё-таки сожгли в 0: выкидывает на зеленую землю, кости забирает соперник, но все уже собранные зелья остаются на месте!`;

const SHORT_CURSED_POTION_CHAT = `🧪 ПРОКЛЯТОЕ ЗЕЛЬЕ: ТП бесплатный (КД 5 мин). Ур. 1–26 — скраю под щитом на аптечки; ур. 27–28 — в центре на кости зверя. Близко к Королевскому замку НЕ вставайте — топы выжгут! Отряды: 1-й ПОЛНЫЙ (выбивать/держать удар), 2-й и 3-й по 1 СИНЕМУ герою (минимум потерь!). Кости лежат в святке (видно по x1, x2 над ней) и приносят зелья. При атаке СРАЗУ отзывайте войска и ТП в сторону (пока войска в пути, ТП не пустит!). Если сожгут в 0 — выкинет на зелень и заберут кости, но зелья останутся!`;

export const CursedPotionGuide: React.FC = () => {
  const [copiedMail, setCopiedMail] = useState(false);
  const [copiedChat, setCopiedChat] = useState(false);

  const handleCopyMail = () => {
    navigator.clipboard.writeText(FULL_CURSED_POTION_MAIL);
    setCopiedMail(true);
    setTimeout(() => setCopiedMail(false), 2500);
  };

  const handleCopyChat = () => {
    navigator.clipboard.writeText(SHORT_CURSED_POTION_CHAT);
    setCopiedChat(true);
    setTimeout(() => setCopiedChat(false), 2500);
  };

  return (
    <div id="cursed-potion-guide-container" className="space-y-6">
      {/* Top Hero Header */}
      <div className="rounded-2xl bg-white border border-emerald-200 shadow-xs overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 via-white to-purple-50/70 border-b border-emerald-200/80 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-sm flex-shrink-0">
                <FlaskConical className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                    ИВЕНТ • ПРОКЛЯТОЕ ЗЕЛЬЕ
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-300">
                    БЕСПЛАТНОЕ ТП (КД 5 МИН)
                  </span>
                </div>
                <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
                  Ивент «Проклятое зелье»: тактика сбора и выживания
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
                  Как правильно выбрать зону по уровню базы, настроить отряды без лишних потерь войск, уберечь кости в святилище и вовремя уйти от атаки.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:flex sm:items-center gap-2 shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={handleCopyMail}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                {copiedMail ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Памятка скопирована!</span>
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

        {/* Quick Key Mechanics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-slate-50/70">
          <div className="p-3.5 sm:p-4 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-100 text-sky-700 border border-sky-200 flex-shrink-0">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                Бесплатный телепорт (КД 5 мин)
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                ТП на территорию ивента бесплатное, перезарядка — 5 минут.
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700 border border-amber-200 flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                На карте 2 зоны
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Боевая зона (центр) и условно безопасная зона (край карты).
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700 border border-rose-200 flex-shrink-0">
              <Skull className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-rose-950">
                Запрет возле Королевского замка!
              </div>
              <p className="text-[11px] text-rose-800 mt-0.5 font-medium">
                Близко к Королевскому замку не становитесь — там топы вас выжгут.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: Where to Stand by Sanctuary Level (1-26 vs 27-28) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Levels 1-26 */}
        <div className="rounded-2xl bg-white border-2 border-emerald-300 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap border-b border-emerald-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                  УРОВНИ 1 – 26
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                  Край карты • Безопасная зона под щитом
                </h2>
              </div>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold mt-0.5">•</span>
              <span>
                Игрокам с уровнем базы от <strong>1 до 26</strong> лучше находиться <strong>скраю карты в условно безопасной зоне под щитом</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <HeartPulse className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Ваша основная цель — спокойно собирать <strong>аптечки</strong>, не подставляя святилище под удары сильных соперников.
              </span>
            </li>
          </ul>
        </div>

        {/* Levels 27-28 */}
        <div className="rounded-2xl bg-white border-2 border-amber-400 p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap border-b border-amber-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 border border-amber-200">
                <Bone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  УРОВНИ 27 – 28
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                  Середина карты • Без щита на кости зверя
                </h2>
              </div>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">•</span>
              <span>
                Игроки <strong>27 и 28 уровней</strong> могут находиться <strong>без щита в середине карты</strong> и собирать <strong>кости зверя</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <HeartPulse className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Если костей зверя рядом нет — собирайте также и <strong>аптечки</strong>, чтобы не простаивать.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* SECTION 2: Squad Setup to Avoid Troop Losses */}
      <div className="rounded-2xl bg-white border-2 border-indigo-300 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-start sm:items-center gap-3 border-b border-indigo-100 pb-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 border border-indigo-200 flex-shrink-0">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-indigo-200">
                СХЕМА ОТРЯДОВ ДЛЯ СБОРА
              </span>
              <span className="text-xs font-bold text-rose-700">
                СО СБОРОВ БУДУТ ВЫБИВАТЬ!
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
              Как правильно выставить отряды, чтобы не терять войска
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-indigo-600 text-white">
                1-Й ОТРЯД — ПОЛНЫЙ
              </span>
              <span className="text-[11px] font-bold text-indigo-800">СИЛОВОЙ</span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Ставим полный боевой состав
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Первый отряд делаем <strong>полностью укомплектованным</strong>: пусть враги при атаке на точку сбора об него убиваются. Либо вы сами можете использовать этот отряд, чтобы <strong>выбивать со сборов более слабых соперников</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-sky-600 text-white">
                2-Й И 3-Й ОТРЯДЫ — ПО 1 СИНЕМУ ГЕРОЮ
              </span>
              <span className="text-[11px] font-bold text-sky-800">МИНИМУМ ПОТЕРЬ</span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Только по 1 синему герою в каждом
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Во второй и третий отряд ставим строго <strong>по 1 синему герою</strong>. Если враг выбьет вас со сбора — вы потеряете совсем немного солдат и не сольёте основную армию!
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Bones in Sanctuary & Attack Response */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Bones in Sanctuary */}
        <div className="rounded-2xl bg-white border border-purple-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 border-b border-purple-100 pb-3">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 border border-purple-200">
              <Bone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200">
                МЕХАНИКА КОСТЕЙ И ЗЕЛИЙ
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                Кости зверя в святилище (x1, x2 и т.д.)
              </h2>
            </div>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              • После сбора <strong>кости находятся прямо в вашем святилище</strong> и постепенно <strong>приносят зелья</strong>.
            </p>
            <p>
              • Наличие костей видно всем игрокам на карте по надписи над святилищем: <strong>х1, х2</strong> и т.д.
            </p>
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 font-medium text-xs">
              ⚠️ <strong>Будьте готовы:</strong> чтобы отбить ваши кости, враги будут специально нападать на ваше святилище!
            </div>
          </div>
        </div>

        {/* Emergency Escape & Zeroed Rules */}
        <div className="rounded-2xl bg-white border-2 border-rose-300 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 border-b border-rose-100 pb-3">
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700 border border-rose-200">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-200">
                ЭКСТРЕННЫЕ ДЕЙСТВИЯ
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                Как спасаться от атаки и что будет при сжигании в 0
              </h2>
            </div>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1">
              <div className="font-extrabold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Когда на вас идёт атака:</span>
              </div>
              <p className="text-xs leading-relaxed">
                <strong>Быстро отзываете все войска</strong> и делаете <strong>бесплатный ТП на другое место</strong> (перезарядка 5 минут).{" "}
                <strong className="text-rose-800 underline">Пока войска не вернулись домой, игра ТП не даёт!</strong>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1">
              <div className="font-extrabold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Если вас всё-таки сожгли в 0:</span>
              </div>
              <p className="text-xs leading-relaxed">
                Вашу базу выкидывает на <strong>зеленую землю</strong>, а <strong>кости забирает соперник</strong>.{" "}
                <strong className="text-emerald-800">Но все уже собранные зелья остаются на месте!</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Warning Callout */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-50 via-white to-amber-50 border border-rose-300 p-4 sm:p-5 flex items-start gap-3 shadow-2xs">
        <Info className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
          <strong className="text-rose-900">Главное правило безопасности:</strong>{" "}
          никогда не становитесь близко к <strong>Королевскому замку</strong> — там стоят сильнейшие топы сервера и королевства, которые мгновенно выжгут вашу базу!
        </div>
      </div>
    </div>
  );
};
