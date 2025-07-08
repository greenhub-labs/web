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
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                {t("pages.home.systemStatus.online")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              📅 {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-card p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🚨</span>
            <h2 className="font-semibold">{t("pages.home.alerts.title")}</h2>
          </div>
          <div className="grid gap-2 md:grid-cols-3">
            <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <span className="text-yellow-600">⚠️</span>
              <span className="text-sm text-yellow-800">
                {t("pages.home.alerts.lowHumidity")}
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-green-600">✅</span>
              <span className="text-sm text-green-800">
                {t("pages.home.alerts.allSensorsOnline")}
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-blue-600">🔋</span>
              <span className="text-sm text-blue-800">
                {t("pages.home.alerts.batteryGood")}
              </span>
            </div>
          </div>
        </div>

        {/* Node Network Status */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-muted-foreground">
                {t("pages.home.nodeNetwork.activeNodes")}
              </h3>
              <span className="text-2xl">📡</span>
            </div>
            <p className="text-2xl font-bold">7/8</p>
            <p className="text-xs text-green-600">
              {t("pages.home.nodeNetwork.nodesOnline")}
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-muted-foreground">
                {t("pages.home.nodeNetwork.networkHealth")}
              </h3>
              <span className="text-2xl">🌐</span>
            </div>
            <p className="text-2xl font-bold">94%</p>
            <p className="text-xs text-blue-600">
              {t("pages.home.nodeNetwork.signalStrength")}
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-muted-foreground">
                {t("pages.home.nodeNetwork.dataPackets")}
              </h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-2xl font-bold">2.1k</p>
            <p className="text-xs text-orange-600">
              {t("pages.home.nodeNetwork.packetsToday")}
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-muted-foreground">
                {t("pages.home.nodeNetwork.powerStatus")}
              </h3>
              <span className="text-2xl">🔋</span>
            </div>
            <p className="text-2xl font-bold">6/8</p>
            <p className="text-xs text-green-600">
              {t("pages.home.nodeNetwork.nodesCharging")}
            </p>
          </div>
        </div>

        {/* Node Control Actions */}
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            🎛️ {t("pages.home.nodeActions.title")}
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors">
              <span className="text-2xl">📡</span>
              <div className="text-left">
                <p className="font-medium">
                  {t("pages.home.nodeActions.nodeNetwork")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("pages.home.nodeActions.nodeNetworkDesc")}
                </p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors">
              <span className="text-2xl">🔋</span>
              <div className="text-left">
                <p className="font-medium">
                  {t("pages.home.nodeActions.powerManagement")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("pages.home.nodeActions.powerManagementDesc")}
                </p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors">
              <span className="text-2xl">🛠️</span>
              <div className="text-left">
                <p className="font-medium">
                  {t("pages.home.nodeActions.nodeConfig")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("pages.home.nodeActions.nodeConfigDesc")}
                </p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors">
              <span className="text-2xl">🌐</span>
              <div className="text-left">
                <p className="font-medium">
                  {t("pages.home.nodeActions.meshNetwork")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("pages.home.nodeActions.meshNetworkDesc")}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Automated Tasks & Real-time Monitoring */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Automated Tasks Status */}
          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              🤖 {t("pages.home.automatedTasks.title")}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <span className="text-xl">💧</span>
                <div className="flex-1">
                  <p className="font-medium">
                    {t("pages.home.automatedTasks.irrigation")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("pages.home.automatedTasks.irrigationStatus")}
                  </p>
                </div>
                <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  {t("pages.home.automatedTasks.active")}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <span className="text-xl">🚪</span>
                <div className="flex-1">
                  <p className="font-medium">
                    {t("pages.home.automatedTasks.coopDoor")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("pages.home.automatedTasks.coopDoorStatus")}
                  </p>
                </div>
                <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {t("pages.home.automatedTasks.scheduled")}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <span className="text-xl">🌡️</span>
                <div className="flex-1">
                  <p className="font-medium">
                    {t("pages.home.automatedTasks.climate")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("pages.home.automatedTasks.climateStatus")}
                  </p>
                </div>
                <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                  {t("pages.home.automatedTasks.monitoring")}
                </div>
              </div>
            </div>
          </div>

          {/* Node Status */}
          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              📡 {t("pages.home.nodeStatus.title")}
            </h2>

            {/* Garden Nodes */}
            <div className="mb-4">
              <h3 className="font-medium text-sm text-muted-foreground mb-2">
                {t("pages.home.nodeStatus.gardenNodes")}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">
                      🌱 {t("pages.home.nodeStatus.node")} A
                    </p>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      {t("pages.home.nodeStatus.online")}
                    </span>
                  </div>
                  <p className="text-green-700 text-xs">
                    🌡️ 24°C | 💧 68% | 🔋 85% | ⚡ 240W
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">
                      🌾 {t("pages.home.nodeStatus.node")} B
                    </p>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      {t("pages.home.nodeStatus.warning")}
                    </span>
                  </div>
                  <p className="text-yellow-700 text-xs">
                    🌡️ 26°C | 💧 45% | 🔋 62% | ⚡ 180W
                  </p>
                </div>
              </div>
            </div>

            {/* Coop Node */}
            <div className="mb-4">
              <h3 className="font-medium text-sm text-muted-foreground mb-2">
                {t("pages.home.nodeStatus.coopNode")}
              </h3>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">
                    🐔 {t("pages.home.nodeStatus.node")} C
                  </p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {t("pages.home.nodeStatus.online")}
                  </span>
                </div>
                <p className="text-blue-700 text-xs">
                  🌡️ 18°C | 💧 55% | 🐓 8/8 | 🔋 78%
                </p>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="p-3 bg-accent/50 rounded-lg">
              <p className="text-sm">
                🤖 {t("pages.home.nodeStatus.aiRecommendation")}
              </p>
            </div>
          </div>
        </div>

        {/* System Overview Map */}
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            🗺️ {t("pages.home.systemMap.title")}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Garden Plots */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">
                {t("pages.home.systemMap.gardenPlots")}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                  <span className="text-sm font-medium">
                    🌱 {t("pages.home.systemMap.plot")} 1
                  </span>
                  <span className="text-xs text-green-700">
                    {t("pages.home.systemMap.optimal")}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <span className="text-sm font-medium">
                    🌾 {t("pages.home.systemMap.plot")} 2
                  </span>
                  <span className="text-xs text-yellow-700">
                    {t("pages.home.systemMap.attention")}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                  <span className="text-sm font-medium">
                    🥕 {t("pages.home.systemMap.plot")} 3
                  </span>
                  <span className="text-xs text-green-700">
                    {t("pages.home.systemMap.optimal")}
                  </span>
                </div>
              </div>
            </div>

            {/* Chicken Coop */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">
                {t("pages.home.systemMap.chickenCoop")}
              </h3>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🐔</span>
                  <span className="font-medium text-sm">
                    {t("pages.home.systemMap.coopStatus")}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>🚪 {t("pages.home.systemMap.doorOpen")}</p>
                  <p>🥚 {t("pages.home.systemMap.eggsCollected")}</p>
                  <p>🌡️ {t("pages.home.systemMap.tempNormal")}</p>
                </div>
              </div>
            </div>

            {/* Energy System */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">
                {t("pages.home.systemMap.energySystem")}
              </h3>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">☀️</span>
                  <span className="font-medium text-sm">
                    {t("pages.home.systemMap.solarSystem")}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>🔋 {t("pages.home.systemMap.batteryLevel")}: 85%</p>
                  <p>⚡ {t("pages.home.systemMap.production")}: 245W</p>
                  <p>🏠 {t("pages.home.systemMap.consumption")}: 180W</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex flex-wrap gap-2">
              <button className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                📊 {t("pages.home.systemMap.viewAnalytics")}
              </button>
              <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                📷 {t("pages.home.systemMap.openCameras")}
              </button>
              <button className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors">
                🔧 {t("pages.home.systemMap.manualControl")}
              </button>
              <button className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
                🤖 {t("pages.home.systemMap.askAi")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default HomePage;
