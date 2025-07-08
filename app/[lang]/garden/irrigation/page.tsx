"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { PageTemplate } from "@/contexts/shared/presentation/components/templates/page-template";
import { Button } from "@/contexts/shared/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/contexts/shared/presentation/components/ui/card";
import { Separator } from "@/contexts/shared/presentation/components/ui/separator";

// New reusable components
import {
  StatCard,
  ProgressBar,
} from "@/contexts/shared/presentation/components/atoms";
import {
  EntityCardHeader,
  EntityCardActions,
  AlertsSection,
  type CardAction,
  type Alert,
} from "@/contexts/shared/presentation/components/molecules";

interface IrrigationZone {
  id: string;
  name: string;
  plotName: string;
  icon: string;
  status: "active" | "scheduled" | "offline" | "manual";
  soilMoisture: number;
  lastWatered: string;
  nextSchedule: string;
  waterUsageToday: number;
  duration: number;
  pressure: number;
  flowRate: number;
  valveStatus: "open" | "closed";
  schedule: {
    frequency: string;
    time: string;
    duration: number;
  };
  sensors: {
    moisture: number;
    temperature: number;
    ph: number;
  };
  alerts: string[];
}

const IrrigationPage = () => {
  const t = useTranslations();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterBy, setFilterBy] = useState<
    "all" | "active" | "scheduled" | "offline"
  >("all");

  // Mock data for irrigation zones
  const irrigationZones: IrrigationZone[] = [
    {
      id: "1",
      name: "North Garden Zone",
      plotName: "Plot A",
      icon: "🌱",
      status: "active",
      soilMoisture: 68,
      lastWatered: "2024-01-15T08:30:00",
      nextSchedule: "2024-01-15T18:00:00",
      waterUsageToday: 24.5,
      duration: 15,
      pressure: 2.1,
      flowRate: 8.5,
      valveStatus: "open",
      schedule: {
        frequency: "Daily",
        time: "06:00, 18:00",
        duration: 15,
      },
      sensors: {
        moisture: 68,
        temperature: 24,
        ph: 6.8,
      },
      alerts: [],
    },
    {
      id: "2",
      name: "South Vegetable Zone",
      plotName: "Plot B",
      icon: "🥕",
      status: "scheduled",
      soilMoisture: 45,
      lastWatered: "2024-01-15T06:00:00",
      nextSchedule: "2024-01-15T18:00:00",
      waterUsageToday: 18.2,
      duration: 20,
      pressure: 1.9,
      flowRate: 7.2,
      valveStatus: "closed",
      schedule: {
        frequency: "Daily",
        time: "06:00, 18:00",
        duration: 20,
      },
      sensors: {
        moisture: 45,
        temperature: 26,
        ph: 6.5,
      },
      alerts: ["Low soil moisture"],
    },
    {
      id: "3",
      name: "Greenhouse Zone",
      plotName: "Plot C",
      icon: "🏠",
      status: "active",
      soilMoisture: 72,
      lastWatered: "2024-01-15T09:15:00",
      nextSchedule: "2024-01-15T15:00:00",
      waterUsageToday: 31.8,
      duration: 10,
      pressure: 2.3,
      flowRate: 9.1,
      valveStatus: "open",
      schedule: {
        frequency: "3 times daily",
        time: "09:00, 15:00, 21:00",
        duration: 10,
      },
      sensors: {
        moisture: 72,
        temperature: 22,
        ph: 7.1,
      },
      alerts: [],
    },
    {
      id: "4",
      name: "Herb Garden Zone",
      plotName: "Plot D",
      icon: "🌿",
      status: "offline",
      soilMoisture: 38,
      lastWatered: "2024-01-14T18:00:00",
      nextSchedule: "Manual",
      waterUsageToday: 0,
      duration: 0,
      pressure: 0,
      flowRate: 0,
      valveStatus: "closed",
      schedule: {
        frequency: "Manual",
        time: "-",
        duration: 0,
      },
      sensors: {
        moisture: 38,
        temperature: 25,
        ph: 6.9,
      },
      alerts: ["Valve offline", "Critical moisture level"],
    },
  ];

  const breadcrumbItems = [
    { label: t("navigation.home"), href: "/" },
    { label: t("navigation.garden.title"), href: "/garden" },
    { label: t("navigation.garden.irrigation"), href: "/garden/irrigation" },
  ];

  const handleCreateSchedule = async (scheduleData: any) => {
    console.log("Creating irrigation schedule:", scheduleData);
    // Add schedule creation logic here
  };

  const filteredZones = irrigationZones.filter((zone) => {
    if (filterBy === "all") return true;
    return zone.status === filterBy;
  });

  return (
    <PageTemplate
      pageTitle={t("pages.garden.irrigation.title")}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        <div className="flex items-center gap-2">
          {/* Desktop: All controls */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-0.5 bg-background border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="px-3 py-2 text-sm"
              >
                🔲 {t("pages.garden.irrigation.gridView")}
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="px-3 py-2 text-sm"
              >
                📋 {t("pages.garden.irrigation.listView")}
              </Button>
            </div>
            <div className="flex items-center gap-0.5 bg-background border rounded-md p-1">
              <Button
                variant={filterBy === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterBy("all")}
                className="px-3 py-2 text-sm"
              >
                💧 {t("pages.garden.irrigation.filterAll")}
              </Button>
              <Button
                variant={filterBy === "active" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterBy("active")}
                className="px-3 py-2 text-sm"
              >
                🌊 {t("pages.garden.irrigation.filterActive")}
              </Button>
              <Button
                variant={filterBy === "scheduled" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterBy("scheduled")}
                className="px-3 py-2 text-sm"
              >
                ⏰ {t("pages.garden.irrigation.filterScheduled")}
              </Button>
              <Button
                variant={filterBy === "offline" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterBy("offline")}
                className="px-3 py-2 text-sm"
              >
                ❌ {t("pages.garden.irrigation.filterOffline")}
              </Button>
            </div>
            <Button
              className="px-3 py-2 text-sm"
              onClick={() => console.log("Create schedule")}
            >
              ➕ {t("pages.garden.irrigation.addSchedule")}
            </Button>
          </div>

          {/* Mobile: Only View Toggle + Add */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center gap-0.5 bg-background border rounded-md p-0.5">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                🔲
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                📋
              </Button>
            </div>
            <Button
              className="h-8 w-8 p-0"
              onClick={() => console.log("Create schedule")}
            >
              ➕
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4 md:space-y-6">
        {/* Mobile Filters */}
        <div className="md:hidden">
          <Card>
            <CardContent className="p-3">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {t("pages.garden.irrigation.filterBy")}:
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={filterBy === "all" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilterBy("all")}
                    className="h-9 text-xs px-2 justify-start"
                  >
                    💧 {t("pages.garden.irrigation.filterAll")}
                  </Button>
                  <Button
                    variant={filterBy === "active" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilterBy("active")}
                    className="h-9 text-xs px-2 justify-start"
                  >
                    🌊 {t("pages.garden.irrigation.filterActive")}
                  </Button>
                  <Button
                    variant={filterBy === "scheduled" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilterBy("scheduled")}
                    className="h-9 text-xs px-2 justify-start"
                  >
                    ⏰ {t("pages.garden.irrigation.filterScheduled")}
                  </Button>
                  <Button
                    variant={filterBy === "offline" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilterBy("offline")}
                    className="h-9 text-xs px-2 justify-start"
                  >
                    ❌ {t("pages.garden.irrigation.filterOffline")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <StatCard
            title={t("pages.garden.irrigation.stats.activeZones")}
            value={`${
              irrigationZones.filter((zone) => zone.status === "active").length
            }/${irrigationZones.length}`}
            icon="💧"
          />

          <StatCard
            title={t("pages.garden.irrigation.stats.scheduledZones")}
            value={
              irrigationZones.filter((zone) => zone.status === "scheduled")
                .length
            }
            icon="⏰"
          />

          <StatCard
            title={t("pages.garden.irrigation.stats.waterUsage")}
            value={`${irrigationZones
              .reduce((sum, zone) => sum + zone.waterUsageToday, 0)
              .toFixed(1)}L`}
            icon="🌊"
          />

          <StatCard
            title={t("pages.garden.irrigation.stats.avgMoisture")}
            value={`${Math.round(
              irrigationZones.reduce(
                (sum, zone) => sum + zone.soilMoisture,
                0
              ) / irrigationZones.length
            )}%`}
            icon="💦"
          />
        </div>

        {/* Irrigation Zones Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "space-y-4"
          }
        >
          {filteredZones.map((zone) => {
            // Transform alerts into proper Alert format
            const alerts: Alert[] = zone.alerts.map((alert) => ({
              type: "warning" as const,
              message: alert,
            }));

            // Define actions for this zone
            const actions: CardAction[] = [
              {
                label: t("pages.garden.irrigation.viewDetails"),
                icon: "👁️",
                onClick: () => console.log("View details", zone.id),
                isPrimary: true,
              },
              {
                label: "Toggle",
                icon: zone.valveStatus === "open" ? "🔴" : "🟢",
                onClick: () => console.log("Toggle valve", zone.id),
                disabled: zone.status === "offline",
              },
              {
                label: "Settings",
                icon: "⚙️",
                onClick: () => console.log("Settings", zone.id),
              },
            ];

            return (
              <Card key={zone.id} className="hover:shadow-md transition-shadow">
                <EntityCardHeader
                  icon={zone.icon}
                  title={zone.name}
                  subtitle={zone.plotName}
                  status={zone.status}
                  statusType="irrigation"
                  statusLabel={t(
                    `pages.garden.irrigation.status.${zone.status}`
                  )}
                />

                <CardContent className="space-y-3">
                  {/* Soil Moisture Progress */}
                  <ProgressBar
                    label={t("pages.garden.irrigation.soilMoisture")}
                    value={zone.soilMoisture}
                    colorType="auto"
                  />

                  {/* Water Usage & Pressure */}
                  <Separator />
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground mb-1">
                        {t("pages.garden.irrigation.waterUsage")}
                      </p>
                      <p className="font-medium">{zone.waterUsageToday}L</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">
                        {t("pages.garden.irrigation.pressure")}
                      </p>
                      <p className="font-medium">{zone.pressure} bar</p>
                    </div>
                  </div>

                  {/* Schedule Info - Always visible */}
                  <div className="bg-accent/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">⏰</span>
                      <span className="text-xs font-medium">
                        {zone.nextSchedule === "Manual" ? (
                          <>🎛️ {t("pages.garden.irrigation.manualMode")}</>
                        ) : (
                          <>
                            {t("pages.garden.irrigation.nextSchedule")}:{" "}
                            {new Date(zone.nextSchedule).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Environmental Data */}
                  <Separator />
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div className="flex items-center gap-1 min-w-0">
                      <span>🌡️</span>
                      <span className="truncate">
                        {zone.sensors.temperature}°C
                      </span>
                    </div>
                    <div className="flex items-center gap-1 min-w-0">
                      <span>💧</span>
                      <span className="truncate">{zone.sensors.moisture}%</span>
                    </div>
                    <div className="flex items-center gap-1 min-w-0">
                      <span>🧪</span>
                      <span className="truncate">pH {zone.sensors.ph}</span>
                    </div>
                  </div>

                  {/* Alerts */}
                  <AlertsSection alerts={alerts} />

                  {/* Actions */}
                  <EntityCardActions actions={actions} />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* System Controls & AI Recommendations */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* System Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                🎛️ {t("pages.garden.irrigation.systemControls.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3">
                <Button
                  variant="outline"
                  className="justify-start h-auto p-3"
                  onClick={() => console.log("Manual irrigation")}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-xl">💧</span>
                    <div className="text-left">
                      <p className="font-medium text-sm">
                        {t(
                          "pages.garden.irrigation.systemControls.manualStart"
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t(
                          "pages.garden.irrigation.systemControls.manualStartDesc"
                        )}
                      </p>
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-3"
                  onClick={() => console.log("Emergency stop")}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-xl">🛑</span>
                    <div className="text-left">
                      <p className="font-medium text-sm">
                        {t(
                          "pages.garden.irrigation.systemControls.emergencyStop"
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t(
                          "pages.garden.irrigation.systemControls.emergencyStopDesc"
                        )}
                      </p>
                    </div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="justify-start h-auto p-3"
                  onClick={() => console.log("System test")}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-xl">🔧</span>
                    <div className="text-left">
                      <p className="font-medium text-sm">
                        {t("pages.garden.irrigation.systemControls.systemTest")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t(
                          "pages.garden.irrigation.systemControls.systemTestDesc"
                        )}
                      </p>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                🤖 {t("pages.garden.irrigation.aiRecommendations.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">💧</span>
                    <div>
                      <p className="font-medium text-blue-800 text-sm">
                        {t(
                          "pages.garden.irrigation.aiRecommendations.increaseMoisture"
                        )}
                      </p>
                      <p className="text-blue-700 text-xs">
                        {t(
                          "pages.garden.irrigation.aiRecommendations.increaseMoistureDesc"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">🔧</span>
                    <div>
                      <p className="font-medium text-red-800 text-sm">
                        {t(
                          "pages.garden.irrigation.aiRecommendations.checkValve"
                        )}
                      </p>
                      <p className="text-red-700 text-xs">
                        {t(
                          "pages.garden.irrigation.aiRecommendations.checkValveDesc"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">⚡</span>
                    <div>
                      <p className="font-medium text-green-800 text-sm">
                        {t(
                          "pages.garden.irrigation.aiRecommendations.optimizeSchedule"
                        )}
                      </p>
                      <p className="text-green-700 text-xs">
                        {t(
                          "pages.garden.irrigation.aiRecommendations.optimizeScheduleDesc"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
};

export default IrrigationPage;
