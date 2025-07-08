"use client";

import React from "react";
import { PageTemplate } from "@/contexts/shared/presentation/components/templates/page-template";
import { useTranslations } from "next-intl";

const HomePage = () => {
  const t = useTranslations();
  return (
    <PageTemplate pageTitle={t("navigation.home")}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {t("common.welcome")} {t("common.appName")} 🌿
            </h1>
            <p className="text-muted-foreground">{t("pages.home.subtitle")}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              📅 {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-muted-foreground">
                {t("pages.home.stats.plants")}
              </h3>
              <span className="text-2xl">🌱</span>
            </div>
            <p className="text-2xl font-bold">24</p>
            <p className="text-xs text-green-600">
              +3 {t("pages.home.thisWeek")}
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-muted-foreground">
                {t("pages.home.stats.gardens")}
              </h3>
              <span className="text-2xl">🏡</span>
            </div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-blue-600">{t("pages.home.active")}</p>
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-muted-foreground">
                {t("pages.home.stats.tasks")}
              </h3>
              <span className="text-2xl">💧</span>
            </div>
            <p className="text-2xl font-bold">7</p>
            <p className="text-xs text-orange-600">{t("pages.home.pending")}</p>
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-muted-foreground">
                {t("pages.home.stats.crops")}
              </h3>
              <span className="text-2xl">🌾</span>
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-green-600">{t("pages.home.growing")}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            ⚡ {t("pages.home.quickActions.title")}
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors">
              <span className="text-2xl">➕</span>
              <div className="text-left">
                <p className="font-medium">
                  {t("pages.home.quickActions.addPlant")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("pages.home.quickActions.addPlantDesc")}
                </p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors">
              <span className="text-2xl">📝</span>
              <div className="text-left">
                <p className="font-medium">
                  {t("pages.home.quickActions.logCare")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("pages.home.quickActions.logCareDesc")}
                </p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors">
              <span className="text-2xl">📅</span>
              <div className="text-left">
                <p className="font-medium">
                  {t("pages.home.quickActions.schedule")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("pages.home.quickActions.scheduleDesc")}
                </p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors">
              <span className="text-2xl">📊</span>
              <div className="text-left">
                <p className="font-medium">
                  {t("pages.home.quickActions.analytics")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("pages.home.quickActions.analyticsDesc")}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Today's Tasks & Weather */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Today's Tasks */}
          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              ✅ {t("pages.home.todayTasks.title")}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <span className="text-xl">💧</span>
                <div className="flex-1">
                  <p className="font-medium">
                    {t("pages.home.todayTasks.water")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tomatoes, Basil
                  </p>
                </div>
                <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  {t("common.done")}
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <span className="text-xl">🌿</span>
                <div className="flex-1">
                  <p className="font-medium">
                    {t("pages.home.todayTasks.fertilize")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Roses, Lavender
                  </p>
                </div>
                <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  {t("common.done")}
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <span className="text-xl">✂️</span>
                <div className="flex-1">
                  <p className="font-medium">
                    {t("pages.home.todayTasks.prune")}
                  </p>
                  <p className="text-sm text-muted-foreground">Apple tree</p>
                </div>
                <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                  {t("common.done")}
                </button>
              </div>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              🌤️ {t("pages.home.weather.title")}
            </h2>
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">☀️</div>
              <p className="text-2xl font-bold">22°C</p>
              <p className="text-muted-foreground">
                {t("pages.home.weather.sunny")}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <p className="text-muted-foreground">
                  {t("pages.home.weather.humidity")}
                </p>
                <p className="font-medium">65%</p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  {t("pages.home.weather.wind")}
                </p>
                <p className="font-medium">12 km/h</p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  {t("pages.home.weather.uv")}
                </p>
                <p className="font-medium">6</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-accent/50 rounded-lg">
              <p className="text-sm">💡 {t("pages.home.weather.tip")}</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default HomePage;
