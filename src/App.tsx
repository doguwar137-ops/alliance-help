/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Shield,
  Calendar,
  ShieldAlert,
  Flame,
  BookOpen,
  Castle,
  Zap,
  Globe,
  ShoppingBag,
  Swords,
  Crown,
  Sparkles,
  Gift,
  LayoutGrid,
  X,
  Check,
  FlaskConical,
  Gem,
  Microscope,
} from "lucide-react";
import { Header } from "./components/Header";
import { TodayDirective } from "./components/TodayDirective";
import { WeeklySchedule } from "./components/WeeklySchedule";
import { AllianceRules } from "./components/AllianceRules";
import { CheeseTrapGuide } from "./components/CheeseTrapGuide";
import { QuizCheatSheet } from "./components/QuizCheatSheet";
import { SanctuaryUpgradeGuide } from "./components/SanctuaryUpgradeGuide";
import { SurvivalBattleGuide } from "./components/SurvivalBattleGuide";
import { ServerJumpGuide } from "./components/ServerJumpGuide";
import { ShopsGuide } from "./components/ShopsGuide";
import { GearRoadmapGuide } from "./components/GearRoadmapGuide";
import { MinistersGuide } from "./components/MinistersGuide";
import { EraOfRevivalGuide } from "./components/EraOfRevivalGuide";
import { GiftCodesGuide } from "./components/GiftCodesGuide";
import { DemonKingsGuide } from "./components/DemonKingsGuide";
import { HeroAwakeningGuide } from "./components/HeroAwakeningGuide";
import { HeroSkillsGuide } from "./components/HeroSkillsGuide";
import { CursedPotionGuide } from "./components/CursedPotionGuide";
import { CrystalValleyGuide } from "./components/CrystalValleyGuide";
import { ResearchPriorityGuide } from "./components/ResearchPriorityGuide";
import { GAME_TITLE } from "./data/allianceData";

const DEFAULT_TAB = "today";

const TAB_HASH_BY_ID: Record<string, string> = {
  rules: "rules",
  today: "directive",
  "gift-codes": "codes",
  schedule: "schedule",
  "demon-kings": "demons",
  "cheese-trap": "cheese-trap",
  quiz: "quiz",
  "cursed-potion": "potion",
  "crystal-valley": "crystals",
  "survival-sync": "double-rewards",
  sanctuary: "sanctuary",
  research: "research",
  "hero-skills": "skills",
  "gear-roadmap": "gear",
  awakening: "awakening",
  shops: "shops",
  ministers: "ministers",
  "era-revival": "era",
  "server-jump": "server-jump",
};

const HASH_ALIASES: Record<string, string> = {
  today: "today",
  directive: "today",
  main: "today",
  "gift-codes": "gift-codes",
  codes: "gift-codes",
  promo: "gift-codes",
  promocodes: "gift-codes",
  calendar: "schedule",
  "demon-kings": "demon-kings",
  demons: "demon-kings",
  cheese: "cheese-trap",
  trap: "cheese-trap",
  "cursed-potion": "cursed-potion",
  potion: "cursed-potion",
  "crystal-valley": "crystal-valley",
  crystals: "crystal-valley",
  valley: "crystal-valley",
  "survival-sync": "survival-sync",
  "double-rewards": "survival-sync",
  x2: "survival-sync",
  "hero-skills": "hero-skills",
  skills: "hero-skills",
  "gear-roadmap": "gear-roadmap",
  gear: "gear-roadmap",
  research: "research",
  science: "research",
  lab: "research",
  "era-revival": "era-revival",
  era: "era-revival",
  server: "server-jump",
};

function resolveTabFromHash(rawHash: string): string {
  const cleaned = rawHash.replace(/^#\/?/, "").trim().toLowerCase();
  if (!cleaned) return DEFAULT_TAB;

  for (const [tabId, hash] of Object.entries(TAB_HASH_BY_ID)) {
    if (hash === cleaned || tabId === cleaned) {
      return tabId;
    }
  }

  return HASH_ALIASES[cleaned] ?? DEFAULT_TAB;
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>(() =>
    typeof window !== "undefined" ? resolveTabFromHash(window.location.hash) : DEFAULT_TAB
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(() => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const msk = new Date(utc + 3600000 * 3);
    const day = msk.getDay();
    return day === 0 ? 6 : day - 1;
  });

  type TabTone = "danger" | "urgent" | "bonus" | "neutral";

  interface NavTabItem {
    id: string;
    label: string;
    shortLabel: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    tone: TabTone;
  }

  interface NavGroup {
    id: string;
    rowLabel: string;
    mobileTitle: string;
    items: NavTabItem[];
  }

  const navGroups: NavGroup[] = [
    {
      id: "base",
      rowLabel: "1. База и бонусы",
      mobileTitle: "1. База альянса и бонусы",
      items: [
        { id: "rules", label: "Правила Альянса", shortLabel: "Правила", icon: ShieldAlert, badge: "ВАЖНО", tone: "danger" },
        { id: "today", label: "Директива Дня", shortLabel: "Сегодня", icon: Shield, badge: "СЕГОДНЯ", tone: "urgent" },
        { id: "gift-codes", label: "Активация подарочных кодов", shortLabel: "Промокоды", icon: Gift, badge: "БОНУСЫ", tone: "bonus" },
        { id: "schedule", label: "Календарь (7 Дней)", shortLabel: "Календарь", icon: Calendar, badge: "РАСПИСАНИЕ", tone: "neutral" },
      ],
    },
    {
      id: "events",
      rowLabel: "2. События и боссы",
      mobileTitle: "2. События и боссы",
      items: [
        { id: "demon-kings", label: "Короли Демонов", shortLabel: "Короли", icon: Crown, badge: "ГАЙД +50%", tone: "neutral" },
        { id: "cheese-trap", label: "Сырная Ловушка", shortLabel: "Крыса", icon: Flame, badge: "ГАЙД", tone: "neutral" },
        { id: "quiz", label: "Викторина", shortLabel: "Викторина", icon: BookOpen, badge: "ОТВЕТЫ", tone: "neutral" },
        { id: "cursed-potion", label: "Проклятое Зелье", shortLabel: "Зелье", icon: FlaskConical, badge: "ИВЕНТ", tone: "neutral" },
        { id: "crystal-valley", label: "Долина Кристаллов", shortLabel: "Кристаллы", icon: Gem, badge: "ИВЕНТ", tone: "neutral" },
        { id: "survival-sync", label: "Двойные Награды", shortLabel: "Х2 Награды", icon: Zap, badge: "Х2 ОЧКИ", tone: "neutral" },
      ],
    },
    {
      id: "progression",
      rowLabel: "3. Развитие",
      mobileTitle: "3. Развитие аккаунта",
      items: [
        { id: "sanctuary", label: "Прокачка Святилища", shortLabel: "Святилище", icon: Castle, badge: "1–30 УР", tone: "neutral" },
        { id: "research", label: "Приоритет Исследований", shortLabel: "Наука", icon: Microscope, badge: "ГАЙД Т10", tone: "neutral" },
        { id: "hero-skills", label: "Навыки Героев", shortLabel: "Навыки", icon: Zap, badge: "15 ГЕРОЕВ", tone: "neutral" },
        { id: "gear-roadmap", label: "Снаряжение Героев", shortLabel: "Снаряжение", icon: Swords, badge: "ГАЙД 1–28", tone: "neutral" },
        { id: "awakening", label: "Пробуждение Героев", shortLabel: "Пробуждение", icon: Flame, badge: "10★ / 1–40", tone: "neutral" },
      ],
    },
    {
      id: "strategy",
      rowLabel: "4. Стратегия",
      mobileTitle: "4. Стратегия, экономика и сезоны",
      items: [
        { id: "shops", label: "Гид по Магазинам", shortLabel: "Магазины", icon: ShoppingBag, badge: "ТОП ТРАТ", tone: "neutral" },
        { id: "ministers", label: "Гайд по Министрам", shortLabel: "Министры", icon: Crown, badge: "+50% БАФФ", tone: "neutral" },
        { id: "era-revival", label: "Эра Возрождения", shortLabel: "Эра", icon: Sparkles, badge: "СЕЗОН", tone: "neutral" },
        { id: "server-jump", label: "Переход на Сервер", shortLabel: "Сервер", icon: Globe, badge: "УЧАСТНИК", tone: "neutral" },
      ],
    },
  ];

  const navTabs = navGroups.flatMap((g) => g.items);

  const getTabButtonStyle = (tone: TabTone, isActive: boolean) => {
    if (isActive) {
      switch (tone) {
        case "danger":
          return {
            btn: "bg-rose-600 text-white border border-rose-600 shadow-xs",
            icon: "text-white",
            badge: "bg-rose-700 text-white border-rose-500",
          };
        case "urgent":
          return {
            btn: "bg-amber-600 text-white border border-amber-600 shadow-xs",
            icon: "text-white",
            badge: "bg-amber-700 text-white border-amber-500",
          };
        case "bonus":
          return {
            btn: "bg-emerald-600 text-white border border-emerald-600 shadow-xs",
            icon: "text-white",
            badge: "bg-emerald-700 text-white border-emerald-500",
          };
        default:
          return {
            btn: "bg-slate-900 text-white border border-slate-900 shadow-xs",
            icon: "text-amber-400",
            badge: "bg-slate-800 text-slate-200 border-slate-700",
          };
      }
    }

    switch (tone) {
      case "danger":
        return {
          btn: "bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200",
          icon: "text-rose-600",
          badge: "bg-rose-100 text-rose-800 border-rose-300",
        };
      case "urgent":
        return {
          btn: "bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300",
          icon: "text-amber-600",
          badge: "bg-amber-100 text-amber-900 border-amber-300",
        };
      case "bonus":
        return {
          btn: "bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200",
          icon: "text-emerald-600",
          badge: "bg-emerald-100 text-emerald-800 border-emerald-300",
        };
      default:
        return {
          btn: "bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200",
          icon: "text-slate-500",
          badge: "bg-slate-100 text-slate-600 border-slate-200",
        };
    }
  };

  const handleSelectTab = (tabId: string) => {
    const targetHash = `#${TAB_HASH_BY_ID[tabId] ?? tabId}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    setCurrentTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onHashChange = () => {
      const nextTab = resolveTabFromHash(window.location.hash);
      setCurrentTab(nextTab);
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Scroll active tab pill into view on mobile horizontal bar
  useEffect(() => {
    const activeBtn = document.getElementById(`nav-btn-mobile-${currentTab}`);
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentTab]);

  const mobileBottomQuickTabs = [
    { id: "rules", label: "Правила", icon: ShieldAlert },
    { id: "today", label: "Сегодня", icon: Shield },
    { id: "gift-codes", label: "Бонусы", icon: Gift },
    { id: "schedule", label: "7 Дней", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-white flex flex-col antialiased pb-20 lg:pb-0">
      {/* Top App Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleSelectTab}
        selectedDayIndex={selectedDayIndex}
        setSelectedDayIndex={setSelectedDayIndex}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Navigation Sub-Bar: Single-line swipeable on mobile, 4 semantic rows on desktop */}
      <div className="border-b border-slate-200 bg-white/95 z-30 backdrop-blur-md shadow-2xs sticky top-[93px] md:top-[69px] lg:static">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          {/* Mobile Horizontal Strip */}
          <nav
            id="alliance-nav-tabs-mobile"
            className="flex lg:hidden items-center gap-1.5 py-2 overflow-x-auto no-scrollbar"
          >
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              const styles = getTabButtonStyle(tab.tone, isActive);

              return (
                <button
                  key={tab.id}
                  id={`nav-btn-mobile-${tab.id}`}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${styles.btn}`}
                >
                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${styles.icon}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${styles.badge}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop 4-Row Semantic Navigation */}
          <nav
            id="alliance-nav-tabs"
            className="hidden lg:flex flex-col gap-1.5 py-2.5"
          >
            {navGroups.map((group) => (
              <div
                key={group.id}
                className="flex items-center gap-2 flex-wrap"
              >
                <span className="hidden xl:inline-flex items-center w-[124px] shrink-0 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  {group.rowLabel}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap flex-1">
                  {group.items.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = currentTab === tab.id;
                    const styles = getTabButtonStyle(tab.tone, isActive);

                    return (
                      <button
                        key={tab.id}
                        id={`nav-btn-${tab.id}`}
                        onClick={() => handleSelectTab(tab.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${styles.btn}`}
                      >
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${styles.icon}`} />
                        <span>{tab.label}</span>
                        {tab.badge && !isActive && (
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${styles.badge}`}>
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {currentTab === "today" && (
          <TodayDirective
            selectedDayIndex={selectedDayIndex}
            setSelectedDayIndex={setSelectedDayIndex}
            onOpenRules={() => handleSelectTab("rules")}
            onOpenSanctuary={() => handleSelectTab("sanctuary")}
            onOpenGearRoadmap={() => handleSelectTab("gear-roadmap")}
            onOpenMinisters={() => handleSelectTab("ministers")}
            onOpenEraRevival={() => handleSelectTab("era-revival")}
            onOpenDemonKings={() => handleSelectTab("demon-kings")}
            onOpenAwakening={() => handleSelectTab("awakening")}
            onOpenHeroSkills={() => handleSelectTab("hero-skills")}
            onOpenCursedPotion={() => handleSelectTab("cursed-potion")}
            onOpenCrystalValley={() => handleSelectTab("crystal-valley")}
            onOpenResearch={() => handleSelectTab("research")}
          />
        )}

        {currentTab === "demon-kings" && <DemonKingsGuide />}

        {currentTab === "era-revival" && <EraOfRevivalGuide />}

        {currentTab === "awakening" && <HeroAwakeningGuide />}

        {currentTab === "schedule" && (
          <WeeklySchedule
            onSelectDay={(idx) => {
              setSelectedDayIndex(idx);
              handleSelectTab("today");
            }}
          />
        )}

        {currentTab === "rules" && <AllianceRules />}

        {currentTab === "ministers" && <MinistersGuide />}

        {currentTab === "hero-skills" && <HeroSkillsGuide />}

        {currentTab === "gear-roadmap" && <GearRoadmapGuide />}

        {currentTab === "shops" && <ShopsGuide />}

        {currentTab === "gift-codes" && <GiftCodesGuide />}

        {currentTab === "server-jump" && <ServerJumpGuide />}

        {currentTab === "survival-sync" && <SurvivalBattleGuide />}

        {currentTab === "sanctuary" && <SanctuaryUpgradeGuide />}

        {currentTab === "research" && (
          <ResearchPriorityGuide onOpenMinisters={() => handleSelectTab("ministers")} />
        )}

        {currentTab === "cheese-trap" && <CheeseTrapGuide />}

        {currentTab === "cursed-potion" && <CursedPotionGuide />}

        {currentTab === "crystal-valley" && <CrystalValleyGuide />}

        {currentTab === "quiz" && <QuizCheatSheet />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-5 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Дуэль Альянсов • {GAME_TITLE}</span>
          <span className="text-slate-600">
            Обязательное участие в Дуэли Альянсов • Взносы в науку по значку 👍
          </span>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg pb-safe">
        <div className="grid grid-cols-5 items-center h-16 px-1">
          {mobileBottomQuickTabs.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id && !isMobileMenuOpen;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectTab(item.id)}
                className={`flex flex-col items-center justify-center h-full gap-1 transition-colors cursor-pointer ${
                  isActive
                    ? "text-amber-600 font-extrabold"
                    : "text-slate-500 hover:text-slate-900 font-semibold"
                }`}
              >
                <div
                  className={`px-3 py-1 rounded-full transition-colors ${
                    isActive ? "bg-amber-100 text-amber-700" : ""
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] leading-none truncate max-w-[64px]">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* 5th Button: Open All 13 Sections Drawer */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className={`flex flex-col items-center justify-center h-full gap-1 transition-colors cursor-pointer ${
              isMobileMenuOpen
                ? "text-amber-600 font-extrabold"
                : "text-slate-600 hover:text-slate-900 font-semibold"
            }`}
          >
            <div
              className={`px-3 py-1 rounded-full transition-colors ${
                isMobileMenuOpen
                  ? "bg-amber-600 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </div>
            <span className="text-[10px] leading-none">Все ({navTabs.length})</span>
          </button>
        </div>
      </div>

      {/* Mobile All-Sections Bottom Sheet / Drawer */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white rounded-t-3xl border-t border-slate-200 p-4 sm:p-5 max-h-[82vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle & Header */}
            <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Все разделы и гайды альянса
                </h3>
                <p className="text-xs text-slate-500">
                  Выберите нужный раздел для быстрого перехода
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                aria-label="Закрыть меню"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable 4-Level Grouped Grid of All Tabs */}
            <div className="overflow-y-auto space-y-4 pb-16">
              {navGroups.map((group) => (
                <div key={group.id} className="space-y-2">
                  <div className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-500 px-1">
                    {group.mobileTitle}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.items.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = currentTab === tab.id;
                      const styles = getTabButtonStyle(tab.tone, isActive);
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => handleSelectTab(tab.id)}
                          className={`flex items-center justify-between gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                            isActive
                              ? styles.btn
                              : tab.tone === "neutral"
                                ? "bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-800"
                                : styles.btn
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`p-2 rounded-xl flex-shrink-0 border ${
                                isActive
                                  ? "bg-white/15 border-white/20 text-white"
                                  : `bg-white border-slate-200 ${styles.icon}`
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-extrabold truncate">
                                {tab.label}
                              </div>
                              {tab.badge && (
                                <span
                                  className={`inline-block text-[10px] font-mono font-bold mt-0.5 ${
                                    isActive
                                      ? "text-white/90"
                                      : tab.tone === "danger"
                                        ? "text-rose-700"
                                        : tab.tone === "urgent"
                                          ? "text-amber-700"
                                          : tab.tone === "bonus"
                                            ? "text-emerald-700"
                                            : "text-slate-500"
                                  }`}
                                >
                                  {tab.badge}
                                </span>
                              )}
                            </div>
                          </div>
                          {isActive && (
                            <Check className="w-4 h-4 text-white flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
